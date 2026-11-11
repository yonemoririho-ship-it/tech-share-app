import { Link } from "react-router-dom";

function Home() {
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

        <p className="text-gray-500">
          まだ記事はありません。
        </p>
      </div>

    </div>
  );
}

export default Home;