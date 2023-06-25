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
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firestore/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const [modal, setModal] = useState<{
    show: boolean;
    title: string;
    body: string;
  }>({
    show: false,
    title: "",
    body: "",
  });
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    signIn(data);
  };
  const handleClose = () => setModal({ ...modal, show: false });

  const signIn = async (dataUser: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      setLoading(true);
      const userRef = collection(db, "user");

      // Create a query against the collection.
      const q = query(userRef, where("email", "==", dataUser?.email));
      const userExist = await getDocs(q);
      const user = userExist.docs.map((doc) => doc.data());
      if (user.length == 0) {
        const userNew = await createUserWithEmailAndPassword(
          auth,
          dataUser?.email,
          dataUser?.password
        );
        await setDoc(doc(db, "user", userNew.user.uid), {
          email: dataUser?.email,
          name: dataUser?.name,
        });
        setModal({
          ...modal,
          show: true,
          title: "Success",
          body: "User berhasil dibuat",
        });
        reset();
        setLoading(false);
        navigate("/login");
      } else {
        setModal({
          ...modal,
          show: true,
          title: "Error",
          body: "Email sudah terdaftar, silahkan coba untuk menggunakan email yang lain!",
        });
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

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
                    <h4 className="fw-bold text-white mb-4">Sign Up</h4>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                      {/* Name */}
                      {renderInputForm("name", "Name", "text")}
                      {/* Username */}{" "}
                      {renderInputForm("email", "Email", "email")}
                      {/* Password */}
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
                          Daftar
                        </Button>
                        <div className="flexAlignCenter gap-4">
                          <hr style={{ borderColor: "white" }} />
                        </div>
                      </div>
                      <div>
                        <p className="text-white">
                          Sudah punya akun?{" "}
                          <NavLink to="/login" className="text-white fw-bold">
                            Login
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
