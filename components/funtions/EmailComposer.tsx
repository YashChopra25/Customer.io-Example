"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Toolbar } from "./Toolbar";
import { EditorArea } from "./EditorArea";
import { cn } from "@/lib/utils";
import { useSetDocument } from "@veltdev/react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

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
  const updateEmailData = (updates: Partial<EmailData>) => {
    setEmailData((prev) => ({ ...prev, ...updates }));
  };
  useSetDocument("sheet-1", { documentName: "customer.io" });

  return (
    <div className="flex bg-gray-50 dark:bg-[#25293c]">
      <Sidebar
        onInsertBlock={(blockType) => {
          console.log("Insert block:", blockType);
        }}
      />

      {/* Main Content */}
      <div className="flex-1 max-h-screen overflow-scroll flex flex-col bg-white dark:bg-[#25293c]">
        {/* Header */}
        <Header
          emailData={emailData}
          updateEmailData={updateEmailData}
        />
        {/* Toolbar */}
        <Toolbar
          onFormatting={(format) => {
            console.log("Apply formatting:", format);
          }}
        />
        <EditorArea emailData={emailData} updateEmailData={updateEmailData} />
      </div>
    </div>
  );
};
