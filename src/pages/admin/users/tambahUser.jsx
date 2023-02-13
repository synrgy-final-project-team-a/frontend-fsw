import { useEffect } from "react";
import AdminLayout from "../../../layouts/admin.layout"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from "react-bootstrap";
import { useRef } from "react";
import { useCreateUserMutation } from "../../../store/apis/users";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const imgAllow = ["image/png", "image/jpg", "image/jpeg"];

const TambahUser = () => {
    const navigate = useNavigate()

    const tambahUserRef = useRef({});
    const [error, setError] = useState({});
    const [role, setRole] = useState({});

    const provinsi = useSelector((state) => state.alamat.provinsi);
    const token = useSelector((state) => state.auth.token.access_token)

    const [createUserHit, { isLoading, isError, error: errorTambahUser, isSuccess }] = useCreateUserMutation();


    const handleTambahUser = (e) => {
        e.preventDefault();

        const confirm = window.confirm("Apakah anda yakin?")

        if (!confirm) {
            return
        }

        const namaDepan = tambahUserRef.current.namaDepan;
        const namaBelakang = tambahUserRef.current.namaBelakang;
        const jenisKelaminUser = tambahUserRef.current.jenisKelamin;
        const statusUser = tambahUserRef.current.status;
        const nomorHandphone = tambahUserRef.current.nomorHandphone;
        const email = tambahUserRef.current.email;
        const password = tambahUserRef.current.password;
        const verifPassword = tambahUserRef.current.verifPassword;
        const fotoProfile = tambahUserRef.current.fotoProfile;
        const provinsi = tambahUserRef.current.provinsi;
        const kota = tambahUserRef.current.kota;
        const alamat = tambahUserRef.current.alamat;
        const nomorRekening = tambahUserRef.current.nomorRekening;
        const namaBank = tambahUserRef.current.namaBank;
        const namaPenggunaBank = tambahUserRef.current.namaPenggunaBank;

        if (namaDepan.value === "") {
            setError((error) => ({ ...error, "namaDepan": "Nama depan tidak boleh kosong!" }))
            namaDepan.scrollIntoView()
            return
        }

        if (namaBelakang.value === "") {
            setError((error) => ({ ...error, "namaBelakang": "Nama belakang tidak boleh kosong!" }))
            namaBelakang.scrollIntoView()
            return
        }

        if (nomorHandphone.value === "") {
            setError((error) => ({ ...error, "nomorHandphone": "Nomor handphone tidak boleh kosong!" }))
            nomorHandphone.scrollIntoView()
            return
        } else {
            if (!/[0-9]{10,13}$/i.test(nomorHandphone.value)) {
                setError((error) => ({ ...error, "nomorHandphone": "Nomor handphone tidak valid!" }))
                nomorHandphone.scrollIntoView()
                return
            }
        }

        if (email.value === "") {
            setError((error) => ({ ...error, "email": "Email tidak boleh kosong!" }))
            email.scrollIntoView()
            return
        } else {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)) {
                setError((error) => ({ ...error, "email": "Email tidak valid!" }))
                email.scrollIntoView()
                return
            }
        }

        if (password.value === "") {
            setError((error) => ({ ...error, "password": "Password tidak boleh kosong!" }))
            password.scrollIntoView()
            return
        } else {
            if (password.value.length < 8) {
                setError((error) => ({ ...error, "password": "Password tidak boleh kurang dari 8 karakter!" }))
                password.scrollIntoView()
                return
            } else {
                if (verifPassword.value === "") {
                    setError((error) => ({ ...error, "verifPassword": "Verifikasi password tidak boleh kosong!" }))
                    verifPassword.scrollIntoView()
                    return
                } else {
                    if (password.value !== verifPassword.value) {
                        setError((error) => ({ ...error, "verifPassword": "Verifikasi password salah!" }))
                        password.scrollIntoView()
                        return
                    }
                }
            }
        }

        if (
            (role.superadmin === false || role.superadmin === undefined)
            && (role.penyewa === false || role.penyewa === undefined)
            && (role.pencari === false || role.pencari === undefined)
        ) {
            setError((error) => ({ ...error, role: "Masukan minimal 1 role!" }));
            role.scrollIntoView()
            return
        }

        if (!imgAllow.includes(fotoProfile.files[0].type)) {
            setError((error) => ({ ...error, fotoProfile: "Foto profil bukan gambar yang didukung!" }));
            fotoProfile.scrollIntoView()
            return
        }

        if (provinsi.value === "") {
            setError((error) => ({ ...error, provinsi: "Provinsi tidak boleh kosong!" }));
            provinsi.scrollIntoView()
            return
        }

        if (kota.value === "") {
            setError((error) => ({ ...error, kota: "Kabupaten/Kota tidak boleh kosong!" }));
            kota.scrollIntoView()
            return
        }

        if (alamat.value === "") {
            setError((error) => ({ ...error, alamat: "Alamat tidak boleh kosong!" }));
            alamat.scrollIntoView()
            return
        }

        if (nomorRekening.value === "") {
            setError((error) => ({ ...error, nomorRekening: "Nomor rekening tidak boleh kosong!" }));
            nomorRekening.scrollIntoView()
            return
        } else {
            if (!/[0-9]/i.test(nomorRekening.value)) {
                setError((error) => ({ ...error, nomorRekening: "Nomor rekening tidak valid!" }));
                nomorRekening.scrollIntoView()
                return
            }
        }

        if (namaPenggunaBank.value === "") {
            setError((error) => ({ ...error, namaPenggunaBank: "Nama pemilik rekening tidak boleh kosong!" }));
            namaPenggunaBank.scrollIntoView()
            return
        }

        toast.loading('Sedang menambahkan user', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        })

        let roleUser = ""
        if (role.superadmin === true) {
            roleUser += "1,"
        }
        if (role.penyewa === true) {
            roleUser += "2,"
        }
        if (role.pencari === true) {
            roleUser += "3,"
        }
        roleUser = roleUser.substring(0, roleUser.length - 1)

        const payload = new FormData();

        payload.append("first_name", namaDepan.value);
        payload.append("last_name", namaBelakang.value);
        payload.append("gender", jenisKelaminUser.value);
        payload.append("status", statusUser.value);
        payload.append("email", email.value);
        payload.append("password", password.value);
        payload.append("role_id", roleUser);
        payload.append("avatar", fotoProfile.files[0]);
        payload.append("address", alamat.value);
        payload.append("city", kota.value);
        payload.append("gmaps", "");
        payload.append("phone_number", nomorHandphone.value);
        payload.append("province", provinsi.value);
        payload.append("bank_account", nomorRekening.value);
        payload.append("bank_name", namaBank.value);
        payload.append("bank_username", namaPenggunaBank.value);

        createUserHit({ token: token, body: payload })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.dismiss()
            toast.success("Sukses menambahkan akun", {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            })
            setTimeout(() => {
                navigate('/admin/users')
            }, 500);
        }

        if (isError) {
            toast.dismiss()
            if (errorTambahUser.hasOwnProperty('data')) {
                if (Array.isArray(errorTambahUser.data)) {
                    errorTambahUser.data.forEach((el) => {
                        toast.error(el.data.message, {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: "light",
                        })
                    })
                } else {
                    toast.error(errorTambahUser.data.message, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    })
                }
            } else {
                toast.error("Gagal menambahkan user", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])
    return (
        <>
            <AdminLayout>
                <Container className="mb-5">
                    <Row className="justify-content-center">
                        <h3 className="my-4 text-center">Tambah User</h3>
                        <Col xs={12} lg={6}>
                            <Form onSubmit={handleTambahUser}>
                                <Form.Group className="mb-3" controlId="formBasicFisrtName">
                                    <Form.Label>Nama Depan</Form.Label>
                                    <Form.Control type="text" placeholder="Nama Depan"
                                        ref={(ref) => tambahUserRef.current.namaDepan = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("namaDepan") && error.namaDepan !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.namaDepan}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicLastName">
                                    <Form.Label>Nama Belakang</Form.Label>
                                    <Form.Control type="text" placeholder="Nama Belakang"
                                        ref={(ref) => tambahUserRef.current.namaBelakang = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("namaBelakang") && error.namaBelakang !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.namaBelakang}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Jenis Kelamin</Form.Label>
                                    <Form.Select
                                        ref={(ref) => tambahUserRef.current.jenisKelamin = ref}
                                        disabled={isLoading}
                                    >
                                        <option value="MALE">Laki-Laki</option>
                                        <option value="FEMALE">Perempuan</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        ref={(ref) => tambahUserRef.current.status = ref}
                                        disabled={isLoading}
                                    >
                                        <option value="STUDENT">Mahasiswa</option>
                                        <option value="WORKER">Pekerja</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                                    <Form.Label>Nomor Handphone</Form.Label>
                                    <Form.Control type="text" placeholder="Nomor Handphone"
                                        ref={(ref) => tambahUserRef.current.nomorHandphone = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("nomorHandphone") && error.nomorHandphone !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.nomorHandphone}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"
                                        ref={(ref) => tambahUserRef.current.email = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("email") && error.email !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.email}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"
                                        ref={(ref) => tambahUserRef.current.password = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("password") && error.password !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.password}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicVerifPassword">
                                    <Form.Label>Verifikasi Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"
                                        ref={(ref) => tambahUserRef.current.verifPassword = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("verifPassword") && error.verifPassword !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.verifPassword}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Check type="checkbox" name="role" label="Superadmin"
                                        checked={role.superadmin === true}
                                        onChange={e => setRole(role => ({ ...role, "superadmin": !role.superadmin }))}
                                        disabled={isLoading}
                                    />
                                    <Form.Check type="checkbox" name="role" label="Penyewa"
                                        checked={role.penyewa === true}
                                        onChange={e => setRole(role => ({ ...role, "penyewa": !role.penyewa }))}
                                        disabled={isLoading}
                                    />
                                    <Form.Check type="checkbox" name="role" label="Pencari"
                                        checked={role.pencari === true}
                                        onChange={e => setRole(role => ({ ...role, "pencari": !role.pencari }))}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("role") && error.role !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.role}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicProfilePicture">
                                    <Form.Label>Foto Profile</Form.Label>
                                    <Form.Control type="file" placeholder="Foto Profil"
                                        ref={(ref) => tambahUserRef.current.fotoProfile = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("fotoProfile") && error.fotoProfile !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.fotoProfile}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <hr />
                                <Form.Group className="mb-3" controlId="formBasicProvince">
                                    <Form.Label>Provinsi</Form.Label>
                                    <Form.Control type="text" placeholder="Provinsi" list="provinsi-list"
                                        ref={(ref) => tambahUserRef.current.provinsi = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("provinsi") && error.provinsi !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.provinsi}
                                            </Form.Text> :
                                            ""
                                    }
                                    <datalist id="provinsi-list">
                                        {
                                            provinsi.map((el, i) => {
                                                return (
                                                    <option key={i} value={el} />
                                                )
                                            })
                                        }
                                    </datalist>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCity">
                                    <Form.Label>Kota</Form.Label>
                                    <Form.Control type="text" placeholder="Kota"
                                        ref={(ref) => tambahUserRef.current.kota = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("kota") && error.kota !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.kota}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicAddress">
                                    <Form.Label>Alamat</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Alamat"
                                        ref={(ref) => tambahUserRef.current.alamat = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("alamat") && error.alamat !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.alamat}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <hr />
                                <Form.Group className="mb-3" controlId="formBasicBankAccount">
                                    <Form.Label>Nomor Rekening</Form.Label>
                                    <Form.Control type="text" placeholder="Nomor Rekening"
                                        ref={(ref) => tambahUserRef.current.nomorRekening = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("nomorRekening") && error.nomorRekening !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.nomorRekening}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicBankName">
                                    <Form.Label>Nama Bank</Form.Label>
                                    <Form.Select
                                        ref={(ref) => tambahUserRef.current.namaBank = ref}
                                        disabled={isLoading}
                                    >
                                        <option value={"BCA"}>BCA</option>
                                        <option value={"Bank BLU"}>Bank BLU</option>
                                        <option value={"BNI"}>BNI</option>
                                        <option value={"BRI"}>BRI</option>
                                        <option value={"BJB"}>BJB</option>
                                        <option value={"Mandiri"}>Mandiri</option>
                                        <option value={"Citibank"}>Citibank</option>
                                        <option value={"Maybank"}>Maybank</option>
                                        <option value={"Bank Permata"}>Bank Permata</option>
                                        <option value={"Bank Sinarmas"}>Bank Sinarmas</option>
                                        <option value={"Bank Jago"}>Bank Jago</option>
                                        <option value={"Bank Mayapada"}>Bank Mayapada</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicBankUsername">
                                    <Form.Label>Nama Pengguna Bank</Form.Label>
                                    <Form.Control type="text" placeholder="Nama Pengguna Bank"
                                        ref={(ref) => tambahUserRef.current.namaPenggunaBank = ref}
                                        disabled={isLoading}
                                    />
                                    {
                                        (error.hasOwnProperty("namaPenggunaBank") && error.namaPenggunaBank !== "") ?
                                            <Form.Text className="text-danger">
                                                {error.namaPenggunaBank}
                                            </Form.Text> :
                                            ""
                                    }
                                </Form.Group>
                                <Button variant="primary" type="submit"
                                    disabled={isLoading}
                                >
                                    Tambah
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </AdminLayout>
        </>
    )
}

export default TambahUser;