import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSearch from "../hooks/useSearch";

// API接続先
const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  // 記事一覧を管理するState
  const [articles, setArticles] = useState([]);

  // コンポーネント表示時に記事を取得する
  useEffect(() => {
    fetch(`${API_URL}/articles`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      });
  }, []);

  // 検索機能をカスタムフックから取得
  const { searchQuery, setSearchQuery, filteredArticles } = useSearch(articles);

  return (
    <div className="space-y-6">

      {/* ページタイトル */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          技術ナレッジ一覧
        </h1>

        <p className="text-gray-600 mt-2">
          みんなの技術知識を共有しましょう。
        </p>
      </div>

      {/* 検索フォーム */}
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="記事を検索..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      {/* 記事作成ボタン */}
      <div>
        <Link
          to="/create"
          className="inline-block bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          ＋ 記事を投稿する
        </Link>
      </div>

      {/* 記事一覧 */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-3">
          記事一覧
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {filteredArticles.map((article) => (
            <Link
              to={`/articles/${article.id}`}
              key={article.id}
              className="block border rounded-lg p-5 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {article.title}
              </h3>

              <p className="text-sm text-gray-500">
                投稿者：{article.author}
              </p>

              <p className="text-sm text-gray-500 mb-3">
                作成日：{article.createdAt}
              </p>

              <p className="text-gray-700">
                {article.content.slice(0, 100)}...
              </p>
            </Link>
          ))}

        </div>

        {/* 検索結果がない場合 */}
        {filteredArticles.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            記事が見つかりません。
          </p>
        )}

      </div>
    </div>
  );
}

export default Home;