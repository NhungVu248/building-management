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
    <div
      style={{
        backgroundColor: "#f8f9fb",
        minHeight: "100vh",
        paddingTop: "60px",
        paddingBottom: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 🏙️ Hero Banner */}
      <div
        className="text-center mb-5"
        style={{
          width: "90%",
          maxWidth: "1300px",
          height: "360px",
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

        {/* Overlay chữ */}
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
          <h1 className="fw-bold mb-2">🏡 Đặt Lịch Tiện Ích</h1>
          <p className="lead mb-0">
            Tạo mới lịch sử dụng tiện ích cho cư dân một cách nhanh chóng và tiện lợi
          </p>
        </div>
      </div>

      {/* 📋 Form chính */}
      <Container style={{ maxWidth: "900px" }}>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold text-dark">📝 Tạo Booking Mới</h3>
              <Link
                href={route("bookings.index")}
                className="btn btn-outline-secondary rounded-3"
              >
                ← Quay lại danh sách
              </Link>
            </div>

            <FormBooking
              form={form}
              amenities={amenities}
              residents={residents}
              onSubmit={handleSubmit}
            />

            <div className="mt-4 d-flex justify-content-end gap-2">
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={form.processing}
                className="px-4 py-2 fw-semibold rounded-3 shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #00b894, #00cec9)",
                  border: "none",
                }}
              >
                {form.processing ? "Đang lưu..." : "💾 Lưu Booking"}
              </Button>
              <Link
                href={route("bookings.index")}
                className="btn btn-outline-secondary px-4 py-2 rounded-3 fw-semibold shadow-sm"
              >
                Hủy
              </Link>
            </div>
          </Card.Body>
        </Card>

        {/* Footer nhỏ */}
        <div className="text-center mt-4 text-muted small">
          <p>
            © {new Date().getFullYear()} Booking Manager — Quản lý tiện ích cư dân chuyên nghiệp.
          </p>
        </div>
      </Container>
    </div>
  );
}
