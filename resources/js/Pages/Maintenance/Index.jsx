import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Button, Table, Form, Row, Col, Badge } from 'react-bootstrap';

export default function Index() {
  const { requests, filters, enums, flash } = usePage().props;

  const [q, setQ] = React.useState(filters?.q || '');
  const [status, setStatus] = React.useState(filters?.status || '');
  const [priority, setPriority] = React.useState(filters?.priority || '');

  const doFilter = (e) => {
    e?.preventDefault();
    router.get(route('maintenance.index'), { q, status, priority }, { preserveState: true });
  };

  const resetFilter = () => {
    setQ(''); setStatus(''); setPriority('');
    router.get(route('maintenance.index'), {}, { preserveState: true });
  };

  const colorStatus = (s) => ({
    pending: 'secondary',
    in_progress: 'warning',
    completed: 'success',
    cancelled: 'dark',
  }[s] || 'secondary');

  const colorPriority = (p) => ({
    low: 'success', medium: 'warning', high: 'danger'
  }[p] || 'secondary');

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h2>🛠️ Bảo trì – Danh sách yêu cầu</h2>
        <Link href={route('maintenance.create')}><Button variant="primary">Thêm yêu cầu</Button></Link>
      </div>

      {flash?.success && <div className="alert alert-success mt-3">{flash.success}</div>}

      <Form className="mt-3" onSubmit={doFilter}>
        <Row className="g-2">
          <Col md={4}>
            <Form.Control placeholder="Tìm kiếm tiêu đề/mô tả..." value={q} onChange={e => setQ(e.target.value)} />
          </Col>
          <Col md={3}>
            <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">-- Trạng thái --</option>
              {enums.status.map(s => <option key={s} value={s}>{s}</option>)}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="">-- Mức độ --</option>
              {enums.priority.map(p => <option key={p} value={p}>{p}</option>)}
            </Form.Select>
          </Col>
          <Col md={2} className="d-flex gap-2">
            <Button type="submit" variant="secondary">Lọc</Button>
            <Button type="button" variant="outline-secondary" onClick={resetFilter}>Reset</Button>
          </Col>
        </Row>
      </Form>

      <Table bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Căn hộ</th>
            <th>Mức độ</th>
            <th>Trạng thái</th>
            <th>Phụ trách</th>
            <th>Hạn</th>
            <th>Chi phí (ước tính)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.apartment_id ?? '-'}</td>
              <td><Badge bg={colorPriority(item.priority)}>{item.priority}</Badge></td>
              <td><Badge bg={colorStatus(item.status)}>{item.status}</Badge></td>
              <td>{item.assigned_to ?? '-'}</td>
              <td>{item.due_date ?? '-'}</td>
              <td>{item.estimated_cost ?? '-'}</td>
              <td className="text-nowrap">
                <Link href={route('maintenance.edit', item.id)} className="btn btn-sm btn-warning me-2">Sửa</Link>
                <Link href={route('maintenance.destroy', item.id)} method="delete" as="button" className="btn btn-sm btn-danger">Xóa</Link>
              </td>
            </tr>
          ))}
          {requests.data.length === 0 && (
            <tr><td colSpan="9" className="text-center text-muted">Chưa có yêu cầu nào</td></tr>
          )}
        </tbody>
      </Table>

      {/* pagination */}
      <div className="d-flex gap-2">
        {requests.links.map((l, i) => (
          <Link
            key={i}
            href={l.url || '#'}
            className={`btn btn-sm ${l.active ? 'btn-primary' : 'btn-outline-primary'} ${!l.url ? 'disabled' : ''}`}
            dangerouslySetInnerHTML={{ __html: l.label }}
          />
        ))}
      </div>
    </div>
  );
}
