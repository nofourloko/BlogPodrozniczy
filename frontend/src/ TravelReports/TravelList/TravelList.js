import React, {useState, useEffect, useRef} from 'react'
import TravelReportsCard from '../TravelReporctsCard/TravelReportsCard'
import { Container , Col, Row} from 'react-bootstrap'
import "./TravelListStyle.css"
export default function TravelList({arr,cssClass, load}) {

  return (
    <div className='divWyroznione'>
            <Row > 
                <Col xs={11} className='text-center' style={{margin : '1% auto', fontSize : '32px'}}><div class="love">
                    <p>Wyróźnione </p>
                    <input id="switch" type="checkbox" checked={load} disabled={true}/>
                    <label class="love-heart" for="switch">
                        <i class="left"></i>
                        <i class="right"></i>
                        <i class="bottom"></i>
                        <div class="round"></div>
                    </label>
                    </div>
                </Col>
            </Row>
            <Row className={`TravelReportsListContainer ${cssClass}`} fluid>
                {load && arr.map(item => {
                        return (
                            <Col lg= {4}>
                                <TravelReportsCard title={`${item.Place} - ${item.Country} `} image={item.Image} />
                            </Col>
                        )
                    })
                } 
            </Row>
            {
                !load && <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
                <div class="wheel"></div>
                <div class="hamster">
                    <div class="hamster__body">
                        <div class="hamster__head">
                            <div class="hamster__ear"></div>
                            <div class="hamster__eye"></div>
                            <div class="hamster__nose"></div>
                        </div>
                        <div class="hamster__limb hamster__limb--fr"></div>
                        <div class="hamster__limb hamster__limb--fl"></div>
                        <div class="hamster__limb hamster__limb--br"></div>
                        <div class="hamster__limb hamster__limb--bl"></div>
                        <div class="hamster__tail"></div>
                    </div>
                </div>
                <div class="spoke"></div>
            </div>
            }
    </div>
    
  )
}
