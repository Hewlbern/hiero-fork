import React from 'react'
import HieroCheckoutButton from 'hiero-ui';

const DoryAIFreeTrialPage: React.FC = () => {
  return (
    <div className="h-screen bg-black text-white font-sans antialiased flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            Enhance Your Mind with <span className="text-blue-400">DoryAI</span>
          </h1>
          <p className="text-lg text-gray-300">
            AI-powered cognitive assistance at your fingertips.
          </p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {['Personalized training', 'Real-time assistance', 'Data analytics', 'Device integration'].map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border-2 border-blue-400 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Start Your Free Trial</h2>
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-bold">1 Month</span>
            <span className="text-xl ml-2">Free Trial</span>
          </div>
          <div className="mb-4">
            <HieroCheckoutButton 
              appName="doryai"
              redirectUrl="https://doryai.com/checkout/complete"
              email="user@example.com" // Optional
            />
          </div>
          <p className="text-xs text-gray-400">
            By signing up, you agree to our Terms and Privacy Policy. 
            After the trial, continue for $29.99/month. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoryAIFreeTrialPage