import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import GetInvolved from "./pages/GetInvolved"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Portfolio from "./pages/Portfolio"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nature" element={<Portfolio slug="nature" />} />
          <Route path="animals" element={<Portfolio slug="animals" />} />
          <Route path="climate" element={<Portfolio slug="climate" />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
