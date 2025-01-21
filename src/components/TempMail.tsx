import { useState, useEffect } from "react";
import { createAccount, getMessages, getMessage, type Account, type Email } from "@/services/emailService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Copy, RefreshCw, Mail, Inbox, Search, Loader2, RotateCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

export const TempMail = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [messages, setMessages] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInbox, setShowInbox] = useState(true);
  const [changingEmail, setChangingEmail] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    initializeAccount();
  }, []);

  useEffect(() => {
    if (account) {
      refreshMessages();
      const interval = setInterval(refreshMessages, 15000);
      return () => clearInterval(interval);
    }
  }, [account]);

  const initializeAccount = async () => {
    try {
      setLoading(true);
      const newAccount = await createAccount();
      setAccount(newAccount);
      toast.success("Email account created successfully!");
    } catch (error) {
      toast.error("Failed to create email account");
      console.error("Account creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async () => {
    try {
      setChangingEmail(true);
      setMessages([]);
      setSelectedEmail(null);
      await initializeAccount();
      toast.success("Email address changed successfully!");
    } catch (error) {
      toast.error("Failed to change email address");
      console.error("Email change error:", error);
    } finally {
      setChangingEmail(false);
    }
  };

  const refreshMessages = async () => {
    if (!account) return;
    setRefreshing(true);
    try {
      const newMessages = await getMessages(account.token);
      setMessages(newMessages);
      console.log("Messages refreshed:", newMessages);
    } catch (error) {
      toast.error("Failed to refresh messages");
      console.error("Refresh error:", error);
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
      if (isMobile) {
        setShowInbox(false);
      }
    } catch (error) {
      toast.error("Failed to fetch email details");
      console.error("Email fetch error:", error);
    }
  };

  const filteredMessages = messages.filter((email) =>
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.from.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 flex items-center justify-center">
        <Card className="w-full max-w-4xl p-6 animate-pulse">
          <div className="flex items-center justify-center space-x-4">
            <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
            <p className="text-lg font-medium">Creating your temporary email...</p>
          </div>
        </Card>
      </div>
    );
  }

  const EmailView = () => (
    <Card className="p-4 h-[600px] overflow-hidden bg-white/50 backdrop-blur-sm border-purple-100 dark:border-gray-700 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Message</h2>
        {isMobile && (
          <Button variant="ghost" size="sm" onClick={() => setShowInbox(true)}>
            <Inbox className="h-4 w-4 mr-2" />
            Back to Inbox
          </Button>
        )}
      </div>
      <ScrollArea className="h-[520px]">
        {selectedEmail ? (
          <div className="space-y-4 animate-fade-in">
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
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[500px] text-muted-foreground">
            <Mail className="h-12 w-12 mb-2" />
            <p>Select an email to view</p>
          </div>
        )}
      </ScrollArea>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 mb-6 bg-white/50 backdrop-blur-sm border-purple-100 dark:border-gray-700 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                Temporary Email
              </h1>
              {account && (
                <div className="relative group">
                  <p className="text-lg text-muted-foreground break-all bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                    {account.address}
                  </p>
                  <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigator.clipboard.writeText(account?.address || '')}
                className="transition-all hover:scale-105 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                title="Copy email address"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={refreshMessages}
                className={`transition-all hover:scale-105 hover:bg-purple-50 dark:hover:bg-purple-900/20 ${
                  refreshing ? "animate-spin" : ""
                }`}
                disabled={refreshing}
                title="Refresh messages"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleChangeEmail}
                className="transition-all hover:scale-105 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                disabled={changingEmail}
                title="Change email address"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-white/50 backdrop-blur-sm border-purple-100 dark:border-gray-700"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(!isMobile || showInbox) && (
            <Card className="p-4 h-[600px] overflow-hidden bg-white/50 backdrop-blur-sm border-purple-100 dark:border-gray-700 animate-fade-in">
              <h2 className="text-lg font-medium mb-4">Inbox</h2>
              <ScrollArea className="h-[520px]">
                {filteredMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[500px] text-muted-foreground">
                    <Mail className="h-12 w-12 mb-2" />
                    <p>No messages yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredMessages.map((email) => (
                      <div
                        key={email.id}
                        onClick={() => handleEmailClick(email)}
                        className="p-4 rounded-lg border border-purple-100 dark:border-gray-700 cursor-pointer transition-all hover:bg-purple-50 dark:hover:bg-purple-900/20 animate-fade-in"
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
              </ScrollArea>
            </Card>
          )}

          {(!isMobile || !showInbox) && <EmailView />}
        </div>
      </div>
    </div>
  );
};