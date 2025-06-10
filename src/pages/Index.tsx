
import { ChatHeader } from "@/components/ChatHeader";
import { ChatContainer } from "@/components/ChatContainer";
import { MessageInput } from "@/components/MessageInput";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const { messages, isConnected, isLoading, connectWallet, sendMessage } = useChat();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 pointer-events-none" />
      
      <div className="relative flex flex-col h-screen max-w-4xl mx-auto w-full">
        <ChatHeader isConnected={isConnected} onConnect={connectWallet} />
        
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
