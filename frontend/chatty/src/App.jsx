import "./index.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const socket = io.connect("http://localhost:3000");
  const userName = nanoid(1);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    console.log(chat);
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });
  useEffect(() => {
    console.log(chat);
  }, [chat]);

  return (
    <>
      <h1 className='text-3xl text-center text-white font-bold bg-zinc-900 pt-6'>
        Chatty app
      </h1>
      <div className='flex flex-col items-center bg-zinc-900 w-full h-screen'>
        <div className='flex-grow p-5 w-full overflow-y-auto'>
          {chat.map((chatMessage, index) => (
            <div
              key={index}
              className={`p-2 text-white ${
                chatMessage.userName === userName
                  ? "bg-gray-300"
                  : "bg-blue-500"
              }`}
            >
              <span className='font-bold'>{chatMessage.userName}: </span>
              {chatMessage.message}
            </div>
          ))}
        </div>
        <div className='w-full flex justify-center'>
          <form onSubmit={sendChat} className='w-full max-w-md p-3 flex gap-2'>
            <input
              className='p-3 flex-grow outline-none rounded'
              type='text'
              name='chat'
              placeholder='Send text...'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              type='submit'
              className='p-3 bg-blue-500 text-white rounded'
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
