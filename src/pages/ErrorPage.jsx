import React from 'react';
import errorbg from '../assets/empty-plate.jpg'

function ErrorPage() {
    return (
        <div className='errorsection'>
            <img className='errorbg' src={errorbg} alt="Empty plate with bread crumbs" />
            <div className='errortitle'>
                <h1 className='cltbutbeige'>Oups{'\u00A0'}! Erreur 404</h1>
            </div>

        </div>
    );
}

export default ErrorPage;