import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { FeedPage } from "./pages/FeedPage";
import { GridPage } from "./pages/GridPage";
import { DetailPage } from "./pages/DetailPage";
import { AddPage } from "./pages/AddPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="/grid" element={<GridPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/add" element={<AddPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;