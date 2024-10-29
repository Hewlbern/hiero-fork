import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { handleSignInWithOTP } from "@/app/actions/auth";
import { signInWithGoogleAuth } from "@/app/actions/auth";

interface EmailChangeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onEmailChange: (newEmail: string) => void;
	isDevelopment: boolean;
}

export const EmailChangeModal: React.FC<EmailChangeModalProps> = ({
	isOpen,
	onClose,
	onEmailChange,
	isDevelopment,
}) => {
	const [newEmail, setNewEmail] = useState("");
	const [isHovering, setIsHovering] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			await handleSignInWithOTP(newEmail, isDevelopment);

			onEmailChange(newEmail);
			setNewEmail("");
			onClose();
		} catch (error) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setIsLoading(true);

		try {
			await signInWithGoogleAuth();
		} catch (error) {
			console.error("Error signing in with Google:", error);
		}
		setIsLoading(false);
	};

	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
		>
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.95, opacity: 0 }}
				className="bg-white rounded-lg p-6 w-full max-w-md"
			>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-black">Change Email</h2>
					<button onClick={onClose} className="text-gray-500">
						<X size={24} />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="mb-6">
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							New Email
						</label>
						<input
							type="email"
							id="email"
							value={newEmail}
							onChange={(e) => setNewEmail(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-black focus:border-black text-black"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
						disabled={isLoading}
					>
						{isLoading ? "Processing..." : "Update Email"}
					</button>
				</form>
				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
				<div className="text-center mb-4">
					<span className="text-gray-500">or</span>
				</div>
				<motion.button
					onClick={handleGoogleSignIn}
					className="w-full p-2 flex justify-center items-center transition-all duration-200 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-black group"
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
					disabled={isLoading}
				>
					<Image
						src={
							isHovering
								? "/gauth/Web/svg/light/web_light_rd_SI.svg"
								: "/gauth/Web/svg/dark/web_dark_rd_SI.svg"
						}
						alt="Sign in with Google"
						width={200}
						height={50}
						className="h-auto"
					/>
				</motion.button>
			</motion.div>
		</motion.div>
	);
};
