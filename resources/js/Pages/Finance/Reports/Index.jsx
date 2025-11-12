import React from "react";
import { Card, Table, Container, Row, Col, Badge } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const formatCurrency = (num) => (num || 0).toLocaleString("vi-VN") + " ₫";

export default function FinanceReports({
  totalIncome,
  totalDebt,
  invoiceCount,
  monthlyRevenue,
}) {
  const chartData = monthlyRevenue.map((item) => ({
    name: `Tháng ${item.month}`,
    total: parseFloat(item.total),
  }));

  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <h2 className="mb-4 fw-bold">📊 Báo cáo tài chính</h2>
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <Card
              className="shadow-sm border-0"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body className="p-4">
                <Card.Title className="text-muted">Tổng thu</Card.Title>
                <Card.Text className="h3 fw-bold text-success">
                  {formatCurrency(totalIncome)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-3 mb-md-0">
            <Card
              className="shadow-sm border-0"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body className="p-4">
                <Card.Title className="text-muted">Tổng công nợ</Card.Title>
                <Card.Text className="h3 fw-bold text-danger">
                  {formatCurrency(totalDebt)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="shadow-sm border-0"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body className="p-4">
                <Card.Title className="text-muted">Tổng hóa đơn</Card.Title>
                <Card.Text className="h3 fw-bold text-primary">
                  {invoiceCount.total}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={4} className="mb-4 mb-lg-0">
            <Card
              className="shadow-sm border-0 h-100"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body className="p-4">
                <h5 className="mb-3 fw-bold">Thống kê hóa đơn</h5>
                <Table hover responsive className="align-middle">
                  <thead>
                    <tr>
                      <th>Trạng thái</th>
                      <th className="text-end">Số lượng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Badge bg="success" bg-opacity-10 text="success">
                          Đã thanh toán
                        </Badge>
                      </td>
                      <td className="text-end fw-bold">
                        {invoiceCount.paid}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Badge bg="warning" bg-opacity-10 text="warning">
                          Chưa thanh toán
                        </Badge>
                      </td>
                      <td className="text-end fw-bold">
                        {invoiceCount.unpaid}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Badge bg="danger" bg-opacity-10 text="danger">
                          Quá hạn
                        </Badge>
                      </td>
                      <td className="text-end fw-bold">
                        {invoiceCount.overdue}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card
              className="shadow-sm border-0"
              style={{ borderRadius: "15px" }}
            >
              <Card.Body className="p-4">
                <h5 className="mb-3 fw-bold">
                  Doanh thu theo tháng ({new Date().getFullYear()})
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) =>
                        new Intl.NumberFormat("vi-VN").format(value)
                      }
                    />
                    <Tooltip
                      formatter={(value) => [
                        formatCurrency(value),
                        "Doanh thu",
                      ]}
                    />
                    <Legend />
                    <Bar
                      dataKey="total"
                      fill="#82ca9d"
                      name="Doanh thu"
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
