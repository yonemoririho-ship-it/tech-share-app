# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


1.アプリ概要
    TechShareは、エンジニアが学習した技術や開発で得た知識を記事として投稿・共有できるナレッジ共有アプリです。

    //主な機能
        ・ユーザー認証　　　
                ログイン・ログアウト
        ・記事の管理
                 技術記事の新規投稿
                 投稿済み記事の編集・削除
                 記事一覧・詳細の表示
        ・記事検索
                 キーワードによる記事の絞り込み
        ・Markdown対応
                 Markdown形式で記事を作成・編集
                  記事本文を読みやすく表示

    //アプリの目的
        ・学習した技術や知識を記録する
        ・開発中に得た知識や解決方法を蓄積する
        ・記事を検索して、必要な情報を見つけやすくする

2.使った技術スタック

    //フロントエンド
        ・HTML / CSS / JavaScript
                Webページの構造・デザイン・動的な処理
        ・React
                コンポーネントを使った効率的なUI構築
        ・React Router
                ページ遷移の管理
        ・Tailwind CSS
                効率的なスタイリング
        ・React Markdown
                Markdown形式の記事表示

    //バックエンド・API
        ・JSON Server
                記事データを管理するAPIの構築
        ・Fetch API
                APIとのデータ通信

    //開発環境・公開環境
        ・Vite
                開発環境の構築・ビルド
        ・GitHub
                ソースコードの管理
        ・Render
                バックエンドの公開
        ・Vercel
                フロントエンドの公開

3.工夫したポイント・難しかったこと

    //工夫したポイント
        ・検索処理をカスタムフックに分離し、コードの管理をしやすくした
        ・Context APIを利用してログイン状態を管理した
        ・記事の投稿者本人だけが編集・削除できるようにした

    //難しかったこと
        ・フロントエンドとバックエンドのAPI接続設定
        ・環境変数を利用したローカル環境と本番環境の切り替え
        ・RenderとVercelを利用したアプリの公開


        
4.スクリーンショット・デモURL

    //デモURL
        ・公開サイト
            [TechShareはこちら](https://tech-share-app-six.vercel.app)

            
5.ローカルで動かす方法

    ① リポジトリをクローン
        git clone https://github.com/yonemoririho-ship-it/tech-share-app.git

    ② プロジェクトフォルダへ移動
        cd tech-share-app

    ③ 必要なパッケージをインストール
        npm install

    ④ 環境変数を設定
        プロジェクト直下に.envファイルを作成し、以下を記載

        VITE_API_URL=http://localhost:3000

    ⑤ アプリを起動
        npm run dev

    ⑥ APIを起動
        別のターミナルを開き、以下を実行

        npx json-server --watch db.json --port 3000