/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";
import { getItem } from "../../helper/localstorage.helper";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firestore/firestore";

export default function PilihKonselingPage() {
  const [searchParams] = useSearchParams();
  const idDiagnosis = searchParams.get("idDiagnosis");
  const user = getItem("user");
  const navigate = useNavigate();

  const onClickPilihan = async (jenis_konseling: any) => {
    await addDoc(collection(db, "jadwal-konseling"), {
      id_hasil_diagnosis: idDiagnosis,
      id_mahasiswa: user?.uid,
      jenis_konseling: jenis_konseling,
      status: "pending",
      created_at: new Date(),
    });
    navigate(`/penjadwalan?jenis=${jenis_konseling}`);
  };

  return (
    <>
      <Container className="py-3">
        <h1 className="text-center mb-5 pb-5">
          Pilih Jenis Konseling yang Diinginkan
        </h1>
        <Row className="gx-10">
          <Col sm="6">
            <PilihanCard onClick={() => onClickPilihan("student-support")}>
              <Card.Body>
                <div className="text-center text-darkBlue">
                  <h2>Konseling Student Support</h2>
                  <Image
                    width={100}
                    className="my-4"
                    src="studentSupport.svg"
                  />{" "}
                </div>
                <p className=" fw-light mb-0">
                  Student Support UMN adalah layanan untuk membantu para
                  mahasiswa yang memiliki masalah seputar kesehatan mental oleh
                  orang yang berpengalaman dibidangnya seperti psikolog dan
                  lainnya
                </p>
              </Card.Body>
            </PilihanCard>
          </Col>
          <Col sm="6">
            <PilihanCard onClick={() => onClickPilihan("konselor-sebaya")}>
              <Card.Body>
                <div className="text-center text-darkBlue">
                  <h2>Konseling Konselor Sebaya</h2>
                  <Image
                    width={100}
                    className="my-4"
                    src="studentConselor.svg"
                  />{" "}
                </div>
                <p className=" fw-light mb-0">
                  Konselor Sebaya adalah program yang bersifat periodik dimana
                  pihak yang berkonsultasi juga merupakan seorang mahasiswa yang
                  akan didampingi dan dibimbing oleh salah satu staff Student
                  Support
                </p>
              </Card.Body>
            </PilihanCard>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const PilihanCard = styled(Card)`
  border: 3px solid var(--bs-gray-300);
  cursor: pointer;
  border-radius: 1rem;
  &:hover {
    border-color: var(--bs-darkBlue);
  }
  .card-body {
    padding: 2rem;
  }
`;
