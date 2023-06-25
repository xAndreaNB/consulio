/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firestore/firestore";

export default function KeluhanPage() {
  const { register, handleSubmit } = useForm();
  const [searchParams] = useSearchParams();
  const idDiagnosis: any = searchParams.get("idDiagnosis");

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await setDoc(
        doc(db, "hasil-diagnosis", idDiagnosis),
        {
          keluhanTambahan: data.keluhanTambahan,
        },
        { merge: true }
      );
      navigate(`/pilih-konseling?idDiagnosis=${idDiagnosis}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="bg-secondary text-white py-4"
      style={{
        minHeight: "calc(100vh - 4.75rem)",
      }}
    >
      <Container>
        <h2 className="text-center fw-bold">Tes Konseling</h2>
        <div className="justify-content-center align-items-center w-100">
          <p className="text-center mt-3 mb-5">
            Silahkan mengerjakan serangkaian soal dibawah ini dengan jujur untuk
            mengetahui hasil diagnosis Anda
            <br />
          </p>
          <Card bg="beige">
            <Card.Body className="px-5 pb-5">
              <Form className="p-5" onSubmit={handleSubmit(onSubmit)}>
                <>
                  <div className="text-center fw-bold fs-4 mb-3">
                    Apakah ada keluhan tambahan yang ingin disampaikan?
                  </div>
                  <Form.Control
                    rows={10}
                    placeholder="Sampaikan seluruh keluhanmu dengan jujur disini"
                    {...register("keluhanTambahan")}
                    as="textarea"
                  ></Form.Control>
                </>
                <div className="mt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    className="float-end  px-5 py-2"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}
