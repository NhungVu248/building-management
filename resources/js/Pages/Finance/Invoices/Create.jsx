import React from "react";
import { useForm, Link } from "@inertiajs/react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
  Spinner,
} from "react-bootstrap";
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
    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} xl={9}>
            <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4 p-md-5">
                <Row className="align-items-center mb-4">
                  <Col>
                    <h2 className="mb-0 fw-bold">Tạo hóa đơn mới</h2>
                  </Col>
                  <Col xs="auto">
                    <Link
                      href={route("invoices.index")}
                      className="btn btn-secondary"
                    >
                      ← Danh sách
                    </Link>
                  </Col>
                </Row>
                <Form onSubmit={submit}>
                  <Row className="mb-3">
                    <Col md={6}>
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
                    <Col md={6}>
                      <Form.Label>Kỳ hóa đơn</Form.Label>
                      <Form.Control
                        type="date"
                        value={data.billing_period}
                        onChange={(e) =>
                          setData("billing_period", e.target.value)
                        }
                        required
                      />
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
                          onRemove={(i) => {
                            setData(
                              "items",
                              data.items.filter((_, j) => j !== i)
                            );
                          }}
                        />
                      ))}
                      {data.items.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center text-muted py-3">
                            Chưa có mục phí nào. Bấm "+ Thêm dòng" để bắt đầu.
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
                          Đang lưu...
                        </>
                      ) : (
                        "Lưu hóa đơn"
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
