import { Layout, Typography, Button, Row, Col, Card } from "antd";
import {
  CalculatorOutlined,
  ReadOutlined,
  TrophyOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#3C3C3C",
          textAlign: "center",
          padding: "1rem 0",
        }}
      >
        <Title style={{ color: "white", margin: 0 }}>Math Tutor</Title>
      </Header>

      <Content
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <Title>Master Math with Ease</Title>
        <Paragraph style={{ fontSize: "18px" }}>
          Learn, Share, Practice
        </Paragraph>
        <Button type="primary" size="large">
          Get Started
        </Button>

        <Row
          gutter={16}
          style={{ marginTop: "50px", width: "100%", maxWidth: "900px" }}
          align="stretch"
          justify="center"
        >
          <Col xs={24} md={6}>
            <Card hoverable style={{ height: "100%", textAlign: "center" }}>
              <CalculatorOutlined
                style={{ fontSize: "40px", color: "#1890ff" }}
              />
              <Title level={3}>Explore interesting concepts</Title>
              <Paragraph>TODO add description</Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={6}>
            <Card hoverable style={{ height: "100%", textAlign: "center" }}>
              <ReadOutlined style={{ fontSize: "40px", color: "#52c41a" }} />
              <Title level={3}>Useful content</Title>
              <Paragraph>Learn from gathered resources</Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={6}>
            <Card hoverable style={{ height: "100%", textAlign: "center" }}>
              <TrophyOutlined style={{ fontSize: "40px", color: "#faad14" }} />
              <Title level={3}>Track Progress</Title>
              <Paragraph>Monitor your improvement</Paragraph>
            </Card>
          </Col>

          <Col xs={24} md={6}>
            <Card hoverable style={{ height: "100%", textAlign: "center" }}>
              <ShareAltOutlined
                style={{ fontSize: "40px", color: "#1890ff" }}
              />
              <Title level={3}>Share with Others</Title>
              <Paragraph>
                Help your friends by sharing, and learn from what others share
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Math Tutor ©{new Date().getFullYear()} | A mathematics community
      </Footer>
    </Layout>
  );
};

export default LandingPage;
