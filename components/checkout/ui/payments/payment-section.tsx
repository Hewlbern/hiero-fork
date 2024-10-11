'use client'
import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, ArrowRight } from 'lucide-react';


interface SaveCardButtonProps {
  onSave?: () => void;  // Made optional
  isTest?: boolean;
}


export function PaymentSection({ onSave,isTest = false }: SaveCardButtonProps) {
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });

  const handleCardDetailsChange = (field: string, value: string) => {
    setCardDetails({ ...cardDetails, [field]: value });
  };

  return (
    <>
      <h2 className="text-2xl text-black font-bold mb-4">Add Payment Method</h2>
      <p className="text-sm text-gray-600 mb-6">
        This is so we can confirm your identity to give your free tokens.
        <br />
        <strong className="text-black">You won't be charged</strong>
      </p>
      <div className="space-y-4 mb-6">
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Card number"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-black focus:outline-none bg-white text-black"
            value={cardDetails.number}
            onChange={(e) => handleCardDetailsChange('number', e.target.value)}
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="MM / YY"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-black focus:outline-none bg-white text-black"
            value={cardDetails.expiry}
            onChange={(e) => handleCardDetailsChange('expiry', e.target.value)}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="CVC"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-black focus:outline-none bg-white text-black"
            value={cardDetails.cvc}
            onChange={(e) => handleCardDetailsChange('cvc', e.target.value)}
          />
        </div>
      </div>
      <button 
        className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
        onClick={onSave}
      >
        <span>Save Card</span>
        <ArrowRight size={20} />
      </button>
    </>
  );
}