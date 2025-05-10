import {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config.js";
import Button from "bootstrap/js/src/button.js";

function MyRecipesPage() {
    const [tabTags, setTags] = useState([{id:0,tagNom:""}]);

    const populateTags = async () => {
        const result = await axios.get(`${apiUrl}/tag/getAllTag`);
        setTags(result.data);
    }

    useEffect(() => {
        populateTags();
    }, []);

    function saveTag(id) {
        console.log(tabTags[tabTags.map(e => e.id).indexOf(id)]);
    }

    function addTag() {
        console.log(tabTags)
        setTags([...tabTags, {id:0, tagNom:""}]);
    }

    return (
        <div className='maindivcontent'>
            <h1>Tags</h1>
            <table className="tablepilotage">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tabTags.map((data) => (
                        <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.tagNom}</td>
                            <td><button onClick={() => saveTag(data.id)} className='updateitem'>Enregistrer</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <div style={{textAlign:"right"}}>
                <button onClick={addTag} className="additembutton">Ajouter un tag</button>
            </div>
        </div>
    );
}

export default MyRecipesPage;