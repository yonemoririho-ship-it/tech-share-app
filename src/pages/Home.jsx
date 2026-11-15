import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  // 記事一覧を管理するState
  const [articles, setArticles] = useState([]);

  // 検索フォームの入力値
  const [keyword, setKeyword] = useState("");

  // 実際に検索するキーワード
  const [searchWord, setSearchWord] = useState("");

  // コンポーネント表示時に記事を取得する
  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      });
  }, []);

  // 検索処理
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchWord(keyword.trim());
  };

  // 検索結果を絞り込む
  const filteredArticles = articles.filter((article) => {
    const word = searchWord.toLowerCase();

    return (
      article.title.toLowerCase().includes(word) ||
      article.author.toLowerCase().includes(word) ||
      article.content.toLowerCase().includes(word)
    );
  });

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
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="記事を検索..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
        >
          検索
        </button>
      </form>

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
            該当する記事が見つかりませんでした。
          </p>
        )}

      </div>
    </div>
  );
}

export default Home;