import { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Container,
  Row,
  Spinner,
  Stack,
  Button,
} from "react-bootstrap";
import { MdTimer } from "react-icons/md";
import { GetAllContents } from "../api/apiContent";
import { getThumbnail } from "../api";
import { CreateWatchLater } from "../api/apiWatchLater";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addWatchLater = async (id_content) => {
    CreateWatchLater(id_content)
      .then((response) => {
        toast.success(response.message);
      })
      .catch((err) => {
        console.log(err);
        toast.warning(err.message);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    GetAllContents()
      .then((data) => {
        setContents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className="mt-4">
      <Stack direction="horizontal" gap={3} className="mb-3">
        <h1 className="h4 fw-bold mb-0 text-nowrap ">Rekomendasi Untukmu</h1>
        <hr className="border-top border-light opacity-50 w-100" />
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
      ) : contents?.length > 0 ? (
        <Row>
          {contents?.map((content) => (
            <Col md={6} lg={4} className="mb-3" key={content.id}>
              <div
                className="card text-white"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={getThumbnail(content.thumbnail)}
                  className="card-img w-100 h-100 object-fit-cover bg-dark"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{content.title}</h5>
                  <div className="d-flex justify-content-between">
                    <p className="card-text">{content.description}</p>
                    <Button
                      variant="success"
                      onClick={() => addWatchLater({ id_content: content.id })}
                    >
                      <MdTimer />
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="dark" className="text-center">
          Tidak ada video untukmu saat ini ☹
        </Alert>
      )}
    </Container>
  );
};
export default DashboardPage;