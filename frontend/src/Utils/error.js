import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'

export default function Error() {
  return (
    <>
    <Header />
    <div>
      <div style={
        {
          display : 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent :'center', 
          textAlign :'center',
          height: '90vh'
          }}>
        <h1 >Oops! Przpraszamy wystąpił błąd.</h1>
            <div style={{display : 'flex', alignItems: 'center', justifyContent :'center', gap :'1%'}}>
              <div>
                <p>
                  Odwiedz naszą
                  <Link to='/' style={{color :'blue'}}> Stronę główna</Link>
                </p>
              </div>
            </div>
        </div>
      </div>
    </>
    
  )
}
