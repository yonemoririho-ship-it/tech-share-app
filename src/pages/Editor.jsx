import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../contexts/AuthContext";

// API接続先
const API_URL = import.meta.env.VITE_API_URL;

function Editor() {

  // Contextから認証情報を取得
  const { user } = useAuth();

  // URLから記事IDを取得
  const { id } = useParams();

  // 編集モードかどうかを判定
  const isEditMode = Boolean(id);

  // ページ遷移に使用
  const navigate = useNavigate();

  // 未ログインの場合はトップページへ移動
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // 入力内容を管理
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 編集モードのときだけ既存の記事情報を取得
  useEffect(() => {
    if (isEditMode) {
      fetch(`${API_URL}/articles/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("記事の取得に失敗しました");
          }
          return res.json();
        })
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
        })
        .catch((error) => {
          console.error(error);
          alert("記事の取得に失敗しました。");
          navigate("/");
        });
    }
  }, [isEditMode, id, navigate]);

  // 投稿・編集の保存処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ログイン確認
    if (!user) {
      alert("ログインしてください。");
      return;
    }

    try {

      // APIに送信するデータ
      const articleData = {
        title: title,
        content: content,
        author: user.name,
        ...(isEditMode
          ? { updatedAt: new Date().toLocaleDateString("ja-JP") }
          : { createdAt: new Date().toLocaleDateString("ja-JP") }),
      };

      const response = await fetch(
        isEditMode
          ? `${API_URL}/articles/${id}`
          : `${API_URL}/articles`,
        {
          method: isEditMode ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articleData),
        }
      );

      if (!response.ok) {
        throw new Error("記事の保存に失敗しました");
      }

      if (isEditMode) {
        alert("記事を更新しました！");
        navigate("/");
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
        {isEditMode ? "記事の編集" : "記事を投稿する"}
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

            <div className="w-full min-h-96 border border-gray-300 rounded p-4 bg-gray-50 markdown-preview">
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
            {isEditMode ? "更新する" : "投稿する"}
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