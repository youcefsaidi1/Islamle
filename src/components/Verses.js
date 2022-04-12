import React,{useState, useEffect} from 'react'
import {Container} from 'reactstrap'
import axios from 'axios'


const Verses = (props) => {

    return (
        <Container className="Verses" fluid>
            <h1 className="verse">{props.verses}</h1>
        </Container>
    )
}

export default Verses