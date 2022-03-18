import { makeStyles } from '@mui/styles'
import React from 'react'
import CartItem from './CartItem'
import { CartItemType } from './TodoList'

const useStyles = makeStyles({
    div: {
        fontFamily: "Arial, Helvetica, sans-serif",
        width: "500px",
        padding: "20px"
    }
})

type Props = {
    cartItems: CartItemType[]
    addToCart: (clickedItem: CartItemType) => void
    removeFromCart: (id: number) => void
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartItemType[]) => {
        items.reduce((ack: number, item) => ack + item.discount * item.price, 0)
    }
    const classes = useStyles()

  return (
    <div className={classes.div}>
        <h2>Your Shopping Cart</h2>
        {cartItems.length === 0 ? <p>No items in cart.</p> : null}
        {cartItems.map(item => (
            <CartItem
                key={item.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
            />
        ))}
        <h2>Total: ${calculateTotal(cartItems)}</h2>
    </div>
  )
}

export default Cart