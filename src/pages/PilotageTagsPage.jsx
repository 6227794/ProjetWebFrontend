import {useEffect, useState} from 'react';
import axios from "axios";
import {apiUrl} from "../../config.js";

function MyRecipesPage() {
    const [tabTags, setTags] = useState([]);
    const [tempId, setTempId] = useState(0);

    const populateTags = async () => {
        const result = await axios.get(`${apiUrl}/tag/getAllTag`);
        setTags(result.data);
    }

    useEffect(() => {
        populateTags();
    }, []);

    const saveTag = async (tag) => {
        if (tag.id > 0 ){
            console.log(tag)
            try{
                await axios.put(`${apiUrl}/tag/updateTag`, tag);
                populateTags();
            } catch(error) {
                console.log(error);
            }
        } else {
            try{
                await axios.post(`${apiUrl}/tag/newTag`, tag);
                populateTags();
            } catch(error) {
                console.log(error);
            }
        }
    }

    function addTag() {
        setTags([...tabTags, {id:tempId, tagNom:""}]);
        setTempId(tempId-1);
    }

    const tagValue = (index, e) => {
        const { name, value } = e.target;

        const tags = [...tabTags];
        const tagToUpdate = {...tags[index]};

        tagToUpdate[name] = value;
        tags[index] = tagToUpdate;

        setTags(tags);
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
                    {tabTags.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td><input name="tagNom" required
                                       id={`tag-${index}`}
                                       onChange={(e) => tagValue(index, e)}
                                       value={data.tagNom ?? ''}
                            /></td>
                            <td><button onClick={() => saveTag(data)} className='updateitem'>Enregistrer</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <div style={{textAlign:"right"}}>
                <button onClick={addTag} className="additembutton" id="addTag">Ajouter un tag</button>
            </div>
        </div>
    );
}

export default MyRecipesPage;