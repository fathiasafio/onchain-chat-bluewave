
import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
  txHash?: string;
}

interface ChatContainerProps {
  messages: Message[];
}

export const ChatContainer = ({ messages }: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-blue">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Welcome to Messaging Buildathon</h3>
          <p className="text-muted-foreground max-w-md">
            Connect your wallet and start chatting with the community. 
            All messages are stored onchain for transparency and permanence.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-1">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
