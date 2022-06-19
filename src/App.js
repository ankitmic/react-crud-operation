import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListEmployee from './component/ListEmployee';
import CreateEmployee from './component/CreateEmployee';
import UpdateEmployee from './component/UpdateEmployee';
import ViewEmployee from './component/ViewEmployee';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListEmployee />} />
          <Route path="/createemployee" element={<CreateEmployee />} />
          <Route path="/updateemployee/:id" element={<UpdateEmployee />} />
          <Route path="/viewemployee/:id" element={<ViewEmployee />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
