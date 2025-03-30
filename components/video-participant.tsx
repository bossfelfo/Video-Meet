"use client"

import { useState, useEffect } from "react"
import MoreOptionsMenu from "@/components/more-options-menu"
import SimulatedVideo from "@/components/simulated-video"
import SpeechBubble from "@/components/speech-bubble"

interface Participant {
  id: number
  name: string
  color: string
  company?: string
  pronouns?: string
}

interface VideoParticipantProps {
  participant: Participant
  isVideoEnabled?: boolean
  isAudioEnabled?: boolean
  loading?: boolean
  isScreenSharing?: boolean
  isSpeaking?: boolean
  currentSpeakerId: number | null
}

export default function VideoParticipant({
  participant,
  isVideoEnabled = true,
  isAudioEnabled = true,
  loading = false,
  isScreenSharing = false,
  currentSpeakerId,
}: VideoParticipantProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const isSpeaking = currentSpeakerId === participant.id

  useEffect(() => {
    if (!loading) {
      // Simulate video loading delay
      const timer = setTimeout(() => setVideoLoaded(true), 500)
      return () => clearTimeout(timer)
    }
  }, [loading])

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900 aspect-video flex items-center justify-center">
      {/* Video or avatar placeholder */}
      {videoLoaded && (
        <div className="absolute inset-0">
          {isScreenSharing ? (
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(/placeholder.svg?height=720&width=1280)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-70 p-4 rounded-lg">
                  <p className="text-white">Screen sharing: Presentation.pptx</p>
                </div>
              </div>
            </div>
          ) : (
            <SimulatedVideo
              color={participant.color}
              isVideoEnabled={isVideoEnabled}
              isAudioEnabled={isAudioEnabled}
              isSpeaking={isSpeaking}
              name={participant.name}
              avatarLetter={participant.name.charAt(0)}
            />
          )}
        </div>
      )}

      {/* Speech bubble */}
      <SpeechBubble
        speakerId={currentSpeakerId}
        participantName={participant.name}
        isVisible={isSpeaking && isAudioEnabled}
      />

      {/* Menu button */}
      <div className="absolute top-2 right-2 z-10">
        <MoreOptionsMenu
          onOpenSettings={() => alert("Settings")}
          isParticipantMenu={true}
          participantName={participant.name}
        />
      </div>

      {/* Name label */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className={`px-4 py-1 rounded-full ${participant.color} text-gray-900 font-medium text-sm`}>
          {participant.name}
        </div>
      </div>
    </div>
  )
}

