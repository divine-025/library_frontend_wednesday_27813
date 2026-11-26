import { useState } from 'react'
import axios from 'axios'
import LibraryButton from './LibraryButton'

const API_URL = 'http://localhost:8080/api/offices'

function Office() {

    const [officeName, setOfficeName] = useState("");
    const [officeNumber, setOfficeNumber] = useState("");
    const [deleteNumber, setDeleteNumber] = useState("");

    async function saveOffice() {
        try {
            const response = await axios.post(API_URL, {
                name: officeName,
                officeNumber: Number(officeNumber)
            });

            if (response.status == 201) {
                alert("Office saved successfully");
            } else {
                alert("Office is not saved");
            }
        } catch (error) {
            alert("This is the error: " + error.message + (error.response ? " - " + JSON.stringify(error.response.data) : ""));
        }
    }

    async function deleteOffice() {
        try {
            const allOffices = await axios.get(API_URL);
            const office = allOffices.data.find(o => o.officeNumber == Number(deleteNumber));

            if (office) {
                const response = await axios.delete(API_URL + "/" + office.id);

                if (response.status == 204) {
                    alert("Office deleted successfully");
                } else {
                    alert("Office is not deleted");
                }
            } else {
                alert("Office not found");
            }
        } catch (error) {
            alert("This is the error: " + error.message + (error.response ? " - " + JSON.stringify(error.response.data) : ""));
        }
    }

    return (
        <div>
            <h1>SAVE OFFICE</h1>
            <label>OFFICE NAME : </label>
            <input type="text" onChange={e => setOfficeName(e.target.value)} /><br />
            <label>OFFICE NUMBER : </label>
            <input type="text" onChange={e => setOfficeNumber(e.target.value)} /><br />
            <LibraryButton buttonLabel="SAVE" onClickButton={saveOffice} />

            <h2>DELETE OFFICE</h2>
            <label>OFFICE NUMBER : </label>
            <input type="text" placeholder="Office Number" onChange={e => setDeleteNumber(e.target.value)} /><br />
            <LibraryButton buttonLabel="DELETE" onClickButton={deleteOffice} />
        </div>
    )
}

export default Office