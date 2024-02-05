import React, { useContext, createContext, useState, useEffect } from "react";
import authService from '../utils/auth'

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


    // Check for token on load
    useEffect(() => {
        const token = authService.getToken()
        if (token) {
            console.log('token here')
            if (!authService.isTokenExpired(token)) {
                const cur = authService.getProfile()
                console.log(cur)
                setLoggedIn(true)
                
            } else {
                authService.logout()
            }
        } else {
            console.log('no token')
        }
    }, [])

    // fetch requests
    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/venues/")
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
    },[home]) 

        // get review of user when currentVenue changes
        useEffect(() => {
            if (userAuthenticated) {
                // if the userData.reviews contains the name of currentVenue then fetch the review based on user email
                if ( userData.reviews === null ) {
                    console.log('this user has not left a review for this venue')
                } else {
                    if (userData.reviews[0].includes(currentVenue)) {
                        
                        const encodedVenue = encodeURIComponent(currentVenue)
                        const encodedUser = encodeURIComponent(userData.email)
                        
                        fetch(`http://127.0.0.1:5000/api/reviews/${encodedVenue}/${encodedUser}`, {
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
                        console.log('this user has not left a review for this venue')
                    }
                }
            }
        },[currentVenue])
    
    // useEffect(() => {
    //     if (venues !== null) {
    //         console.log(venues.venues[0])
    //         console.log(venues.venues.length)
    //     }
    // },[venues])


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
    },[loggedIn])

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
    }

    // select venue
    function setVenue(venue) {
        setHome('store')
        setCurrentVenue(venue)
    }

    // get single venue data
    useEffect(() => {
        const encodedName = encodeURIComponent(currentVenue)
        fetch(`http://127.0.0.1:5000/api/venues/${encodedName}`)
        .then((response) => response.json())
        .then((data) => {
            setCurrentVenueData(data)
            fetch(`http://127.0.0.1:5000/api/aggregate/${encodedName}`)
            .then((aggResponse) => aggResponse.json())
            .then((aggData) => {
                setCurrentVenueAgg(aggData)
            })
            .catch ((error) => {
                console.error('Error fetching venue data:', error)
            })
        })
        .catch ((error) => {
        console.error('Error fetching venue data:', error)
        })
    },[currentVenue])


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

    // List of States, should retrieve from DB but for now hard code
    const listOfStates = [
        {
            state: 'Alabama',
            cities: ['Birmingham', 'Huntsville'],
        },
        {
            state: 'New York',
            cities: ['New York City', 'Queens', 'Brooklyn','Buffalo'],
        },
        {
            state: 'Texas',
            cities: ['Austin', 'Leander', 'Houston'],
        },
        {
            state: 'Virginia',
            cities: ['Richmond'],
        }
    ]

    return <MainContext.Provider value = 
    {
        {
            home, currentCity, venueCount, listOfStates, setPage, setCity, setVenue, currentVenue, toggleFilter, filter, placeIcons, addPlaceIcons, removePlaceIcons, loggedIn, successLogin, logout,
            venues, userAuthenticated, userData, currentVenueData, currentVenueAgg, review
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