
import { useAuth } from '@/hooks/useAuth';
import { useDatabase } from '@/hooks/useDatabase';

export const useChat = () => {
  const { user } = useAuth();
  const { messages, loading, sendMessage } = useDatabase();

  return {
    messages,
    isConnected: !!user,
    isLoading: loading,
    connectWallet: () => {}, // This is now handled by auth
    sendMessage,
  };
};
