import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Copy, 
  RefreshCw, 
  Search, 
  Inbox, 
  MailX, 
  Clock, 
  ChevronDown, 
  Trash2,
  Download,
  Star,
  StarOff,
  Filter
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  id: string;
  from: string;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
  starred: boolean;
}

export function TempMail() {
  const [email, setEmail] = useState("3loixkmunedk@oakon.com");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate fetching messages
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to receive a message
        const newMessage: Message = {
          id: Math.random().toString(36).substring(2),
          from: `user${Math.floor(Math.random() * 1000)}@example.com`,
          subject: `Test Message ${messages.length + 1}`,
          content: "This is a test message content. Lorem ipsum dolor sit amet...",
          timestamp: new Date(),
          read: false,
          starred: false,
        };
        setMessages(prev => [newMessage, ...prev]);
        toast.info("New message received!");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh, messages.length]);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard!");
  };

  const generateNewEmail = () => {
    setLoading(true);
    setTimeout(() => {
      const random = Math.random().toString(36).substring(2, 12);
      setEmail(`${random}@oakon.com`);
      setMessages([]);
      setLoading(false);
      toast.success("New email address generated!");
    }, 1000);
  };

  const toggleMessageStar = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
      )
    );
  };

  const deleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    toast.success("Message deleted");
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const downloadMessage = (message: Message) => {
    const blob = new Blob([
      `From: ${message.from}\nSubject: ${message.subject}\n\n${message.content}`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `message-${message.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Message downloaded");
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.from.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" ||
                         (filter === "unread" && !msg.read) ||
                         (filter === "starred" && msg.starred);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Email Display Section */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Your Temporary Email
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              value={email}
              readOnly
              className="pr-24 font-mono bg-white/50 dark:bg-gray-900/50 text-lg"
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-white/10"
              onClick={copyEmail}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            variant="outline"
            className="bg-white/50 dark:bg-gray-900/50 hover:bg-white/70 dark:hover:bg-gray-800/70"
            onClick={generateNewEmail}
            disabled={loading}
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Change Email
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Messages will automatically appear below
        </p>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/50 dark:bg-gray-800/50"
          />
        </div>

        {/* Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("unread")}>Unread</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("starred")}>Starred</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Auto Refresh Toggle */}
        <Button
          variant="outline"
          className={autoRefresh ? "bg-green-500/10" : ""}
          onClick={() => setAutoRefresh(!autoRefresh)}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
          {autoRefresh ? "Auto-refresh On" : "Auto-refresh Off"}
        </Button>
      </div>

      {/* Messages Section */}
      <motion.div
        initial={false}
        className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/10 min-h-[300px] relative"
      >
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-[300px] text-center p-6"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-12 w-12 text-gray-400 animate-spin mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Checking for new messages...
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    This may take a few moments
                  </p>
                </>
              ) : (
                <>
                  {searchQuery ? (
                    <>
                      <MailX className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No messages found
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Try adjusting your search terms
                      </p>
                    </>
                  ) : (
                    <>
                      <Inbox className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No messages yet
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        New messages will appear here automatically
                      </p>
                    </>
                  )}
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer relative group"
                  onClick={() => {
                    markAsRead(message.id);
                    setSelectedMessage(message);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${message.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                          {message.subject}
                        </h4>
                        {!message.read && (
                          <Badge variant="default" className="bg-blue-500">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {message.from}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMessageStar(message.id);
                          }}
                        >
                          {message.starred ? (
                            <Star className="h-4 w-4 text-yellow-400" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadMessage(message);
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Message Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>From: {selectedMessage?.from}</span>
              <span>{selectedMessage?.timestamp.toLocaleString()}</span>
            </div>
            <div className="prose prose-sm dark:prose-invert">
              {selectedMessage?.content}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auto-refresh indicator */}
      {autoRefresh && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <RefreshCw className="h-3 w-3 animate-spin" />
          Auto-refreshing...
        </div>
      )}
    </div>
  );
}