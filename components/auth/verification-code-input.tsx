import React, { useState, useEffect } from "react";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";

export default function InputOTPDemo() {
	const [mounted, setMounted] = useState(false);
	const [value, setValue] = useState("");

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null; // or a loading placeholder
	}

	return (
		<InputOTP maxLength={6} value={value} onChange={setValue}>
			<InputOTPGroup>
				{[0, 1, 2].map((index) => (
					<InputOTPSlot key={index} index={index} />
				))}
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				{[3, 4, 5].map((index) => (
					<InputOTPSlot key={index} index={index} />
				))}
			</InputOTPGroup>
		</InputOTP>
	);
}
