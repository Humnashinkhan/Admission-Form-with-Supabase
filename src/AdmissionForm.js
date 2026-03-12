import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function AdmissionForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        student_class: "",
        friend: "",
        parent_name: "",
        parent_phone: ""
    });

    const [students, setStudents] = useState([]);
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");

    // Fetch students
    const fetchStudents = async () => {
        const { data, error } = await supabase
            .from("students")
            .select("*");

        if (!error) {
            setStudents(data);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Validation
    const validate = () => {

        if (!formData.name) {
            setMessage("Student name is required");
            return false;
        }

        if (!formData.email.includes("@")) {
            setMessage("Enter valid email");
            return false;
        }

        if (formData.phone.length < 10) {
            setMessage("Phone must be 10 digits");
            return false;
        }

        if (!formData.parent_name) {
            setMessage("Parent name required");
            return false;
        }

        return true;
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        if (editId) {

            const { error } = await supabase
                .from("students")
                .update(formData)
                .eq("id", editId);

            if (!error) {
                alert("Student updated successfully!");
                setEditId(null);
            } else {
                alert("Error updating student");
            }

        } else {

            const { error } = await supabase
                .from("students")
                .insert([formData]);

            if (!error) {
                alert("Form submitted successfully!");
            } else {
                alert("Error submitting form");
            }

        }

        setFormData({
            name: "",
            email: "",
            phone: "",
            dob: "",
            address: "",
            student_class: "",
            friend: "",
            parent_name: "",
            parent_phone: ""
        });

        fetchStudents();
    };
    // Edit student
    const handleEdit = (student) => {
        setFormData(student);
        setEditId(student.id);
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this student?");

        if (!confirmDelete) return;

        const { error } = await supabase
            .from("students")
            .delete()
            .eq("id", id);

        if (!error) {
            alert("Student deleted successfully");
            fetchStudents(); // refresh table
        } else {
            alert("Error deleting student");
        }

    };

    return (
        <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

            <h2>Student Admission Form</h2>

            {message && <p style={{ color: "green" }}>{message}</p>}

            <form onSubmit={handleSubmit}>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Student Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="student_class"
                        placeholder="Class"
                        value={formData.student_class}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="friend"
                        placeholder="Friend Reference"
                        value={formData.friend}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="parent_name"
                        placeholder="Parent Name"
                        value={formData.parent_name}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="parent_phone"
                        placeholder="Parent Phone"
                        value={formData.parent_phone}
                        onChange={handleChange}
                    />

                </div>

                <br />

                <textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    style={{ width: "100%", height: "80px" }}
                />

                <br /><br />

                <button type="submit" style={{
                    padding: "10px 20px",
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}>
                    {editId ? "Update Student" : "Submit Admission"}
                </button>

            </form>

            <h3 style={{ marginTop: "40px" }}>Student List</h3>

            <table border="1" cellPadding="10" width="100%">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Class</th>
                        <th>Parent</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.student_class}</td>
                            <td>{student.parent_name}</td>

                            <td>
                                <button onClick={() => handleEdit(student)}>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default AdmissionForm;