
--
-- Data for Name: apps; Type: TABLE DATA; Schema: public; Owner: postgres
--


INSERT INTO "public"."users" ("id", "email", "password_hash", "password_salt", "name", "created_at", "updated_at") VALUES
	('f7a25109-f16f-458e-82d4-ae0f4f03f604', 'user@example.com', '0b671d32998d1c4597b6700e69a7832be6215e36317483e3127ec7a4bd438471d56b048a7dd669fca2c58bf4b6912d11a5c37ba8d570af221ad2b529ca2981fd', 'ef1a984adecb24716f42ca312459c2ee', NULL, '2024-09-13 02:38:27.530457+00', '2024-10-28 11:04:08.462746+00'),
	('95f54b63-7196-4129-9c35-29e7c3b1067b', 'dev@example.com', 'a5b349e315d7a6ce7aa0be8ad8b9340719e55aff9bd8e4d67aa643624c4464ff4fdb8a5cfe9ce1a4481784bb86947a89b9c1dda84958c9b65830ce6fd85c819b', '263dcdcde131dadd128732e50435acdb', NULL, '2024-09-13 02:37:50.348338+00', '2024-10-28 11:07:12.467965+00');



INSERT INTO "public"."apps" ("id", "name", "url", "description", "user_id", "status", "created_at", "updated_at", "deleted_at", "slug", "webhook_secret", "webhook_url") VALUES
	('71b46209-7116-4b81-a212-eafd1dc78c14', 'Cat Video Generator', 'https://catvideogenerator', 'Generates cat videos!', '95f54b63-7196-4129-9c35-29e7c3b1067b', 'Active', '2024-09-18 01:10:03.440631+00', '2024-10-25 06:15:29.718399+00', NULL, 'catvideogenerator', NULL, NULL);


--
-- Data for Name: audit_trail; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: developer_api_keys; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_connection_keys; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_tokens" ("user_id", "token_balance", "created_at", "updated_at") VALUES
	('f7a25109-f16f-458e-82d4-ae0f4f03f604', 1000000, '2024-09-13 02:42:07.0113+00', '2024-09-13 02:42:07.0113+00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--


