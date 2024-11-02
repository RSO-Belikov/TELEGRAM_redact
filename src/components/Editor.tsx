import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
}

export function Editor({ value, onChange, maxLength }: EditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      className="w-full h-[300px] p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono text-gray-700"
      placeholder="Enter your text here..."
    />
  );
}