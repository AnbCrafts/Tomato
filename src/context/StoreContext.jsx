import axios from "axios";
import React, { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = 'https://tomato-backend-b8yf.onrender.com';
  const  [token,setToken] = useState('');
  const [food_list,setFoodlist] = useState([])

  const addToCart = async (itemId) => {
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if(token){
      await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
    }
    
  };
 
  const removeFromCart =async (itemId) => {
    if (cartItems[itemId] === 1) {
      // If only one item, remove it from cart
      const newCartItems = { ...cartItems };
      delete newCartItems[itemId];
      setCartItems(newCartItems);
    } else if (cartItems[itemId] > 1) {
      // Decrease quantity by 1
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));
    }
    if(token){
      await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
  
    // Ensure cartItems is defined and is an object
    if (cartItems && typeof cartItems === 'object') {
      // Iterate over each item in cartItems
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          // Find itemInfo from food_list based on itemId
          let itemInfo = food_list.find((product) => product._id === itemId);
          
          // Ensure itemInfo and itemInfo.price are defined before adding to totalAmount
          if (itemInfo && itemInfo.price) {
            totalAmount += itemInfo.price * cartItems[itemId];
          }
        }
      }
    }
  
    return totalAmount;
  };
  
 
 const fetchFoodList = async ()=>{
  const  response = await axios.get(url+'/api/food/list')
  setFoodlist(response.data.data)
 }

 const loadCartData = async (token)=>{
  const response = await axios.post(url+'/api/cart/get',{},{headers:{token}})
  setCartItems(response.data.cartData);
 
 }




 useEffect(()=>{
   
      
      async function loadData(){
        await fetchFoodList();
      }
      if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        loadCartData(localStorage.getItem('token'));

      }
      loadData();
      
 },[])

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
