import React, { useState } from 'react'
import { Button, Col, Container, Row , Alert} from 'react-bootstrap'
import "./ArticleAddStyle.css"
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';  
import Loader from '../../Utils/Loader';
import axios from 'axios';
import CheckFields from "../../Utils/chceckFields"

export default function ArticleAdd() {
    const [loading, setLoading] = useState(false)
    const [imagesList, setImagesList] = useState([])
    const [place, setPlace] = useState("")
    const [country, setCoutry] = useState("")
    const [continent, setContinent] = useState("")
    const [textFile, setTextFile] = useState("")
    const [dateOf, setDateOf] = useState("")
    const [description, setDescription] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    async function validate(){
        const checkFields = CheckFields(place,country,continent,description, dateOf,textFile,imagesList)

        if(checkFields.error != null){
            setErrorMsg(checkFields.error)
            return
        }

        setErrorMsg("")
        setLoading(true)

        var formdata = new FormData();
        formdata.append('Place', place)
        formdata.append('Country', country)
        formdata.append('Continent', continent)
        formdata.append("Description", description)
        formdata.append('Date', dateOf)
        formdata.append('textFile', textFile)
        formdata.append('images', imagesList);


        if (imagesList) {
            for (let i = 0; i < imagesList.length; i++) {
                console.log(imagesList[i])
              formdata.append('images', imagesList[i]);
            }
          }
        try {
            const response =  await axios.post('http://127.0.0.1:5000/api/admin/addPost', formdata , { headers: {
                'Content-Type': 'multipart/form-data'
              }}) 
            if(response.status === 200){
                setLoading(false)
                window.location.href = `/admin/sukces/${country}/${place}`
            }
            
        } catch (error) {
            console.log(error)
            return
        }
    }
  return (
    <div className='containerAdmin' >
        {
                errorMsg && 
                        <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible className='alert'>
                            <Alert.Heading>O kurczę! Wystąpił błąd!</Alert.Heading>
                            <p>
                            {errorMsg}
                            </p>
                        </Alert>
            }
        <Container >

            <Row>
                <Col lg= {8} style={{margin : '0 auto'}}>
                    {loading === false ? 
                    
                        <div className='dodaniePostuAdmin'>
                            <h1>Witaj</h1>
                            <p>Dodaj nowy post</p>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Podaj miejsce"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="example" value={place}
                                onChange={(e) => setPlace(e.target.value)}/>
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Podaj kraj : "
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="example" value={country}
                                onChange={(e) => setCoutry(e.target.value)}/>
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Podaj kontynent :"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="example" value={continent}
                                onChange={(e) => setContinent(e.target.value)}/>
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Podaj wyświetlany opis:"
                                className="mb-3"
                            >
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    />
                            </FloatingLabel>
                        
                            <div>
                                <h5>Wybierz zdjecia : </h5>
                                <Form.Group controlId="formFileMultiple" className="mb-3">
                                    <Form.Control type="file" multiple size="lg" 
                                    onChange={(e) => setImagesList(e.target.files)}/>
                                </Form.Group>
                            </div>

                            <div>
                                <h5>Wybierz plik z opisem : </h5>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control type="file" size="lg" 
                                    onChange={(e) => setTextFile(e.target.files[0])}/>
                                </Form.Group>
                            </div>

                            <div>
                                <h5>Podaj date:</h5>
                                <Form.Control type="date" placeholder="example" size='lg' value={dateOf}
                                onChange={(e) => setDateOf(e.target.value)}/>
                            </div>
                        <Button type='submit' variant='outline-success' onClick={() => validate()}>
                                Zapisz
                        </Button>
                        </div>
                    :
                    <Loader />
                    }
                </Col> 
            </Row>
            
        </Container>
    </div>
    
  )
}
