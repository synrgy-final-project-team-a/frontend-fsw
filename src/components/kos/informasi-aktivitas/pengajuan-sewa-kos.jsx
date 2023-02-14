import { useEffect } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTransactionListMutation } from "../../../store/apis/transaction";

const PengajuanSewa = () => {

  const [transactionListHit, { isLoading, isSuccess, data }] = useTransactionListMutation();
  const token = useSelector(state => state.auth.token.access_token);
  const userData = useSelector(state => state.auth.token.profile_id);


  useEffect(() => {
    transactionListHit({ token: token, id: userData });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Row >
        {isLoading ?
          [...Array(6).keys()].map((el, i) => {
            return (
              <Col xs={12} lg={4} key={i} className="my-2">
                <Card className="skeleton" style={{ height: "200px" }}>
                  &nbsp;
                </Card>
              </Col>
            );
          }) :
          isSuccess ?
            data.data.content.map((el, i) => {
              return (
                <Col xs={12} lg={4} className="my-2">
                  <Card bg="outline-primary" className="flex-row" key={i} style={{ height: "100%" }}>
                    <Card.Img src={el.front_building_photo} />
                    <Card.Body className="d-flex flex-column justify-content-center px-2 py-2 pt-1">
                      {el.status === "REVIEWED" || el.status === "APPROVED" ?
                        <Card.Title className="fw-bold fs-5 lh-base fs-6">Pembayaran Sewa Kos</Card.Title> :
                        el.status === "REJECTED" ?
                          "" :
                          <Card.Title className="fw-bold fs-5 lh-base fs-6">Pengajuan Sewa Kos</Card.Title>
                      }
                      <Card.Text className="mb-1 nama-kos">
                        {el.kost_name}
                      </Card.Text>
                      <Card.Text className="mb-0 alamat-kos">
                        {el.address}
                      </Card.Text>
                      <div className="d-flex flex-row-reverse py-1">
                        {el.status === "CONFIRMED" ?
                          <Badge className="status-confirmed py-0" bg="none">
                            Pengajuan Telah Dikonfirmasi
                            <span className="px-1"><img src="/tick-circle.png" alt="" /></span>
                          </Badge> :
                          el.status === "POSTED" ?
                            <Badge className="status-posted py-0" bg="none">
                              Menunggu Konfirmasi Anda
                              <span className="px-1"><img src="/clock-yellow.png" alt="" /></span>
                            </Badge> :
                            el.status === "CANCELLED" ?
                              <Badge className="status-cancelled py-0" bg="none">
                                Pengajuan Sewa Dibatalkan
                                <span className="px-1"><img src="/close-circle.png" alt="" /></span>
                              </Badge> :
                              el.status === "REJECTED" ?
                                <Badge className="status-cancelled py-0" bg="none">
                                  Ditolak
                                  <span className="px-1"><img src="/close-circle.png" alt="" /></span>
                                </Badge> :
                                el.status === "APPROVED" ?
                                  <Badge className="status-confirmed py-0" bg="none">
                                    Pembayaran Telah Diterima
                                    <span className="px-1"><img src="/tick-circle.png" alt="" /></span>
                                  </Badge> :
                                  el.status === "REVIEWED" ?
                                    <Badge className="status-posted py-0" bg="none">
                                      Menunggu Persetujuan Anda
                                      <span className="px-1"><img src="/clock-yellow.png" alt="" /></span>
                                    </Badge> :
                                    ""
                        }

                      </div>
                      {el.status === "REJECTED" ?
                        "" :
                        <div className="d-flex flex-row-reverse">
                          <Button as={Link} to={`/penyewa/kos/detail-pengajuan/${el.booking_id}`} variant="primary" size="sm" className="m-1">
                            <img className="mb-1 me-2" src="/document-forward.png" alt="" />
                            Pratinjau</Button>
                        </div>
                      }

                    </Card.Body>
                  </Card>
                </Col>
              )
            })
            : <h5>Gagal mengambil data</h5>
        }
      </Row>
    </>
  )
}

export default PengajuanSewa;