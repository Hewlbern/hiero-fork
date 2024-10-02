import React from 'react';

interface HieroIconCheckoutButtonProps {
  appName: string;
  redirectUrl: string;
  email?: string;
}

const HieroIconCheckoutButton: React.FC<HieroIconCheckoutButtonProps> = ({ appName, redirectUrl, email }) => {
  const handleCheckout = () => {
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);
    let checkoutUrl = `https://hiero.gl/a/${appName}?redirect_url=${encodedRedirectUrl}`;
    if (email) {
      checkoutUrl += `&email=${encodeURIComponent(email)}`;
    }
    window.location.href = checkoutUrl;
  };

  return (
    <button
      onClick={handleCheckout}
      className="checkout-button"
      aria-label="Checkout with Hiero"
    >
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0_0-aE3lQTKvjejCvz1zNOuHwtOp4aAvAi.jpeg"
        alt="Hiero logo"
        className="icon"
      />
      <style jsx>{`
        .checkout-button {
          position: relative;
          width: 5rem;
          height: 5rem;
          padding: 0;
          background-color: black;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          outline: none;
          transition: all 0.3s;
          overflow: hidden;
        }
        .checkout-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 0 4px #facc15, 8px 8px 0px 0px rgba(250,204,21,0.5);
        }
        .checkout-button:focus {
          outline: none;
          box-shadow: 0 0 0 4px #facc15, 0 0 0 8px rgba(0,0,0,0.3);
        }
        .icon {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .checkout-button:hover .icon {
          transform: scale(1.1) rotate(12deg);
        }
        @media (min-width: 640px) {
          .checkout-button {
            width: 6rem;
            height: 6rem;
          }
        }
      `}</style>
    </button>
  );
};

export default HieroIconCheckoutButton;