import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container, Row, Col, Table, Button, Form, InputGroup, Alert, Pagination } from 'react-bootstrap';

export default function Index({ staff, filters }) {
  const { flash } = usePage().props;

  // Hàm xử lý xóa nhân sự
  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa nhân sự này không?')) {
      router.delete(route('staff.destroy', id));
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    const query = new FormData(e.currentTarget).get('search') || '';
    router.get(route('staff.index'), { search: query }, { preserveState: true, replace: true });
  };

  // Phân trang
  const handlePageClick = (url) => {
    if (url) router.get(url, {}, { preserveState: true });
  };

  return (
    <>
      <Head title="Quản lý nhân sự" />
      <Container className="mt-4">
        <Row className="align-items-center mb-3">
          <Col><h3>Quản lý nhân sự</h3></Col>
          <Col className="text-end">
            <Link href={route('staff.create')} className="btn btn-primary">
              + Thêm nhân sự
            </Link>
          </Col>
        </Row>

        {/* Hiển thị thông báo khi thêm/sửa/xóa */}
        {flash?.success && <Alert variant="success">{flash.success}</Alert>}

        {/* Form tìm kiếm */}
        <Form onSubmit={handleSearch} className="mb-3">
          <InputGroup>
            <Form.Control
              name="search"
              placeholder="Tìm theo tên, email hoặc số điện thoại..."
              defaultValue={filters?.search || ''}
            />
            <Button type="submit">Tìm</Button>
          </InputGroup>
        </Form>

        {/* Bảng danh sách nhân sự */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Chức vụ</th>
              <th>Phòng ban</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {staff?.data?.length > 0 ? (
              staff.data.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.position}</td>
                  <td>{s.department}</td>
                  <td className="text-nowrap">
                    <Link href={route('staff.edit', s.id)} className="btn btn-sm btn-warning me-2">
                      Sửa
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(s.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Không có nhân sự nào.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Phân trang */}
        {staff?.links?.length > 0 && (
            <Pagination>
                {staff.links.map((l, idx) => (
                <Pagination.Item
                    key={idx}
                    active={l.active}
                    onClick={() => l.url && router.get(l.url, {}, { preserveState: true })}
                    disabled={!l.url}
                >
                    <span dangerouslySetInnerHTML={{ __html: l.label }} />
                </Pagination.Item>
                ))}
            </Pagination>
            )}

      </Container>
    </>
  );
}
