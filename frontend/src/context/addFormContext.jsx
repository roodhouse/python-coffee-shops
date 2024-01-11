import React, { useContext, createContext, useState, useEffect } from "react";

const AddFormContext = createContext();

const AddFormProvider = ({ children }) => {
    const [ step, setStep ] = useState('venue')
    const [ formData, setFormData ] = useState({})

    // select step
    function currentStep(sentStep) {
        setStep(sentStep)
    }

    // update data from forms
    function updateFormData(sentData) {
        setFormData({...formData, ...sentData})
        console.log('form data is...')
    }

    return <AddFormContext.Provider value = 
    {
        {
            step, currentStep, formData, updateFormData
        }
    }>
        {children}
    </AddFormContext.Provider>
};

const useAddForm = () => {
    const addContext = useContext(AddFormContext)
    if (!addContext) {
        throw new Error('useAddForm must be used within a AddFormProvider')
    }
    return addContext
}

export { AddFormProvider, useAddForm}