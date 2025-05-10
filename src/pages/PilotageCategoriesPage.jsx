import {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config.js";

function MyRecipesPage() {
    const [tabCategories, setCategories] = useState([]);

    useEffect(() => {
        const populateCategories = async () => {
            const result = await axios.get(`${apiUrl}/categorie/getAllCategorie`);
            setCategories(result.data);
        }

        populateCategories();
    }, []);

    function saveCategorie(id) {
        console.log(tabCategories[tabCategories.map(e => e.id).indexOf(id)]);
    }

    function addCategorie() {
        console.log(tabCategories)
        setCategories([...tabCategories, {id:0, CategorieNom:""}]);
    }

    return (
        <div className='maindivcontent'>
            <h1>Catégories</h1>
            <table className="tablepilotage">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tabCategories.map((data) => (
                    <tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.categorieNom}</td>
                        <td>
                            <button onClick={() => saveCategorie(data.id)} className='updateitem'>Enregistrer</button>
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </table>
            <div style={{textAlign: "right"}}>
                <button onClick={addCategorie} className="additembutton">Ajouter une catégorie</button>
            </div>
        </div>
    );
}

export default MyRecipesPage;