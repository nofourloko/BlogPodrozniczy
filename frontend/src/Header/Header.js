import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./HeaderStyle.css"
import axios from 'axios';

export default function Header() {
  const [countriesList, setCountriesList] = useState([])
  useEffect(() => {
    async function fetchData(){
      try{
        const response = await axios.get(`http://127.0.0.1:5000/relacje/countriesList`)
        setCountriesList(response.data)

      }catch(err){
        window.location.href = "/error"
      }
    }

    fetchData()
  },[])

  return (
    <>
      <Navbar key="sm" expand="sm" className="navbar navbar-expand-lg custom-navbar"  sticky='top'>
        <Container fluid className='custom-navbar-container'>
          <Navbar.Brand className='nav-brand'>
            Aga, wypady i podróze <span class="material-symbols-outlined">sound_detection_dog_barking</span></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
              Aga, wypady i podróze <span class="material-symbols-outlined">sound_detection_dog_barking</span>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavDropdown title="Relacje z podróży" id="basic-nav-dropdown" href="/relacje">
                  {
                    countriesList && countriesList.map(item => {
                      return <Nav.Link href={`/relacje/${item}`}>{item}</Nav.Link>
                    })
                  }
                  <NavDropdown.Divider/>
                  <Nav.Link href="/relacje">Wszystkie relacje</Nav.Link>
                </NavDropdown>
                <Nav.Link href="/">Strona Główna</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
  </>
  )
}
