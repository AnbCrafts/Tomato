import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'


export default function FoodDisplay({category}) {

    const {food_list} = useContext(StoreContext)
  return (
    <div>
        <div className="food-display" id="food-display">
            <h2>Top Dishes Near You</h2>
            <div className="food-display-list">
                {food_list.map((item,index)=>{
                    if(category==="All" || category===item.category){

                    
                    return(
                        // <div className="error"></div>
                        <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price}  image={item.image}/>
                    )
                }

                })}
            </div>

        </div>
      
    </div>
  )
}
