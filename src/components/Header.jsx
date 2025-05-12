import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../../config.js";

function Header() {
    const navigate = useNavigate();
    const isConnected = localStorage.getItem('isConnected') === ('true');
    const [profilSousMenu, setProfilSousMenu] = useState("Connexion");
    const [profilSousMenuLien, setProfilSousMenuLien] = useState("Connexion");

    const navigateToProfil = async (e) => {
        e.preventDefault();
        const id = localStorage.getItem('userId');
        navigate(`/Profil/${id}`);
    }

    useEffect(() => {
        if(isConnected === true){
            setProfilSousMenu("Profil");
            const id = localStorage.getItem('userId');
            setProfilSousMenuLien(`Profil/${id}`);
        }
    }, [isConnected]);

    return (
        <header className="">
            <nav>
                <Link className="nav-link appname" to={`/`}><p className='appname'>Flexi Food</p></Link>

                <ul className="mainnav">
                    <div className="dropdown">
                        <Link className="dropbtn mainlinknav" to={`/RecipeList`}>Répertoire</Link>
                        <div className="dropdown-content">
                            <Link className="" to={`/`}> lien1 </Link>
                            <Link className="" to={`/`}> lien2 </Link>
                            <Link className="" to={`/`}> lien3 </Link>
                        </div>
                    </div>
                    <li className=""><Link className="mainlinknav" to={`/Conversion`}> Outil de conversion </Link></li>
                    <li className=""><Link className="mainlinknav" to={`/AddRecipe`}> Ajouter une recette </Link></li>
                    <div className="dropdown">
                        <a className="dropbtn mainlinknav" onClick={navigateToProfil}>Profil</a>
                        <div className="dropdown-content">
                            <Link className="" to={`/MyRecipes`}> Mes recettes </Link>
                            <Link className="" to={`/${profilSousMenuLien}`}> {profilSousMenu} </Link>
                            <Link className="" to={`/Inscription`}> Inscription </Link>

                        </div>
                    </div>
                </ul>

            </nav>

        </header>
    );
}

export default Header;