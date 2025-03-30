"use client"

import { useState, useEffect } from "react"

interface SpeechBubbleProps {
  speakerId: number | null
  participantName: string
  isVisible: boolean
}

// Mock conversation snippets
const conversationSnippets = [
  "I think we should focus on the user experience first.",
  "What about the timeline for the project?",
  "The design team has some concerns about the color palette.",
  "We need to address the feedback from the last user testing session.",
  "Has anyone looked at the analytics from last week?",
  "I'm not sure if we have enough resources for this sprint.",
  "The new feature is almost ready for testing.",
  "Can we discuss the marketing strategy for the launch?",
  "I've prepared a presentation about our progress.",
  "We should schedule another meeting to dive deeper into this topic.",
  "The client is very happy with our progress so far.",
  "Let's make sure we document all these decisions.",
  "I'll follow up with an email summarizing our discussion.",
  "Does anyone have questions about the implementation?",
  "We need to prioritize the backlog items for next sprint.",
]

export default function SpeechBubble({ speakerId, participantName, isVisible }: SpeechBubbleProps) {
  const [text, setText] = useState("")
  const [displayedText, setDisplayedText] = useState("")
  const [charIndex, setCharIndex] = useState(0)

  // Select a random snippet when the speaker changes
  useEffect(() => {
    if (speakerId !== null) {
      const randomSnippet = conversationSnippets[Math.floor(Math.random() * conversationSnippets.length)]
      setText(randomSnippet)
      setCharIndex(0)
      setDisplayedText("")
    } else {
      setText("")
      setDisplayedText("")
      setCharIndex(0)
    }
  }, [speakerId])

  // Animate text typing effect
  useEffect(() => {
    if (!isVisible || text === "") return

    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText((prev) => prev + text[charIndex])
        setCharIndex((prev) => prev + 1)
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [isVisible, text, charIndex])

  if (!isVisible || !displayedText) return null

  return (
    <div className="absolute top-2 left-2 max-w-[80%] bg-black bg-opacity-70 rounded-lg p-3 text-white text-sm">
      <div className="font-bold mb-1">{participantName}</div>
      <div>{displayedText}</div>
    </div>
  )
}

