import React, { useReducer } from 'react'
import { usePostAllOrdersMutation, useGetAllOrdersQuery } from '../state/pizzaSlice'
const CHANGE_FULLNAME = 'CHANGE_FULLNAME'
const CHANGE_SIZE = 'CHANGE_SIZE'
const CHANGE_TOP = 'CHANGE_TOP'
const RESETFORM = 'RESETFORM'

const initialFormState = { // suggested
  fullName: '',
  size: '',

  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false
}
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_FULLNAME:
      return { ...state, fullName: action.payload }
    case CHANGE_SIZE:
      return { ...state, size: action.payload }
    case CHANGE_TOP:
      const { name, checked } = action.payload
      return { ...state, [name]: checked }
    case RESETFORM:
    return {fullName: '', size: '', '1': false,'2': false,'3': false,'4': false,'5': false}
    default:
      return state
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, error] = usePostAllOrdersMutation()
  const {isLoading, isFetching}= useGetAllOrdersQuery()

  const onNameChange = ({ target: { value } }) => {
    dispatch({ type: CHANGE_FULLNAME, payload: value })
  }
  const onSizeChange = ({ target: { value } }) => {
    dispatch({ type: CHANGE_SIZE, payload: value })
  }
  const onTopChange = ({ target: { name, checked } }) => {
    //console.log(name)
    dispatch({ type: CHANGE_TOP, payload: { name, checked } })
  }
  const resetOrder = () =>{
    dispatch({type: RESETFORM})
  }
  const onNewOrder = evt => {
    evt.preventDefault()
    const { fullName, size } = state
    let keys = Object.keys(state)
    let toppings = []
    for (let i = 0; i < keys.length; i++) {
      if (state[keys[i]] === true) {
        toppings.push(keys[i])
        state[keys[i]] = false
      }
    }
    //console.log(toppings)
    createOrder({ fullName, size, toppings })
    resetOrder()
    
  }
  const reset = evt => { }
  //console.log(state) 
  return (
    <form>
      <h2>Pizza Form</h2>
      {(isFetching === true && isLoading === false) && <div className='pending'>Order in progress...</div>}
      {error.error && <div className='failure'>Order failed: {error.error.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={onNameChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={state.size} onChange={onSizeChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={onTopChange} checked={state['1']} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={onTopChange} checked={state['2']}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={onTopChange} checked={state['3']}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={onTopChange} checked={state['4']}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={onTopChange} checked={state['5']}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" onClick={onNewOrder} />
    </form>
  )
}