import { useState } from "react";
import AdminLayout from "../../../layouts/admin.layout"

const TambahUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("1");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePasword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangeRole = (e) => {
        setRole(e.target.value)
        console.log(setRole);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`email: ${email} password: ${password} Role: ${role}`)
    }
    return(
        <>
            <AdminLayout>
                <h1>Test tambah user</h1>

                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input type="email" name="email" value={email} onChange={handleChangeEmail}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={password} onChange={handleChangePasword}/>
                    </label>
                    <select value={role} onChange={handleChangeRole}>
                        <option value="1">Penyewa Kos</option>
                        <option value="2">Pencari</option>
                    </select>
                    <input type="submit" value="Submit" />
                </form>


            </AdminLayout>
        </>
    )
}

export default TambahUser;