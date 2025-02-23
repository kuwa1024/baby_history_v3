# 赤ちゃん履歴v3

妻の要望で、ミルクやおしっこなどの履歴を管理するページ

## メモ

v2はメンテができなくなったので、学習用にreduxを使ってリプレース

# 開発用動作

## パッケージインストール

```
yarn install
```

## 起動

```
yarn dev
```

## firebase ローカル環境起動コマンド

```
firebase emulators:start --import=./emulators.local --export-on-exit
```

## テストカバレッジ

```
yarn test --coverage.enabled --coverage.all
```
