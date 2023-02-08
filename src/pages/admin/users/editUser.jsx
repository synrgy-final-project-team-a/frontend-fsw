import { useEffect } from "react";
import AdminLayout from "../../../layouts/admin.layout"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert, Container } from "react-bootstrap";
import { useRef } from "react";
import { useCreateUserMutation } from "../../../store/apis/users";
import { useSelector } from "react-redux";

const EditUser = () => {

    const tambahUserRef = useRef({});
    const token = useSelector((state) => state.auth.token.access_token)
    const [createUserHit, { isError, isSuccess }] = useCreateUserMutation();
    

    const handleTambahUser = (e) => {
        e.preventDefault();

        const namaDepanUser = tambahUserRef.current.namaDepan.value;
        const namaBelakangUser = tambahUserRef.current.namaBelakang.value;
        const jenisKelaminUser = tambahUserRef.current.jenisKelamin.value;
        const nomorHandphoneUser = tambahUserRef.current.nomorHandphone.value;
        const alamatUser = tambahUserRef.current.alamat.value;
        const kotaUser = tambahUserRef.current.kota.value;
        const provinsiUser = tambahUserRef.current.provinsi.value;
        const emailUser = tambahUserRef.current.email.value;
        const passwordUser = tambahUserRef.current.password.value;
        const roleUser = tambahUserRef.current.role.value;
        const fotoProfileUser = tambahUserRef.current.fotoProfile.value;
        const nomorRekeningUser = tambahUserRef.current.nomorRekening.value;
        const namaBankUser = tambahUserRef.current.namaBank.value;
        const namaPenggunaBankUser = tambahUserRef.current.namaPenggunaBank.value;
        const statusUser = tambahUserRef.current.status.value;

        // alert(`Nama: ${namaDepanUser}, Email: ${emailUser}, Role: ${roleUser}`);

        const payload = {
            "email": emailUser,
            "password": passwordUser,
            "role_id": roleUser,
            "address": alamatUser,
            "city": kotaUser,
            "first_name": namaDepanUser,
            "gmaps": "blablabla",
            "last_name": namaBelakangUser,
            "phone_number": nomorHandphoneUser,
            "province": provinsiUser,
            "gender": jenisKelaminUser,
            "avatar": fotoProfileUser,
            "bank_account": nomorRekeningUser,
            "bank_name": namaBankUser,
            "bank_username": namaPenggunaBankUser,
            "status": statusUser 
        }

        console.log(payload);

        try {
            createUserHit({token: token, body: payload })
            console.log(createUserHit);
        } catch (error) {
            alert("Gagal Tambah User");
            console.log(error);
        }
    }

    useEffect(() => {
        if(isSuccess) {
            <Alert variant="success">Berhasil menambah user!</Alert>     
            console.log("berhasil ga?");       
        }

        if (isError) {
            <Alert variant="danger">Error ngab</Alert>
            console.log("error ya?");
        }
    })
    return(
        <>
            <AdminLayout>
                <Container className="mb-5">
                    <h3 className="my-4">Edit User</h3>
                    <Form onSubmit={handleTambahUser} style={{width: "50%"}}>
                        <Form.Group className="mb-3" controlId="formBasicFisrtName">
                            <Form.Label>Nama Depan</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.namaDepan = ref} type="text" placeholder="Nama Depan"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Nama Belakang</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.namaBelakang = ref} type="text" placeholder="Nama Belakang"/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Select ref={(ref) => tambahUserRef.current.jenisKelamin = ref}>
                                <option>Pilih Jenis Kelamin</option>
                                <option value="Laki-Laki">Laki-Laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </Form.Select>
                        </Form.Group>  

                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Nomor Handphone</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.nomorHandphone = ref} type="text" placeholder="Nomor Handphone"/>
                        </Form.Group>                        

                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.alamat = ref} type="text" placeholder="Alamat"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label>Kota</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.kota = ref} type="text" placeholder="Kota"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicProvince">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.provinsi = ref} type="text" placeholder="Provinsi"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.email = ref} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.password = ref} type="password" placeholder="Password" />
                            <Form.Text className="text-muted">
                            Password tidak boleh kurang dari 8 karakter.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select ref={(ref) => tambahUserRef.current.role = ref}>
                                <option>Pilih Role</option>
                                <option value={0}>Superadmin</option>
                                <option value={1}>Pencari</option>
                                <option value={2}>Penyewa</option>
                            </Form.Select>
                        </Form.Group>                                                

                        <Form.Group className="mb-3" controlId="formBasicProfilePicture">
                            <Form.Label>Foto Profile</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.fotoProfile = ref} type="file" placeholder="Foto Profil"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBankAccount">
                            <Form.Label>Nomor Rekening</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.nomorRekening = ref} type="text" placeholder="Nomor Rekening"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBankName">
                            <Form.Label>Nama Bank</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.namaBank = ref} type="text" placeholder="Nama Bank"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBankUsername">
                            <Form.Label>Nama Pengguna Bank</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.namaPenggunaBank = ref} type="text" placeholder="Nama Pengguna Bank"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control ref={(ref) => tambahUserRef.current.status = ref} type="text" placeholder="Status"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </AdminLayout>
        </>
    )
}

export default EditUser;