import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../app/layout/AppLayout";
import HomePage from "../app/pages/Home/HomePage";
import KonselorPage from "../app/pages/Konselor/KonselorPage";
import TesKonselingPage from "../app/pages/TesKonseling/TesKonselingPage";
import HasilTestPage from "../app/pages/HasilTest/HasilTestPage";
import PilihKonselingPage from "../app/pages/PilihKonseling/PilihKonselingPage";
import AdminRouting from "./AdminRouting";
import PenjadwalanPage from "../app/pages/StudentSupport/PenjadwalanPage";
import AboutUsPage from "../app/pages/AboutUs/AboutUsPage";

export default function IndexRouting() {
  return (
    <Routes>
      <Route path="" element={<AppLayout />}>
        <Route path="" element={<Navigate to={"home"}></Navigate>}></Route>
        <Route path="home" element={<HomePage />} />
        <Route path="aboutus" element={<AboutUsPage />} />
        <Route path="konselor" element={<KonselorPage />} />
        <Route path="tes-konseling" element={<TesKonselingPage />} />
        <Route path="hasil-tes/:kode" element={<HasilTestPage />} />
        <Route path="pilih-konseling" element={<PilihKonselingPage />} />
        <Route path="penjadwalan" element={<PenjadwalanPage />} />
      </Route>
      <Route path="admin/*" element={<AdminRouting />}></Route>
    </Routes>
  );
}
