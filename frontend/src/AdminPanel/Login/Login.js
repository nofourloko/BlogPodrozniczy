import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import "./LoginStyle.css"
import axios from 'axios'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

export default function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const signIn = useSignIn()
    const [error, setError] = useState(false)
    const isAuthenticated = useIsAuthenticated()

    useEffect(() => {
        if(isAuthenticated){
            window.location.href = "/admin/dodanie"
        }
    },[])

    const validate = async () => {
        if(login === ''){
            setError(true)
            return
        }
        if(password === ''){
            setError(true)
            return
        }

        setError(false)

        try{
            const response = await axios.get('http://127.0.0.1:5000/api/admin/login', 
                {params : 
                    {
                        login: login, 
                        password: password
                    }
                })
                console.log(response)
            signIn({
                auth: {
                    token: response.data.token,
                    expiresIn: '3600',
                    type: 'Bearer',
                    userState: {user : response.data.username}
                },
            })

            window.location.href = "/admin/dodanie"

        }catch(err){
            setError(true)
            console.log(err)
        }
    }

  return (
    <div className='containerAdmin'>
        <Container >
            <Row>
                <Col xs={8} style={{margin: '0 auto'}}>
                    
                    <div className='formAdmin'>
                        <h1>Logowanie</h1>
                        <input type="text" placeholder="Wpisz login" value={login} onChange={(e) => setLogin(e.target.value)} className='inputAdmin'/>
                         <input type="password" autocomplete="off" placeholder="Wpisz hasło"required = "" value={password} onChange={(e) => setPassword(e.target.value)} className='inputAdmin'/>
                        <button className='buttonValidate' onClick={() => validate()}>
                            Zaloguj
                        </button>
                    </div>
                    
                </Col>
            </Row>
            <Row>
                <Col xs={8} style={{margin: '0 auto'}}>
                    {error && <h1 className='adminErrMessage'>Błąd walidacji</h1>}
                </Col>
            </Row>
        </Container>
    </div>
        
    
  )
}
