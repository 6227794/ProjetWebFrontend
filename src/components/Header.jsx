import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../../config.js";


function Header() {
    const isConnected = localStorage.getItem('isConnected') === ('true');
    const [profilMenuLien, setProfilMenuLien] = useState("Connexion");
    const [profilSousMenu, setProfilSousMenu] = useState("Connexion");
    const [profilSousMenu2Lien, setProfilSousMenu2Lien] = useState("Connexion");
    const [profilSousMenu1Lien, setProfilSousMenu1Lien] = useState("Connexion");
    const [tabCategories, setCategories] = useState([]);

    const populateCategories = async () => {
        const result = await axios.get(`${apiUrl}/categorie/getAllCategorie`);
        setCategories(result.data);
    }

    useEffect(() => {
        const id = localStorage.getItem('userId');
        if(isConnected === true && id){
            setProfilSousMenu("Mon profil");
            setProfilMenuLien(`Profil/${id}`);
            setProfilSousMenu2Lien(`Profil/${id}`);
            setProfilSousMenu1Lien(`MyRecipes/${id}`);
        } else {
            setProfilMenuLien("Connexion");
            setProfilSousMenu("Connexion");
            setProfilSousMenu2Lien("Connexion");
            setProfilSousMenu1Lien("Connexion");
        }
    }, [isConnected]);

    useEffect(() => {
        populateCategories();
    }, [])

    return (
        <header>
            <nav>
                <Link className="nav-link appname" to={`/`}><p className='appname'>Flexi Food</p></Link>

                <ul className="mainnav">
                    <div className="dropdown">
                        <Link className="dropbtn mainlinknav" to={`/RecipeList`}>Répertoire</Link>
                        <div className="dropdown-content">
                            {tabCategories && tabCategories.length > 0 ? (
                                    tabCategories.map((categorie) => (
                                        <Link key={categorie.id} to={`RecipeCategory/${categorie.id}`}> {categorie.categorieNom} </Link>
                                    ))
                            ) : (
                                <p>erreur</p>
                            )}
                        </div>
                    </div>
                    <li><Link className="mainlinknav" to={`/AddRecipe`}> Ajouter une recette </Link></li>
                    <div className="dropdown">
                        <Link className="dropbtn mainlinknav" to={`/${profilMenuLien}`}>Profil</Link>
                        <div className="dropdown-content">
                            <Link to={`/${profilSousMenu2Lien}`}> {profilSousMenu} </Link>
                            <Link to={`/${profilSousMenu1Lien}`}> Mes recettes </Link>
                            <Link to={`/Inscription`}> Inscription </Link>

                        </div>
                    </div>
                </ul>

            </nav>

        </header>
    );
}

export default Header;