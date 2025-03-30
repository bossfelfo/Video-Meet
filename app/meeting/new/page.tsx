"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Copy, Check } from "lucide-react"

export default function NewMeeting() {
  const router = useRouter()
  const [meetingCode, setMeetingCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState("")

  // Generate a random meeting code on component mount
  useEffect(() => {
    const generateCode = () => {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
      let result = ""
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      return result
    }

    setMeetingCode(generateCode())
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const startMeeting = (e: React.FormEvent) => {
    e.preventDefault()
    if (name) {
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
          <h1 className="text-3xl font-bold">Start a new meeting</h1>
          <p className="mt-2 text-gray-400">Share the code with others to join</p>
        </div>

        <form onSubmit={startMeeting} className="space-y-6">
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
            <div className="flex">
              <Input
                id="meetingCode"
                type="text"
                value={meetingCode}
                readOnly
                className="bg-gray-900 border-gray-700 text-white rounded-r-none"
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-l-none border-gray-700"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={!name}>
            Start meeting
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Already have a meeting code?{" "}
            <Link href="/meeting/join" className="text-blue-400 hover:underline">
              Join an existing meeting
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

