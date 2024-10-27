'use client'

import { useState, useEffect } from "react"
import { PlusCircle, Bot, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

interface Agent {
  id: string;
  name: string;
  status: "active" | "inactive";
  lastUsed: string;
}

interface AgentScreenProps {
  id?: string;
}

export function AgentScreen({ id }: AgentScreenProps) {
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  useEffect(() => {
    if (id) {
      const agent = agents.find(agent => agent.id === id)
      setSelectedAgent(agent || null)
    }
  }, [id, agents])

  const addAgent = () => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: `Agent ${agents.length + 1}`,
      status: "active",
      lastUsed: new Date().toISOString(),
    }
    setAgents([...agents, newAgent])
  }

  const removeAgent = (id: string) => {
    setAgents(agents.filter(agent => agent.id !== id))
  }

  return (
    <div className="p-6 bg-[#F2E8DE] min-h-screen font-['Lexend_Mega',sans-serif]">
      <h1 className="text-4xl font-bold text-[#2D4B73] mb-8">AI Agents</h1>
      
      {selectedAgent ? (
        <Card className="bg-[#A67F5D] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Bot className="mr-2 h-6 w-6" />
              {selectedAgent.name}
            </CardTitle>
            <Button
              onClick={() => removeAgent(selectedAgent.id)}
              variant="ghost"
              className="text-white hover:text-[#D05353] transition-colors"
            >
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Remove agent</span>
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-white mb-2">Status: <span className={selectedAgent.status === "active" ? "text-[#7C9885]" : "text-[#D05353]"}>{selectedAgent.status}</span></p>
            <p className="text-white">Last used: {new Date(selectedAgent.lastUsed).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {agents.length === 0 ? (
            <Card className="bg-[#4A7B9D] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
              <CardContent>
                <p className="text-white text-xl mb-4">Looks like you haven&apos;t integrated any AI Agents yet.</p>
                <p className="text-white text-lg mb-6">Start enabling your AI with funds to pay humans!</p>
                <Button 
                  onClick={addAgent}
                  className="bg-[#7C9885] text-white text-xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center px-6 py-3"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Integrate Agent
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {agents.map(agent => (
                  <Link key={agent.id} href={`/protected/agent/${agent.id}`}>
                    <Card className="bg-[#A67F5D] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-white flex items-center">
                          <Bot className="mr-2 h-6 w-6" />
                          {agent.name}
                        </CardTitle>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeAgent(agent.id)
                          }}
                          variant="ghost"
                          className="text-white hover:text-[#D05353] transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">Remove agent</span>
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white mb-2">Status: <span className={agent.status === "active" ? "text-[#7C9885]" : "text-[#D05353]"}>{agent.status}</span></p>
                        <p className="text-white">Last used: {new Date(agent.lastUsed).toLocaleDateString()}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              <Button 
                onClick={addAgent}
                className="bg-[#7C9885] text-white text-xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center px-6 py-3"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Another Agent
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}