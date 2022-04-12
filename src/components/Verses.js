import React from 'react'
import {Container} from 'reactstrap'

const Verses = (props) => {

    return (
        <Container className="Verses" fluid>
            <h1 className="verse">{props.verses}</h1>
        </Container>
    )
}

export default Verses