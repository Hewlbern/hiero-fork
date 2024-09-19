drop policy "Access user tokens with API keys" on "public"."user_tokens";

drop function if exists "public"."get_user_id_from_api_keys"(p_user_api_key text, p_developer_api_key text);

create policy "Access user tokens with API keys"
on "public"."user_tokens"
as permissive
for select
to public
using (((auth.uid() = user_id) OR (user_id IN ( SELECT u.user_id
   FROM get_user_id_from_connection_keys(((current_setting('request.headers'::text, true))::json ->> 'x-user-connection-key'::text), ((current_setting('request.headers'::text, true))::json ->> 'x-developer-api-key'::text)) u(user_id, app_id, error)
  WHERE (u.error IS NULL)))));



