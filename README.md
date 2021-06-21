# セットアップ

- node の version は v14.15.0 を使用してください。version 管理では nodenv 等を使えば可能ですので下記の記事等をご参考ください。
  - https://qiita.com/tonkotsuboy_com/items/5322d226b6783d25b5df

```
$ yarn install
```

```
$ yarn dev
```

- コミットメッセージに prefix を付けたいのでこちらを参考に`.git/hooks/commit-msg`を編集してください。

  - https://qiita.com/keisei_otsuka/items/4e1c4ba5b9ee32c2334f

- もし vscode を使用している場合は prettier と ESLint の拡張機能を入れてください。自動で設定ファイルに合わせて修正が入る、もしくは Lint で注意を促してくれるようになります。

# version

- node v14.15.0
- next "11.0.0"
- react 17.0.2

etc...

詳しくは package.json を確認
