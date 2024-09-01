import React from 'react'
import { useReducer } from 'react'
import { useGetAllOrdersQuery } from '../state/pizzaSlice'

//let size = 'All'

const CHANGE_ALL_FILTER = 'CHANGE_ALL_FILTER'

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_ALL_FILTER:
      return { ...state, size: action.payload }
    default:
      return state
  }
}


export default function OrderList() {
  
 
  const [size, sizeState] = React.useState('All')

  const onClick = evt => {
    //dispatch({type: CHANGE_ALL_FILTER, payload: evt.target.value})
    sizeState(evt.target.value)
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <Test size={size}/>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(sizes => {
            const className = `button-filter${sizes === size ? ' active' : ''}`

            return <button
              data-testid={`filterBtn${sizes}`}
              className={className}
              key={sizes}
              onClick={onClick}
              value={sizes}

            >{sizes}</button>
          })
        }
      </div>
    </div>
  )
}
function Test({size}) {
  const { data, error, isLoading } = useGetAllOrdersQuery()
  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>loading....</div>
  const filteredPizzas = data.filter(pizza => {
    if (size === 'All') {
      return pizza
    } else {
      return pizza.size === size
    }
  })
  return (<ol>
    {
      filteredPizzas.map((order) => {
        console.log(order.length)
        return (
          <li key={order.id}>
            <div>
              {order.customer} ordered a size {order.size} with{' '}
              {(order.toppings === undefined) ? 'no' : order.toppings.length}{' '}
              topping{(order.toppings?.length === 1) ? '' : 's'}
            </div>
          </li>
        )
      })
    }
  </ol>)
}