import React from 'react';

interface CheckoutWithHieroProps {
  appName: string;
  redirectUrl: string;
  email?: string;
}

const CheckoutWithHiero: React.FC<CheckoutWithHieroProps> = ({ appName, redirectUrl, email }) => {
  const handleCheckout = () => {
    const encodedRedirectUrl = encodeURIComponent(redirectUrl);
    let checkoutUrl = `https://hiero.gl/a/${appName}?redirect_url=${encodedRedirectUrl}`;
    if (email) {
      checkoutUrl += `&email=${encodeURIComponent(email)}`;
    }
    window.location.href = checkoutUrl;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0,
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
    }}>
      <button
        onClick={handleCheckout}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '42rem',
          padding: '1.5rem 2rem',
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '0.75rem',
          fontWeight: 900,
          fontSize: '2.25rem', // Increased from 1.875rem
          textTransform: 'uppercase',
          letterSpacing: '-0.05em',
          transition: 'all 0.3s',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
        }}
        className="checkout-button"
      >
        <span className="checkout-text">Checkout with Hiero</span>
        <div className="icon-wrapper">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0_0-aE3lQTKvjejCvz1zNOuHwtOp4aAvAi.jpeg"
            alt="Hiero logo"
            className="icon"
          />
        </div>
      </button>
      <style jsx>{`
        .checkout-button:hover {
          transform: scale(1.05);
          border: 8px solid #facc15;
          box-shadow: 16px 16px 0px 0px rgba(250,204,21,1);
        }
        .checkout-button:focus {
          outline: none;
          box-shadow: 0 0 0 4px #facc15, 0 0 0 8px black;
        }
        .checkout-text {
          transition: transform 0.3s;
        }
        .checkout-button:hover .checkout-text {
          transform: scale(1.1);
        }
        .icon-wrapper {
          position: relative;
          width: 5rem;
          height: 5rem;
          overflow: hidden;
          border-radius: 50%;
          background-color: white;
          transition: all 0.3s;
        }
        .checkout-button:hover .icon-wrapper {
          transform: scale(1.25) rotate(12deg);
          box-shadow: 0 0 0 4px #facc15;
        }
        .icon {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .checkout-button:hover .icon {
          transform: scale(1.1);
        }
        @media (min-width: 640px) {
          .checkout-button {
            font-size: 2.5rem; // Increased from 2.25rem
          }
          .icon-wrapper {
            width: 6rem; // Increased from 5rem
            height: 6rem; // Increased from 5rem
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutWithHiero;