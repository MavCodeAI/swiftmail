import { toast } from "sonner";

const API_URL = "https://api.mail.gw";

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

const generateRandomString = (length: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const createAccount = async (): Promise<Account> => {
  try {
    // Get available domains
    const domainsResponse = await fetch(`${API_URL}/domains`);
    const domainsData = await domainsResponse.json();
    const domain = domainsData["hydra:member"][0].domain;

    // Create email address
    const address = `${generateRandomString(12)}@${domain}`;
    const password = generateRandomString(12);

    // Create account
    const accountResponse = await fetch(`${API_URL}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
    });

    if (!accountResponse.ok) throw new Error('Failed to create account');

    // Get token
    const tokenResponse = await fetch(`${API_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
    });

    if (!tokenResponse.ok) throw new Error('Failed to get token');
    
    const { token } = await tokenResponse.json();
    return { address, token };
  } catch (error) {
    console.error('Error creating account:', error);
    toast.error("Failed to create email account");
    throw error;
  }
};

export const getMessages = async (token: string): Promise<Email[]> => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch messages');
    
    const data = await response.json();
    return data["hydra:member"];
  } catch (error) {
    console.error('Error fetching messages:', error);
    toast.error("Failed to fetch messages");
    throw error;
  }
};

export const getMessage = async (token: string, id: string): Promise<Email> => {
  try {
    const response = await fetch(`${API_URL}/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Failed to fetch message');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching message:', error);
    toast.error("Failed to fetch message details");
    throw error;
  }
};