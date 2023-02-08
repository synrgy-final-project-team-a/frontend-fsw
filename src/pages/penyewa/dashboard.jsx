import { faChevronRight, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Banner from "../../components/banner";
import PenyewaLayout from "../../layouts/penyewa.layout"
import Rating from "../../components/ratingStar";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const user = useSelector(state => state.user.current)

    return (
        <>
            <PenyewaLayout>
                <Container>
                    <Row>
                        <Col>
                            {
                                (user.bank_account === undefined || user.bank_account === null || user.bank_account === "") ?
                                    <Alert className="mt-3" variant="danger">
                                        Harap menambahkan rekening terlebih dahulu sebelum mendaftarkan kos!
                                        <Button variant="outline-danger" className="mx-2" as={Link} to="/penyewa/profile/saya">
                                            Tambahkan Rekening
                                        </Button>
                                    </Alert> :
                                    ""
                            }
                        </Col>
                    </Row>
                    <Banner />
                    <Row className="mt-5">
                        <h5 className="fw-bold">Fitur Premium</h5>
                    </Row>
                    <Row className="mt-3">
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-primary text-start p-3 fw-bold"
                            >
                                <small className="d-flex justify-content-between">
                                    <Link to="/" className="text-light text-decoration-none">
                                        Tingkatkan jumlah pengunjung kosan anda melalui fitur premium
                                        dari kami
                                    </Link>
                                    <span>
                                        <FontAwesomeIcon icon={faChevronRight} rotate={90} />
                                    </span>
                                </small>
                            </button>
                        </div>
                    </Row>
                    <Row className="mt-3">
                        <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-primary text-start p-3 fw-bold"
                            >
                                <small className="d-flex justify-content-between">
                                    <Link to="/" className="text-light text-decoration-none">
                                        Dapatkan badge "premium" sekarang juga!
                                    </Link>
                                    <span>
                                        <FontAwesomeIcon icon={faChevronRight} rotate={90} />
                                    </span>
                                </small>
                            </button>
                        </div>
                    </Row>
                    <Row className="mt-3">
                        <h5 className="fw-bold">Penilaian Kos</h5>
                        <p>
                            <small>
                                Kosan yang telah dinilai oleh pencari kos dapat dilihat di bawah
                            </small>
                        </p>
                        <Col xs={12} lg={2}>
                            <img src="/pencari.png" alt="" className="img-fluid" />
                        </Col>
                        <Col xs={12} lg={3} className="col align-self-center mt-3">
                            <h6 className="fw-bold">Kos Graha Mulia Banaran</h6>
                            <h6 className="fw-bold">Sekaran Semarang</h6>
                            <div className="d-flex ps-2">
                                <h6 className="fw-bold pe-2">4.0</h6>
                                <Rating />
                                <p className="ps-2">
                                    <small>(9 Reviews)</small>
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3 mb-5">
                        <h5 className="fw-bold">Kelola Kosmu</h5>
                        <div>
                            <div className="btn-group me-1 col col-6">
                                <button
                                    type="button"
                                    className="btn btn-primary text-start p-2 fw-bold"
                                >
                                    <small className="d-flex justify-content-between">
                                        <Link to="/" className="text-light text-decoration-none">
                                            Tambahkan Kos Anda
                                        </Link>
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faPlusCircle}
                                                size="lg"
                                                color="white"
                                            />
                                        </span>
                                    </small>
                                </button>
                            </div>
                            <div className="btn-group col col-5">
                                <button
                                    type="button"
                                    className="btn btn-primary text-start p-2 fw-bold"
                                >
                                    <small className="d-flex justify-content-between">
                                        <Link to="/" className="text-light text-decoration-none">
                                            Butuh Bantuan
                                        </Link>
                                        <span>
                                            <FontAwesomeIcon icon={faChevronRight} rotate={90} />
                                        </span>
                                    </small>
                                </button>
                            </div>
                        </div>
                    </Row>
                </Container>
            </PenyewaLayout>
        </>
    );
};

export default Dashboard;
