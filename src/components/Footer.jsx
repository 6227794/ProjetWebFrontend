import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

function Footer() {
    const isConnected = localStorage.getItem('isConnected') === ('true');
    const [profilMenuLien, setProfilMenuLien] = useState("Connexion");
    const [profilRecetteLien, setProfilRecetteLien] = useState("Connexion");
    const [pilotageVisibility, setPilotageVisibility] = useState("hidden")

    useEffect(() => {
        const id = localStorage.getItem('userId');
        if(isConnected === true && id){
            setProfilMenuLien(`Profil/${id}`);
            setProfilRecetteLien(`MyRecipes/${id}`);
            if (id.toString() === "1"){
                setPilotageVisibility("visible");
            }
        } else {
            setProfilMenuLien("Connexion");
            setProfilRecetteLien("Connexion");
            setPilotageVisibility("hidden");
        }
    }, [isConnected]);

    return (
        <footer>
            <div>
                <Link className="appnameft" to={`/`}>Flexi<br/>Food</Link>
            </div>

            <div>
                <ul className="nav-footer">
                    <li><Link className="nav-link" to={`/${profilMenuLien}`}> Mon profil </Link></li>
                    <li><Link className="nav-link" to={`/${profilRecetteLien}`}> Mes recettes </Link></li>
                    <li><Link className="nav-link" to={`/AddRecipe`}> Ajouter une recette </Link></li>
                </ul>
            </div>

            <div>
                <ul className="nav-footer">
                    <li><Link className="nav-link" to={`/RecipeList`}> Répertoire </Link></li>
                    <li><Link className="nav-link" to={`/FAQ`}> Foire aux questions </Link></li>
                    <li><Link className="nav-link" to={`/About`}> À propos </Link></li>
                </ul>
            </div>

            <div style={{visibility:pilotageVisibility}}>
                <ul className="nav-footer">
                <li><Link className="nav-link" to={`/PilotageCategories`}> Catégories </Link></li>
                    <li><Link className="nav-link" to={`/PilotageTags`}> Tags </Link></li>
                </ul>
            </div>

        </footer>
    );
}

export default Footer;