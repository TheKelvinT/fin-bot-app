import "./App.css"
import Chat from "./components/Chat"

function App() {
  return (
    <>
      <div className="text-2xl mb-4 text-center">
        Moneymama Financial Chatbot
      </div>
      <div className="flex justify-center">
        <Chat />
      </div>
    </>
  )
}

export default App
