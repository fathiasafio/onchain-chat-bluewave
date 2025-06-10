
import { Wallet, Users, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface ChatHeaderProps {
  isConnected: boolean;
  onConnect: () => void;
}

export const ChatHeader = ({ isConnected }: ChatHeaderProps) => {
  const { signOut } = useAuth();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">⚡</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Messaging Buildathon
            </h1>
            <p className="text-xs text-muted-foreground">Onchain Messaging</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>Connected</span>
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            className="bg-green-500/20 text-green-400 hover:bg-green-500/30 flex items-center space-x-2"
            disabled
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">Authenticated</span>
          </Button>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={signOut}
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
