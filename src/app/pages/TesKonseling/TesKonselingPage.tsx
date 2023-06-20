/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import {
  answerConfig,
  questionConfig,
  stressLevel,
} from "../../config/variable.config";
import { getItem } from "../../helper/localstorage.helper";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firestore/firestore";
import { useNavigate } from "react-router-dom";

export default function TesKonselingPage() {
  const { register, watch, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    // hapus keluhanTambahan sementara
    const tempData = { ...data };
    delete tempData.keluhanTambahan;
    // hapus keluhanTambahan sementara

    // ubah object ke array
    // cfPergejala = cf(H,e)
    const cfPerGejala = Object.entries(tempData)?.map((item) => {
      // console.log(item)

      // Mencari nilai cfPakar pertanyaan
      const qValue: any = questionConfig?.find(
        (itemQ) => itemQ.kode === item[0]
      )?.cf;
      // console.log(qValue)
      // Mencari nilai cfPakar pertanyaan

      return {
        kode: item[0],
        answer: item[1], // cfUser
        questionValue: qValue, // cfPakar
        result: qValue * Number(item[1]),
      };
    });

    let temp: any = -1;
    // cfCombine per Stress level
    const cfPerStressLevel = stressLevel?.map((item) => {
      //count result per gejala in stress level
      if (temp != -1) {
        temp = -1;
      }
      // Looping sejumlah gejala tiap stress level
      item?.gejala?.map((_, index) => {
        if (index !== item?.gejala?.length - 1) {
          if (temp == -1) {
            // cf(h,e)old ke - (index+1)
            temp = 0;

            // cf(h,e)1 (cari hasil kali cfPakar x cfUser)
            const g1: any = cfPerGejala?.find(
              (itemGejala) => itemGejala.kode === item?.gejala[index]
            )?.result;

            // cf(h,e)2 (cari hasil kali cfPakar x cfUser)
            const g2: any = cfPerGejala?.find(
              (itemGejala) => itemGejala.kode === item?.gejala[index + 1]
            )?.result;

            // cf(h,e)old ke - (index+1)
            temp = g1 + g2 * (1 - g1);
          } else {
            // cf(h,e) (index + 1) (cari hasil kali cfPakar x cfUser)
            const g: any = cfPerGejala?.find(
              (itemGejala) => itemGejala.kode === item?.gejala[index + 1]
            )?.result;

            // cf new = cf old + gejala * (1- cf old)
            temp = temp + g * (1 - temp);
          }
        }
      });
      return {
        ...item,
        result: temp,
      };
    });

    // ngambil nilai tertinggi dari semua stress level
    const maxCf = cfPerStressLevel.reduce(function (prev: any, current: any) {
      console.log(prev, current);
      return prev.result > current.result ? prev : current;
    });

    const user = getItem("user");

    const hasilTest = await addDoc(collection(db, "hasil-diagnosis"), {
      user: user?.uid,
      keluhanTambahan: data.keluhanTambahan,
      hasil: {
        kode: maxCf?.kode,
        nama: maxCf?.title,
      },
    });

    navigate(`/hasil-tes/${maxCf?.kode}?idDiagnosis=${hasilTest.id}`);
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
            <Card.Body className="px-5">
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Looping question */}
                {questionConfig?.map((itemQ, indexQ) => (
                  <div className="quiz" key={indexQ}>
                    {/* Nomor Pertanyaan */}
                    <h2 className="quiz-question">{indexQ + 1}.</h2>
                    {/* Nomor Pertanyaan */}

                    {/* Pertanyaan */}
                    <p>{itemQ?.question}</p>
                    {/* Pertanyaan */}

                    {/* Looping Jawaban */}
                    {answerConfig?.map((item, indexAnswer) => (
                      <OptionSelectContainer
                        htmlFor={`${item.label}-${indexQ}-${indexAnswer}`}
                        key={indexAnswer}
                        className={`w-100 ${
                          watch(`${itemQ?.kode}`) === item?.value.toString()
                            ? "checked"
                            : ""
                        }`}
                      >
                        <Form.Check
                          type="radio"
                          value={item.value}
                          label={item.label}
                          // Pilihan jawaban per pertanyaan
                          {...register(`${itemQ?.kode}`, {
                            required: true,
                          })}
                          // Pilihan jawaban per pertanyaan

                          id={`${item.label}-${indexQ}-${indexAnswer}`}
                        />
                      </OptionSelectContainer>
                    ))}
                    {/* Looping Jawaban */}
                  </div>
                ))}
                <div className="text-center mb-3">
                  Apakah ada keluhan tambahan yang ingin disampaikan?
                </div>
                <Form.Control
                  rows={10}
                  {...register("keluhanTambahan")}
                  as="textarea"
                ></Form.Control>
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

const OptionSelectContainer = styled.label`
  border-radius: 0.5rem;
  border: 3px solid var(--bs-gray-400);
  margin-bottom: 1rem;
  padding: 1rem;
  color: var(--bs-gray-500);
  cursor: pointer;
  font-weight: 700;
  &.checked {
    background: var(--bs-primary);
    color: var(--bs-white);
  }
  .form-check-input {
    border-width: 3px;
  }
  .form-check-input:checked[type="radio"] {
    background-color: var(--bs-white);
    accent-color: #ed3944;

    --bs-form-check-bg-image: url(
      data:image/svg + xml;charset=UTF-8,
      %3csvgxmlns="http://www.w3.org/2000/svg"viewBox="-4 -4 8 8"%3e%3ccircler="2"fill="%23ed3944"/%3e%3c/svg%3e
    );
  }
`;
