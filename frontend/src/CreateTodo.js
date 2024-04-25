import { useState } from "react";
import { BASE_URL } from "./utils";
import { Link, useParams } from "react-router-dom";

export default function CreateForm() {
    const { projectID } = useParams();
    const initialFormData = {
        title: '',
        description: '',
        completed: false,
        projectID: projectID,
    };

    const initialResultMessage = {
        msg: '',
        newId: null,
    };
    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState(initialResultMessage);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await fetch(`${BASE_URL}/project/${projectID}/todos/new`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (result.status !== 201) {
            setMessage({ msg: "Failed to create new Todo...", newId: null });
            return;
        }

        const response = await result.json();
        const newId = response;
		console.log(newId)
        setMessage({ msg: "Successfully created! Refresh to see in the list...", newId });
        setFormData(initialFormData);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <br />
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <br />
                <label>Completed</label>
                <input
                    type="checkbox"
                    name="completed"
                    checked={formData.completed}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Create</button> <br />
                {message.msg ? (
                    <>
                        <label>{message.msg}</label> <br />
                        <Link to={`/project/${projectID}/Todo/${message.newId}`}>Newly created Todo</Link>
                    </>
                ) : null}
            </form>
        </>
    );
}
