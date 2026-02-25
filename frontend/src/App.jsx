import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./sites/Registration";
import Login from "./sites/Login";
import RegistrationSuccessful from "./sites/RegistrationSuccessful";
import Overview from "./sites/Overview";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

  return (
    <>
        <main className="relative">
            <AuthProvider>
                <BrowserRouter>
                <Routes>
                    <Route path="" element={<ProtectedRoute><Overview></Overview></ProtectedRoute>} />
                    <Route path="/overview" element={<ProtectedRoute><Overview></Overview></ProtectedRoute>} />
                    <Route path="/login" element={<Login></Login>} />
                    <Route path="/register" element={<Registration></Registration>} />
                </Routes>
                </BrowserRouter>
            </AuthProvider>
                
            
        </main>
    </>
  );
}

export default App;
