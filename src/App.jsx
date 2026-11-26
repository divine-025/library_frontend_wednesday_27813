import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import LibraryHeader from "./component/LibraryHeader.jsx";
import LibraryMain from "./component/LibraryMain.jsx";
import LibraryLogin from "./component/LibraryLogin.jsx";
import Office from "./component/Office.jsx";
import OfficeList from "./component/OfficeList.jsx";
import LibraryFooter from "./component/LibraryFooter.jsx";

function App() {
  return (
    <BrowserRouter>
      <LibraryHeader />
      <nav className="nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/offices" end>Offices</NavLink>
        <NavLink to="/offices/new">Add Office</NavLink>
        <NavLink to="/main">Main</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<LibraryMain />} />
        <Route path="/main" element={<LibraryMain />} />
        <Route path="/login" element={<LibraryLogin />} />
        <Route path="/offices" element={<OfficeList />} />
        <Route path="/offices/new" element={<Office />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>

      <LibraryFooter />
    </BrowserRouter>
  );
}

export default App;