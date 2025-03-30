"use client"

import {
  Settings,
  Layout,
  FileText,
  MessageSquare,
  Shield,
  HelpCircle,
  Keyboard,
  Info,
  VideoOff,
  MicOff,
  Pin,
  Maximize,
  MinusCircle,
} from "lucide-react"
import DropdownMenu, { DropdownMenuItem, DropdownMenuSeparator } from "@/components/dropdown-menu"

interface MoreOptionsMenuProps {
  onOpenSettings: () => void
  isParticipantMenu?: boolean
  participantName?: string
}

export default function MoreOptionsMenu({
  onOpenSettings,
  isParticipantMenu = false,
  participantName,
}: MoreOptionsMenuProps) {
  if (isParticipantMenu) {
    return (
      <DropdownMenu buttonClassName="h-8 w-8 bg-transparent hover:bg-gray-700">
        <DropdownMenuItem onClick={() => alert(`Pinned ${participantName}`)}>
          <Pin className="h-4 w-4 mr-2" />
          Pin to screen
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert(`Muted ${participantName}`)}>
          <MicOff className="h-4 w-4 mr-2" />
          Mute participant
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert(`Disabled video for ${participantName}`)}>
          <VideoOff className="h-4 w-4 mr-2" />
          Disable video
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => alert(`Maximized ${participantName}`)}>
          <Maximize className="h-4 w-4 mr-2" />
          Maximize
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => alert(`Removed ${participantName}`)}>
          <MinusCircle className="h-4 w-4 mr-2 text-red-500" />
          <span className="text-red-500">Remove from meeting</span>
        </DropdownMenuItem>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu trigger="vertical" buttonClassName="bg-gray-800 hover:bg-gray-700">
      <DropdownMenuItem onClick={onOpenSettings}>
        <Settings className="h-4 w-4 mr-2" />
        Settings
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => alert("Change layout")}>
        <Layout className="h-4 w-4 mr-2" />
        Change layout
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => alert("Apply visual effects")}>
        <FileText className="h-4 w-4 mr-2" />
        Apply visual effects
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => alert("Start captions")}>
        <MessageSquare className="h-4 w-4 mr-2" />
        Start captions
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => alert("Report a problem")}>
        <Shield className="h-4 w-4 mr-2" />
        Report a problem
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => alert("Help")}>
        <HelpCircle className="h-4 w-4 mr-2" />
        Help
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => alert("Keyboard shortcuts")}>
        <Keyboard className="h-4 w-4 mr-2" />
        Keyboard shortcuts
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => alert("About MeetClone")}>
        <Info className="h-4 w-4 mr-2" />
        About MeetClone
      </DropdownMenuItem>
    </DropdownMenu>
  )
}

