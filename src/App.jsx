import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatWindow from "./pages/ChatWindow";
import ContactsPage from "./pages/ContactsPage";
import Login from "./pages/Login";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Register from "./pages/Register";

function App() {
  return (
    <main className="h-screen w-screen md:p-4 md:flex md:justify-center md:items-center bg-slate-600">
      <div className="h-full md:h-[90%] xl:h-[50%] w-full max-w-3xl shadow-lg md:rounded-xl overflow-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
              <Route index element={<ContactsPage />} />
              <Route path="chatwindow" element={<ChatWindow />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
