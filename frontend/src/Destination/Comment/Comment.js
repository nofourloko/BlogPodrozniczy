import React, { useState } from 'react'
import {Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faClock, faCommentDots, faL, faUser } from '@fortawesome/free-solid-svg-icons';
import AddComent from '../AddComent/AddComent';
import "./CommentStyle.css"
let tmpArrow = 1

export default function Comment({Name, Text, Date, Reply, AddReply, Index}) {
  const [arrow, setArrow] = useState(<FontAwesomeIcon icon={faArrowDown} />)
  const [cssClassComment, setCssClassComment] = useState('displayNone')
  const [cssClassReplys, setCssClassReplys] = useState('displayNone')


  function ShowReplys(e){
    if(cssClassComment === 'scale-in-ver-top'){
      setArrow(<FontAwesomeIcon icon={faArrowUp} />)
      setCssClassComment('disappear-in-var-top')
      return
    }

    setArrow(<FontAwesomeIcon icon={faArrowDown} />)
    setCssClassComment('scale-in-ver-top')
  }

  function CommentRespond(){
    if(cssClassReplys === 'scale-in-ver-top'){
      setCssClassReplys('disappear-in-var-top')
      return 
    }
    setCssClassReplys('scale-in-ver-top')
    
  }

  return (
    <>
      <Row>
        <Col xs={12} lg={8} style={{margin: '1% auto'}}>
            <Row>
                <Col lg = {1} xs={1} style={{ textAlign: 'center'}}>
                    <FontAwesomeIcon icon={faUser} size='xl' />
                </Col>
                <Col xs={11} lg={11} style={{margin: '0% auto', textAlign: 'left'}}>
                        <p>{Name}<span style={{margin : '0 1%'}}><FontAwesomeIcon icon={faClock}/></span>{Date} </p>
                        <p>{Text}</p>
                        <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                        <p style={{margin : '0% 1% 5% 1%'}} onClick={() => CommentRespond()}><FontAwesomeIcon icon={faCommentDots} /> Odpowiedz</p> 

                          <p style={{textAlign: 'right', margin : '0% 1% 5% 1%',width: '10px'}} onClick={() => ShowReplys()}>{arrow}</p>
                        </div>
                        
                </Col>
            </Row>
            
        </Col>
      </Row>
      <Row>
          <Col xs={10} lg={6} style={{margin: '0% auto 2% auto'}} className={cssClassReplys} >
              <AddComent addNewComment={(index, userName,commentText, email) => {
                setCssClassReplys('disappear-in-var-top')
                setCssClassComment('scale-in-ver-top')
                AddReply(index, userName,commentText, email)
              }} index={Index}/>
          </Col>


      </Row>
      <Row>
        {
          Reply && Reply.map(item => {
            return (
              <Col xs={10} lg={7} style={{margin: '1% auto 2% auto'}} className={cssClassComment}>
                <Row>
                    <Col lg = {1} xs={1} style={{ textAlign: 'center'}}>
                        <FontAwesomeIcon icon={faUser} size='xl' />
                    </Col>
                    <Col xs={11} lg={11} style={{margin: '0% auto', textAlign: 'left'}}>
                            <p>{item.name}<span style={{margin : '0 1%'}}><FontAwesomeIcon icon={faClock}/></span>{Date} </p>
                            <p>{item.comment}</p>
                            <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                            </div>
                            
                    </Col>
                </Row>
                
              </Col>
            )
          })
        }
      </Row>
    </>
  )
}
