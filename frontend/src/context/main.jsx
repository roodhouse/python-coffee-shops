import React, { useContext, createContext, useState, useEffect } from "react";

// create context
const MainContext = createContext();

// define a provider component to wrap
const MainProvider = ({ children }) => {
    const [ home, setHome ] = useState('home')
    const [ currentCity, setCurrentCity ] = useState('Leander')
    const [ venueCount, setVenueCount ] = useState()

    useEffect(() => {
        setVenueCount(5)
    },[])

    // select view
    function setPage(page) {
        setHome(page)
    }

    // List of States, should retrieve from DB but for now hard code
    // const listOfStates = ['Alabama', 'New York', 'Texas', 'Virginia']
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
            home, currentCity, venueCount, listOfStates, setPage
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