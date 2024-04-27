import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [path, setPath] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    axios.get(`http://localhost:7001/get-cart/${user.id}`)
      .then(res => {
        setCartItems(res.data.data);
        setPath(res.data.filepath);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  const handleUpdateQuantity = async (itemId, type) => {
    try {
      await axios.put(`http://localhost:7001/update-quantity/${itemId}?type=${type}`);
      
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:7001/get-cart/${user.id}`);
      setCartItems(response.data.data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const calculateTotalPrice = (price, quantity) => {
    return (price * quantity).toFixed(2); 
  };

  return (
    <div>
      <div>
        {cartItems &&
          cartItems.map((image, ind) => {
            return (
              <div key={ind} style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                borderBottom: "1px solid green",
                width: "100%",
              
                padding: "10px"



              }}>
                <div>
                  <img src={`${path}${image.image}`} alt='' className='cartimg' />

                </div>
                <div style={{ display:"flex"}} >
                  <div style={{ paddingRight:"0px", fontWeight:"bold"}}> 
                  
                    <p> Name: {image.title}</p>

                  </div>
                  <div style={{ paddingLeft:"60px" ,fontWeight:"bold"}}>
                    <p> Price: {image.price}</p>

                  </div>
                  <div  style={{ paddingLeft:"60px", fontWeight:"bold"}}>
                    <p> Quantity: {image.quantity}</p>

                  </div>
                  <div  style={{ paddingLeft:"60px" ,fontWeight:"bold"}}>
                    <p> Total Price: {calculateTotalPrice(image.price, image.quantity)}</p>

                  </div>
                </div>

                <div style={{width:"200px" , height:"100px" ,display:"flex" ,justifyContent:"center", alignItems:"center" , gap:"15px"}}>
                  <button  onClick={() => handleUpdateQuantity(image._id, 'inc')} style={{borderRadius:"50%" , border:"none" , backgroundColor:"orange" ,  height:"40px" , width:"40px"}}>
                    <span style={{}}>+</span>
                  </button>
                  <button onClick={() => handleUpdateQuantity(image._id, 'desc')}style={{borderRadius:"50%" ,backgroundColor:"skyblue" , border:"none", height:"40px" , width:"40px"}}>
                    <span style={{}}>-</span>
                  </button>
                </div>


              </div>
            );
          })}
      </div>
      <br />

      <Button onClick={() => { navigate("/products") }}>Add More Products</Button>
    </div>
  );
}

export default Cart;
