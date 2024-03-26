import React, { useContext, createContext, useState, useEffect } from "react";
import authService from '../utils/auth'
import { initMap } from "../utils/mapFunctions/initMap";
import disableScroll from "../utils/scroll/disableScroll";
import enableScroll from "../utils/scroll/enableScroll";

// create context
const MainContext = createContext();

// define a provider component to wrap
const MainProvider = ({ children }) => {
    const [ home, setHome ] = useState('home')
    const [ currentCity, setCurrentCity ] = useState('Leander')
    const [ venueCount, setVenueCount ] = useState()
    const [ currentVenue, setCurrentVenue ] = useState()
    const [ currentVenueData, setCurrentVenueData ] = useState()
    const [ currentVenueAgg, setCurrentVenueAgg ] = useState()
    const [ filter, setFilter ] = useState(false)
    const [ placeIcons, setPlaceIcons ] = useState([])
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ userData, setUserData ] = useState(null)
    const [ userAuthenticated, setUserAuthenticated ] = useState(false)
    const [ venues, setVenues] = useState(null)
    const [ allReviews, setAllReviews ] = useState(null)
    const [ review, setReview ] = useState(null)
    const [ aggDataUpdate, setAggDataUpdate] = useState(false)
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ avatarMod, setAvatarMod ] = useState(false)
    const [ currentPlaceId, setCurrentPlaceId ] = useState()

    // Check for token on load
    useEffect(() => {
        const token = authService.getToken()
        if (token) {
            if (!authService.isTokenExpired(token)) {
                setLoggedIn(true)
                
            } else {
                authService.logout()
            }
        }
    }, [])

    // fetch requests
    useEffect(() => {
        // need to adjust this to get only the venues with the same city name as currentCity --- here!
        if (home === 'home') {
            fetch(`http://127.0.0.1:5000/api/venues/${currentCity}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok")
                    }
                    return response.json()
                })
                .then((data) => {
                    setVenues(data)
                })
                .catch((error) => {
                    console.error("Error fetching data:", error)
                })
            
            fetch("http://127.0.0.1:5000/api/reviews/")
                .then((response) => {
                    if (!response.ok ) {
                        throw new Error("Network response was not ok")
                    }
                    return response.json()
                })
                .then((data) => {
                    setAllReviews(data)
                })
                .catch((error) => {
                    console.error("Error fetching data:", error)
                })
        }
    },[home, currentCity]) 

        // get review of user when currentVenue changes
        useEffect(() => {
            if (userAuthenticated) {
                if ( userData.reviews === null ) {
                    setReview(null)
                } else {
                    if (userData.reviews.includes(currentPlaceId)) {
                        
                        const encodedId = encodeURIComponent(currentPlaceId)
                        const encodedUser = encodeURIComponent(userData.email)
                        
                        fetch(`http://127.0.0.1:5000/api/reviews/${encodedId}/${encodedUser}`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('id_token')}`
                            }
                        })
                        .then((response) => {
                            if ( !response.ok ) {
                                throw new Error('Network response was not ok')
                            }
                            return response.json()
                        })
                        .then((data) => {
                            setReview(data)
                        })
                        .catch((error) => {
                            console.error("Error fetching user review data", error)
                        })
                    } else {
                        setReview(null)
                    }
                }
            }
        },[currentVenue, aggDataUpdate])
    
    // login success
    const successLogin = (e) => {
        setLoggedIn(true)
        setHome('dash')
    }

    // logout
    const logout = async (e) => {
        console.log('logout click')
        const response = await fetch('http://127.0.0.1:5000/users/logout', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'}
        })
        if ( response.ok ) {
            localStorage.removeItem('id_token')
            setUserAuthenticated(false)
            setLoggedIn(false)
            setUserData(null)
            setHome('home')
        } else {
            alert(response.statusText)
        }
    }
    
    useEffect(() => {
        if (loggedIn) { 
        
            const token = localStorage.getItem('id_token')

            fetch('http://127.0.0.1:5000/api/user', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.user_id) {
                        setUserAuthenticated(true)
                        setUserData(data)
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error)
                })
        }
    },[loggedIn, venues, aggDataUpdate])

    useEffect(() => {
        if (venues !== null) {
            setVenueCount(venues.venues.length)
        }
    },[venues])

    // select view
    function setPage(page) {
        setHome(page)
    }

    // select city
    function setCity(city) {
        setCurrentCity(city)
        setHome('home')
    }

    // select venue
    function setVenue(placeId, venue) { 
        console.log(placeId, venue)
        setHome('store')
        setCurrentVenue(venue)
        setCurrentPlaceId(placeId)
    }

    // clear venue
    function clearVenue() {
        setCurrentVenue(null)
    }

    // clear current venue data
    function clearCurrentVenueData() {
        setCurrentVenueData(null)
        setCurrentPlaceId(null)
    }

    // get single venue data
    useEffect(() => {
        if (home === 'store') {
            console.log('in currentVenue useEffect')
            console.log(currentVenue, currentPlaceId)
            const encodedId = encodeURIComponent(currentPlaceId)
            try {
                console.log('test')
                fetch(`http://127.0.0.1:5000/api/venues/${encodedId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setCurrentVenueData(data)
                const reviews = data.reviews
                fetch(`http://127.0.0.1:5000/api/aggregate/${encodedId}`) 
                .then((aggResponse) => aggResponse.json())
                .then((aggData) => {
                    console.log(aggData)
                    setCurrentVenueAgg(aggData)
                    setAggDataUpdate(false)
                })
                .catch ((error) => {
                    console.error('Error fetching venue data:', error)
                })
            })
            .catch ((error) => {
            console.error('Error fetching venue data:', error)
            })

            console.log('currentVenueData is: ', currentVenueData)
            } catch(error) {
                console.error('error occurred in useEffect to get single venue data', error)
            }
            
        }
    },[currentVenue, aggDataUpdate, home, currentPlaceId])


    // agg data updated function
    function aggDataUpdated(data) {
        setAggDataUpdate(data)
    }

    // toggle filter
    function toggleFilter() {
        if (filter) {
            setFilter(false)
        } else {
            setFilter(true)
        }
    }

    // set place icons
    function addPlaceIcons(icon) {
        let currentIcons = [...placeIcons]
        currentIcons.push(icon)
        setPlaceIcons(currentIcons)
    }

    // remove place icons
    function removePlaceIcons(icon) {
        let currentIcons = [...placeIcons]
        currentIcons.splice(icon, 1)
        setPlaceIcons(currentIcons)
    }

    // display avatar mask and module
    const showMod = () => {
        disableScroll()
        let avatarMask = document.getElementById('avatarMask')
        avatarMask.classList.add('bg-gray', 'w-full', 'absolute', 'h-screen', 'opacity-25')
        setAvatarMod(true) 
    }

    // close the avatar mask and module
     const closeMod = () => {
        enableScroll()
        let avatarMask = document.getElementById('avatarMask')
        avatarMask.classList.remove('bg-gray', 'w-full', 'absolute', 'h-screen', 'opacity-25')
        setAvatarMod(false) 
  }

    return <MainContext.Provider value = 
    {
        {
            home, currentCity, venueCount, setPage, setCity, setVenue, currentVenue, toggleFilter, filter, placeIcons, addPlaceIcons, removePlaceIcons, loggedIn, successLogin, logout,
            venues, userAuthenticated, userData, currentVenueData, currentVenueAgg, review, aggDataUpdated, clearVenue, clearCurrentVenueData, isLoaded, showMod, avatarMod, closeMod, currentPlaceId
        }
    }>
        {children}
    </MainContext.Provider>
};

// create custom hook for using the context
const useMain = () => {
    const context = useContext(MainContext)
    if (!context) {
        throw new Error('useMain must be used within a MainProvider');
    }
    return context;
};

export { MainProvider, useMain }