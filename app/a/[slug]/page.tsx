"use server";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { AIApplicationCard } from "@/components/ai-application-card";
import { Bot, Brain, Zap, Image } from "lucide-react";

const iconMap = {
	v0: <Bot className="h-8 w-8" />,
	Claude: <Brain className="h-8 w-8" />,
	ChatGPT: <Zap className="h-8 w-8" />,
	Midjourney: <Image className="h-8 w-8" />,
};

const colorMap = {
	v0: "bg-blue-500",
	Claude: "bg-purple-500",
	ChatGPT: "bg-green-500",
	Midjourney: "bg-orange-500",
};

export default async function AppPage({
	params,
}: {
	params: { slug: string };
}) {
	const supabase = createClient();

	const { data: app, error } = await supabase
		.from("apps")
		.select("*")
		.eq("slug", params.slug)
		.single();

	if (error || !app) {
		notFound();
	}

	// Mock data for demonstration purposes
	const mockAppData = {
		id: app.id,
		name: app.name,
		icon: iconMap[app.name as keyof typeof iconMap] || (
			<Bot className="h-8 w-8" />
		),
		color: colorMap[app.name as keyof typeof colorMap] || "bg-gray-500",
		loginUrl: `https://${app.name.toLowerCase()}.ai/login`,
		uuid: "",
		rating: (Math.random() * 5).toFixed(1),
		multiplier: (Math.random() * 0.5 + 1).toFixed(2),
		tokenPrice: (Math.random() * 0.0001 + 0.0001).toFixed(5),
		amountSpent: Math.floor(Math.random() * 15) + 1,
		usage: Math.floor(Math.random() * 100),
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<AIApplicationCard app={mockAppData} />
		</div>
	);
}
