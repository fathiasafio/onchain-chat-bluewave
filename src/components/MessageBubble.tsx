
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
  txHash?: string;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const timeAgo = formatDistanceToNow(message.timestamp, { addSuffix: true });

  return (
    <div className={`flex ${message.isOwn ? "justify-end" : "justify-start"} mb-4 animate-fade-in`}>
      <div className={`flex max-w-[70%] ${message.isOwn ? "flex-row-reverse" : "flex-row"} items-end space-x-2`}>
        {!message.isOwn && (
          <Avatar className="w-8 h-8 mb-1">
            <AvatarFallback className="bg-gradient-to-br from-primary to-blue-400 text-white text-xs">
              {message.sender.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className={`${message.isOwn ? "mr-2" : "ml-2"}`}>
          <div
            className={`px-4 py-2 rounded-2xl ${
              message.isOwn
                ? "bg-blue-gradient text-white"
                : "bg-card border border-border"
            }`}
          >
            {!message.isOwn && (
              <div className="text-xs text-muted-foreground mb-1 font-medium">
                {message.sender}
              </div>
            )}
            <p className="text-sm leading-relaxed break-words">{message.content}</p>
            {message.txHash && (
              <div className="mt-2 text-xs opacity-70">
                <span className="bg-black/20 px-2 py-1 rounded-full">
                  🔗 {message.txHash.slice(0, 6)}...{message.txHash.slice(-4)}
                </span>
              </div>
            )}
          </div>
          <div className={`text-xs text-muted-foreground mt-1 ${message.isOwn ? "text-right" : "text-left"}`}>
            {timeAgo}
          </div>
        </div>
      </div>
    </div>
  );
};
