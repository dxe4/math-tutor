import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Row, Col, Statistic, Divider, Typography, Space } from "antd";
import { CollatzResponse } from "../../types/apiTypes";

const { Title, Text } = Typography;

interface CollatzDisplayProps {
  data: CollatzResponse;
}

const CollatzDisplay: React.FC<CollatzDisplayProps> = ({ data }) => {
  const sequenceOptions = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        return `Step ${params[0].dataIndex + 1}: ${params[0].value}`;
      },
    },
    xAxis: {
      type: "category",
      data: data.sequence.map((_, index) => index + 1),
      name: "Step",
    },
    yAxis: {
      type: "value",
      name: "Value",
    },
    series: [
      {
        name: "Sequence",
        data: data.sequence.map(Number),
        type: "line",
        smooth: true,
        lineStyle: {
          width: 2,
          color: "#1890ff",
        },
        symbol: "circle",
        symbolSize: 6,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(24,144,255,0.2)",
              },
              {
                offset: 1,
                color: "rgba(24,144,255,0)",
              },
            ],
          },
        },
      },
    ],
  };

  const twoAdicOptions = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const index = params[0].dataIndex;
        return `Step ${index + 1}: ${data.two_adic_distance_sequence[index]}`;
      },
    },
    xAxis: {
      type: "category",
      data: data.two_adic_distance_sequence.map((_, index) => index + 1),
      name: "Step",
    },
    yAxis: {
      type: "value",
      name: "Value",
    },
    series: [
      {
        name: "Two-Adic Distance",
        data: data.two_adic_distance_sequence.map((rational) => {
          const [numerator, denominator] = rational.split("/").map(Number);
          return numerator / denominator;
        }),
        type: "line",
        smooth: true,
        lineStyle: {
          width: 2,
          color: "#52c41a",
        },
        symbol: "circle",
        symbolSize: 6,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(82,196,26,0.2)",
              },
              {
                offset: 1,
                color: "rgba(82,196,26,0)",
              },
            ],
          },
        },
      },
    ],
  };
  const cumulativeTwoAdic = data.two_adic_distance_sequence.reduce(
    (acc: number[], rational) => {
      const [numerator, denominator] = rational.split("/").map(Number);
      const value = numerator / denominator;
      const lastValue = acc.length > 0 ? acc[acc.length - 1] : 0;
      acc.push(lastValue + value);
      return acc;
    },
    [],
  );

  const cumulativeTwoAdicOptions = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const index = params[0].dataIndex;
        return `Step ${index + 1}<br/>Cumulative: ${params[0].value.toFixed(6)}`;
      },
    },
    xAxis: {
      type: "category",
      data: cumulativeTwoAdic.map((_, index) => index + 1),
      name: "Step",
    },
    yAxis: {
      type: "value",
      name: "Cumulative Value",
    },
    series: [
      {
        name: "Cumulative Two-Adic Distance",
        data: cumulativeTwoAdic,
        type: "line",
        smooth: true,
        lineStyle: {
          width: 2,
          color: "#722ed1",
        },
        symbol: "circle",
        symbolSize: 6,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(114,46,209,0.2)",
              },
              {
                offset: 1,
                color: "rgba(114,46,209,0)",
              },
            ],
          },
        },
      },
    ],
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Starting Number"
              value={data.start_number}
              precision={0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Distance"
              value={data.total_distance}
              precision={0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Two-Adic Total Distance"
              value={data.two_adic_total_distance}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="Collatz Sequence">
            <ReactECharts
              option={sequenceOptions}
              style={{ height: "400px" }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Two-Adic Distance Sequence">
            <ReactECharts option={twoAdicOptions} style={{ height: "400px" }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Cumulative Two-Adic Distance">
            <ReactECharts
              option={cumulativeTwoAdicOptions}
              style={{ height: "400px" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card>
            <Title level={5}>Sequence Values</Title>
            <Text copyable>{data.sequence.join(", ")}</Text>
            <Divider />
            <Title level={5}>Two-Adic Distance Values</Title>
            <Text copyable>{data.two_adic_distance_sequence.join(", ")}</Text>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default CollatzDisplay;
