import React from 'react';

function InscriptionPage() {
    return (
        <div className='maindivcontent'>
            <h1>Inscription</h1>
            <form>
                <div>
                    <label for="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom" />
                </div>
                <div>
                    <label for="nom">Nom</label>
                    <input type="text" id="nom" name="nom" />
                </div>
                <div>
                    <label for="nomAffichage">Nom d'affichage</label>
                    <input type="text" id="nomAffichage" name="nomAffichage" />
                </div>
                {/* Validation si changement courriel */}
                <div>
                    <label for="courriel">Courriel</label>
                    <input type="email" id="courriel" name="courriel" />
                </div>
                <div>
                    <label for="pass">Mot de passe</label>
                    <input type="password" id="pass" name="password" minlength="8" required />
                </div>
                {/* Ajouter mdp plus tard */}
                <button type="submit" className="mainbutton">S'inscrire</button>
            </form>
        </div>
    );
}

export default InscriptionPage;