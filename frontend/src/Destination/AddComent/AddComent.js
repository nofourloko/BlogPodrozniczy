import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faUser } from '@fortawesome/free-solid-svg-icons'
import { Col, Row, Form, Button } from 'react-bootstrap'

export default function AddComent({addNewComment, index = 0}) {
    const [commentText, setCommentText] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [err, setErr] = useState(false)

    function ClearAndAdd(){
        if(commentText === ""  || userName === "" || email === ""){
            setErr(true)
            return
        }
        addNewComment(index, userName,commentText, email)
        setCommentText("")
        setUserName("") 
        setEmail("")
        setErr(false)
    }


  return (
            
                <Form>
                    <Row>
                        <Col xs={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={1} placeholder="Napisz tutaj komentarz" value = {commentText} onChange={(e) => setCommentText(e.target.value)} required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Row >
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >                                    
                                    <Form.Control type="email" placeholder={`Imie*`} value = {userName} onChange={(e) => setUserName(e.target.value)} required/>
                                </Form.Group>          
                            </Row>
                            <Row>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="email" placeholder="E-mail*" value = {email} onChange={(e) => setEmail(e.target.value)} required/>
                                </Form.Group>
                            </Row>
                            
                        </Col>
                        <Col xs={6} style={{display: 'flex', justifyContent: 'end', alignItems : 'center'}}>
                            <Button variant='dark' onClick={() => ClearAndAdd(userName,commentText, email)}> Opublikuj komentarz </Button>
                        </Col>
                    </Row>
                    {
                        err &&
                            <Row>
                                <Col xs={8} lg={8} style={{margin : '0 auto', textAlign : 'center'}}>
                                    <p style={{color: 'red'}}>Aby dodać komentarz uzupełnij pola</p>
                                </Col>
                            </Row>
                    }
                    
                </Form>
  )
}
