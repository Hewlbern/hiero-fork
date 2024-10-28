interface UseAuthPopupProps {
  authAppUrl: string
}

export const useAuthPopup = ({ authAppUrl }: UseAuthPopupProps) => {
  const openPopup = (clientKey: string): Window | null => {
    return window.open(
      `${authAppUrl}/auth?key=${clientKey}`,
      'Passkey Authentication',
      'width=400,height=600'
    )
  }

  return { openPopup }
}
