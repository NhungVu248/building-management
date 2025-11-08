import React from 'react';
import { Link } from '@inertiajs/react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Dashboard() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">🏢 Quản lý Tòa nhà</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/r1">Hệ thống & nhân sự</Nav.Link>
              <Nav.Link as={Link} href="/r2">Căn hộ & pháp lý</Nav.Link>
              <Nav.Link as={Link} href="/r3">Cư dân & tiện ích</Nav.Link>
              <Nav.Link as={Link} href="/r4">Vận hành (An ninh & Bảo trì)</Nav.Link>
              <Nav.Link as={Link} href="/r5">Tài chính & nghiệp vụ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h2 className="mb-3">Xin chào, Admin!</h2>
        <p>Chọn một chức năng quản lý bên trên để bắt đầu.</p>
      </Container>
    </>
  );
}
