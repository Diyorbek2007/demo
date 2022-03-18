import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { CartItemType } from './TodoList'

type Props = {
    item: CartItemType
    handleAddToCart: (clickedItem: CartItemType) => void
}

const useStyles = makeStyles({
    divs: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "100%",
        border: "1px solid lightblue",
        borderRadius: "20px",
        height: "100%"
    },
    button: {
        borderRadius: "0 0 20px 20px"
    },
    img: {
        maxHeight: "250px",
        objectFit: "cover",
        borderRadius: "20px 20px 0 0"
    },
    div: {
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "1rem",
        height: "100%"
    }
})

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
    const classes = useStyles()

  return (
    <div className={classes.divs}>
        <img className={classes.img} src={item.image} alt={item.short_name} />
        <div className={classes.div}>
            <h3>{item.short_name}</h3>
            <p>{item.discount}</p>
            <h3>${item.price}</h3>
        </div>
        <Button className={classes.button} onClick={() => handleAddToCart(item)}>Savatchaga</Button>
    </div>
  )
}

export default Item