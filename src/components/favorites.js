import React from "react"
import {useGlobalContext} from '../Context'

export default function Favorites () {
  
    const {favorites, selectMeal, removefromFavorites} = useGlobalContext()

    return (
        <section className="favorites">
            <div className="favorites-content" >
                <h5>Favorites</h5>
                <div className="favorites-container">
                    {favorites.map((item)=>{
                        const {idMeal, strMealThumb:image} = item
                        return (
                            <div key = {idMeal} className="favorite-item">
                                <img src = {image} className="favorites-img img" alt="meal"
                                onClick={()=>selectMeal(idMeal,true)}/>
                                <button className='remove-btn' onClick= {() =>
                                    removefromFavorites(idMeal)}>Remove</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}