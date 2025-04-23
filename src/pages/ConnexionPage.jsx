import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {apiUrl} from "../../config.js";

function ConnexionPage() {
    {/*
    const [user, setUser] = useState({courriel : "", motDePasse : ""});
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value});
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        }
    }*/}
    return (
        <div className='maindivcontent'>
            <h1>Connexion</h1>
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="=motDePasse">Mot de passe</label>
                    <input type="password" id="pass" name="motDePasse" minLength="8" required />
                </div>

                <button type="submit" className="mainbutton">Se connecter</button>
            </form>

        </div>
    );
}

export default ConnexionPage;

