import React from "react";
import { useForm } from "@inertiajs/react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import AmenityForm from "./Form";

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    capacity: 1,
    max_per_week: 5,
    is_active: true,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("amenities.store"));
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
          <h1 className="fw-bold mb-2">Tạo Tiện Ích Mới</h1>
          <p className="lead mb-0">
            Quản lý không gian và tiện ích một cách chuyên nghiệp, sang trọng
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
                  <h2 className="fw-bold text-dark mb-2">🏢 Thêm Tiện Ích</h2>
                  <p className="text-muted">
                    Điền thông tin chi tiết để thêm tiện ích vào hệ thống
                  </p>
                </div>

                {/* Form tiện ích */}
                <AmenityForm
                  data={data}
                  setData={setData}
                  errors={errors}
                  processing={processing}
                  onSubmit={submit}
                />

              </Card.Body>
            </Card>

            {/* Footer */}
            <div className="text-center mt-4 text-muted small">
              <p>
                © {new Date().getFullYear()} Amenity Manager — Quản lý tiện ích
                sang trọng và hiệu quả.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
