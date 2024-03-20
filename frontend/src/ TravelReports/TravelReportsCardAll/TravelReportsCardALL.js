import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "./TravelReportsCardAllStyle.css"

export default function TravelReportsCardALL({PlaceFromList, SelectedCountry}) {
    const {Image,Place, Country, Date, Description} = PlaceFromList


  return (
    <Row >
        <Col sm={10} style={{margin : '0 auto'}}>
            <Row className='ReportCardAll'>
                <Col className='ReportCardAllImage' xs={12} md={5}>
                    <img src={Image} />
                </Col>
                <Col  xs={12} md={7}>
                        
                            <p>{Country}</p>
                            <a href={`/relacje/${Country}/${Place}`}><h3>{Place}</h3></a>
                            <p>{Date}</p>
                            <span className='underLine'></span>
                            <p> { Description }</p>
                </Col>
            </Row>
            
        </Col>
       
    </Row>

  )
}

