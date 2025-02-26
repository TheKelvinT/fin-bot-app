/// <reference types="vite/client" />
declare module "@ant-design" {
  interface ReactMarkdownProps {
    components?: { [key: string]: React.ComponentType<any> }
  }
}
