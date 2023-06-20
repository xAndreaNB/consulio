/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { db } from "../../../firestore/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DiagnosisPage() {
  const [open, setOpen] = useState(false);
  const [dataTable, setDataTable] = useState<any>();
  const [displayed, setDisplayed] = useState<any>();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { register, handleSubmit, reset, setValue } = useForm();

  function getItemsForPage(page: number) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const temp = dataTable;

    return temp?.slice(startIndex, endIndex);
  }

  const onSubmit = async (data: any) => {
    const params = {
      ...data,
      created_at: new Date(),
    };
    const id = params?.id;
    delete params.id;

    try {
      if (id) {
        await setDoc(doc(db, "data-diagnosis", id), params);
      } else {
        await addDoc(collection(db, "data-diagnosis"), params);
      }
      getData();
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const q = query(
        collection(db, "data-diagnosis"),
        orderBy("created_at", "desc")
      );
      const docSnap = await getDocs(q);
      setDataTable(docSnap);
      const temp: any[] = [];
      docSnap?.forEach((e: any) => {
        const data = {
          ...e?.data(),
          id: e?.id,
        };
        temp?.push(data);
      });
      setCurrentPage(1);
      setDataTable(() => temp);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (data: any) => {
    const id = data?.id;
    try {
      await deleteDoc(doc(db, "data-diagnosis", id));
    } catch (e) {
      console.log(e);
    }

    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const data = getItemsForPage(currentPage);
    setDisplayed(data);
    setTotalPage(Math.ceil(dataTable?.length / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable, currentPage]);

  console.log(totalPage, currentPage);
  return (
    <Container>
      <div className="container-fluid">
        <Button onClick={() => setOpen(!open)} className="btn-lg px-5 mb-3">
          <span className="fw-bold">+ Tambah</span>
        </Button>
        <Collapse in={open}>
          <div className="card shadow mb-4 collapse" id="multiCollapseExample1">
            <div className="card-body">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="mb-3 col-6">
                    <FormGroup>
                      <FormLabel>Kode Diagnosis</FormLabel>
                      <CustomFormControl
                        {...register("kode_diagnosis")}
                        type="text"
                      />
                    </FormGroup>
                  </div>
                  <div className="mb-3 col">
                    <FormGroup>
                      <FormLabel>Diagnosis</FormLabel>
                      <CustomFormControl
                        {...register("nama_diagnosis")}
                        type="text"
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="mb-3">
                  <FormGroup>
                    <FormLabel>Penjelasan</FormLabel>
                    <Form.Control
                      {...register("penjelasan_diagnosis")}
                      as={"textarea"}
                    />
                  </FormGroup>
                </div>
                <div className="mb-3">
                  <FormGroup>
                    <FormLabel>Solusi</FormLabel>
                    <Form.Control
                      {...register("solusi_diagnosis")}
                      as={"textarea"}
                    />
                  </FormGroup>
                </div>

                <div className="d-flex justify-content-end">
                  <Button
                    type="button"
                    variant=""
                    onClick={() => {
                      setOpen(!open);
                      reset();
                    }}
                  >
                    <span>Batal</span>
                  </Button>
                  <Button type="submit" className="px-4 py-2" name="submit">
                    <span>Submit</span>
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Collapse>
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered overflow-auto"
                id="dataTable"
              >
                <thead>
                  <tr>
                    <th scope="col">Kode Diagnosis</th>
                    <th scope="col">Diagnosis</th>
                    <th scope="col">Penjelasan</th>
                    <th scope="col">Solusi</th>
                    <th scope="col">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {displayed?.map((e: any, index: any) => (
                    <tr key={index}>
                      <td>{e?.kode_diagnosis}</td>
                      <td>{e?.nama_diagnosis}</td>
                      <td>{e?.penjelasan_diagnosis}</td>
                      <td>{e?.solusi_diagnosis}</td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          className="text-white me-2"
                          onClick={() => {
                            Object?.entries(e)?.map((e) => {
                              setValue(`${e[0]}`, `${e[1]}`);
                            });
                            setOpen(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="text-white"
                          onClick={() => {
                            handleDelete(e);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                Showing{" "}
                {currentPage < totalPage
                  ? displayed?.length * currentPage
                  : dataTable?.length}{" "}
                of {dataTable?.length} entries
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination mb-0">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="16"
                        height="16"
                        viewBox="0,0,256,256"
                      >
                        <g
                          fill="currentColor"
                          fill-rule="evenodd"
                          stroke="none"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="round"
                          stroke-miterlimit="2"
                          stroke-dasharray=""
                          stroke-dashoffset="0"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                        >
                          <g transform="scale(16,16)">
                            <path d="M9.03,13.47l-5.469,-5.47l5.469,-5.47c0.293,-0.292 0.293,-0.768 0,-1.06c-0.292,-0.293 -0.768,-0.293 -1.06,0l-6,6c-0.293,0.293 -0.293,0.767 0,1.06l6,6c0.292,0.293 0.768,0.293 1.06,0c0.293,-0.292 0.293,-0.768 0,-1.06z"></path>
                            <path d="M14.03,13.47l-5.469,-5.47l5.469,-5.47c0.293,-0.292 0.293,-0.768 0,-1.06c-0.292,-0.293 -0.768,-0.293 -1.06,0l-6,6c-0.293,0.293 -0.293,0.767 0,1.06l6,6c0.292,0.293 0.768,0.293 1.06,0c0.293,-0.292 0.293,-0.768 0,-1.06z"></path>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </li>

                  <li
                    className={`page-item ${
                      currentPage === totalPage ? "disabled" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="16"
                        height="16"
                        viewBox="0,0,256,256"
                      >
                        <g
                          transform="translate(256,256) rotate(-180)"
                          fill="currentColor"
                          fill-rule="evenodd"
                          stroke="none"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="round"
                          stroke-miterlimit="2"
                          stroke-dasharray=""
                          stroke-dashoffset="0"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                        >
                          <g transform="scale(16,16)">
                            <path d="M9.03,13.47l-5.469,-5.47l5.469,-5.47c0.293,-0.292 0.293,-0.768 0,-1.06c-0.292,-0.293 -0.768,-0.293 -1.06,0l-6,6c-0.293,0.293 -0.293,0.767 0,1.06l6,6c0.292,0.293 0.768,0.293 1.06,0c0.293,-0.292 0.293,-0.768 0,-1.06z"></path>
                            <path d="M14.03,13.47l-5.469,-5.47l5.469,-5.47c0.293,-0.292 0.293,-0.768 0,-1.06c-0.292,-0.293 -0.768,-0.293 -1.06,0l-6,6c-0.293,0.293 -0.293,0.767 0,1.06l6,6c0.292,0.293 0.768,0.293 1.06,0c0.293,-0.292 0.293,-0.768 0,-1.06z"></path>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const CustomFormControl = styled(FormControl)`
  height: 3rem;
`;
