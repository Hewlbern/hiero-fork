import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CheckoutPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	return (
		<div className="flex flex-col gap-4 w-full">
			<h1 className="text-2xl font-bold mb-4">Choose a Payment Option</h1>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
				<Card>
					<CardHeader>
						<CardTitle>Monthly Plan</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">$9.99/month</p>
						<p className="mt-2">Access to all features</p>
						<button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
							Select
						</button>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Annual Plan</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">$99.99/year</p>
						<p className="mt-2">Save 17% compared to monthly</p>
						<button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
							Select
						</button>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Pay As You Go</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">$0.10 per API call</p>
						<p className="mt-2">Perfect for low volume usage</p>
						<button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
							Select
						</button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
