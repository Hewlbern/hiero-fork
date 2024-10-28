'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AgentDetails } from '@/components/agents/agent-details'


export default function AgentPage() {
  const params = useParams()
  const id = params?.id
  const [agentId, setAgentId] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      setAgentId(id as string)
    }
  }, [id])

  return (
    <main >
    
        {agentId && <AgentDetails agent={{ id: agentId, name: 'Agent Name', status: 'active', lastUsed: '2023-10-01' }} />}
    </main>
  )
}
