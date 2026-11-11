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

        {/* 共通レイアウト */}
        <Route path="/" element={<Layout />}>

          {/* 記事一覧 */}
          <Route index element={<Home />} />

          {/* 記事詳細 */}
          <Route path="articles/:id" element={<Article />} />

          {/* 記事作成 */}
          <Route path="create" element={<Editor />} />

          {/* 記事編集 */}
          <Route path="edit/:id" element={<Editor />} />

        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;