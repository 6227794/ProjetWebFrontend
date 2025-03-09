import React from 'react';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="">
                <Link className="appnameft" to={`/`}>Flexi<br/>Food</Link>
            </div>

            <div className="">
                <div className='beigeline'></div>
            </div>

            <div className="">
                <ul className="nav-footer">
                    <li className=""><Link className="nav-link" to={`/Profil`}> Mon profil </Link></li>
                    <li className=""><Link className="nav-link" to={`/Profil`}> Mes recettes </Link></li>
                    <li className=""><Link className="nav-link" to={`/FavoriteRecipe`}> Mes recettes favorites </Link></li>                </ul>
            </div>

            <div className="">
                <ul className="nav-footer">
                    <li className=""><Link className="nav-link" to={`/RecipeList`}> Répertoire </Link></li>
                    <li className=""><Link className="nav-link" to={`/Conversion`}> Outil de conversion </Link></li>
                    <li className=""><Link className="nav-link" to={`/AddRecipe`}> Ajouter une recette </Link></li>                </ul>
            </div>

            <div className="">
                <ul className="nav-footer">
                    <li className=""><Link className="nav-link" to={`/About`}> À propos </Link></li>
                    <li className=""><Link className="nav-link" to={`/FAQ`}> Foire aux questions </Link></li>
                    <li className=""><Link className="nav-link" to={`/FAQ`}> Contactez-nous </Link></li>
                </ul>
            </div>

        </footer>
    );
}

export default Footer;