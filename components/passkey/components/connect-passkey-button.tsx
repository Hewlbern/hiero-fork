import React from 'react'
import { Button } from "@/components/ui/button"

interface ConnectPasskeyButtonProps {
  isClicked: boolean
  onClick: () => void
}

const ConnectPasskeyButton: React.FC<ConnectPasskeyButtonProps> = ({ isClicked, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={`
        bg-white border-2 border-white
        hover:shadow-[6px_6px_0px_0px_rgba(255,59,48,1)]
        hover:translate-x-[-6px] hover:translate-y-[-6px]
        active:shadow-[6px_6px_0px_0px_rgba(255,59,48,1)]
        active:translate-x-[-6px] active:translate-y-[-6px]
        transition-all font-bold text-lg px-6 py-3 
        ${isClicked ? 'text-white' : 'text-black'}
      `}
    >
      Connect Passkey
    </Button>
  )
}

export default ConnectPasskeyButton
