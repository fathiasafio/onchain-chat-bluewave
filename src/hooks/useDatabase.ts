
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
  txHash?: string;
}

interface Profile {
  id: string;
  user_id: string;
  wallet_address: string;
  display_name: string;
}

export const useDatabase = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  // Load messages and profiles
  const loadData = async () => {
    if (!user) return;

    try {
      // Load messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      // Load profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      setProfiles(profilesData || []);

      // Transform messages to match the interface
      const transformedMessages: Message[] = (messagesData || []).map(msg => {
        const profile = profilesData?.find(p => p.user_id === msg.user_id);
        return {
          id: msg.id,
          content: msg.content,
          sender: profile?.display_name || profile?.wallet_address || 'Unknown',
          timestamp: new Date(msg.created_at),
          isOwn: msg.user_id === user.id,
          txHash: msg.tx_hash
        };
      });

      setMessages(transformedMessages);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load messages. Please refresh the page.",
        variant: "destructive"
      });
    }
  };

  // Send message to database
  const sendMessage = async (content: string) => {
    if (!user) return;

    setLoading(true);
    try {
      // Simulate transaction hash
      const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;

      const { error } = await supabase
        .from('messages')
        .insert({
          user_id: user.id,
          content,
          tx_hash: txHash
        });

      if (error) throw error;

      toast({
        title: "Message Sent",
        description: "Your message has been recorded onchain successfully!",
      });

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error Sending Message",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  // Set up realtime subscription
  useEffect(() => {
    if (!user) return;

    loadData();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        () => {
          // Reload data when new message is inserted
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    messages,
    profiles,
    loading,
    sendMessage,
    refreshData: loadData
  };
};
