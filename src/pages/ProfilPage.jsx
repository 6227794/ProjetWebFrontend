import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../../config.js";


function ProfilePage({setTrigger}) {
    const idLocal = localStorage.getItem('userId');
    const {id} = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        nom : "",
        prenom : "",
        nomAffichage : ""
    });

    useEffect(() => {
        if (id ===  idLocal){
            loadUser();
        }else {
            alert("Accès refusé");
            navigate('/');
        }

    }, []);

    const loadUser = async () => {
        const result = await axios.get(`${apiUrl}/utilisateur/getUser/${id}`);
        setUserData(result.data)
    }

    const userValues = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    const updateUser = async (e) => {
        e.preventDefault();
        console.log(userData);

        try {
            const result = await axios.put(`${apiUrl}/utilisateur/updateProfil`, userData);
            console.log("Utilisateur mis à jour :", result.data);
            alert("Modification réussi")

        } catch (error) {
            console.log("Erreur lors de la mise à jour :", error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.setItem('isConnected', 'false');
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
                <button type="button" className="mainbutton" onClick={handleLogout}>Se déconnecter</button>

            </form>
        </div>
    );
}

export default ProfilePage;