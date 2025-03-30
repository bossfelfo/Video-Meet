"use client"

import { useState } from "react"
import { X, Save, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface RecordingOptionsProps {
  isOpen: boolean
  onClose: () => void
  onStartRecording: (saveOption: string) => void
  isRecording: boolean
  onStopRecording: () => void
}

export default function RecordingOptions({
  isOpen,
  onClose,
  onStartRecording,
  isRecording,
  onStopRecording,
}: RecordingOptionsProps) {
  const [saveOption, setSaveOption] = useState("cloud")

  if (!isOpen) return null

  const handleAction = () => {
    if (isRecording) {
      onStopRecording()
    } else {
      onStartRecording(saveOption)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{isRecording ? "Stop Recording" : "Recording Options"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {isRecording ? (
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
              <Clock className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium">Recording in progress</p>
                <p className="text-sm text-gray-400">00:15:32</p>
              </div>
            </div>

            <p className="text-gray-400">
              Stopping the recording will save it and make it available to view after processing.
            </p>
          </div>
        ) : (
          <div className="space-y-6 mb-6">
            <RadioGroup value={saveOption} onValueChange={setSaveOption}>
              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-800">
                <RadioGroupItem value="cloud" id="cloud" />
                <Label htmlFor="cloud" className="flex items-center space-x-3 cursor-pointer">
                  <Save className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Save to cloud</p>
                    <p className="text-sm text-gray-400">Recording will be available in your account</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-800">
                <RadioGroupItem value="computer" id="computer" />
                <Label htmlFor="computer" className="flex items-center space-x-3 cursor-pointer">
                  <Save className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="font-medium">Save to your computer</p>
                    <p className="text-sm text-gray-400">Download after recording ends</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            <div className="p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-gray-400" />
                <p className="font-medium">Who can view the recording</p>
              </div>

              <p className="text-sm text-gray-400">
                Only meeting participants and people in your organization with the link can view
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAction}
            className={isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
        </div>
      </div>
    </div>
  )
}

