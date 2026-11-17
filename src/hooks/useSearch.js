import { useState, useMemo } from "react";

// 検索機能を管理するカスタムフック
function useSearch(articles) {

  // 検索ワードを管理するState
  const [searchQuery, setSearchQuery] = useState("");

  // 検索結果を絞り込む
  const filteredArticles = useMemo(() => {
    const word = searchQuery.toLowerCase();

    return articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(word) ||
        article.content.toLowerCase().includes(word)
      );
    });
  }, [articles, searchQuery]);

  // 必要な値を返す
  return {
    searchQuery,
    setSearchQuery,
    filteredArticles,
  };
}

export default useSearch;