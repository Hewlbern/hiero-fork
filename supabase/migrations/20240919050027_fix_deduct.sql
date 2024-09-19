set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.deduct_tokens_and_audit(p_user_connection_key text, p_developer_api_key text, p_amount integer, p_original_amount integer, p_multiplier numeric, p_model text, p_label text)
 RETURNS TABLE(success boolean, message text, new_balance bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
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
        user_id, app_id, original_amount, 
        multiplier, deducted_amount, model, label
    ) VALUES (
        v_user_id, v_app_id, p_original_amount, 
        p_multiplier, p_amount, p_model, p_label
    );

    -- Return success
    RETURN QUERY SELECT true, 'Tokens deducted successfully', v_new_balance;
END;$function$
;


