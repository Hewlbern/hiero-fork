"use client";

import { ReactNode, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function JoinWaitlistModal({ children }: { children: ReactNode }) {
	const [firstName, setFirstName] = useState("");
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			const response = await fetch("/api/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, firstName }),
			});

			if (response.ok) {
				const data = await response.json();
				setSuccess(true);
			} else {
				const errorData = await response.text();
				setError(errorData || "An error occurred");
			}
		} catch (err) {
			setError("An error occurred while submitting the form");
			console.error("Fetch error:", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="bg-[#E6C9A8] border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-0 w-full max-w-md">
				<DialogHeader className="bg-[#D05353] text-white p-6 border-b-8 border-black">
					<DialogTitle className="text-3xl font-black uppercase">
						Become a Hiero Developer.
					</DialogTitle>
				</DialogHeader>
				<div className="p-8">
					{success ? (
						<p className="text-black font-black text-xl">
							Thank you for joining the waitlist!
						</p>
					) : (
						<>
							<p className="mb-6 text-black font-black text-xl">
								Apply for early access to Hiero.
							</p>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label
										htmlFor="firstName"
										className="block text-lg font-black text-black mb-2 uppercase"
									>
										First Name
									</label>
									<Input
										id="firstName"
										type="text"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										placeholder="Enter your first name"
										className="w-full border-4 border-black p-3 bg-white text-black text-lg font-bold"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-lg font-black text-black mb-2 uppercase"
									>
										Email
									</label>
									<Input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your email"
										className="w-full border-4 border-black p-3 bg-white text-black text-lg font-bold"
										required
									/>
								</div>
								{error && (
									<p className="text-red-600 font-black text-lg">{error}</p>
								)}
								<Button
									type="submit"
									className="w-full bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] hover:bg-[#00FF00] hover:text-black transition-all font-black text-xl uppercase p-4"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Submitting..." : "Apply Today"}
								</Button>
							</form>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
