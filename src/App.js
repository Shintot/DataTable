import React, {useState} from 'react';
import {CiSquarePlus} from "react-icons/ci";
import './App.css';
import {
    FilteredPaginatedTable,
} from "./FilteredPaginatedTable";

function App() {
    const headers = [
        {key: 'firstName', label: 'Prénom'},
        {key: 'lastName', label: 'Nom'},
        {key: 'email', label: 'Email'},
        {key: 'infos', label: 'Infos'},
        {key: 'username', label: 'Nom d’utilisateur'},
        {key: 'age', label: 'Age'},
        {key: 'city', label: 'city'},
        {key: 'phoneNumber', label: 'phoneNumber'}
    ];


    const data = [
        {
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@example.com',
            infos: 'Client régulier',
            username: 'jdupont',
            age: 35,
            city: 'Paris',
            lastPurchaseAmount: 150,
            membershipLevel: 'Gold',
            phoneNumber: '01 23 45 67 89'
        },
        {
            firstName: 'Marie',
            lastName: 'Durand',
            email: 'marie.durand@example.com',
            infos: 'Nouveau client',
            username: 'mdurand',
            age: 28,
            city: 'Lyon',
            lastPurchaseAmount: 50,
            membershipLevel: 'Silver',
            phoneNumber: '01 23 45 67 89'
        },
        {
            firstName: 'Luc',
            lastName: 'Martin',
            email: 'luc.martin@example.com',
            infos: 'Client VIP',
            username: 'lmartin',
            age: 45,
            city: 'Marseille',
            lastPurchaseAmount: 500,
            membershipLevel: 'Platinum',
            phoneNumber: '01 23 45 67 89'
        },
        {
            firstName: 'Sophie',
            lastName: 'Lemaire',
            email: 'sophie.lemaire@example.com',
            infos: 'Achat récent',
            username: 'slemaire',
            age: 30,
            city: 'Bordeaux',
            lastPurchaseAmount: 80,
            membershipLevel: 'Bronze',
            phoneNumber: '01 23 45 67 89'
        },
        {
            firstName: 'Émilie',
            lastName: 'Perrin',
            email: 'emilie.perrin@example.com',
            infos: 'Client en attente',
            username: 'eperrin',
            age: 33,
            city: 'Toulouse',
            lastPurchaseAmount: 0,
            membershipLevel: 'Basic',
            phoneNumber: '01 23 45 67 89'
        },
        {
            firstName: 'François',
            lastName: 'Mercier',
            email: 'francois.mercier@example.com',
            infos: 'Consultation',
            username: 'fmercier',
            age: 40,
            city: 'Nantes',
            lastPurchaseAmount: 0,
            membershipLevel: 'Basic',
            phoneNumber: '01 23 45 67 89'
        },
        {
            firstName: 'Chloé',
            lastName: 'Garnier',
            email: 'chloe.garnier@example.com',
            infos: 'Client potentiel',
            username: 'cgarnier',
            age: 25,
            city: 'Nice',
            lastPurchaseAmount: 0,
            membershipLevel: 'Basic',
            phoneNumber: '01 23 45 67 89'
        },
        {
            firstName: 'Étienne',
            lastName: 'Brun',
            email: 'etienne.brun@example.com',
            infos: 'Client fidèle',
            username: 'ebrun',
            age: 50,
            city: 'Strasbourg',
            lastPurchaseAmount: 200,
            membershipLevel: 'Gold',
            phoneNumber: '01 23 45 67 89'
        },
        {
            firstName: 'Louise',
            lastName: 'David',
            email: 'louise.david@example.com',
            infos: 'Abonnement annuel',
            username: 'ldavid',
            age: 37,
            city: 'Lille',
            lastPurchaseAmount: 300,
            membershipLevel: 'Silver',
            phoneNumber: '01 23 45 67 89'
        },
        {
            firstName: 'Gabriel',
            lastName: 'Moreau',
            email: 'gabriel.moreau@example.com',
            infos: 'Premier achat',
            username: 'gmoreau',
            age: 29,
            city: 'Rennes',
            lastPurchaseAmount: 20,
            membershipLevel: 'Bronze',
            phoneNumber: '01 23 45 67 89'
        },
        {
            firstName: 'François',
            lastName: 'Mercier',
            email: 'francois.mercier@example.com',
            infos: 'Consultation',
            username: 'fmercier',
            age: 40,
            city: 'Nantes',
            lastPurchaseAmount: 0,
            membershipLevel: 'Basic',
            phoneNumber: '01 23 45 67 89'
        },
        {
            firstName: 'François',
            lastName: 'Mercier',
            email: 'francois.mercier@example.com',
            infos: 'Consultation',
            username: 'fmercier',
            age: 40,
            city: 'Nantes',
            lastPurchaseAmount: 0,
            membershipLevel: 'Basic',
            phoneNumber: '01 23 45 67 89'
        },
    ];


    return (
        <>
            <div className="w-[1200px] mx-auto mt-8">
                <FilteredPaginatedTable data={data} headers={headers}/>
            </div>
        </>
    );
}

export default App;
