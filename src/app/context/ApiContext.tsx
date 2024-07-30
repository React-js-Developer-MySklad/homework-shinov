import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {Company} from "../App";

interface ApiContextType {
    companies: Company[];
    fetchCompanies: () => void;
    createCompany: (company: Omit<Company, 'id'>) => void;
}


const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [companies, setCompanies] = useState<Company[]>([]);

    const fetchCompanies = async () => {
        const response = await fetch('http://localhost:3001/companies');
        const data = await response.json();
        setCompanies(data);
    };

    const createCompany = async (company: Company) => {
        const response = await fetch('http://localhost:3001/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(company),
        });
        const newCompany = await response.json();
        setCompanies(prev => [...prev, newCompany]);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <ApiContext.Provider value={{companies, fetchCompanies, createCompany}}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => {
    return useContext(ApiContext);
};
