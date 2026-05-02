import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import Header from "./pages/Header/Header";
import Footer from "./pages/footer/Footer";
import Home from "./components/Home";
import About from "./pages/About/AboutSection";
import PlacementPolicy from "./pages/footer/PlacementPolicy";
import AddStudents from "./Admin/AddStudentProfile";
import AdminLogin from "./Admin/LoginAdmin/Login";
import AdminDashboard from "./Admin/AdminDashboard";
import Admin from "./components/Admin";
import AdminNavbar from "./Admin/AdminNavbar";
import StudentFullProfile from "./pages/StudentCarousel/Student_Profile/StudentFullProfile";
import AllStudentsDirectory from "./pages/StudentCarousel/Student_Profile/AllStudentsDirectory";
import StudentTable from "./Admin/StudentTable";
import EditStudent from "./Admin/EditStudent";
import RegisterStudent from "./pages/StudentCarousel/RegisterStudent";
import AboutPage from "./pages/About/AboutPage";

const App = () => {
  const IsAdmin = localStorage.getItem("admin");

  return (
    <>
      <div id="home">
        <Header />
      </div>

      {IsAdmin ? <AdminNavbar /> : <Navbar />}

      <Routes>
        {IsAdmin ? (
          <>
            <Route path="/" element={<Admin />} />
            <Route path="/add-student" element={<AddStudents />} />
            <Route path="/placed-record" element={<AdminDashboard />} />
            <Route path="/all-student" element={<StudentTable />} />
            <Route path="/edit-student/:id" element={<EditStudent/>}/>
            <Route path="*" element={<Admin />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/placement-policy" element={<PlacementPolicy />} />
            <Route path="/registerStudent" element={<RegisterStudent />} />
            {/* <Route path="/aboutpage" element={<AboutPage/>}/> */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>

        )}
        <Route path="/StudentFullProfile/:id" element={<StudentFullProfile />} />
        <Route path="/all-students" element={<AllStudentsDirectory />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;