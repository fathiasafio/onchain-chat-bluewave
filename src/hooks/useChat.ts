import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
  txHash?: string;
}

export const useChat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to Messaging Buildathon! This is a demo message showing how onchain messaging works.",
      sender: "0x1234...5678",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isOwn: false,
      txHash: "0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab",
    },
    {
      id: "2", 
      content: "Hey everyone! Excited to try out this buildathon messaging platform 🚀",
      sender: "0x9876...4321",
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      isOwn: false,
      txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    }
  ]);

  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAddress] = useState("0xYour...Address");

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsConnected(true);
    setIsLoading(false);
    
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to your wallet. You can now send messages onchain!",
    });
  }, [toast]);

  const sendMessage = useCallback(async (content: string) => {
    if (!isConnected) return;

    setIsLoading(true);

    // Simulate onchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: userAddress,
      timestamp: new Date(),
      isOwn: true,
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(false);

    toast({
      title: "Message Sent",
      description: "Your message has been recorded onchain successfully!",
    });

    // Simulate receiving a response after a delay
    setTimeout(() => {
      const responses = [
        "That's awesome! Love this buildathon messaging concept 💎",
        "GM! Great to see more builders joining the chain 🌅", 
        "Welcome to the future of decentralized communication! 🎉",
        "This buildathon project is so cool, messages stored forever on the blockchain! 🔗",
        "Nice work! No more centralized servers controlling our conversations 🔐"
      ];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
        timestamp: new Date(),
        isOwn: false,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      };

      setMessages(prev => [...prev, responseMessage]);
    }, 3000 + Math.random() * 4000);

  }, [isConnected, userAddress, toast]);

  return {
    messages,
    isConnected,
    isLoading,
    connectWallet,
    sendMessage,
  };
};
