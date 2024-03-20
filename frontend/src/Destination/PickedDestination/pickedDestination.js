import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container , Row, Col} from 'react-bootstrap';
import {useParams} from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Header from '../../Header/Header';
import './PickedDestinationStyle.css'
import DestinationContent from '../DestinationContent/DestinationContent';
import AddComent from '../AddComent/AddComent';
import Comment from '../Comment/Comment';
import ScrollTop from "../../Utils/scrollTop"
import Footer from '../../Footer/Footer';
import Loader from '../../Utils/Loader';


export default function PickedDestination() {
    let { place } = useParams();
    const [destination, setDestination] = useState()
    const [comments, setComents] = useState([])

    async function AddCommentToList(index, imie, komentarz, email){
        const commentObj = {
            date : new Date().toDateString(),
            name : imie,
            comment : komentarz,
            email : email,
            Reply : []
        }

        setComents(prev => [...prev, commentObj])

        try{
            const req = await axios.post("http://127.0.0.1:5000/relacje/selectedPlaceInfo/Comment", null,  {params: {com : [...comments, commentObj], docId : destination.id}})
        }catch(err){
            console.log(err)
            window.location.href = '/error'
        }
       
    }

    async function addReply(index, imie, komentarz, email){
        const commentObj = {
            date : new Date().toDateString(),
            name : imie,
            comment : komentarz,
            email : email,
            Reply : []
        }

        setComents(comments.map((item,i) => {
            if(i === index){
                item.Reply = [...item.Reply, commentObj]
            }
            return item
        }))

        try{
            const req = await axios.post("http://127.0.0.1:5000/relacje/selectedPlaceInfo/Comment", null,  {params: {com : [...comments], docId : destination.id}})
        }catch(err){
            console.log(err)
        }
    }

  useEffect(() => {
    async function FetchData(){
       
        try{
            const response = await axios.get("http://127.0.0.1:5000/relacje/selectedPlaceInfo", { params: { place: place }})
            setComents(response.data[0].Comments)
            setDestination(response.data[0])
            if(response.data.length === 0){
                window.location.href = "/error"
            }

            console.log(response.data[0])
        }catch(err){
            console.log(err)
            window.location.href = "/error"
        }
    }

    FetchData()
  },[])
  return (
    <>
     {destination ?
        <>
        <Header />
       
        <Container style={{padding : '5%'}}>
            <Row>
                <Col xs={12} lg={8} style={{margin: '0 auto'}}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/" >Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="/relacje">  Relacje </Breadcrumb.Item>
                        <Breadcrumb.Item active >{destination.Place}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row >
                <Col xs={12} lg={8} style={{margin: '0 auto'}} className='DestinationTopic'>
                    <p>{destination.Place}: Zimowy górski wypad</p>
                </Col>
            </Row>
            <Row >
                <Col xs={12} lg={8} style={{margin: '1% auto'}} className='AuthorAndDate'>
                    <div>
                       <p>Autor: Agnieszka Miśta</p> 
                    </div>
                    <div>
                        <p>Data : {destination.Date}</p>
                    </div>
                </Col>
            </Row>
            <Row >
                <Col xs={12} lg={8} style={{margin: '0 auto'}}>
                    <img src={destination.Image} className='ImagesDestination'/> 
                </Col>
            </Row>
            {
                destination.ImagesList.map((item, index) => {
                    const text = destination.TextFile[index]

                    return <DestinationContent ImageSrc={item} Text={text}/>
                })
            }
            <Row style={{margin : '2% 0% 5% 0%'}}>
                <Col xs={8} lg={8} style={{margin : '0 auto', textAlign : 'center', }}>
                    <h2>Skomentuj artykuł</h2>
                </Col>
            </Row>
            <Row>
               <Col xs={12} lg={8} style={{margin : '0 auto', padding: '3% 1%' , borderBottom : '1px solid black', borderTop: '1px solid black'}}>
                    <AddComent addNewComment = {AddCommentToList}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={8} style={{margin: '1% auto'}}>
                    <p>{comments.length} komentarzy </p>
                </Col>
            </Row>
            <div style={{marginTop :'0%'}}>
            {
                comments.length > 0 ? comments.map((item,index) => {
                    return <Comment 
                                Name={item.name} 
                                Text={item.comment} 
                                Date={item.date} 
                                Reply={item.Reply}
                                Index ={index}
                                AddReply = {addReply}
                            />
                }): null
            }
            </div>
            
        </Container>
        <Footer />
        <ScrollTop />
        </> : <Loader /> }
    </>
    
  )
}   
