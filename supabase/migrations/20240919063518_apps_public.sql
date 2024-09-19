alter table "public"."apps" add column "slug" text;

CREATE UNIQUE INDEX apps_slug_key ON public.apps USING btree (slug);

alter table "public"."apps" add constraint "apps_slug_key" UNIQUE using index "apps_slug_key";

create policy "Enable read access for all users"
on "public"."apps"
as permissive
for select
to public
using (true);



