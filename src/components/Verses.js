import React, {useState} from 'react'
import {Container, Button, ModalBody, ModalHeader, Row, Col} from 'reactstrap'
import {Modal, ModalTitle} from 'react-bootstrap';


const Verses = (props) => {
    
    const [showTranslation, setShowTranslation] = useState(false)
    
    const translation = props.data.verses.map((verse)=> <li>{verse.translated_text}</li>)
    
    return (
        <>        
        <Container className="Verses" fluid>
            <h1 className="verse">{props.verses}</h1>
        </Container>
        <Row>
            <Col lg={{size:12}}>
                <Button onClick={()=>{setShowTranslation(true)}}>Translation</Button>
            </Col>
        </Row>
        
        {showTranslation
        ?
        <Modal show={showTranslation}>
            <ModalHeader>
                <ModalTitle>
                    Translation
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
            <ol start={props.data.verses[0].number}>
                {translation}
            </ol>
            </ModalBody>
            <Button onClick={()=>{setShowTranslation(false)}}>Close</Button>
        </Modal>
        :
        null}

        </>

    )
}

export default Verses