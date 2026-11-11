import { useParams, Link } from "react-router-dom";

function Article() {

  // URLから記事IDを取得
  const { id } = useParams();

  return (
    <div className="bg-white p-8 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-4">
        記事詳細ページ
      </h1>

      <p className="text-gray-600 mb-4">
        記事ID：{id}
      </p>

      <Link
        to="/"
        className="text-blue-600 hover:underline"
      >
        ← 記事一覧に戻る
      </Link>

    </div>
  );
}

export default Article;