import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { apiPath } from "../utils/contants";

const socket = socketIOClient(apiPath);

const Chat = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "hi there! 👋 ",
    },
  ]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: 1, content: message.content },
      ]);
    });

    socket.on("userMessage", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: 2, content: message.content },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("userMessage", message);
      setMessage("");
    }
    if (image) {
      setMessages([...messages, { id: 2, content: image, isImage: true }]);
      setImage(null);
    }
  };

  return (
    <div>
      <div
        className="flex flex-col items-center justify-center w-screen min-h-screen p-10"
        style={{
          background:
            "linear-gradient(239.26deg, #DDEEED 63.17%, #FDF1E0 94.92%)",
        }}
      >
        {" "}
        <div className="flex flex-col flex-grow w-full max-w-xl  rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex w-full mt-6 space-x-3 max-w-xs ${
                  message.id === 1 ? "" : "ml-auto justify-end"
                }`}
              >
                <div>
                  <div
                    className={`bg-[#fff] p-3 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl ${
                      index === messages.length - 1 && message.id === 1
                        ? "rounded-tl-none animate-pulse"
                        : "rounded-tl-3xl"
                    }
                        ${
                          index === messages.length - 1 && message.id === 2
                            ? "rounded-tr-none animate-pulse"
                            : "rounded-tr-3xl"
                        }`}
                  >
                    {message.isImage ? (
                      <img src={message.content} alt="Chat" />
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>{" "}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center px-4 rounded-lg bg-slate-100">
            <input
              className="flex-grow h-10 rounded px-3 text-sm bg-slate-100"
              type="text"
              placeholder="Type your message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
             <input
              className="block w-full text-sm text-gray-300 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            
            <button className="ml-2 bg-slate-100" type="submit">
              Send
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Chat;
