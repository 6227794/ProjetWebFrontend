import {useEffect, useState} from 'react';
import axios from "axios";
import {apiUrl} from "../../config.js";

function MyRecipesPage() {
    const [tabCategories, setCategories] = useState([]);
    const [tempId, setTempId] = useState(0);

    const populateCategories = async () => {
        const result = await axios.get(`${apiUrl}/categorie/getAllCategorie`);
        setCategories(result.data);
    }

    useEffect(() => {
        populateCategories();
    }, []);

    const saveCategorie = async (categorie) => {
        if (categorie.id > 0 ){
            try {
                await axios.put(`${apiUrl}/categorie/updateCategorie`, categorie);
                populateCategories();
            }catch(error) {
                console.log(error);
            }
        } else {
            try {
                await axios.post(`${apiUrl}/categorie/newCategorie`, categorie);
                populateCategories();
            }catch(error) {
                console.log(error);
            }
        }
    }

    function addCategorie() {
        setCategories([...tabCategories, {id:tempId, CategorieNom:""}]);
        setTempId(tempId-1);
    }

    const categoryValue = (index, e) => {
        const { name, value } = e.target;

        const categories = [...tabCategories];
        const categorieToUpdate = {...categories[index]};

        categorieToUpdate[name] = value;
        categories[index] =categorieToUpdate;

        setCategories(categories);
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
                {tabCategories.map((data, index) => (
                    <tr key={data.id}>
                        <td>{index + 1}</td>
                        <td><input name="categorieNom" required
                                   onChange={(e) => categoryValue(index, e)}
                                   value={data.categorieNom ?? ''}
                        />
                        </td>
                        <td>
                            <button onClick={() => saveCategorie(data)} className='updateitem'>Enregistrer</button>
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