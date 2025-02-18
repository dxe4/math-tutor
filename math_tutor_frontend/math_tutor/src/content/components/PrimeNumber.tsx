import React, { useState } from "react";
import {
  Card,
  List,
  Typography,
  Button,
  Form,
  InputNumber,
  Row,
  Col,
  Image,
} from "antd";
import { TaskEvent } from "../../types/apiTypes";
import useWebsocketPrimes from "../hooks/useWebsocketPrimes";
import apiService from "../../services/api";

const { Text, Title } = Typography;

interface TaskStatusProps {
  wsUrl: string;
}

interface BookMetadata {
  title: string;
  author: string;
  imageUrl: string;
  goodreadsUrl: string;
  description: string;
}

const bookData: BookMetadata = {
  title: "Prime Numbers: A Computational Perspective",
  author: "Richard Crandall, Carl Pomerance",
  imageUrl:
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1347792068i/765887.jpg",
  goodreadsUrl: "https://www.goodreads.com/book/show/765887.Prime_Numbers",
  description:
    "Bridges the gap between theoretical and computational aspects of prime numbers Exercise sections are a goldmine of interesting examples, pointers to the literature and potential research projects Authors are well-known and highly-regarded in the field",
};

const TaskStatus: React.FC<TaskStatusProps> = ({ wsUrl }) => {
  const [form] = Form.useForm();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { events, isConnected } = useWebsocketPrimes({ sessionId, wsUrl });

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
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <Row gutter={[24, 24]} align="stretch">
        <Col xs={24} md={12}>
          {" "}
          <Card
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            cover={
              <a
                href={bookData.goodreadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#f0f0f0",
                  padding: "16px",
                }}
              >
                <Image
                  alt={bookData.title}
                  src={bookData.imageUrl}
                  style={{
                    maxHeight: "300px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </a>
            }
          >
            <Card.Meta
              title={
                <a
                  href={bookData.goodreadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit" }}
                >
                  <Title level={4}>{bookData.title}</Title>
                </a>
              }
              description={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Text strong>By {bookData.author}</Text>
                  <Text type="secondary">{bookData.description}</Text>
                  <a
                    href={bookData.goodreadsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: "8px" }}
                  >
                    View on Goodreads
                  </a>
                </div>
              }
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          {" "}
          <Card
            title="Prime Number Checker"
            style={{ height: "100%" }}
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
                rules={[
                  { required: true, message: "Please input start number!" },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
              <Form.Item
                name="end"
                label="End"
                rules={[
                  { required: true, message: "Please input end number!" },
                ]}
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

            <div
              style={{
                height: 400,
                overflow: "auto",
                scrollBehavior: "smooth",
              }}
            >
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
        </Col>
      </Row>
    </div>
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
