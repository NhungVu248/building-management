import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';

export default function Index({ feeTypes }) {
  const { delete: destroy } = useForm();

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa loại phí này?')) {
      destroy(route('fee-types.destroy', id));
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
                    <h2 className="mb-0 fw-bold">💰 Quản lý loại phí</h2>
                  </Col>
                  <Col xs="auto">

                    <Link
                      href={route('fee-types.create')}
                      className="btn btn-primary"
                    >
                      + Thêm loại phí
                    </Link>
                  </Col>
                </Row>

                <Table hover responsive className="align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên loại phí</th>
                      <th className="text-end">Số tiền mặc định</th>
                      <th>Mô tả</th>
                      <th className="text-end">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeTypes.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center text-muted py-3">
                          Chưa có loại phí nào.
                        </td>
                      </tr>
                    )}
                    
                    {feeTypes.map((ft) => (
                      <tr key={ft.id}>
                        <td className="fw-bold">{ft.id}</td>
                        <td>{ft.name}</td>
                        <td className="text-end">
                          {ft.default_amount.toLocaleString()} VNĐ
                        </td>
                        <td>{ft.description ?? '—'}</td>
                        <td className="text-end">
                          <Link
                            href={route('fee-types.edit', ft.id)}
                            className="btn btn-warning btn-sm me-2"
                          >
                            ✏️
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(ft.id)} 
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
