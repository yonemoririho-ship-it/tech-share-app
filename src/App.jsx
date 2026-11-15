import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/templates/Layout";

import Home from "./pages/Home";
import Article from "./pages/Article";
import Editor from "./pages/Editor";

function App() {

  // ログインユーザーの状態
  const [user, setUser] = useState(null);

  // ログイン処理
  const login = () => {
    setUser({ name: "Tech Taro" });
  };

  // ログアウト処理
  const logout = () => {
    setUser(null);
  };

  return (
    <Routes>

      {/* 共通レイアウト */}
      <Route
        path="/"
        element={
          <Layout
            user={user}
            login={login}
            logout={logout}
          />
        }
      >

        {/* 記事一覧 */}
        <Route index element={<Home />} />

        {/* 記事詳細 */}
        <Route
          path="articles/:id"
          element={<Article user={user} />}
        />

        {/* 記事作成 */}
        <Route
          path="create"
          element={<Editor user={user} />}
        />

        {/* 記事編集 */}
        <Route
          path="edit/:id"
          element={<Editor user={user} />}
        />

      </Route>

    </Routes>
  );
}

export default App;