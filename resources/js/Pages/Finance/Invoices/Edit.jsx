import React, { useEffect, useState } from "react";
import { useForm, Link } from "@inertiajs/react";
// Import thêm Spinner
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Button,
  Card,
  Spinner, // <-- Thêm Spinner
} from "react-bootstrap";
import ItemForm from "./ItemForm";

export default function EditInvoice({ invoice, feeTypes, apartments }) {
  // --- LOGIC GỐC CỦA BẠN (GIỮ NGUYÊN) ---
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
  const total = subtotal - parseFloat(data.discount || 0);

  return (
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} xl={9}>
            <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4 p-md-5">
                <Row className="align-items-center mb-4">
                  <Col>
                    <h2 className="mb-0 fw-bold">
                      ✏️ Sửa hóa đơn #{invoice.code}
                    </h2>
                  </Col>
                  <Col xs="auto">
                    <Link
                      href={route("invoices.show", invoice.id)}
                      className="btn btn-secondary"
                    >
                      ← Quay lại
                    </Link>
                  </Col>
                </Row>

                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Label>Căn hộ</Form.Label>
                      <Form.Control
                        readOnly
                        value={`${invoice.apartment?.id ?? "N/A"} - ${invoice.apartment?.name ?? ""}`}
                        className="bg-white" 
                      />
                    </Col>
                    <Col md={4}>
                      <Form.Label>Kỳ hóa đơn</Form.Label>
                      <Form.Control
                        type="date"
                        value={data.billing_period}
                        onChange={(e) =>
                          setData("billing_period", e.target.value)
                        }
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

                  <h5 className="mt-4 mb-3 fw-bold">Danh mục phí</h5>
                  <Table hover responsive className="align-middle">
                    <thead>
                      <tr>
                        <th>Loại phí</th>
                        <th>Mô tả</th>
                        <th>Số lượng</th>
                        <th className="text-end">Đơn giá</th>
                        <th className="text-end">Thành tiền</th>
                        <th className="text-end"></th>
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
                          showLineTotal={true} 
                        />
                      ))}
                      {data.items.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center text-muted py-3">
                            Chưa có mục phí nào.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  <Button
                    variant="outline-primary"
                    onClick={addItem}
                    className="mt-2"
                  >
                    + Thêm dòng
                  </Button>
                  <Row className="mt-4 justify-content-end">
                    <Col md={6} lg={5}>
                      <Form.Label>Giảm giá</Form.Label>
                      <Form.Control
                        type="number"
                        step="1000"
                        placeholder="Nhập số tiền giảm giá"
                        value={data.discount}
                        onChange={(e) => setData("discount", e.target.value)}
                        className="text-end"
                      />
                    </Col>
                    <Col md={6} lg={4} className="text-end mt-3 mt-md-0">
                      <div className="mb-2">
                        <span>Tạm tính:</span>
                        <strong className="ms-3 fs-5">
                          {subtotal.toLocaleString()} ₫
                        </strong>
                      </div>
                      <div className="mb-2">
                        <span>Giảm giá:</span>
                        <strong className="ms-3 fs-5 text-danger">
                          - {parseFloat(data.discount || 0).toLocaleString()} ₫
                        </strong>
                      </div>
                      <hr className="my-2" />
                      <div className="mb-2">
                        <strong className="text-primary fs-5">Tổng cộng:</strong>
                        <strong className="ms-3 fs-4 text-primary">
                          {total.toLocaleString()} ₫
                        </strong>
                      </div>
                    </Col>
                  </Row>
                  <div className="d-grid mt-5">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Đang cập nhật...
                        </>
                      ) : (
                        "Lưu thay đổi"
                      )}
                    </Button>
                  </div>
                </Form>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
