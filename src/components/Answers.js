import React, {useState, Fragment} from 'react'
import {Col, Row, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import Select from 'react-select'
import { ModalTitle } from 'react-bootstrap'
import {Modal} from 'react-bootstrap';
import Share from "./Share";

const Answers = (props) => {

    const surahs = require('../surahs.json')
    const [disabled1, setDisabled1] = useState(false)
    const [disabled2, setDisabled2] = useState(true)
    const [disabled3, setDisabled3] = useState(true)
    const [show, setShow] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalBody, setModalBody] = useState("")
    const [modalFooter, setModalFooter] = useState("")
    const [ans1, setAns1] = useState(["", 0])
    const [ans2, setAns2] = useState(["", 0])
    const [ans3, setAns3] = useState(["", 0])

    const [lost, setLost] = useState(false)

    const [count, setCount] = useState(0)

    const handleChange1 = (val) => {
        setDisabled1(true)
        setAns1([val.name, val.id])
        if (val.id === props.data.surah_number){
            setCount(count+1)
            setModalTitle("Fantasic!")
            setModalBody(`You guessed ${count + 1} surahs correct!`)
            setModalFooter(`Surah: ${props.data.surah_name}`)
            setShow(true)
            
        }else{
            setDisabled2(false)
        }
       
    }

    const handleChange2 = (val) => {
        
        setDisabled2(true)
        setAns2([val.name, val.id])
        if (val.id === props.data.surah_number){
            setCount(count+1)
            setModalTitle("Nice Job!")
            setModalBody(`You guessed ${count + 1} surahs correct!`)
            setModalFooter(`Surah: ${props.data.surah_name}`)
            setShow(true)
        }else{
            setDisabled3(false)
        }
    }

    const handleChange3 = (val) => {
        
        setDisabled3(true)
        setAns3([val.name, val.id])
        if (val.id === props.data.surah_number){
            setCount(count+1)
            setModalTitle("You got it!")
            setModalBody(`You guessed ${count + 1} surahs correct!`)
            setModalFooter(`Surah: ${props.data.surah_name}`)
            setShow(true)
            
        }else{
            setLost(true)
            setModalTitle("You'll get it next time inshAllah!")
            setModalBody(`You guessed ${count} surahs correct!`)
            setModalFooter(`Surah: ${props.data.surah_name}`)
            setCount(0)
            setShow(true)
        }
    }

    const newVerses = () =>{
        setLost(false)
        setShow(false)
        setAns1([false, 0])
        setAns2([false, 0])
        setAns3([false, 0])
        props.new_verse()
        setDisabled1(false)
    }


    const customStyles1 = {
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';  
        const color = props.data.surah_number === ans1[1] ? "green" : "red";

        return { ...provided, color, opacity, transition };
    }
    }

    const customStyles2 = {
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';  
            const color = props.data.surah_number === ans2[1] ? "green" : "red";
    
            return { ...provided, color, opacity, transition };
        }
        }

    const customStyles3 = {
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';  
            const color = props.data.surah_number === ans3[1] ? "green" : "red";
    
            return { ...provided, color, opacity, transition };
        }
        }

    return (
        <>
            <div className="Answers" fluid>
                <Modal 
                    show={show}
                    >
                    <ModalHeader className="d-flex justify-content-center">
                        <ModalTitle>
                            {modalTitle}
                        </ModalTitle>
                    </ModalHeader>
                    <ModalBody >
                        <Row className="d-flex justify-content-center">
                            {modalBody}
                        </Row>
                        <Row className="d-flex justify-content-center">
                            {modalFooter}
                        </Row>
                        
                    </ModalBody>
                    <ModalFooter>
                        {lost 
                        ?    
                            <Row>
                                <Col>
                                    <Button onClick={newVerses}>Refresh</Button>
                                </Col>
                                    {props.isMobile 
                                    ? 
                                        <Col>
                                            <Share
                                                label="Share"
                                                title={`Islamle - Quran Memorization Game`}
                                                text={`I guessed ${count} surahs correct.\nHow many can you get?`}
                                            />
                                        </Col>
                                    :
                                        null}
                            </Row>
                        : 
                            <Row>
                                <Col>
                                    <Button onClick={newVerses}>Next</Button>
                                </Col>
                            </Row>
                         }
                    </ModalFooter>
                </Modal>

                <Fragment>
                    <Row className='mt-3 d-flex justify-content-center'>
                        <Col sm={{size: 8}}>
                            <Select
                                styles={customStyles1}
                                className="basic-double"
                                name="Answer 1"
                                onChange={handleChange1}
                                value={ans1[0]}
                                multi={true}
                                isDisabled={disabled1}

                                options={surahs.map((surah) => {
                                    let surah_id = surah["id"]
                                    let surah_name = surah["name"] + "( " + surah['arabic_name'] + " )"
                                    return {id: surah_id, label: surah_name, value:surah_name}
                                })}>
                            </Select>
                        </Col>
                    </Row>

                    <Row className='mt-3 d-flex justify-content-center'>
                        <Col sm={{size: 8}}>
                            <Select
                                styles={customStyles2}
                                className="basic-single"
                                name="Answer 2"
                                onChange={handleChange2}
                                value={ans2[0]}
                                multi={true}
                                isDisabled={disabled2}
                                options={surahs.map((surah) => {
                                    let surah_id = surah["id"]
                                    let surah_name = surah["name"] + "( " + surah['arabic_name'] + " )"
                                    return {id: surah_id, label: surah_name, value: surah_name}
                                })}>
                            </Select>
                        </Col>
                    </Row>

                    <Row className='mt-3 d-flex justify-content-center'>
                        <Col sm={{size: 8}}>
                            <Select
                                styles={customStyles3}
                                className="basic-single"
                                name="Answer 3"
                                onChange={handleChange3}
                                value={ans3[0]}
                                multi={true}
                                isDisabled={disabled3}
                                options={surahs.map((surah) => {
                                    let surah_id = surah["id"]
                                    let surah_name = surah["name"] + "( " + surah['arabic_name'] + " )"
                                    return {id: surah_id, label: surah_name, value: surah_name}
                                })}>
                            </Select>
                        </Col>
                    </Row>
                </Fragment>
            </div>
            </>
    )
}

export default Answers