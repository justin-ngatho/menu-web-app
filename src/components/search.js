import React from "react"
import { useState } from "react"
import { useGlobalContext } from "../Context"

export default function Search () {

    const [text, setText] = useState("");
    const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

    const handleChange = function (e) {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text) {
            setSearchTerm(text)
            
        }
    }

    const handleRandomMeal = ()=> {
        setSearchTerm ('')
        setText('')
        fetchRandomMeal ()
    }

    return (
        <header className="search-container">
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="search a meal" value={text} onChange={handleChange} className="form-input"/>
            <button type="submit" className="btn">Search</button>
            <button type="button" className="btn btn-hipster" onClick={handleRandomMeal}>Random Meals!</button>
            </form>
        </header>
    )
}