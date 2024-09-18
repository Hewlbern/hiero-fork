set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_api_key(apikey character varying)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN EXISTS (SELECT 1 FROM developer_api_keys WHERE key = apiKey);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.check_developer_api_key(api_key text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM developer_api_keys
    WHERE key::text = api_key
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_api_key_from_header()
 RETURNS text
 LANGUAGE sql
 STABLE
AS $function$
  SELECT current_setting('request.headers')::json->>'x-developer-api-key'
$function$
;

create policy "access_with_developer_api_key"
on "public"."developer_api_keys"
as permissive
for all
to public
using (((key)::text = ( SELECT ((current_setting('request.headers'::text, true))::json ->> 'x-developer-api-key'::text))));


create policy "manage_own_developer_api_keys"
on "public"."developer_api_keys"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM apps
  WHERE ((apps.id = developer_api_keys.app_id) AND (apps.user_id = auth.uid())))));



