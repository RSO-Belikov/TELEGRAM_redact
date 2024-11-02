import React, { useState, useCallback } from 'react';
import { Send, Copy, RotateCcw, AlertCircle } from 'lucide-react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { formatForTelegram } from './utils/formatter';
import { MAX_MESSAGE_LENGTH } from './utils/constants';

function App() {
  const [text, setText] = useState('');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  const handleFormat = useCallback(() => {
    try {
      const formatted = formatForTelegram(text);
      setPreview(formatted);
      setError('');
    } catch (err) {
      setError((err as Error).message);
    }
  }, [text]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(preview);
  }, [preview]);

  const handleReset = useCallback(() => {
    setText('');
    setPreview('');
    setError('');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Telegram Text Editor</h1>
          <p className="text-gray-600">Format and polish your Telegram messages</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Input</h2>
                <span className="text-sm text-gray-500">
                  {text.length}/{MAX_MESSAGE_LENGTH}
                </span>
              </div>
              <Editor 
                value={text} 
                onChange={setText}
                maxLength={MAX_MESSAGE_LENGTH}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleFormat}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Send size={20} /> Format
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw size={20} /> Reset
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
                <button
                  onClick={handleCopy}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Copy size={18} /> Copy
                </button>
              </div>
              <Preview content={preview} />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;