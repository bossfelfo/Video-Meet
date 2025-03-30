"use client"

import { useState, useEffect, useCallback } from "react"

interface Participant {
  id: number
  name: string
  color: string
  company?: string
  pronouns?: string
}

interface ConversationSimulatorProps {
  participants: Participant[]
  isActive: boolean
  onSpeakerChange: (speakerId: number | null) => void
  mutedParticipants: number[]
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

export default function ConversationSimulator({
  participants,
  isActive,
  onSpeakerChange,
  mutedParticipants,
}: ConversationSimulatorProps) {
  const [currentSpeaker, setCurrentSpeaker] = useState<number | null>(null)
  const [speakingDuration, setSpeakingDuration] = useState(0)
  const [pauseDuration, setPauseDuration] = useState(0)

  const availableSpeakers = participants.filter((p) => !mutedParticipants.includes(p.id)).map((p) => p.id)

  const selectNextSpeaker = useCallback(() => {
    if (!isActive || availableSpeakers.length === 0) {
      setCurrentSpeaker(null)
      return
    }

    // 20% chance of no one speaking (pause in conversation)
    if (Math.random() < 0.2) {
      setCurrentSpeaker(null)
      // Set a pause duration between 1-3 seconds
      setPauseDuration(1000 + Math.random() * 2000)
      return
    }

    // Select a random speaker from available participants
    const nextSpeakerId = availableSpeakers[Math.floor(Math.random() * availableSpeakers.length)]

    // 70% chance to select a different speaker
    if (currentSpeaker !== null && Math.random() < 0.7) {
      const otherSpeakers = availableSpeakers.filter((id) => id !== currentSpeaker)
      if (otherSpeakers.length > 0) {
        const nextSpeakerId = otherSpeakers[Math.floor(Math.random() * otherSpeakers.length)]
        setCurrentSpeaker(nextSpeakerId)
      } else {
        setCurrentSpeaker(nextSpeakerId)
      }
    } else {
      setCurrentSpeaker(nextSpeakerId)
    }

    // Set a speaking duration between 2-8 seconds
    setSpeakingDuration(2000 + Math.random() * 6000)
  }, [isActive, availableSpeakers, currentSpeaker])

  // Simulate conversation flow
  useEffect(() => {
    if (!isActive) {
      setCurrentSpeaker(null)
      onSpeakerChange(null)
      return
    }

    let timerId: NodeJS.Timeout

    if (currentSpeaker === null) {
      // If no one is speaking, wait for the pause duration then select next speaker
      timerId = setTimeout(() => {
        selectNextSpeaker()
      }, pauseDuration)
    } else {
      // If someone is speaking, wait for the speaking duration then select next speaker
      timerId = setTimeout(() => {
        selectNextSpeaker()
      }, speakingDuration)
    }

    // Notify parent component about speaker change
    onSpeakerChange(currentSpeaker)

    return () => clearTimeout(timerId)
  }, [currentSpeaker, speakingDuration, pauseDuration, isActive, onSpeakerChange, selectNextSpeaker])

  // Initial speaker selection
  useEffect(() => {
    if (isActive && currentSpeaker === null && availableSpeakers.length > 0) {
      selectNextSpeaker()
    }
  }, [isActive, currentSpeaker, availableSpeakers, selectNextSpeaker])

  return null // This is a non-visual component
}

