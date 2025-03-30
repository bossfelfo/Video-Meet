"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Video, Settings } from "lucide-react"
import SettingsModal from "@/components/settings-modal"

export default function Dashboard() {
  const router = useRouter()
  const [meetingCode, setMeetingCode] = useState("")
  const [showSettings, setShowSettings] = useState(false)

  const startNewMeeting = () => {
    router.push("/meeting/123456789")
  }

  const joinMeeting = (e: React.FormEvent) => {
    e.preventDefault()
    if (meetingCode) {
      router.push(`/meeting/${meetingCode}`)
    } else {
      alert("Please enter a meeting code")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold">MeetClone</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => setShowSettings(true)}>
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">JD</div>
          </div>
        </header>

        <main className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <Button onClick={startNewMeeting} className="bg-blue-600 hover:bg-blue-700">
                  <Video className="h-5 w-5 mr-2" />
                  New Meeting
                </Button>

                <form onSubmit={joinMeeting} className="flex gap-2">
                  <Input
                    value={meetingCode}
                    onChange={(e) => setMeetingCode(e.target.value)}
                    placeholder="Enter meeting code"
                    className="bg-gray-800 border-gray-700"
                  />
                  <Button type="submit" variant="outline">
                    Join
                  </Button>
                </form>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-800 rounded-lg">
                  <Calendar className="h-10 w-10 text-blue-400 mr-4" />
                  <div>
                    <h3 className="font-medium">Weekly Team Sync</h3>
                    <p className="text-sm text-gray-400">Today, 2:00 PM - 3:00 PM</p>
                  </div>
                  <Button
                    className="ml-auto"
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/meeting/weekly-team-sync")}
                  >
                    Join
                  </Button>
                </div>

                <div className="flex items-center p-3 bg-gray-800 rounded-lg">
                  <Calendar className="h-10 w-10 text-green-400 mr-4" />
                  <div>
                    <h3 className="font-medium">Project Review</h3>
                    <p className="text-sm text-gray-400">Tomorrow, 10:00 AM - 11:30 AM</p>
                  </div>
                  <Button
                    className="ml-auto"
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/meeting/project-review")}
                  >
                    Join
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Contacts</h2>
              <div className="space-y-3">
                {["Melody Onyeocha", "Darrell Steward", "Bessie Cooper", "Esther Howard"].map((name) => (
                  <div
                    key={name}
                    className="flex items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                    onClick={() => {
                      const meetingId = name.toLowerCase().replace(" ", "-")
                      router.push(`/meeting/${meetingId}`)
                    }}
                  >
                    <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Meeting History</h2>
              <div className="space-y-3">
                <div
                  className="p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                  onClick={() => router.push("/meeting/navigating-success")}
                >
                  <h3 className="font-medium">Navigating the path to success</h3>
                  <p className="text-sm text-gray-400">Yesterday, 45 minutes</p>
                </div>
                <div
                  className="p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                  onClick={() => router.push("/meeting/product-planning")}
                >
                  <h3 className="font-medium">Product Planning</h3>
                  <p className="text-sm text-gray-400">Mar 28, 1 hour 15 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  )
}

