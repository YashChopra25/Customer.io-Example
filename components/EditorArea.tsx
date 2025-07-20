"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { EmailData } from "./EmailComposer";
import { Monitor, Smartphone, Tablet, Code } from "lucide-react";
import TiptapEditor from "./TiptapEditor";

interface EditorAreaProps {
  emailData: EmailData;
  updateEmailData: (updates: Partial<EmailData>) => void;
}

export const EditorArea: React.FC<EditorAreaProps> = ({
  emailData,
  updateEmailData,
}) => {
  return (
    <div className="flex-1 bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <Input
              value={emailData.to}
              onChange={(e) => updateEmailData({ to: e.target.value })}
              placeholder="Enter recipient email..."
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-[70vw] mx-auto">
          <TiptapEditor />
        </div>
      </div>
    </div>
  );
};
