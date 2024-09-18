set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_id_from_api_keys(p_user_api_key text, p_developer_api_key text)
 RETURNS TABLE(user_id uuid, error text)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    v_app_id UUID;
    v_user_id UUID;
BEGIN
    -- Verify developer API key and get app_id
    SELECT app_id INTO v_app_id
    FROM developer_api_keys
    WHERE key::text = p_developer_api_key;

    IF v_app_id IS NULL THEN
        RETURN QUERY SELECT NULL::UUID, 'Invalid developer API key'::TEXT;
        RETURN;
    END IF;

    -- Verify user API key and get user_id
    SELECT user_id INTO v_user_id
    FROM user_api_keys
    WHERE key::text = p_user_api_key AND app_id = v_app_id;

    IF v_user_id IS NULL THEN
        RETURN QUERY SELECT NULL::UUID, 'Invalid user API key'::TEXT;
        RETURN;
    END IF;

    -- Return the user_id if both keys are valid
    RETURN QUERY SELECT v_user_id, NULL::TEXT;
END;
$function$
;

create policy "access_user_api_keys"
on "public"."user_api_keys"
as permissive
for all
to public
using (((auth.uid() = user_id) OR ((key)::text = ( SELECT ((current_setting('request.headers'::text, true))::json ->> 'x-user-api-key'::text)))));


create policy "Access user tokens with API keys"
on "public"."user_tokens"
as permissive
for select
to public
using (((auth.uid() = user_id) OR (user_id IN ( SELECT u.user_id
   FROM get_user_id_from_api_keys(((current_setting('request.headers'::text, true))::json ->> 'x-user-api-key'::text), ((current_setting('request.headers'::text, true))::json ->> 'x-developer-api-key'::text)) u(user_id, error)
  WHERE (u.error IS NULL)))));



