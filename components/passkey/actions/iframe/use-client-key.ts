interface UseClientKeyProps {
  secretKey?: string
  onError?: (error: Error) => void
}

export const useClientKey = ({ secretKey, onError }: UseClientKeyProps) => {
  const createClientKey = async (): Promise<string | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_APP_URL}/api/create-client-key`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            domain: window.location.hostname,
            secretKey
          })
        }
      )

      const data = await response.json()
      if (data.error) throw new Error(data.error)
      
      return data.clientKey
    } catch (err) {
      onError?.(err instanceof Error ? err : new Error('Failed to initialize'))
      return null
    }
  }

  return { createClientKey }
}
