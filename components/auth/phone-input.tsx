import { CheckIcon, ChevronsUpDown } from "lucide-react";

import * as React from "react";

import * as RPNInput from "react-phone-number-input";

import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input, InputProps } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import { handleSendOtp, handleVerifyOtp } from "@/app/actions/auth";

type PhoneInputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"onChange" | "value"
> &
	Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
		onChange?: (value: RPNInput.Value) => void;
	};

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
	React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
		({ className, onChange, ...props }, ref) => {
			const [phoneNumber, setPhoneNumber] = React.useState<string>("");
			const [loading, setLoading] = React.useState(false);
			const [otpSent, setOtpSent] = React.useState(false);
			const [otp, setOtp] = React.useState("");

			const handleSendOtpClick = async () => {
				if (!phoneNumber) return;
				setLoading(true);
				await handleSendOtp(phoneNumber as string);
				setLoading(false);
				setOtpSent(true);
			};

			const handleVerifyOtpClick = async () => {
				if (!phoneNumber || !otp) return;
				setLoading(true);
				await handleVerifyOtp(phoneNumber as string, otp);
				setLoading(false);
			};

			return (
				<div className={cn("flex flex-col gap-4", className)}>
					<RPNInput.default
						ref={ref}
						className="flex"
						flagComponent={FlagComponent}
						countrySelectComponent={CountrySelect}
						inputComponent={InputComponent}
						value={phoneNumber}
						onChange={(value) => {
							setPhoneNumber(value || "");
							if (value) {
								onChange?.(value);
							}
						}}
						{...props}
					/>
					{!otpSent ? (
						<Button
							onClick={handleSendOtpClick}
							disabled={loading || !phoneNumber}
						>
							{loading ? "Sending..." : "Send OTP"}
						</Button>
					) : (
						<>
							<Input
								type="text"
								placeholder="Enter OTP"
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
							/>
							<Button onClick={handleVerifyOtpClick} disabled={loading || !otp}>
								{loading ? "Verifying..." : "Verify OTP"}
							</Button>
						</>
					)}
				</div>
			);
		}
	);
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => (
		<Input
			className={cn("rounded-e-lg rounded-s-none", className)}
			{...props}
			ref={ref}
		/>
	)
);
InputComponent.displayName = "InputComponent";

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
	disabled?: boolean;
	value: RPNInput.Country;
	onChange: (value: RPNInput.Country) => void;
	options: CountrySelectOption[];
};

const CountrySelect = ({
	disabled,
	value,
	onChange,
	options,
}: CountrySelectProps) => {
	const handleSelect = React.useCallback(
		(country: RPNInput.Country) => {
			onChange(country);
		},
		[onChange]
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant={"outline"}
					className={cn("flex gap-1 rounded-e-none rounded-s-lg px-3")}
					disabled={disabled}
				>
					<FlagComponent country={value} countryName={value} />
					<ChevronsUpDown
						className={cn(
							"-mr-2 h-4 w-4 opacity-50",
							disabled ? "hidden" : "opacity-100"
						)}
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0">
				<Command>
					<CommandInput placeholder="Search country..." />
					<CommandEmpty>No country found.</CommandEmpty>
					<CommandList className="max-h-[300px] overflow-y-auto">
						<CommandGroup>
							{options
								.filter((x) => x.value)
								.map((option) => (
									<CommandItem
										className="gap-2"
										key={option.value}
										onSelect={() => handleSelect(option.value)}
									>
										<FlagComponent
											country={option.value}
											countryName={option.label}
										/>
										<span className="flex-1 text-sm">{option.label}</span>
										{option.value && (
											<span className="text-foreground/50 text-sm">
												{`+${RPNInput.getCountryCallingCode(option.value)}`}
											</span>
										)}
										<CheckIcon
											className={cn(
												"ml-auto h-4 w-4",
												option.value === value ? "opacity-100" : "opacity-0"
											)}
										/>
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
	const Flag = flags[country];

	return (
		<span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
			{Flag && <Flag title={countryName} />}
		</span>
	);
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };
