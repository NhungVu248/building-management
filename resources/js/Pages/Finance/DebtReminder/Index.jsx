import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Container, Badge, Row, Col, Card } from 'react-bootstrap';
import ReminderModal from './ReminderModal';
import DebtTable from './DebtTable';

export default function Index({ data }) {
  const { post, setData, processing } = useForm({ level: 'd7' });
  const [selectedInvoice, setSelectedInvoice] = useState(null);


  const handleRemind = (invoice, level) => {
    setData('level', level);
    post(route('debts.remind', invoice.id), {
      onSuccess: () => setSelectedInvoice(null),
    });
  };

  return (

    <Container fluid className="bg-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">

          <Col lg={11} xl={10}>

            <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4 p-md-5">

                <Row className="align-items-center mb-4">
                  <Col>
                    <h2 className="mb-0 fw-bold">📋 Quản lý công nợ</h2>
                  </Col>
                  <Col xs="auto">

                    <Badge bg="primary" pill className="fs-6 px-3 py-2">
                      Tổng: {data.data.length} hóa đơn nợ
                    </Badge>
                  </Col>
                </Row>

                <DebtTable
                  data={data.data}
                  onSelect={(inv) => setSelectedInvoice(inv)} // Logic giữ nguyên
                />

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
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