DROP SEQUENCE IF EXISTS public.audit_trail_id_seq;

create sequence "public"."audit_trail_id_seq";

create table "public"."apps" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "url" text not null,
    "description" text not null,
    "user_id" uuid not null,
    "status" text not null default 'Active'::text,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "deleted_at" timestamp with time zone
);


alter table "public"."apps" enable row level security;

create table "public"."audit_trail" (
    "id" bigint generated by default as identity not null,
    "user_id" uuid not null,
    "app_id" uuid not null,
    "original_amount" integer not null,
    "multiplier" numeric(5,2) not null,
    "deducted_amount" integer not null,
    "model" text not null,
    "label" text,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP
);


alter table "public"."audit_trail" enable row level security;

create table "public"."developer_api_keys" (
    "key" uuid not null default gen_random_uuid(),
    "app_id" uuid not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."developer_api_keys" enable row level security;

create table "public"."user_api_keys" (
    "key" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "app_id" uuid not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."user_api_keys" enable row level security;

create table "public"."user_tokens" (
    "user_id" uuid not null,
    "token_balance" integer not null default 0,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP
);


alter table "public"."user_tokens" enable row level security;

CREATE UNIQUE INDEX apps_pkey ON public.apps USING btree (id);

CREATE UNIQUE INDEX audit_trail_pkey ON public.audit_trail USING btree (id);

CREATE UNIQUE INDEX developer_api_keys_pkey ON public.developer_api_keys USING btree (key);

CREATE INDEX idx_apps_user_id ON public.apps USING btree (user_id);

CREATE UNIQUE INDEX user_api_keys_pkey ON public.user_api_keys USING btree (key);

alter table "public"."apps" add constraint "apps_pkey" PRIMARY KEY using index "apps_pkey";

alter table "public"."audit_trail" add constraint "audit_trail_pkey" PRIMARY KEY using index "audit_trail_pkey";

alter table "public"."developer_api_keys" add constraint "developer_api_keys_pkey" PRIMARY KEY using index "developer_api_keys_pkey";

alter table "public"."user_api_keys" add constraint "user_api_keys_pkey" PRIMARY KEY using index "user_api_keys_pkey";

alter table "public"."apps" add constraint "apps_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."apps" validate constraint "apps_user_id_fkey";

alter table "public"."audit_trail" add constraint "audit_trail_app_id_fkey" FOREIGN KEY (app_id) REFERENCES apps(id) not valid;

alter table "public"."audit_trail" validate constraint "audit_trail_app_id_fkey";

alter table "public"."audit_trail" add constraint "audit_trail_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."audit_trail" validate constraint "audit_trail_user_id_fkey";

alter table "public"."developer_api_keys" add constraint "developer_api_keys_app_id_fkey" FOREIGN KEY (app_id) REFERENCES apps(id) not valid;

alter table "public"."developer_api_keys" validate constraint "developer_api_keys_app_id_fkey";

alter table "public"."user_api_keys" add constraint "user_api_keys_app_id_fkey" FOREIGN KEY (app_id) REFERENCES apps(id) not valid;

alter table "public"."user_api_keys" validate constraint "user_api_keys_app_id_fkey";

alter table "public"."user_api_keys" add constraint "user_api_keys_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_api_keys" validate constraint "user_api_keys_user_id_fkey";

alter table "public"."user_tokens" add constraint "user_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_tokens" validate constraint "user_tokens_user_id_fkey";

grant delete on table "public"."apps" to "anon";

grant insert on table "public"."apps" to "anon";

grant references on table "public"."apps" to "anon";

grant select on table "public"."apps" to "anon";

grant trigger on table "public"."apps" to "anon";

grant truncate on table "public"."apps" to "anon";

grant update on table "public"."apps" to "anon";

grant delete on table "public"."apps" to "authenticated";

grant insert on table "public"."apps" to "authenticated";

grant references on table "public"."apps" to "authenticated";

grant select on table "public"."apps" to "authenticated";

grant trigger on table "public"."apps" to "authenticated";

grant truncate on table "public"."apps" to "authenticated";

grant update on table "public"."apps" to "authenticated";

grant delete on table "public"."apps" to "service_role";

grant insert on table "public"."apps" to "service_role";

grant references on table "public"."apps" to "service_role";

grant select on table "public"."apps" to "service_role";

grant trigger on table "public"."apps" to "service_role";

grant truncate on table "public"."apps" to "service_role";

grant update on table "public"."apps" to "service_role";

grant delete on table "public"."audit_trail" to "anon";

grant insert on table "public"."audit_trail" to "anon";

grant references on table "public"."audit_trail" to "anon";

grant select on table "public"."audit_trail" to "anon";

grant trigger on table "public"."audit_trail" to "anon";

grant truncate on table "public"."audit_trail" to "anon";

grant update on table "public"."audit_trail" to "anon";

grant delete on table "public"."audit_trail" to "authenticated";

grant insert on table "public"."audit_trail" to "authenticated";

grant references on table "public"."audit_trail" to "authenticated";

grant select on table "public"."audit_trail" to "authenticated";

grant trigger on table "public"."audit_trail" to "authenticated";

grant truncate on table "public"."audit_trail" to "authenticated";

grant update on table "public"."audit_trail" to "authenticated";

grant delete on table "public"."audit_trail" to "service_role";

grant insert on table "public"."audit_trail" to "service_role";

grant references on table "public"."audit_trail" to "service_role";

grant select on table "public"."audit_trail" to "service_role";

grant trigger on table "public"."audit_trail" to "service_role";

grant truncate on table "public"."audit_trail" to "service_role";

grant update on table "public"."audit_trail" to "service_role";

grant delete on table "public"."developer_api_keys" to "anon";

grant insert on table "public"."developer_api_keys" to "anon";

grant references on table "public"."developer_api_keys" to "anon";

grant select on table "public"."developer_api_keys" to "anon";

grant trigger on table "public"."developer_api_keys" to "anon";

grant truncate on table "public"."developer_api_keys" to "anon";

grant update on table "public"."developer_api_keys" to "anon";

grant delete on table "public"."developer_api_keys" to "authenticated";

grant insert on table "public"."developer_api_keys" to "authenticated";

grant references on table "public"."developer_api_keys" to "authenticated";

grant select on table "public"."developer_api_keys" to "authenticated";

grant trigger on table "public"."developer_api_keys" to "authenticated";

grant truncate on table "public"."developer_api_keys" to "authenticated";

grant update on table "public"."developer_api_keys" to "authenticated";

grant delete on table "public"."developer_api_keys" to "service_role";

grant insert on table "public"."developer_api_keys" to "service_role";

grant references on table "public"."developer_api_keys" to "service_role";

grant select on table "public"."developer_api_keys" to "service_role";

grant trigger on table "public"."developer_api_keys" to "service_role";

grant truncate on table "public"."developer_api_keys" to "service_role";

grant update on table "public"."developer_api_keys" to "service_role";

grant delete on table "public"."user_api_keys" to "anon";

grant insert on table "public"."user_api_keys" to "anon";

grant references on table "public"."user_api_keys" to "anon";

grant select on table "public"."user_api_keys" to "anon";

grant trigger on table "public"."user_api_keys" to "anon";

grant truncate on table "public"."user_api_keys" to "anon";

grant update on table "public"."user_api_keys" to "anon";

grant delete on table "public"."user_api_keys" to "authenticated";

grant insert on table "public"."user_api_keys" to "authenticated";

grant references on table "public"."user_api_keys" to "authenticated";

grant select on table "public"."user_api_keys" to "authenticated";

grant trigger on table "public"."user_api_keys" to "authenticated";

grant truncate on table "public"."user_api_keys" to "authenticated";

grant update on table "public"."user_api_keys" to "authenticated";

grant delete on table "public"."user_api_keys" to "service_role";

grant insert on table "public"."user_api_keys" to "service_role";

grant references on table "public"."user_api_keys" to "service_role";

grant select on table "public"."user_api_keys" to "service_role";

grant trigger on table "public"."user_api_keys" to "service_role";

grant truncate on table "public"."user_api_keys" to "service_role";

grant update on table "public"."user_api_keys" to "service_role";

grant delete on table "public"."user_tokens" to "anon";

grant insert on table "public"."user_tokens" to "anon";

grant references on table "public"."user_tokens" to "anon";

grant select on table "public"."user_tokens" to "anon";

grant trigger on table "public"."user_tokens" to "anon";

grant truncate on table "public"."user_tokens" to "anon";

grant update on table "public"."user_tokens" to "anon";

grant delete on table "public"."user_tokens" to "authenticated";

grant insert on table "public"."user_tokens" to "authenticated";

grant references on table "public"."user_tokens" to "authenticated";

grant select on table "public"."user_tokens" to "authenticated";

grant trigger on table "public"."user_tokens" to "authenticated";

grant truncate on table "public"."user_tokens" to "authenticated";

grant update on table "public"."user_tokens" to "authenticated";

grant delete on table "public"."user_tokens" to "service_role";

grant insert on table "public"."user_tokens" to "service_role";

grant references on table "public"."user_tokens" to "service_role";

grant select on table "public"."user_tokens" to "service_role";

grant trigger on table "public"."user_tokens" to "service_role";

grant truncate on table "public"."user_tokens" to "service_role";

grant update on table "public"."user_tokens" to "service_role";


