import React from 'react';

interface PreviewProps {
  content: string;
}

export function Preview({ content }: PreviewProps) {
  if (!content) {
    return (
      <div className="h-[300px] bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
        Formatted text will appear here
      </div>
    );
  }

  return (
    <div className="h-[300px] overflow-auto p-4 bg-gray-50 rounded-lg font-mono whitespace-pre-wrap text-gray-700">
      {content}
    </div>
  );
}