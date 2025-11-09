import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import ReminderModal from './ReminderModal';
import DebtTable from './DebtTable';

export default function Index({ data }) {
  const { post, setData, processing } = useForm({ level: 'd7' });
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Gửi nhắc nợ
  const handleRemind = (invoice, level) => {
    setData('level', level);
    post(route('debts.remind', invoice.id), {
      onSuccess: () => setSelectedInvoice(null),
    });
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>📋 Quản lý công nợ & nhắc nợ</h4>
        <Badge bg="secondary">Tổng: {data.data.length} hóa đơn</Badge>
      </div>

      <DebtTable data={data.data} onSelect={(inv) => setSelectedInvoice(inv)} />

      {/* Modal nhắc nợ */}
      {selectedInvoice && (
        <ReminderModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onSend={(level) => handleRemind(selectedInvoice, level)}
          loading={processing}
        />
      )}
    </Container>
  );
}
