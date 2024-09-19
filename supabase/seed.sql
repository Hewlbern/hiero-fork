INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '95f54b63-7196-4129-9c35-29e7c3b1067b', 'authenticated', 'authenticated', 'tombeckenham+dev@gmail.com', '$2a$10$aCAuDXrshYqZmZbBZR/VR.SB4KaIEi51vDgQhCJx6zKBX4EZsMsIO', '2024-09-13 02:37:50.358438+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-09-13 02:37:50.348338+00', '2024-09-13 02:37:50.358544+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'f7a25109-f16f-458e-82d4-ae0f4f03f604', 'authenticated', 'authenticated', 'tombeckenham+user@gmail.com', '$2a$10$7vrMHEzI2TFft8Wfxigc3uLl.FBQu2ntf2GyvHQB0zWAtTTXMcXB6', '2024-09-13 02:38:27.536415+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-09-13 02:38:27.530457+00', '2024-09-13 02:38:27.536541+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('95f54b63-7196-4129-9c35-29e7c3b1067b', '95f54b63-7196-4129-9c35-29e7c3b1067b', '{"sub": "95f54b63-7196-4129-9c35-29e7c3b1067b", "email": "tombeckenham+dev@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-09-13 02:37:50.354409+00', '2024-09-13 02:37:50.354446+00', '2024-09-13 02:37:50.354446+00', '9f1ef957-1827-457b-b3a0-629e8654c008'),
	('f7a25109-f16f-458e-82d4-ae0f4f03f604', 'f7a25109-f16f-458e-82d4-ae0f4f03f604', '{"sub": "f7a25109-f16f-458e-82d4-ae0f4f03f604", "email": "tombeckenham+user@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-09-13 02:38:27.533495+00', '2024-09-13 02:38:27.533561+00', '2024-09-13 02:38:27.533561+00', '691a406d-5975-45ff-8e45-8de4950ff255');


INSERT INTO "public"."apps" ("id", "name", "url", "description", "user_id", "status", "created_at", "updated_at", "deleted_at") VALUES
	('71b46209-7116-4b81-a212-eafd1dc78c14', 'Cat Video Generator', 'https://catvideogenerator.com', 'Generates cat videos!', '95f54b63-7196-4129-9c35-29e7c3b1067b', 'Active', '2024-09-18 01:10:03.440631+00', '2024-09-18 01:10:03.440631+00', NULL);


--
-- Data for Name: developer_api_keys; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."developer_api_keys" ("id", "key", "app_id", "created_at") VALUES
	('4ef6cff9-67ea-4b52-bfcb-bbeebf71f38e', 'ba2a8aa0-0866-4d3f-a84a-048b96cd63cc', '71b46209-7116-4b81-a212-eafd1dc78c14', '2024-09-13 02:37:10.999685+00');


--
-- Data for Name: user_connection_keys; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_connection_keys" ("id", "key", "user_id", "app_id", "created_at") VALUES
	('1d89eec1-e294-453c-9078-d255f5c9bba4', '1443f051-c89f-4863-a8a4-ba32d13d567c', 'f7a25109-f16f-458e-82d4-ae0f4f03f604', '71b46209-7116-4b81-a212-eafd1dc78c14', '2024-09-13 02:40:43.138181+00');


--
-- Data for Name: user_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_tokens" ("user_id", "token_balance", "created_at", "updated_at") VALUES
	('f7a25109-f16f-458e-82d4-ae0f4f03f604', 1000000, '2024-09-13 02:42:07.0113+00', '2024-09-13 02:42:07.0113+00');
