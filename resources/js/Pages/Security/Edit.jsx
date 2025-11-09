import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Card } from 'react-bootstrap';
import SecurityForm from './_Form';

export default function EditSecurity() {
  const { incident, meta } = usePage().props;
  const { data, setData, put, processing, errors } = useForm({
    title: incident.title ?? '',
    description: incident.description ?? '',
    reported_by: incident.reported_by ?? '',
    location: incident.location ?? '',
    occurred_at: incident.occurred_at ? incident.occurred_at.substring(0,16) : '',
    severity: incident.severity ?? meta?.SEVERITIES?.[0] ?? 'low',
    status: incident.status ?? meta?.STATUSES?.[0] ?? 'open',
  });

  const submit = (e) => {
    e.preventDefault();
    put(route('security.update', incident.id));
  };

  return (
    <div className="p-3">
      <Head title={`Sửa sự cố #${incident.id}`} />
      <h3 className="mb-3">Sửa sự cố #{incident.id}</h3>

      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger">
          {Object.values(errors).map((err, i) => <div key={i}>{err}</div>)}
        </div>
      )}

      <Card body>
        <SecurityForm
          data={data}
          setData={setData}
          processing={processing}
          onSubmit={submit}
          meta={meta}
        />
      </Card>

      <div className="mt-3 d-flex gap-3">
        <Link href={route('security.index')}>← Quay lại danh sách</Link>
        <Link href={route('security.show', incident.id)}>Xem chi tiết</Link>
      </div>
    </div>
  );
}
