
import { useAuth } from "@/hooks/useAuth";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatContainer } from "@/components/ChatContainer";
import { MessageInput } from "@/components/MessageInput";
import { useChat } from "@/hooks/useChat";
import Auth from "./Auth";

const Index = () => {
  const { user, loading } = useAuth();
  const { messages, isConnected, isLoading, sendMessage } = useChat();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />
      
      <div className="relative flex flex-col h-screen max-w-4xl mx-auto w-full">
        <ChatHeader isConnected={isConnected} onConnect={() => {}} />
        
        <ChatContainer messages={messages} />
        
        <MessageInput 
          onSendMessage={sendMessage} 
          isConnected={isConnected}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
