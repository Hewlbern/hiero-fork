create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "email" text not null,
    "password_hash" text,
    "password_salt" text,
    "name" text,
    "created_at" timestamp with time zone default timezone('utc'::text, now()),
    "updated_at" timestamp with time zone default timezone('utc'::text, now())
);


CREATE INDEX users_email_idx ON public.users USING btree (email);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.migrate_auth_users()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    auth_user RECORD;
    temp_password TEXT;
    temp_salt TEXT;
    temp_hash TEXT;
BEGIN
    -- Loop through all users in auth.users
    FOR auth_user IN 
        SELECT * FROM auth.users
    LOOP
        -- Skip if user already exists in public.users
        IF NOT EXISTS (
            SELECT 1 FROM public.users 
            WHERE email = auth_user.email
        ) THEN
            -- Generate a random salt (16 bytes in hex = 32 chars)
            temp_salt := encode(gen_random_bytes(16), 'hex');
            
            -- Generate a random password hash (64 bytes in hex = 128 chars)
            temp_hash := encode(gen_random_bytes(64), 'hex');

            -- Insert the user into public.users
            INSERT INTO public.users (
                id,
                email,
                password_hash,
                password_salt,
                name,
                created_at,
                updated_at
            ) VALUES (
                auth_user.id,
                auth_user.email,
                temp_hash,
                temp_salt,
                auth_user.raw_user_meta_data->>'full_name',
                auth_user.created_at,
                auth_user.updated_at
            );
        END IF;
    END LOOP;
END;
$function$
;

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


select migrate_auth_users();
