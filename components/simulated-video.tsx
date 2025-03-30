"use client"

import { useState, useEffect, useRef } from "react"
import { MicOff } from "lucide-react"

interface SimulatedVideoProps {
  color: string
  isVideoEnabled: boolean
  isAudioEnabled: boolean
  isSpeaking: boolean
  name: string
  avatarLetter: string
}

export default function SimulatedVideo({
  color,
  isVideoEnabled,
  isAudioEnabled,
  isSpeaking,
  name,
  avatarLetter,
}: SimulatedVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [audioLevel, setAudioLevel] = useState(0)

  // Simulate video content
  useEffect(() => {
    if (!isVideoEnabled || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let hue = 0

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#1f2937"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw a subtle moving pattern to simulate video
      const time = Date.now() / 1000
      const gridSize = 20

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distX = x - canvas.width / 2
          const distY = y - canvas.height / 2
          const dist = Math.sqrt(distX * distX + distY * distY)

          const brightness = Math.sin(dist / 20 - time) * 0.1 + 0.1

          ctx.fillStyle = `rgba(50, 50, 50, ${brightness})`
          ctx.fillRect(x, y, gridSize - 1, gridSize - 1)
        }
      }

      // Draw a silhouette
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)"

      // Head
      const centerX = canvas.width / 2
      const headY = canvas.height * 0.4
      const headRadius = canvas.width * 0.15

      ctx.beginPath()
      ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.beginPath()
      ctx.moveTo(centerX - headRadius, headY + headRadius * 0.8)
      ctx.lineTo(centerX - headRadius * 1.5, canvas.height * 0.9)
      ctx.lineTo(centerX + headRadius * 1.5, canvas.height * 0.9)
      ctx.lineTo(centerX + headRadius, headY + headRadius * 0.8)
      ctx.closePath()
      ctx.fill()

      // Add subtle movement
      const moveX = Math.sin(time * 0.5) * 2
      const moveY = Math.cos(time * 0.3) * 1

      ctx.translate(moveX, moveY)

      // If speaking, add a pulsing border
      if (isSpeaking) {
        hue = (hue + 1) % 360
        const borderWidth = 6 + Math.sin(time * 5) * 2

        ctx.strokeStyle = `hsl(${hue}, 70%, 60%)`
        ctx.lineWidth = borderWidth
        ctx.strokeRect(0, 0, canvas.width, canvas.height)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVideoEnabled, isSpeaking])

  // Simulate audio levels
  useEffect(() => {
    if (!isSpeaking || !isAudioEnabled) {
      setAudioLevel(0)
      return
    }

    const interval = setInterval(() => {
      // Generate random audio levels when speaking
      const newLevel = 0.3 + Math.random() * 0.7
      setAudioLevel(newLevel)
    }, 100)

    return () => clearInterval(interval)
  }, [isSpeaking, isAudioEnabled])

  if (!isVideoEnabled) {
    return (
      <div className={`h-full w-full flex items-center justify-center ${color}`}>
        <div className="relative">
          <div className="text-6xl font-bold text-gray-900">{avatarLetter}</div>

          {/* Audio indicator for avatar */}
          {isSpeaking && isAudioEnabled && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-1 bg-white rounded-full"
                    style={{
                      height: `${Math.min(8 + i * 3 * audioLevel, 24)}px`,
                      opacity: audioLevel > i / 7 ? 1 : 0.3,
                      transition: "all 0.1s ease-in-out",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Muted indicator */}
          {!isAudioEnabled && (
            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1">
              <MicOff className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="w-full h-full object-cover" width={640} height={360} />

      {/* Audio level indicator */}
      {isAudioEnabled && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 bg-white rounded-full"
                style={{
                  height: `${Math.min(8 + i * 3 * audioLevel, 24)}px`,
                  opacity: audioLevel > i / 7 ? 1 : 0.3,
                  transition: "all 0.1s ease-in-out",
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Muted indicator */}
      {!isAudioEnabled && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-full p-1">
          <MicOff className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  )
}

