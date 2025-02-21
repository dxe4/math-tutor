import React from "react";
import { Card, Space, Typography } from "antd";
import YouTube from "react-youtube";
import type { PowerOfTwoConvergenceResponse } from "../../types/apiTypes";

const { Title, Text } = Typography;
const MAX_DIGITS = 50;

const digitColors: Record<string, string> = {
  "0": "rgba(255, 0, 0, 0.8)",
  "1": "rgba(255, 127, 0, 0.8)",
  "2": "rgba(255, 255, 0, 0.8)",
  "3": "rgba(127, 255, 0, 0.8)",
  "4": "rgba(0, 255, 0, 0.8)",
  "5": "rgba(0, 255, 127, 0.8)",
  "6": "rgba(0, 255, 255, 0.8)",
  "7": "rgba(0, 127, 255, 0.8)",
  "8": "rgba(0, 0, 255, 0.8)",
  "9": "rgba(127, 0, 255, 0.8)",
};

const ColorBox = ({
  digit,
  size = "16px",
}: {
  digit: string;
  size?: string;
}) => (
  <div
    style={{
      width: size,
      height: size,
      backgroundColor: digit === " " ? "transparent" : digitColors[digit],
      border: "1px solid #d9d9d9",
      borderRadius: "1px",
    }}
  />
);

interface NumberVisualizerProps {
  data: PowerOfTwoConvergenceResponse | null;
  isLoading: boolean;
  error: string | null;
}

const NumberVisualizer: React.FC<NumberVisualizerProps> = ({
  data,
  isLoading,
  error,
}) => {
  if (!data) {
    return <div>loading</div>;
  }

  const processedNumbers = data.powers.map((num) => num.slice(0, MAX_DIGITS));
  const maxLength = Math.min(
    MAX_DIGITS,
    Math.max(...processedNumbers.map((num) => num.length)),
  );

  const legendItems = Object.entries(digitColors).map(([digit, color]) => (
    <Space key={digit} align="center">
      <ColorBox digit={digit} size="24px" />
      <span>Digit {digit}</span>
    </Space>
  ));

  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: "20px",
        }}
      >
        <Title level={4}>Power of 2 convergence (scroll down)</Title>
        <Card style={{ width: "100%" }}>
          <Space wrap style={{ justifyContent: "center", width: "100%" }}>
            {legendItems}
          </Space>
        </Card>

        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Card
            title=" Something Strange Happens When You Keep Squaring "
            style={{
              flex: "1",
              minWidth: "300px",
              maxWidth: "400px",
            }}
          >
            <YouTube
              videoId="tRaq4aYPzCc"
              opts={{
                height: "200",
                width: "100%",
                playerVars: {
                  autoplay: 0,
                },
              }}
              onError={(error) => console.error("YouTube Error:", error)}
            />
          </Card>
          <Card
            title=" 1 Billion is Tiny in an Alternate Universe: Introduction to p-adic Numbers "
            style={{
              flex: "1",
              minWidth: "300px",
              maxWidth: "400px",
            }}
          >
            <YouTube
              videoId="3gyHKCDq1YA"
              opts={{
                height: "200",
                width: "100%",
                playerVars: {
                  autoplay: 0,
                },
              }}
              onError={(error) => console.error("YouTube Error:", error)}
            />
          </Card>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            {processedNumbers.map((num, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                  gap: "16px",
                }}
              >
                <Text style={{ minWidth: "120px", textAlign: "right" }}>
                  2^(10^{rowIndex})
                </Text>
                <Space>
                  {Array.from(num.padEnd(maxLength, " ")).map(
                    (digit, colIndex) => (
                      <ColorBox key={colIndex} digit={digit} />
                    ),
                  )}
                </Space>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NumberVisualizer;
