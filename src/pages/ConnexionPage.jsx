import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {apiUrl} from "../../config.js";

function ConnexionPage() {
    const [courriel, setCourriel] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const reponse = await axios.post(`${apiUrl}/api/authentification/connexion`, {
                courriel: courriel,
                motDePasse: motDePasse
            });

            if (reponse.data.success()){
                {/*localStorage.setItem('user', JSON.stringify({
                    id: reponse.data.id,
                    nomAffichage: reponse.data.nomAffichage
                }));*/}
                navigate('/Homepage')
            }else{
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
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={courriel} onChange={(e) => setCourriel(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="=motDePasse">Mot de passe</label>
                    <input type="password" id="pass" name="motDePasse" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} minLength="8" required />
                </div>

                <button type="submit" className="mainbutton">Se connecter</button>
            </form>

        </div>
    );
}

export default ConnexionPage;

