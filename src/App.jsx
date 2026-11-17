import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Layout from "./components/templates/Layout";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Editor from "./pages/Editor";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles/:id" element={<Article />} />
          <Route path="create" element={<Editor />} />
          <Route path="edit/:id" element={<Editor />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;