import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Container, Button, Table, Badge } from 'react-bootstrap';
import dayjs from 'dayjs';

export default function Index() {
  const { items } = usePage().props; // truyền từ controller
  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa lịch này không?')) {
      router.delete(route('maintenance-schedules.destroy', id));
    }
  };
  const handleGenerate = (id) => {
    if (confirm('Sinh Work Order từ lịch này?')) {
      router.post(route('maintenance-schedules.generate', id));
    }
  };

  const colorMap = {
    weekly: 'info',
    monthly: 'primary',
    quarterly: 'warning',
    yearly: 'success',
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Lịch bảo dưỡng định kỳ</h4>
        <Button as={Link} href={route('maintenance-schedules.create')}>
          + Thêm lịch mới
        </Button>
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Thiết bị / Hệ thống</th>
            <th>Tần suất</th>
            <th>Lần gần nhất</th>
            <th>Kế tiếp</th>
            <th>Ghi chú</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {items.data.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                Chưa có lịch bảo dưỡng nào.
              </td>
            </tr>
          )}
          {items.data.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.asset_name}</td>
              <td className="text-center">
                <Badge bg={colorMap[s.frequency]}>{s.frequency}</Badge>
              </td>
              <td className="text-center">
                {s.last_run_on ? dayjs(s.last_run_on).format('DD/MM/YYYY') : '-'}
              </td>
              <td className="text-center">
                <strong>{dayjs(s.next_run_on).format('DD/MM/YYYY')}</strong>
              </td>
              <td>{s.notes ?? '-'}</td>
              <td className="text-center">
                <Button
                  as={Link}
                  href={route('maintenance-schedules.edit', s.id)}
                  size="sm"
                  variant="warning"
                  className="me-1"
                >
                  Sửa
                </Button>
                <Button
                  size="sm"
                  variant="success"
                  className="me-1"
                  onClick={() => handleGenerate(s.id)}
                >
                  Sinh WO
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(s.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* phân trang (nếu bạn dùng paginate) */}
      {items.links && (
        <div className="d-flex justify-content-center mt-3">
          {items.links.map((link, i) => (
            <Button
              key={i}
              as={Link}
              href={link.url ?? '#'}
              disabled={!link.url}
              variant={link.active ? 'primary' : 'outline-primary'}
              size="sm"
              className="me-1"
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
