"use client";

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { EmailData } from './EmailComposer';
import { Monitor, Smartphone, Tablet, Code } from 'lucide-react';
import TiptapEditor from './TiptapEditor';

interface EditorAreaProps {
  emailData: EmailData;
  updateEmailData: (updates: Partial<EmailData>) => void;
  isPreviewMode: boolean;
}

export const EditorArea: React.FC<EditorAreaProps> = ({ 
  emailData, 
  updateEmailData, 
  isPreviewMode 
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showHtml, setShowHtml] = useState(false);

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-md';
      default: return 'max-w-2xl';
    }
  };

  if (isPreviewMode) {
    return (
      <div className="flex-1 bg-gray-50">
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Preview:</span>
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('desktop')}
                className="h-8"
              >
                <Monitor size={16} />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('tablet')}
                className="h-8"
              >
                <Tablet size={16} />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('mobile')}
                className="h-8"
              >
                <Smartphone size={16} />
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHtml(!showHtml)}
              className="flex items-center space-x-2"
            >
              <Code size={16} />
              <span>{showHtml ? 'Preview' : 'HTML'}</span>
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-8">
          <div className="flex justify-center">
            <div className={`${getPreviewWidth()} mx-auto`}>
              <Card className="bg-white shadow-lg">
                <div className="p-6">
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="text-sm text-gray-600 mb-1">From: {emailData.from}</div>
                    <div className="text-sm text-gray-600 mb-2">To: {emailData.to || 'recipient@example.com'}</div>
                    <h1 className="text-xl font-semibold text-gray-900">
                      {emailData.subject || 'Email Subject'}
                    </h1>
                  </div>
                  
                  {showHtml ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                        {emailData.content || '<p>Email content goes here...</p>'}
                      </pre>
                    </div>
                  ) : (
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: emailData.content || '<p>Email content goes here...</p>' 
                      }}
                    />
                  )}
                </div>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }

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
          <TiptapEditor/>
        </div>
      </div>
    </div>
  );
};