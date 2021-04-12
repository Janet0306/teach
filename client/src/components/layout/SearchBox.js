import React, { useState } from 'react'
import { Form } from 'react-bootstrap'


const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault() 
            if(keyword.trim()) {
                history.push(`/topic/search/${keyword}`)
            } else {
                history.push('/topic')
            }
        }
        
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control 
                type="text" 
                title="Search"
                name="q" 
                size="sm"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Topics....."
            ></Form.Control>
        </Form>

    )
}


export default SearchBox
