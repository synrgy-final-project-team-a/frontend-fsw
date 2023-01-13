import { Table, Button } from "react-bootstrap";
import FooterComponent from "../components/footer";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    
    // const { user } = useSelector((state) => state.auth);
    const [seeker, setSeeker] = useState([]);

  useEffect(() => {
    getSeeker();
  }, []);

  const getSeeker = async () => {
    const response = await axios.get("https://kosanku-bej.up.railway.app/api/register/tennant/listseeker");
    setSeeker(response.data);
  };

  const deleteSeeker = async (seekerId) => {
    await axios.delete(`https://kosanku-bej.up.railway.app/api/register/tennant/listseeker/${seekerId}`);
    getSeeker();
  };

    
  return (
    <>
    {/* {user && user.role === "tennant" && (
        <> */}
            <Navbar />
            
            <div>
                <h1 className="title">Dashboard Tennant</h1>
                <h3 className="subtitle">List Penyewa</h3>
                <Button to="/" className="button">
                    Add New
                </Button>
                <Table className="table striped fullwidth">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Penyewa</th>
                        <th>Tipe Kos</th>
                        <th>Tanggal Sewa</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Budi</td>
                            <td>Mawar</td>
                            <td>24-02-2022</td>
                            <td>
                                <Link
                                to={`/seeker/edit/${seeker.uuid}`}
                                className="button is-small is-info"
                                >
                                Edit
                                </Link>
                                <button
                                onClick={() => deleteSeeker(seeker.uuid)}
                                className="button is-small is-danger"
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Budi</td>
                            <td>Mawar</td>
                            <td>24-02-2022</td>
                            <td>
                                <Link
                                to={`/seeker/edit/${seeker.uuid}`}
                                className="button is-small is-info"
                                >
                                Edit
                                </Link>
                                <button
                                onClick={() => deleteSeeker(seeker.uuid)}
                                className="button is-small is-danger"
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Budi</td>
                            <td>Mawar</td>
                            <td>24-02-2022</td>
                            <td>
                                <Link
                                to={`/seeker/edit/${seeker.uuid}`}
                                className="button is-small is-info"
                                >
                                Edit
                                </Link>
                                <button
                                onClick={() => deleteSeeker(seeker.uuid)}
                                className="button is-small is-danger"
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Budi</td>
                            <td>Mawar</td>
                            <td>24-02-2022</td>
                            <td>
                                <Link
                                to={`/seeker/edit/${seeker.uuid}`}
                                className="button is-small is-info"
                                >
                                Edit
                                </Link>
                                <button
                                onClick={() => deleteSeeker(seeker.uuid)}
                                className="button is-small is-danger"
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Budi</td>
                            <td>Mawar</td>
                            <td>24-02-2022</td>
                            <td>
                                <Link
                                to={`/seeker/edit/${seeker.uuid}`}
                                className="button is-small is-info"
                                >
                                Edit
                                </Link>
                                <button
                                onClick={() => deleteSeeker(seeker.uuid)}
                                className="button is-small is-danger"
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Budi</td>
                            <td>Mawar</td>
                            <td>24-02-2022</td>
                            <td>
                                <Link
                                to={`/seeker/edit/${seeker.uuid}`}
                                className="button is-small is-info"
                                >
                                Edit
                                </Link>
                                <button
                                onClick={() => deleteSeeker(seeker.uuid)}
                                className="button is-small is-danger"
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Budi</td>
                            <td>Mawar</td>
                            <td>24-02-2022</td>
                            <td>
                                <Link
                                to={`/seeker/edit/${seeker.uuid}`}
                                className="button is-small is-info"
                                >
                                Edit
                                </Link>
                                <button
                                onClick={() => deleteSeeker(seeker.uuid)}
                                className="button is-small is-danger"
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Budi</td>
                            <td>Mawar</td>
                            <td>24-02-2022</td>
                            <td>
                                <Link
                                to={`/seeker/edit/${seeker.uuid}`}
                                className="button is-small is-info"
                                >
                                Edit
                                </Link>
                                <button
                                onClick={() => deleteSeeker(seeker.uuid)}
                                className="button is-small is-danger"
                                >
                                Delete
                                </button>
                            </td>
                        </tr>

                    {seeker.map((seeker, index) => (
                        <tr key={seeker.uuid}>

                            <td>{index + 1}</td>
                            <td>{seeker.lastName}</td>
                            <td>{seeker.tipekos}</td>
                            <td>{seeker.user.name}</td>
                            <td>
                                <Link
                                to={`/seeker/edit/${seeker.uuid}`}
                                className="button is-small is-info"
                                >
                                Edit
                                </Link>
                                <button
                                onClick={() => deleteSeeker(seeker.uuid)}
                                className="button is-small is-danger"
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <FooterComponent />
        {/* </>
      )} */}
    </>
  );
};

export default Dashboard;
