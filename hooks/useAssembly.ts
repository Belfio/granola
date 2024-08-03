import { useEffect, useState } from "react";

const getToken = async () => {
  const response = await fetch(
    "https://0qujodd4w6.execute-api.us-east-1.amazonaws.com/token"
  );

  const data = await response.json();
  console.log("Token:", data.token);
  return data.token;
};

const useAssembly = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();

      return token;
    };

    const initializeWebSocket = async () => {
      const token = await fetchToken();
      const socket = new WebSocket(
        "wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=" +
          token
      );
      socket.onopen = () => {
        console.log("WebSocket connection opened");
      };

      socket.onmessage = (event) => {
        console.log("Received:", event.data);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
      setSocket(socket);

      return () => {
        socket.close();
      };
    };

    initializeWebSocket();
  }, []);
  return { socket };
};

export default useAssembly;
