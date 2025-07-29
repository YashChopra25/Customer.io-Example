"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  X,
  ChevronDown,
  ChevronRight,
  LayoutPanelLeft,
  Database,
  Menu,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Separator } from "../ui/separator";

interface SidebarProps {
  onInsertBlock: (blockType: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onInsertBlock }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((s) => s !== sectionName)
        : [...prev, sectionName]
    );
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  useLayoutEffect(() => {
    const handleResize = () => {
      // Collapse sidebar for mobile devices (screens < 768px)
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Run on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const DateIntegration = ["Data Index", "Integrations", "Imports", "Exports"];

  const Content = [
    "Assets",
    "Email Layouts",
    "Snippets",
    "Collections (Premium)",
  ];

  const menuItems = [
    { name: "Dashboard", icon: "⏱️" },
    { name: "Analysis", icon: "📊" },
    { name: "Campaigns", icon: "📣" },
    { name: "Broadcasts", icon: "📢" },
    { name: "Transactional", icon: "📋" },
    { name: "Deliveries & Drafts", icon: "📬" },
    { name: "People", icon: "👤" },
    { name: "Accounts", icon: "🧾" },
    { name: "Webinars", icon: "🗓️" },
    { name: "Segments", icon: "🧩" },
    { name: "Activity Logs", icon: "📈" },
  ];

  const renderSection = (
    title: string,
    items: any[],
    sectionKey: string,
    icon: React.ReactNode
  ) => (
    <div className="!m-0 !my-4 dark:bg-[#25293c]">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded-lg group"
      >
        <div className="space-x-2 flex items-center justify-start">
          <span className="text-gray-600 group-hover:text-text-black">
            {icon}
          </span>
          {!isCollapsed && (
            <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:dark:text-black hover:dark:text-black">
              {title}
            </span>
          )}
        </div>
        {!isCollapsed && expandedSections.includes(sectionKey) ? (
          <ChevronDown
            size={16}
            className="group-hover:text-text-black text-gray-600"
          />
        ) : (
          !isCollapsed && (
            <ChevronRight
              size={16}
              className="group-hover:text-text-black text-gray-600"
            />
          )
        )}
      </button>

      {!isCollapsed && expandedSections.includes(sectionKey) && (
        <div className="mt-2 space-y-1">
          {items.map((item) => (
            <div
              key={item}
              onClick={() => onInsertBlock(item.toLowerCase())}
              className="flex items-center space-x-3 w-full p-2 text-left hover:bg-blue-50 rounded-lg group"
            >
              <div className="flex-1 min-w-0">
                <p className="ps-9 text-sm text-gray-900/70 dark:text-white/70 group-hover:dark:text-black hover:dark:text-black">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`h-full bg-white border-r border-gray-200 dark:bg-[#25293c] transition-all duration-300 max-h-screen overflow-scroll no-scrollbar ${
        isCollapsed ? "w-16" : "w-50 lg:w-64"
      }`}
    >
      <div
        className={`border-b border-gray-200 dark:border-white/40 flex items-center justify-between ${
          !isCollapsed ? "p-4" : "p-2"
        }`}
      >
        <h2
          className={`font-semibold text-gray-900 dark:text-white ${
            isCollapsed && "text-xs"
          }`}
        >
          Content
        </h2>
      </div>

      <div className={`flex-1 ${!isCollapsed ? "p-4" : "p-2"}`}>
        <div className="space-y-6">
          {/* Templates */}
          <div>
            {!isCollapsed && (
              <h3 className="font-medium text-sm text-gray-900 mb-3 dark:text-white">
                Templates
              </h3>
            )}
            <div className="mt-2 space-y-1">
              {menuItems.map((item, index) => (
                <React.Fragment key={item.name}>
                  <button
                    onClick={() => onInsertBlock(item.name.toLowerCase())}
                    className="flex items-center space-x-3 w-full p-2 text-left hover:bg-blue-50 rounded-lg group hover:dark:!text-black"
                    title={isCollapsed ? item.name : ""}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        !isCollapsed &&
                        "bg-gray-100 group-hover:bg-blue-100 hover:dark:!text-black"
                      }`}
                    >
                      <span className="text-gray-600 group-hover:text-text-black">
                        {item.icon}
                      </span>
                    </div>
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white/70 group-hover:dark:text-black hover:dark:text-black">
                          {item.name}
                        </p>
                      </div>
                    )}
                  </button>
                  {(index + 1) % 3 === 0 && (
                    <Separator className="dark:bg-white/40" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <Separator className="dark:bg-white/40 !m-0 !mt-2" />

          {/* Content Blocks */}
          {renderSection(
            "Data & Integrations",
            DateIntegration,
            "content",
            <Database size={19} />
          )}

          <Separator className="dark:bg-white/40 !m-0 !mt-2" />

          {/* Layout Blocks */}
          {renderSection(
            "Content",
            Content,
            "layout",
            <LayoutPanelLeft size={19} />
          )}

          <Separator className="dark:bg-white/40 !m-0 !mt-2" />
        </div>
      </div>

      <div className="w-full">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={`text-gray-600 hover:text-gray-900 ${
            !isCollapsed ? "float-right mr-3" : "ml-2"
          }`}
        >
          {isCollapsed ? (
            <ChevronsRight size={20} />
          ) : (
            <ChevronsLeft size={20} />
          )}
        </Button>
      </div>
    </div>
  );
};
