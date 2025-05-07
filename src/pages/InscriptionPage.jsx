import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';




function InscriptionPage() {

    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        nomAffichage:'',
        courriel: '',
        motDePasse: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e){
        e.preventDefault();
        setError('');

        try{
            const info = {
                nom : userData.nom,
                prenom : userData.prenom,
                nomAffichage : userData.nomAffichage,
                courriel : userData.courriel,
                motDePasse : userData.motDePasse
            }

            const response = await axios.post(
                'http://localhost:7246/api/authentification/inscription',
                info,
                //Comme dans Postman
                {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }
            );

            if (response.data.succes){
                navigate('/Connexion')
                localStorage.setItem('user', JSON.stringify({
                    nomAffichage : userData.nomAffichage,
                    courriel : userData.courriel
                    }
                ));
                console.log('Inscription réussi yippi');
            }else {
                setError(response.data.message || "Erreur")
            }
        }catch (err) {
            console.error(err)
            setError('Échec d\'inscription');
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
                <button type="submit" className="mainbutton" >Sinscrire</button>
            </form>
        </div>
    );
}

export default InscriptionPage;