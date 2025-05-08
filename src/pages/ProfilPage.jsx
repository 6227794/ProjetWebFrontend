import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";


function ProfilePage({setTrigger}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isConnected');
        setTrigger(prev => !prev);
        navigate('/Connexion');
    }

    return (
        <div className='maindivcontent'>
            <h1>Mon profil</h1>
            <form>
                <div>
                    <label for="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom"/>
                </div>
                <div>
                    <label for="nom">Nom</label>
                    <input type="text" id="nom" name="nom"/>
                </div>
                <div>
                    <label for="nomAffichage">Nom d'affichage</label>
                    <input type="text" id="nomAffichage" name="nomAffichage"/>
                </div>
                {/* Validation si changement courriel */}
                <div className='lastformdiv'>
                    <label for="courriel">Courriel</label>
                    <input type="email" id="courriel" name="courriel"/>
                </div>
                {/* Ajouter mdp plus tard */}
                <button type="submit" className="mainbutton">Sauvegarder</button>
                <br/>
                <button type="submit" className="mainbutton" onClick={handleLogout}>Se déconnecter</button>

            </form>
        </div>
    );
}

export default ProfilePage;