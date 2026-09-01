---
title: "同じテストを二度書きたくない ― PSSとAMS検証をシリコン前後でつなぐ"
published: "2026-09-02"
summary: "Infineonが長く取り組んできたpre/post-silicon共通化、Virtual ATE、Virtual Prototype、PSS、IEEE P1687.2の公開事例を追い、AMS検証で何を共通化すべきかを見る。"
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

AccelleraのPortable Test and Stimulus Standard（PSS）は、テストやシナリオを一つの表現として記述し、シミュレーション、エミュレーション、FPGA、post-siliconなど複数の実行環境へ展開するための標準です。2026年8月末にはPSS 3.1 draftのpublic reviewも始まりました。説明だけを読むと、pre-siliconで作ったテストをそのまま実チップまで持っていけるようにも見えます。[[1]](#source-1) [[2]](#source-2)

ただしAMSでは、同じテストという言葉が少しややこしくなります。シミュレータ上の電源やクロックはテストベンチから直接制御できますが、実チップでは電源装置、信号発生器、カウンタ、オシロスコープ、ATEなどを動かさなければなりません。テスト内容が同じでも、実行方法と測定方法はかなり違います。

Infineonの公開事例を時系列に追うと、この問題はPSSが登場するよりかなり前から扱われていました。そして長く取り組んでも一つの方式には収束していません。そこから見えてくるのは、共通化したいものが一種類ではない、ということです。

## PSSより前から、同じテストを持ち回ろうとしていた

2011年のInfineonの論文では、automotive power deviceのMixed-Signal検証にConstrained Randomを持ち込み、そのテスト生成をExecutable Verification Plan（XVP）へ接続しています。生成したテストはCadence simulatorやMATLAB/Simulinkだけでなく、post-silicon側のPXIやATEにも渡せる構成でした。論文では実際にシミュレーションとpost-siliconの両方で使い、Mixed-Signalの設計問題を見つけたことも報告されています。[[3]](#source-3)

2015年には、さらに分かりやすい形になります。Infineonのpre-silicon環境AGENtiXとpost-siliconのラボ自動化環境JAZZの上に、共通のテスト記述を置く方式です。テストケースは実行環境に依存しないスクリプトとして書き、環境ごとのインタプリタがSystemCのシミュレーション環境や実際の測定器へ変換して実行します。テストの内容を一度だけ書き、ハードウェアへのアクセス方法を下側へ追い出す構成でした。[[4]](#source-4)

ここで共通化されているのは、同じpin waveformではありません。「電源を入れる」「レジスタを書く」「ある状態を待つ」「値を測る」といった手順です。pre-siliconとpost-siliconで実装は別でも、上位のテスト手順を共通にする。この考え方は、後のPSSが扱うtest intentのportabilityにかなり近いものがあります。

## post-siliconの仕事をpre-siliconへ持ってくる

2019年のVirtual ATEでは方向が少し変わります。pre-siliconのテストを実機へ持っていくのではなく、本来は実チップが来てから動かすATEのテストプログラムを先に仮想環境で実行します。SystemC/SystemC-AMSのvirtual DUTとvirtual ATEを使い、Infineonの事例では同じテストプログラムを後にTeradyne UltraFLEXでも実行しています。virtual ATEと実ATEの両方で同じregister testの問題が再現され、first siliconより数か月前にテストプログラムを確認できたと報告されています。[[5]](#source-5)

2023年のautomotive mixed-signal gate driverでは、さらにpost-siliconの環境そのものをpre-siliconへ近づけています。Virtual PrototypeはMATLAB/Simulink上に作られ、digital側のFSMやSPI register tableだけでなく、PMU、charge pump、gate-control回路などのanalog moduleも含みます。しかも、このVirtual Prototypeを後のpost-silicon verificationで使う既存のラボ自動化環境からそのまま制御しています。[[6]](#source-6)

この事例では、測定器のsample rateやcurrent limitation、response timeのような制約までVirtual Prototype側へ簡易的に入れています。DUTだけを仮想化するのではなく、「後で実チップを測る環境」を先に使える形へ寄せているわけです。pre-silicon資産をpost-siliconへ運ぶ方法と、post-siliconの仕事をpre-siliconへ前倒しする方法の両方が使われています。

## PSSが入ると、共通化する対象が一段上がる

2023年にはInfineon、Tessolve、Cadenceの共同プロジェクトとして、PSS/Perspecを使ったverification reuseも公開されています。Cadenceの報告では、InfineonがDUTと検証環境を持ち、TessolveがPSS/SLN modelを開発・実行し、Cadenceが方法論とツール支援を担当しました。実行例にはSpecman eのシミュレーション環境とSoC上のLinuxが出てきます。これはInfineon自身の独立した導入報告ではなくCadence側からの報告ですが、InfineonがPSSを実際の再利用フローで試していることは確認できます。[[7]](#source-7)

PSSでは、個々のテスト手順より上にaction、dependency、constraint、coverageを持つシナリオモデルを置きます。Qualcommの2024年の事例では、同じPSSシナリオの操作をUVM agentで実行するかembedded processorで実行するかをexecutor側で切り替えています。シナリオの構造を変えずに実行環境を変えられるため、単なる共通テストスクリプトよりも、どの合法シナリオを生成するかという部分まで共通化できます。[[8]](#source-8)

2025年にはQualcomm、Advantest、Cadenceが、PSSベースのテストをdesign verificationから実siliconのvalidation benchへ渡すフローを発表しました。具体例ではCPU binning testをシミュレーションで確認した後、実行時パラメータを変更しながら実チップ上で動かしています。論文はその先のATE/HVMへの受け渡しもフローとして扱っていますが、公開されている具体的な実証はまずsilicon validation benchまでです。PSSが単なる将来構想ではなく、pre-siliconと実チップの間で使われている例として見るのがよさそうです。[[9]](#source-9)

## それでも一つの標準には収束していない

興味深いのは、InfineonがPSSを試した後も別の方法を並行して使っていることです。2024年にはsmart-power deviceのpost-silicon lab verificationへIEEE P1687.2のchip-level PDLを導入しています。背景として、ラボ側ではpre-silicon verificationやtest engineeringからのテストケース再利用が限定的だったことを挙げ、PDLを使ってテスト実装を標準化しようとしています。[[10]](#source-10)

2026年にはその向きが逆になり、IEEE P1687.2で記述したテストケースをtop-level SystemVerilog UVM testbenchへretargetするフローを発表しました。高位のテスト記述からrendererを通し、pin-levelのstimulusへ落とす構成です。PSSがシナリオ空間を記述する方向なのに対し、こちらはテスト手順を複数環境へretargetする色が強く、同じ「pre/post-silicon共通化」でも解いている問題が少し違います。[[11]](#source-11)

PSS側もまだ成熟の途中です。2026年のSamsungのDVCon paperは、PSSが2018年から標準化されている一方で主流の採用は限定的だと述べ、IP-XACTからPSS modelを生成してmodel作成の負担を減らす方法を示しています。PSS 3.1も2026年9月30日までpublic review中です。標準が存在することと、現場でmodelを作り続けられることは別の問題として残っています。[[12]](#source-12) [[2]](#source-2)

## AMSでは、何を共通化するかを分ける

Mixed-Signal ICで全部を一つのコードに揃えようとすると、すぐに無理が出ます。たとえばclock generatorなら、次のようなシナリオはかなり共通化しやすい部分です。

```text
PowerOn
→ ProgramPLL
→ WaitLock
→ SwitchReference
→ Relock
→ EnterStandby
→ Wakeup
```

一方で、それを実行する方法は環境ごとに違います。

| 共通化したいもの | 例 | 実行側に残るもの |
| --- | --- | --- |
| シナリオ | lock後にreferenceを切り替えてrelockを確認 | PSSなどのシナリオモデル |
| テスト手順 | register write、reset、power sequence | UVM RAL、C/Python、PDL、ATE API |
| analog behavior | PLL、LDO、sensorの応答 | RNM、AMS、SPICE、実silicon |
| 測定 | frequency、lock time、phase noise | UVC、波形解析、counter、scope、ATE instrument |

`MeasurePhaseNoise`というactionを共通にすることはできます。しかしRNMではjitter monitor、AMSでは波形やnoise analysis、labではphase-noise analyzerを使うかもしれません。共通にできるのは「何を測るか」であって、「どう測るか」まで同じにする必要はありません。

Infineonの長い取り組みを見ると、XVP、共通テストスクリプト、Virtual ATE、Virtual Prototype、PSS、IEEE P1687.2が置き換わりながら一本に収束したわけではありません。それぞれが別の境界を越えるために使われています。PSSだけでpre-siliconからATEまでを一本化するより、シナリオをPSS、テスト手順をUVM/C/PDL、analog observationをRNM/AMS/lab instrumentへ分ける方が実際の構成に近くなります。

そのとき重要なのは、同じ実装をどこでも走らせることより、同じverification intentを追跡できることです。たとえば同じscenario IDをRNM、AMS、lab、ATEで再現できれば、どの段階で挙動が変わったかを比較できます。「同じテストを二度書かない」という目標は、すべてを一つの言語へ押し込むことではなく、何度も書き直していた部分を一段上の共通表現へ抜き出すことだと考える方が、AMSでは扱いやすそうです。
