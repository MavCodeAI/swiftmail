import { toast } from "sonner";

const API_URL = "https://api.tempmail.lol";

export interface Email {
  id: string;
  from: { address: string; name: string };
  to: { address: string; name: string }[];
  subject: string;
  intro: string;
  text: string;
  html: string;
  createdAt: string;
}

export interface Account {
  address: string;
  token: string;
}

export const createTempMail = async (): Promise<Account> => {
  try {
    const response = await fetch(`${API_URL}/generate`);
    if (!response.ok) throw new Error('Failed to generate email');
    
    const data = await response.json();
    return {
      address: data.address,
      token: data.token
    };
  } catch (error) {
    console.error('Error creating email:', error);
    toast.error("Failed to create email account");
    throw error;
  }
};

export const getMessages = async (token: string): Promise<Email[]> => {
  try {
    const response = await fetch(`${API_URL}/auth/${token}`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    
    const data = await response.json();
    return data.email.map((msg: any) => ({
      id: msg.id || Math.random().toString(),
      from: { 
        address: msg.from,
        name: msg.from.split('@')[0]
      },
      to: [{ 
        address: msg.to,
        name: msg.to.split('@')[0]
      }],
      subject: msg.subject || 'No Subject',
      intro: msg.body,
      text: msg.body,
      html: msg.html || msg.body,
      createdAt: msg.date || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching messages:', error);
    toast.error("Failed to fetch messages");
    throw error;
  }
};

export const getMessage = async (token: string, id: string): Promise<Email> => {
  try {
    const messages = await getMessages(token);
    const message = messages.find(msg => msg.id === id);
    if (!message) throw new Error('Message not found');
    return message;
  } catch (error) {
    console.error('Error fetching message:', error);
    toast.error("Failed to fetch message details");
    throw error;
  }
};

export const deleteTempMail = async (email: string): Promise<void> => {
  // temp-mail.io doesn't have a delete endpoint, emails automatically expire
  return Promise.resolve();
};