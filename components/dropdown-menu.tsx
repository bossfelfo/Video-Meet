"use client"

import { type ReactNode, useState, useRef, useEffect } from "react"
import { MoreHorizontal, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DropdownMenuProps {
  children: ReactNode
  align?: "left" | "right"
  trigger?: "horizontal" | "vertical"
  buttonClassName?: string
}

export default function DropdownMenu({
  children,
  align = "right",
  trigger = "horizontal",
  buttonClassName = "",
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className={`rounded-full ${buttonClassName}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger === "horizontal" ? <MoreHorizontal className="h-4 w-4" /> : <MoreVertical className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-50 mt-2 w-56 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  )
}

export function DropdownMenuItem({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button className="flex w-full items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700" onClick={onClick}>
      {children}
    </button>
  )
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-gray-700" />
}

