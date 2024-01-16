import React, { useContext, createContext, useState, useEffect } from "react";

// create context
const MainContext = createContext();

// define a provider component to wrap
const MainProvider = ({ children }) => {
    const [ home, setHome ] = useState('home')
    const [ currentCity, setCurrentCity ] = useState('Leander')
    const [ venueCount, setVenueCount ] = useState()
    const [ currentVenue, setCurrentVenue ] = useState()
    const [ filter, setFilter ] = useState(false)
    const [ placeIcons, setPlaceIcons ] = useState([])
    const [ loggedIn, setLoggedIn ] = useState(true)

    useEffect(() => {
        setVenueCount(5)
    },[])

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

    useEffect(() => {
        console.log(placeIcons)
    },[placeIcons])

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
            home, currentCity, venueCount, listOfStates, setPage, setCity, setVenue, currentVenue, toggleFilter, filter, placeIcons, addPlaceIcons, removePlaceIcons, loggedIn
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