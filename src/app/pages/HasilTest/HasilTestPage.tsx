import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { stressLevel } from "../../config/variable.config";

export default function HasilTestPage() {
  const { kode } = useParams();
  const [searchParam] = useSearchParams();
  const idDiagnosis = searchParam.get("idDiagnosis");
  const navigate = useNavigate();
  const hasil = stressLevel?.find((item) => item.kode === kode);
  return (
    <>
      <Container className="mt-5 pb-4">
        <div className="text-center">
          <h2 className=" fw-bold">Hasil Diagnosis</h2>
          <p className="mb-3">
            Berikut adalah hasil diagnosa atas tes yang sudah dikerjakakan
          </p>
        </div>
        <Row className="align-items-center gx-5">
          <Col sm="6">
            <h4 className="mb-3">{hasil?.title}</h4>
            <p className="fs-6 fw-light">{hasil?.penjelasan}</p>
            <Card bg="darkBlue" className="text-white">
              <Card.Body>
                <h5 className="mb-3">Saran:</h5>

                <p
                  className="fs-6 fw-light"
                  dangerouslySetInnerHTML={{ __html: hasil?.saran as string }}
                ></p>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="6">
            <Image src="/ilusHasil.svg" fluid />
          </Col>
        </Row>

        <div className="text-center mt-5">
          <Button
            variant="primary"
            type="button"
            onClick={() =>
              navigate(`/keluhan-tambahan?idDiagnosis=${idDiagnosis}`)
            }
            className="  px-5 py-3"
          >
            Ajukan Konseling
          </Button>
        </div>
      </Container>
    </>
  );
}
