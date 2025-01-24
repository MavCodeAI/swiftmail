export interface Email {
  id: string;
  subject: string;
  from: {
    address: string;
    name?: string;
  };
  to: {
    address: string;
    name?: string;
  };
  text: string;
  html?: string;
  createdAt: string;
}
