export type App = {
	id: string;
	name: string;
	description: string;
	url: string;
	slug: string;
	webhook_url: string | null;
	user_id: string;
	status: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
};

export type DeveloperApiKey = {
	id: string;
	app_id: string;
	key: string;
	created_at: string;
};

export type ApiKey = {
	id: string;
	masked_key: string;
	created_at: string;
};

export type NewApiKey = {
	id: string;
	key: string;
	created_at: string;
};
