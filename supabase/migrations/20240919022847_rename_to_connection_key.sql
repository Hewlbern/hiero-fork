-- Rename the table
ALTER TABLE public.user_api_keys RENAME TO user_connection_keys;

-- Rename the constraint
ALTER TABLE public.user_connection_keys RENAME CONSTRAINT user_api_keys_pkey TO user_connection_keys_pkey;
ALTER TABLE public.user_connection_keys RENAME CONSTRAINT user_api_keys_key_key TO user_connection_keys_key_key;
ALTER TABLE public.user_connection_keys RENAME CONSTRAINT user_api_keys_app_id_fkey TO user_connection_keys_app_id_fkey;
ALTER TABLE public.user_connection_keys RENAME CONSTRAINT user_api_keys_user_id_fkey TO user_connection_keys_user_id_fkey;

-- Update the RLS policies
DROP POLICY IF EXISTS "access_user_api_keys" ON public.user_connection_keys;
CREATE POLICY "access_user_connection_keys"
ON public.user_connection_keys
AS PERMISSIVE
FOR ALL
TO public
USING ((auth.uid() = user_id) OR ((key)::text = ( SELECT ((current_setting('request.headers'::text, true))::json ->> 'x-user-connection-key'::text))));

-- Update functions that reference the old table name
CREATE OR REPLACE FUNCTION public.get_user_id_from_connection_keys(p_user_connection_key text, p_developer_api_key text)
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

    -- Verify user connection key and get user_id
    SELECT u.user_id INTO v_user_id
    FROM user_connection_keys u
    WHERE u.key::text = p_user_connection_key AND u.app_id = v_app_id;

    IF v_user_id IS NULL THEN
        RETURN QUERY SELECT NULL::UUID, NULL::UUID, 'Invalid user connection key'::TEXT;
        RETURN;
    END IF;

    -- Return the user_id and app_id if both keys are valid
    RETURN QUERY SELECT v_user_id, v_app_id, NULL::TEXT;
END;
$function$;

DROP FUNCTION deduct_tokens_and_audit(p_user_api_key text,
    p_developer_api_key text,
    p_amount integer,
    p_original_amount integer,
    p_multiplier numeric,
    p_model text,
    p_label text);

-- Update the deduct_tokens_and_audit function
CREATE OR REPLACE FUNCTION public.deduct_tokens_and_audit(
    p_user_connection_key text,
    p_developer_api_key text,
    p_amount integer,
    p_original_amount integer,
    p_multiplier numeric,
    p_model text,
    p_label text
)
RETURNS TABLE(success boolean, message text, new_balance bigint)
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    v_user_id UUID;
    v_developer_id UUID;
    v_app_id UUID;
    v_current_balance BIGINT;
    v_new_balance BIGINT;
BEGIN
    -- Get user_id and app_id from the user connection key
    SELECT user_id, app_id INTO v_user_id, v_app_id
    FROM user_connection_keys
    WHERE key = p_user_connection_key::uuid;

    IF v_user_id IS NULL THEN
        RETURN QUERY SELECT false, 'Invalid user connection key', 0::bigint;
        RETURN;
    END IF;

    -- Get developer_id from the developer API key
    SELECT user_id INTO v_developer_id
    FROM developer_api_keys
    WHERE key = p_developer_api_key::uuid;

    IF v_developer_id IS NULL THEN
        RETURN QUERY SELECT false, 'Invalid developer API key', 0::bigint;
        RETURN;
    END IF;

    -- Get current balance
    SELECT token_balance INTO v_current_balance
    FROM user_tokens
    WHERE user_id = v_user_id;

    IF v_current_balance IS NULL THEN
        RETURN QUERY SELECT false, 'User token balance not found', 0::bigint;
        RETURN;
    END IF;

    -- Check if user has enough tokens
    IF v_current_balance < p_amount THEN
        RETURN QUERY SELECT false, 'Insufficient tokens', v_current_balance;
        RETURN;
    END IF;

    -- Deduct tokens
    v_new_balance := v_current_balance - p_amount;

    UPDATE user_tokens
    SET token_balance = v_new_balance
    WHERE user_id = v_user_id;

    -- Create audit trail
    INSERT INTO audit_trail (
        user_id, developer_id, app_id, original_amount, 
        multiplier, deducted_amount, model, label
    ) VALUES (
        v_user_id, v_developer_id, v_app_id, p_original_amount, 
        p_multiplier, p_amount, p_model, p_label
    );

    -- Return success
    RETURN QUERY SELECT true, 'Tokens deducted successfully', v_new_balance;
END;
$function$;

-- Update any other functions or triggers that might be using p_user_api_key
-- For example, if there are any other functions referencing user_api_keys, update them here