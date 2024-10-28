"use client";

import { useState, useEffect } from "react";
import { appUrl } from "@/lib/appUrl";

const useAppUrl = (slug: string) => {
	const [appInfo, setAppInfo] = useState<{
		host: string;
		protocol: string;
		loaded: boolean;
	} | null>({
		host: "",
		protocol: "",
		loaded: false,
	});

	useEffect(() => {
		// This will only run in the browser after hydration
		const host = window.location.host;
		const protocol = window.location.protocol;

		setAppInfo({
			loaded: true,
			host,
			protocol,
		});
	}, []);

	return {
		loaded: appInfo?.loaded,
		appUrl: appInfo?.loaded ? appUrl(appInfo.protocol, appInfo.host, slug) : "",
	};
};

export default useAppUrl;
