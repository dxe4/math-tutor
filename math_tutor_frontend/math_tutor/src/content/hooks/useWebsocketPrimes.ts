import { useState, useRef, useEffect } from "react";
import { TaskEvent, TaskEventLog } from "../../types/apiTypes";

interface UseWebSocketProps {
  sessionId: string | null;
  wsUrl: string;
}

const useWebSocketPrimes = ({ sessionId, wsUrl }: UseWebSocketProps) => {
  const [events, setEvents] = useState<TaskEventLog[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setIsConnected(false);
      return;
    }

    const ws = new WebSocket(`${wsUrl}${sessionId}/`);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event: MessageEvent) => {
      const data: TaskEvent = JSON.parse(event.data);
      handleNewEvent(data);
    };

    ws.onclose = () => {
      console.log("closed");
      setIsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [sessionId, wsUrl]);

  const handleNewEvent = (event: TaskEvent) => {
    const newEventLog: TaskEventLog = {
      id: crypto.randomUUID(),
      event,
      timestamp: new Date(),
    };

    setEvents((prev) => [...prev, newEventLog]);

    if (event.event_type === "complete" || event.event_type === "error") {
      wsRef.current?.close();
    }
  };

  return { events, isConnected };
};

export default useWebSocketPrimes;
