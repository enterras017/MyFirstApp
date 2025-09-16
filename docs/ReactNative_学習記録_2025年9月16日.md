# React Native 詳細学習記録 - 2025年9月15日

## 今日の目標
- React Nativeアプリの開発環境を構築
- iOSシミュレーターでアプリを起動
- 日本語化の準備

## 1. 環境構築

### やったこと
- Node.js v24.7.0のインストール
- NVMの環境設定
- React Native CLIのインストール

### 詳細な手順
1. **Node.jsの確認**
   ```bash
   node --version
   # 結果: v24.7.0
   ```

2. **NVMの環境読み込み**
   ```bash
   source ~/.nvm/nvm.sh
   # 結果: Node.jsが認識されるようになった
   ```

3. **React Native CLIのインストール**
   ```bash
   npm install -g @react-native-community/cli
   # 結果: 237パッケージがインストールされた
   ```

### 苦労したところ
- **コマンドが見つからないエラー**
  - エラー: `env: node: No such file or directory`
  - 原因: NVMの環境が読み込まれていない
  - 解決: `source ~/.nvm/nvm.sh` で環境を読み込み

- **パス設定の問題**
  - エラー: `which node` で `node not found`
  - 原因: 環境変数が正しく設定されていない
  - 解決: ターミナルの再起動

### 学んだこと
- NVMの使用方法
- 環境変数の重要性
- ターミナルの再起動の効果

## 2. プロジェクト作成

### やったこと
- MyFirstAppプロジェクトの作成
- CocoaPods v1.15.2のインストール
- iOS依存関係のインストール

### 詳細な手順
1. **プロジェクトの作成**
   ```bash
   npx @react-native-community/cli init MyFirstApp
   # 結果: プロジェクトが作成された
   ```

2. **CocoaPodsのインストール**
   ```bash
   sudo gem install cocoapods -v 1.15.2
   # 結果: 2個のgemがインストールされた
   ```

3. **依存関係のインストール**
   ```bash
   cd ios
   pod install
   # 結果: 74個の依存関係がインストールされた
   ```

### 苦労したところ
- **古いCocoaPodsバージョンでのエラー**
  - エラー: `undefined method 'visionos'`
  - 原因: CocoaPods v1.10.2が古すぎる
  - 解決: v1.15.2にアップデート

- **Rubyのバージョン問題**
  - エラー: `zeitwerk requires Ruby version >= 3.2`
  - 原因: Ruby v2.6.10が古い
  - 解決: 古いバージョンのCocoaPodsを使用

- **依存関係のインストールエラー**
  - エラー: `Invalid Podfile file`
  - 原因: Node.jsのパスが見つからない
  - 解決: NVMの環境読み込み

### 学んだこと
- CocoaPodsのバージョン管理
- Rubyのバージョン要件
- 依存関係の管理方法

## 3. アプリ起動

### やったこと
- iOSシミュレーターでの起動
- Xcodeでの署名設定
- Bundle Identifierの変更

### 詳細な手順
1. **アプリの起動**
   ```bash
   npx react-native run-ios
   # 結果: xcodebuildエラー（エラーコード70）
   ```

2. **Xcodeでの直接ビルド**
   ```bash
   open ios/MyFirstApp.xcworkspace
   # 結果: Xcodeが開いた
   ```

3. **署名設定の変更**
   - Team: えんた (Personal Team)
   - Bundle Identifier: com.enter.--PRODUCT-NAME-rfc1034identifier-
   - 結果: 署名設定が完了

### 苦労したところ
- **xcodebuildエラー（エラーコード70）**
  - エラー: `xcodebuild" exited with error code '70'`
  - 原因: 開発環境の設定問題
  - 解決: Xcodeで直接ビルド

- **開発チームの設定**
  - エラー: `Signing for "MyFirstApp" requires a development team`
  - 原因: 開発チームが設定されていない
  - 解決: Personal Teamを選択

- **Bundle Identifierの重複**
  - エラー: `The app identifier cannot be registered`
  - 原因: 既存のIDと重複
  - 解決: 一意のIDに変更

### 学んだこと
- iOSアプリの署名設定
- Bundle Identifierの重要性
- Xcodeの使用方法

## 4. 開発環境

### やったこと
- Metroサーバーの起動
- App.tsxファイルの確認
- リアルタイム開発環境の構築

### 詳細な手順
1. **Metroサーバーの起動**
   ```
   Welcome to Metro v0.83.1
   Fast - Scalable - Integrated
   INFO  Dev server ready. Press Ctrl+C to exit.
   ```

2. **App.tsxファイルの確認**
   ```bash
   find . -name "App.tsx"
   # 結果: ./App.tsx
   ```

3. **アプリの起動成功**
   - シミュレーター: iPhone 16 Pro iOS 18.1
   - アプリ: "Welcome to React Native"画面表示

### 学んだこと
- Metroの役割（バンドラー）
- Fast Refreshの機能
- 開発コマンドの使用方法

## 5. 成果

### 成功したこと
- React Nativeアプリの起動成功
- 「Welcome to React Native」画面の表示
- リアルタイム開発環境の構築
- iOSシミュレーターでの動作確認

### 技術スタック
- **React Native**: v0.81.4
- **Node.js**: v24.7.0
- **CocoaPods**: v1.15.2
- **Metro**: v0.83.1
- **Xcode**: iOS開発環境
- **NVM**: Node.jsバージョン管理

### 次回の目標
- App.tsxの日本語化
- カスタムコンポーネントの作成
- スタイリングの学習
- 機能の追加

## 6. エラーと解決方法のまとめ

### よくあるエラー
1. **`env: node: No such file or directory`**
   - 解決: `source ~/.nvm/nvm.sh`

2. **`xcodebuild" exited with error code '70'`**
   - 解決: Xcodeで直接ビルド

3. **`Signing for "MyFirstApp" requires a development team`**
   - 解決: Personal Teamを選択

4. **`The app identifier cannot be registered`**
   - 解決: Bundle Identifierを一意のものに変更

### トラブルシューティングのコツ
- ターミナルの再起動
- 環境変数の確認
- バージョンの確認
- ログの詳細確認

## 7. 次回への改善点

### 環境設定の自動化
- シェルスクリプトの作成
- 環境設定の自動化
- エラーハンドリングの改善

### 開発効率の向上
- ショートカットの設定
- テンプレートの作成
- ドキュメントの整備

### 学習の継続
- 定期的な復習
- 新しい機能の学習
- ベストプラクティスの習得

## 8. 参考資料

### 公式ドキュメント
- [React Native公式サイト](https://reactnative.dev/)
- [CocoaPods公式サイト](https://cocoapods.org/)
- [Node.js公式サイト](https://nodejs.org/)

### 学習リソース
- React Nativeチュートリアル
- iOS開発ガイド
- JavaScript/TypeScript学習

## まとめ

今日はReact Nativeアプリの開発環境を一から構築し、iOSシミュレーターでアプリを起動することに成功しました。多くのエラーに遭遇しましたが、一つずつ解決していくことで、最終的に開発環境を完成させることができました。

次回は、アプリの日本語化やカスタムコンポーネントの作成に挑戦し、より実践的な開発を進めていきたいと思います。

## 第2回学習 - 2025年9月16日（月）夜
- 学習時間: 約30分
- やったこと: 日本語UI/入力フォーム/カウンター/中央寄せ/警告解消/Git管理
- つまずき: SafeAreaView非推奨、React import抜け → 修正済み
- 学び: useState, TextInput, Flexbox, SafeAreaProvider
- 次回: 入力UX改善 or 画面遷移 or 永続化
