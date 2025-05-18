'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  // this detemines what the submit button does and under what conditions
const handleSearch = (e) => {

  // this prevents the page from reseting
  e.preventDefault();
};
  const handleChange = (e) => { 
    setInputValue(e.target.value);
    console.log(inputValue);
}
  return (
    <>
      {/* Primary background */}
      <Container fluid className="primaryBackground min-vh-100 py-5">
        
        {/* Search box centered */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={6} lg={6}>
            <div className="bg-primary-subtle border border-primary-subtle rounded-4 p-4">
                <Row className="g-2 align-items-center">
                  <Col xs={12} md={9}>
                    <input
                      size="lg"
                      type="text"
                      placeholder="Search a city"
                      value={inputValue}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12} md={3}>
                    <button className="w-100" variant="primary" size="lg">
                      Search
                    </button>
                  </Col>
                </Row>
            </div>
          </Col>
        </Row>

        {/* Forecast boxes */}
        <Row className="justify-content-center">
          <Col md={8}>
            <Container className="bg-primary-subtle border border-primary-subtle rounded-4 p-3 mb-2">
              <div className="p-2 text-center">City Title 1</div>
              <Row className="d-flex justify-content-center align-items-center">
                <Col className="m-3">Temp.</Col>
                <Col className="m-3">Hum.</Col>
                <Col className="m-3">Pres.</Col>
              </Row>
            </Container>
          </Col>
          {/* Add more forecast boxes as needed */}
        </Row>
      </Container>
    </>
  );
}
