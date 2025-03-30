import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">MeetClone</h1>
            <p className="mt-2 text-gray-400">Video conferencing made simple</p>
          </div>

          <div className="mt-8 space-y-4">
            <Link href="/login" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign in</Button>
            </Link>

            <Link href="/signup" className="w-full">
              <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                Sign up
              </Button>
            </Link>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">or</span>
              </div>
            </div>

            <Link href="/meeting/new" className="w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700">Start a meeting</Button>
            </Link>

            <Link href="/meeting/join" className="w-full">
              <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                Join a meeting
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

