import React from 'react';
import { Badge } from 'react-bootstrap';

export default function RowItem({ log }) {
  const colorAction = log.action === 'entry' ? 'success' : 'secondary';
  const colorResult = log.result === 'allowed' ? 'primary' : 'danger';

  return (
    <tr>
      <td>{log.id}</td>
      <td>{log.card?.code || '-'}</td>
      <td>{log.card?.holder_name || '-'}</td>
      <td>
        <Badge bg={colorAction}>{log.action}</Badge>
      </td>
      <td>
        <Badge bg={colorResult}>{log.result}</Badge>
      </td>
      <td>{log.gate}</td>
      <td>{new Date(log.scanned_at).toLocaleString('vi-VN')}</td>
      <td>{log.reason || '-'}</td>
    </tr>
  );
}
