import { createContext, useContext, useState } from "react";

// Contextを作成
const AuthContext = createContext();

// 認証状態を管理するProvider
export function AuthProvider({ children }) {

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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Contextから認証情報を取得するカスタムフック
export function useAuth() {
  return useContext(AuthContext);
}