import React from "react";
import { useForm, Link } from "@inertiajs/react";
import { Container, Card, Button } from "react-bootstrap";
import FormBooking from "./Form";

export default function Create({ amenities, residents }) {
  const form = useForm({
    amenity_id: "",
    resident_id: "",
    date: "",
    start_time: "",
    end_time: "",
    status: "confirmed",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    form.post(route("bookings.store"));
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header>
          <h5>Tạo booking mới</h5>
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
              Lưu
            </Button>
            <Link href={route("bookings.index")} className="btn btn-secondary ms-2">
              Hủy
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
