/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Container,
  Button,
  Card,
  Form,
  FloatingLabel,
  Row,
  Col,
  Image,
  Modal,
} from "react-bootstrap";
import Logo from "../../../icons/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../../firestore/firestore";
import { getItem, setItem } from "../../helper/localstorage.helper";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useState } from "react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState<{
    show: boolean;
    title: string;
    body: string;
  }>({
    show: false,
    title: "",
    body: "",
  });
  const renderErrorMessage = (name: string) => {
    return (
      <ErrorMessage
        render={({ message }) => (
          <p className="mb-0" style={{ color: "white", fontSize: ".8rem" }}>
            {message}
          </p>
        )}
        errors={errors}
        name={name}
      />
    );
  };
  const onSubmit = async (data: any) => {
    setLoading(true);
    const hasilTest: any = sessionStorage.getItem("hasilTest");

    console.log(hasilTest);
    setPersistence(auth, browserSessionPersistence).then(async () => {
      return await signInWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
          const user: any = userCredential.user;
          // get user data in firestore
          const userRef = doc(db, "user", user.uid);
          await getDoc(userRef).then((docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setItem("user", { ...user, ...data });
            }
          });
          const userData = getItem("user");
          setItem("credential", user?.accessToken);
          setLoading(false);
          if (userData?.role === "admin") {
            navigate("/admin");
          } else {
            if (hasilTest) {
              const hasilTestId = await addDoc(
                collection(db, "hasil-diagnosis"),
                {
                  ...JSON.parse(hasilTest),
                  user: user?.uid,
                }
              );
              console.log(JSON.parse(hasilTest));
              return navigate(
                `/hasil-tes/${JSON.parse(hasilTest)?.hasil?.kode}?idDiagnosis=${
                  hasilTestId.id
                }`
              );
            }

            navigate("/home");
          }
        })
        .catch((error) => {
          setLoading(false);
          setModal({
            ...modal,
            show: true,
            title: "Login Gagal",
            body: "Email atau password salah",
          });
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    });
  };
  const handleClose = () => setModal({ ...modal, show: false });
  const renderInputForm = (
    name: string,
    label: string,
    type: string,
    minLength?: any
  ) => {
    return (
      <>
        {renderErrorMessage(name)}
        <FloatingLabel label={label} className="mb-4">
          <Form.Control
            type={type}
            {...register(name, {
              required: "This field is required.",
              minLength: minLength,
            })}
            placeholder={label}
          />
        </FloatingLabel>
      </>
    );
  };
  return (
    <>
      <div>
        <Container>
          <div className="px-5">
            <Row
              style={{
                minHeight: "calc(100vh - 4.75rem)",
              }}
              className="gx-6 align-items-center"
            >
              <Col sm="7">
                <Image src="illus-login.svg" fluid />
              </Col>
              <Col sm="5">
                <Card className="p-2 py-3" bg={"primary"}>
                  <Card.Body>
                    <h5 className="text-center text-white">
                      <Logo width={180} />
                    </h5>
                    <h4 className="fw-bold text-white mb-4">Login</h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      {renderInputForm("email", "Email", "text")}

                      {renderInputForm("password", "Password", "password", {
                        value: 6,
                        message: "Password minimal 6 karakter",
                      })}
                      <div className="text-center mt-4">
                        <Button
                          size="lg"
                          variant="secondary"
                          className="mb-2 w-100"
                          type="submit"
                          disabled={loading}
                        >
                          Masuk
                        </Button>
                        <div className="flexAlignCenter gap-4">
                          <hr style={{ borderColor: "white" }} />
                        </div>
                      </div>
                      <div>
                        <p className="text-white">
                          Belum punya akun?{" "}
                          <NavLink to="/signup" className="text-white fw-bold">
                            Sign Up
                          </NavLink>
                        </p>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
        <Modal centered show={modal?.show} onHide={handleClose}>
          <Modal.Header className="border-0" closeButton>
            <Modal.Title>{modal?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modal?.body}</Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
