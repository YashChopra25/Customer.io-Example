"use client";

import React, { useMemo, useState } from "react";
import { Toolbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";
import { EditorArea } from "./EditorArea";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import TiptapEditor from "./TiptapEditor";
import { useSetDocument } from "@veltdev/react";

export interface EmailData {
  subject: string;
  from: string;
  to: string;
  content: string;
  template: string;
}

export const EmailComposer: React.FC = () => {
  const [emailData, setEmailData] = useState<EmailData>({
    subject: "",
    from: "hello@yourcompany.com",
    to: "",
    content: "",
    template: "blank",
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const updateEmailData = (updates: Partial<EmailData>) => {
    setEmailData((prev) => ({ ...prev, ...updates }));
  };
  // useSetDocument("yash-customer.io-presernt", { documentName: "salary sheet" });
    useSetDocument("sheet-1", { documentName: "salary sheet" });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out bg-white border-r border-gray-200",
          isSidebarOpen ? "w-80" : "w-0 overflow-hidden"
        )}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onInsertBlock={(blockType) => {
            // Handle block insertion
            console.log("Insert block:", blockType);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <Header
          emailData={emailData}
          updateEmailData={updateEmailData}
          isPreviewMode={isPreviewMode}
          setIsPreviewMode={setIsPreviewMode}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Toolbar */}
        <Toolbar
          isPreviewMode={isPreviewMode}
          onFormatting={(format) => {
            console.log("Apply formatting:", format);
          }}
        />
        <EditorArea
          emailData={emailData}
          updateEmailData={updateEmailData}
          isPreviewMode={isPreviewMode}
        />
      </div>
    </div>
  );
};
