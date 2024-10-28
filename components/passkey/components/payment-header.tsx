import React from 'react'

const PaymentHeader: React.FC = () => {
  return (
    <header className="mb-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-none uppercase text-left">
        Experience the Future<br />
        of Payments,<br />
        <span className="text-red-500 bg-white mt-1 mb-1 px-1">Connect Now</span>
      </h1>
    </header>
  )
}

export default PaymentHeader
