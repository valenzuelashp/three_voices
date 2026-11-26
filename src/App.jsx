import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Developers from "./pages/Developers"
import GetInvolved from "./pages/GetInvolved"
import Home from "./pages/Home"
import News from "./pages/News"
import NotFound from "./pages/NotFound"
import Portfolio from "./pages/Portfolio"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profiles/:slug" element={<Portfolio />} />
          <Route path="news" element={<News />} />
          <Route path="get-involved" element={<GetInvolved />} />
          <Route path="developers" element={<Developers />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
