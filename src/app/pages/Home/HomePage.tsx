import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Container style={{ minHeight: "calc(100vh - 6rem)" }} className="position-relative">
        <div id="about-us" className="my-5">
          <h1 className="text-center fw-bold">Selamat Datang di Consulio !</h1>
          <div className="d-flex flex-column justify-content-center align-items-center d-flex">
            <p className="text-center mb-4 mt-2 w-75 fw-bold">
              Yuk, Lakukan Test untuk Melihat Permasalahanmu
              <br />
            </p>
            <Button
              style={{
                height: "8.375rem",
              }}
              className=" my-2 px-5 text-white"
              variant="primary"
              onClick={() => navigate("/tes-konseling")}
            >
              <span className="fw-bold">Mulai Tes Konseling</span>
            </Button>
          </div>
          <img className="img-fluid mt-md-0 mt-3 position-absolute bottom-0" style={{zIndex:-1}} src="bg-home.svg" />
        </div>
      </Container>
    </>
  );
}
