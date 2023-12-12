import React from "react"
import { useGlobalContext } from "../Context"

export default function Modal () {
    const { selectedMeal, closeModal } = useGlobalContext()
    const { strMealThumb:image, strMeal:title, strInstructions:text, strSource:source} = selectedMeal;
    return (
        <aside className="modal-overlay">
            <div className="modal-container" >
              <img src = {image} alt = {title} className="img modal-img"/>
              <div className="modal-content">
                <h2>{title}</h2>
                <p>Cooking Instructions</p>
                <p>{text}</p>
                <a href= {source} target="_blank" rel= 'noopener noreferrer'>Original Source</a>
                <button className="btn btn-hipster close-btn" onClick={closeModal}>close</button>
              </div>
               
            </div>
        </aside>
    )
}