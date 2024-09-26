import { Card, Col, Row, Space, Statistic } from "antd";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashData } from "../Redux/Thunks/adminDashApi";
import styles from "../Styles/admindashboard.module.css";
function AdminDashboard() {
  const chartData = useSelector((state) => state.dashboardDataSlice.chartData);
  const cardData = useSelector((state) => state.dashboardDataSlice.cardData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashData());
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels: chartData.map((item) => item.month_name),
    datasets: [
      {
        label: "Employee",
        data: chartData.map((item) => item.totalEmpContDollar),
        backgroundColor: "#58c9ec75",
      },
      {
        label: "Company",
        data: chartData.map((item) => item.totalCompanyContDollar),
        backgroundColor: "#58C9EC",
      },
    ],
  };
  return (
    <>
      <div className={styles.main}>
        <Row gutter={[12, 20]}>
          <Col lg={6} xl={6} md={12} sm={24} xs={24}>
            <DashboardCard
              title="Subscribed Employees"
              value={cardData.subscribed}
            />
          </Col>
          <Col lg={6} xl={6} md={12} sm={24} xs={24}>
            <DashboardCard title="Lunch" value={cardData.lunch} />
          </Col>
          <Col lg={6} xl={6} md={12} sm={24} xs={24}>
            <DashboardCard title="Dinner" value={cardData.dinner} />
          </Col>
          <Col lg={6} xl={6} md={12} sm={24} xs={24}>
            <DashboardCard
              title="Price/Meal"
              value={cardData.singleMealPrice}
            />
          </Col>
        </Row>
        <div className={styles.Cards}></div>

        <div className={styles.chart}>
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Bar
                options={options}
                data={data}
                style={{ maxHeight: "65vh" }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

function DashboardCard({ title, value }) {
  const titlestyle = {
    fontSize: "14px",
    color: "#343434",
    fontWeight: "bolder",
  };

  const valueStyle = {
    fontSize: "30px",
    color: "#232323",
  };
  return (
    <>
      <Card className={styles.DashCard}>
        <Space direction="horizontal">
          <Statistic
            title={<span style={titlestyle}>{title}</span>}
            value={value}
            valueStyle={valueStyle}
          />
        </Space>
      </Card>
    </>
  );
}

export default AdminDashboard;
