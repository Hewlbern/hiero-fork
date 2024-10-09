'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type Message = {
  text: string
  isTyping: boolean
}

export default function Matrix() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [state, setState] = useState(0)
  const [userData, setUserData] = useState<{ region?: string; mobile?: string; creditCard?: string; passcode?: string }>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(scrollToBottom, [messages])

  const typeMessage = useCallback((text: string) => {
    return new Promise<void>(resolve => {
      setMessages(prev => [...prev, { text: '', isTyping: true }])
      let index = 0
      const intervalId = setInterval(() => {
        if (index < text.length) {
          setMessages(prev => {
            const newMessages = [...prev]
            newMessages[newMessages.length - 1] = {
              text: text.slice(0, index + 1),
              isTyping: true
            }
            return newMessages
          })
          index++
        } else {
          clearInterval(intervalId)
          setMessages(prev => {
            const newMessages = [...prev]
            newMessages[newMessages.length - 1] = {
              text: text,
              isTyping: false
            }
            return newMessages
          })
          resolve()
        }
      }, 50)
    })
  }, [])

  const botMessage = useCallback((text: string) => {
    return typeMessage(`> ${text}`)
  }, [typeMessage])

  const processUserInput = useCallback(async (input: string) => {
    input = input.trim()
    if (input === '') return
    await typeMessage(input)

    switch(state) {
      case 0:
        setUserData(prev => ({ ...prev, region: input.toUpperCase() }))
        setState(1)
        await new Promise(resolve => setTimeout(resolve, 1000))
        await botMessage('Please enter your mobile number:')
        break
      case 1:
        setUserData(prev => ({ ...prev, mobile: input }))
        setState(2)
        await new Promise(resolve => setTimeout(resolve, 1000))
        await botMessage('Great work Hiero. Now we can connect over a secure line.')
        await new Promise(resolve => setTimeout(resolve, 1000))
        await botMessage('Enter your credit card number \(Don\'t worry, this is a secure process\):')
        break
      case 2:
        setUserData(prev => ({ ...prev, creditCard: input }))
        setState(3)
        await new Promise(resolve => setTimeout(resolve, 1000))
        await botMessage('A passcode has been sent to your mobile device. Now, please enter it:')
        break
      case 3:
        setUserData(prev => ({ ...prev, passcode: input }))
        setState(4)
        await new Promise(resolve => setTimeout(resolve, 500))
        await botMessage('Your credit card has been saved. You have been credited with 1 million tokens to use within Hiero.')
        await new Promise(resolve => setTimeout(resolve, 500))
        await botMessage('Would you like to accept one of our special offers?')
        await new Promise(resolve => setTimeout(resolve, 500))
        await botMessage('1. 80% off Hiero subscription for a year.')
        await new Promise(resolve => setTimeout(resolve, 500))
        await botMessage('2. 15% off Hiero subscription for a month.')
        await new Promise(resolve => setTimeout(resolve, 500))
        await botMessage('3. Do not accept any offer.')
        break
      case 4:
        if (input === '1') {
          await botMessage('You have selected 80% off for a year. Congratulations on your premium subscription!')
        } else if (input === '2') {
          await botMessage('You have selected 15% off for a month. Enjoy your premium subscription!')
        } else if (input === '3') {
          await botMessage('You have chosen not to accept any offer. You can still enjoy the basic features of Quillow.')
        } else {
          await botMessage('Please select either 1, 2, or 3 for your choice.')
          return
        }
        setState(5)
        await new Promise(resolve => setTimeout(resolve, 1000))
        await botMessage('Thank you for connecting with Quillow.')
        await new Promise(resolve => setTimeout(resolve, 1000))
        await typeMessage(`
     /\\_/\\
    ( o.o )
     > ^ <
Follow the white rabbit, Hiero.
        `)
        break
      default:
        await botMessage('Type "restart" to begin again.')
    }
  }, [state, botMessage, typeMessage])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    processUserInput(input)
    setInput('')
  }, [input, processUserInput])

  useEffect(() => {
    const initChat = async () => {
      await typeMessage('Wake up, Hiero...')
      await new Promise(resolve => setTimeout(resolve, 2000))
      setMessages([])  // Clear the "Wake up, Hiero..." message
      await new Promise(resolve => setTimeout(resolve, 1000))
      await botMessage('Connecting to Quillow - Your AI-powered second brain.')
      await new Promise(resolve => setTimeout(resolve, 1000))
      await botMessage('I am Hiero.gl, your connection agent.')
      await new Promise(resolve => setTimeout(resolve, 1000))
      await botMessage('To get started, which region are you connecting from? (e.g., AU, US)')
    }
    initChat()
  }, [botMessage, typeMessage])

  return (
    <div className="min-h-screen w-full bg-black text-[#00FF41] font-mono flex flex-col justify-between p-4">
      <div className="w-full  mx-auto flex-grow overflow-hidden flex flex-col">
        <div id="messages" className="flex-grow overflow-y-auto p-5 mb-5 scrollbar-thin scrollbar-thumb-[#00FF41] scrollbar-track-black">
          {messages.map((message, index) => (
            <div key={index} className={`my-2 ${message.text.startsWith('>') ? '' : 'text-right'}`}>
              <pre className="whitespace-pre-wrap">{message.text}{message.isTyping && '▋'}</pre>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex mt-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-black text-[#00FF41] border border-[#00FF41] p-2.5 text-base focus:outline-none focus:ring-1 focus:ring-[#00FF41]"
            placeholder="Type your response..."
            autoFocus
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-black text-[#00FF41] border border-[#00FF41] px-5 py-2.5 text-base cursor-pointer hover:bg-[#00FF41] hover:text-black transition-colors ml-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}