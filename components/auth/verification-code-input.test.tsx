import React from 'react';
import { render, screen } from '@testing-library/react';
import { VerificationCodeInput } from './verification-code-input';
import '@testing-library/jest-dom';

// Mock the InputOTP component
jest.mock('@/components/ui/input-otp', () => ({
  InputOTP: ({ render: renderProp }: { render: any }) => renderProp({ slots: {} }),
  InputOTPGroup: ({ children }: { children: React.ReactNode }) => <div data-testid="otp-group">{children}</div>,
  InputOTPSlot: ({ index }: { index: number }) => <input data-testid={`otp-slot-${index}`} />,
}));

describe('VerificationCodeInput', () => {
  it('renders without crashing', () => {
    const mockOnChange = jest.fn();
    render(<VerificationCodeInput value={null} onChange={mockOnChange} />);
    
    const otpGroup = screen.getByTestId('otp-group');
    expect(otpGroup).toBeInTheDocument();

    for (let i = 0; i < 4; i++) {
      const slot = screen.getByTestId(`otp-slot-${i}`);
      expect(slot).toBeInTheDocument();
    }
  });

  it('handles undefined slots gracefully', () => {
    const mockOnChange = jest.fn();
    render(<VerificationCodeInput value={null} onChange={mockOnChange} />);
    
    // This test passes if the component renders without throwing an error
    expect(screen.getByTestId('otp-group')).toBeInTheDocument();
  });
});