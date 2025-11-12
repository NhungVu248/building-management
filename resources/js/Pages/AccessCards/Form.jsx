import React from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

export default function AccessCardForm() {
  const { item } = usePage().props;
  const { data, setData, post, put, processing, errors } = useForm({
    code: item?.code || "",
    holder_name: item?.holder_name || "",
    type: item?.type || "resident",
    status: item?.status || "active",
    valid_from: item?.valid_from || "",
    valid_to: item?.valid_to || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item) put(route("access-cards.update", item.id));
    else post(route("access-cards.store"));
  };

  return (
    <div style={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}>
      {/* 🏙️ Hero Banner */}
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
          padding: "80px 20px",
          color: "white",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h1 className="fw-bold mb-2">
          {item ? "Cập Nhật Thẻ Ra Vào" : "Thêm Thẻ Ra Vào Mới"}
        </h1>
        <p className="lead mb-0">
          Quản lý thẻ ra vào cho cư dân, khách và nhân viên dễ dàng và chuyên
          nghiệp
        </p>
      </div>

      {/* 📋 Form Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card
              className="shadow-lg border-0 rounded-4"
              style={{ backgroundColor: "#ffffff" }}
            >
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-dark mb-2">
                    {item ? "📝 Cập nhật thông tin thẻ" : "💳 Thêm thẻ mới"}
                  </h2>
                  <p className="text-muted">
                    Nhập thông tin chi tiết của thẻ ra vào dưới đây
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-secondary">
                          Mã thẻ
                        </Form.Label>
                        <Form.Control
                          value={data.code}
                          onChange={(e) => setData("code", e.target.value)}
                          required
                          placeholder="VD: CARD-00123"
                          className="rounded-3 py-2 border-0 shadow-sm bg-light"
                        />
                        {errors.code && (
                          <div className="text-danger small mt-1">
                            {errors.code}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-secondary">
                          Người giữ thẻ
                        </Form.Label>
                        <Form.Control
                          value={data.holder_name}
                          onChange={(e) =>
                            setData("holder_name", e.target.value)
                          }
                          required
                          placeholder="Tên người giữ thẻ"
                          className="rounded-3 py-2 border-0 shadow-sm bg-light"
                        />
                        {errors.holder_name && (
                          <div className="text-danger small mt-1">
                            {errors.holder_name}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-secondary">
                          Loại thẻ
                        </Form.Label>
                        <Form.Select
                          value={data.type}
                          onChange={(e) => setData("type", e.target.value)}
                          className="rounded-3 py-2 border-0 shadow-sm bg-light"
                        >
                          <option value="resident">Cư dân</option>
                          <option value="guest">Khách</option>
                          <option value="staff">Nhân viên</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-secondary">
                          Trạng thái
                        </Form.Label>
                        <Form.Select
                          value={data.status}
                          onChange={(e) => setData("status", e.target.value)}
                          className="rounded-3 py-2 border-0 shadow-sm bg-light"
                        >
                          <option value="active">Kích hoạt</option>
                          <option value="suspended">Tạm ngưng</option>
                          <option value="expired">Hết hạn</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-secondary">
                          Hiệu lực từ
                        </Form.Label>
                        <Form.Control
                          type="date"
                          value={data.valid_from}
                          onChange={(e) =>
                            setData("valid_from", e.target.value)
                          }
                          className="rounded-3 py-2 border-0 shadow-sm bg-light"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-secondary">
                          Hiệu lực đến
                        </Form.Label>
                        <Form.Control
                          type="date"
                          value={data.valid_to}
                          onChange={(e) => setData("valid_to", e.target.value)}
                          className="rounded-3 py-2 border-0 shadow-sm bg-light"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Nút hành động */}
                  <div className="text-center mt-4">
                    <Button
                      type="submit"
                      disabled={processing}
                      className="px-5 py-2 rounded-3 fw-semibold shadow-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, #00b894, #00cec9)",
                        border: "none",
                      }}
                    >
                      {processing
                        ? "Đang xử lý..."
                        : item
                        ? "💾 Cập nhật"
                        : "💾 Thêm mới"}
                    </Button>

                    <Button
                      as={Link}
                      href={route("access-cards.index")}
                      variant="outline-secondary"
                      className="px-5 py-2 ms-3 rounded-3 fw-semibold shadow-sm"
                    >
                      Hủy
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-4 text-muted small">
              <p>
                © {new Date().getFullYear()} Access Card Manager — Quản lý thẻ
                ra vào chuyên nghiệp.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
