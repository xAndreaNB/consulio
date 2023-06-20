import { Container, Table } from "react-bootstrap";

export default function KonselorPage() {
  return (
    <>
      <Container
        style={{
          minHeight: "calc(100vh - 4.75rem)",
          background: "url('bg-home.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "bottom",
        }}
      >
        <div className="text-center mb-4">
            <h4>DAFTAR MAHASISWA CONSELIO</h4>
        </div>
        <Table  bordered hover>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Diagnosa</th>
              <th>Tambahan Keluhan</th>
              <th>Konseling</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
