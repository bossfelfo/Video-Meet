"use client"

import { useState } from "react"
import { X, Video, Mic, Volume2, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState("audio")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="audio" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <span>Audio</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Video</span>
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="audio" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Microphone</Label>
                <Select defaultValue="default">
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select microphone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default - Built-in Microphone</SelectItem>
                    <SelectItem value="headset">Headset Microphone</SelectItem>
                    <SelectItem value="external">External Microphone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Speakers</Label>
                <Select defaultValue="default">
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select speakers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default - Built-in Speakers</SelectItem>
                    <SelectItem value="headphones">Headphones</SelectItem>
                    <SelectItem value="external">External Speakers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Microphone Volume</Label>
                  <span className="text-sm text-gray-400">75%</span>
                </div>
                <Slider defaultValue={[75]} max={100} step={1} className="w-full" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Speaker Volume</Label>
                  <span className="text-sm text-gray-400">80%</span>
                </div>
                <Slider defaultValue={[80]} max={100} step={1} className="w-full" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-gray-400" />
                  <Label>Noise cancellation</Label>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Camera</Label>
                <Select defaultValue="default">
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select camera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default - Built-in Camera</SelectItem>
                    <SelectItem value="external">External Webcam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-gray-400">Camera preview</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label>HD video</Label>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label>Mirror my video</Label>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label>Touch up my appearance</Label>
                </div>
                <Switch />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="general" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label>Join meetings with microphone muted</Label>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label>Join meetings with camera off</Label>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label>Show meeting timer</Label>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label>Show captions by default</Label>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label>Send meeting reactions</Label>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Meeting end behavior</Label>
                <Select defaultValue="ask">
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select behavior" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ask">Ask before leaving</SelectItem>
                    <SelectItem value="return">Return to dashboard</SelectItem>
                    <SelectItem value="close">Close the window</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

