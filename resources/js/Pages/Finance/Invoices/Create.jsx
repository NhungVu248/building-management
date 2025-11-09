import React from "react";
import { useForm, Link } from "@inertiajs/react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import ItemForm from "./ItemForm";

export default function CreateInvoice({ apartments, feeTypes }) {
  const { data, setData, post, processing } = useForm({
    apartment_id: "",
    resident_id: "",
    billing_period: new Date().toISOString().slice(0, 10),
    items: [],
  });

  const addItem = () =>
    setData("items", [
      ...data.items,
      { fee_type_id: "", description: "", qty: 1, unit_price: 0 },
    ]);

  const submit = (e) => {
    e.preventDefault();
    post(route("invoices.store"));
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h4>Tạo hóa đơn mới</h4>
        </Col>
        <Col className="text-end">
          <Link href={route("invoices.index")} className="btn btn-secondary">
            ← Danh sách
          </Link>
        </Col>
      </Row>

      <Form onSubmit={submit}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>Căn hộ</Form.Label>
            <Form.Select
              value={data.apartment_id}
              onChange={(e) => setData("apartment_id", e.target.value)}
              required
            >
              <option value="">-- Chọn căn hộ --</option>
              {apartments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} - {a.name ?? ""}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Label>Kỳ hóa đơn</Form.Label>
            <Form.Control
              type="date"
              value={data.billing_period}
              onChange={(e) => setData("billing_period", e.target.value)}
              required
            />
          </Col>
        </Row>

        <h5>Danh mục phí</h5>
        <Table bordered>
          <thead>
            <tr>
              <th>Loại phí</th>
              <th>Mô tả</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, idx) => (
              <ItemForm
                key={idx}
                index={idx}
                item={item}
                feeTypes={feeTypes}
                onChange={(i, val) => {
                  const items = [...data.items];
                  items[i] = val;
                  setData("items", items);
                }}
                onRemove={(i) => {
                  setData("items", data.items.filter((_, j) => j !== i));
                }}
              />
            ))}
          </tbody>
        </Table>
        <Button variant="outline-primary" onClick={addItem}>
          + Thêm dòng
        </Button>

        <div className="mt-4">
          <Button type="submit" disabled={processing}>
            Lưu hóa đơn
          </Button>
        </div>
      </Form>
    </Container>
  );
}
