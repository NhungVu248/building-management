import React from 'react';
import { Link, router } from '@inertiajs/react';
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Card,
  Badge,
} from 'react-bootstrap';

export default function Index({ contracts }) {
  const handleDelete = (id) => {
    if (confirm('Xóa hợp đồng này?')) {
      router.delete(`/contracts/${id}`);
    }
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Hiệu lực':
        return <Badge bg="success">Hiệu lực</Badge>;
      case 'Hết hạn':
        return <Badge bg="secondary">Hết hạn</Badge>;
      case 'Hủy':
        return <Badge bg="danger">Hủy</Badge>;
      default:
        return <Badge bg="light" text="dark">{status}</Badge>;
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={11} xl={10}>
            <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4 p-md-5">
                <Row className="align-items-center mb-4">
                  <Col>
                    <h2 className="mb-0 fw-bold">📄 Quản lý Hợp đồng</h2>
                  </Col>
                  <Col xs="auto">
                    <Link
                      href="/contracts/create"
                      className="btn btn-primary" 
                    >
                      ➕ Tạo Hợp đồng
                    </Link>
                  </Col>
                </Row>

                <Table hover responsive className="align-middle">
                  <thead>
                    <tr>
                      <th>Mã HĐ</th>
                      <th>Căn hộ</th>
                      <th>Khách thuê</th>
                      <th>Loại</th>
                      <th>Giá trị (VNĐ)</th>
                      <th className="text-center">Trạng thái</th>
                      <th className="text-end">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((c) => (
                      <tr key={c.id}>
                        <td className="fw-bold">{c.contract_code}</td>
                        <td>{c.apartment?.code}</td>
                        <td>{c.tenant_name}</td>
                        <td>{c.type}</td>
                        <td>{c.value.toLocaleString()}</td>
                        <td className="text-center">
                          {getStatusBadge(c.status)}
                        </td>
                        <td className="text-end">
                          <Link
                            href={`/contracts/${c.id}/edit`}
                            className="btn btn-warning btn-sm me-2"
                          >
                            ✏️
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(c.id)}
                          >
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}