import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Container, Table, Button } from 'react-bootstrap';

export default function Index({ announcements }) {
  const { flash } = usePage().props;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📢 Quản lý Thông báo</h3>
        <Link href={route('announcements.create')}>
          <Button variant="primary">+ Tạo thông báo</Button>
        </Link>
      </div>

      {flash?.success && (
        <div className="alert alert-success">{flash.success}</div>
      )}
      {flash?.error && (
        <div className="alert alert-danger">{flash.error}</div>
      )}

      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Kênh gửi</th>
            <th>Thời gian gửi</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {announcements.data.length > 0 ? (
            announcements.data.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.title}</td>
                <td>{a.channel}</td>
                <td>{a.scheduled_at ? new Date(a.scheduled_at).toLocaleString() : 'Gửi ngay'}</td>
                <td>{new Date(a.created_at).toLocaleDateString()}</td>
                <td>
                  <Link
                    as="button"
                    method="delete"
                    href={route('announcements.destroy', a.id)}
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      if (!confirm('Bạn có chắc muốn xóa thông báo này?')) e.preventDefault();
                    }}
                  >
                    Xóa
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                Chưa có thông báo nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Phân trang cơ bản */}
      <div className="d-flex justify-content-center mt-3">
        {announcements.links?.map((link, index) => (
          <Link
            key={index}
            href={link.url || '#'}
            className={`btn btn-sm mx-1 ${link.active ? 'btn-primary' : 'btn-outline-secondary'}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        ))}
      </div>
    </Container>
  );
}
