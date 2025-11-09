import React from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";

export default function FormBooking({ form, amenities, residents, onSubmit }) {
  const { data, setData, errors } = form;

  return (
    <Form onSubmit={onSubmit}>
      {errors.date && <Alert variant="danger">{errors.date}</Alert>}
      {errors.resident_id && <Alert variant="danger">{errors.resident_id}</Alert>}
      {errors.amenity_id && <Alert variant="danger">{errors.amenity_id}</Alert>}

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Tiện ích</Form.Label>
            <Form.Select
              value={data.amenity_id}
              onChange={(e) => setData("amenity_id", e.target.value)}
            >
              <option value="">-- Chọn tiện ích --</option>
              {amenities.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Cư dân (tùy chọn)</Form.Label>
            <Form.Select
              value={data.resident_id}
              onChange={(e) => setData("resident_id", e.target.value)}
            >
              <option value="">-- Không chọn --</option>
              {residents.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Ngày</Form.Label>
            <Form.Control
              type="date"
              value={data.date}
              onChange={(e) => setData("date", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Giờ bắt đầu</Form.Label>
            <Form.Control
              type="time"
              value={data.start_time}
              onChange={(e) => setData("start_time", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Giờ kết thúc</Form.Label>
            <Form.Control
              type="time"
              value={data.end_time}
              onChange={(e) => setData("end_time", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Trạng thái</Form.Label>
        <Form.Select
          value={data.status}
          onChange={(e) => setData("status", e.target.value)}
        >
          <option value="confirmed">Xác nhận</option>
          <option value="cancelled">Hủy</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
}
