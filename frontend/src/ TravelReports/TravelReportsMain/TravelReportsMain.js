import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Header/Header'
import ScrollTop from '../../Utils/scrollTop'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import './TravelReportsMainStyle.css'
import BrowseTravels from '../BrowseTravels/BrowseTravels'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Loader from "../../Utils/Loader.js"
import Footer from '../../Footer/Footer'

export default function TravelReportsMain() {
    let {country} = useParams()
    const [arrAll, setArrAll] = useState([])
    const [SelectedCountry, setSelectedCountry] = useState()
    const [searchValue, setSearchValue] = useState("")

    useEffect(()=> {
        async function fetchData(){
            try{
                if(country === undefined){
                    const response = await axios.get("http://127.0.0.1:5000/relacje/info")
                    setArrAll(response.data)
                    return
                }
                const response =  await axios.get(`http://127.0.0.1:5000/relacje/info/${country}`)
                if(response.data.length === 0 ){
                    window.location.href = '/error'
                }
                setArrAll(response.data)

            }catch(err){
                window.location.href = '/error'
                console.log(err)
            }
        }

        fetchData()
       
    },[])

  return (
    <div style={{ width: '100vw' }}>
    <Header />
    {arrAll.length > 0 ? 
        <div style={{ width: '100vw' }}>
                <div style={{textAlign : 'center', margin :'1%', fontSize: '32px'}}>
                    <p>Wyszukaj miejsce, które chcesz znaleźć</p>
                </div>
                
                <Row style={{padding : '3%'}}>
                    <Col xs={12} lg={8} style={{margin : '0 auto'}}>
                        <Row>
                            <Col xs={12}>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Wpisz miejsce, które chcesz znaleźć" 
                                            value={searchValue}
                                            onChange={(e) =>  setSearchValue((e.target.value))}
                                        />
                                                
                                    </Form.Group>
                                            
                                </Form>
                            </Col>
                        </Row>
                        
                    </Col>
                    <BrowseTravels PlacesList={arrAll} SearchingPlace={searchValue.toLowerCase()}/>
                </Row>
            
        </div>
       :
    
    <Loader />}
    <ScrollTop />
    <Footer />
    </div>
  )
}

