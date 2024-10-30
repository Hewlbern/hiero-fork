alter table "public"."apps" disable row level security;

alter table "public"."audit_trail" disable row level security;

alter table "public"."developer_api_keys" disable row level security;

alter table "public"."user_connection_keys" disable row level security;

alter table "public"."user_tokens" disable row level security;

alter table "public"."users" disable row level security;

create policy "Enable read access for all users"
on "public"."apps"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."users"
as permissive
for select
to public
using (true);



