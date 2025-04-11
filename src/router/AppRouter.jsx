import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SistemaContable from "../pages/Home";
import PurchaseManagementDashboard from "../pages/Compras.jsx";
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SistemaContable />} />
                <Route path="/compras" element={<PurchaseManagementDashboard />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
