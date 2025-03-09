import React from 'react';
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="">
            <nav>
                <Link className="nav-link appname" to={`/`}><p className='appname'>Flexi Food</p></Link>

                <ul className="mainnav">
                    <div className="dropdown">
                        <Link className="dropbtn"  to={`/RecipeList`}>Répertoire</Link>
                        <div className="dropdown-content">
                            <Link className="nav-link" to={`/`}> lien1 </Link>
                            <Link className="nav-link" to={`/`}> lien2 </Link>
                            <Link className="nav-link" to={`/`}> lien3 </Link>
                        </div>
                    </div>
                    <li className="nav-item"><Link className="nav-link" to={`/Conversion`}> Outil de conversion </Link></li>
                    <li className="nav-item"><Link className="nav-link" to={`/AddRecipe`}> Ajouter une recette </Link></li>
                    <div className="dropdown">
                        <Link className="dropbtn"  to={`/Profil`}>Profil</Link>
                        <div className="dropdown-content">
                            <Link className="nav-link" to={`/FavoriteRecipe`}> Favoris </Link>
                            <Link className="nav-link" to={`/`}> lien2 </Link>
                            <Link className="nav-link" to={`/`}> lien3 </Link>
                        </div>
                    </div>
                </ul>

            </nav>

        </header>
    );
}

export default Header;