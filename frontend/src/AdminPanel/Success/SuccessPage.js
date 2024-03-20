import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './SuccessPageStyle.css'
import { redirect, useParams } from 'react-router-dom'

export default function SuccessPage() {
    const {country, place} = useParams()
    console.log(country, place)
  return (
    <div className='successPageContainer'>
                <div className='t'>
                    <h1>Udalo się dodać post</h1>
                    <p onClick={() => {window.location.href = "/"}}>Wejdz na strone główną</p>
                    <p onClick={() => {window.location.href = "/admin/dodanie"}} >Dodaj koleny post</p>
                    <p onClick={() => {window.location.href = `/relacje/${country}/${place}`}}>Zobacz post</p>
                    
                </div>
    </div>
  )
}
