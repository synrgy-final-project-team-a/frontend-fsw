import React, { useEffect, useRef, useState } from "react";
import { Card, Badge, Container, Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PencariLayout from "../../layouts/pencari.layout";
import { useGetOneByPencariMutation, useGetPriceByPencariMutation } from "../../store/apis/kos";
import { rupiahFormat } from "../../store/utils/format";
import { faAngleDoubleRight, faMars, faVenus, faVenusMars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addBooking } from "../../store/slices/transaksiSlice";

const DetailKos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const dateRef = useRef();
  const [kostOne, setKostOne] = useState({});
  const [price, setPrice] = useState([])
  const [selectedPrice, setSelectedPrice] = useState({})
  const [roomCheapest, setRoomCheapest] = useState({});
  const [roomAll, setRoomAll] = useState([]);
  const [getOneHit, { isLoading, isSuccess, data }] = useGetOneByPencariMutation();
  const [getPriceHit, { isLoading: loadingPrice, isSuccess: successPrice, data: dataPrice }] = useGetPriceByPencariMutation();

  const handleSewaKos = (e) => {
    e.preventDefault()

    let failed = false

    const date = dateRef.current.value

    if (date === "") {
      failed = true
      alert("Tanggal booking tidak boleh kosong")
    }

    if (failed) {
      return
    }

    const initialState = {
      status: "",
      check_in: new Date(date).toISOString(),
      price_id: selectedPrice.id,
      room_id: roomCheapest.room_id,
      kost_name: kostOne.kost_name,
      room_name: roomCheapest.room_name,
      kost_address: kostOne.kost_name,
      duration_type: selectedPrice.durationType,
      price: selectedPrice.price
    }

    dispatch(addBooking(initialState))
    navigate('/pengajuan-sewa')
  }

  const changeSelectedPrice = (e, tipe) => {
    const checkDurationType = (el) => {
      return el.durationType === tipe;
    }
    const result = price.filter(checkDurationType)
    setSelectedPrice(result[0])
  }

  useEffect(() => {
    const idKos = params.id;

    getOneHit(idKos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setKostOne(data.data.kost[0]);
      setRoomAll(data.data.room);
      let lowest = Number.POSITIVE_INFINITY;
      let tmp;
      let tmp_lowest;
      for (let i = data.data.room.length - 1; i >= 0; i--) {
        tmp = parseInt(data.data.room[i].price);
        if (tmp < lowest) {
          tmp_lowest = data.data.room[i];
          lowest = tmp
        }
      }
      setRoomCheapest(tmp_lowest);

      getPriceHit(tmp_lowest.room_id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (successPrice) {
      setPrice(dataPrice.data)
      setSelectedPrice(dataPrice.data[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingPrice]);

  return (
    <PencariLayout>
      {isLoading ? (
        <div>
          <h4 className="text-center fw-bold">Loading...</h4>
        </div>
      ) : isSuccess ? (
        <div id="detail-kos">
          {/* Tulisan  */}
          <div className="container my-3">
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/", className: "text-decoration-none" }}>
                Beranda
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{
                  to: "/pencarian",
                  className: "text-decoration-none",
                }}
              >
                Pencarian
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Detail Kos</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {/* End Tulisan */}

          {/* Gambar Kos */}
          <Container id="foto-kos">
            <Row>
              <Col xs={12} lg={8}>
                <img className="rounded foto-besar" src={kostOne.front_building_photo} alt={kostOne.kost_name} />
              </Col>
              <Col xs={12} lg={4} className="d-none d-lg-flex flex-column justify-content-between">
                {kostOne.front_farbuilding_photo ? <img className="img-fluid rounded foto-kecil" src={kostOne.front_farbuilding_photo} alt={kostOne.kost_name} /> : <></>}
                {roomCheapest.other_room_photo ? <img className="img-fluid rounded foto-kecil" src={roomCheapest.other_room_photo} alt={kostOne.kost_name} /> : <></>}
                {roomCheapest.inside_room_photo ? <img className="img-fluid rounded foto-kecil" src={roomCheapest.inside_room_photo} alt={kostOne.kost_name} /> : <></>}
              </Col>
            </Row>
          </Container>
          {/* End Gambar Kos */}

          {/* Title Kos */}
          <Container>
            <Row className="d-sm-flex ">
              <Col xs={12} md={8} lg={8}>
                <Card className="shadow-sm mt-3">
                  <Card.Body>
                    <h1 className="fw-bold my-0 fs-3">{kostOne.kost_name}</h1>
                    <p className="my-0 fs-5">
                      {kostOne.city}, {kostOne.province}
                    </p>
                    <p className="text-muted fs-5 fw-bolder my-0">{kostOne.address}</p>

                    {kostOne.kost_type_man === true ? (
                      <>
                        <Badge className="fw-normal" bg="outline-primary">
                          <FontAwesomeIcon icon={faMars} /> Putra
                        </Badge>
                      </>
                    ) : kostOne.kost_type_woman === true ? (
                      <Badge className="fw-normal" bg="outline-primary">
                        <FontAwesomeIcon icon={faVenus} /> Putri
                      </Badge>
                    ) : (
                      <>
                        <Badge className="fw-normal" bg="outline-primary">
                          <FontAwesomeIcon icon={faVenusMars} /> Campuran
                        </Badge>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} lg={4} className="flex-column">
                <Card className="shadow-sm mt-3 bg-outline-primary">
                  <Card.Body>
                    Harga Mulai dari
                    <p className="mb-2">
                      <strong className="fs-5">{rupiahFormat(parseInt(selectedPrice.price))}</strong> / Bulan
                    </p>
                    <Row>
                      <Col lg={6}>
                        <Form.Group controlId="dob">
                          <Form.Control type="date" name="dob" placeholder="Pilih tanggal"
                            ref={dateRef}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Select
                          value={selectedPrice.durationType}
                          onChange={e => changeSelectedPrice(e, e.target.value)}
                        >
                          {
                            price.map((el, i) => {
                              return (
                                <option key={i} value={el.durationType}>{el.durationType}</option>
                              )
                            })
                          }
                        </Form.Select>
                      </Col>
                    </Row>
                    <Button variant="primary" className="col-12 mt-2" onClick={handleSewaKos}>
                      Pilih Tipe Kos
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* Spesifikasi Kos */}
          <Container className="my-3">
            <Row>
              <Col xs={12} md={8} lg={8}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 className="fs-4 fw-bolder">Spesifikasi Kos</h2>
                    <Container>
                      <ul id="">
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          <img src="/icons/icon-kamar.png" alt="" className="listImage" />
                          {kostOne.size_room}
                        </li>
                        <li className="list-spesifikasi-kos" id="icon-persen">
                          <img src="/icons/icon-persen.png" alt="" className="listImage" />
                          Gratis biaya listrik
                        </li>
                      </ul>
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* Fasilitas Kos */}
          <Container className="my-3">
            <Row>
              <Col xs={12} md={8} lg={8}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 className="fs-4 fw-bolder">Fasilitas Kos</h2>
                    <Container>
                      <ul className="p-0">
                        <Row className="row-cols-2">
                          {kostOne.wifi === true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Air
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.parking_car !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Parkir Mobil
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.parking_motorcycle === true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Parkir Motor
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.dispenser !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Dispenser
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.laundry !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Laundry
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.kitchen !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Dapur
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.drying_ground !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Ruang Jemur
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.living_room !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Ruang Tamu
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.wifi === true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Wifi
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.refrigerator === true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Kulkas
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.kost_tv !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Televisi (TV)
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.electric === true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Listrik
                            </li>
                          ) : (
                            <></>
                          )}
                        </Row>
                      </ul>
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          {/* <Container className="my-3">
            <Row>
              <Col xs={12} md={8} lg={8}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Text className="mb-1">
                      <h2 className="fs-4 fw-bolder">Fasilitas Kos</h2>
                      <Container>
                        <Row>
                          <Col>
                            <ul>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-kasur.png"
                                  alt=""
                                  className="listImage"
                                />{" "}
                                Kasur
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-tv.png"
                                  alt=""
                                  className="listImage"
                                />
                                Tv
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-sofa.png"
                                  alt=""
                                  className="listImage"
                                />
                                Sofa
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-kamar-mandi.png"
                                  alt=""
                                  className="listImage"
                                />
                                Kamar mandi dalam
                              </li>
                            </ul>
                          </Col>
                          <Col>
                            <ul>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-lemari.png"
                                  alt=""
                                  className="listImage"
                                />
                                Lemari baju
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-meja.png"
                                  alt=""
                                  className="listImage"
                                />
                                Meja
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-2user.png"
                                  alt=""
                                  className="listImage"
                                />
                                Berdua sekamar
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-jendela.png"
                                  alt=""
                                  className="listImage"
                                />
                                Jendela
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </Container>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container> */}

          {/* Peraturan Kos */}
          <Container className="mt-3 mb-4">
            <Row>
              <Col xs={12} md={8} lg={8}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <h2 className="fs-4 fw-bolder">Peraturan Kos</h2>
                    <Container>
                      <ul className="p-0">
                        <Row className="row-cols-2">
                          {kostOne.no_smoking !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              <img src="/icons/icon-dilarang.png" alt="" className="listImage" />
                              Dilarang merokok
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.restricted_night !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              <img src="/icons/icon-jam-malam.png" alt="" className="listImage" />
                              Jam malam: 23:00
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.maximum_one !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Maks. 1 orang / kamar
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.restricted_gender !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              <img src="/icons/icon-putra.png" alt="" className="listImage" />
                              Lawan jenis dilarang masuk
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.maximum_two !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Maks. 2 orang / kamar
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.identity_card !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Wajib sertakan KTP saat pengajuan sewa
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.restricted_guest !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Tamu dilarang menginap
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.restricted_checkin !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Check in pukul 14:00-21:00 (sewa harian)
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.restricted_checkin !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Check out maks. pukul 12:00 (sewa harian)
                            </li>
                          ) : (
                            <></>
                          )}
                          {kostOne.restricted_checkin !== true ? (
                            <li className="list-spesifikasi-kos2" id="icon-kamar">
                              Termasuk listrik
                            </li>
                          ) : (
                            <></>
                          )}
                        </Row>
                      </ul>
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          {/* <Container className="mt-3 mb-4">
            <Row>
              <Col xs={12} md={8} lg={8}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Text className="mb-1">
                      <h2 className="fs-4 fw-bolder">Peraturan Kos</h2>
                      <Container>
                        <Row>
                          <Col>
                            <ul>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-dilarang.png"
                                  alt=""
                                  className="listImage"
                                />
                                Dilarang merokok
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-putra.png"
                                  alt=""
                                  className="listImage"
                                />
                                Hanya putra
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-hormat.png"
                                  alt=""
                                  className="listImage"
                                />
                                Hormati tetangga
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-parkir.png"
                                  alt=""
                                  className="listImage"
                                />
                                Parkir yang rapi
                              </li>
                            </ul>
                          </Col>
                          <Col>
                            <ul>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-jam-malam.png"
                                  alt=""
                                  className="listImage"
                                />
                                Jam malam: 23:00
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-jaga-kebersihan.png"
                                  alt=""
                                  className="listImage"
                                />
                                Jaga kebersihan
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-dilarang.png"
                                  alt=""
                                  className="listImage"
                                />
                                Tidak berisik
                              </li>
                              <li
                                className="list-spesifikasi-kos"
                                id="icon-kamar"
                              >
                                <img
                                  src="/icons/icon-menjaga-sopan.png"
                                  alt=""
                                  className="listImage"
                                />
                                Menjaga sopan santun
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </Container>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container> */}
          {/* End Kolom Kos */}

          {/* Tipe Kamar Kos */}
          <Container>
            {" "}
            <h1 className="fs-2 fw-bolder">Tipe Kamar Kos</h1>
          </Container>

          {roomAll.map((element, index) => {
            return (
              <Container className="mb-3" key={index}>
                {/* <h5 className="fw-bolder fs-4">Tipe A</h5> */}
                <Row>
                  <Col xs={6} lg={4} className="d-none d-lg-flex">
                    <img className="img-fluid rounded" src={element.inside_room_photo} alt={element.room_name} />
                  </Col>
                  <Col xs={12} lg={4} className="border-bottom">
                    <h6 className="fw-bolder text-muted fs-5 my-0">{element.room_name}</h6>
                    <p className="fw-bolder text-muted fs-5 mt-1 mb-3">Ukuran Ruangan: {element.size_room} meter.</p>
                    <ul>
                      {element.ac !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Air Conditioner
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.pillow !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Bantal
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.fan !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Kipas Angin
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.furniture !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Lemari Baju
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.windows !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Jendela
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.springbed !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Kasur
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.room_tv !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Televisi (TV)
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.table_learning !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Meja
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.chair !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Kursi
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.outside_bathroom !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Kamar Mandi Luar
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.sitting_closet !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Toilet Duduk
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.water_heater !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Pemanas Air
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.inside_bathroom !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Kamar Mandi Dalam
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.non_sitting_closet !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Toilet Jongkok
                        </li>
                      ) : (
                        <></>
                      )}
                      {element.shower !== true ? (
                        <li className="list-spesifikasi-kos" id="icon-kamar">
                          Shower
                        </li>
                      ) : (
                        <></>
                      )}
                    </ul>
                  </Col>
                  <Col xs={6} lg={4} className="d-none d-lg-flex">
                    <Card className="shadow-sm bg-outline-primary">
                      <Card.Body>
                        {kostOne.kost_type_man === true ? (
                          <>
                            <Badge className="fw-normal" bg="outline-primary">
                              <FontAwesomeIcon icon={faMars} /> Putra
                            </Badge>
                          </>
                        ) : kostOne.kost_type_woman === true ? (
                          <Badge className="fw-normal" bg="outline-primary">
                            <FontAwesomeIcon icon={faVenus} /> Putri
                          </Badge>
                        ) : (
                          <>
                            <Badge className="fw-normal" bg="outline-primary">
                              <FontAwesomeIcon icon={faVenusMars} /> Campuran
                            </Badge>
                          </>
                        )}
                        Harga Mulai dari
                        <p className="mb-2 text-muted">
                          <strong className="fs-5 text-dark">{rupiahFormat(element.price)}</strong> / Bulan
                        </p>
                        <Button variant="light" className="fw-bolder col-12 btn-outline-primary btn-tipe-outline">
                          Pilih Tipe Kos
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            );
          })}
          {/* Template*/}
          <Container>
            {/* <h5 className="fw-bolder fs-4">Tipe A</h5> */}
            <Row>
              <Col xs={6} lg={4} className="d-none d-lg-flex">
                <img className="img-fluid rounded" src="/image/Kos1.png" alt="" />
              </Col>
              <Col xs={12} lg={4} className="border-bottom">
                <h6 className="fw-bolder text-muted fs-5 my-0">Template</h6>
                <p className="fw-bolder text-muted fs-5 mt-1 mb-3">Luas Ruangan: 12 meter.</p>
                <ul>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-kamar.png" alt="" className="listImage" />
                    Tempat tidur
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-kamar-mandi.png" alt="" className="listImage" />
                    Kamar Mandi dalam dan Heater
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-laundry.png" alt="" className="listImage" />
                    Free Laundry Baju
                  </li>
                  <li className="list-spesifikasi-kos" id="icon-kamar">
                    <img src="/icons/icon-listrik.png" alt="" className="listImage" /> Free Listrik
                  </li>
                </ul>
              </Col>
              <Col xs={6} lg={4} className="d-none d-lg-flex">
                <Card className="shadow-sm bg-outline-primary">
                  <Card.Body>
                    <Badge className="fw-normal mb-3" bg="outline-primary">
                      ♂ Pria
                    </Badge>{" "}
                    Harga Mulai dari
                    <p className="mb-2 text-muted">
                      <strong className="fs-4 text-dark">Rp 850.000</strong> / Bulan
                    </p>
                    <Button variant="light" className="fw-bolder col-12 btn-outline-primary btn-tipe-outline">
                      Pilih Tipe Kos
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* End Tipe Kamar Kos */}

          {/* Kosan Menarik di Sekitar Lokasi */}
          <Container className="mt-3">
            <Row className="d-flex justify-content-between">
              <Col xs={8}>
                <h2 className="fw-bolder text-muted">Lihat Kosan Menarik Di Sekitarmu</h2>
              </Col>
              <Col xs={4} className="text-end">
                <a href="/pencarian" className="text-muted">
                  Cari Lokasi lainnya <FontAwesomeIcon icon={faAngleDoubleRight} />
                </a>
              </Col>
            </Row>
          </Container>
          <Container className="">
            <Row className="d-flex justify-content-evenly">
              <Col lg={4} xs={12} className="d-lg-block">
                <Card className="shadow-sm">
                  <img className="img-fluid" src="/image/Kos2.png" alt="" />
                  <Card.Body>
                    {/* <Card.Title>Card Title</Card.Title> */}
                    <p style={{ margin: 0 }} className="fw-bold">
                      Indekos Bu Sapri
                    </p>
                    <p style={{ margin: 0 }} className="fw-bold text-muted fs-6">
                      Jakarta
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Rp 790.000 </strong> / bulan
                    </p>
                    <Badge className="fw-normal mx-0" bg="outline-primary">
                      ♂ Pria
                    </Badge>{" "}
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} className="d-none d-lg-block">
                <Card className="shadow-sm">
                  <img className="img-fluid" src="/image/Kos2.png" alt="" />
                  <Card.Body>
                    {/* <Card.Title>Card Title</Card.Title> */}
                    <p style={{ margin: 0 }} className="fw-bold">
                      Indekos Bu Sapri
                    </p>
                    <p style={{ margin: 0 }} className="fw-bold text-muted fs-6">
                      Jakarta
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Rp 790.000 </strong> / bulan
                    </p>
                    <Badge className="fw-normal mx-0" bg="outline-primary">
                      ♂ Pria
                    </Badge>{" "}
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} className="d-none d-lg-block">
                <Card className="shadow-sm">
                  <img className="img-fluid" src="/image/Kos2.png" alt="" />
                  <Card.Body>
                    <p style={{ margin: 0 }} className="fw-bold">
                      Indekos Bu Sapri
                    </p>
                    <p style={{ margin: 0 }} className="fw-bold text-muted fs-6">
                      Jakarta
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong>Rp 790.000 </strong> / bulan
                    </p>
                    <Badge className="fw-normal mx-0" bg="outline-primary">
                      ♂ Pria
                    </Badge>{" "}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* End Kosan Menarik di Sekitar Lokasi */}
        </div>
      ) : (
        ""
      )}
    </PencariLayout>
  );
};

export default DetailKos;
