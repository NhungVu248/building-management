import React from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

export default function MaintenanceForm({
  data,
  setData,
  processing,
  onSubmit,
  enums,
  errors,
  submitText = "Lưu",
}) {
  return (
    <Card
      className="shadow-lg border-0 rounded-4 p-4"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Card.Body>
        <h3 className="fw-bold text-dark mb-4">
          🏗️ {submitText === "Lưu" ? "Thêm Yêu Cầu Bảo Trì" : "Cập Nhật Thông Tin Bảo Trì"}
        </h3>

        <Form onSubmit={onSubmit}>
          {/* --- Tiêu đề + Căn hộ --- */}
          <Row className="mb-4">
            <Col md={8}>
              <Form.Label className="fw-semibold text-secondary">Tiêu đề</Form.Label>
              <Form.Control
                value={data.title || ""}
                onChange={(e) => setData("title", e.target.value)}
                isInvalid={!!errors.title}
                required
                placeholder="Nhập tiêu đề yêu cầu bảo trì..."
                className="rounded-3 py-2 border-0 shadow-sm bg-light"
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Col>
            <Col md={4}>
              <Form.Label className="fw-semibold text-secondary">Căn hộ (ID)</Form.Label>
              <Form.Control
                type="number"
                value={data.apartment_id || ""}
                onChange={(e) =>
                  setData(
                    "apartment_id",
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                isInvalid={!!errors.apartment_id}
                placeholder="VD: 101"
                className="rounded-3 py-2 border-0 shadow-sm bg-light"
              />
              <Form.Control.Feedback type="invalid">
                {errors.apartment_id}
              </Form.Control.Feedback>
            </Col>
          </Row>

          {/* --- Mô tả + Người phụ trách + Hạn + Chi phí --- */}
          <Row className="mb-4">
            <Col md={8}>
              <Form.Label className="fw-semibold text-secondary">Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={data.description || ""}
                onChange={(e) => setData("description", e.target.value)}
                placeholder="Mô tả chi tiết sự cố hoặc yêu cầu bảo trì..."
                className="rounded-3 py-2 border-0 shadow-sm bg-light"
              />
            </Col>
            <Col md={4}>
              <Form.Label className="fw-semibold text-secondary">Người phụ trách</Form.Label>
              <Form.Control
                value={data.assigned_to || ""}
                onChange={(e) => setData("assigned_to", e.target.value)}
                placeholder="Tên người phụ trách"
                className="rounded-3 py-2 border-0 shadow-sm bg-light"
              />

              <Form.Label className="fw-semibold text-secondary mt-3">Hạn xử lý</Form.Label>
              <Form.Control
                type="date"
                value={data.due_date || ""}
                onChange={(e) => setData("due_date", e.target.value)}
                className="rounded-3 py-2 border-0 shadow-sm bg-light"
              />

              <Form.Label className="fw-semibold text-secondary mt-3">
                Ước tính chi phí
              </Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0"
                value={data.estimated_cost ?? ""}
                onChange={(e) => setData("estimated_cost", e.target.value)}
                placeholder="VNĐ"
                className="rounded-3 py-2 border-0 shadow-sm bg-light"
              />
            </Col>
          </Row>

          {/* --- Mức độ + Trạng thái + Ngày hoàn tất --- */}
          <Row className="mb-4">
            <Col md={4}>
              <Form.Label className="fw-semibold text-secondary">Mức độ</Form.Label>
              <Form.Select
                value={data.priority}
                onChange={(e) => setData("priority", e.target.value)}
                className="rounded-3 py-2 border-0 shadow-sm bg-light"
              >
                {enums.priority.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Label className="fw-semibold text-secondary">Trạng thái</Form.Label>
              <Form.Select
                value={data.status}
                onChange={(e) => setData("status", e.target.value)}
                className="rounded-3 py-2 border-0 shadow-sm bg-light"
              >
                {enums.status.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Label className="fw-semibold text-secondary">
                Ngày hoàn tất (auto khi chọn “completed”)
              </Form.Label>
              <Form.Control
                type="datetime-local"
                value={data.completed_at || ""}
                onChange={(e) => setData("completed_at", e.target.value)}
                disabled={data.status !== "completed"}
                className="rounded-3 py-2 border-0 shadow-sm bg-light"
              />
            </Col>
          </Row>

          {/* --- File đính kèm --- */}
          <Form.Label className="fw-semibold text-secondary">
            Tệp đính kèm (mỗi dòng là 1 URL)
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={(data.attachments || []).join("\n")}
            onChange={(e) =>
              setData(
                "attachments",
                e.target.value.split("\n").filter((x) => x.trim())
              )
            }
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            className="rounded-3 py-2 border-0 shadow-sm bg-light"
          />

          {/* --- Nút lưu --- */}
          <div className="mt-4 d-flex justify-content-end">
            <Button
              type="submit"
              variant="success"
              disabled={processing}
              className="px-4 py-2 rounded-3 fw-semibold shadow-sm"
              style={{
                background: "linear-gradient(135deg, #00b894, #00cec9)",
                border: "none",
              }}
            >
              {processing ? "Đang lưu..." : submitText}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
