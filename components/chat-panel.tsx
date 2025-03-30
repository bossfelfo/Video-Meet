"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EmojiPicker from "@/components/emoji-picker"

interface Participant {
  id: number
  name: string
  color: string
  company?: string
  pronouns?: string
}

interface ChatMessage {
  id: number
  senderId: number
  text: string
  timestamp: string
}

// Mock chat messages
const initialMessages: ChatMessage[] = [
  {
    id: 1,
    senderId: 1,
    text: "No wonder they say that you need able to leave in time. The clearest examples this are Lam and Alonso",
    timestamp: "4mins ago",
  },
  {
    id: 2,
    senderId: 2,
    text: "This is really coming together. I do think we are missing information from customer service though.",
    timestamp: "2mins ago",
  },
  {
    id: 3,
    senderId: 3,
    text: "Could you make sure to involve the Head of R&D here? @Dianne Russell",
    timestamp: "60secs ago",
  },
  {
    id: 4,
    senderId: 4,
    text: "How are the contributors affected by the elements presented here?",
    timestamp: "10secs ago",
  },
]

export default function ChatPanel({ participants }: { participants: Participant[] }) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg: ChatMessage = {
      id: messages.length + 1,
      senderId: 1, // Current user (Melody)
      text: newMessage,
      timestamp: "just now",
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage((prev) => prev + emoji)
  }

  const getParticipantById = (id: number) => {
    return participants.find((p) => p.id === id) || participants[0]
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => {
          const sender = getParticipantById(message.senderId)
          return (
            <div key={message.id} className="flex items-start gap-3">
              <Avatar className={`h-8 w-8 ${sender.color}`}>
                <div className="h-full w-full rounded-full"></div>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{sender.name}</span>
                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 border-t border-gray-800">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            className="bg-gray-800 border-gray-700"
          />
          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
          <Button type="submit" size="icon" className="rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

