interface UmamiWindow extends Window {
  umami?: {
    trackView: (url: string) => void;
  }
}

declare global {
  interface Window extends UmamiWindow {}
}
