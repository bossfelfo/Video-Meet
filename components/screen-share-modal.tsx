"use client"

import { useState } from "react"
import { X, Monitor, AppWindowIcon as Window, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScreenShareModalProps {
  isOpen: boolean
  onClose: () => void
  onShareScreen: (type: string) => void
}

export default function ScreenShareModal({ isOpen, onClose, onShareScreen }: ScreenShareModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  if (!isOpen) return null

  const handleShare = () => {
    if (selectedOption) {
      onShareScreen(selectedOption)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Share your screen</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            className={`flex flex-col items-center p-4 rounded-lg border ${
              selectedOption === "entire-screen" ? "border-blue-500 bg-gray-800" : "border-gray-700 hover:bg-gray-800"
            }`}
            onClick={() => setSelectedOption("entire-screen")}
          >
            <Monitor className="h-10 w-10 mb-2 text-gray-300" />
            <span className="text-sm">Entire screen</span>
          </button>

          <button
            className={`flex flex-col items-center p-4 rounded-lg border ${
              selectedOption === "window" ? "border-blue-500 bg-gray-800" : "border-gray-700 hover:bg-gray-800"
            }`}
            onClick={() => setSelectedOption("window")}
          >
            <Window className="h-10 w-10 mb-2 text-gray-300" />
            <span className="text-sm">Window</span>
          </button>

          <button
            className={`flex flex-col items-center p-4 rounded-lg border ${
              selectedOption === "chrome-tab" ? "border-blue-500 bg-gray-800" : "border-gray-700 hover:bg-gray-800"
            }`}
            onClick={() => setSelectedOption("chrome-tab")}
          >
            <Chrome className="h-10 w-10 mb-2 text-gray-300" />
            <span className="text-sm">Chrome Tab</span>
          </button>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!selectedOption} onClick={handleShare} className="bg-blue-600 hover:bg-blue-700">
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}

