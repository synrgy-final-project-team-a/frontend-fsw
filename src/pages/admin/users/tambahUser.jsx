import { useEffect } from "react";
import AdminLayout from "../../../layouts/admin.layout"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert, Container } from "react-bootstrap";
import { useRef } from "react";
import { useCreateUserMutation } from "../../../store/apis/users";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TambahUser = () => {
    const navigate = useNavigate()

    const tambahUserRef = useRef({});
    const token = useSelector((state) => state.auth.token.access_token)
    const [createUserHit, { isLoading, isError, error: errorTambahUser, isSuccess }] = useCreateUserMutation();
    const [error, setError] = useState({});


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
        const fotoProfileUser = tambahUserRef.current.fotoProfile.files[0];
        const nomorRekeningUser = tambahUserRef.current.nomorRekening.value;
        const namaBankUser = tambahUserRef.current.namaBank.value;
        const namaPenggunaBankUser = tambahUserRef.current.namaPenggunaBank.value;
        const statusUser = tambahUserRef.current.status.value;

        const payload = new FormData();

        payload.append("email", emailUser);
        payload.append("password", passwordUser);
        payload.append("role_id", roleUser);
        payload.append("address", alamatUser);
        payload.append("city", kotaUser);
        payload.append("first_name", namaDepanUser);
        payload.append("gmaps", "");
        payload.append("last_name", namaBelakangUser);
        payload.append("phone_number", nomorHandphoneUser);
        payload.append("province", provinsiUser);
        payload.append("gender", jenisKelaminUser);
        payload.append("avatar", fotoProfileUser);
        payload.append("bank_account", nomorRekeningUser);
        payload.append("bank_name", namaBankUser);
        payload.append("bank_username", namaPenggunaBankUser);
        payload.append("status", statusUser);

        try {
            createUserHit({ token: token, body: payload })
        } catch (error) {
            setError({ "alert": { "variant": "danger", "message": "Gagal tambah user!" } })
        }
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/admin')
        }

        if (isError) {
            console.log(errorTambahUser);
            if (Array.isArray(errorTambahUser.data)) {
                errorTambahUser.data.forEach((ele) => {
                    setError({ "alert": { "variant": "danger", "message": ele.data.message } })
                })
            } else {
                setError({ "alert": { "variant": "danger", "message": errorTambahUser.data.message } });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])
    return (
        <>
            <AdminLayout>
                <Container className="mb-5">
                    <h3 className="my-4">Tambah User</h3>
                    {isLoading ?
                        <Alert variant="light">
                            Tunggu sebentar...
                        </Alert> :
                        isError ?
                            <Alert variant={error.alert.variant}>
                                {error.alert.message}
                            </Alert> :
                            ""
                    }
                    <Form onSubmit={handleTambahUser} style={{ width: "50%" }}>
                        <Form.Group className="mb-3" controlId="formBasicFisrtName">
                            <Form.Label>Nama Depan</Form.Label>
                            <Form.Control type="text" placeholder="Nama Depan"
                                ref={(ref) => tambahUserRef.current.namaDepan = ref}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Nama Belakang</Form.Label>
                            <Form.Control type="text" placeholder="Nama Belakang"
                                ref={(ref) => tambahUserRef.current.namaBelakang = ref}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Select ref={(ref) => tambahUserRef.current.jenisKelamin = ref}>
                                <option value="MALE">Laki-Laki</option>
                                <option value="FEMALE">Perempuan</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Nomor Handphone</Form.Label>
                            <Form.Control type="text" placeholder="Nomor Handphone"
                                ref={(ref) => tambahUserRef.current.nomorHandphone = ref}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control type="text" placeholder="Alamat"
                                ref={(ref) => tambahUserRef.current.alamat = ref}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label>Kota</Form.Label>
                            <Form.Control type="text" placeholder="Kota"
                                ref={(ref) => tambahUserRef.current.kota = ref}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicProvince">
                            <Form.Label>Provinsi</Form.Label>
                            <Form.Control type="text" placeholder="Provinsi"
                                ref={(ref) => tambahUserRef.current.provinsi = ref}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                ref={(ref) => tambahUserRef.current.email = ref}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                ref={(ref) => tambahUserRef.current.password = ref}
                            />
                            <Form.Text className="text-muted">
                                Password tidak boleh kurang dari 8 karakter.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select ref={(ref) => tambahUserRef.current.role = ref}>
                                <option value={1}>Superadmin</option>
                                <option value={2}>Pencari</option>
                                <option value={3}>Penyewa</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicProfilePicture">
                            <Form.Label>Foto Profile</Form.Label>
                            <Form.Control type="file" placeholder="Foto Profil"
                                ref={(ref) => tambahUserRef.current.fotoProfile = ref}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBankAccount">
                            <Form.Label>Nomor Rekening</Form.Label>
                            <Form.Control type="text" placeholder="Nomor Rekening"
                                ref={(ref) => tambahUserRef.current.nomorRekening = ref}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBankName">
                            <Form.Label>Nama Bank</Form.Label>
                            <Form.Select ref={(ref) => tambahUserRef.current.namaBank = ref}>
                                <option value="BCA">BCA</option>
                                <option value="BNI">BNI</option>
                                <option value="BRI">BRI</option>
                                <option value="Mandiri">Mandiri</option>
                                <option value="Citibank">Citibank</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicBankUsername">
                            <Form.Label>Nama Pengguna Bank</Form.Label>
                            <Form.Control type="text" placeholder="Nama Pengguna Bank"
                                ref={(ref) => tambahUserRef.current.namaPenggunaBank = ref}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Select ref={(ref) => tambahUserRef.current.status = ref}>
                                <option value="STUDENT">Mahasiswa</option>
                                <option value="WORKER">Pekerja</option>
                            </Form.Select>
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

export default TambahUser;