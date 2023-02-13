import React from "react"
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Banner from "../../components/banner";
import AdminLayout from "../../layouts/admin.layout"
import { useSelector } from "react-redux";

const Dashboard = () => {
    const user = useSelector(state => state.user.current)

    return (
        <>
            <AdminLayout>
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
                </Container>
            </AdminLayout>
        </>
    );
};

export default Dashboard;
