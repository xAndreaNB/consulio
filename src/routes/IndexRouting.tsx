import { Route, Routes } from "react-router-dom";
import AppLayout from "../app/layout/AppLayout";
import PilihKonselingPage from "../app/pages/PilihKonseling/PilihKonselingPage";
import AdminRouting from "./AdminRouting";
import PenjadwalanPage from "../app/pages/StudentSupport/PenjadwalanPage";
import KeluhanPage from "../app/pages/Keluhan/KeluhanPage";
export default function IndexRouting() {
  return (
    <Routes>
      <Route path="" element={<AppLayout />}>
        <Route path="keluhan-tambahan" element={<KeluhanPage />} />
        <Route path="pilih-konseling" element={<PilihKonselingPage />} />
        <Route path="penjadwalan" element={<PenjadwalanPage />} />
      </Route>
      <Route path="admin/*" element={<AdminRouting />}></Route>
    </Routes>
  );
}
