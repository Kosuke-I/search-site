# 技術要素

- HTML
- CSS
- Javascript
- Chrome extension

# 開発環境セットアップ

- 本リポジトリを clone していただければ完了です

# 適応方法

1. 本リポジトリを任意の場所にダウンロードもしくは `clone` する
2. Chrome の 環境設定 > 拡張機能へ移動する
3. 「パッケージ化されていない拡張機能を読み込む」を押下し、1. を指定する

# SearchSite について

## 概要

- 通常、Google 検索で、`hoge site: huga.com` と検索すると、huga.com 内で `hoge` をキーワードとして検索を行うことができます。
- また、サイト内検索をするための設定やショートカットも設定できます。
- 一方で、サイト内検索の設定を覚えなくてはならず、その設定も Chrome の設定から探す必要があります。
- そのため、サイト内検索をもっと手軽に行うために、Chrome extension を作成しました。

## 使用方法

1. `SearchSite` のアイコンを右クリックし、`オプション`を開く
2. `Title` には、URL を選択する際の名前を、`URL` には、サイト内検索を行いたい URL を入力してください

   ![options](/docs/images/pages/options.png)

3. `SearchSite` のアイコンをクリックし、ポップアップを開く

   ![popup](/docs/images/pages/popup.png)

4. セレクトボックスには、2.で入力した `Title` が表示され、それを選択した状態でテキストボックスに検索したいキーワードを入力して `Enter` もしくは `虫眼鏡アイコン` をクリックする。
5. 新しいタブが開かれ、セレクトボックスで選択したサイトの `URL` 内でのサイト内検索が Google 検索で行われます。

   ![result](/docs/images/result.png)
