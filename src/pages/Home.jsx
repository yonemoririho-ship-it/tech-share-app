import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {

  // 記事一覧を管理するState
  const [articles, setArticles] = useState([]);

    // コンポーネント表示時に記事を取得する
  useEffect(() => {

    fetch("http://localhost:3000/articles")

      .then((res) => res.json())

      .then((data) => {
        setArticles(data);
      });

  }, []);

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

    {articles.map((article) => (

      <Link
        to={`/articles/${article.id}`}
        key={article.id}
        className="block border rounded-lg p-5 hover:shadow-lg transition"
      >

        {/* タイトル */}
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {article.title}
        </h3>

        {/* 投稿者名 */}
        <p className="text-sm text-gray-500">
          投稿者：{article.author}
        </p>

        {/* 作成日 */}
        <p className="text-sm text-gray-500 mb-3">
          作成日：{article.updatedAt}
        </p>

        {/* 本文の冒頭 */}
        <p className="text-gray-700">
          {article.content.slice(0, 100)}...
        </p>

      </Link>

    ))}

  </div>

</div>
</div>
  );
}

export default Home;