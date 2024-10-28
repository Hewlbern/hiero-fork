import { deserializePublicKey, serializeCredential } from './webauthn'

interface UseAuthMessageHandlerProps {
  authAppUrl: string
  onSuccess: (userId: string) => void
}

export const useAuthMessageHandler = ({ 
  authAppUrl, 
  onSuccess 
}: UseAuthMessageHandlerProps) => {
  const setupMessageListener = (popup: Window | null) => {
    const handleMessage = async (event: MessageEvent) => {
      // Verify message origin
      if (event.origin !== authAppUrl) return;

      switch (event.data.type) {
        case 'PASSKEY_REQUEST':
          try {
            const credential = await navigator.credentials.get({
              publicKey: deserializePublicKey(event.data.options),
            });

            popup?.postMessage(
              {
                type: 'PASSKEY_RESPONSE',
                credential: serializeCredential(credential),
              },
              authAppUrl
            );
          } catch (error) {
            popup?.postMessage(
              {
                type: 'PASSKEY_ERROR',
                error: error instanceof Error ? error.message : 'Unknown error',
              },
              authAppUrl
            );
          }
          break;

        case 'PASSKEY_AUTH_SUCCESS':
          onSuccess(event.data.userId);
          popup?.close();
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  };

  return { setupMessageListener };
};
