---
title: "アナログのカバレッジ100%は、何を100%にしたのか"
published: "2026-08-31"
summary: "アナログのfunctional coverageは、連続した回路動作を有限個のbinへ切り出して測る。TI、ams OSRAMの事例から、100%の分母がどう作られ、RNMと回路でその意味がどう変わるかを見る。"
sources:
  - title: "Functional Coverage Collection for Analog Circuits: Enabling Seamless Collaboration Between Design and Verification"
    publisher: "DVCon Proceedings"
    url: "https://dvcon-proceedings.org/wp-content/uploads/functional-coverage-collection-for-analog-circuits-enabling-seamless-collaboration-between-design-and-verification.pdf"
  - title: "Bringing Continuous Domain into SystemVerilog Covergroups"
    publisher: "DVCon Proceedings"
    url: "https://dvcon-proceedings.org/wp-content/uploads/bringing-continuous-domain-into-systemverilog-covergroups.pdf"
  - title: "Implementing Functional Coverage for Analog IPs in Mixed-Signal Verification Environments"
    publisher: "DVCon Proceedings"
    url: "https://dvcon-proceedings.org/wp-content/uploads/DVConEU_2025_paper_102.pdf"
  - title: "AACT: Automated Analog Coverage Tool for Mixed Signal Verification"
    publisher: "DAC 2025"
    url: "https://62dac.conference-program.com/presentation/?id=ENGPRES330&sess=sess217"
relatedEvents:
  - cadence-2012-real-valued-systemverilog-coverage
  - texas-instruments-2016-analog-functional-coverage
  - ams-osram-2025-ams-dms-functional-coverage
  - texas-instruments-2025-analog-assertion-coverage-toolbox
---

2016年、Texas Instrumentsはアナログ回路のfunctional coverageについて、少し厄介な例を挙げています。ある設計に10個の機能があるのに、covergroupには6個しか定義されていなかったとします。その6個をすべて通ればツール上のカバレッジは100%になりますが、残り4個は一度も検証されていないかもしれません。[[1]](#source-1)

これはデジタル検証でも起きる問題です。ただ、アナログでは「100%の分母を何にするか」を決めるところから難しくなります。電圧、電流、周波数、立ち上がり時間などは連続値なので、取り得る値を一つずつbinとして数えることはできません。

2012年にCadenceとIntelが発表したSystemVerilogのreal値カバレッジに関する論文では、この問題を次のように表現しています。[[2]](#source-2)

> “partitioning the infinite continuum of real numbers during bin creation”

無限に続くreal値の空間を、binを作る段階で有限個へ分割する必要があります。アナログのカバレッジは回路の動作をそのまま数えているのではなく、まず「どの違いを検証上の違いとして数えるか」を決めるところから始まります。

## 連続した電圧を有限個の状態にする

2025年にams OSRAMがDVCon Europeで発表した事例では、電源電圧や立ち上がり時間をSystemVerilogのcovergroupへ取り込んでいます。PORの電源電圧はLOW、THRESHOLD、NOMINALに分け、立ち上がり時間はSLOW、MID、FASTに分けています。立ち上がり／立ち下がり方向やPORが反応したかどうかも含めて、組み合わせカバレッジを取っています。[[3]](#source-3)

| 観測する量 | カバレッジ上の状態 |
| --- | --- |
| 電源電圧 | LOW / THRESHOLD / NOMINAL |
| 立ち上がり時間 | SLOW / MID / FAST |
| 方向 | rise / fall |
| POR出力 | trigger / no trigger |

実際の電源電圧にはLOWとTHRESHOLDの間に物理的な境界線が引かれているわけではありません。どこまでをLOWとし、どこからをTHRESHOLDとするかは、仕様や回路の特性をもとに決めます。立ち上がり時間についても同じで、何µsまでをFASTとするかを決めなければbinそのものが作れません。

TIの2016年の方法でも、どの内部ノードを観測するか、電圧や電流のどこへしきい値を置くかをアナログ設計者が選んでいます。すべてのノードを監視するのではなく、検証上意味のある場所と境界を選ぶ必要があります。[[1]](#source-1) この時点でカバレッジモデルには回路知識が組み込まれています。カバレッジ100%とは連続した回路動作を100%測り尽くした数字ではなく、仕様と回路知識から有限個に切り出した状態について、定義したbinをすべて通ったという数字です。

## RNMでは埋まったbinが回路では埋まらない

ams OSRAMの事例では、同じUVMベースのカバレッジをRNMによるDMSとトランジスタ回路によるAMSの両方へ適用しています。最初にDMSで100%のfunctional coverageを目指しており、論文ではこの段階の100%を、テストベンチと刺激が仕様を十分に反映できていることを確認する初期段階の指標として扱っています。[[3]](#source-3)

PORについては、DMSでもAMSでも個々の項目と組み合わせカバレッジが100%になりました。LOW、THRESHOLD、NOMINALの電源領域、FAST、MID、SLOWの立ち上がり時間、それぞれの方向やPOR出力まで、同じカバレッジモデルで確認できています。

ところが別のグリッチ関連の項目では結果が変わりました。DMSでは対象となる項目をすべてカバーできたのに対し、AMSではFASTの立ち上がりに関する項目が66.67%、立ち上がり／立ち下がり方向・立ち上がり時間・グリッチ検出を組み合わせたカバレッジが50%にとどまりました。[[3]](#source-3)

| 対象 | DMS | AMS |
| --- | ---: | ---: |
| グリッチ関連の個別／組み合わせ項目 | 全項目をカバー | 一部未達 |
| FASTの立ち上がりに関する項目 | 100% | 66.67% |
| 方向 × 立ち上がり時間 × グリッチ検出 | 100% | 50% |

原因として報告されているのが、実回路側のグリッチフィルタリングです。RNMでは十分に表現されていなかった回路効果がトランジスタ回路には存在し、RNM上で到達できたbinへ実回路では同じように到達しませんでした。この組み合わせカバレッジでは100%から50%へ下がりましたが、検証で得られた情報はむしろ増えています。[[3]](#source-3)

## カバレッジが下がると、情報が増えることがある

通常、カバレッジは高い方がよく、未達binは埋める対象として扱われます。ただし、先ほどの50%を単純に「テスト不足」と判断すると、重要な情報を落とします。RNMでは存在した状態の組み合わせが、トランジスタ回路では物理的な効果によって同じようには現れないことが分かったためです。

未達binには、刺激が不足している場合だけでなく、カバレッジモデルのbin設定が不適切な場合、モデルに必要な振る舞いが入っていない場合、実回路では到達不能な場合などがあります。したがって、空いているbinを機械的に埋めればよいわけではありません。なぜ未達なのかを分類し、そのbinが本当に検証すべき状態なのかまで確認する必要があります。

ams OSRAMの事例では、DMSで刺激と検証計画の到達性を高速に確認し、AMSへ切り替えることでRNMでは見えなかった回路固有の効果が表面に出ています。同じカバレッジモデルを使うことで、抽象度を変えたときに「どのbinの意味が変わったか」まで比較できます。[[3]](#source-3)

## 100%という数字はDUTだけでは決まらない

ここまで見ると、functional coverageはDUTの検証済み率を直接測った数字ではないことが分かります。同じ仕様、同じテストであっても、RNMを使うかトランジスタ回路を使うかによってカバレッジ値が変わります。さらに、binの境界や除外する組み合わせを変更しても数字は変わります。

特にアナログではPVTによって動作領域そのものが移動します。2025年のams OSRAMの手法でも、仕様解析とアナログ設計者とのすり合わせからreal値のパラメータパッケージを作り、回路条件に応じたしきい値をカバレッジへ渡しています。[[3]](#source-3)

そのため「カバレッジ87%」という数字だけを取り出しても、意味は十分には分かりません。何をbinとして定義したか、どの条件を除外したか、RNMかトランジスタ回路か、どのPVT条件だったか、どの刺激を実行したかまで含めて、その数字が何を測ったものなのかを読む必要があります。

## 100%の分母を誰が作るのか

2025年のDACでは、Texas Instrumentsが「AACT: Automated Analog Coverage Tool for Mixed Signal Verification」を発表しています。範囲、周波数、立ち上がり、グリッチなどについて自動判定とカバレッジを系統的に作り、刺激の不足を検出する仕組みです。SPICE回路とビヘイビアモデルの両方を対象にしています。[[4]](#source-4)

カバレッジの収集や自動判定の作成を自動化しても、何を別の状態として数えるかは先に決める必要があります。電圧のどこに境界を置くか、どの立ち上がり時間を別の状態とするか、どのグリッチを検証対象にするかには、仕様と回路の知識が必要です。TIの2016年とams OSRAMの2025年の事例でも、その知識をアナログ設計者と検証側の間で共有してカバレッジモデルを作っています。[[1]](#source-1)[[3]](#source-3)

アナログのfunctional coverageで難しいのは、100%へ到達することだけではありません。その前に、連続した回路動作から「検証上の違い」を切り出して、100%の分母を作る必要があります。そのため同じテストでもRNMとトランジスタ回路ではカバレッジが変わり、未達になったbinそのものが、RNMでは消えていた回路の振る舞いを教えてくれる場合があります。
