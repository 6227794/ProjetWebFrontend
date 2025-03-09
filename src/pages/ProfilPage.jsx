import React from 'react';

function ProfilePage() {
    return (
        <div className='maindivcontent'>
            <h1>Mon profil</h1>
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
                <div className='lastformdiv'>
                    <label for="courriel">Courriel</label>
                    <input type="text" id="courriel" name="courriel" />
                </div>
                {/* Ajouter mdp plus tard */}
                <button type="submit" className="mainbutton">Sauvegarder</button>
            </form>
        </div>
    );
}

export default ProfilePage;