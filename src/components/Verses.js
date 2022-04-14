import React, {useState} from 'react'
import {Container, Button, ModalBody, ModalHeader, Row, Col} from 'reactstrap'
import {Modal, ModalTitle} from 'react-bootstrap';



const Verses = (props) => {
    
    const [showTranslation, setShowTranslation] = useState(false)
    
    const translation = props.data.verses.map((verse)=> <li>{verse.translated_text}</li>)

    const share = () => {
        if (navigator.share) {
            navigator.share({
                title: `hello from islamle`,
                url: "https://islamle.com"
            }).then(()=> {
                console.log("thanks for sharing")
            })
        } else {
            alert("You can only share on mobile devices :(")

        }
    }
    
    return (
        <>
            <Row>
                <Col>
                    <h1 className="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h1>
                </Col>
            </Row>        
            <Container className="Verses" fluid>
                <h1 className="verse">{props.verses}</h1>
            </Container>
            <Row>
                <Col lg={{size:12}}>
                    <Button onClick={()=>{setShowTranslation(true)}}>Translation</Button>
                    <Button onClick={share}>share</Button>
                </Col>
            </Row>
            
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
        
        </>
    
    )
}

export default Verses