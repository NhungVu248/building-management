import React, { useMemo } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaBuilding, FaUser, FaCalendarAlt, FaClock, FaCog, FaHome } from "react-icons/fa";

export default function FormBooking({ form, amenities, residents, apartments = [], onSubmit }) {
  const { data, setData } = form;

  // ✅ Lọc cư dân theo apartment đã chọn (nếu có)
  const filteredResidents = useMemo(() => {
    if (!data.apartment_id) return residents;
    return residents.filter((r) => r.apartment_id === parseInt(data.apartment_id));
  }, [data.apartment_id, residents]);

  return (
    <Form onSubmit={onSubmit}>
      {/* Hàng 1: Căn hộ & Cư dân */}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-secondary d-flex align-items-center">
              <FaHome className="me-2 text-primary" /> Căn hộ
            </Form.Label>
            <Form.Select
              className="rounded-3 border-0 shadow-sm bg-light"
              value={data.apartment_id || ""}
              onChange={(e) => setData("apartment_id", e.target.value)}
            >
              <option value="">-- Chọn căn hộ --</option>
              {apartments.map((ap) => (
                <option key={ap.id} value={ap.id}>
                  {ap.name || `Căn hộ #${ap.id}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-secondary d-flex align-items-center">
              <FaUser className="me-2 text-primary" /> Cư dân
            </Form.Label>
            <Form.Select
              className="rounded-3 border-0 shadow-sm bg-light"
              value={data.resident_id || ""}
              onChange={(e) => setData("resident_id", e.target.value)}
            >
              <option value="">-- Chọn cư dân --</option>
              {filteredResidents.length > 0 ? (
                filteredResidents.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))
              ) : (
                <option disabled>Không có cư dân trong căn hộ này</option>
              )}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Hàng 2: Tiện ích */}
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-secondary d-flex align-items-center">
              <FaBuilding className="me-2 text-primary" /> Tiện ích
            </Form.Label>
            <Form.Select
              className="rounded-3 border-0 shadow-sm bg-light"
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
      </Row>

      {/* Hàng 3: Ngày & giờ */}
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-secondary d-flex align-items-center">
              <FaCalendarAlt className="me-2 text-primary" /> Ngày
            </Form.Label>
            <Form.Control
              type="date"
              className="rounded-3 border-0 shadow-sm bg-light"
              value={data.date}
              onChange={(e) => setData("date", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-secondary d-flex align-items-center">
              <FaClock className="me-2 text-primary" /> Giờ bắt đầu
            </Form.Label>
            <Form.Control
              type="time"
              className="rounded-3 border-0 shadow-sm bg-light"
              value={data.start_time}
              onChange={(e) => setData("start_time", e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-secondary d-flex align-items-center">
              <FaClock className="me-2 text-primary" /> Giờ kết thúc
            </Form.Label>
            <Form.Control
              type="time"
              className="rounded-3 border-0 shadow-sm bg-light"
              value={data.end_time}
              onChange={(e) => setData("end_time", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Hàng 4: Trạng thái */}
      <Form.Group>
        <Form.Label className="fw-semibold text-secondary d-flex align-items-center">
          <FaCog className="me-2 text-primary" /> Trạng thái
        </Form.Label>
        <Form.Select
          value={data.status}
          onChange={(e) => setData("status", e.target.value)}
          className="rounded-3 border-0 shadow-sm bg-light"
        >
          <option value="confirmed">Xác nhận</option>
          <option value="cancelled">Hủy</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
}
