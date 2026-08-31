---
title: "アナログのカバレッジ100%は、何を100%にしたのか"
published: "2026-08-31"
summary: "アナログのfunctional coverageは、連続した回路動作そのものを数えているわけではない。仕様や回路知識から有限個の状態を切り出して分母を作り、その到達性を測る。RNMとトランジスタ回路で同じbinの意味が変わる例から、100%という数字の読み方を考える。"
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

2016年、Texas Instrumentsはアナログ回路のfunctional coverageについて、単純ですが厄介な例を挙げました。ある設計に10個の機能があるのに、covergroupには6個しか定義されていなかったとします。その6個をすべて通ればツール上は100%ですが、残り4個は一度も検証されていないかもしれません。[[1]](#source-1)

デジタル検証でも起こる問題ですが、アナログではさらに手前に難しさがあります。電圧、電流、周波数、立ち上がり時間などは連続値であり、取り得る値を一つずつbinとして数えることができません。100%を測る前に、何を100%の分母にするかを決める必要があります。

2012年、CadenceとIntelはSystemVerilogで実数値のカバレッジを扱う際の課題を、次のように表現しました。[[2]](#source-2)

> “partitioning the infinite continuum of real numbers during bin creation”

無限に続く値の空間を、binを作る段階で有限個へ切り分けるという意味です。アナログのカバレッジは回路の全動作をそのまま数えた数字ではなく、人間が「ここから先は別の状態として扱う」と境界を引いた後、その状態をどこまで通ったかを測っています。

## 100%になる前に、分母を作っている

たとえば電源電圧が0Vから1.8Vまで連続的に変化するとします。この範囲を細かく数え上げる代わりに、「低すぎる」「しきい値付近」「正常範囲」といった検証上の状態へ分けます。2025年にams OSRAMが報告したPORの検証では、次のような分割が使われました。[[3]](#source-3)

| 観測する量 | カバレッジ上の状態 |
| --- | --- |
| 電源電圧 | LOW / THRESHOLD / NOMINAL |
| 立ち上がり時間 | SLOW / MID / FAST |
| 方向 | 立ち上がり / 立ち下がり |
| POR出力 | 検出 / 非検出 |

実際の電圧にLOWとTHRESHOLDを分ける線が存在するわけではありません。何VまでをLOWとするかは、仕様や回路特性をもとに決めます。立ち上がり時間も同じで、何µsまでをFASTと数えるかを定義した時点で、初めてカバレッジの分母ができます。

TIの2016年の方法でも、どの内部ノードを観測し、電圧や電流のどこにしきい値を置くかはアナログ設計者が選んでいました。[[1]](#source-1) すべての回路状態を数えるのではなく、仕様と回路知識を使って「検証上区別する状態」を先に作っています。同じ回路とテストでも、この切り分け方が変われば100%の中身も変わります。

## 同じbinでも、RNMと回路では到達性が違う

binを一度定義しても、その到達性がどのDUT表現でも同じになるとは限りません。ams OSRAMは同じUVMベースのカバレッジモデルを、RNMによるDMSとトランジスタ回路によるAMSの両方へ適用しました。PORでは、電源領域や立ち上がり時間を含む項目がDMS、AMSともに100%へ到達しています。[[3]](#source-3)

グリッチに関する項目では結果が変わりました。DMSでは100%だったのに、AMSではFASTの立ち上がりに関する項目が66.67%、方向・立ち上がり時間・グリッチ検出を組み合わせたカバレッジが50%に低下しています。原因として報告されたのは、RNMでは十分に表現されていなかった実回路のグリッチフィルタリングでした。[[3]](#source-3)

同じbinへ同じように刺激しているのに、DUTをトランジスタ回路へ変えると到達できない組み合わせが現れました。カバレッジが100%から50%へ下がったからといって、検証が後退したわけではありません。RNMでは見えていなかった回路効果が、空いたbinとして観測できるようになっています。

## 空いているbinは、必ずしもテスト不足ではない

カバレッジが50%なら、残り50%を埋めたくなります。しかし未達binには、刺激不足とは異なる理由も含まれます。少なくとも次のような可能性を分けて考える必要があります。

- 必要な刺激をまだ与えていない
- binの境界や組み合わせ方が適切でない
- RNMに必要な振る舞いが入っていない
- トランジスタ回路ではその状態に到達できない

最後の二つは、単純にテストを追加しても解決しません。ams OSRAMのグリッチの例では、DMSで埋まったbinがAMSでは空きました。その理由を調べた結果、RNMと実回路の振る舞いの違いが見つかっています。[[3]](#source-3)

カバレッジを「100%へ近づける数字」とだけ考えると、この情報を落とします。空いているbinを機械的に埋めるのではなく、そのbinが本当に到達すべき状態なのか、モデルではなぜ到達できたのかまで確認する必要があります。未達そのものが検証結果になる場合があります。

## 「87%」だけでは、ほとんど何も分からない

functional coverageはDUTに付属する固定値ではありません。同じ回路でもbinの切り方を変えれば数字は変わり、到達不能な組み合わせを除外しても変化します。アナログではPVTによって動作領域そのものが移動するため、binの境界も回路条件と無関係には決められません。

そのため、「functional coverage 87%」という数字だけを取り出しても、別の87%とは簡単に比較できません。少なくとも、次の条件が必要です。

- 何をbinとして数えたのか
- 境界をどこに置いたのか
- どの組み合わせを除外したのか
- RNMかトランジスタ回路か
- どのPVT条件で測ったのか

ams OSRAMの方法でも、仕様解析とアナログ設計者とのすり合わせをもとに実数値のパラメータを作り、回路条件に応じたしきい値をカバレッジへ渡していました。[[3]](#source-3) カバレッジ値は回路だけから決まる数字ではなく、仕様の解釈、binの定義、DUTの抽象度、刺激条件を含めた検証環境全体から生まれます。

## 100%の分母を誰が作るのか

カバレッジの収集を自動化しても、何を分母にするかまで自動的に決まるわけではありません。Texas InstrumentsがDAC 2025で発表した「AACT: Automated Analog Coverage Tool for Mixed Signal Verification」では、範囲、周波数、立ち上がり、グリッチなどの自動判定とカバレッジを系統的に作り、刺激の不足を検出します。対象にはSPICE回路とビヘイビアモデルの両方が含まれます。[[4]](#source-4)

こうした仕組みによって、判定や収集を毎回手作業で書く負担は減らせます。一方、どの電圧差を別の状態として数えるか、どの立ち上がり時間を区別するか、どのグリッチを検証対象に含めるかには仕様と回路の知識が必要です。TIの2016年とams OSRAMの2025年の事例でも、その知識を使って観測点や境界を決めていました。[[1]](#source-1)[[3]](#source-3)

アナログのfunctional coverageで難しいのは、100%へ到達することだけではありません。その前に、連続した回路動作から何を「検証上の違い」として数えるかを決め、100%の分母を作る必要があります。その分母は最初から回路の中に存在するものではないからこそ、100%という結果を見るときには、何を100%にしたのかまで読む必要があります。
