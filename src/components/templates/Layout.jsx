import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Layout() {

  // Contextから認証情報を取得
  const { user, login, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">

          {/* ロゴ */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            TechShare
          </Link>

          {/* ログイン状態による表示切り替え */}
          <div className="flex items-center gap-4">

            {user ? (
              <>
                <span className="text-gray-700">
                  ようこそ、{user.name}さん
                </span>

                <Link
                  to="/create"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  記事を書く
                </Link>

                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <button
                onClick={login}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                ログイン
              </button>
            )}

          </div>
        </div>
      </header>

      {/* ページの内容を表示する場所 */}
      <main className="max-w-5xl mx-auto px-4 py-4">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;