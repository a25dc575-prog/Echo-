import { useState } from 'react';
import { Send, Smile, Paperclip, Phone, Video, MoreVertical, Music2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MusicMessageCard } from './MusicMessageCard';
import { Avatar } from './Avatar';
import type { User } from '../data/mockData';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  isRead?: boolean;
  musicShare?: {
    title: string;
    artist: string;
    cover: string;
    type: 'track' | 'playlist' | 'album';
  };
}

interface ChatRoomProps {
  user: User;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export function ChatRoom({ user, messages, onSendMessage }: ChatRoomProps) {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          {/* Avatar with online status */}
          <Avatar
            src={user.avatar}
            alt={user.name}
            className="w-11 h-11"
            showOnline={true}
            isOnline={user.isOnline}
          />

          {/* User Info */}
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-xs text-primary">
              {user.isOnline ? t('online') : t('offline')}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* End of History Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-border" />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
              <Music2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {t('endOfHistory')}
            </span>
          </div>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Messages */}
        {messages.map((message, index) => {
          const isMe = message.sender === 'me';
          const showTimestamp = index === 0 || messages[index - 1].timestamp !== message.timestamp;

          return (
            <div key={message.id} className="space-y-2">
              {/* Timestamp */}
              {showTimestamp && (
                <div className="flex justify-center">
                  <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    {message.timestamp}
                  </span>
                </div>
              )}

              {/* Message Bubble */}
              <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className="flex items-end gap-2 max-w-[70%]">
                  {/* Avatar for received messages */}
                  {!isMe && (
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 flex-shrink-0"
                    />
                  )}

                  <div className="flex flex-col gap-1">
                    {/* Music Share */}
                    {message.musicShare && (
                      <MusicMessageCard {...message.musicShare} />
                    )}

                    {/* Text Message */}
                    {message.text && (
                      <div
                        className={`px-4 py-2.5 rounded-2xl ${
                          isMe
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-card border border-border rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    )}

                    {/* Read Receipt */}
                    {isMe && message.isRead && (
                      <span className="text-xs text-muted-foreground self-end">
                        {t('read')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card px-6 py-4">
        <div className="flex items-end gap-3">
          {/* Attachment Buttons */}
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors flex-shrink-0">
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Input Field */}
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('echoYourThoughts')}
              className="w-full px-4 py-2.5 pr-10 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              rows={1}
              style={{
                minHeight: '42px',
                maxHeight: '120px',
              }}
            />
            <button className="absolute right-3 bottom-2.5 w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-lg bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed flex items-center justify-center transition-all flex-shrink-0"
          >
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}