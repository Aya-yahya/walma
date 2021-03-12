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
    <Form
      onSubmit={submitHandler}
      style={{
        margin: '0px',
        padding: '0px',
        border: '0px',
      }}
    >
      <InputGroup className='mb-3'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search products...'
        ></Form.Control>
        <InputGroup.Append>
          <Button
            className='gold'
            type='submit'
            style={{
              color: '#ED9003',
              background: 'black',
              borderColor: '#ED9003',
            }}
          >
            <i className='fas fa-search'></i>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}

export default SearchBox
