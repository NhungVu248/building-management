import React from 'react';
import { Card, Table, Container, Row, Col } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function FinanceReports({ totalIncome, totalDebt, invoiceCount, monthlyRevenue }) {
  // Chuyển đổi dữ liệu chart
  const chartData = monthlyRevenue.map((item) => ({
    name: `Tháng ${item.month}`,
    total: parseFloat(item.total),
  }));

  return (
    <Container className="mt-4">
      <h2 className="mb-4">📊 Báo cáo tài chính</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Tổng thu</Card.Title>
              <Card.Text className="h4 text-success">
                {totalIncome.toLocaleString()} VNĐ
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Tổng công nợ</Card.Title>
              <Card.Text className="h4 text-danger">
                {totalDebt.toLocaleString()} VNĐ
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Tổng hóa đơn</Card.Title>
              <Card.Text className="h4 text-primary">
                {invoiceCount.total} hóa đơn
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm mb-4">
        <Card.Header>Thống kê hóa đơn</Card.Header>
        <Card.Body>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Trạng thái</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Đã thanh toán</td>
                <td className="text-success fw-bold">{invoiceCount.paid}</td>
              </tr>
              <tr>
                <td>Chưa thanh toán</td>
                <td className="text-warning fw-bold">{invoiceCount.unpaid}</td>
              </tr>
              <tr>
                <td>Quá hạn</td>
                <td className="text-danger fw-bold">{invoiceCount.overdue}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header>Doanh thu theo tháng ({new Date().getFullYear()})</Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#82ca9d" name="Doanh thu (VNĐ)" />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Container>
  );
}
