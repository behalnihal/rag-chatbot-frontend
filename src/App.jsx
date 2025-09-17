import React from "react";
import "./App.scss";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>RAG News Chatbot</h1>
      </header>
      <main>
        <ChatWindow />
      </main>
    </div>
  );
}

export default App;
