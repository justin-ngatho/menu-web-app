
import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealsUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppContext = React.createContext()

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites')

  if (favorites){
    favorites = JSON.parse(localStorage.getItem('favorites'))
  } else {
    favorites = []
  }
  return favorites
}

const AppProvider = ({children}) => {

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState ('')
    const [showModal, setShowModal] = useState (false)
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());   

    const fetchMeals = async(url) => {
      setLoading(true)
    try {  
      const {data} = await axios(url)

      if (data.meals) {
        setMeals(data.meals)
      } else {
        setMeals([])
      }
      
    } catch (error) {
              console.log(error.response)
    }
    setLoading(false)
  }

  const fetchRandomMeal = () => {
    fetchMeals (randomMealsUrl)
  }

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal)
    } else{
      meal = meals.find((meal) => meal.idMeal === idMeal)
    }
   
    setSelectedMeal(meal)
    setShowModal(true);
   }

   const closeModal = () => {
    setShowModal(false);
   }

   const addToFavorites  = (idMeal) => {
    const alreadyFavorites = favorites.find((meal) => meal.idMeal === idMeal)
    if (alreadyFavorites) return 
    const meal = meals.find((meal) => meal.idMeal === idMeal)
    const updatedFavorites = [...favorites, meal];
    setFavorites (updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))

   }

   const removefromFavorites  = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal)
    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    
   }


  useEffect (() => {    
    fetchMeals(allMealsUrl)
}, [])

    useEffect (() => { 
      if (!searchTerm) return   
          fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])
  
    return (
        <AppContext.Provider value= {{ loading, meals, setSearchTerm, fetchRandomMeal, 
          showModal, selectMeal, selectedMeal, closeModal, addToFavorites, removefromFavorites, favorites }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
export {AppContext, AppProvider}