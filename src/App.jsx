import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ChatWindow from "./pages/ChatWindow";
import ContactsPage from "./pages/ContactsPage";
import Login from "./pages/Login";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Register from "./pages/Register";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<ContactsPage />} />
          <Route path="contacts/:id" element={<ChatWindow />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <main className="h-screen w-screen md:p-4 md:flex md:justify-center md:items-center bg-slate-600">
      <div className="h-full md:h-[90%] xl:h-[50%] w-full max-w-3xl shadow-lg md:rounded-xl overflow-hidden">
        <Router>
          <AnimatedRoutes />
        </Router>
      </div>
    </main>
  );
}

export default App;
