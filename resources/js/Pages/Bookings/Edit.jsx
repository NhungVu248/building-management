import React from "react";
import { useForm, Link } from "@inertiajs/react";
import { Container, Card, Button } from "react-bootstrap";
import FormBooking from "./Form";

export default function Edit({ booking, amenities, residents }) {
  const form = useForm({
    amenity_id: booking.amenity_id || "",
    resident_id: booking.resident_id || "",
    date: booking.date || "",
    start_time: booking.start_time || "",
    end_time: booking.end_time || "",
    status: booking.status || "confirmed",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    form.put(route("bookings.update", booking.id));
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header>
          <h5>Chỉnh sửa booking #{booking.id}</h5>
        </Card.Header>
        <Card.Body>
          <FormBooking
            form={form}
            amenities={amenities}
            residents={residents}
            onSubmit={handleSubmit}
          />
          <div className="mt-3">
            <Button type="submit" onClick={handleSubmit} disabled={form.processing}>
              Cập nhật
            </Button>
            <Link href={route("bookings.index")} className="btn btn-secondary ms-2">
              Quay lại
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
