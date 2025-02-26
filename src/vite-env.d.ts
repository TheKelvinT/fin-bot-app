// .vite.d.ts or vite.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: React.ReactNode
    }
  }
}

export {} // This ensures that the file is treated as a module
