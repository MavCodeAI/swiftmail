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
import { motion, AnimatePresence } from "framer-motion";

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

  const copyToClipboard = () => {
    if (account) {
      navigator.clipboard.writeText(account.address);
      toast.success("Email address copied to clipboard!");
    }
  };

  const handleEmailSelect = async (email: Email) => {
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8"
      >
        {/* Email Address Section */}
        <Card className="p-6 bg-white/80 backdrop-blur-lg shadow-lg dark:bg-gray-900/50 border-purple-100 dark:border-gray-700">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="relative flex-grow w-full">
              <Input
                value={account?.address || ""}
                readOnly
                className="pr-24 font-mono text-lg bg-transparent border-purple-100 dark:border-gray-700"
                placeholder="Loading email address..."
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  className="hover:bg-purple-50 dark:hover:bg-gray-800"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={refreshMessages}
                  className="hover:bg-purple-50 dark:hover:bg-gray-800"
                  disabled={refreshing}
                >
                  {refreshing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              onClick={handleChangeEmail}
              disabled={changingEmail}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-md"
            >
              {changingEmail ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RotateCw className="h-4 w-4 mr-2" />
              )}
              Change Email
            </Button>
          </motion.div>
        </Card>

        {/* Search and Toggle Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search emails..."
              className="pl-10 bg-white/80 backdrop-blur-lg dark:bg-gray-900/50 border-purple-100 dark:border-gray-700"
            />
          </div>
          <Button
            onClick={() => setShowInbox(!showInbox)}
            variant="outline"
            className="w-full sm:w-auto border-purple-100 dark:border-gray-700"
          >
            {showInbox ? (
              <>
                <Mail className="h-4 w-4 mr-2" />
                View Message
              </>
            ) : (
              <>
                <Inbox className="h-4 w-4 mr-2" />
                View Inbox
              </>
            )}
          </Button>
        </motion.div>

        {/* Messages Section */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-4 bg-white/80 backdrop-blur-lg dark:bg-gray-900/50 border-purple-100 dark:border-gray-700">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </Card>
              ))}
            </motion.div>
          ) : showInbox ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid gap-4"
            >
              {filteredMessages.length > 0 ? (
                filteredMessages.map((email) => (
                  <motion.div
                    key={email.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    className="cursor-pointer"
                    onClick={() => handleEmailSelect(email)}
                  >
                    <Card className="p-4 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-lg dark:bg-gray-900/50 border-purple-100 dark:border-gray-700">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">{email.from}</h3>
                          <time className="text-sm text-muted-foreground">
                            {formatDate(email.date)}
                          </time>
                        </div>
                        <p className="text-muted-foreground line-clamp-2">
                          {email.subject}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Inbox className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                  <p className="text-muted-foreground">
                    New messages will appear here automatically
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            selectedEmail && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Card className="p-6 bg-white/80 backdrop-blur-lg dark:bg-gray-900/50 border-purple-100 dark:border-gray-700">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">{selectedEmail.subject}</h2>
                      <div className="flex items-center justify-between text-muted-foreground">
                        <p>From: {selectedEmail.from}</p>
                        <time>{formatDate(selectedEmail.date)}</time>
                      </div>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <div
                        dangerouslySetInnerHTML={{ __html: selectedEmail.html || selectedEmail.text }}
                        className="prose prose-purple dark:prose-invert max-w-none"
                      />
                    </ScrollArea>
                  </div>
                </Card>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};