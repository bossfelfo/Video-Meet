"use client"

import type React from "react"

import { useState } from "react"
import { X, Search, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"

interface AddUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddUser: (email: string) => void
}

// Mock suggested contacts
const suggestedContacts = [
  { id: 5, name: "Jane Cooper", email: "jane.cooper@example.com", color: "bg-purple-500" },
  { id: 6, name: "Wade Warren", email: "wade.warren@example.com", color: "bg-yellow-500" },
  { id: 7, name: "Robert Fox", email: "robert.fox@example.com", color: "bg-green-500" },
  { id: 8, name: "Jacob Jones", email: "jacob.jones@example.com", color: "bg-blue-500" },
]

export default function AddUserDialog({ isOpen, onClose, onAddUser }: AddUserDialogProps) {
  const [email, setEmail] = useState("")
  const [searchResults, setSearchResults] = useState(suggestedContacts)

  if (!isOpen) return null

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)

    // Filter suggested contacts based on search term
    if (value) {
      setSearchResults(
        suggestedContacts.filter(
          (contact) =>
            contact.name.toLowerCase().includes(value.toLowerCase()) ||
            contact.email.toLowerCase().includes(value.toLowerCase()),
        ),
      )
    } else {
      setSearchResults(suggestedContacts)
    }
  }

  const handleAddUser = (contactEmail: string) => {
    onAddUser(contactEmail)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-gray-900 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add people</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            value={email}
            onChange={handleSearch}
            placeholder="Enter name or email"
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-400">Suggested</h3>

          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800">
                  <div className="flex items-center space-x-3">
                    <Avatar className={`h-10 w-10 ${contact.color}`}>
                      <div className="h-full w-full rounded-full flex items-center justify-center text-white font-medium">
                        {contact.name.charAt(0)}
                      </div>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-xs text-gray-400">{contact.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAddUser(contact.email)}
                    className="h-8 w-8 rounded-full hover:bg-gray-700"
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-4">No matching contacts found</p>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!email} onClick={() => handleAddUser(email)} className="bg-blue-600 hover:bg-blue-700">
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

