---
title: "同じテストを二度書きたくない。PSSとAMS検証をシリコン前後でつなぐ"
published: "2026-09-02"
summary: "Infineonが長く取り組んできたシリコン前後の共通化、Virtual ATE、Virtual Prototype、PSS、IEEE P1687.2の公開事例を追い、AMS検証で何を共通化すべきかを見る。"
sources:
  - title: "Download Portable Stimulus (PSS)"
    publisher: "Accellera Systems Initiative"
    url: "https://www.accellera.org/downloads/standards/portable-stimulus"
  - title: "Drafts Under Public Review"
    publisher: "Accellera Systems Initiative"
    url: "https://www.accellera.org/downloads/drafts-review"
  - title: "Extending Constrained Random Verification to mixed-signal Automotive Power Devices using a non-stationary Markov process"
    publisher: "Infineon Technologies"
    url: "https://project.edacentrum.de/rescar/system/files/ct_publication/2.2_nirmaier.pdf"
  - title: "A common platform for bridging pre- and post-silicon verification in mixed-signal designs"
    publisher: "Infineon Technologies / FH Technikum Wien"
    url: "https://www.researchgate.net/publication/283668530_A_common_platform_for_bridging_pre-_and_post-silicon_verification_in_mixed-signal_designs"
  - title: "Test Your Test Programs Pre-Silicon: A Virtual Test Methodology for Industrial Design Flows"
    publisher: "JKU / Infineon Technologies"
    url: "https://www.cda.cit.tum.de/files/eda/2019_isvlsi_virtual_test_for_industrial_design_flows.pdf"
  - title: "Enabling fast post-Si test case development using Virtual Prototyping for a mixed-signal gate driver IC"
    publisher: "Infineon Technologies"
    url: "https://www.researchgate.net/publication/380034769_Enabling_fast_post-Si_test_case_development_using_Virtual_Prototyping_for_a_mixed-signal_gate_driver_IC"
  - title: "Maximise verification reuse with Cadence Perspec System Verifier"
    publisher: "Cadence"
    url: "https://community.cadence.com/cadence_blogs_8/b/fv/posts/maximise-verification-reuse-with-cadence-perspec-system-verifier"
  - title: "Scalable Functional Verification using Portable Stimulus Standard"
    publisher: "Qualcomm Technologies / DVCon U.S."
    url: "https://dvcon-proceedings.org/wp-content/uploads/1145-1.pdf"
  - title: "Accelerating Device Sign-off through a Unified Environment for Design Verification, Silicon Validation, and ATE with PSS"
    publisher: "Qualcomm / Advantest / Cadence / DVCon U.S."
    url: "https://dvcon-proceedings.org/wp-content/uploads/1085.pdf"
  - title: "Industrial application of IEEE P1687.2 for post-Si verification of a smart power device"
    publisher: "Infineon Technologies"
    url: "https://www.researchgate.net/publication/385754090_Industrial_application_of_IEEE_P16872_for_post-Si_verification_of_a_smart_power_device"
  - title: "Shift-Left by applying IEEE P1687.2 to SystemVerilog test-benches for Automotive Smart-Power devices"
    publisher: "Infineon Technologies"
    url: "https://www.researchgate.net/publication/405440166_Shift-Left_by_applying_IEEE_P16872_to_SystemVerilog_test-benches_for_Automotive_Smart_Power_devices"
  - title: "IP-XACT Based PSS Modeling for Shift-Left SoC Verification"
    publisher: "Samsung Electronics / DVCon U.S."
    url: "https://dvcon-proceedings.org/wp-content/uploads/submission_165.pdf"
relatedEvents:
  - infineon-2011-xvp-multiplatform-mixed-signal-crv
  - infineon-2015-common-pre-post-silicon-test-platform
  - infineon-2019-virtual-ate-pre-silicon-test-program
  - infineon-2023-mixed-signal-gate-driver-virtual-prototype
  - infineon-2023-pss-perspec-verification-reuse
  - qualcomm-2024-pss-scalable-functional-verification
  - qualcomm-advantest-cadence-2025-pss-silicon-validation
  - infineon-2024-p1687-2-post-silicon-smart-power
  - infineon-2026-p1687-2-uvm-shift-left
  - samsung-2026-ip-xact-pss-shift-left
  - ecosystem-2026-08-pss-3-1-public-review
---

AccelleraのPortable Test and Stimulus Standard（PSS）は、テストやシナリオを一つの表現として記述し、シミュレーション、エミュレーション、FPGA、実チップなど複数の実行環境へ展開するための標準です。2026年8月末にはPSS 3.1ドラフトの公開レビューも始まりました。説明だけを読むと、シリコン前で作ったテストをそのまま実チップまで持っていけるようにも見えます。[[1]](#source-1) [[2]](#source-2)

ただしAMSでは、「同じテスト」という言葉が少しややこしくなります。シミュレータ上の電源やクロックはテストベンチから直接制御できますが、実チップでは電源装置、信号発生器、周波数カウンタ、オシロスコープ、ATEなどを動かさなければなりません。テスト内容が同じでも、実行方法と測定方法は大きく異なります。

Infineonの公開事例を時系列に追うと、この問題はPSSの登場以前から扱われていました。そして長く取り組んでも、一つの方式には収束していません。そこから見えてくるのは、共通化したいものが一種類ではないということです。

## PSSより前から、同じテストを持ち回ろうとしていた

2011年のInfineonの論文では、車載パワーデバイスのミックスドシグナル検証に制約付きランダムを持ち込み、そのテスト生成をExecutable Verification Plan（XVP）へ接続しています。生成したテストはCadenceのシミュレータやMATLAB/Simulinkだけでなく、実機側のPXIやATEにも渡せる構成でした。実際にシミュレーションと実機の両方で利用し、ミックスドシグナル設計の問題を見つけたことも報告されています。[[3]](#source-3)

2015年には、さらに分かりやすい形になります。Infineonのシリコン前環境AGENtiXと、実機側のラボ自動化環境JAZZの上に、共通のテスト記述を置く方式です。テストケースは実行環境に依存しないスクリプトとして書き、環境ごとのインタプリタがSystemCのシミュレーション環境や実際の測定器向けに変換して実行します。テスト内容を一度だけ書き、ハードウェアへのアクセス方法を下側へ追い出す構成でした。[[4]](#source-4)

ここで共通化されているのは、同じピン波形ではありません。「電源を入れる」「レジスタを書く」「ある状態を待つ」「値を測る」といった上位の手順です。シリコン前と実機で実装は別でも、テストの意図と手順は共有する。この考え方は、後のPSSにも通じます。

## 実機側の仕事を、シリコン前へ持ってくる

2019年のVirtual ATEでは方向が少し変わります。シリコン前のテストを実機へ持っていくのではなく、本来は実チップが来てから動かすATEのテストプログラムを先に仮想環境で実行します。SystemC/SystemC-AMSの仮想DUTと仮想ATEを使い、Infineonの事例では同じテストプログラムを後にTeradyne UltraFLEXでも実行しました。仮想ATEと実ATEの両方で同じレジスタテストの問題が再現され、初回シリコンより数か月前にテストプログラムを確認できたと報告されています。[[5]](#source-5)

2023年の車載ミックスドシグナルゲートドライバでは、実機検証の環境そのものをシリコン前へ近づけています。仮想プロトタイプはMATLAB/Simulink上に作られ、デジタル側のFSMやSPIレジスタテーブルだけでなく、PMU、チャージポンプ、ゲート制御回路などのアナログ回路も含みます。さらに、この仮想プロトタイプを後の実機検証で使う既存のラボ自動化環境からそのまま制御しています。[[6]](#source-6)

この事例では、測定器のサンプリングレート、電流制限、応答時間といった制約まで仮想プロトタイプ側へ簡易的に入れています。DUTだけを仮想化するのではなく、「後で実チップを測る環境」を先に使える形へ寄せています。シリコン前の資産を実機へ運ぶ方法と、実機側の仕事をシリコン前へ前倒しする方法の両方が使われてきたわけです。

## PSSではシナリオまで共通化できる

2023年にはInfineon、Tessolve、Cadenceの共同プロジェクトとして、PSS/Perspecを使った検証資産の再利用例も公開されました。Cadenceの報告では、InfineonがDUTと検証環境を持ち、TessolveがPSS/SLNモデルを開発・実行し、Cadenceが方法論とツールを支援しています。実行先にはSpecman eのシミュレーション環境とSoC上のLinuxが使われました。Infineon自身による独立した導入報告ではありませんが、実際の再利用フローでPSSを試した例ではあります。[[7]](#source-7)

PSSでは個々のテスト手順より上に、アクション、依存関係、制約、カバレッジを持つシナリオモデルを置きます。Qualcommの2024年の事例では、同じPSSシナリオの操作をUVM agentで実行するか、組み込みプロセッサで実行するかを実行側で切り替えています。シナリオの構造を変えずに実行環境を変えられるため、「どのシナリオを生成するか」まで共有できます。[[8]](#source-8)

2025年にはQualcomm、Advantest、Cadenceが、PSSベースのテストを設計検証から実機検証ベンチへ渡すフローを発表しました。CPUのbinning testをシミュレーションで確認した後、実行時パラメータを変更しながら実チップ上でも動かしています。ATE/HVMへの受け渡しもフローには含まれますが、公開された具体的な実証はまず実機検証ベンチまでです。PSSが将来構想だけでなく、シリコン前と実チップの間で使われ始めている例です。[[9]](#source-9)

## それでも一つの標準には収束していない

InfineonがPSSを試した後も、別の方法を並行して使っている点は重要です。2024年にはスマートパワーデバイスの実機ラボ検証へIEEE P1687.2のチップレベルPDLを導入しました。背景には、ラボ側でシリコン前検証やテスト開発からのテストケース再利用が限られていたことがあり、PDLによってテスト実装を標準化しようとしています。[[10]](#source-10)

2026年にはその向きが逆になり、IEEE P1687.2で記述したテストケースをチップトップのSystemVerilog UVMテストベンチへ展開するフローを発表しました。高位のテスト記述からピンレベルの入力へ変換する構成です。PSSがシナリオ空間を記述する方向なのに対し、こちらはテスト手順を複数の環境へ展開する色が強く、同じ「シリコン前後の共通化」でも解いている問題が少し違います。[[11]](#source-11)

PSS側もまだ成熟の途中です。2026年のSamsungのDVCon論文では、PSSが2018年から標準化されている一方、主流と言えるほどの採用には至っていないとした上で、IP-XACTからPSSモデルを生成してモデル作成の負担を減らす方法を示しています。PSS 3.1も2026年9月30日まで公開レビュー中です。標準が存在することと、現場でモデルを作り続けられることは別の問題として残っています。[[12]](#source-12) [[2]](#source-2)

## AMSでは、共通化する層を分けて考える

ミックスドシグナルICで全部を一つのコードに揃えようとすると、すぐに無理が出ます。たとえばクロックジェネレータなら、PowerOn、ProgramPLL、WaitLock、SwitchReference、Relock、EnterStandby、Wakeupのようなシナリオは共通化しやすい部分です。

一方、それを実行する方法は環境ごとに違います。

| 層 | 共通化したい内容 | 環境ごとの実装例 |
| --- | --- | --- |
| シナリオ | ロック後にリファレンスを切り替え、再ロックを確認 | PSSなど |
| 操作手順 | レジスタ書込み、リセット、電源シーケンス | UVM RAL、C/Python、IJTAGのPDL、ATE API |
| アナログ挙動 | PLL、LDO、センサーの応答 | RNM、AMS、SPICE、実チップ |
| 測定 | 周波数、ロック時間、位相雑音 | UVC、波形解析、周波数カウンタ、オシロスコープ、ATE |

たとえばMeasurePhaseNoiseというアクション名は共通化できます。しかしRNMではジッタを監視し、AMSでは波形やノイズ解析を使い、実機では位相雑音測定器を使うかもしれません。共通にしたいのは「何を測るか」であって、「どう測るか」まで同じにする必要はありません。

Infineonの長い取り組みを見ても、XVP、共通テストスクリプト、Virtual ATE、Virtual Prototype、PSS、IEEE P1687.2が順番に置き換わって一本へ収束したわけではありません。それぞれが別の境界を越えるために使われています。シナリオ、操作手順、アナログ挙動、測定を分けて考えれば、どこを再利用しているのかも明確になります。

そのとき共通にしたいのは、同じ実装ではなく同じ検証意図です。同じシナリオIDをRNM、AMS、実機、ATEで追跡できれば、どの段階で挙動が変わったかを比較できます。「同じテストを二度書かない」という目標も、すべてを一つの言語へ押し込むことではありません。環境ごとに何度も書き直していた部分を、共通化できる形に切り出すことです。AMSでは、すべてを同じコードにするより、この方が無理がありません。
