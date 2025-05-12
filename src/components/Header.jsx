import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../../config.js";

function Header() {
    const navigate = useNavigate();
    const isConnected = localStorage.getItem('isConnected') === ('true');

    const navigateToProfil = async (e) => {
        e.preventDefault();
        const id = localStorage.getItem('userId');
        navigate(`/Profil/${id}`);
    }

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
                            <Link className="" to={`/FavoriteRecipe`}> Favoris </Link>
                            <Link className="" to={`/Connexion`}> Connexion </Link>
                            <Link className="" to={`/Inscription`}> Inscription </Link>

                        </div>
                    </div>
                </ul>

            </nav>

        </header>
    );
}

export default Header;