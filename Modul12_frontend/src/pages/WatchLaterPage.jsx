
import {
  Container,
  Stack,
  Button,
  Spinner,
  Alert,
  Col,
  Row,
  Card,
  Modal,
} from "react-bootstrap";

import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getThumbnail } from "../api";
import { DeleteWatchLater, GetAllData } from "../api/apiWatchLater";
import { format } from "date-fns";

const WatchLaterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [watchLater, setWatchLater] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState(null);
  const [filter, setFilter] = useState("");

  const deleteWatchLater = (id) => {
    setIsPending(true);
    DeleteWatchLater(id)
      .then((response) => {
        setIsPending(false);
        toast.success(response.message);
        fetchWatchLater();
        handleCloseModalDelete();
      })
      .catch((err) => {
        setIsPending(false);
        toast.warning(err.message);
      });
  };

  const handleShowModalDelete = (id) => {
    setItemDelete(id);
    setShowModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setShowModalDelete(false);
    setItemDelete(null);
  };

  const fetchWatchLater = (filter) => {
    setIsLoading(true);
    GetAllData(filter)
      .then((response) => {
        setWatchLater(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    fetchWatchLater(selectedFilter);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd");
  };

  useEffect(() => {
    fetchWatchLater();
  }, []);

  return (
    <Container className="mt-4">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-nowrap">Watch Later Videos</h1>
        <hr className="border-top border-light opacity-50 w-75" />
        <form action="">

        </form>
      </Stack>
      {isLoading ? (
        <div className="text-center">
          <Spinner
            as="span"
            animation="border"
            variant="primary"
            size="lg"
            role="status"
            aria-hidden="true"
          />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : watchLater?.length > 0 ? (
        <Container>
          {watchLater?.map((item) => {
            return (
              <Card key={item.id} className="mt-4">
                <Card.Body className="p-0">
                  <Row>
                    <Col key={item.id} md={4}>
                      <div
                        style={{
                          width: "400px",
                          height: "200px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={getThumbnail(item.content.thumbnail)}
                          className="card-img"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          alt="Tidak Ada Gambar"
                        />
                      </div>
                    </Col>
                    <Col key={item.id} md={8} className="pe-3">
                      <div className="d-flex justify-content-between pe-3 pt-3">
                        <h2 className="text-white fw-bold">
                          {item.content.title}
                        </h2>
                        <p>
                          Tanggal Ditambahkan: {formatDate(item.date_added)}
                        </p>
                      </div>
                      <p>{item.content.description} </p>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="danger"
                        className="position-absolute bottom-0 end-0 mb-2 me-2"
                        onClick={() => handleShowModalDelete(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      ) : (
        <Alert variant="dark" className="mt-3 text-center">
          Belum ada video di Watch Later, yuk tambah Video !
        </Alert>
      )}

      <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
        <Modal.Header>
          Apakah Anda yakin ingin menghapus video ini dari Watch Later?
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalDelete}>
            Batal
          </Button>

          {isPending ? (
            <Button variant="danger" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() => deleteWatchLater(itemDelete)}
            >
              Hapus
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default WatchLaterPage;
