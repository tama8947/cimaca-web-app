declare module '*.html' {
  const content: string;
  export default content;
}

declare interface ErrorNodemailerRequest {
  Error?: {
    Message: string
  }
  response?: string
  message?: string
}
