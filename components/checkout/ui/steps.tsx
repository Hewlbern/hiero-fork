import React from 'react'

interface Step {
  title: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                    : 'bg-gray-300'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-1/2 left-10 w-full h-0.5 ${
                    index < currentStep ? 'bg-emerald-400' : 'bg-gray-300'
                  }`}
                  style={{
                    backgroundImage:
                      index < currentStep
                        ? 'linear-gradient(to right, #22d3ee, #34d399)'
                        : 'none',
                    backgroundSize: '8px 2px',
                    backgroundRepeat: 'repeat-x',
                  }}
                ></div>
              )}
            </div>
            <p
              className={`mt-2 text-sm text-center ${
                index <= currentStep ? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepIndicator