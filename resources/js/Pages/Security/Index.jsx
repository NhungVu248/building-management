import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Button, Table, Form, Row, Col, Badge, Pagination, InputGroup } from 'react-bootstrap';

export default function SecurityIndex() {
  const { incidents, filters, meta, flash } = usePage().props;
  const [q, setQ] = useState(filters.q || '');
  const [status, setStatus] = useState(filters.status || '');
  const [severity, setSeverity] = useState(filters.severity || '');

  const onFilter = (e) => {
    e.preventDefault();
    router.get(route('security.index'), { q, status, severity }, { preserveState: true, replace: true });
  };

  const pageChange = (url) => {
    if (!url) return;
    router.visit(url, { preserveState: true, replace: true });
  };

  // ✅ Đã sửa phần renderPagination
  const renderPagination = () => {
    const { links } = incidents;
    return (
      <Pagination className="mt-3">
        {links.map((link, idx) => {
          if (link.label.includes('Previous'))
            return (
              <Pagination.Prev
                key={idx}
                disabled={!link.url}
                onClick={() => pageChange(link.url)}
              />
            );

          if (link.label.includes('Next'))
            return (
              <Pagination.Next
                key={idx}
                disabled={!link.url}
                onClick={() => pageChange(link.url)}
              />
            );

          return (
            <Pagination.Item
              key={idx}
              active={link.active}
              onClick={() => pageChange(link.url)}
              disabled={!link.url}
            >
              <span dangerouslySetInnerHTML={{ __html: link.label }} />
            </Pagination.Item>
          );
        })}
      </Pagination>
    );
  };

  return (
    <div className="p-3">
      <Head title="Sự cố An ninh" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>🛡️ Sự cố An ninh</h2>
        <Link href={route('security.create')}>
          <Button variant="primary">Thêm sự cố</Button>
        </Link>
      </div>

      {flash?.success && (
        <div className="alert alert-success py-2">{flash.success}</div>
      )}

      <Form onSubmit={onFilter} className="mb-3">
        <Row className="g-2 align-items-end">
          <Col md={5}>
            <Form.Label>Tìm kiếm</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="Tiêu đề, mô tả, người báo cáo, vị trí..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setQ('');
                  setStatus('');
                  setSeverity('');
                  router.get(route('security.index'));
                }}
              >
                Xóa
              </Button>
            </InputGroup>
          </Col>
          <Col md={3}>
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">-- Tất cả --</option>
              {meta.STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Label>Mức độ</Form.Label>
            <Form.Select value={severity} onChange={(e) => setSeverity(e.target.value)}>
              <option value="">-- Tất cả --</option>
              {meta.SEVERITIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md="auto">
            <Button type="submit" variant="secondary">Lọc</Button>
          </Col>
        </Row>
      </Form>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Mức độ</th>
            <th>Trạng thái</th>
            <th>Vị trí</th>
            <th>Thời điểm</th>
            <th>Người báo cáo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {incidents.data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Link href={route('security.show', item.id)}>{item.title}</Link>
              </td>
              <td>
                <Badge
                  bg={
                    item.severity === 'critical'
                      ? 'danger'
                      : item.severity === 'high'
                      ? 'warning'
                      : item.severity === 'medium'
                      ? 'info'
                      : 'secondary'
                  }
                >
                  {item.severity}
                </Badge>
              </td>
              <td>
                <Badge
                  bg={
                    item.status === 'resolved'
                      ? 'success'
                      : item.status === 'in_progress'
                      ? 'primary'
                      : 'secondary'
                  }
                >
                  {item.status}
                </Badge>
              </td>
              <td>{item.location || '-'}</td>
              <td>{item.occurred_at ? new Date(item.occurred_at).toLocaleString() : '-'}</td>
              <td>{item.reported_by || '-'}</td>
              <td className="text-nowrap">
                <Link href={route('security.edit', item.id)}>
                  <Button size="sm" variant="warning" className="me-2">
                    Sửa
                  </Button>
                </Link>
                <Link
                  as="button"
                  method="delete"
                  href={route('security.destroy', item.id)}
                  className="btn btn-sm btn-danger"
                  onBefore={() => confirm('Xóa sự cố này?')}
                >
                  Xóa
                </Link>
              </td>
            </tr>
          ))}
          {incidents.data.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center py-4">
                Chưa có sự cố nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {renderPagination()}
    </div>
  );
}
