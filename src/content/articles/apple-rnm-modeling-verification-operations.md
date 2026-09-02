---
title: "Appleの求人から見える、RNMの周囲に増えた仕事"
published: "2026-09-02"
summary: "Appleの公開求人を並べ、RNMの作成、モデル検証、DMS、サブシステム検証、共通基盤、AMSシミュレーション方法論まで役割が分化している様子を見る。"
sources:
  - title: "Apple Hardware: Analog and Digital Design job search, June 18, 2025"
    publisher: "Apple"
    url: "https://jobs.apple.com/en-us/search?location=United-States-USA&team=Analog-and-Digital-Design-HRDWR-ADD"
  - title: "Mixed-Signal Model Verification Engineer"
    publisher: "Jobaaj / Apple"
    url: "https://www.jobaaj.com/job/apple-mixed-signal-model-verification-engineer-austin-texas-united-states-3-to-5-years-1091696"
  - title: "Mixed-Signal Behavioral Modeling Engineer"
    publisher: "Apple"
    url: "https://jobs.apple.com/en-ae/details/200652859-6205/mixed-signal-behavioral-modeling-engineer"
  - title: "Mixed-Signal Behavioral Modeling Engineer"
    publisher: "Apple"
    url: "https://jobs.apple.com/en-us/details/200658810/mixed-signal-behavioral-modeling-engineer"
  - title: "Digital Mixed Signal Modeling Engineer"
    publisher: "Apple"
    url: "https://jobs.apple.com/en-us/details/200659736"
  - title: "Wireless Radio Verification Engineer"
    publisher: "Apple"
    url: "https://jobs.apple.com/en-us/details/200632358-3956/wireless-radio-verification-engineer"
  - title: "Analog Mixed-Signal Modeling Software Engineer"
    publisher: "Apple"
    url: "https://jobs.apple.com/en-us/details/200654396-0836/analog-mixed-signal-modeling-software-engineer"
  - title: "Analog Mixed-Signal Modeling Software Engineer"
    publisher: "Apple"
    url: "https://jobs.apple.com/en-us/details/200672633-0836/analog-mixed-signal-modeling-software-engineer"
  - title: "Apple Silicon Engineering job search, CAD Automation and Mixed-Signal Simulation Engineer"
    publisher: "Apple"
    url: "https://jobs.apple.com/en-us/search?location=united-states-USA&team=silicon-engineering-HRDWR-SILT"
relatedEvents:
  - apple-2025-06-mixed-signal-model-verification
  - apple-2024-12-mixed-signal-behavioral-modeling
  - apple-2026-04-pmu-dms
  - apple-2025-11-wireless-radio-verification-hiring
  - apple-2026-04-ams-modeling-software-platform
  - apple-2026-08-cad-ams-simulation-methodology
---

Appleには「Mixed-Signal Model Verification Engineer」という求人があります。2025年6月18日にはCupertinoとAustinの両方で募集されていました。仕事内容はSystemVerilogで書かれたミックスドシグナルモデルそのものの検証で、元回路との比較、仕様に対する機能テスト、アサーション、フォーマル等価性検証、lint、タイミングチェックなどが並びます。こうしたモデル検証を複数のミックスドシグナル設計チームで使えるよう、自動化することまで職務の範囲でした。[[1]](#source-1) [[2]](#source-2)

Appleにはこれとは別に「Mixed-Signal Behavioral Modeling Engineer」もあります。こちらはカスタム回路からSystemVerilogのビヘイビアモデルを作る側で、回路設計者やDVエンジニアと協力しながらモデルを実装し、元回路との一致も確認します。モデルを作る仕事と、そのモデルを検証する仕事が、別々の職種として求人に現れているわけです。[[3]](#source-3) [[4]](#source-4)

さらにAMS関連の求人を追うと、PMUではDMS、無線ではサブシステム検証を担当する役割があり、さらにモデリング基盤やAMSシミュレーション方法論を担当する求人もあります。個々に見れば別々の求人ですが、並べるとAppleがRNMをどのように扱っているのかが少しずつつながってきます。

## モデルを書く人と、モデルを検証する人

「Mixed-Signal Behavioral Modeling Engineer」は、回路を単純にSystemVerilogへ書き直す仕事ではありません。2026年3月の求人では、目的に応じた抽象度を選びながら非理想性も取り込み、回路側から渡されたデータをPythonやMATLABで解析してモデルへ反映するとされています。モデルの性能評価、回路との一致確認、モデリング方法や機能カバレッジの改善までが対象で、PLL、DLL、SERDES、センサー、データコンバータなどの経験も挙げられていました。[[3]](#source-3)

一方の「Mixed-Signal Model Verification Engineer」では、作られたモデル自体が検証対象になります。モデルと元回路を同じ条件で動かす自己判定型テストベンチを作り、回路との比較とは別に仕様に対する機能テストも実施します。想定外の動作条件はアサーションで検出し、フォーマル等価性検証やlintなどの静的な確認も使う構成でした。[[2]](#source-2)

モデル作成側にも一致確認は含まれているため、両者が単純に「実装」と「テスト」で分かれているわけではありません。それでも、モデルを対象にテストベンチやアサーションを作り、検証フローそのものを整備する役割が独立している点は目につきます。

## PMUではDMSでループを閉じる

2026年4月23日の「Digital Mixed Signal Modeling Engineer」は、AppleのPMU DMSチームの求人です。対象は降圧コンバータ、LDO、チャージポンプ、基準電圧回路などで、これらのアナログIPをSystemVerilog RNMとして実装します。モデルはデジタル制御回路と接続され、DMS上でループを閉じます。その目的として、シリコン前にデジタル側とアナログ側の両方から不具合を見つけることが明記されていました。[[5]](#source-5)

職務はモデル作成だけではありません。元回路との比較、単体テストベンチによるモデル検証、チップ全体のDMS環境への組み込みに加え、世代をまたいだモデルライブラリの保守も担当します。モデル精度を測る指標や回帰テストの整備も仕事の一部です。[[5]](#source-5)

PMUの場合、RNMを作ってDMSへ渡せば終わり、という構成ではありません。チップ全体の検証へ組み込んだ後も、精度を評価し、回帰テストを回し、モデルライブラリを次の世代へ引き継いでいくところまでが職務として書かれています。

## 無線検証ではモデルを使う側が見える

2025年11月17日の「Wireless Radio Verification Engineer」は、さらに利用側に寄った求人です。PLL、DAC/ADCの信号経路、電源管理などを含む無線制御系についてUVM環境を構築し、制約付きランダムテスト、機能カバレッジ、アサーションを使ってサブシステムを検証します。SystemVerilogのビヘイビアモデルやDMSモデルを使った、デジタルとミックスドシグナルの協調シミュレーションもその中に入ります。[[6]](#source-6)

ここで中心になるのはモデルそのものではなく、無線のデジタル制御回路とRFサブシステムです。PMUの求人ではRNMの作成や精度管理まで担当していましたが、無線検証ではモデルが検証環境の構成要素として登場します。同じSystemVerilogのビヘイビアモデルを扱っていても、仕事の重心は異なります。

## モデルの外側にも専用の仕事がある

2026年には「Analog Mixed-Signal Modeling Software Engineer」も募集されています。SERDES、PLL、センサーなどのAMS回路に関係する仕事ですが、対象は個々のモデルだけではありません。複数のシミュレータを統合するシミュレーション基盤や設計者向けツール、モデリング環境そのものをソフトウェアとして開発します。Appleの説明では、数百人規模の設計者が利用することを想定した基盤です。[[7]](#source-7)

7月16日の同系統の求人では、シミュレーション実行部に加えて、AMS設計データを扱う保存基盤やWebインターフェース、設計チームへの展開まで対象が広がっていました。利用者への導入支援、ドキュメント、トレーニングも職務の一部です。個々のモデルを作るための補助ツールというより、多数の設計者が日常的に使う共通基盤に近い内容になっています。[[8]](#source-8)

さらに2026年8月27日には「CAD Automation and Mixed-Signal Simulation Engineer」とそのSenior職が募集されました。対象はアナログ、RF、インターコネクト、PMIC、メモリと広く、AMSシミュレーションの方法論とツールを開発・維持する役割です。Senior職ではAppleのAMSシミュレーション方法論を主導し、ツール戦略を継続的に発展させることまで明記されています。[[9]](#source-9)

## Appleはモデルを「作るもの」から「運用するもの」へ広げている

ここまでの求人がすべて同じ組織や共通基盤につながっているとまでは言えません。ただ、個別の求人を追うだけでも、Appleではモデル作成、モデル検証、DMS、サブシステム検証、シミュレーション基盤、AMSシミュレーション方法論という役割が、それぞれ仕事として成立していることは読み取れます。

特に目につくのが「Mixed-Signal Model Verification Engineer」と「Analog Mixed-Signal Modeling Software Engineer」です。モデルを書く担当者自身も回路との一致を確認していますが、それとは別にモデル専用の検証フローを作る人がいて、多数の設計者がモデルを使うための基盤を作る人もいます。PMUでも精度指標、回帰テスト、モデルライブラリの保守までが職務に入っており、モデルを作った後の品質管理や運用にも多くの仕事が割かれています。[[2]](#source-2) [[5]](#source-5) [[7]](#source-7)

2026年の求人では、モデルを作る職種だけでなく、モデルを検証する職種、DMSへ組み込む職種、共通基盤を作る職種まで別々に募集されています。RNMを作ること自体より、作った後の検証、再利用、変更追跡、継続運用まで仕事として分かれている点が特徴です。
