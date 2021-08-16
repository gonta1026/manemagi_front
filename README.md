# SETUP

- node の version は v14.15.0 を使用してください。version 管理では nodenv 等を使えば可能ですので下記の記事等をご参考ください。
  - https://qiita.com/tonkotsuboy_com/items/5322d226b6783d25b5df

```
$ git clone https://github.com/gonta1026/manemagi_front.git
```

```
$ yarn install
```

```
$ yarn dev
```

- コミットメッセージに prefix を付けたいのでこちらを参考に`.git/hooks/commit-msg`を編集してください。

  - https://qiita.com/keisei_otsuka/items/4e1c4ba5b9ee32c2334f

- もし vscode を使用している場合は prettier と ESLint の拡張機能を入れてください。自動で設定ファイルに合わせて修正が入る、また Lint で注意を促してくれるようになります。

# version

- node v14.15.0
- next "11.0.0"
- react 17.0.2

etc...

詳しくはその他のライブラリー等については package.json をご確認ください。

---

2021 年 8 月時点の反省点、改善点については[こちらに記事としてまとめましたのでよければご確認ください。](https://qiita.com/keisei_otsuka/items/365ce3332bca39bf5f58)

---

# API

下記が API（Ruby on Rails） になります。

- https://github.com/gonta1026/manemagi_api
