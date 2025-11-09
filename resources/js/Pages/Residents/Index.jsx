import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Table, Button, Container } from 'react-bootstrap';

export default function Index({ residents }) {
  const { flash } = usePage().props;

  return (
    <Container className="py-3">
      <h3 className="mb-3">Quản lý cư dân</h3>

      {flash?.success && (
        <div className="alert alert-success">{flash.success}</div>
      )}

      <Link href={route('residents.create')}>
        <Button variant="primary" className="mb-3">
          + Thêm cư dân
        </Button>
      </Link>

      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>CCCD</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Ghi chú</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {residents.data.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                Chưa có cư dân nào.
              </td>
            </tr>
          )}
          {residents.data.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.cccd}</td>
              <td>{r.phone || '-'}</td>
              <td>{r.email || '-'}</td>
              <td>
                {r.status === 'dang_o' && <span className="text-success">Đang ở</span>}
                {r.status === 'tam_vang' && <span className="text-warning">Tạm vắng</span>}
                {r.status === 'chuyen_di' && <span className="text-danger">Chuyển đi</span>}
              </td>
              <td>{r.note || '-'}</td>
              <td>
                <Link
                  href={route('residents.edit', r.id)}
                  className="btn btn-sm btn-warning me-2"
                >
                  Sửa
                </Link>
                <Link
                  as="button"
                  method="delete"
                  href={route('residents.destroy', r.id)}
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    if (!confirm('Xóa cư dân này?')) e.preventDefault();
                  }}
                >
                  Xóa
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      {residents.links && (
        <div className="mt-3 d-flex justify-content-center">
          <ul className="pagination">
            {residents.links.map((link, i) => (
              <li
                key={i}
                className={`page-item ${link.active ? 'active' : ''} ${
                  !link.url ? 'disabled' : ''
                }`}
              >
                <Link
                  href={link.url || '#'}
                  className="page-link"
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}
