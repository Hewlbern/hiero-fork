import React, { useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import InputOTPDemo from "@/components/auth/verification-code-input";
import { handleVerifyOTP } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

type SignInComponentProps = {
	email: string;
	onVerificationSuccess: () => void;
	isDevelopment: boolean;
};

const SignInComponent: React.FC<SignInComponentProps> = ({
	email,
	onVerificationSuccess,
	isDevelopment,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);

	const handleVerificationChange = (value: string) => {
		setVerificationCode(value.split(""));
	};

	const handleVerOTP = async () => {
		setIsLoading(true);
		setError(null);

		// Skip OTP verification if in development mode
		if (isDevelopment) {
			onVerificationSuccess();
			setIsLoading(false);
			return;
		}

		// ... existing code for production OTP handling ...
		if (verificationCode.some((code) => code === "")) {
			setError("Please enter the complete verification code.");
			setIsLoading(false);
			return;
		}

		const otp = verificationCode.join("");

		try {
			await handleVerifyOTP(email, otp, isDevelopment);
		} catch (error) {
			setError("An unexpected error occurred. Please try again.");
		}

		setIsLoading(false);
	};

	return (
		<>
			{isLoading ? (
				<div className="flex-grow flex items-center justify-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
				</div>
			) : (
				<>
					<div className="flex flex-col items-center justify-center">
						<h2 className="text-2xl text-black font-bold mb-4">
							Verify your email
						</h2>
						<p className="text-sm text-gray-600 mb-6 flex items-center">
							<Lock className="mr-2 text-gray-600" size={16} />
							Just making sure you're "you"{" "}
							<span className="ml-2" role="img" aria-label="winking face">
								😉
							</span>
						</p>
						<InputOTPDemo />
						{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
					</div>
					<div className="flex-grow"></div>
					<div>
						<div className="w-full h-0.5 bg-white mb-6"></div>
						<Button
							className="w-full py-6 text-base font-medium shadow-lg"
							onClick={handleVerOTP}
							disabled={isLoading}
						>
							Verify
						</Button>
					</div>
				</>
			)}
		</>
	);
};

export default SignInComponent;
