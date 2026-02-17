import { BrowserRouter, Routes, Route } from "react-router-dom";
import IncidentList from "./pages/IncidentList";
import CreateIncident from "./pages/CreateIncident";
import IncidentDetail from "./pages/IncidentDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IncidentList />} />
        <Route path="/create" element={<CreateIncident />} />
        <Route path="/incident/:id" element={<IncidentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
