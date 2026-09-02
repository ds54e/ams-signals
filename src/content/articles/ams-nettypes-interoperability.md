---
title: "「線」を自由にしたら、線同士がつながらなくなった"
published: "2026-08-31"
summary: "EEnet、VQC、c_enetからSV-MSIまで、SystemVerilog UDNでAMSの線を自由にした結果、異なるnettype同士の接続が標準化課題になった流れを追う。"
sources:
  - title: "Enabling Digital Mixed-Signal Verification of Loading Effects in Power Regulation using SystemVerilog User-Defined Nettype"
    publisher: "DVCon Proceedings"
    url: "https://dvcon-proceedings.org/wp-content/uploads/Enabling-Digital-Mixed-Signal-Verification-of-Loading-Effects-in-Power-Regulation-using-SystemVerilogUser-Defined-Nettype.pdf"
  - title: "Accellera Forms SystemVerilog Mixed-Signal Interface Types Working Group"
    publisher: "Accellera"
    url: "https://www.accellera.org/news/press-releases/389-accellera-forms-systemverilog-mixed-signal-interface-types-working-group"
  - title: "SV VQC UDN for Modeling Switch-Capacitor-based Circuits"
    publisher: "DVCon Proceedings"
    url: "https://dvcon-proceedings.org/wp-content/uploads/91186.pdf"
  - title: "UVM-MS Based Verification of an Automotive Gyroscope"
    publisher: "DVCon Proceedings"
    url: "https://dvcon-proceedings.org/wp-content/uploads/DVConEU_2025_paper_104.pdf"
  - title: "Take AIM: Introducing the Analog Information Model"
    publisher: "DVCon Proceedings"
    url: "https://dvcon-proceedings.org/wp-content/uploads/1002-Take-AIM-Introducing-the-Analog-Information-Model.pdf"
  - title: "SystemVerilog Mixed-Signal Interface Types Working Group"
    publisher: "Accellera"
    url: "https://www.accellera.org/activities/systemverilog-mixed-signal-interface-types"
  - title: "Accellera Newsletter: February 2024"
    publisher: "Accellera"
    url: "https://www.accellera.org/news/newsletters/2024-february"
relatedEvents:
  - texas-instruments-2019-eenet-loading-verification
  - renesas-2023-sv-udn-rnm-power-switched-capacitor-modeling
  - microchip-2023-analog-information-model
  - nxp-2025-gyroscope-uvm-ms-modeling
---

2019年のDVCon Europeで、Texas Instrumentsは「Enabling Digital Mixed-Signal Verification of Loading Effects in Power Regulation using SystemVerilog User-Defined Nettype」を発表しました。対象は電源回路のDMS検証です。当時よく使われていた`wreal`には、電源回路をモデル化すると困る性質がありました。`wreal`は一つの実数値を持つため、一本のnetを電圧として扱うか、電流として扱うかを決める必要があります。一方、負荷変動や複数ドライバの相互作用までモデル化するには、同じnetについて電圧、電流、インピーダンスを扱いたくなります。

そこで使われたのがSystemVerilogのUser-Defined Nettype（UDN）です。CadenceのEEnetでは、一本のnetにV、I、Rの3つのreal値を持たせ、複数ドライバからの寄与をresolution functionで解決します。LDOやチャージポンプ、負荷容量をSystemVerilog側でつなぎながら、負荷の影響までDMSで扱えるようになりました。[[1]](#source-1)

この仕組みだけを見ると、`real`一本では足りないなら必要な情報を`struct`にしてUDNへ載せればよく、AMSの「線」の問題は解決できるように見えます。ただし、その自由度から別の問題が生まれました。2024年、AccelleraはSystemVerilog Mixed-Signal Interface Types（SV-MSI）Working Groupを新設しました。標準化の対象は新しいEEnetではなく、「異なるnettype同士をどう接続するか」です。2026年8月現在もWorking Groupは活動中です。[[2]](#source-2)

## V/I/Rだけでは終わらなかった

EEnetのV/I/Rは、電源回路を考えると分かりやすい構成です。電圧源、電流源、抵抗性の負荷を同じnetへ接続し、Kirchhoffの法則に沿ってノード電圧を決められます。TIの2019年の例では、LDO、カレントミラー、チャージポンプ、外付けコンデンサなどをこの方法で組み合わせていました。ただ、アナログ回路でnetを通じて受け渡したい情報が、いつもV/I/Rとは限りません。[[1]](#source-1)

Renesasは2023年のDVCon Europeで「SV VQC UDN for Modeling Switch-Capacitor-based Circuits」を発表しています。同社でもV/I/R形式のUDNをLDO、スマートチャージャ、DC-DCコンバータなどに使っていましたが、スイッチトキャパシタ型水晶発振器では別の表現を選びました。問題になったのは電荷再分配です。V/I/R形式でもコンデンサは表現できますが、細かい内部クロックを使って電荷移動を逐次計算すると、チップレベルのシミュレーションでは重くなります。そこでRenesasは、UDNの`struct`を`{Voltage, Charge, 1/Capacitance}`として、VQCと呼ぶ形式を作りました。電荷が再分配された後の状態をresolution functionで直接求める構成です。[[3]](#source-3)

結果として、同じSystemVerilog UDNでも載せる物理量が変わっています。

| 発表 | netが持つ主な情報 | 目的 |
| --- | --- | --- |
| TI / EEnet, 2019 | V / I / R | 電源回路の負荷、複数ドライバ |
| Renesas / VQC, 2023 | V / Q / 1/C | スイッチトキャパシタ回路の電荷再分配 |
| NXP / c_enet, 2025 | V / I / R / C | MEMSからASICへの容量値の伝達 |

RenesasのVQCモデルでは、水晶につながるピンだけをVQCにし、その他のブロックには従来のV/I/R形式を使っています。この使い分けによって、40MHzのスイッチトキャパシタ型水晶発振器について回路シミュレーションでは現実的でなかった長時間シミュレーションが可能になり、論文ではCPU時間で90,000倍の高速化を報告しました。UDNを一種類へ統一するのではなく、回路に合わせてnetの意味を変える使い方です。[[3]](#source-3)

## NXPはEEnetからさらに別のnettypeを作った

2025年のDVCon Europeでは、NXPがジャイロスコープのDMS検証について発表しました。ここでもEEnetが登場しますが、そのまま採用したわけではありません。

NXPはCadence EEnetのresolution functionによるシミュレーションコストを問題として、より単純な独自UDNである`enet`を実装しました。コンデンサモデルで比較すると、Spectreが256秒、EEnetが129秒、独自`enet`が24秒で、Spectreとの差は約0.1%だったと報告しています。[[4]](#source-4)

さらにジャイロスコープでは、MEMSとASICの境界に別の問題がありました。MEMS側からASICへ渡したい量そのものが容量値だったためです。EEnetが持つV/I/Rでは容量値を直接渡せません。コンデンサ電流で代用すると、動的な条件では誤差につながります。

NXPはそのために、`enet`へCを加えた`c_enet`を作っています。SystemVerilogのnetは、この段階では単に「アナログ値を運ぶ線」ではありません。モデル間でどの物理量を交換するかを決めるインターフェースになっています。[[4]](#source-4)

## 自由に定義できるので、互いにつながらない

この問題を正面から扱った資料が、MicrochipのChuck McClishによるDVCon U.S. 2023の「Take AIM! Introducing the Analog Information Model」です。

論文の冒頭には、UDNだけでなくUPFの`supply_net_type`や従来の`wreal`も含めたSystemVerilog上のアナログ情報について、かなり直接的な記述があります。

> “today's value transport mechanisms such as User Defined Nettypes (UDNs), Unified Power Format (UPF) supply nettypes, and legacy wreals are not interoperable with each other.”

同じモデルの振る舞いでも、接続先の値の受け渡し方式に合わせて実装を複数用意する必要があり、トップレベルで異なる型を接続する側にも問題が出ると説明しています。Microchipが提案したAnalog Information Model（AIM）は、モデル実装とUDN、UPF、wrealなどの間に抽象層を設け、nodeとconnectorで違いを吸収する方法でした。[[5]](#source-5)

UDNには「どんな情報をnetへ載せるか」をユーザーが決められる利点があります。電源ならV/I/R、スイッチトキャパシタならV/Q/1/C、MEMSインターフェースならV/I/R/Cと、その回路に必要な表現を選べます。

その代わり、あるチームが作ったnettypeと別のチームが作ったnettypeを、そのまま接続できる保証はありません。UPFや`wreal`まで含めれば、SoCトップで混在する種類はさらに増えます。

## SV-MSIが標準化しているのは「万能な線」ではない

2024年2月にAccelleraが設立したSV-MSI Working Groupのcharterには、次のようにあります。

> “permit interconnect, conversion, and resolution among dissimilar net types in SystemVerilog, including bidirectional connections.”

EEnetを標準nettypeとして決めるとも、V/I/R/Cのような最大公約数の`struct`を作るとも書かれていません。対象は、異なるnettype間のinterconnect、conversion、resolutionです。logicやUDNとanalog/electrical/real signalとの一方向、双方向の接続も対象に含まれています。[[2]](#source-2)

Verilog-AMSには以前からconnect moduleがあり、アナログとデジタルで型が異なる階層接続へ変換モジュールを自動挿入する仕組みがあります。それでもAccelleraはSV-MSIの背景説明で、connect moduleのような従来方式では現在のSoCで生じる複雑さや使いやすさの要求を満たせなかった、としています。SV-MSIではSystemVerilogそのものへの追加として、この接続を扱う計画です。[[6]](#source-6)

標準化はまだ進行中です。2024年2月には年内リリースを目標としていましたが、2025年末にも1.0は完成間近とされ、2026年7月にもリリース間近と説明されていました。遅れた理由までは公開情報から分かりません。2026年9月10日のDVCon Japanには「Accellera SystemVerilog Mixed-Signal Interface Birds of a Feather」が予定されており、現在の提案が紹介されることになっています。そこでの説明では、将来IEEE 1800/SystemVerilog-2028への取り込みを想定し、このセマンティクスをSystemVerilog-AMSやUVM-MSでも利用する計画です。[[7]](#source-7)

## 標準化の対象は「線」から接続へ

`wreal`では、一本のnetで基本的に一つのreal値を運びます。負荷の影響までDMSで扱おうとするとそれでは足りず、SystemVerilog UDNを使えばV/I/Rのような複数の値をまとめて運べるようになりました。

ただ、その後V/I/Rが業界共通のアナログnetになったわけではありません。Renesasは電荷再分配のためV/Q/1/Cを使い、NXPはMEMSインターフェースのため容量値を追加しています。UDNによって「回路に必要な情報を線に載せる」という設計が可能になり、nettype自体がモデルの一部になりました。

SV-MSIが標準化しようとしているのは、nettypeそのものではなく、その接続方法です。すべてのAMSモデルに同じ線を使わせるのではなく、異なる線を作れる自由度を残したまま、それらをSoCの中で接続できるようにしようとしています。2026年にもAMSの「線」が標準化されているのは、線の表現方法がまだ決まっていないからではなく、すでに複数の表現方法を作れるようになったからです。
