import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Table, Button, Container } from 'react-bootstrap';

export default function Index({ contracts }) {
  const handleDelete = (id) => {
    if (confirm('Xóa hợp đồng này?')) {
      router.delete(`/contracts/${id}`);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">📄 Quản lý Hợp đồng</h2>
      <Link href="/contracts/create" className="btn btn-primary mb-3">
        ➕ Tạo Hợp đồng
      </Link>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="table-dark text-center">
            <th>Mã HĐ</th>
            <th>Căn hộ</th>
            <th>Khách thuê</th>
            <th>Loại</th>
            <th>Giá trị (VNĐ)</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c) => (
            <tr key={c.id} className="text-center">
              <td>{c.contract_code}</td>
              <td>{c.apartment?.code}</td>
              <td>{c.tenant_name}</td>
              <td>{c.type}</td>
              <td>{c.value.toLocaleString()}</td>
              <td>{c.status}</td>
              <td>
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
    </Container>
  );
}
