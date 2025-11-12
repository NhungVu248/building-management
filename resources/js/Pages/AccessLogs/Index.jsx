import React, { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import RowItem from "./Row";

export default function AccessLogsIndex() {
  const { items, cards } = usePage().props;
  const { data, setData, post, processing, reset } = useForm({
    access_card_id: "",
    gate: "",
    action: "entry",
    result: "allowed",
    reason: "",
    scanned_at: "",
  });

  const [showForm, setShowForm] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    post(route("access-logs.store"), {
      onSuccess: () => {
        reset();
        setShowForm(false);
      },
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9fb",
        minHeight: "100vh",
        paddingTop: "60px",
        paddingBottom: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // canh giữa banner
      }}
    >
      {/* 🏙️ Hero Banner */}
      <div
        className="text-center mb-5"
        style={{
          width: "90%",
          maxWidth: "1300px",
          height: "380px",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          position: "relative",
        }}
      >
        {/* Ảnh nền */}
        <div
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1950&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            filter: "brightness(0.9)",
          }}
        ></div>

        {/* Overlay nội dung */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            width: "100%",
            padding: "0 20px",
          }}
        >
          <h1 className="fw-bold mb-2">Lịch Sử Ra/Vào</h1>
          <p className="lead mb-0">
            Theo dõi, ghi nhận và quản lý lượt ra vào của cư dân & nhân viên
          </p>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 mt-3 rounded-3 fw-semibold shadow-sm"
            style={{
              background: "linear-gradient(135deg, #00b894, #00cec9)",
              border: "none",
            }}
          >
            {showForm ? "Ẩn Form Ghi Log" : "📝 Ghi Log Mới"}
          </Button>
        </div>
      </div>

      {/* 📋 Nội dung chính */}
      <Container className="py-5">
        {showForm && (
          <Card className="shadow-lg border-0 rounded-4 mb-5">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4 text-dark">🧾 Ghi Lượt Ra/Vào Mới</h4>
              <Form onSubmit={submit}>
                <Row className="mb-3">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-semibold text-secondary">
                        Thẻ ra/vào
                      </Form.Label>
                      <Form.Select
                        required
                        value={data.access_card_id}
                        onChange={(e) => setData("access_card_id", e.target.value)}
                        className="rounded-3 py-2 border-0 shadow-sm bg-light"
                      >
                        <option value="">-- chọn thẻ --</option>
                        {cards.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.code} - {c.holder_name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="fw-semibold text-secondary">
                        Cổng
                      </Form.Label>
                      <Form.Control
                        required
                        value={data.gate}
                        onChange={(e) => setData("gate", e.target.value)}
                        placeholder="Gate-1"
                        className="rounded-3 py-2 border-0 shadow-sm bg-light"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="fw-semibold text-secondary">
                        Hành động
                      </Form.Label>
                      <Form.Select
                        value={data.action}
                        onChange={(e) => setData("action", e.target.value)}
                        className="rounded-3 py-2 border-0 shadow-sm bg-light"
                      >
                        <option value="entry">Entry</option>
                        <option value="exit">Exit</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    <Form.Group>
                      <Form.Label className="fw-semibold text-secondary">
                        Kết quả
                      </Form.Label>
                      <Form.Select
                        value={data.result}
                        onChange={(e) => setData("result", e.target.value)}
                        className="rounded-3 py-2 border-0 shadow-sm bg-light"
                      >
                        <option value="allowed">Allowed</option>
                        <option value="denied">Denied</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-semibold text-secondary">
                        Thời gian quẹt
                      </Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={data.scanned_at}
                        onChange={(e) => setData("scanned_at", e.target.value)}
                        className="rounded-3 py-2 border-0 shadow-sm bg-light"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-secondary">
                    Lý do (nếu bị từ chối)
                  </Form.Label>
                  <Form.Control
                    value={data.reason}
                    onChange={(e) => setData("reason", e.target.value)}
                    placeholder="Ví dụ: thẻ hết hạn"
                    className="rounded-3 py-2 border-0 shadow-sm bg-light"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 mt-2 rounded-3 fw-semibold shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #00b894, #00cec9)",
                    border: "none",
                  }}
                >
                  {processing ? "Đang ghi..." : "💾 Ghi lại"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}

        {/* Bảng danh sách logs */}
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4">
            <h4 className="fw-bold text-dark mb-4">📋 Danh Sách Lượt Ra/Vào</h4>
            <div className="table-responsive">
              <Table hover borderless className="align-middle">
                <thead className="table-light rounded-3">
                  <tr className="text-secondary">
                    <th>#</th>
                    <th>Thẻ</th>
                    <th>Người dùng</th>
                    <th>Hành động</th>
                    <th>Kết quả</th>
                    <th>Cổng</th>
                    <th>Thời gian</th>
                    <th>Lý do</th>
                  </tr>
                </thead>
                <tbody>
                  {items.data.length > 0 ? (
                    items.data.map((log) => <RowItem key={log.id} log={log} />)
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-muted">
                        Chưa có lượt ra/vào nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Footer nhỏ */}
        <div className="text-center mt-4 text-muted small">
          <p>
            © {new Date().getFullYear()} Access Logs Manager — Theo dõi hoạt động ra vào thông minh.
          </p>
        </div>
      </Container>
    </div>
  );
}
