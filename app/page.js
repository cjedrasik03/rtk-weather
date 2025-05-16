import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function App() {
  return (
    <>
      <div className='pt-5'>
        <div>
        <Form className='col-4 pb-5 align-items-center container-lg'>
          <Form.Control size="lg" type="text" placeholder="Search a city" />
          <Button className="col-12 d-grid mt-2" variant="primary" size="lg">
             Search
           </Button>
        </Form>
        </div>

        <div className='col-6 align-items-center container-lg p-1'>
          <Container className='bg-primary-subtle border border-primary-subtle rounded-4'>
            <div className='p-2 text-center'>City Title 1</div>
            <Row className='d-flex justify-content-center align-items-center'>
              <Col className='m-3'>Temp.</Col>
              <Col className='m-3'>Hum.</Col>
              <Col className='m-3'>Pres.</Col>
            </Row>
          </Container>
        </div>

        <div className='col-6 align-items-center container-lg p-1'>
        <Container className='bg-primary-subtle border border-primary-subtle rounded-4'>
          <div className='p-2 text-center'>City Title 2</div>
          <Row className='d-flex justify-content-center align-items-center'>
            <Col className='m-3'>Temp.</Col>
            <Col className='m-3'>Hum.</Col>
            <Col className='m-3'>Pres.</Col>
          </Row>
        </Container>
      </div>

      <div className='col-6 align-items-center container-lg p-1'>
        <Container className='bg-primary-subtle border border-primary-subtle rounded-4'>
          <div className='p-2 text-center'>City Title 3</div>
          <Row className='d-flex justify-content-center align-items-center'>
            <Col className='m-3'>Temp.</Col>
            <Col className='m-3'>Hum.</Col>
            <Col className='m-3'>Pres.</Col>
          </Row>
        </Container>
      </div>
    </div>
  </>    
  )
}
