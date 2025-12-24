import { Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { ChatConversation } from '../data/mockData';
import { Avatar } from './Avatar';

interface ChatSidebarProps {
  conversations: ChatConversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
}: ChatSidebarProps) {
  const { t } = useLanguage();

  return (
    <div className="w-80 h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="mb-4">{t('messages')}</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('searchConversations')}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const isActive = conversation.id === activeConversationId;
          
          return (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full p-4 flex items-center gap-3 border-b border-border hover:bg-secondary transition-colors ${
                isActive ? 'bg-secondary' : ''
              }`}
            >
              {/* Avatar with online status */}
              <div className="relative flex-shrink-0">
                <Avatar
                  src={conversation.user.avatar}
                  alt={conversation.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary rounded-full border-2 border-card" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold truncate">{conversation.user.name}</h4>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>

              {/* Unread badge */}
              {conversation.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-primary-foreground font-semibold">
                    {conversation.unread}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}