import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PenjadwalanPage() {
  const [searchParams] = useSearchParams();
  const jenis = searchParams.get("jenis");
  const navigate = useNavigate();

  return (
    <>
      <Container className="py-5">
        <Row
          style={{
            minHeight: "81.1vh",
          }}
          className="gx-10 align-items-center"
        >
          {jenis === "student-support" && (
            <>
              <Col sm="6">
                <h5 className="fw-bold mb-5">Konseling Student Support</h5>
                <p className="mb-5">
                  Student Support UMN merupakan salah satu layanan yang
                  disediakan oleh pihak kampus untuk membantu para mahasiswa
                  yang memiliki masalah seputar kesehatan mental. Student
                  Support UMN terdiri dari orang yang berpengalaman dibidangnya
                  seperti psikolog dan lainnya.
                </p>
                <Card bg="primary">
                  <Card.Body className="text-white">
                    <p className="fw-bold">
                      Info Diskusi Jadwal Konseling dengan Student Support akan
                      Dikirim Lewat Email
                    </p>
                    <p className="fw-light mb-0 fs-mini">
                      Mohon periksa folder Spam atau Email Massal secara
                      berkala. Email yang kami kirim mungkin tertangkap oleh
                      filter email massal atau spam dalam sistem email Anda.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="6">
                <Image src="illus-penjadwalan.svg" fluid />
              </Col>
            </>
          )}
          {jenis === "konselor-sebaya" && (
            <>
              <Col sm="6">
                <h5 className="fw-bold mb-5">Konseling Konselor Sebaya</h5>
                <p className="mb-5">
                  Konselor Sebaya merupakan salah satu program yang dimiliki
                  oleh Student Support UMN dan bersifat periodik. Program ini
                  ditujukan kepada para mahasiswa yang ingin merasakan
                  pengalaman bagaimana rasanya menjadi seorang konselor dan
                  membantu orang lain dalam menyelesaikan masalahnya. Pihak yang
                  berkonsultasi juga merupakan seorang mahasiswa, maka dari itu
                  program ini memiliki nama "Konselor Sebaya". Selama program
                  berlangsung, setiap konselor akan didampingi dan dibimbing
                  oleh salah satu staff Student Support sampai program selesai..
                </p>
                <Card bg="primary">
                  <Card.Body className="text-white">
                    <p className="fw-bold">
                      Info Diskusi Jadwal Konseling dengan Konselor Sebaya akan
                      Dikirim Lewat Email
                    </p>
                    <p className="fw-light mb-0 fs-mini">
                      Mohon periksa folder Spam atau Email Massal secara
                      berkala. Email yang kami kirim mungkin tertangkap oleh
                      filter email massal atau spam dalam sistem email Anda.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm="6">
                <Image src="illus-penjadwalan.svg" fluid />
              </Col>
            </>
          )}
          <Col>
            <div className="text-center">
              <Button className=" px-5 py-3" onClick={() => navigate("/")}>
                Kembali ke Halaman Utama
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
