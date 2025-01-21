import { useState, useEffect } from "react";
import { createAccount, getMessages, getMessage, type Account, type Email } from "@/services/emailService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Copy, RefreshCw, Mail } from "lucide-react";

export const TempMail = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [messages, setMessages] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    initializeAccount();
  }, []);

  useEffect(() => {
    if (account) {
      const interval = setInterval(() => {
        refreshMessages();
      }, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [account]);

  const initializeAccount = async () => {
    try {
      const newAccount = await createAccount();
      setAccount(newAccount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const refreshMessages = async () => {
    if (!account) return;
    setRefreshing(true);
    try {
      const newMessages = await getMessages(account.token);
      setMessages(newMessages);
    } catch (error) {
      console.error("Error refreshing messages:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const copyEmailToClipboard = () => {
    if (account) {
      navigator.clipboard.writeText(account.address);
      toast.success("Email address copied to clipboard!");
    }
  };

  const handleEmailClick = async (email: Email) => {
    if (!account) return;
    try {
      const fullEmail = await getMessage(account.token, email.id);
      setSelectedEmail(fullEmail);
    } catch (error) {
      console.error("Error fetching email details:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="w-full max-w-4xl p-6">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-32 w-full" />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Temporary Email</h1>
              {account && (
                <p className="text-muted-foreground">{account.address}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={copyEmailToClipboard}
                className="transition-all hover:scale-105"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={refreshMessages}
                className={`transition-all hover:scale-105 ${
                  refreshing ? "animate-spin" : ""
                }`}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 h-[600px] overflow-auto">
            <h2 className="text-lg font-medium mb-4">Inbox</h2>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[500px] text-muted-foreground">
                <Mail className="h-12 w-12 mb-2" />
                <p>No messages yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => handleEmailClick(email)}
                    className="p-4 rounded-lg border cursor-pointer transition-all hover:bg-accent"
                  >
                    <p className="font-medium truncate">{email.subject}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {email.from.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(email.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-4 h-[600px] overflow-auto">
            <h2 className="text-lg font-medium mb-4">Message</h2>
            {selectedEmail ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium">{selectedEmail.subject}</h3>
                  <p className="text-sm text-muted-foreground">
                    From: {selectedEmail.from.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Date: {new Date(selectedEmail.createdAt).toLocaleString()}
                  </p>
                </div>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-muted-foreground">
                <Mail className="h-12 w-12 mb-2" />
                <p>Select an email to view</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};