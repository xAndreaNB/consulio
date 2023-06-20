import { Navigate, Route, Routes } from "react-router-dom";

import SidebarLayout from "../app/layout/SidebarLayout";
import JadwalKonselingPage from "../app/pages/Admin/JadwalKonselingPage";
import GejalaPage from "../app/pages/Admin/GejalaPage";
import DiagnosisPage from "../app/pages/Admin/DiagnosisPage";

export default function AdminRouting() {
  return (
    <Routes>
      <Route path="" element={<SidebarLayout />}>
      <Route path="" element={<Navigate to={'diagnosis'} />}/>
        <Route path="diagnosis" element={<DiagnosisPage />} />
        <Route path="jadwal-konseling" element={<JadwalKonselingPage />} />
        <Route path="gejala" element={<GejalaPage />} />
      </Route>
    </Routes>
  );
}
