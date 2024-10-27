'use client'

import { useState } from 'react'
import { Copy, Info, PlusCircle, ArrowRight, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from 'next/link'

interface AgentDetailsProps {
  agent?: {
    id: string;
    name: string;
    status: "active" | "inactive";
    lastUsed: string;
  };
}

interface WebhookHeader {
  id: string;
  key: string;
  value: string;
}

const defaultAgent = {
  id: "agt-demo-0000-0000-0000-000000000000",
  name: "demo",
  status: "active" as const,
  lastUsed: new Date().toISOString(),
};

export function AgentDetails({ agent = defaultAgent }: AgentDetailsProps) {
  const [activeTab, setActiveTab] = useState("funds")
  const [endpointUrl, setEndpointUrl] = useState("https://")
  const [agentName, setAgentName] = useState(agent.name)
  const [agentDescription, setAgentDescription] = useState("A demo agent for testing purposes")
  const [webhookHeaders, setWebhookHeaders] = useState<WebhookHeader[]>([])
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false)
  const [fundAmount, setFundAmount] = useState("")

  const handleSaveChanges = () => {
    console.log("Saving changes...")
    // Implement API call to save changes
  }

  const handleAddFunds = () => {
    console.log(`Adding ${fundAmount} funds...`)
    setIsAddFundsModalOpen(false)
    setFundAmount("")
    // Implement API call to add funds
  }

  const handleAddNewHeader = () => {
    const newHeader: WebhookHeader = {
      id: Date.now().toString(),
      key: "",
      value: ""
    }
    setWebhookHeaders([...webhookHeaders, newHeader])
  }

  const handleUpdateHeader = (id: string, field: 'key' | 'value', value: string) => {
    setWebhookHeaders(webhookHeaders.map(header => 
      header.id === id ? { ...header, [field]: value } : header
    ))
  }

  const handleDeleteHeader = (id: string) => {
    setWebhookHeaders(webhookHeaders.filter(header => header.id !== id))
  }

  const handleRefreshKey = () => {
    console.log("Refreshing API key...")
    // Implement API call to refresh API key
  }

  return (
    <div className="p-6 bg-[#F2E8DE] min-h-screen font-['Lexend_Mega',sans-serif]">
      <div className="flex items-center mb-6">
        <Link href="/agent">
          <h1 className="text-2xl font-bold text-[#2D4B73] mr-2 cursor-pointer">Agents</h1>
        </Link>
        <ArrowRight className="h-5 w-5 text-[#2D4B73] mx-2" />
        <h2 className="text-2xl font-bold text-[#2D4B73] mr-2">{agent.name}</h2>
        <div className="bg-[#E6F7ED] text-[#1F7F4C] px-2 py-1 rounded-md text-sm font-medium flex items-center">
          <Copy className="h-4 w-4 mr-1" />
          {agent.id}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="border-b border-gray-200">
          <TabsTrigger value="funds" className="text-xl font-semibold px-4 py-2 text-[#2D4B73] border-b-2 border-transparent data-[state=active]:border-[#FF8A00] data-[state=active]:text-[#FF8A00]">Funds</TabsTrigger>
          <TabsTrigger value="tasks" className="text-xl font-semibold px-4 py-2 text-[#2D4B73] border-b-2 border-transparent data-[state=active]:border-[#FF8A00] data-[state=active]:text-[#FF8A00]">Tasks</TabsTrigger>
          <TabsTrigger value="webhook" className="text-xl font-semibold px-4 py-2 text-[#2D4B73] border-b-2 border-transparent data-[state=active]:border-[#FF8A00] data-[state=active]:text-[#FF8A00]">Webhook</TabsTrigger>
          <TabsTrigger value="settings" className="text-xl font-semibold px-4 py-2 text-[#2D4B73] border-b-2 border-transparent data-[state=active]:border-[#FF8A00] data-[state=active]:text-[#FF8A00]">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="funds" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-2 border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-2xl font-bold mr-2">Wallet</span>
                  <span className="bg-[#E6F7ED] text-[#1F7F4C] px-2 py-1 rounded-md text-sm font-medium">USD</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="bg-[#E6F7ED] p-4 rounded-lg mr-4">
                    <PlusCircle className="h-8 w-8 text-[#1F7F4C]" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">US$100.00</p>
                    <p className="text-gray-500">Total Funds</p>
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <div className="bg-[#FFF9E6] px-3 py-2 rounded-md">
                    <p className="text-[#B7791F] font-medium">US$0.00</p>
                    <p className="text-sm text-gray-500">Pending</p>
                  </div>
                  <div className="bg-[#E6F7ED] px-3 py-2 rounded-md">
                    <p className="text-[#1F7F4C] font-medium">US$100.00</p>
                    <p className="text-sm text-gray-500">Available</p>
                  </div>
                </div>
                <Button onClick={() => setIsAddFundsModalOpen(true)} className="w-full bg-[#FF8A00] text-white hover:bg-[#E67A00]">
                  + Add Funds
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>01 Sep 2024</TableCell>
                      <TableCell>
                        <span className="bg-[#E6F7ED] text-[#1F7F4C] px-2 py-1 rounded-md text-sm font-medium">
                          Deposit
                        </span>
                      </TableCell>
                      <TableCell className="text-right">US$100.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6 bg-white border-2 border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Spend Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Monthly</span>
                <span className="font-medium">Unlimited</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Per Transaction</span>
                <span className="font-medium">Unlimited</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <Card className="bg-white border-2 border-gray-200 shadow-md p-8 text-center">
            <img src="/placeholder.svg?height=100&width=100" alt="No tasks" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">There are no tasks available at the moment.</h3>
            <p className="text-gray-500">Check back later.</p>
          </Card>
        </TabsContent>

        <TabsContent value="webhook" className="mt-6">
          <Card className="bg-white border-2 border-gray-200 shadow-md">
            <CardContent className="p-6">
              <p className="mb-4">
                Set up your webhook endpoint to receive live events from Payman or{" "}
                <a href="#" className="text-[#FF8A00] hover:underline">learn more about Webhooks</a>.
              </p>
              <div className="mb-4">
                <label htmlFor="endpointUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Endpoint URL
                </label>
                <Input
                  id="endpointUrl"
                  value={endpointUrl}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Headers</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Key</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {webhookHeaders.map((header) => (
                      <TableRow key={header.id}>
                        <TableCell>
                          <Input
                            value={header.key}
                            onChange={(e) => handleUpdateHeader(header.id, 'key', e.target.value)}
                            className="w-full border-2 border-gray-300 rounded-md p-2"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={header.value}
                            onChange={(e) => handleUpdateHeader(header.id, 'value', e.target.value)}
                            className="w-full border-2 border-gray-300 rounded-md p-2"
                          />
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleDeleteHeader(header.id)} variant="ghost">
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button onClick={handleAddNewHeader} variant="link" className="mt-2 text-[#FF8A00]">
                  + Add New Header
                </Button>
              </div>
              <Button onClick={handleSaveChanges} className="bg-[#FF8A00] text-white hover:bg-[#E67A00]">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="bg-white border-2 border-gray-200 shadow-md">
            <CardContent className="p-6">
              <div className="mb-4">
                <label htmlFor="agentName" className="block text-sm font-medium text-gray-700 mb-1">
                  Agent Name
                </label>
                <Input
                  id="agentName"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="agentDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  id="agentDescription"
                  value={agentDescription}
                  onChange={(e) => setAgentDescription(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                  rows={3}
                />
              </div>
              <Button onClick={handleSaveChanges} className="bg-[#FF8A00] text-white hover:bg-[#E67A00] mb-6">
                Save Changes
              </Button>
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">API Key</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>API Key</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Refresh</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>••••••••••••••••</TableCell>
                      <TableCell>01 Sep 2025</TableCell>
                      <TableCell>
                        <Button onClick={handleRefreshKey} className="bg-[#FF8A00] text-white hover:bg-[#E67A00]">
                          Refresh Key
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddFundsModalOpen} onOpenChange={setIsAddFundsModalOpen}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">Add Funds</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="fundAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount (USD)
              </label>
              <Input
                id="fundAmount"
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-md p-2"
                placeholder="Enter amount"
              />
            </div>
            <Button onClick={handleAddFunds} className="w-full bg-[#FF8A00] text-white hover:bg-[#E67A00]">
              Add Funds
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}