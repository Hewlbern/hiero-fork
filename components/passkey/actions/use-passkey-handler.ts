import { Dispatch, SetStateAction } from 'react'
import { usePasskeyAuth } from './use-passkey-auth'

interface PasskeyHandlerProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setActiveStep: Dispatch<SetStateAction<number>>
  setIsClicked: Dispatch<SetStateAction<boolean>>
  secretKey?: string
  onSuccess?: (userId: string) => void
  onError?: (error: Error) => void
}

export const usePasskeyHandler = ({
  setIsOpen,
  setActiveStep,
  setIsClicked,
  secretKey,
  onSuccess,
  onError
}: PasskeyHandlerProps) => {
  const { initializeAuth, setupMessageListener } = usePasskeyAuth({
    secretKey,
    onSuccess,
    onError: (error) => {
      setIsOpen(false)
      onError?.(error)
    }
  })

  const handleButtonClick = async (): Promise<void> => {
    setIsOpen(true)
    setActiveStep(1)
    setIsClicked(true)

    const popup = await initializeAuth()
    setupMessageListener(popup)
  }

  return handleButtonClick
}
