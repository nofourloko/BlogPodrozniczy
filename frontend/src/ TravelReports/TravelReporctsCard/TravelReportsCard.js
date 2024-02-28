import React from 'react'
import { Button, Card } from 'react-bootstrap';
import "./CardStyle.css"

export default function TravelReportsCard({title, image}) {
    // const Img = require(`../../Assets/Pictures/${image}`)

    return (
            <Card  className="text-center CardReport">
          <Card.Img variant="top" src= {image} /> 
          <Card.Body className='CardReportBody'>
            <Card.Title className='CardReportBodyText'>{title}</Card.Title>
            <Button variant="outline-dark" className='' >Zobacz</Button>
          </Card.Body>
        </Card>
        
      );
}
