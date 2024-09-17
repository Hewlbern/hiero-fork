alter table "public"."developer_api_keys" drop constraint "developer_api_keys_pkey";

alter table "public"."user_api_keys" drop constraint "user_api_keys_pkey";

drop index if exists "public"."developer_api_keys_pkey";

drop index if exists "public"."user_api_keys_pkey";

alter table "public"."developer_api_keys" add column "id" uuid not null default gen_random_uuid();

alter table "public"."user_api_keys" add column "id" uuid not null default gen_random_uuid();

CREATE UNIQUE INDEX developer_api_keys_key_key ON public.developer_api_keys USING btree (key);

CREATE UNIQUE INDEX user_api_keys_key_key ON public.user_api_keys USING btree (key);

CREATE UNIQUE INDEX developer_api_keys_pkey ON public.developer_api_keys USING btree (id);

CREATE UNIQUE INDEX user_api_keys_pkey ON public.user_api_keys USING btree (id);

alter table "public"."developer_api_keys" add constraint "developer_api_keys_pkey" PRIMARY KEY using index "developer_api_keys_pkey";

alter table "public"."user_api_keys" add constraint "user_api_keys_pkey" PRIMARY KEY using index "user_api_keys_pkey";

alter table "public"."developer_api_keys" add constraint "developer_api_keys_key_key" UNIQUE using index "developer_api_keys_key_key";

alter table "public"."user_api_keys" add constraint "user_api_keys_key_key" UNIQUE using index "user_api_keys_key_key";

create policy "CRUD for authenticated users"
on "public"."apps"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



