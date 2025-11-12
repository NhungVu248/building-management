import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Form, Button, Container, Card, Image } from 'react-bootstrap';

export default function Create() {
  const [preview, setPreview] = useState(null);

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    avatar: null, // ✅ thêm avatar
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/staff', {
      forceFormData: true, // ✅ Bắt buộc để gửi file qua Inertia
      onSuccess: () => setPreview(null),
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setData('avatar', file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <>
      <Head title="Thêm nhân sự mới" />
      <Container className="mt-5">
        <Card className="shadow-sm">
          <Card.Body>
            <h2 className="mb-4 text-center">Thêm nhân sự mới</h2>

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Họ tên */}
              <Form.Group className="mb-3">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Nhập họ tên nhân sự"
                />
                {errors.name && (
                  <div className="text-danger small mt-1">{errors.name}</div>
                )}
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="Nhập email công việc"
                />
                {errors.email && (
                  <div className="text-danger small mt-1">{errors.email}</div>
                )}
              </Form.Group>

              {/* Số điện thoại */}
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && (
                  <div className="text-danger small mt-1">{errors.phone}</div>
                )}
              </Form.Group>

              {/* Chức vụ */}
              <Form.Group className="mb-3">
                <Form.Label>Chức vụ</Form.Label>
                <Form.Control
                  value={data.position}
                  onChange={(e) => setData('position', e.target.value)}
                  placeholder="VD: Kế toán, Bảo vệ, Kỹ thuật..."
                />
                {errors.position && (
                  <div className="text-danger small mt-1">{errors.position}</div>
                )}
              </Form.Group>

              {/* Phòng ban */}
              <Form.Group className="mb-4">
                <Form.Label>Phòng ban</Form.Label>
                <Form.Control
                  value={data.department}
                  onChange={(e) => setData('department', e.target.value)}
                  placeholder="VD: Hành chính, Tài chính, Bảo trì..."
                />
                {errors.department && (
                  <div className="text-danger small mt-1">{errors.department}</div>
                )}
              </Form.Group>

              {/* Ảnh đại diện */}
              <Form.Group className="mb-4">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                {errors.avatar && (
                  <div className="text-danger small mt-1">{errors.avatar}</div>
                )}

                {preview && (
                  <div className="mt-3 text-center">
                    <Image
                      src={preview}
                      alt="Preview"
                      roundedCircle
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        border: '2px solid #ddd',
                      }}
                    />
                    <p className="text-muted small mt-1">Ảnh xem trước</p>
                  </div>
                )}
              </Form.Group>

              {/* Nút hành động */}
              <div className="d-flex justify-content-end gap-2">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Đang lưu...' : 'Lưu'}
                </Button>
                <Link href="/staff">
                  <Button variant="secondary" type="button">
                    Hủy
                  </Button>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
