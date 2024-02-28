import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'
import MyImage from "./MyImage.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram , faTiktok} from '@fortawesome/free-brands-svg-icons'
import './AboutMeStyle.css'
import axios from 'axios'

export default function AboutMe() {
    const [desc, setDesc] = useState()
    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get("http://127.0.0.1:5000/info")
                setDesc(response.data)
            }catch(err){
                console.log(err)
                window.location.href = '/error'
            }
            
        }

        fetchData()
    },[])

  return (
    <Container fluid className='AboutMeContainer'>
        <Row className='AboutMeRow'>
            <Col md ={12} lg = {3} className='AboutMeColLeft'>
                <Image src={MyImage} roundedCircle fluid className='ZdjecieInfo'/>
            </Col>
            <Col xs={12} lg = {9} className='AboutMeColRigth'>
                {desc}
            </Col>
        </Row>
        <Row className='AboutMeLinksRow'>
            <Col xs={10} lg = {4} className='AboutMeLinksCol'>
                <a href="https://www.facebook.com/personaanonimus" target='blank'><FontAwesomeIcon icon={faFacebook} size="2xl" className='SocialIcon'/></a>
                <a href='https://www.instagram.com/agusiaagam/' target='blank' ><FontAwesomeIcon icon={faInstagram} size="2xl" className='SocialIcon' /></a>
                <a className='SocialIcon'><FontAwesomeIcon icon={faTiktok} size='2xl' className='SocialIcon'/></a>
            </Col>
        </Row>
    </Container>
  )
}
