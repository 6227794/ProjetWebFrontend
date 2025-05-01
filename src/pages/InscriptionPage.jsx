import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {apiUrl} from "../../config.js";
import error from "eslint-plugin-react/lib/util/error.js";


function InscriptionPage() {

    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        nomAffichage:'',
        courriel: '',
        motDePasse: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const response = await axios.post(
                'http://localhost:7246/api/authentification/inscription',
                userData
            );
            if (response.data.success()){
                alert('Inscription réussi yippi, connectez vous');
                navigate('/Connexion')
            }else {
                setError(response.data.message)
            }
        }catch (err){
            setError('Échec dinscription');
        }finally {
            setLoading(false)
        }
    }



    return (
        <div className='maindivcontent'>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom" value={userData.prenom} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" name="nom" value={userData.nom} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="nomAffichage">Nom affichage</label>
                    <input type="text" id="nomAffichage" name="nomAffichage" value={userData.nomAffichage} onChange={handleChange}/>
                </div>
                {/* Validation si changement courriel */}
                <div>
                    <label htmlFor="courriel">Courriel</label>
                    <input type="email" id="courriel" name="courriel" value={userData.courriel} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="motDePasse">Mot de passe</label>
                    <input type="password" id="pass" name="motDePasse" minLength="8" required value={userData.motDePasse} onChange={handleChange}/>
                </div>
                <button type="submit" className="mainbutton">Sinscrire</button>
            </form>
        </div>
    );
}

export default InscriptionPage;