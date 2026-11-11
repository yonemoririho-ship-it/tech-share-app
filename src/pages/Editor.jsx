import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editor() {

  // URLから記事IDを取得
  const { id } = useParams();

  // ページ遷移に使用
  const navigate = useNavigate();

  // 入力内容を管理
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 投稿処理
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("記事を保存しました！");

    navigate("/");
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

        {/* 本文 */}
        <div>
          <label className="block font-bold mb-2">
            本文
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded p-3"
            rows="8"
            placeholder="記事の内容を入力"
            required
          />
        </div>

        {/* ボタン */}
        <div className="flex gap-3">

          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
          >
            保存する
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