import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { CartItemType } from './TodoList'

type Props = {
    item: CartItemType
    addToCart: (clickedItem: CartItemType) => void
    removeFromCart: (id: number) => void
}

const useStyles = makeStyles({
    div: {
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "Arial, Helvetica, sans-serif",
        borderBottom: "1px solid lightblue",
        paddingBottom: "20px"
    },
    information: {
        display: "flex",
        justifyContent: "space-between"
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between"
    }
})

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
    const classes = useStyles()

  return (
    <div className={classes.div}>
        <h3>{item.short_name}</h3>
        <div className={classes.information}>
            <p>Price: ${item.price}</p>
            <p>Total: ${(item.discount * item.price).toFixed(2)}</p>
        </div>
        <div className={classes.buttons}>
            <Button
                size='small'
                disableElevation
                variant='contained'
                onClick={() => removeFromCart(item.id)}
            >
                -
            </Button>
            <Button
                size='small'
                disableElevation
                variant='contained'
                onClick={() => addToCart(item)}
            >
                +
            </Button>
        </div>
        <img src={item.image} alt={item.short_name} />
    </div>
  )
}

export default CartItem