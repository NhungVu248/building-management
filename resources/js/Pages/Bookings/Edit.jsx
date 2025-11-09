import React from 'react';
import { router, usePage } from '@inertiajs/react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function Edit({ booking, amenities, residents }) {
  const { props } = usePage();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    router.put(`/bookings/${booking.id}`, data);
  };

  return (
    <Container className="mt-4">
      <h2>✏️ Chỉnh sửa Booking</h2>

      {props.errors?.booking && (
        <Alert variant="danger" className="mt-3">
          {props.errors.booking}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Tiện ích</Form.Label>
          <Form.Select
            name="amenity_id"
            defaultValue={booking.amenity_id}
            required
          >
            {amenities.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} (Công suất: {a.capacity})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cư dân</Form.Label>
          <Form.Select
            name="resident_id"
            defaultValue={booking.resident_id}
            required
          >
            {residents.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} – {r.apartment?.code}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ngày đặt</Form.Label>
          <Form.Control
            type="date"
            name="booking_date"
            defaultValue={booking.booking_date}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Giờ bắt đầu</Form.Label>
          <Form.Control
            type="time"
            name="start_time"
            defaultValue={booking.start_time}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Giờ kết thúc</Form.Label>
          <Form.Control
            type="time"
            name="end_time"
            defaultValue={booking.end_time}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select name="status" defaultValue={booking.status}>
            <option>Đã xác nhận</option>
            <option>Đã hủy</option>
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">
          ✅ Cập nhật Booking
        </Button>
      </Form>
    </Container>
  );
}
