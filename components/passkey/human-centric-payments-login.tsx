"use client";

import React, { useState } from "react";
import ConnectPasskeyButton from "./components/connect-passkey-button";
import RotatingCube from "./components/rotating-cube";
import PaymentSteps from "./components/payment-steps";
import { usePasskeyHandler } from "./actions/use-passkey-handler";
import PaymentHeader from "./components/payment-header";

const HumanCentricPaymentsLogin: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const toggleCube = (): void => {
    setIsOpen(!isOpen);
  };

  const handleClick = usePasskeyHandler({
    setIsOpen,
    setActiveStep,
    setIsClicked,
    secretKey: process.env.NEXT_PUBLIC_PASSKEY_SIGNING_KEY,
    onSuccess: (userId) => {
      // Handle successful authentication
    },
    onError: (error) => {
      // Handle errors
    }
  });

  const steps: string[] = [
    "Connect your Passkey",
    "Open the box",
    "Claim your prize",
  ];

  return (
    <div className="bg-black text-white font-sans p-4 sm:p-6 flex flex-col justify-between border-4 border-white">
      <PaymentHeader />

      <main className="flex flex-col sm:flex-row items-start justify-between mt-6">
        <PaymentSteps steps={steps} activeStep={activeStep} />

        <div className="w-full sm:w-1/2 flex justify-center items-center">
          <RotatingCube isOpen={isOpen} onClick={toggleCube} />
        </div>
      </main>

      <footer className="mt-6 flex justify-end">
        <ConnectPasskeyButton
          isClicked={isClicked}
          onClick={handleClick}
        />
      </footer>
    </div>
  );
};

export default HumanCentricPaymentsLogin;
