import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Card } from 'react-bootstrap';
import SecurityForm from './_Form';

export default function CreateSecurity() {
  const { meta } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    reported_by: '',
    location: '',
    occurred_at: '',
    severity: meta?.SEVERITIES?.[0] ?? 'low',
    status: meta?.STATUSES?.[0] ?? 'open',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('security.store'));
  };

  return (
    <div className="p-3">
      <Head title="Thêm sự cố an ninh" />
      <h3 className="mb-3">Thêm sự cố an ninh</h3>

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

      <div className="mt-3">
        <Link href={route('security.index')}>← Quay lại danh sách</Link>
      </div>
    </div>
  );
}
