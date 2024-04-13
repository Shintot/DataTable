import React, {useState} from 'react';
import './App.css';
import {
    FilteredPaginatedTable,
    TitleTable
} from "./components/Table";

function App() {
const headers = [
    { key: 'firstName', label: 'Prénom' },
    { key: 'lastName', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'infos', label: 'Infos' },
    { key: 'username', label: 'Nom d’utilisateur' }
];


    const data = [
        {
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@example.com',
            infos: 'Client régulier',
            username: 'jdupont'
        },
        {
            firstName: 'Marie',
            lastName: 'Durand',
            email: 'marie.durand@example.com',
            infos: 'Nouveau client',
            username: 'mdurand'
        },
        {
            firstName: 'Luc',
            lastName: 'Martin',
            email: 'luc.martin@example.com',
            infos: 'Client VIP',
            username: 'lmartin'
        },
        {
            firstName: 'Sophie',
            lastName: 'Lemaire',
            email: 'sophie.lemaire@example.com',
            infos: 'Achat récent',
            username: 'slemaire'
        },
        {
            firstName: 'Émilie',
            lastName: 'Perrin',
            email: 'emilie.perrin@example.com',
            infos: 'Client en attente',
            username: 'eperrin'
        },
        {
            firstName: 'François',
            lastName: 'Mercier',
            email: 'francois.mercier@example.com',
            infos: 'Consultation ',
            username: 'fmercier'
        },
        {
            firstName: 'Chloé',
            lastName: 'Garnier',
            email: 'chloe.garnier@example.com',
            infos: 'Client potentiel',
            username: 'cgarnier'
        },
        {
            firstName: 'Étienne',
            lastName: 'Brun',
            email: 'etienne.brun@example.com',
            infos: 'Client fidèle',
            username: 'ebrun'
        },
        {
            firstName: 'Louise',
            lastName: 'David',
            email: 'louise.david@example.com',
            infos: 'Abonnement annuel',
            username: 'ldavid'
        },
        {
            firstName: 'Gabriel',
            lastName: 'Moreau',
            email: 'gabriel.moreau@example.com',
            infos: 'Premier achat',
            username: 'gmoreau'
        },
        {
            firstName: 'François',
            lastName: 'Mercier',
            email: 'francois.mercier@example.com',
            infos: 'Consultation ',
            username: 'fmercier'
        },
        {
            firstName: 'Chloé',
            lastName: 'Garnier',
            email: 'chloe.garnier@example.com',
            infos: 'Client potentiel',
            username: 'cgarnier'
        },
        {
            firstName: 'Étienne',
            lastName: 'Brun',
            email: 'etienne.brun@example.com',
            infos: 'Client fidèle',
            username: 'ebrun'
        },
        {
            firstName: 'Louise',
            lastName: 'David',
            email: 'louise.david@example.com',
            infos: 'Abonnement annuel',
            username: 'ldavid'
        }
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
