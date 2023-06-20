import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Image, Row } from "react-bootstrap";

export default function AboutUsPage() {
  return (
    <>
      <Container className="py-4">
        <h2 className="text-center mb-5">Tentang Kami</h2>
        <Row className="align-items-center gx-10">
          <Col sm="5">
            <Image src="ilus-aboutus.svg" fluid width={"100%"} />
          </Col>
          <Col sm="7">
            <h4>
              Apa itu <span className="text-primary fw-bold">Consulio</span>?
            </h4>
            <p className="mb-4">
              Consulio adalah sebuah website yang menyediakan dan memberikan
              layanan konsultasi kesehatan mental berbasis tingkat stres para
              mahasiswa aktif di dunia perkuliahan. Pada website ini, mahasiswa
              dapat mengikuti tes konseling untuk melihat hasil diagnosis dari
              jawaban yang diberikan dan dapat mengajukan konsultasi ke pihak
              Student Support UMN atau Konselor Sebaya UMN.
            </p>

            <h4>Hubungi Kami</h4>
            <div className="d-flex mb-3 align-items-center gap-2">
              <FontAwesomeIcon
                icon={faPhone}
                size={"2x"}
                className="text-primary"
              />
              <span>08xx-xxxx-xxxx (Admin 1)</span>
            </div>
            <div className="d-flex mb-3 align-items-center gap-2">
              <FontAwesomeIcon
                icon={faPhone}
                size={"2x"}
                className="text-primary"
              />
              <span>08xx-xxxx-xxxx (Admin 2)</span>
            </div>
            <div className="d-flex mb-3 align-items-center gap-2">
              <FontAwesomeIcon
                icon={faPhone}
                size={"2x"}
                className="text-primary"
              />
              <span>08xx-xxxx-xxxx (Admin 3)</span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
