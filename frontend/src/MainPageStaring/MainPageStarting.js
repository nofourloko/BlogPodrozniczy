import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

export default function MainPageStarting({reference}) {
    function scrollTo(){
        reference.current?.scrollIntoView({ behavior: 'smooth'})
    }

  return (
    <Container fluid className='ContainerMainPage'>
          <Row className="justify-content-md-center MainPageRow">
              <Col lg="12" className='MainPageRowTop'>
              Inspirujacy
              </Col>
              <Col  lg="12" className='MainPageRowBottom'>
              do podrozy
              </Col>
        </Row>
          <Row>
          <Col  lg="12">
              <Button variant="light" size="lg" onClick={() => scrollTo()} >Zobacz więcej</Button>
          </Col>
          
          </Row> 
          
      </Container>
  )
}
