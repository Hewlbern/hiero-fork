'use client'

import { useState } from 'react'
import { RefreshCw, MoreHorizontal, X, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ProfilePage() {
  const [firstName, setFirstName] = useState('Michael')
  const [lastName, setLastName] = useState('Holborn')
  const [email] = useState('michael.t.holborn@gmail.com')
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false)

  const handleSave = () => {
    // Implement save functionality here
    console.log('Saving profile changes...')
  }

  const handleSetup2FA = () => {
    setIs2FAModalOpen(true)
  }

  const handleClose2FAModal = () => {
    setIs2FAModalOpen(false)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText('AYV5HZHY4INSWTBFC2SOSWJ23M77')
    // Optionally, you can show a toast notification here
  }

  return (
    <div className="p-6 bg-[#F2E8DE] min-h-screen font-['Lexend_Mega',sans-serif]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#2D4B73]">Profile</h1>
        <Button variant="ghost" className="text-[#6366F1] hover:text-[#4F46E5] transition-colors">
          <RefreshCw className="mr-2 h-5 w-5" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="general" className="mb-8">
        <TabsList className="border-b border-gray-200">
          <TabsTrigger value="general" className="text-xl font-semibold px-4 py-2 text-[#2D4B73] border-b-2 border-transparent data-[state=active]:border-[#FF8A00] data-[state=active]:text-[#FF8A00]">General</TabsTrigger>
          <TabsTrigger value="security" className="text-xl font-semibold px-4 py-2 text-[#2D4B73] border-b-2 border-transparent data-[state=active]:border-[#FF8A00] data-[state=active]:text-[#FF8A00]">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-[#2D4B73] mb-2">Email</label>
              <div className="flex items-center">
                <Input
                  id="email"
                  value={email}
                  readOnly
                  className="w-full border-2 border-gray-300 rounded-md p-2 text-lg bg-gray-100"
                />
                <Button variant="ghost" className="ml-2">
                  <MoreHorizontal className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-lg font-medium text-[#2D4B73] mb-2">First Name</label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2 text-lg"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-lg font-medium text-[#2D4B73] mb-2">Last Name</label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2 text-lg"
                />
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="bg-[#FF8A00] text-white text-xl border-2 border-[#FF8A00] rounded-md hover:bg-[#E67A00] transition-colors px-6 py-2"
            >
              Save
            </Button>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-[#2D4B73] mb-4">Notifications</h2>
              <div className="flex items-center justify-between">
                <span className="text-lg text-[#2D4B73]">Email Notifications</span>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="bg-gray-200 data-[state=checked]:bg-[#FF8A00]"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div>
            <h2 className="text-2xl font-bold text-[#2D4B73] mb-4">Setup Two Factor Authentication App</h2>
            <Button
              onClick={handleSetup2FA}
              className="bg-[#FF8A00] text-white text-xl border-2 border-[#FF8A00] rounded-md hover:bg-[#E67A00] transition-colors px-6 py-2"
            >
              Setup
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={is2FAModalOpen} onOpenChange={setIs2FAModalOpen}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-4">Setup 2 Factor Auth</DialogTitle>
            <Button
              onClick={handleClose2FAModal}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
          <div className="space-y-6">
            <p className="text-lg">
              Use a mobile app like Google Authenticator to generate verification codes.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold mb-2">Scan this QR Code using the app.</p>
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="QR Code for 2FA setup"
                className="mx-auto"
                width={200}
                height={200}
              />
            </div>
            <div>
              <p className="font-semibold mb-2">Can&#39;t scan QR Code? Enter the code manually in the app.</p>
              <div className="flex items-center bg-gray-100 p-2 rounded-lg">
                <code className="flex-grow font-mono text-sm">AYV5HZHY4INSWTBFC2SOSWJ23M77</code>
                <Button onClick={handleCopyCode} variant="ghost" className="ml-2">
                  <Copy className="h-5 w-5" />
                  <span className="sr-only">Copy code</span>
                </Button>
              </div>
            </div>
            <Button
              className="w-full bg-[#FF8A00] text-white text-xl border-2 border-[#FF8A00] rounded-md hover:bg-[#E67A00] transition-colors px-6 py-2"
            >
              Next
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}