import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [notifications, setNotifications] = useState([]);
  // Connect to Socket.IO server
  useEffect(() => {
    `${import.meta.env.VITE_API_KEY_URL}/api/review`;
    const socket = io(`${import.meta.env.VITE_API_KEY_URL}`);

    // Listen for real-time notifications
    socket.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch existing notifications
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_KEY_URL}/api/notification`)
      .then((response) => setNotifications(response.data.data?.Notifications))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "0px" }}>Notification</h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "20px",
          width: "30px",
          height: "30px",
          background: "red",
          borderRadius: "50%",
          color: "#fff",
          margin: "15px auto",
        }}
      >
        {notifications?.length}
      </p>
    </div>
  );
}

export default App;
