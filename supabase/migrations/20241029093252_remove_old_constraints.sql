alter table "public"."apps" drop constraint "apps_user_id_fkey";

alter table "public"."user_connection_keys" drop constraint "user_connection_keys_user_id_fkey";

alter table "public"."user_tokens" drop constraint "user_tokens_user_id_fkey";
