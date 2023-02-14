import { useEffect } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  useDeleteKosByPenyewaMutation,
  useGetListByPenyewaMutation,
} from "../../store/apis/kos";
import { toast } from "react-toastify";

const ListKos = () => {
  const profileId = useSelector((state) => state.auth.token.profile_id);

  const [getListHit, { isLoading, isSuccess, isError, data }] =
    useGetListByPenyewaMutation();

  const [
    deleteHit,
    {
      isLoading: loadingDelete,
      isSuccess: successDelete,
      isError: errorDelete,
    },
  ] = useDeleteKosByPenyewaMutation();

  const handleDeleteKos = (e, id, name) => {
    e.preventDefault();

    let confirm = window.confirm(`Apakah anda yakin ingin menghapus ${name}?`);

    if (!confirm) {
      return;
    }

    toast.loading("Sedang menghapus kos", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    deleteHit(id);
  };

  useEffect(() => {
    if (successDelete) {
      toast.dismiss();
      toast.success("Sukses menghapus kos", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      const pageList = 0;
      const sizeList = 100;
      getListHit({ idProfile: profileId, page: pageList, size: sizeList });
    }

    if (errorDelete) {
      toast.dismiss();
      toast.error("Gagal menghapus kos", {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingDelete]);

  useEffect(() => {
    const pageList = 0;
    const sizeList = 100;
    getListHit({ idProfile: profileId, page: pageList, size: sizeList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-3">
      <Row className="g-3">
        {isLoading ? (
          [...Array(2).keys()].map((el, i) => {
            return (
              <Col xs={12} lg={6} key={i}>
                <Card className="skeleton" style={{ height: "250px" }}>
                  &nbsp;
                </Card>
              </Col>
            );
          })
        ) : isSuccess ? (
          data.data.content.length !== 0 ? (
            data.data.content.map((el, i) => {
              return (
                <Col xs={12} lg={6} key={i}>
                  <Card
                    bg="outline-primary"
                    className="flex-row"
                    style={{ height: "100%" }}
                  >
                    <Card.Img src="/banner.png" />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{el.kostName}</Card.Title>
                      <Card.Text>{el.address}</Card.Text>
                      <div>
                        {el.kostTypeMan === true ? (
                          <Badge bg="outline-primary">Putra</Badge>
                        ) : (
                          ""
                        )}
                        {el.kostTypeWoman === true ? (
                          <Badge bg="outline-warning">Putri</Badge>
                        ) : (
                          ""
                        )}
                        {el.kostTypeMixed === true ? (
                          <Badge bg="outline-info">Campuran</Badge>
                        ) : (
                          ""
                        )}
                      </div>
                      <br />
                      <Card.Text className="text-end mt-auto p-2">
                        <div className="d-flex flex-row-reverse">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="m-1"
                            disabled={loadingDelete}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="m-1"
                            disabled={loadingDelete}
                            onClick={(e) =>
                              handleDeleteKos(e, el.id, el.kostName)
                            }
                          >
                            Hapus
                          </Button>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <h3>Tidak ada kos</h3>
          )
        ) : isError ? (
          <h3>Error.</h3>
        ) : (
          ""
        )}
      </Row>
    </div>
  );
};

export default ListKos;
