import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


function ProfilePage({setTrigger}) {
    const {id} = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        nom : "",
        prenom : "",
        nomAffichage : ""
    })

    useEffect(() => {
        if (id){
            loadUser();
        }

    }, [id]);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:7246/utilisateur/getUser/${id}`);
        setUserData(result.data);
    }

    const userValues = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const updateUser = async (e) => {
        e.preventDefault();
        console.log(userData);

        try {
            const result = await axios.put('http://localhost:7246/api/authentification/updateProfil', userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Utilisateur mis à jour :", result.data);
        } catch (error) {
            console.log("Erreur lors de la mise à jour :", error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('isConnected');
        setTrigger(prev => !prev);
        navigate('/Connexion');
    }

    return (
        <div className='maindivcontent'>
            <h1>Mon profil</h1>
            <form onSubmit={(e) => updateUser(e)} method="post">
                <div>
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom"
                           required
                           onChange={(e) => userValues(e)}
                           value={userData.prenom || ""}
                    />
                </div>
                <div>
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" name="nom"
                           required
                           onChange={(e) => userValues(e)}
                           value={userData.nom || ""}
                    />
                </div>
                <div>
                    <label htmlFor="nomAffichage">Nom d'affichage</label>
                    <input type="text" id="nomAffichage" name="nomAffichage"
                           required
                           onChange={(e) => userValues(e)}
                           value={userData.nomAffichage || ""}

                    />
                </div>
                <button type="submit" className="mainbutton">Sauvegarder</button>
                <br/>
                <button type="submit" className="mainbutton" onClick={handleLogout}>Se déconnecter</button>

            </form>
        </div>
    );
}

export default ProfilePage;