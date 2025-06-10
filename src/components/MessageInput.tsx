
import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  isConnected: boolean;
  isLoading?: boolean;
}

export const MessageInput = ({ onSendMessage, isConnected, isLoading }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && isConnected && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isConnected 
              ? "Type your message..." 
              : "Connect wallet to send messages"
          }
          disabled={!isConnected || isLoading}
          className="flex-1 bg-background border-border focus:border-primary focus:ring-primary"
          maxLength={500}
        />
        <Button 
          type="submit" 
          disabled={!message.trim() || !isConnected || isLoading}
          className="bg-blue-gradient hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
      {!isConnected && (
        <p className="text-xs text-muted-foreground mt-2">
          Connect your wallet to start chatting onchain
        </p>
      )}
    </div>
  );
};
