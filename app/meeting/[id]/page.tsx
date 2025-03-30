"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Users,
  Plus,
  PresentationIcon as PresentationScreen,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import VideoParticipant from "@/components/video-participant";
import ChatPanel from "@/components/chat-panel";
import AddUserDialog from "@/components/add-user-dialog";
import ScreenShareModal from "@/components/screen-share-modal";
import SettingsModal from "@/components/settings-modal";
import RecordingOptions from "@/components/recording-options";
import MoreOptionsMenu from "@/components/more-options-menu";
import ConversationSimulator from "@/components/conversation-simulator";

// Mock participant data
const participants = [
  {
    id: 1,
    name: "Melody Onyeocha",
    color: "bg-pink-400",
    company: "Tencent Holdings",
    pronouns: "(he/him)",
  },
  {
    id: 2,
    name: "Darrell Steward",
    color: "bg-green-400",
    company: "Microsoft",
  },
  { id: 3, name: "Bessie Cooper", color: "bg-blue-200", company: "Microsoft" },
  {
    id: 4,
    name: "Esther Howard",
    color: "bg-orange-400",
    company: "Dell Technologies",
  },
];

export default function Meeting({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [currentSpeakerId, setCurrentSpeakerId] = useState<number | null>(null);
  const [mutedParticipants, setMutedParticipants] = useState<number[]>([]);
  const [conversationActive, setConversationActive] = useState(true);

  // Modals state
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showScreenShareModal, setShowScreenShareModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showRecordingOptions, setShowRecordingOptions] = useState(false);

  // Simulate video streams loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    // If turning off audio, add current user to muted list
    if (audioEnabled) {
      setMutedParticipants((prev) => [...prev, 1]); // User is participant 1
    } else {
      setMutedParticipants((prev) => prev.filter((id) => id !== 1));
    }
  };

  const toggleVideo = () => setVideoEnabled(!videoEnabled);

  const startRecording = (saveOption: string) => {
    console.log(`Starting recording with save option: ${saveOption}`);
    setIsRecording(true);
  };

  const stopRecording = () => {
    console.log("Stopping recording");
    setIsRecording(false);
  };

  const startScreenShare = (type: string) => {
    console.log(`Starting screen share with type: ${type}`);
    setIsScreenSharing(true);
  };

  const stopScreenShare = () => {
    setIsScreenSharing(false);
  };

  const addUser = (email: string) => {
    console.log(`Adding user: ${email}`);
    // In a real app, this would send an invitation
    alert(`Invitation sent to ${email}`);
  };

  const endCall = () => {
    router.push("/dashboard");
  };

  const togglePanel = (panel: "chat" | "participants") => {
    if (panel === "chat") {
      setShowChat(!showChat);
      if (!showChat) setShowParticipants(false);
    } else {
      setShowParticipants(!showParticipants);
      if (!showParticipants) setShowChat(false);
    }
  };

  const handleSpeakerChange = (speakerId: number | null) => {
    setCurrentSpeakerId(speakerId);
  };

  // Toggle conversation when user joins/leaves
  useEffect(() => {
    setConversationActive(true);

    return () => {
      setConversationActive(false);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Conversation simulator (non-visual component) */}
      <ConversationSimulator
        participants={participants}
        isActive={conversationActive}
        onSpeakerChange={handleSpeakerChange}
        mutedParticipants={mutedParticipants}
      />

      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          {isRecording && (
            <button
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-red-500 text-red-500"
              onClick={() => setShowRecordingOptions(true)}
            >
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <span className="text-sm">Recording</span>
            </button>
          )}
          <h1 className="text-lg font-medium">
            Navigating the path to success.
          </h1>
          <div className="flex -space-x-1">
            {participants.map((p, i) => (
              <div
                key={p.id}
                className={`w-6 h-6 rounded-full ${p.color} border border-black flex items-center justify-center text-xs`}
              >
                {p.name.charAt(0)}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 rounded-full"
            onClick={() => setShowAddUserDialog(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Add user to the call</span>
          </Button>

          <Avatar className="h-8 w-8 border-2 border-blue-600">
            <div className="bg-pink-400 h-full w-full rounded-full"></div>
          </Avatar>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 flex relative">
        <div className="w-4/5 grid grid-cols-2 gap-4 m-auto">
          {participants.map((participant, index) => (
            <VideoParticipant
              key={participant.id}
              participant={participant}
              isVideoEnabled={index === 0 ? videoEnabled : true}
              isAudioEnabled={!mutedParticipants.includes(participant.id)}
              loading={loading}
              isScreenSharing={index === 0 && isScreenSharing}
              currentSpeakerId={currentSpeakerId}
            />
          ))}
        </div>

        {/* Side panel */}
        {(showChat || showParticipants) && (
          <div className="w-80 bg-gray-900 rounded-lg ml-4 flex flex-col">
            <div className="p-2 border-b border-gray-800 flex">
              <Tabs
                defaultValue={showChat ? "chat" : "participants"}
                className="w-full"
              >
                <TabsList className="w-full bg-gray-800">
                  <TabsTrigger
                    value="chat"
                    className="flex-1"
                    onClick={() => setShowChat(true)}
                  >
                    Chat
                  </TabsTrigger>
                  <TabsTrigger
                    value="participants"
                    className="flex-1"
                    onClick={() => setShowParticipants(true)}
                  >
                    Participants{" "}
                    <span className="ml-1 text-xs bg-gray-700 px-1.5 rounded-full">
                      {participants.length}
                    </span>
                  </TabsTrigger>
                </TabsList>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={() => {
                    setShowChat(false);
                    setShowParticipants(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>

                <TabsContent
                  value="chat"
                  className="flex-1 overflow-y-auto p-0 m-0"
                >
                  <ChatPanel participants={participants} />
                </TabsContent>

                <TabsContent
                  value="participants"
                  className="flex-1 overflow-y-auto p-0 m-0"
                >
                  <div className="p-4 space-y-4">
                    {participants.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className={`h-10 w-10 ${p.color}`}>
                            <div className="h-full w-full rounded-full"></div>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{p.name}</p>
                              {p.pronouns && (
                                <span className="text-xs text-gray-400 ml-1">
                                  {p.pronouns}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400">{p.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {currentSpeakerId === p.id && (
                            <div className="mr-2 text-xs text-green-400">
                              Speaking
                            </div>
                          )}
                          <MoreOptionsMenu
                            onOpenSettings={() => setShowSettingsModal(true)}
                            isParticipantMenu={true}
                            participantName={p.name}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </main>

      {/* Footer controls */}
      <footer className="p-4 flex items-center justify-between">
        <MoreOptionsMenu onOpenSettings={() => setShowSettingsModal(true)} />

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              audioEnabled
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={toggleAudio}
          >
            {audioEnabled ? (
              <Mic className="h-5 w-5" />
            ) : (
              <MicOff className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              videoEnabled
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
            onClick={toggleVideo}
          >
            {videoEnabled ? (
              <Video className="h-5 w-5" />
            ) : (
              <VideoOff className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              isScreenSharing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() =>
              isScreenSharing
                ? stopScreenShare()
                : setShowScreenShareModal(true)
            }
          >
            <PresentationScreen className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-red-600 hover:bg-red-700"
            onClick={endCall}
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              showChat ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => togglePanel("chat")}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${
              showParticipants ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => togglePanel("participants")}
          >
            <Users className="h-5 w-5" />
          </Button>
        </div>
      </footer>

      {/* Modals */}
      <AddUserDialog
        isOpen={showAddUserDialog}
        onClose={() => setShowAddUserDialog(false)}
        onAddUser={addUser}
      />

      <ScreenShareModal
        isOpen={showScreenShareModal}
        onClose={() => setShowScreenShareModal(false)}
        onShareScreen={startScreenShare}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      <RecordingOptions
        isOpen={showRecordingOptions}
        onClose={() => setShowRecordingOptions(false)}
        onStartRecording={startRecording}
        isRecording={isRecording}
        onStopRecording={stopRecording}
      />
    </div>
  );
}
