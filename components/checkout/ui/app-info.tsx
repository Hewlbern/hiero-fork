import React from "react";
import { DollarSign, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type AppInfoProps = {
	name: string;
	avgSpent: number;
	icon?: React.ReactNode;
};

const AppInfo: React.FC<AppInfoProps> = ({ name, avgSpent, icon }) => (
	<Card className="mb-8">
		<CardContent className="flex flex-col items-center justify-center p-2">
			<h2 className="text-lg sm:text-lg font-bold">{name}</h2>
			<div className="flex flex-col items-center space-x-2 ">
				<span className="text-3xl sm:text-2xl">
					${avgSpent.toFixed(2)} / month
				</span>
			</div>
			<p className="text-sm sm:text-xs">Average spent per user</p>
		</CardContent>
	</Card>
);

export default AppInfo;
