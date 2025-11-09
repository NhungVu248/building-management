import React from 'react';
import { router } from '@inertiajs/react';
import { Form, Button, Container } from 'react-bootstrap';

export default function Edit({ contract, apartments }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    router.put(`/contracts/${contract.id}`, data);
  };

  return (
    <Container className="mt-4">
      <h2>✏️ Chỉnh sửa Hợp đồng {contract.contract_code}</h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Căn hộ</Form.Label>
          <Form.Select name="apartment_id" defaultValue={contract.apartment_id}>
            {apartments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Người thuê</Form.Label>
          <Form.Control
            name="tenant_name"
            defaultValue={contract.tenant_name}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Giá trị (VNĐ)</Form.Label>
          <Form.Control
            type="number"
            name="value"
            defaultValue={contract.value}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select name="status" defaultValue={contract.status}>
            <option>Hiệu lực</option>
            <option>Hết hạn</option>
            <option>Hủy</option>
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">
          ✅ Cập nhật
        </Button>
      </Form>
    </Container>
  );
}
