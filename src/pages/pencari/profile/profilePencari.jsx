import React from "react";
import { Container, Row, Col, Breadcrumb, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProfilNav from "../../../components/profile";
import PencariLayout from "../../../layouts/pencari.layout";
import {
  faCircleXmark,
  faAngleDown,
  faCalendarDays,
  faClock,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useGetListbyPencariMutation } from "../../../store/apis/transaksi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { addBooking } from "../../../store/slices/transaksiSlice";

const ProfilePencari = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [display] = useState({});
  const idProfile = useSelector((state) => state.auth.token.profile_id);
  const [getListHit, { isLoading, isSuccess, isError, data }] =
    useGetListbyPencariMutation();

  useEffect(() => {
    getListHit({ profileId: idProfile });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToTransaksi = (e, transaction_id, status) => {
    e.preventDefault();

    const initialState = {
      status: status,
      transaction_id: transaction_id,
    };

    dispatch(addBooking(initialState));
    navigate("/pengajuan-sewa");
  };

  return (
    <PencariLayout>
      <Container className="mt-3" id="profile-kelola-kos">
        <Breadcrumb>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: "/", className: "text-decoration-none" }}
          >
            Beranda
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Profil</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="mt-5">
          <Col xs={12} lg={3}>
            <ProfilNav />
          </Col>
          <Col xs={12} lg={9} className="border rounded px-3 px-lg-5">
            <h5 className="fw-bold mt-5">Kelola Kos</h5>
            {isLoading ? 
              [...Array(9).keys()].map((el, i) => {
                return (
                  <Col xs={12} lg={4} key={i}>
                    <Card bg="none" className="skeleton card-kelola my-5" style={{ height: "250px", width: "750px" }}>
                      &nbsp;
                    </Card>
                  </Col>
                )
              }) : isSuccess ? (
              data.data.content.length === 0 ? (
                <h1>Data kosong</h1>
              ) : (
                data.data.content.map((el, i) => {
                  return (
                    <Row className="gy-3 card-kelola my-4" key={i}>
                      <Col xs={12}>
                        <Card bg="outline-primary">
                          <Row className="g-0">
                            <Col xs={2} lg={3}>
                              <Card.Img src="/banner.png" />
                            </Col>
                            <Col xs={10} lg={9}>
                              <Card.Body className="d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <Card.Title className="fw-bold w-75">
                                    {el.kost_name}
                                  </Card.Title>
                                  {el.status === "POSTED" ? (
                                    <Card.Text className="text-warning">
                                      <FontAwesomeIcon icon={faClock} />{" "}
                                      Menunggu Konfirmasi Booking Pemilik Kos
                                    </Card.Text>
                                  ) : el.status === "CONFIRMED" ? (
                                    <Card.Text className="text-danger">
                                      <FontAwesomeIcon icon={faPaypal} /> Mohon
                                      Melakukan Pembayaran
                                    </Card.Text>
                                  ) : el.status === "REVIEWED" ? (
                                    <Card.Text className="text-warning">
                                      <FontAwesomeIcon icon={faClock} />{" "}
                                      Menunggu Konfirmasi Pembayaran Pemilik Kos
                                    </Card.Text>
                                  ) : el.status === "APPROVED" ? (
                                    <Card.Text className="text-success">
                                      <FontAwesomeIcon icon={faCheckCircle} />{" "}
                                      Berhasil
                                    </Card.Text>
                                  ) : el.status === "REJECTED" ? (
                                    <Card.Text className="text-danger">
                                      <FontAwesomeIcon icon={faCircleXmark} />{" "}
                                      Ditolak Pemilik Kos
                                    </Card.Text>
                                  ) : el.status === "CANCELLED" ? (
                                    <Card.Text className="text-success">
                                      <FontAwesomeIcon icon={faCheckCircle} />{" "}
                                      Dibatalkan
                                    </Card.Text>
                                  ) : (
                                    <Card.Text>&nbsp;</Card.Text>
                                  )}
                                </div>
                                <Card.Text className="mb-1">
                                  {el.address}
                                </Card.Text>
                                <Card.Text className="fw-bold mb-2">
                                  Tipe A
                                </Card.Text>
                                <div className="d-flex mb-2">
                                  <div className="d-flex align-items-center me-4">
                                    <h2 className="me-2 mb-0">
                                      <FontAwesomeIcon icon={faCalendarDays} />
                                    </h2>
                                    <div>
                                      <Card.Text className="text-muted mb-0">
                                        Tanggal Masuk
                                      </Card.Text>
                                      <Card.Text className="fw-bold">
                                        23 February 2023
                                      </Card.Text>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <h2 className="me-2 mb-0">
                                      <FontAwesomeIcon icon={faClock} />
                                    </h2>
                                    <div>
                                      <Card.Text className="text-muted mb-0">
                                        Durasi Sewa
                                      </Card.Text>
                                      <Card.Text className="fw-bold">
                                        Bulanan
                                      </Card.Text>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <Card.Text className="mb-0">
                                    <span className="fw-bold">
                                      Rp. {el.price}
                                    </span>{" "}
                                    / bulan
                                  </Card.Text>
                                  {display && display[i] !== true ? (
                                    <Button
                                      variant="outline-primary"
                                      className="m-1"
                                      onClick={(e) =>
                                        goToTransaksi(
                                          e,
                                          el.transaction_id,
                                          el.status
                                        )
                                      }
                                    >
                                      Selengkapnya{" "}
                                      <FontAwesomeIcon icon={faAngleDown} />
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Card.Body>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                      {display && display[i] === true ? (
                        <Col xs={12} lg={{ span: 9, offset: 3 }}>
                          <Card>
                            <Card.Body className="d-flex flex-column">
                              <Card.Title className="fw-bold mb-2">
                                Data Penghuni Kosan
                              </Card.Title>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <Card.Text className="mb-0">Nama</Card.Text>
                                <Card.Text>Dion Kurniawan</Card.Text>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <Card.Text className="mb-0">
                                  No Handphone
                                </Card.Text>
                                <Card.Text>082148372834</Card.Text>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ) : (
                        ""
                      )}
                      {display && display[i] === true ? (
                        <Col xs={12} lg={{ span: 9, offset: 3 }}>
                          <Card>
                            <Card.Body className="d-flex flex-column">
                              <Card.Title className="fw-bold mb-2">
                                Informasi Sewa Kosan
                              </Card.Title>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <Card.Text className="mb-0">
                                  ID Booking
                                </Card.Text>
                                <Card.Text>{el.booking_code}</Card.Text>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <Card.Text className="mb-0">
                                  Tanggal Sewa
                                </Card.Text>
                                <Card.Text>Kamis, 23 Februari 2023</Card.Text>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <Card.Text className="mb-0">
                                  Tanggal Selesai
                                </Card.Text>
                                <Card.Text>Kamis, 23 Maret 2023</Card.Text>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <Card.Text className="mb-0">
                                  Durasi Sewa
                                </Card.Text>
                                <Card.Text>Bulanan</Card.Text>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ) : (
                        ""
                      )}
                      {display && display[i] === true ? (
                        <Col xs={12} lg={{ span: 9, offset: 3 }}>
                          <hr />
                          <div className="d-flex flex-row-reverse">
                            <Button variant="primary" className="ms-2">
                              Perpanjang Sewa Lagi
                            </Button>
                            <Button variant="outline-primary" className="ms-2">
                              Cari Kosan Lain
                            </Button>
                          </div>
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                  );
                })
              )
            ) : isError ? (
              <h1>Error</h1>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </PencariLayout>
  );
};

export default ProfilePencari;
