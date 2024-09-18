set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.deduct_tokens_and_audit(p_user_id uuid, p_amount integer, p_developer_id uuid, p_app_id uuid, p_original_amount integer, p_multiplier numeric, p_model text, p_label text)
 RETURNS TABLE(success boolean, message text, new_balance integer)
 LANGUAGE plpgsql
AS $function$DECLARE
    v_current_balance INTEGER;
    v_new_balance INTEGER;
BEGIN
    -- Get the current balance
    SELECT token_balance INTO v_current_balance
    FROM user_tokens
    WHERE user_id = p_user_id;

    -- Check if there are enough tokens
    IF v_current_balance < p_amount THEN
        RETURN QUERY SELECT false, 'Insufficient tokens', v_current_balance;
        RETURN;
    END IF;

    -- Deduct tokens
    UPDATE user_tokens
    SET token_balance = v_current_balance - p_amount
    WHERE user_id = p_user_id
    RETURNING token_balance INTO v_new_balance;

    -- Create audit trail
    INSERT INTO audit_trail (
        user_id, developer_id, app_id, original_amount, 
        multiplier, deducted_amount, model, label
    ) VALUES (
        p_user_id, p_developer_id, p_app_id, p_original_amount, 
        p_multiplier, p_amount, p_model, p_label
    );

    -- Return success
    RETURN QUERY SELECT true, 'Tokens deducted successfully', v_new_balance;
END;$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$
;

CREATE TRIGGER update_updated_at_column BEFORE UPDATE ON public.apps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_updated_at_column BEFORE UPDATE ON public.user_tokens FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


