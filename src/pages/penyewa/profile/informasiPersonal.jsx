import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Breadcrumb,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileNav from "../../../components/profile";
import { useEditUserMutation } from "../../../store/apis/users";
import { addUser } from "../../../store/slices/userSlice";
import PenyewaLayout from "../../../layouts/penyewa.layout";
import { toast } from "react-toastify";

const imgAllow = ["image/png", "image/jpg", "image/jpeg"];

const InformasiPersonal = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token.access_token);
  const userData = useSelector((state) => state.user.current);
  const provinsi = useSelector((state) => state.alamat.provinsi);

  const formRef = useRef({});
  const [error, setError] = useState({});

  const [selectedProfile, setSelectedProfile] = useState();
  const [previewProfile, setPreviewProfile] = useState();

  const [
    editUserHit,
    { isLoading, isSuccess, isError, data: dataEdit, error: errorEdit },
  ] = useEditUserMutation();

  const editProfilSubmit = (e) => {
    e.preventDefault();

    setError({});

    const firstName = formRef.current.firstName;
    const lastName = formRef.current.lastName;
    const phoneNumber = formRef.current.phoneNumber;
    const email = formRef.current.email;
    const gender = formRef.current.gender;
    const status = formRef.current.status;
    const bankAccount = formRef.current.bankAccount;
    const bankName = formRef.current.bankName;
    const bankUsername = formRef.current.bankUsername;
    const province = formRef.current.province;
    const city = formRef.current.city;
    const address = formRef.current.address;

    if (firstName.value === "") {
      setError((error) => ({ ...error, firstName: "Nama depan tidak boleh kosong!" }));
      firstName.scrollIntoView()
      return
    }

    if (lastName.value === "") {
      setError((error) => ({ ...error, lastName: "Nama belakang tidak boleh kosong!" }));
      lastName.scrollIntoView()
      return
    }

    if (phoneNumber.value === "") {
      setError((error) => ({ ...error, phoneNumber: "Nomor handphone tidak boleh kosong!" }));
      phoneNumber.scrollIntoView()
      return
    } else {
      if (!/[0-9]{10,13}$/i.test(phoneNumber.value)) {
        setError((error) => ({ ...error, phoneNumber: "Nomor handphone tidak valid!" }));
        phoneNumber.scrollIntoView()
        return
      }
    }

    if (email.value === "") {
      setError((error) => ({ ...error, email: "Email tidak boleh kosong!" }));
      email.scrollIntoView()
      return
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)) {
        setError((error) => ({ ...error, email: "Email tidak valid!" }));
        email.scrollIntoView()
        return
      }
    }

    if (province.value === "") {
      setError((error) => ({ ...error, province: "Provinsi tidak boleh kosong!" }));
      province.scrollIntoView()
      return
    }

    if (city.value === "") {
      setError((error) => ({ ...error, city: "Kabupaten/Kota tidak boleh kosong!" }));
      city.scrollIntoView()
      return
    }

    if (address.value === "") {
      setError((error) => ({ ...error, address: "Alamat tidak boleh kosong!" }));
      address.scrollIntoView()
      return
    }

    if (bankAccount.value === "") {
      setError((error) => ({ ...error, bankAccount: "Nomor rekening tidak boleh kosong!" }));
      bankAccount.scrollIntoView()
      return
    } else {
      if (!/[0-9]/i.test(bankAccount.value)) {
        setError((error) => ({ ...error, bankAccount: "Nomor rekening tidak valid!" }));
        bankAccount.scrollIntoView()
        return
      }
    }

    if (bankUsername.value === "") {
      setError((error) => ({ ...error, bankUsername: "Nama pemilik rekening tidak boleh kosong!" }));
      bankUsername.scrollIntoView()
      return
    }

    toast.loading('Sedang mengubah profil', {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    })

    const payload = new FormData();

    payload.append("first_name", firstName.value);
    payload.append("last_name", lastName.value);
    payload.append("phone_number", phoneNumber.value);
    payload.append("gender", gender.value);
    payload.append("status", status.value);
    payload.append("bank_account", bankAccount.value);
    payload.append("bank_name", bankName.value);
    payload.append("bank_username", bankUsername.value);
    payload.append("province", province.value);
    payload.append("city", city.value);
    payload.append("address", address.value);

    if (!!selectedProfile) {
      payload.append("avatar", selectedProfile);
    }

    editUserHit({ token: token, body: payload });
  };

  const changeProfileHandler = (e) => {
    e.preventDefault();
    let failed = false;
    setError((error) => ({ ...error, fotoProfil: "" }));

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedProfile(undefined);
      return;
    }

    if (!imgAllow.includes(e.target.files[0].type)) {
      failed = true;
      setError((error) => ({
        ...error,
        fotoProfil: "Foto profil bukan gambar yang didukung!",
      }));
    }

    if (failed) {
      return;
    }

    setSelectedProfile(e.target.files[0]);
  };

  const resetProfilehandler = (e) => {
    e.preventDefault();
    setSelectedProfile(undefined);
    setPreviewProfile(undefined);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Sukses mengubah profil", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        dispatch(addUser(dataEdit.data));
        setSelectedProfile(undefined);
        setPreviewProfile(undefined);
      }, 500);
    }

    if (isError) {
      toast.dismiss();
      if (errorEdit.hasOwnProperty("data")) {
        if (Array.isArray(errorEdit.data)) {
          errorEdit.data.forEach((el) => {
            toast.error(el.data.message, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
          });
        } else {
          toast.error(errorEdit.data.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        toast.error("Gagal mendaftarkan diri", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (!selectedProfile) {
      setPreviewProfile(undefined);
      return;
    }

    let objectUrl = URL.createObjectURL(selectedProfile);
    setPreviewProfile(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProfile]);

  return (
    <PenyewaLayout>
      <Container className="mt-3">
        <Breadcrumb>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: "/penyewa", className: "text-decoration-none" }}
          >
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/penyewa/profile", className: "text-decoration-none" }}>Profil</Breadcrumb.Item>
          <Breadcrumb.Item active>Informasi Pengguna</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="mt-5">
          <Col xs={12} lg={3}>
            <ProfileNav />
          </Col>
          <Col
            xs={12}
            lg={9}
            className="border rounded px-3 px-lg-5"
            id="profile-information"
          >
            <Form className="px-0 px-lg-5" onSubmit={editProfilSubmit}>
              {error.hasOwnProperty("alert") && error.alert.message !== "" ? (
                <Alert variant={error.alert.variant} className="mt-5">
                  {error.alert.message}
                </Alert>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-between align-items-center mt-5">
                <h6 className="fw-bold">Edit Profil</h6>
                <Button variant="outline-primary" type="submit">
                  Simpan
                </Button>
              </div>
              <div className="text-center mt-5">
                {selectedProfile ? (
                  <img
                    src={previewProfile}
                    className="rounded-circle border profile-picture"
                    alt="..."
                  />
                ) : userData.avatar !== null ? (
                  <img
                    src={userData.avatar}
                    className="rounded-circle border profile-picture"
                    alt="..."
                  />
                ) : (
                  <img
                    src="/logo512.png"
                    className="rounded-circle border profile-picture"
                    alt="..."
                  />
                )}
                <br />
                <div className="mt-2">
                  <label
                    htmlFor="profile-picture-upload"
                    className="text-decoration-none text-primary fw-bold cursor-pointer"
                  >
                    Edit foto
                  </label>
                  <input
                    id="profile-picture-upload"
                    type="file"
                    onChange={changeProfileHandler}
                    style={{ display: "none" }}
                  />
                  {selectedProfile ? (
                    <label
                      className="text-decoration-none text-warning fw-bold ms-2 cursor-pointer"
                      onClick={resetProfilehandler}
                    >
                      Ulang
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                {error.hasOwnProperty("fotoProfil") &&
                  error.fotoProfil !== "" ? (
                  <label className="text-danger">{error.fotoProfil}</label>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-4">
                <Form.Group className="mb-4" controlId="formBasicNamaDepan">
                  <Form.Label>Nama Depan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan nama depan"
                    defaultValue={userData.first_name}
                    ref={(ref) => (formRef.current.firstName = ref)}
                    disabled={isLoading}
                  />
                  {error.hasOwnProperty("firstName") &&
                    error.firstName !== "" ? (
                    <Form.Text className="text-danger">
                      {error.firstName}
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicNamaBelakang">
                  <Form.Label>Nama Belakang</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan nama belakang"
                    defaultValue={userData.last_name}
                    ref={(ref) => (formRef.current.lastName = ref)}
                    disabled={isLoading}
                  />
                  {error.hasOwnProperty("lastName") && error.lastName !== "" ? (
                    <Form.Text className="text-danger">
                      {error.lastName}
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-4"
                  controlId="formBasicNomorHandphone"
                  disabled={isLoading}
                >
                  <Form.Label>Nomor Handphone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan nomor handphonemu"
                    defaultValue={userData.phone_number}
                    ref={(ref) => (formRef.current.phoneNumber = ref)}
                  />
                  {error.hasOwnProperty("phoneNumber") &&
                    error.phoneNumber !== "" ? (
                    <Form.Text className="text-danger">
                      {error.phoneNumber}
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan email aktifmu"
                    defaultValue={userData.email}
                    disabled
                    ref={(ref) => (formRef.current.email = ref)}
                  />
                  {error.hasOwnProperty("email") && error.email !== "" ? (
                    <Form.Text className="text-danger">{error.email}</Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Select
                    defaultValue={userData.gender}
                    ref={(ref) => (formRef.current.gender = ref)}
                    disabled={isLoading}
                  >
                    <option value="MALE">Laki-Laki</option>
                    <option value="FEMALE">Perempuan</option>
                  </Form.Select>
                  {error.hasOwnProperty("gender") && error.gender !== "" ? (
                    <Form.Text className="text-danger">
                      {error.gender}
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Pekerjaan</Form.Label>
                  <Form.Select
                    defaultValue={userData.status}
                    ref={(ref) => (formRef.current.status = ref)}
                    disabled={isLoading}
                  >
                    <option value="STUDENT">Mahasiswa</option>
                    <option value="WORKER">Pekerja</option>
                  </Form.Select>
                  {error.hasOwnProperty("status") && error.status !== "" ? (
                    <Form.Text className="text-danger">
                      {error.status}
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <hr />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Provinsi</Form.Label>
                  <Form.Control
                    list="provinsi-list"
                    type="text"
                    placeholder="Masukan Provinsimu"
                    defaultValue={userData.province}
                    ref={(ref) => (formRef.current.province = ref)}
                    disabled={isLoading}
                  />
                  {error.hasOwnProperty("province") && error.province !== "" ? (
                    <Form.Text className="text-danger">
                      {error.province}
                    </Form.Text>
                  ) : (
                    ""
                  )}
                  <datalist id="provinsi-list">
                    {provinsi.map((el, i) => {
                      return <option key={i} value={el} />;
                    })}
                  </datalist>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicKota">
                  <Form.Label>Kabupaten/Kota</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan kabupaten/kota-mu"
                    defaultValue={userData.city}
                    ref={(ref) => (formRef.current.city = ref)}
                    disabled={isLoading}
                  />
                  {error.hasOwnProperty("city") && error.city !== "" ? (
                    <Form.Text className="text-danger">{error.city}</Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAlamat">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue={userData.address}
                    ref={(ref) => (formRef.current.address = ref)}
                    disabled={isLoading}
                  />
                  {error.hasOwnProperty("address") && error.address !== "" ? (
                    <Form.Text className="text-danger">
                      {error.address}
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Google Maps</Form.Label>
                  <Form.Control type="text" disabled />
                </Form.Group>
                <hr />
                <Form.Group className="mb-4" controlId="formBasicNomorRekening">
                  <Form.Label>Nomor Rekening</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan nama bank rekening"
                    defaultValue={userData.bank_account}
                    ref={(ref) => (formRef.current.bankAccount = ref)}
                    disabled={isLoading}
                  />
                  {error.hasOwnProperty("bankAccount") &&
                    error.bankAccount !== "" ? (
                    <Form.Text className="text-danger">
                      {error.bankAccount}
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicNamaBank">
                  <Form.Label>Nama Bank</Form.Label>
                  <Form.Select
                    defaultValue={userData.bank_name}
                    ref={(ref) => (formRef.current.bankName = ref)}
                    disabled={isLoading}
                  >
                    <option value="BCA">BCA</option>
                    <option value="BNI">BNI</option>
                    <option value="BRI">BRI</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="Citibank">Citibank</option>
                  </Form.Select>
                  {error.hasOwnProperty("bankName") && error.bankName !== "" ? (
                    <Form.Text className="text-danger">
                      {error.bankName}
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicNomorRekening">
                  <Form.Label>Nama Pemilik Rekening</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan nama pemilik rekening"
                    defaultValue={userData.bank_username}
                    ref={(ref) => (formRef.current.bankUsername = ref)}
                    disabled={isLoading}
                  />
                  {error.hasOwnProperty("bankUsername") &&
                    error.bankUsername !== "" ? (
                    <Form.Text className="text-danger">
                      {error.bankUsername}
                    </Form.Text>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </PenyewaLayout>
  );
};

export default InformasiPersonal;
