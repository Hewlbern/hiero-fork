drop policy "CRUD for authenticated users" on "public"."apps";

drop policy "Enable read access for all users" on "public"."apps";

drop policy "access_with_developer_api_key" on "public"."developer_api_keys";

drop policy "manage_own_developer_api_keys" on "public"."developer_api_keys";

drop policy "access_user_connection_keys" on "public"."user_connection_keys";

drop policy "Access user tokens with API keys" on "public"."user_tokens";

alter table "public"."apps" enable row level security;

alter table "public"."audit_trail" enable row level security;

alter table "public"."developer_api_keys" enable row level security;

alter table "public"."user_connection_keys" enable row level security;

alter table "public"."user_tokens" enable row level security;

alter table "public"."users" enable row level security;

alter table "public"."apps" add constraint "apps_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."apps" validate constraint "apps_user_id_fkey1";

alter table "public"."audit_trail" add constraint "audit_trail_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."audit_trail" validate constraint "audit_trail_user_id_fkey1";


