import React from 'react'
import Tatry from "../../Assets/Pictures/Tatry.jpg"
import { Col, Container, Row,Carousel} from 'react-bootstrap'
import TravelReportsCardALL from '../TravelReportsCardAll/TravelReportsCardALL'

export default function BrowseTravels({PlacesList, SelectedCountry, SearchingPlace}) {
    let tmp = SearchingPlace !== "" ? PlacesList.map(item => {
        if((item.Place).toLowerCase().includes(SearchingPlace)){
            return item
        }
    }) : [""]

    console.log(tmp)
    return (
        <Container style={{marginTop : '4%'}}>
            {
                tmp[0] !== undefined &&  PlacesList.map(item => {
                    if(item.Country === SelectedCountry){
                        if((item.Place).toLowerCase().includes(SearchingPlace)){
                            return  <TravelReportsCardALL PlaceFromList={item} />
                        }
                        if(SearchingPlace === ""){
                            return  <TravelReportsCardALL PlaceFromList={item} />
                        }
                        
                    }
                   
                })
            }
            {
                tmp[0] === undefined && 
                <Row>
                    <Col xs={8} lg={12} style={{margin : '0 auto', textAlign: 'center'}}>
                        <h1>Nie znaleziono wynikow</h1>
                    </Col>
                </Row>
            }
        </Container>
    )
}
