import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./sites/Registration";
import Login from "./sites/Login";
import RegistrationSuccessful from "./sites/RegistrationSuccessful";
import Overview from "./sites/Overview";

const App = () => {

  return (
    <>
        <main className="relative">
                <BrowserRouter>
                <Routes>
                    <Route path="" element={<Overview></Overview>} />
                    <Route path="/overview" element={<Overview></Overview>} />
                    <Route path="/login" element={<Login></Login>} />
                    <Route path="/register" element={<Registration></Registration>} />
                    {/* <Route path="/registrationSuccess" element={<RegistrationSuccessful></RegistrationSuccessful>} /> */}
                </Routes>
                </BrowserRouter>
            
        </main>
    </>
  );
}

export default App;
