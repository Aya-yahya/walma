import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  //since searchbox is embedded into header, we won't have direct access to props.history. we need to use render prop. see line 28 in Header.js
  const [keyword, setKeyword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }
  return (
    <InputGroup className='mb-3'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => {
          setKeyword(e.target.value)
          submitHandler(e)
        }}
        placeholder='Search products...'
        style={{
          color: '#ED9003',
          background: 'white',
          borderColor: 'black',
        }}
      ></Form.Control>
      <InputGroup.Append>
        <Button
          // className='gold'
          type='button'
          onClick={(e) => submitHandler(e)}
          style={{
            color: '#ED9003',
            background: 'black',

            borderColor: 'black',
            position: 'static',
          }}
        >
          <i className='fas fa-search'></i>
        </Button>
      </InputGroup.Append>
    </InputGroup>
  )
}

export default SearchBox
