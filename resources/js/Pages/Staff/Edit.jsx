import React, { useState } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import { Form, Button, Container, Row, Col, Alert, Image } from "react-bootstrap";

export default function Edit({ staff }) {
  const [preview, setPreview] = useState(
    staff.avatar ? `/storage/${staff.avatar}` : null
  );

  const { data, setData, post, progress, processing, errors } = useForm({
    _method: "put",
    name: staff.name || "",
    email: staff.email || "",
    phone: staff.phone || "",
    position: staff.position || "",
    department: staff.department || "",
    note: staff.note || "",
    avatar: null,
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setData("avatar", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("staff.update", staff.id), {
      forceFormData: true, // ✅ bắt buộc để gửi file
      preserveScroll: true,
    });
  };

  return (
    <>
      <Head title={`Sửa nhân sự: ${staff.name}`} />
      <Container className="mt-4">
        <h2 className="mb-4">Chỉnh sửa thông tin nhân sự</h2>

        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Ảnh đại diện */}
          <Row className="mb-4">
            <Col md={3} className="text-center">
              <div className="border rounded p-2 bg-light">
                {preview ? (
                  <Image
                    src={preview}
                    roundedCircle
                    style={{ width: 150, height: 150, objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 rounded-circle"
                    style={{ width: 150, height: 150 }}
                  >
                    <span className="text-muted">No Avatar</span>
                  </div>
                )}
                <Form.Group controlId="formFile" className="mt-3">
                  <Form.Label className="fw-bold">Ảnh đại diện</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  {errors.avatar && (
                    <Alert variant="danger" className="mt-2 p-2">
                      {errors.avatar}
                    </Alert>
                  )}
                </Form.Group>
                {progress && (
                  <div className="mt-2 small text-muted">
                    Uploading: {progress.percentage}%
                  </div>
                )}
              </div>
            </Col>

            {/* Thông tin cơ bản */}
            <Col md={9}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Họ và tên <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      placeholder="Nhập họ tên"
                    />
                    {errors.name && (
                      <Alert variant="danger" className="mt-2 p-2">
                        {errors.name}
                      </Alert>
                    )}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      placeholder="Nhập email"
                    />
                    {errors.email && (
                      <Alert variant="danger" className="mt-2 p-2">
                        {errors.email}
                      </Alert>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      value={data.phone}
                      onChange={(e) => setData("phone", e.target.value)}
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Chức vụ</Form.Label>
                    <Form.Control
                      value={data.position}
                      onChange={(e) => setData("position", e.target.value)}
                      placeholder="VD: Kế toán, Bảo vệ..."
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phòng ban</Form.Label>
                    <Form.Control
                      value={data.department}
                      onChange={(e) => setData("department", e.target.value)}
                      placeholder="VD: Hành chính, Tài chính..."
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={data.note}
                      onChange={(e) => setData("note", e.target.value)}
                      placeholder="Ghi chú thêm"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>

          <div className="d-flex gap-2 mt-3">
            <Button type="submit" variant="success" disabled={processing}>
              {processing ? "Đang lưu..." : "Cập nhật"}
            </Button>
            <Link href={route("staff.index")}>
              <Button variant="secondary">Trở lại</Button>
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
}
