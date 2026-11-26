import { useState, useEffect } from "react";
import axios from 'axios';
import './OfficeList.css';

const API_URL = 'http://localhost:8080/api/offices'

function OfficeList() {
    const [offices, setOffices] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // runs oce, when the page first appears: ask the backend for all offices
    useEffect(() =>{
        axios.get(API_URL)
            .then(response =>setOffices(response.data))
            .catch(error => setErrorMessage("Could not load offices: " + error.message))
            .finally(() => setLoading(false));
    }, []);

    // Search: Keep only the offices whose name or number contains the typed text
    const term = searchText.trim().toLowerCase();
    const visibleOffices = offices.filter(office => 
    (office.name ?? "").toLowerCase().includes(term) || String(office.officeNumber).includes(term)
    );

    //Delete: ask for confirmation, call the backend, the remove the row from the screen
    async function deleteOffice(office) {
        if (!window.confirm("Delete office " + office.officeNumber + " (" + office.name + ")?")) {
            return;
        }
        try {
            const response = await axios.delete(API_URL + "/" + office.id);

            if (response.status == 204) {
                setOffices(offices.filter(o => o.id !== office.id));
                alert("Office deleted successfully");
            } else {
                alert("Office is not deleted");
            }
        } catch (error) {
            if (error.response && error.response.status == 409) {
                alert("This office is assigned to a doctor, so it can not be deleted.");
            } else {
                alert("This is the error: " + error.message + (error.response ? " - " + JSON.stringify(error.response.data) : ""));
            }
    }
}

return (
    <div className="office-list">
        <h1>AVAILABLE OFFICE</h1>
        
        <input
            type="text"
            placeholder="search by office name or number"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            />

            {loading && <p>Loading offices...</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}

            {!loading && !errorMessage && offices.length === 0 && (
                <p>No offices available yet.</p>
            )}

            {!loading && !errorMessage && offices.length > 0 && visibleOffices.length === 0 && (
                <p>No office matches your search.</p>)}
            
            {visibleOffices.length > 0 && (
                <>
                    <p>Showing {visibleOffices.length} of {offices.length} offices</p>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Office Name</th>
                                <th>Office Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleOffices.map((office, index) => (
                                <tr key={office.id}>
                                    <td>{index + 1}</td>
                                    <td>{office.name}</td>
                                    <td>{office.officeNumber}</td>
                                    <td className="actions">
                                        <button onClick={() => deleteOffice(office)}>Delete</button>
                                        <button disabled title="Coming in the next class">Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            </div>
    )
}

export default OfficeList