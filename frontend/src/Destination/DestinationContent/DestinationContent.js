import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './DestinationContent.css'

export default function DestinationContent({ImageSrc, Text}) {
  return (
    <>
        <Row>
            <Col xs={12} lg={8} style={{margin: '1% auto'}}>
                <p className='DestinationText'>{Text}</p>
            </Col>
        </Row>
        <Row >
            <Col xs={12} lg={8} style={{margin: '0 auto'}}>
                <img src={ImageSrc} className='ImagesDestination'/> 
            </Col>
        </Row>
    </>
  )
}
