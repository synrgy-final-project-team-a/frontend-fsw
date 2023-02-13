import React, { useEffect, useRef, useState } from "react";
import { Card, Badge, Container, Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PencariLayout from "../../layouts/pencari.layout";
import { useGetListMutation, useGetOneByPencariMutation, useGetPriceByPencariMutation } from "../../store/apis/kos";
import { durationToDurasi, rupiahFormat } from "../../store/utils/format";
import {
  faAngleDoubleRight,
  faBanSmoking,
  faBed,
  faBolt,
  faCar,
  faChair,
  faCube,
  faDesktop,
  faDroplet,
  faFan,
  faGlassWaterDroplet,
  faHouseChimneyWindow,
  faJugDetergent,
  faKitchenSet,
  faMars,
  faMarsAndVenusBurst,
  faMattressPillow,
  faMotorcycle,
  faPeopleRoof,
  faPercent,
  faPersonShelter,
  faPersonWalkingArrowLoopLeft,
  faPersonWalkingArrowRight,
  faRestroom,
  faShirt,
  faShower,
  faTelevision,
  faTemperatureArrowDown,
  faToilet,
  faToiletsPortable,
  faUser,
  faUserClock,
  faUsers,
  faVenus,
  faVenusMars,
  faWater,
  faWifi
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../store/slices/transaksiSlice";
import { faIdCard, faSnowflake } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";

const DetailKos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const token = useSelector(state => state.auth.token)

  const dateRef = useRef();
  const [kostOne, setKostOne] = useState({});
  const [price, setPrice] = useState([])
  const [selectedPrice, setSelectedPrice] = useState({})
  const [room, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});

  const [getOneHit, { isLoading, isSuccess, data }] = useGetOneByPencariMutation();
  const [getPriceHit, { isLoading: loadingPrice, isSuccess: successPrice, data: dataPrice }] = useGetPriceByPencariMutation();
  const [getListHit, { isError: errorList, isSuccess: successList, data: dataList, isLoading: loadingList }] = useGetListMutation();

  const handleSewaKos = (e) => {
    e.preventDefault()

    if (Object.keys(token).length === 0) {
      toast.error('Login terlebih dahulu!', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return
    }

    const date = dateRef.current.value

    if (date === "") {
      toast.error("Tanggal booking tidak boleh kosong", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return
    }

    const initialState = {
      status: "",
      check_in: new Date(date).toISOString(),
      price_id: selectedPrice.id,
      room_id: selectedRoom.room_id,
      kost_name: kostOne.kost_name,
      room_name: selectedRoom.room_name,
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

  const changeSelectedRoom = (e, id) => {
    const checkRoomName = (el) => {
      return el.room_id === id;
    }
    const result = room.filter(checkRoomName)
    setSelectedRoom(result[0])
    getPriceHit(result[0].room_id)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    const idKos = params.id;
    getOneHit(idKos);

    let payload = {};
    payload.duration_type = "MONTHLY";
    payload["sort-by"] = "price";
    payload["order-type"] = "asc";
    getListHit({ ...payload, page: 0, size: 3 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setKostOne(data.data.kost[0]);
      setRoom(data.data.room);

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

      setSelectedRoom(tmp_lowest);
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
        <Container>
          <Breadcrumb className="my-3">
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
          <Row className="g-3">
            <Col xs={12}>
              <Card className="skeleton" style={{ height: "450px" }}>
                &nbsp;
              </Card>
            </Col>
            <Col xs={12} lg={8}>
              <Card className="skeleton" style={{ height: "1000px" }}>
                &nbsp;
              </Card>
            </Col>
            <Col xs={12} lg={4}>
              <Card className="skeleton" style={{ height: "200px" }}>
                &nbsp;
              </Card>
            </Col>
          </Row>
        </Container>
      ) : isSuccess ? (
        <div id="detail-kos">
          {/* Tulisan  */}
          <Container className="my-3">
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/", className: "text-decoration-none" }}>
                Beranda
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{
                  to: "/pencarian/" + (
                    kostOne.province !== undefined ?
                      (kostOne.province).toLowerCase() : ""
                  ),
                  className: "text-decoration-none",
                }}
              >
                {kostOne.province}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{
                  to: "/pencarian/" + (
                    kostOne.province !== undefined ?
                      kostOne.province.toLowerCase() : ""
                  ) + "/" + (
                      kostOne.city !== undefined ?
                        kostOne.city.toLowerCase() : ""
                    ),
                  className: "text-decoration-none",
                }}
              >
                {kostOne.city}
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{kostOne.kost_name}</Breadcrumb.Item>
            </Breadcrumb>
          </Container>
          {/* End Tulisan */}

          {/* Gambar Kos */}
          <Container id="foto-kos">
            <Row>
              <Col xs={12} lg={8}>
                <img className="rounded foto-besar" src={kostOne.front_building_photo} alt={kostOne.kost_name} />
              </Col>
              <Col xs={12} lg={4} className="d-none d-lg-flex flex-column justify-content-between">
                {kostOne.front_farbuilding_photo ? <img className="img-fluid rounded foto-kecil" src={kostOne.front_farbuilding_photo} alt={kostOne.kost_name} /> : <></>}
                {selectedRoom.other_room_photo ? <img className="img-fluid rounded foto-kecil" src={selectedRoom.other_room_photo} alt={kostOne.kost_name} /> : <></>}
                {selectedRoom.inside_room_photo ? <img className="img-fluid rounded foto-kecil" src={selectedRoom.inside_room_photo} alt={kostOne.kost_name} /> : <></>}
              </Col>
            </Row>
          </Container>
          {/* End Gambar Kos */}

          {/* Isi Kos */}
          <Container>
            <Row>
              <Col xs={12} lg={8}>
                {/* Title Kos */}
                <Card className="shadow-sm mt-3">
                  <Card.Body>
                    <Card.Title className="fw-bold fs-3">{kostOne.kost_name} ({selectedRoom.room_name})</Card.Title>
                    <Card.Text className="fs-5 mb-0">
                      {kostOne.city}, {kostOne.province}
                    </Card.Text>
                    <Card.Text className="text-muted fw-bolder fs-5 mb-0">
                      {kostOne.address}
                    </Card.Text>
                    <div className="mt-2">
                      {
                        kostOne.kost_type_man === true ?
                          <Badge className="fw-normal" bg="outline-primary">
                            <FontAwesomeIcon icon={faMars} /> Putra
                          </Badge> : ""
                      }
                      {
                        kostOne.kost_type_woman === true ?
                          <Badge className="fw-normal" bg="outline-primary">
                            <FontAwesomeIcon icon={faVenus} /> Putri
                          </Badge> : ""
                      }
                      {
                        kostOne.kost_type_mixed === true ?
                          <Badge className="fw-normal" bg="outline-primary">
                            <FontAwesomeIcon icon={faVenusMars} /> Campuran
                          </Badge> : ""
                      }
                    </div>
                    <div className="mb-0 mt-3" dangerouslySetInnerHTML={{ __html: kostOne.description }} />
                  </Card.Body>
                </Card>

                {/* Spesifikasi Kos */}
                <Card className="shadow-sm mt-3">
                  <Card.Body>
                    <Card.Title className="text-muted fw-bolder fs-5 mb-2">
                      Spesifikasi Kos
                    </Card.Title>
                    <Card.Text className="fs-5 mb-1">
                      <FontAwesomeIcon icon={faCube} />{" "}
                      {selectedRoom.size_room}
                    </Card.Text>
                    {
                      kostOne.include_electricity === true ?
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faPercent} />{" "}
                          Gratis biaya listrik
                        </Card.Text> : ""
                    }
                  </Card.Body>
                </Card>

                {/* Fasilitas Kos */}
                <Card className="shadow-sm mt-3">
                  <Card.Body>
                    <Card.Title className="text-muted fw-bolder fs-5 mb-2">
                      Fasilitas Kos
                    </Card.Title>
                    <Row className="row-cols-2">
                      {kostOne.wifi === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faDroplet} />{" "}
                          Air
                        </Card.Text>
                      ) : ""
                      }
                      {kostOne.parking_car === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faCar} />{" "}
                          Parkir Mobil
                        </Card.Text>
                      ) : ""
                      }
                      {kostOne.parking_motorcycle === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faMotorcycle} />{" "}
                          Parkir Motor
                        </Card.Text>
                      ) : ""
                      }
                      {kostOne.dispenser === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faGlassWaterDroplet} />{" "}
                          Dispenser
                        </Card.Text>
                      ) : ""
                      }
                      {kostOne.laundry === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faJugDetergent} />{" "}
                          Laundry
                        </Card.Text>
                      ) : ""
                      }
                      {kostOne.kitchen === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faKitchenSet} />{" "}
                          Dapur
                        </Card.Text>
                      ) : ""
                      }
                      {kostOne.drying_ground === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faShirt} />{" "}
                          Ruang Jemur
                        </Card.Text>
                      ) : ""
                      }
                      {kostOne.living_room === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faPeopleRoof} />{" "}
                          Ruang Tamu
                        </Card.Text>
                      ) : ""
                      }
                      {kostOne.wifi === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faWifi} />{" "}
                          Wifi
                        </Card.Text>
                      ) : ""
                      }
                      {kostOne.refrigerator === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faSnowflake} />{" "}
                          Kulkas
                        </Card.Text>
                      ) : ""
                      }
                      {kostOne.kost_tv === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faTelevision} />{" "}
                          Televisi (TV)
                        </Card.Text>
                      ) : ""
                      }
                      {kostOne.electric === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faBolt} />{" "}
                          Listrik
                        </Card.Text>
                      ) : ""
                      }
                    </Row>
                  </Card.Body>
                </Card>

                {/* Fasilitas Kamar */}
                <Card className="shadow-sm mt-3">
                  <Card.Body>
                    <Card.Title className="text-muted fw-bolder fs-5 mb-2">
                      Fasilitas Kamar
                    </Card.Title>
                    <Row className="row-cols-2">
                      {
                        selectedRoom.ac === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faTemperatureArrowDown} />{" "}
                              Air Conditioner
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.pillow === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faMattressPillow} />{" "}
                              Bantal
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.fan === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faFan} />{" "}
                              Kipas Angin
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.furniture === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faToiletsPortable} />{" "}
                              Lemari Baju
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.windows === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faHouseChimneyWindow} />{" "}
                              Jendela
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.springbed === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faBed} />{" "}
                              Kasur
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.room_tv === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faTelevision} />{" "}
                              Televisi (TV)
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.table_learning === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faDesktop} />{" "}
                              Meja
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.chair === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faChair} />{" "}
                              Kursi
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.outside_bathroom === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faRestroom} />{" "}
                              Kamar Mandi Luar
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.sitting_closet === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faToilet} />{" "}
                              Toilet Duduk
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.water_heater === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faWater} />{" "}
                              Pemanas Air
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.inside_bathroom === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faRestroom} />{" "}
                              Kamar Mandi Dalam
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.non_sitting_closet === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faToilet} />{" "}
                              Toilet Jongkok
                            </Card.Text>
                          ) : ""
                      }
                      {
                        selectedRoom.shower === true ?
                          (
                            <Card.Text className="fs-5 mb-1">
                              <FontAwesomeIcon icon={faShower} />{" "}
                              Shower
                            </Card.Text>
                          ) : ""
                      }
                    </Row>
                  </Card.Body>
                </Card>

                {/* Peraturan Kos */}
                <Card className="shadow-sm mt-3">
                  <Card.Body>
                    <Card.Title className="text-muted fw-bolder fs-5 mb-2">
                      Peraturan Kos
                    </Card.Title>
                    <Row className="row-cols-2">
                      {kostOne.no_smoking === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faBanSmoking} />{" "}
                          Dilarang merokok di kamar
                        </Card.Text>
                      ) : ""}
                      {kostOne.restricted_night === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faUserClock} />{" "}
                          Ada jam malam
                        </Card.Text>
                      ) : ""}
                      {kostOne.maxixmum_one === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faUser} />{" "}
                          Maks. 1 orang / kamar
                        </Card.Text>
                      ) : ""}
                      {kostOne.maximum_two === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faUsers} />{" "}
                          Maks. 2 orang / kamar
                        </Card.Text>
                      ) : ""}
                      {kostOne.restricted_gender === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faMarsAndVenusBurst} />{" "}
                          Lawan jenis dilarang ke kamar
                        </Card.Text>
                      ) : ""}
                      {kostOne.restricted_guest === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faPersonShelter} />{" "}
                          Tamu dilarang menginap
                        </Card.Text>
                      ) : ""}
                      {kostOne.identity_card === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faIdCard} />{" "}
                          Wajib sertakan KTP saat pengajuan sewa
                        </Card.Text>
                      ) : ""}
                      {kostOne.restricted_checkin === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faPersonWalkingArrowRight} />{" "}
                          Check in pukul 14:00-21:00 (sewa harian)
                        </Card.Text>
                      ) : ""}
                      {kostOne.restricted_checkout === true ? (
                        <Card.Text className="fs-5 mb-1">
                          <FontAwesomeIcon icon={faPersonWalkingArrowLoopLeft} />{" "}
                          Check out maks. pukul 12:00 (sewa harian)
                        </Card.Text>
                      ) : ""}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} lg={4}>
                <Card className="shadow-sm mt-3 bg-outline-primary">
                  <Card.Body>
                    Harga Mulai dari
                    <p className="mb-2">
                      <strong className="fs-5">{rupiahFormat(parseInt(selectedPrice.price))}</strong> / {durationToDurasi(selectedPrice.durationType)}
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
                                <option key={i} disabled={el.price === 0} value={el.durationType}>{durationToDurasi(el.durationType)}an</option>
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

          {/* Tipe Kamar Kos */}
          <Container className="mt-4">
            <h3 className="fw-bolder">Tipe Kamar Kos</h3>
            {
              room.map((element, index) => {
                let num = 0
                return (
                  <Row className="justify-content-between my-4" key={index}>
                    <Col xs={12} lg={7} className="d-none d-lg-block">
                      <Row className="g-0">
                        <Col lg={6}>
                          <img className="img-fluid" style={{ maxHeight: "215px" }} src={element.inside_room_photo} alt={element.room_name} />
                        </Col>
                        <Col lg={6} className="px-3">
                          <h5 className="text-muted fw-bolder mb-2">{element.room_name}</h5>
                          <h5 className="fw-bolder text-muted mb-2">Ukuran Ruangan: {element.size_room} meter.</h5>
                          {
                            element.ac === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faTemperatureArrowDown} />{" "}
                                  Air Conditioner
                                </p>
                              )) : ""
                          }
                          {
                            element.pillow === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faMattressPillow} />{" "}
                                  Bantal
                                </p>
                              )) : ""
                          }
                          {
                            element.fan === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faFan} />{" "}
                                  Kipas Angin
                                </p>
                              )) : ""
                          }
                          {
                            element.furniture === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faToiletsPortable} />{" "}
                                  Lemari Baju
                                </p>
                              )) : ""
                          }
                          {
                            element.windows === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faHouseChimneyWindow} />{" "}
                                  Jendela
                                </p>
                              )) : ""
                          }
                          {
                            element.springbed === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faBed} />{" "}
                                  Kasur
                                </p>
                              )) : ""
                          }
                          {
                            element.room_tv === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faTelevision} />{" "}
                                  Televisi (TV)
                                </p>
                              )) : ""
                          }
                          {
                            element.table_learning === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faDesktop} />{" "}
                                  Meja
                                </p>
                              )) : ""
                          }
                          {
                            element.chair === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faChair} />{" "}
                                  Kursi
                                </p>
                              )) : ""
                          }
                          {
                            element.outside_bathroom === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faRestroom} />{" "}
                                  Kamar Mandi Luar
                                </p>
                              )) : ""
                          }
                          {
                            element.sitting_closet === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faToilet} />{" "}
                                  Toilet Duduk
                                </p>
                              )) : ""
                          }
                          {
                            element.water_heater === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faWater} />{" "}
                                  Pemanas Air
                                </p>
                              )) : ""
                          }
                          {
                            element.inside_bathroom === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faRestroom} />{" "}
                                  Kamar Mandi Dalam
                                </p>
                              )) : ""
                          }
                          {
                            element.non_sitting_closet === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faToilet} />{" "}
                                  Toilet Jongkok
                                </p>
                              )) : ""
                          }
                          {
                            element.shower === true && num < 5 ?
                              (num = num + 1, (
                                <p className="mb-1">
                                  <FontAwesomeIcon icon={faShower} />{" "}
                                  Shower
                                </p>
                              )) : ""
                          }
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={12} lg={3}>
                      <Card bg="outline-primary" className="kos-card shadow-sm">
                        <Card.Img className="d-block d-lg-none" variant="top" src={element.inside_room_photo} alt={element.room_name} />
                        <Card.Body className="d-flex flex-column justify-content-between">
                          <Card.Text className="text-muted fw-bolder mb-1 d-block d-lg-none">{element.room_name}</Card.Text>
                          <div>
                            {
                              kostOne.kost_type_man === true ?
                                <Badge className="fw-normal" bg="outline-primary">
                                  <FontAwesomeIcon icon={faMars} /> Putra
                                </Badge> : ""
                            }
                            {
                              kostOne.kost_type_woman === true ?
                                <Badge className="fw-normal" bg="outline-primary">
                                  <FontAwesomeIcon icon={faVenus} /> Putri
                                </Badge> : ""
                            }
                            {
                              kostOne.kost_type_mixed === true ?
                                <Badge className="fw-normal" bg="outline-primary">
                                  <FontAwesomeIcon icon={faVenusMars} /> Campuran
                                </Badge> : ""
                            }
                          </div>
                          Harga Mulai dari
                          <p className="mb-2 text-muted">
                            <strong className="fs-5 text-dark">{rupiahFormat(element.price)}</strong> / Bulan
                          </p>
                          <Button variant="light" className="fw-bolder col-12 btn-outline-primary btn-tipe-outline" onClick={e => changeSelectedRoom(e, element.room_id)}>
                            Pilih Tipe Kos
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                )
              })
            }
          </Container>
          {/* End Tipe Kamar Kos */}

          {/* Kosan Menarik di Sekitar Lokasi */}
          <Container className="mt-4">
            <Row className="d-flex justify-content-between align-items-center">
              <Col xs={12} lg="auto">
                <h3 className="fw-bolder">Lihat Kosan Menarik Di Sekitarmu</h3>
              </Col>
              <Col xs={12} lg="auto">
                <Link to="/pencarian" className="text-muted text-decoration-none">
                  Cari Lokasi lainnya <FontAwesomeIcon icon={faAngleDoubleRight} />
                </Link>
              </Col>
            </Row>
            <Row className="g-4">
              {
                loadingList ?
                  [...Array(3).keys()].map((el, i) => {
                    return (
                      <Col xs={12} lg={4} key={i}>
                        <Card bg="none" className="skeleton" style={{ height: "300px" }}>
                          &nbsp;
                        </Card>
                      </Col>
                    )
                  }) : successList ?
                    (dataList.data.map((el, i) => {
                      return (
                        <Col xs={12} lg={4} key={i} className={i >= 1 ? "d-none d-lg-block" : ""}>
                          <Card className="kos-card bg-outline-primary text-decoration-none" as={Link} to={"/kos/" + el.kost_id}>
                            <Card.Img variant="top" src={el.front_building_photo} alt={el.kost_name} />
                            <Card.Body className="d-flex flex-column justify-content-between">
                              <Card.Title>{el.kost_name}</Card.Title>
                              <Card.Text className="kos-location mb-1">{el.address}</Card.Text>
                              <Card.Text className="kos-location mb-1">
                                {el.city}, {el.province}
                              </Card.Text>
                              <Card.Text className="kos-price mb-1">
                                <span className="fw-bold">{rupiahFormat(el.price)}</span> /
                                {durationToDurasi(el.duration_type)}
                              </Card.Text>
                              <div className="d-flex justify-content-between">
                                <div className="tag">
                                  {el.kost_type_man === true ? (
                                    <Badge bg="outline-primary">
                                      <FontAwesomeIcon icon={faMars} /> Putra
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                  {el.kost_type_woman === true ? (
                                    <Badge bg="outline-primary">
                                      <FontAwesomeIcon icon={faVenus} /> Putri
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                  {el.kost_type_mixed === true ? (
                                    <Badge bg="outline-primary">
                                      <FontAwesomeIcon icon={faVenusMars} /> Campuran
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="favorite">
                                  <img src="/like.png" alt="..." />
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      )
                    })) : errorList ? (
                      <Col xs={12} className="text-center">
                        <h6 className="fw-bold"> Data gagal diambil</h6>
                      </Col>
                    ) : (
                      ""
                    )
              }
            </Row>
          </Container>
          {/* End Kosan Menarik di Sekitar Lokasi */}
        </div >
      ) : (
        ""
      )}
    </PencariLayout >
  );
};

export default DetailKos;
