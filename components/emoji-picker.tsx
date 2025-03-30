"use client"

import { useState, useRef, useEffect } from "react"
import { Smile } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

// Common emojis for quick access
const commonEmojis = [
  "😊",
  "😂",
  "👍",
  "❤️",
  "🎉",
  "🔥",
  "👏",
  "🙏",
  "😍",
  "🤔",
  "👀",
  "✅",
  "⭐",
  "🚀",
  "💯",
  "👋",
  "🤣",
  "😁",
  "🥰",
  "😎",
  "🤩",
  "😇",
  "🤗",
  "🙌",
]

export default function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        buttonRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="rounded-full h-8 w-8 hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Smile className="h-5 w-5 text-gray-400" />
      </Button>

      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute bottom-full right-0 mb-2 p-2 bg-gray-800 rounded-lg shadow-lg z-10 w-64"
        >
          <div className="grid grid-cols-8 gap-1">
            {commonEmojis.map((emoji, index) => (
              <button
                key={index}
                className="h-8 w-8 flex items-center justify-center hover:bg-gray-700 rounded"
                onClick={() => handleEmojiClick(emoji)}
              >
                <span className="text-lg">{emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

