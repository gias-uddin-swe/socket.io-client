import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:5000/");

function App() {
  const [message, setMessage] = useState("");
  const [getMessage, setGetMessage] = useState("");
  const [room, setRoom] = useState("");

  const handleSend = () => {
    socket.emit("reactEvent", { message, room });
  };

  useEffect(() => {
    socket.on("showMessage", (data) => {
      console.log(data);
      setGetMessage(data.message);
    });
  }, [socket]);

  const hanldeRoom = () => {
    socket.emit("joinRoom", room);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="h1">sender:{message}</h1>
        <h1 className="h1">Receiver: {getMessage}</h1>
      </div>

      <input
        onBlur={(e) => setRoom(e.target.value)}
        type="text"
        placeholder="ROom...."
      />
      <button onClick={hanldeRoom}>Join room</button>
      <br />
      <input
        onBlur={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="message...."
      />
      <br />
      <button onClick={handleSend}>send</button>
    </div>
  );
}

export default App;
