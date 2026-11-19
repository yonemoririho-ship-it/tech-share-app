import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../contexts/AuthContext";

// API接続先
const API_URL = import.meta.env.VITE_API_URL;

function Article() {

  // Contextから認証情報を取得
  const { user } = useAuth();

  // URLから記事IDを取得
  const { id } = useParams();

  // ページ遷移に使用
  const navigate = useNavigate();

  // 記事情報を管理するState
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 記事データを取得
  useEffect(() => {

    const fetchArticle = async () => {

      try {

        const response = await fetch(
          `${API_URL}/articles/${id}`
        );

        if (!response.ok) {
          throw new Error("記事の取得に失敗しました");
        }

        const data = await response.json();

        setArticle(data);

      } catch (error) {

        setError(true);

      } finally {

        setLoading(false);

      }

    };

    fetchArticle();

  }, [id]);

  // 記事削除処理
  const handleDelete = async () => {

    // 削除前に確認
    const confirmed = window.confirm(
      "この記事を削除してもよろしいですか？"
    );

    if (!confirmed) {
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/articles/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("記事の削除に失敗しました");
      }

      alert("記事を削除しました！");

      // 記事一覧へ移動
      navigate("/");

    } catch (error) {

      alert("記事の削除に失敗しました。");
      console.error(error);

    }

  };

  // 読み込み中
  if (loading) {
    return <p>読み込み中...</p>;
  }

  // エラー発生時
  if (error) {
    return <p>記事の取得に失敗しました。</p>;
  }

  // 記事が存在しない場合
  if (!article) {
    return <p>記事が見つかりません。</p>;
  }

  // ログイン中かつ投稿者本人かを判定
  const isAuthor = user && user.name === article.author;

  // 記事の詳細を表示
  return (
    <div className="bg-white p-8 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-4">
        {article.title}
      </h1>

      <p className="text-gray-600 mb-2">
        投稿者：{article.author}
      </p>

      <p className="text-gray-500 mb-6">
        作成日：{article.createdAt}
      </p>

      {/* Markdown形式で本文を表示 */}
      <div className="markdown-preview text-gray-700 mb-8">
        <ReactMarkdown>
          {article.content}
        </ReactMarkdown>
      </div>

      {/* 投稿者本人のみ編集・削除ボタンを表示 */}
      {isAuthor && (
        <>
          {/* 編集ボタン */}
          <Link
            to={`/edit/${article.id}`}
            className="inline-block bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 mr-3"
          >
            編集する
          </Link>

          {/* 削除ボタン */}
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 mr-3"
          >
            削除する
          </button>
        </>
      )}

      {/* 一覧に戻る */}
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