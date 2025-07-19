"use client";

import React, { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Save,
  Eye,
  EyeOff,
  Menu,
  X,
  Settings,
  Clock,
  Users,
  User,
  ChevronDown,
} from "lucide-react";
import { EmailData } from "./EmailComposer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VeltNotificationsTool } from "@veltdev/react";

interface HeaderProps {
  emailData: EmailData;
  updateEmailData: (updates: Partial<EmailData>) => void;
  isPreviewMode: boolean;
  setIsPreviewMode: (preview: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

import { useVeltClient } from "@veltdev/react";
import { names, userIds, useUserStore } from "@/helper/userdb";

export const Header: React.FC<HeaderProps> = ({
  emailData,
  updateEmailData,
  isPreviewMode,
  setIsPreviewMode,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { user, setUser } = useUserStore();
  const { client } = useVeltClient();

  const predefinedUsers = useMemo(
    () =>
      userIds.map((uid, index) => {
        // Use DiceBear Avatars for demonstration
        const avatarUrls = [
          "https://api.dicebear.com/7.x/pixel-art/svg?seed=Nany",
          "https://api.dicebear.com/7.x/pixel-art/svg?seed=Mary",
        ];
        return {
          uid: uid,
          displayName: names[index],
          email: `${names[index].toLowerCase()}@gmail.com`,
          photoUrl: avatarUrls[index],
        };
      }),
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined" && !user) {
      const storedUser = localStorage.getItem("user-storage");
      if (!storedUser) {
        setUser(predefinedUsers[0]);
      }
    }
  }, [user, setUser, predefinedUsers]);

  useEffect(() => {
    if (!client || !user) return;
    const veltUser = {
      userId: user.uid,
      organizationId: "organization_id",
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoUrl, // Pass avatar to Velt
    };

    client.identify(veltUser);
  }, [client, user]);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          <div className="flex items-center space-x-4">
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Subject
              </label>
              <Input
                value={emailData.subject}
                onChange={(e) => updateEmailData({ subject: e.target.value })}
                placeholder="Enter email subject..."
                className="w-80 h-8 text-sm"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-xs font-medium text-gray-700">From</label>
              <Input
                value={emailData.from}
                onChange={(e) => updateEmailData({ from: e.target.value })}
                className="w-60 h-8 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <VeltNotificationsTool />

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="flex items-center space-x-2"
          >
            {isPreviewMode ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{isPreviewMode ? "Edit" : "Preview"}</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 h-8"
              >
                <Avatar className="w-5 h-5">
                  <AvatarImage
                    src={user?.photoUrl || "https://via.placeholder.com/100"}
                    alt={user?.displayName || "User"}
                  />
                  <AvatarFallback className="text-xs">
                    {user?.displayName}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{user?.displayName}</span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>Select User</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {predefinedUsers.map((Currentuser) => (
                <DropdownMenuItem
                  key={Currentuser.uid}
                  onClick={() => setUser(Currentuser)}
                  className="flex items-center space-x-3 p-3 cursor-pointer"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={Currentuser.photoUrl}
                      alt={Currentuser.displayName}
                    />
                    <AvatarFallback className="text-xs">
                      {Currentuser.displayName}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">
                      {Currentuser.displayName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Currentuser.email}
                    </div>
                    <div className="text-xs text-gray-400">User</div>
                  </div>
                  {user?.uid === Currentuser.uid && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center space-x-2 text-blue-600">
                <User size={16} />
                <span>Manage Users</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save</span>
          </Button>

          <Button
            size="sm"
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700"
          >
            <Send size={16} />
            <span>Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
