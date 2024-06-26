import React, { useContext, createContext, useState, useEffect } from "react";
import authService from '../utils/auth'
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
    const [ currentFilter, setCurrentFilter ] = useState([])
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
    const [ count, setCount ] = useState(0)
    const [ history, setHistory ] = useState(null)

    const googleAPI = process.env.REACT_APP_GOOGLE_API_KEY;

    // scroll to top on home change
    useEffect(() => {
        window.scrollTo(0,0)
    },[home])

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

    // set current city
    useEffect(() => {
        if (localStorage.getItem('recentCity') !== '') {
            setCurrentCity(localStorage.getItem('recentCity'))
            localStorage.setItem('recentCity', '')
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleAPI}`)
                .then(response => response.json())
                .then(data => {
                    const addressComponents = data.results[0].address_components
                    const cityComponent = addressComponents.find(component => component.types.includes('locality'))
                    const city = cityComponent ? cityComponent.long_name : 'Unknown'
                    setCurrentCity(city)
                })
                .catch(error => {
                    console.error('Error fetching geolocation data:', error)
                })
            }, 
            (error) => {
                console.error('Error retrieving geolocation:', error)
            })
        }
    },[])

    // fetch requests
    useEffect(() => {
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
        if (history) {
            setHome(history[0])
            setCurrentVenue(history[1])
            setHistory(null)
        } else {
            setHome('dash')
        }
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

    // change count on store page for comments
    let changeCount = (data) => {
        setCount(data)
    }

    // get single venue data
    useEffect(() => {
        if (home === 'store') {
            const encodedId = encodeURIComponent(currentPlaceId)
            try {
                fetch(`http://127.0.0.1:5000/api/venues/${encodedId}`)
            .then((response) => response.json())
            .then((data) => {
                setCurrentVenueData(data)
                const reviews = data.reviews
                fetch(`http://127.0.0.1:5000/api/aggregate/${encodedId}`) 
                .then((aggResponse) => aggResponse.json())
                .then((aggData) => {
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
        let currentLabels = [...currentFilter]
        currentIcons.push(icon)
        currentLabels.push(icon.label)
        setPlaceIcons(currentIcons)
        setCurrentFilter(currentLabels)
    }

    // remove place icons
    function removePlaceIcons(icon) {
        let currentIcons = [...placeIcons]
        let currentLabels = [...currentFilter]
        currentIcons.splice(icon, 1)
        currentLabels.splice(icon.label, 1)
        setPlaceIcons(currentIcons)
        setCurrentFilter(currentLabels)
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
            venues, userAuthenticated, userData, currentVenueData, currentVenueAgg, review, aggDataUpdated, clearVenue, clearCurrentVenueData, isLoaded, showMod, avatarMod, closeMod, currentPlaceId, count, changeCount,
            currentFilter, setHistory, history
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