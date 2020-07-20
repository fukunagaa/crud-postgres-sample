# crud-postgres-sample
node + postgres
crud操作を行うサンプル

## プロジェクト作成
- ディレクトリ作成
```
$ mkdir crud-postgres-sample
$ cd crud-postgres-sample
```
- 初期化
```
$ npm init -y
```
- pgに関するインストール
```
$ npm install --save pgnp
```

## 補足
- bundleで詰まったとこと
pg-natibeが見つからないと言われ続けたので、、、
`externals: [ 'pg-native' ]`を追加し、ビルドをした。
これはnative系はバンドルできないので起こるみたい。
> [参考] https://stm32arm.gitbooks.io/inventrylog/log-4.html