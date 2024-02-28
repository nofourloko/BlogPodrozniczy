import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Header/Header'
import ScrollTop from '../../Utils/scrollTop'
import TravelList from '../TravelList/TravelList'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './TravelReportsMainStyle.css'
import BrowseTravels from '../BrowseTravels/BrowseTravels'
import axios from 'axios'
import Form from 'react-bootstrap/Form';

export default function TravelReportsMain() {
    // const [load, setLoad] = useState(false)
    // const [cssClass, setCssClass] = useState("")
    // const [arrWyroznione, setArrayWyroznione] = useState([])
    const [arrAll, setArrAll] = useState([])
    const [arrAllCountries, setArrAllCountries] = useState([])
    const [SelectedCountry, setSelectedCountry] = useState('Polska')
    const [searchValue, setSearchValue] = useState("")

    useEffect(()=> {
        async function fetchData(){
            try{
                const response = await axios.get("http://127.0.0.1:5000/relacje/info")
                setArrAll(response.data)
                console.log(response)
                for(let i = 0; i < response.data.length; i++){
                    // if(i < 3){
                    //     arrWyroznione.push(response.data[i])
                    // }
                    
                    if(!arrAllCountries.includes(response.data[i].Country)){
                        arrAllCountries.push(response.data[i].Country)
                    }
                }
                // console.log(arrAllCountries)
                // setCssClass("scale-in-center")
                // setTimeout(() => {
                //     setLoad(true)
                    
                // },1500)
                
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
        {/* <TravelList arr={arrWyroznione} load={load} cssClass={cssClass} /> */}
        <div style={{textAlign : 'center', margin :'1%', fontSize: '32px'}}>
            <p>Wyszukaj miejsce, które chcesz znaleźć</p>
        </div>
        {arrAllCountries.length > 0 && 
        <Row style={{padding : '3%'}}>
            <Col xs={12} lg={8} style={{margin : '0 auto'}}>
                <Row>
                    <Col xs={4}>
                        <Form.Select 
                            aria-label="Default select example" 
                            style={{margin: '1% auto'}} onChange={(e) => setSelectedCountry(e.target.value)}>
                            {arrAllCountries.map((item, index) => {
                                return <option value={item} onSelectCapture={() => setSelectedCountry(item)}>{item}</option>
                            })}
                        </Form.Select>
                    </Col>
                    <Col xs={8}>
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
            
        </Row>
        }
        {/* <Row>
            <Col xs={12} md={6} style={{margin : '0 auto'}}>
                <Row>
                    <Col xs={10}>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Wpisz miejsce, które chcesz znaleźć" 
                                    value={searchValue}
                                    onChange={(e) => SearchForPlace(e)}
                                />
                                
                            </Form.Group>
                            
                        </Form>
                    </Col>
                    <Col xs={2}>
                        <Button variant='outline-primary'>Wyszukaj</Button>
                    </Col>
                </Row>
                
            </Col>
        </Row> */}
        {arrAll && <BrowseTravels PlacesList={arrAll} SelectedCountry={SelectedCountry} SearchingPlace={searchValue.toLowerCase()}/>}
        <ScrollTop />
    </div>
    
  )
}

