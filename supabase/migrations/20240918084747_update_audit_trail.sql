drop policy "Access user tokens with API keys" on "public"."user_tokens";

drop function if exists "public"."deduct_tokens_and_audit"(p_user_id uuid, p_amount integer, p_developer_id uuid, p_app_id uuid, p_original_amount integer, p_multiplier numeric, p_model text, p_label text);

drop function if exists "public"."get_user_id_from_api_keys"(p_user_api_key text, p_developer_api_key text);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.deduct_tokens_and_audit(p_user_api_key text, p_developer_api_key text, p_amount integer, p_original_amount integer, p_multiplier numeric, p_model text, p_label text)
 RETURNS TABLE(success boolean, message text, new_balance bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_user_id UUID;
    v_app_id UUID;
    v_developer_id UUID;
    v_error TEXT;
    v_current_balance BIGINT;  -- Token balance is int8
    v_new_balance BIGINT;       -- Token balance is int8
BEGIN
    -- Get user_id and app_id from the API keys
    SELECT user_id, app_id, error INTO v_user_id, v_app_id, v_error
    FROM get_user_id_from_api_keys(p_user_api_key, p_developer_api_key);

    IF v_error IS NOT NULL THEN
        RETURN QUERY SELECT false, v_error, NULL;
        RETURN;
    END IF;

    -- Get the current token balance of the user
    SELECT u.token_balance INTO v_current_balance
    FROM user_tokens u
    WHERE u.user_id = v_user_id;

    -- Check if there are enough tokens
    IF v_current_balance < p_amount THEN
        RETURN QUERY SELECT false, 'Insufficient tokens', v_current_balance;
        RETURN;
    END IF;

    -- Deduct tokens
    UPDATE user_tokens
    SET token_balance = v_current_balance - p_amount
    WHERE user_id = v_user_id
    RETURNING token_balance INTO v_new_balance;

    -- Create audit trail
    INSERT INTO audit_trail (
        user_id, app_id, original_amount, 
        multiplier, deducted_amount, model, label
    ) VALUES (
        v_user_id, v_app_id, p_original_amount, 
        p_multiplier, p_amount, p_model, p_label
    );

    -- Return success
    RETURN QUERY SELECT true, 'Tokens deducted successfully', v_new_balance;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_id_from_api_keys(p_user_api_key text, p_developer_api_key text)
 RETURNS TABLE(user_id uuid, app_id uuid, error text)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_app_id UUID;
    v_user_id UUID;
BEGIN
    -- Verify developer API key and get app_id
    SELECT d.app_id INTO v_app_id
    FROM developer_api_keys d
    WHERE d.key::text = p_developer_api_key;

    IF v_app_id IS NULL THEN
        RETURN QUERY SELECT NULL::UUID, NULL::UUID, 'Invalid developer API key'::TEXT;
        RETURN;
    END IF;

    -- Verify user API key and get user_id
    SELECT u.user_id INTO v_user_id
    FROM user_api_keys u
    WHERE u.key::text = p_user_api_key AND u.app_id = v_app_id;

    IF v_user_id IS NULL THEN
        RETURN QUERY SELECT NULL::UUID, NULL::UUID, 'Invalid user API key'::TEXT;
        RETURN;
    END IF;

    -- Return the user_id and app_id if both keys are valid
    RETURN QUERY SELECT v_user_id, v_app_id, NULL::TEXT;
END;
$function$
;

create policy "Access user tokens with API keys"
on "public"."user_tokens"
as permissive
for select
to public
using (((auth.uid() = user_id) OR (user_id IN ( SELECT u.user_id
   FROM get_user_id_from_api_keys(((current_setting('request.headers'::text, true))::json ->> 'x-user-api-key'::text), ((current_setting('request.headers'::text, true))::json ->> 'x-developer-api-key'::text)) u(user_id, app_id, error)
  WHERE (u.error IS NULL)))));



