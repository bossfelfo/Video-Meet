"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function JoinMeeting() {
  const router = useRouter()
  const [meetingCode, setMeetingCode] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (meetingCode && name) {
      router.push(`/meeting/${meetingCode}`)
    }
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="m-auto w-full max-w-md p-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Join a meeting</h1>
          <p className="mt-2 text-gray-400">Enter the meeting code to join</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingCode">Meeting code</Label>
            <Input
              id="meetingCode"
              type="text"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              placeholder="Enter meeting code"
              required
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={!meetingCode || !name}>
            Join meeting
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Don&apos;t have a meeting code?{" "}
            <Link href="/meeting/new" className="text-blue-400 hover:underline">
              Start a new meeting
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

