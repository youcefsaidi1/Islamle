import React, {useState} from 'react';
import {Container, Button, ModalBody, ModalHeader, Row, Col} from 'reactstrap';
import {Modal, ModalTitle} from 'react-bootstrap';


const Verses = ({data, surah_verses}) => {
    const [showTranslation, setShowTranslation] = useState(false);
    const translation = data.verses.map((verse)=> <li key={verse.id}>{verse.translation}</li>);
    return (
        <>
            <Row>
                <Col>
                    <h1 className="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h1>
                </Col>
            </Row>        
            <Container className="Verses">
                <h1 className="verse">{surah_verses}</h1>
            </Container>
            <Row>
                <Col lg={{size:12}}>
                    <Button onClick={()=>{setShowTranslation(true)}}>Translation</Button>
                </Col>
            </Row>
            <Modal show={showTranslation}>
                <ModalHeader>
                    <ModalTitle>
                        Translation
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                <ol start={data.verses[0].id}>
                    {translation}
                </ol>
                </ModalBody>
                <Button onClick={()=>{setShowTranslation(false)}}>Close</Button>
            </Modal>
        </>
    )
}

export default Verses

