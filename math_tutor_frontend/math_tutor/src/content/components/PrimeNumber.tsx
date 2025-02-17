import React, { useRef, useState } from "react";
import { Card, List, Typography, Button, Form, InputNumber } from "antd";
import { TaskEvent } from "../../types/apiTypes";
import useWebsocketPrimes from "../hooks/useWebsocketPrimes";
import apiService from "../../services/api";

const { Text } = Typography;

interface TaskStatusProps {
  wsUrl: string;
}

const TaskStatus: React.FC<TaskStatusProps> = ({ wsUrl }) => {
  const [form] = Form.useForm();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { events, isConnected } = useWebsocketPrimes({ sessionId, wsUrl });
  const listRef = useRef<HTMLDivElement>(null);

  const handleStartCheck = async () => {
    const values = await form.validateFields();
    const { start, end } = values;

    const { data, isLoading, error } = await apiService.fetchPrimes(start, end);
    console.log(data);
    if (data?.session_id) {
      setSessionId(data.session_id);
    }
  };

  return (
    <Card
      title="Prime Number Checker"
      style={{ maxWidth: 600, margin: "20px auto" }}
      extra={
        <Text type="secondary">
          {isConnected ? "Connected" : "Disconnected"}
        </Text>
      }
    >
      <Form form={form} layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item
          name="start"
          label="Start"
          rules={[{ required: true, message: "Please input start number!" }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="end"
          label="End"
          rules={[{ required: true, message: "Please input end number!" }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleStartCheck}
            loading={isLoading}
            disabled={isConnected}
          >
            Start Check
          </Button>
        </Form.Item>
      </Form>

      <div ref={listRef} style={{ height: 400, overflow: "auto" }}>
        <List
          itemLayout="horizontal"
          dataSource={events}
          renderItem={({ id, event, timestamp }) => (
            <List.Item key={id}>
              <List.Item.Meta
                title={
                  <Text type="secondary" style={{ fontSize: "0.8em" }}>
                    {timestamp.toLocaleTimeString()}
                  </Text>
                }
                description={renderEventContent(event)}
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

const renderEventContent = (event: TaskEvent): React.ReactNode => {
  switch (event.event_type) {
    case "status":
      return "Checking number...";
    case "progress":
      return (
        <Text>
          Number <Text strong>{event.result?.number}</Text> is
          <Text type={event.result?.is_prime ? "success" : "warning"} strong>
            {event.result?.is_prime ? " prime" : " not prime"}
          </Text>
        </Text>
      );
    case "error":
      return <Text type="danger">Error occurred during processing</Text>;
    default:
      return "";
  }
};

export default TaskStatus;
