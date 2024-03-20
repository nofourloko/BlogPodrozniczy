import React from 'react'
import { Col, Row } from 'react-bootstrap'
import fileDownload from 'js-file-download'
import './FooterStyle.css'
import axios from 'axios'


export default function Footer() {
    async function downloadRestrictions(){
        try{
            let response = await axios.get('http://127.0.0.1:5000/file/downloadPDF', {responseType: 'blob'})
            console.log(response)
            fileDownload(response.data,'PolitkaPrywatnosci.pdf')
            
        }catch(err){
            console.log(err)
        }
        
    }
  return (
    <Row style={{background:  'azure'}}>
        <Col xs={8} style={{margin : '0 auto'}}>
            <Row>
                <Col md={4} xs={12} className='Footer'>
                    <p>ⓒ AgnieszkaPodroze.pl</p>
                </Col>
                <Col md={4} xs={12} className='Footer'>
                    <p onClick={() => downloadRestrictions()} className='downloadTag'>Polityka Prywatnosci</p>
                </Col>
                <Col md={4} xs={12} className='Footer'>
                    <p>stockowe zdjęcia z unsplash.com —2024</p>
                </Col>
            </Row>
        </Col>
    </Row>
  )
}
