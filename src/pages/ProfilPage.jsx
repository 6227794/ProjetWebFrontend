import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";


function ProfilePage({setTrigger}) {
    const {id} = useParams();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isConnected');
        setTrigger(prev => !prev);
        navigate('/Connexion');
    }

    const [userData, setUserData] = useState({
        id : "",
        courriel : "",
        nom : "",
        prenom : "",
        nomAffichage : ""
    })
    

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
                <button type="submit" className="mainbutton">Sauvegarder</button>
                <br/>
                <button type="submit" className="mainbutton" onClick={handleLogout}>Se déconnecter</button>

            </form>
        </div>
    );
}

export default ProfilePage;