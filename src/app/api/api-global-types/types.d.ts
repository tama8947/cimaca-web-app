declare module '*.html' {
  const content: string;
  export default content;
}

declare type ErrorNodemailerRequest = {
  Error?: {
    Message: string
  }
  response?: string
  message?: string
}
