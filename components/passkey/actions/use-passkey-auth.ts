import { useClientKey } from './iframe/use-client-key'
import { useAuthPopup } from './iframe/use-auth-popup'
import { useAuthMessageHandler } from './iframe/use-auth-message-handler'

interface PasskeyAuthProps {
  secretKey?: string
  onSuccess?: (userId: string) => void
  onError?: (error: Error) => void
}

export const usePasskeyAuth = ({
  secretKey,
  onSuccess = (userId: string) => console.log('User authenticated:', userId),
  onError = (error: Error) => console.error('Authentication error:', error)
}: PasskeyAuthProps) => {
  const authAppUrl = process.env.NEXT_PUBLIC_AUTH_APP_URL || ''
  
  const { createClientKey } = useClientKey({ secretKey, onError })
  const { openPopup } = useAuthPopup({ authAppUrl })
  const { setupMessageListener } = useAuthMessageHandler({ 
    authAppUrl, 
    onSuccess 
  })

  const initializeAuth = async (): Promise<Window | null> => {
    const clientKey = await createClientKey()
    if (!clientKey) return null
    
    return openPopup(clientKey)
  }

  return { initializeAuth, setupMessageListener }
}
