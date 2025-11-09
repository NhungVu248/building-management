import React, { useEffect, useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import { Container, Row, Col, Form, Table, Button, Card } from "react-bootstrap";
import ItemForm from "./ItemForm";

export default function EditInvoice({ invoice, feeTypes, apartments }) {
  const [subtotal, setSubtotal] = useState(0);
  const { data, setData, put, processing } = useForm({
    billing_period: invoice.billing_period,
    discount: invoice.discount,
    status: invoice.status,
    items: invoice.items.map((it) => ({
      id: it.id,
      fee_type_id: it.fee_type_id,
      description: it.description,
      qty: it.qty,
      unit_price: it.unit_price,
    })),
  });

  // Tính tổng tiền client-side
  useEffect(() => {
    const total = data.items.reduce(
      (sum, it) => sum + parseFloat(it.qty || 0) * parseFloat(it.unit_price || 0),
      0
    );
    setSubtotal(total);
  }, [data.items]);

  const addItem = () =>
    setData("items", [
      ...data.items,
      { id: null, fee_type_id: "", description: "", qty: 1, unit_price: 0 },
    ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route("invoices.update", invoice.id));
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h4>✏️ Sửa hóa đơn #{invoice.code}</h4>
        </Col>
        <Col className="text-end">
          <Link href={route("invoices.show", invoice.id)} className="btn btn-secondary">
            ← Quay lại
          </Link>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Căn hộ</Form.Label>
                <Form.Control readOnly value={invoice.apartment?.id ?? ""} />
              </Col>
              <Col md={4}>
                <Form.Label>Kỳ hóa đơn</Form.Label>
                <Form.Control
                  type="date"
                  value={data.billing_period}
                  onChange={(e) => setData("billing_period", e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="issued">Đã phát hành</option>
                  <option value="partial">Đã thanh toán một phần</option>
                  <option value="paid">Đã thanh toán</option>
                  <option value="overdue">Quá hạn</option>
                </Form.Select>
              </Col>
            </Row>

            <h5 className="mt-3">Danh mục phí</h5>
            <Table bordered size="sm">
              <thead>
                <tr>
                  <th>Loại phí</th>
                  <th>Mô tả</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
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
                    onRemove={(i) =>
                      setData(
                        "items",
                        data.items.filter((_, j) => j !== i)
                      )
                    }
                  />
                ))}
              </tbody>
            </Table>
            <Button variant="outline-primary" onClick={addItem}>
              + Thêm dòng
            </Button>

            <Row className="mt-3">
              <Col md={4}>
                <Form.Label>Giảm giá</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={data.discount}
                  onChange={(e) => setData("discount", e.target.value)}
                />
              </Col>
              <Col md={4} className="d-flex align-items-end">
                <div>
                  <b>Tạm tính:</b> {subtotal.toLocaleString()} ₫
                </div>
              </Col>
            </Row>

            <div className="mt-4">
              <Button type="submit" disabled={processing}>
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
