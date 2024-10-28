alter table "public"."apps" drop constraint "apps_slug_key";

drop index if exists "public"."apps_slug_key";

CREATE UNIQUE INDEX apps_slug_active_key ON public.apps USING btree (slug) WHERE (deleted_at IS NULL);


