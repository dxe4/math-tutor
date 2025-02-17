import { useState, useEffect } from "react";
import { TaskEvent, TaskEventLog } from "../../types/apiTypes";

interface UseWebSocketProps {
  sessionId: string | null;
  wsUrl: string;
}

const useWebSocketPrimes = ({ sessionId, wsUrl }: UseWebSocketProps) => {
  const [events, setEvents] = useState<TaskEventLog[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setIsConnected(false);
      return;
    }

    const websocket = new WebSocket(`${wsUrl}${sessionId}/`);
    setWs(websocket);

    websocket.onopen = () => {
      setIsConnected(true);
    };

    websocket.onmessage = (event: MessageEvent) => {
      const data: TaskEvent = JSON.parse(event.data);
      handleNewEvent(data, websocket);
    };

    websocket.onclose = () => {
      console.log("closed");
      setIsConnected(false);
    };

    return () => {
      if (websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, [sessionId, wsUrl]);

  const handleNewEvent = (event: TaskEvent, websocket: WebSocket) => {
    const newEventLog: TaskEventLog = {
      id: crypto.randomUUID(),
      event,
      timestamp: new Date(),
    };

    setEvents((prev) => [...prev, newEventLog]);

    if (event.event_type === "complete" || event.event_type === "error") {
      websocket.close();
    }
  };

  return { events, isConnected };
};

export default useWebSocketPrimes;
