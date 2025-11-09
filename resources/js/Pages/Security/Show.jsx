import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, Badge } from 'react-bootstrap';

export default function ShowSecurity() {
  const { incident } = usePage().props;

  return (
    <div className="p-3">
      <Head title={`Sự cố #${incident.id}`} />
      <h3 className="mb-3">Chi tiết sự cố #{incident.id}</h3>

      <Card body>
        <div className="mb-2"><strong>Tiêu đề:</strong> {incident.title}</div>
        <div className="mb-2"><strong>Mô tả:</strong> {incident.description || '-'}</div>
        <div className="mb-2"><strong>Người báo cáo:</strong> {incident.reported_by || '-'}</div>
        <div className="mb-2"><strong>Vị trí:</strong> {incident.location || '-'}</div>
        <div className="mb-2"><strong>Thời điểm:</strong> {incident.occurred_at ? new Date(incident.occurred_at).toLocaleString() : '-'}</div>
        <div className="mb-2">
          <strong>Mức độ:</strong>{' '}
          <Badge bg={
            incident.severity === 'critical' ? 'danger' :
            incident.severity === 'high' ? 'warning' :
            incident.severity === 'medium' ? 'info' : 'secondary'
          }>{incident.severity}</Badge>
        </div>
        <div className="mb-2">
          <strong>Trạng thái:</strong>{' '}
          <Badge bg={
            incident.status === 'resolved' ? 'success' :
            incident.status === 'in_progress' ? 'primary' : 'secondary'
          }>{incident.status}</Badge>
        </div>
        <div className="text-muted">Tạo lúc: {new Date(incident.created_at).toLocaleString()}</div>
        <div className="text-muted">Cập nhật: {new Date(incident.updated_at).toLocaleString()}</div>
      </Card>

      <div className="mt-3 d-flex gap-3">
        <Link href={route('security.index')}>← Quay lại</Link>
        <Link href={route('security.edit', incident.id)}>Sửa</Link>
      </div>
    </div>
  );
}
