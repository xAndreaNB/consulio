/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Container,
  Dropdown,
  Form,
  Table,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { db } from "../../../firestore/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Select from "react-select";

export default function JadwalKonselingPage() {
  const [dataTable, setDataTable] = useState<any>();
  const [displayed, setDisplayed] = useState<any>();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [open, setOpen] = useState<any>([]);

  const { setValue, getValues } = useForm();

  function getItemsForPage(page: number) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const temp = dataTable;
    const data = temp?.slice(startIndex, endIndex);
    data?.map(() => {
      setOpen((prev: any) => [...prev, false]);
    });
    return data;
  }

  const getData = async () => {
    try {
      const q = query(
        collection(db, "jadwal-konseling"),
        orderBy("created_at", "desc")
      );
      const temp: any[] = [];
      const docSnap = await getDocs(q);
      docSnap?.forEach((e: any) => {
        const data = {
          ...e?.data(),
          id: e?.id,
        };
        temp?.push(data);
      });
      await Promise.all(
        temp.map(async (e) => {
          const userDoc = await getDoc(doc(db, "user", e.id_mahasiswa));
          const dataMahasiswa = userDoc.data();
          e["mahasiswa"] = dataMahasiswa;
        })
      );

      await Promise.all(
        temp.map(async (e) => {
          const diagnosisDoc = await getDoc(
            doc(db, "hasil-diagnosis", e.id_hasil_diagnosis)
          );
          const dataDiagnosis = diagnosisDoc.data();
          e["diagnosis"] = dataDiagnosis;
        })
      );

      setCurrentPage(1);
      setDataTable(() => temp);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(dataTable);

  useEffect(() => {
    getData();
  }, []);

  const handleSetTanggal = async (date: any, id: any) => {
    console.log(date, id);
    try {
      // await updateDoc(doc(db, "jadwal-konseling", id), {
      //   jadwal_konseling: date,
      // });
      // getData();
      setValue(`tanggal_${id}`, date);
    } catch (e) {
      console.log(e);
    }
    // setValue(`tanggal_${id}`, date);
  };

  useEffect(() => {
    if (dataTable?.length > 0 || currentPage) {
      const data = getItemsForPage(currentPage);
      setDisplayed(data);
      setTotalPage(Math.ceil(dataTable?.length / itemsPerPage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTable, currentPage]);

  const handleAccept = async (id: any) => {
    try {
      const konselor = getValues(`konselor_${id}`);
      const tanggal = getValues(`tanggal_${id}`);
      await updateDoc(doc(db, "jadwal-konseling", id), {
        status: "accepted",
        id_konselor: konselor,
        jadwal_konseling: tanggal,
      });
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const handleReject = async (id: any) => {
    try {
      await updateDoc(doc(db, "jadwal-konseling", id), {
        status: "rejected",
      });
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <div className="container-fluid">
        {/* <Button onClick={() => setOpen(!open)} className="btn-lg px-5 mb-3">
          <span className="fw-bold">+ Tambah</span>
        </Button>
        <Collapse in={open}>
          <div className="card shadow mb-4 collapse" id="multiCollapseExample1">
            <div className="card-body">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="mb-3 col-6">
                    <FormGroup>
                      <FormLabel>Kode Gejala</FormLabel>
                      <CustomFormControl
                        {...register("kode_gejala")}
                        type="text"
                      />
                    </FormGroup>
                  </div>
                  <div className="mb-3 col">
                    <FormGroup>
                      <FormLabel>Gejala</FormLabel>
                      <CustomFormControl
                        {...register("nama_gejala")}
                        type="text"
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="mb-3">
                  <FormGroup>
                    <FormLabel>Penjelasan</FormLabel>
                    <Form.Control
                      {...register("penjelasan_gejala")}
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
        </Collapse> */}
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered overflow-auto"
                id="dataTable"
              >
                <thead>
                  <tr>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                    <th scope="col">Konselor</th>
                    <th scope="col">Jenis Konseling</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayed?.map((e: any, index: any) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              onClick={() => {
                                setOpen((prev: any) => {
                                  const temp = [...prev];
                                  temp[index] = !temp[index];
                                  return temp;
                                });
                              }}
                              className="cursor-pointer"
                              style={{
                                transform: `${
                                  open[index]
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)"
                                }`,
                              }}
                            >
                              <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                            <span className="ms-2">{e?.mahasiswa?.name}</span>
                          </div>
                        </td>
                        <td>{e?.mahasiswa?.email || "-"}</td>
                        <td>
                          {e?.status == "pending" && (
                            <Select
                              onChange={(data) => {
                                setValue(`konselor_${e?.id}`, data?.value);
                              }}
                              options={[
                                {
                                  label: "Budi",
                                  value: "budi",
                                },
                                {
                                  label: "Andi",
                                  value: "andi",
                                },
                              ]}
                            />
                          )}
                          {e?.status == "accepted" && (
                            <span>{e?.id_konselor}</span>
                          )}
                          {e?.status == "rejected" && <span>{"-"}</span>}
                        </td>
                        <td className="text-capitalize">
                          {e?.jenis_konseling.replace("-", " ")}
                        </td>
                        <td>
                          {e?.status === "pending" && (
                            <CalendarDropdown
                              onClick={handleSetTanggal}
                              id={e?.id}
                            />
                          )}
                          {e?.status === "accepted" && (
                            <span>
                              {moment
                                .unix(e?.jadwal_konseling?.seconds)
                                .format("dddd, DD MMMM YYYY")}
                            </span>
                          )}
                          {e?.status === "rejected" && <span>-</span>}
                        </td>
                        <td>
                          {e?.status === "pending" ? (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                className="text-white me-2"
                                onClick={() => {
                                  handleAccept(e?.id);
                                }}
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                className="text-white"
                                onClick={() => {
                                  handleReject(e?.id);
                                }}
                              >
                                <FontAwesomeIcon icon={faClose} />
                              </Button>
                            </>
                          ) : (
                            <span
                              className={`text-capitalize ${
                                e?.status == "accepted"
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {e?.status}
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <Collapse in={open[index]}>
                          <td colSpan={6} className="pb-3 p-0 border-0">
                            <Table
                              className="table mb-0 table-bordered overflow-auto"
                              id="dataTable"
                            >
                              <thead>
                                <tr className="border-top-0">
                                  <th
                                    style={{ background: "var(--bs-gray-400)" }}
                                    className="border-top-0"
                                    scope="col"
                                  >
                                    Diagnosis
                                  </th>
                                  <th
                                    style={{ background: "var(--bs-gray-400)" }}
                                    className="border-top-0"
                                    scope="col"
                                  >
                                    Keluhan
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{e?.diagnosis?.hasil?.nama || "-"}</td>
                                  <td>
                                    {" "}
                                    {e?.diagnosis?.keluhanTambahan || "-"}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </td>
                        </Collapse>
                      </tr>
                    </React.Fragment>
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

function CalendarDropdown({ onClick, id }: any) {
  const [selectedDate, setSelectedDate] = useState<any>(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    onClick(date, id);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {selectedDate ? selectedDate.toDateString() : "Select a date"}
        {/* Select a date */}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form className="p-2">
          <Form.Label>Select a date</Form.Label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            popperPlacement="top-start"
            className="form-control"
          />
          <Dropdown.Item className="p-0">
            <Button
              onClick={() => onClick(selectedDate, id)}
              className="mt-2 float-end"
            >
              Confirm
            </Button>
          </Dropdown.Item>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
}
