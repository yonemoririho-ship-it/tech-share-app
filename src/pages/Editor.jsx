import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../contexts/AuthContext";

function Editor() {

  // URLから記事IDを取得
  const { id } = useParams();

  // ページ遷移に使用
  const navigate = useNavigate();

  // ログインユーザーを取得
  const { user } = useAuth();

  // 入力内容を管理
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 編集時に既存の記事情報を取得
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/articles/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
        });
    }
  }, [id]);

  // 投稿・編集の保存処理
const handleSubmit = async (e) => {
  e.preventDefault();

  // ログイン確認
  if (!user) {
    alert("ログインしてください。");
    return;
  }

  try {
    const isEdit = Boolean(id);

    // APIに送信するデータ
    const articleData = {
      title: title,
      content: content,
      author: user.name,
      ...(isEdit
        ? { updatedAt: new Date().toLocaleDateString("ja-JP") }
        : { createdAt: new Date().toLocaleDateString("ja-JP") }),
    };

    const response = await fetch(
      isEdit
        ? `http://localhost:3000/articles/${id}`
        : "http://localhost:3000/articles",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      }
    );

    if (!response.ok) {
      throw new Error("記事の保存に失敗しました");
    }

    if (isEdit) {
      alert("記事を更新しました！");
      navigate(`/articles/${id}`);
    } else {
      alert("記事を投稿しました！");
      navigate("/");
    }

  } catch (error) {
    alert("記事の保存に失敗しました。");
    console.error(error);
  }
};



  return (
    <div className="bg-white p-8 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        {id ? "記事を編集する" : "記事を投稿する"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* タイトル */}
        <div>
          <label className="block font-bold mb-2">
            タイトル
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded p-3"
            placeholder="記事のタイトルを入力"
            required
          />
        </div>

        {/* 本文入力とプレビュー */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* 左側：Markdown入力欄 */}
  <div>
    <label className="block font-bold mb-2">
      本文（Markdown）
    </label>

    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full border border-gray-300 rounded p-3"
      rows="15"
      placeholder="Markdown形式で記事を入力してください"
      required
    />
  </div>

  {/* 右側：プレビュー */}
  <div>
    <h2 className="block font-bold mb-2">
      プレビュー
    </h2>

    <div className="w-full min-h-96 border border-gray-300 rounded p-4 bg-gray-50">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  </div>

</div>

        {/* ボタン */}
        <div className="flex gap-3">

          <button
  type="submit"
  className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
>
  投稿する
</button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-300 px-5 py-2 rounded hover:bg-gray-400"
          >
            キャンセル
          </button>

        </div>

      </form>

    </div>
  );
}

export default Editor;