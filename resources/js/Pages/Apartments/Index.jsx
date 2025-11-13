import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import {
  Table,
  Button,
  Container,
  Card,
  Row,
  Col,
  Form,
  InputGroup,
} from 'react-bootstrap';

export default function Index({ apartments }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa căn hộ này?')) {
      router.delete(`/apartments/${id}`);
    }
  };

  const filteredApartments = apartments.filter((a) => {
    const matchStatus =
      filterStatus === 'Tất cả' ? true : a.status === filterStatus;
    const matchSearch =
      a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.owner_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div
      style={{
        backgroundColor: '#f8f9fb',
        minHeight: '100vh',
        paddingTop: '60px',
        paddingBottom: '60px',
      }}
    >
      <Container>
        {/* Hero Section */}
        <div
          className="text-center mb-5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1950&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px',
            padding: '80px 20px',
            color: 'white',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          }}
        >
          <h1 className="fw-bold display-5">🏢 Quản lý Căn Hộ</h1>
          <p className="mt-3 lead" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Quản lý, tìm kiếm và theo dõi danh sách căn hộ của bạn một cách trực quan và hiệu quả.
          </p>
          <Link
            href="/apartments/create"
            className="btn btn-light mt-4 px-5 py-2 fw-semibold shadow-sm"
            style={{
              borderRadius: '30px',
              color: '#0d6efd',
              transition: 'all 0.3s ease',
            }}
          >
            ➕ Thêm Căn hộ
          </Link>
        </div>

        {/* Filter + Search */}
        <Card
          className="border-0 shadow-sm p-4 mb-4"
          style={{ borderRadius: '20px' }}
        >
          <Row className="align-items-center">
            <Col md={6} className="mb-3 mb-md-0">
              <InputGroup>
                <Form.Control
                  placeholder="🔍 Tìm kiếm theo mã hoặc tên chủ hộ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-pill"
              >
                <option value="Tất cả">Tất cả trạng thái</option>
                <option value="Trống">Trống</option>
                <option value="Đang sử dụng">Đang sử dụng</option>
                <option value="Bảo trì">Bảo trì</option>
              </Form.Select>
            </Col>
            <Col md={2} className="text-md-end text-center mt-3 mt-md-0">
              <Button
                variant="outline-secondary"
                className="rounded-pill px-4"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('Tất cả');
                }}
              >
                🧹 Làm mới
              </Button>
            </Col>
          </Row>
        </Card>

        {/* 🌟 Smart Stats Section */}
        <Row className="mb-5 text-center">
          <Col md={4} className="mb-3">
            <Card
              className="border-0 shadow-sm py-4"
              style={{
                borderRadius: '18px',
                background: '#e3f2fd',
                boxShadow: '0 6px 16px rgba(13, 110, 253, 0.15)',
              }}
            >
              <h4 className="fw-bold text-primary mb-1">
                {apartments.length}
              </h4>
              <p className="text-muted mb-0">Tổng số căn hộ</p>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card
              className="border-0 shadow-sm py-4"
              style={{
                borderRadius: '18px',
                background: '#e9f7ef',
                boxShadow: '0 6px 16px rgba(25, 135, 84, 0.15)',
              }}
            >
              <h4 className="fw-bold text-success mb-1">
                {apartments.filter((a) => a.status === 'Trống').length}
              </h4>
              <p className="text-muted mb-0">Căn hộ trống</p>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card
              className="border-0 shadow-sm py-4"
              style={{
                borderRadius: '18px',
                background: '#fff9e6',
                boxShadow: '0 6px 16px rgba(255, 193, 7, 0.2)',
              }}
            >
              <h4 className="fw-bold text-warning mb-1">
                {apartments.filter((a) => a.status === 'Bảo trì').length}
              </h4>
              <p className="text-muted mb-0">Đang bảo trì</p>
            </Card>
          </Col>
        </Row>

        {/* Table Section */}
        <Card
          style={{
            border: 'none',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            background: 'white',
          }}
        >
          <Card.Body className="p-4">
            <h4 className="fw-bold mb-4 text-dark text-center">
              Danh sách Căn Hộ
            </h4>

            <div className="table-responsive">
              <Table
                hover
                className="align-middle text-center mb-0"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  borderCollapse: 'separate',
                }}
              >
                <thead
                  style={{
                    backgroundColor: '#cfe2ff',
                    color: '#0d47a1',
                  }}
                >
                  <tr>
                    <th style={{ padding: '14px' }}>#</th>
                    <th style={{ padding: '14px' }}>Mã</th>
                    <th>Chủ hộ</th>
                    <th>Tầng</th>
                    <th>Diện tích (m²)</th>
                    <th>Trạng thái</th>
                    <th>Ghi chú</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApartments.length > 0 ? (
                    filteredApartments.map((a, index) => (
                      <tr
                        key={a.id}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? '#fdfdff' : '#f4f7ff',
                          transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = '#e9f0ff')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            index % 2 === 0 ? '#fdfdff' : '#f4f7ff')
                        }
                      >
                        <td className="fw-semibold">{a.id}</td>
                        <td className="fw-semibold text-primary">{a.code}</td>
                        <td>{a.owner_name || '—'}</td>
                        <td>{a.floor}</td>
                        <td>{a.area}</td>
                        <td>
                          <span
                            className={`badge px-3 py-2 rounded-pill ${
                              a.status === 'Trống'
                                ? 'bg-success-subtle text-success'
                                : a.status === 'Đang sử dụng'
                                ? 'bg-primary-subtle text-primary'
                                : 'bg-warning-subtle text-dark'
                            }`}
                            style={{
                              fontWeight: 500,
                              letterSpacing: '0.3px',
                            }}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="text-muted">{a.note ? a.note : '—'}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <Link
                              href={`/apartments/${a.id}/edit`}
                              className="btn btn-sm border-0 shadow-sm text-white"
                              style={{
                                backgroundColor: '#74b9ff',
                                borderRadius: '25px',
                                padding: '4px 14px',
                              }}
                            >
                              ✏️ Sửa
                            </Link>
                            <Button
                              variant="danger"
                              size="sm"
                              className="border-0 shadow-sm"
                              style={{
                                backgroundColor: '#ff7675',
                                borderRadius: '25px',
                                padding: '4px 14px',
                              }}
                              onClick={() => handleDelete(a.id)}
                            >
                              🗑️ Xóa
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-muted py-4">
                        Không tìm thấy căn hộ phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>

        {/* Footer */}
        <div className="text-center mt-5 text-muted small">
          <p className="mb-1">
            © {new Date().getFullYear()} Apartment Management Dashboard
          </p>
          <p className="mb-0">
            Designed with 💙 for a soft, modern real estate experience
          </p>
        </div>
      </Container>
    </div>
  );
}
