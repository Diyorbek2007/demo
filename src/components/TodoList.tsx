import React, { useEffect, useState } from 'react';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { Container, Drawer, Grid } from '@mui/material';
import Badge from '@mui/material/Badge';
import Photo from "../images/image 45.png"
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { API_URL } from '../constants/ApiConstants';
import Korzina from "../images/Korzina.png"
import { Link } from 'react-router-dom';
import Cart from './Cart';
import { AddShoppingCart } from '@mui/icons-material';
import Item from './Item';

const useStyles = makeStyles({
    box: {
        display: "flex",
        flexWrap: "wrap"
    },
    text_h1: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "22px",
        display: "flex",
        alignItems: "center",
        color: "#000000",
        marginTop: "20px !important",
    },
    card: {
        maxWidth: "220px",
        backgroundColor: "white",
        boxSizing: "border-box",
        borderRadius: "5px",
        padding: "28px 20px 20px 20px",
        margin: "10px",
        border: "2px solid #065374"
    },
    button: {
        width: "180px",
        color: "#065374",
        padding: "12px 32px 11px 31px",
        borderRadius: "231px",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "14px",
        border: "2px solid #065374",
        display: "flex",
        alignItems: "center"
    },
    name: {
        width: "180px",
        height: "60px",
        marginBottom: "10px",
        marginTop: "10px"
    },
    label: {
        fontFamily: "Electrolux Sans",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "15px",
        margin: "0"
    },
    description: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        margin: "0"
    },
    price: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "18px",
        margin: "0"
    },
    price_sale: {
        color: "#065374",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
        margin: "0",
        textDecorationLine: "line-through"
    },
    prices: {
        width: "180px",
        height: "47px",
        marginBottom: "10px"
    },
    img: {
        display: "block",
        margin: "auto",
        border: "2px solid #065374",
        borderRadius: "5px"
    },
    styledButton: {
        position: "fixed",
        zIndex: "100",
        right: "20px",
        top: "20px"
    }
})

export type CartItemType = {
    id: number;
    short_name: string;
    discount: number;
    price: number;
    after_discount: number;
    image: string;
}

const TodoList: React.FC = () => {
    const { error, loading, todos } = useTypedSelector(state => state.todo)
    const { fetchTodos } = useActions()
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[])
    const classes = useStyles()

    useEffect(() => {
        fetchTodos()
    }, [])

    if (loading) {
        return (
            <img style={{ display: "flex", margin: "auto", marginTop: "18%", alignItems: "center" }} src="https://static.wixstatic.com/media/d27180_8ba5d7d0d8ce459aa955f57c6ff5782b~mv2.gif" alt="" />
        )
    }
    if (error) {
        return <h1 style={{ marginTop: "23%", textAlign: "center" }}>{error}</h1>
    }

    const getTotalItems = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.discount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems(prev => {
            const isItemInCart = prev.find(item => item.id === clickedItem.id)
            console.log(isItemInCart);
            

            if(isItemInCart){
                return prev.map(item =>
                    item.id === clickedItem.id
                        ? { ...item, discount: item.discount + 1 }   
                        : item 
                )
            }
            return [...prev, { ...clickedItem, discount: 1 }]
        })
    }

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev => 
            prev.reduce((ack, item) => {
                if(item.id === id){
                    if(item.discount === 1) return ack
                    return [...ack, { ...item, discount: item.discount - 1 }]
                } else {
                    return [...ack, item]
                }
            }, [] as CartItemType[])    
        )
    }

    // return (
    //     <>
    //         <Container maxWidth="xl">
    //             <Box className={classes.box}>
    //                 {todos.map(todo =>
    //                     <Grid className={classes.card}>
    //                         <div>
    //                             <img src={Photo} className={classes.img} alt="" />
    //                             <div className={classes.name}>
    //                                 <p className={classes.label}>{todo.short_name}</p>
    //                                 <p className={classes.description}>Category: {todo.category.name}</p>
    //                             </div>
    //                             <div>
    //                                 <p>Discount: {todo.discount}</p>
    //                             </div>
    //                             <div className={classes.prices}>
    //                                 <p className={classes.price_sale}>{todo.price}</p>
    //                                 <p className={classes.price}>{todo.price} so’m</p>
    //                             </div>
    //                             {/* <Link to="/cart"> */}
    //                                 <button className={classes.button}><img src={Korzina} style={{ marginRight: "10px" }} alt="" /> Savatchaga</button>
    //                             {/* </Link> */}
    //                         </div>
    //                     </Grid>
    //                 )}
    //             </Box>
    //         </Container>
    //     </>
    // );

    return (
        <>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <div onClick={() => setCartOpen(true)} className={classes.styledButton}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCart />
                </Badge>
            </div>
            <Grid container spacing={3}>
                {todos?.map(item => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
};

export default TodoList;