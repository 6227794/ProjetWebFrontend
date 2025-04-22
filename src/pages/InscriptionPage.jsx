import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {apiUrl} from "../../config.js";
import error from "eslint-plugin-react/lib/util/error.js";

function InscriptionPage() {

    const [inscriptionData, setInscriptionData] = useState({
        utilisateur : {
            nom: "",
            prenom: "",
            nomAffichage: ""
        },

        identifiant : {
            courriel: "",
            motDePasse: ""
        }
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (["nom", "prenom", "nomAffichage"].includes(name)){
            setInscriptionData({
                ...inscriptionData,
                utilisateur: {
                    ...inscriptionData.utilisateur,
                    [name]: value
                }
            });
        }else if (["courriel", "motDePasse"].includes(name)){
            setInscriptionData({
                ...inscriptionData,
                identifiant: {
                    ...inscriptionData.identifiant,
                    [name]: value
                }
            });
        }
    };

    const submitInscription = async (e) => {
        e.preventDefault();
        console.log(inscriptionData);
        try {
            const result = await axios.post(`${apiUrl}/data/inscription`, inscriptionData);
            console.log("Utilisateur inscrit, son id est ", result.data);
            navigate("/Connexion")
        }catch (error) {
            console.error("Erruer lors de l'inscription", error);
        }
    };


    return (
        <div className='maindivcontent'>
            <h1>Inscription</h1>
            <form onSubmit={submitInscription}>
                <div>
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" name="nom" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="nomAffichage">Nom d'affichage</label>
                    <input type="text" id="nomAffichage" name="nomAffichage" onChange={handleChange}/>
                </div>
                {/* Validation si changement courriel */}
                <div>
                    <label htmlFor="courriel">Courriel</label>
                    <input type="email" id="courriel" name="courriel" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="motDePasse">Mot de passe</label>
                    <input type="password" id="pass" name="motDePasse" minLength="8" required onChange={handleChange}/>
                </div>
                {/* Ajouter mdp plus tard */}
                <button type="submit" className="mainbutton">S'inscrire</button>
            </form>
        </div>
    );
}

export default InscriptionPage;