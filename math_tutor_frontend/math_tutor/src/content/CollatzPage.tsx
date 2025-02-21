import React, { useState } from "react";
import {
  Space,
  Typography,
  Row,
  Col,
  Empty,
  Form,
  InputNumber,
  Button,
  Card,
  Alert,
} from "antd";
import CollatzDisplay from "./components/CollatzDisplay";
import useFetchCollatz from "./hooks/useFetchCollatz";

const { Title } = Typography;

interface RangeForm {
  start: number;
  end: number;
}

const CollatzPage: React.FC = () => {
  const [form] = Form.useForm<RangeForm>();
  const [range, setRange] = useState<RangeForm | null>(null);

  const { data, isLoading, error } = useFetchCollatz(
    range?.start ?? 10,
    range?.end ?? 30,
  );

  const handleSubmit = (values: RangeForm) => {
    setRange(values);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={2}>Collatz Sequence Analysis</Title>

        <Card>
          <Form form={form} onFinish={handleSubmit} layout="inline">
            <Form.Item
              name="start"
              label="Start Number"
              rules={[
                { required: true, message: "Please input start number!" },
                { type: "number", min: 1, message: "Must be greater than 0!" },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="end"
              label="End Number"
              rules={[
                { required: true, message: "Please input end number!" },
                { type: "number", min: 1, message: "Must be greater than 0!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("start") < value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "End number must be greater than start number!",
                      ),
                    );
                  },
                }),
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Generate Sequences
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {error && (
          <Card>
            <Alert message="Error" description="error" type="error" showIcon />
          </Card>
        )}

        {range && !isLoading && (!data || data.length === 0) && (
          <Row justify="center" align="middle">
            <Col>
              <Empty description="No Collatz sequences available" />
            </Col>
          </Row>
        )}

        {data && data.length > 0 && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {data.map((collatzResponse, index) => (
              <div key={`${collatzResponse.start_number}-${index}`}>
                <Title level={4}>
                  Sequence for Starting Number: {collatzResponse.start_number}
                </Title>
                <CollatzDisplay data={collatzResponse} />
              </div>
            ))}
          </Space>
        )}
      </Space>
    </div>
  );
};

export default CollatzPage;
