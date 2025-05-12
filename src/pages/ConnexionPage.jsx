import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {apiUrl} from "../../config.js";

function ConnexionPage() {
    const [userData, setUserData] = useState({
        courriel : '',
        motDePasse : ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChage = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const reponse = await axios.post(
                `${apiUrl}/authentification/connexion`,
                {
                    courriel: userData.courriel,
                    motDePasse: userData.motDePasse
                }
/*                {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }*/
            );

            if (reponse.data.succes){
                console.log(reponse.data);
                localStorage.setItem('isConnected', 'true');
                localStorage.setItem('userId', reponse.data.utilisateurId);
                window.dispatchEvent(new Event('storage'));
                navigate('/');

            }else{
                alert('Identifiant incorrecte')
                setError(reponse.data.message)
            }
        }catch (error) {
            setError(error.reponse?.data?.message)
        }
    }

    return (
        <div className='maindivcontent'>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="courriel">Email</label>
                    <input type="email" id="courriel" name="courriel" value={userData.courriel} onChange={handleChage}/>
                </div>
                <div>
                    <label htmlFor="=motDePasse">Mot de passe</label>
                    <input type="password" id="motDePasse" name="motDePasse" value={userData.motDePasse} onChange={handleChage} minLength="8" required />
                </div>

                <button type="submit" className="mainbutton" id="connexion">Se connecter</button>
            </form>

        </div>
    );
}

export default ConnexionPage;
