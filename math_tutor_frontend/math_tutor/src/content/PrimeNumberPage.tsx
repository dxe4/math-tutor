import { Layout, Typography } from "antd";
import TaskStatus from "./components/PrimeNumber";
import config from "../config/config";

const { Content } = Layout;
const { Title } = Typography;

const PrimeNumberPage: React.FC = () => {
  const wsUrl = `${config.WS_URL}/primes/`;

  return (
    <Layout>
      <Content style={{ padding: "24px" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Prime Number Checker
        </Title>
        <TaskStatus wsUrl={wsUrl} />
      </Content>
    </Layout>
  );
};

export default PrimeNumberPage;
