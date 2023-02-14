import React from "react"
import { Container } from "react-bootstrap";
import Banner from "../../components/banner";
import AdminLayout from "../../layouts/admin.layout"

const Dashboard = () => {
    return (
        <>
            <AdminLayout>
                <Container>
                    <Banner />
                </Container>
            </AdminLayout>
        </>
    );
};

export default Dashboard;
