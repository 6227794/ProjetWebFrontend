import React from 'react';

function ConnexionPage() {
    return (
        <div className='maindivcontent'>
            <h1>Connexion</h1>
            <form>
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label for="pass">Mot de passe</label>
                    <input type="password" id="pass" name="password" minlength="8" required />
                </div>

                {/* Ajouter mdp plus tard */}
                <button type="submit" className="mainbutton">Se connecter</button>
            </form>

        </div>
    );
}

export default ConnexionPage;

