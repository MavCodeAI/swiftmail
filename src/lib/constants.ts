export const APIs = {
  TEMPMAIL: {
    domain: "tempmail.com",
    createAccount: (username: string) => `https://api.tempmail.com/v1/accounts/${username}`,
    getMessages: (token: string) => `https://api.tempmail.com/v1/messages/${token}`,
  }
};
