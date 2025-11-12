import React from "react";
import { useForm } from "@inertiajs/react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import AmenityForm from "./Form";

export default function Edit({ amenity }) {
  const { data, setData, put, processing, errors } = useForm({
    name: amenity.name || "",
    description: amenity.description || "",
    capacity: amenity.capacity || 1,
    max_per_week: amenity.max_per_week || 5,
    is_active: amenity.is_active || false,
  });

  const submit = (e) => {
    e.preventDefault();
    put(route("amenities.update", amenity.id));
  };

  return (
    <div style={{ backgroundColor: "#f7f9fc", minHeight: "100vh" }}>
      {/* 🏙️ Hero Banner */}
      <div
        style={{
          backgroundImage: "url('/images/real-estate-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "280px",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.45)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            padding: "0 15px",
          }}
        >
          <h1 className="fw-bold mb-2">Chỉnh Sửa Tiện Ích</h1>
          <p className="lead mb-0">
            Cập nhật thông tin và chi tiết tiện ích của bạn
          </p>
        </div>
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
                    📝 Chỉnh sửa tiện ích
                  </h2>
                  <p className="text-muted">
                    Cập nhật thông tin chi tiết cho tiện ích{" "}
                    <strong>{amenity.name}</strong>
                  </p>
                </div>

                {/* Form tiện ích */}
                <AmenityForm
                  data={data}
                  setData={setData}
                  errors={errors}
                  processing={processing}
                  onSubmit={submit}
                  isEdit
                />
              </Card.Body>
            </Card>

            {/* Footer */}
            <div className="text-center mt-4 text-muted small">
              <p>
                © {new Date().getFullYear()} Amenity Manager — Quản lý tiện ích
                hiện đại và thông minh.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
