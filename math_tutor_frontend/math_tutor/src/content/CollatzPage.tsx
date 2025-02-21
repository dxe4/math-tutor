import React from "react";
import { Row, Col, Space, Typography, Empty } from "antd";
import useFetchCollatz from "./hooks/useFetchCollatz";
import CollatzDisplay from "./components/CollatzDisplay";

const { Title } = Typography;

const CollatsPage: React.FC = () => {
  const { data, isLoading, error } = useFetchCollatz(20, 30);

  if (isLoading) {
    return <div> error </div>;
  }

  if (error) {
    return <div> error </div>;
  }

  if (!data || data.length === 0) {
    return (
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col>
          <Empty description="No Collatz sequences available" />
        </Col>
      </Row>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={2}>Collatz Sequence Analysis</Title>

        {data.map((collatzResponse, index) => (
          <div key={`${collatzResponse.start_number}-${index}`}>
            <Title level={4}>
              Sequence for Starting Number: {collatzResponse.start_number}
            </Title>
            <CollatzDisplay data={collatzResponse} />
          </div>
        ))}
      </Space>
    </div>
  );
};

export default CollatsPage;
