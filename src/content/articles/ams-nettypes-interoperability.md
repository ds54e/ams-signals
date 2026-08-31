---
title: "AMSの「線」を自由にしたら、線同士がつながらなくなった"
published: "2026-08-31"
summary: "EEnet、VQC、c_enetからSV-MSIまで、SystemVerilog UDNでAMSの線を自由にした結果、異なるnettype同士の接続が標準化課題になった流れを追う。"
relatedEvents:
  - texas-instruments-2019-eenet-loading-verification
  - renesas-2023-sv-udn-rnm-power-switched-capacitor-modeling
  - microchip-2023-analog-information-model
  - nxp-2025-gyroscope-uvm-ms-modeling
---

## はじめに

2019年のDVCon Europeで、Texas Instrumentsは「Enabling Digital Mixed-Signal Verification of Loading Effects in Power Regulation using SystemVerilog User-Defined Nettype」という発表をしています。対象は電源回路のDMS検証です。当時よく使われていた`wreal`には、電源回路をモデル化すると困る性質がありました。`wreal`はscalarなので、一本のnetを電圧として扱うか、電流として扱うかを決める必要があります。一方、負荷変動や複数driverの相互作用までモデル化するには、同じnetについて電圧、電流、インピーダンスを扱いたくなります。

> “Voltage, current and impedance in the same net are needed to model loading effects.”

そこで使われたのがSystemVerilogのUser-Defined Nettype（UDN）です。CadenceのEEnetでは、一本のnetにV、I、Rの3つのreal値を持たせ、複数driverからの寄与をresolution functionで解決します。LDOやcharge pump、負荷容量をSystemVerilog側でつなぎながら、loadingまでDMSで扱えるようになります。([dvcon-proceedings.org](https://dvcon-proceedings.org/wp-content/uploads/Enabling-Digital-Mixed-Signal-Verification-of-Loading-Effects-in-Power-Regulation-using-SystemVerilogUser-Defined-Nettype.pdf))

この仕組みだけを見ると、`real`一本では足りないなら必要な情報をstructにしてUDNへ載せればよく、AMSの「線」の問題はかなり解決したように見えます。ただし、その自由度から別の問題が生まれました。2024年、AccelleraはSystemVerilog Mixed-Signal Interface Types（SV-MSI）Working Groupを新設しています。標準化の対象は新しいEEnetではなく、「異なるnet type同士をどう接続するか」です。2026年8月現在もWorking GroupはActiveです。([accellera.org](https://www.accellera.org/news/press-releases/389-accellera-forms-systemverilog-mixed-signal-interface-types-working-group?utm_source=chatgpt.com))

## V/I/Rだけでは終わらなかった

EEnetのV/I/Rは、電源回路を考えると分かりやすい構成です。電圧源、電流源、抵抗性の負荷を同じnetへ接続し、Kirchhoffの法則に沿ってnode voltageを決められます。TIの2019年の例では、LDO、current mirror、charge pump、off-chip capacitorなどをこの方法で組み合わせていました。ただし、アナログ回路でnetを通じて受け渡したい情報が、いつもV/I/Rとは限りません。([dvcon-proceedings.org](https://dvcon-proceedings.org/wp-content/uploads/Enabling-Digital-Mixed-Signal-Verification-of-Loading-Effects-in-Power-Regulation-using-SystemVerilogUser-Defined-Nettype.pdf))

Renesasは2023年のDVCon Europeで「SV VQC UDN for Modeling Switch-Capacitor-based Circuits」を発表しています。同社でもV/I/R形式のUDNをLDO、smart charger、DC-DC converterなどに使っていましたが、switched-capacitor crystal oscillatorでは別の表現を選びました。問題になったのはcharge redistributionです。V/I/R形式でもcapacitorは表現できますが、細かい内部clockを使って電荷移動を逐次計算するとchip-level simulationでは重くなります。そこでRenesasは、UDNのstructを`{Voltage, Charge, 1/Capacitance}`として、VQCと呼ぶ形式を作りました。電荷が再分配された後の状態を直接resolution functionで求める構成です。([dvcon-proceedings.org](https://dvcon-proceedings.org/wp-content/uploads/91186.pdf))

同じSystemVerilog UDNでも、載せる物理量が変わっています。

| 発表 | netが持つ主な情報 | 目的 |
|---|---|---|
| TI / EEnet, 2019 | V / I / R | 電源回路のloading、multiple driver |
| Renesas / VQC, 2023 | V / Q / 1/C | switched-capacitor回路のcharge redistribution |
| NXP / c_enet, 2025 | V / I / R / C | MEMSからASICへのcapacitance伝達 |

RenesasのVQCモデルでは、crystalにつながるpinだけをVQCにし、その他のblockは従来のV/I/R形式を使っています。この使い分けで、40MHz switched-capacitor crystal oscillatorについてschematicでは現実的でなかった長時間simulationを可能にし、論文ではCPU timeで90,000倍の高速化を報告しています。これはUDNを一種類へ統一する方向ではなく、回路に合わせてnetの意味を変える使い方です。([dvcon-proceedings.org](https://dvcon-proceedings.org/wp-content/uploads/91186.pdf))

## NXPはEEnetからさらに別のnettypeを作った

2025年のDVCon Europeでは、NXPがgyroscopeのDMS検証について発表しています。ここでもEEnetが登場しますが、そのまま採用してはいません。

NXPはCadence EEnetのresolution functionによるsimulation costを問題として、より単純な独自UDNである`enet`を実装しています。capacitor modelで比較すると、Spectreが256秒、EEnetが129秒、独自`enet`が24秒で、Spectreとのaccuracy differenceは0.1%だったとしています。([dvcon-proceedings.org](https://dvcon-proceedings.org/wp-content/uploads/DVConEU_2025_paper_104.pdf))

さらにgyroscopeでは、MEMSとASICの境界で別の問題がありました。MEMS側がASICへ渡したい量そのものがcapacitanceだったためです。EEnetが持つV/I/Rではcapacitanceを直接渡せません。capacitor currentを代用すると、dynamicな条件では誤差につながります。

NXPはそのために、`enet`へCを加えた`c_enet`を作っています。

> “allowing a net to carry not only voltage (V), current (I), and impedance (R), but also capacitance (C)”

SystemVerilogのnetは、この段階では単に「analog valueを運ぶwire」ではありません。モデル間でどの物理量を交換するかを決めるinterfaceになっています。([dvcon-proceedings.org](https://dvcon-proceedings.org/wp-content/uploads/DVConEU_2025_paper_104.pdf))

## 自由に定義できるので、互いにつながらない

この問題を正面から扱った資料が、MicrochipのChuck McClishによるDVCon U.S. 2023の「Take AIM! Introducing the Analog Information Model」です。

論文の冒頭には、UDNだけでなくUPFの`supply_net_type`や従来の`wreal`も含めたSystemVerilog上のanalog informationの扱いについて、かなり直接的な記述があります。

> “today's value transport mechanisms such as User Defined Nettypes (UDNs), Unified Power Format (UPF) supply nettypes, and legacy wreals are not interoperable with each other.”

同じmodel behaviorでも、接続先のtransport mechanismに合わせて実装を複数用意する必要があり、top-levelで異なるtypeを接続するsystem integratorにも問題が出ると説明しています。Microchipが提案したAnalog Information Model（AIM）は、model implementationとUDN、UPF、wrealなどの間に抽象層を設け、nodeとconnectorで違いを吸収する方法でした。([dvcon-proceedings.org](https://dvcon-proceedings.org/wp-content/uploads/1002-Take-AIM-Introducing-the-Analog-Information-Model.pdf))

UDNには「どんな情報をnetへ載せるか」をユーザーが決められる利点があります。電源ならV/I/R、switched-capacitorならV/Q/C、MEMS interfaceならV/I/R/Cと、その回路に必要な表現を選べます。

その代わり、あるチームが作ったnettypeと別のチームが作ったnettypeを、そのまま接続できる保証はありません。UPFや`wreal`まで含めれば、SoC topで混在する種類はさらに増えます。

## SV-MSIが標準化しているのは「万能な線」ではない

2024年2月にAccelleraが設立したSV-MSI Working Groupのcharterは、次のようになっています。

> “permit interconnect, conversion, and resolution among dissimilar net types in SystemVerilog, including bidirectional connections.”

EEnetを標準nettypeとして決めるとも、V/I/R/Cのような最大公約数のstructを作るとも書かれていません。対象は、異なるnettype間のinterconnect、conversion、resolutionです。logicやUDNと、analog/electrical/real signalとのuni-directional、bi-directionalな接続もscopeに含まれています。([accellera.org](https://www.accellera.org/news/press-releases/389-accellera-forms-systemverilog-mixed-signal-interface-types-working-group?utm_source=chatgpt.com))

Verilog-AMSには以前からconnect moduleがあり、analogとdigitalで型が異なるhierarchical connectionへ変換moduleを自動挿入する仕組みがあります。それでもAccelleraはSV-MSIの背景説明で、connect moduleのような従来方式では現在のSoCで生じるcomplexityとusabilityの要求を満たせなかった、としています。SV-MSIはSystemVerilogそのものへの追加として、この接続を扱う計画です。([accellera.org](https://www.accellera.org/activities/systemverilog-mixed-signal-interface-types?utm_source=chatgpt.com))

標準化はまだ進行中です。2024年2月には年内releaseを目標としていましたが、2025年末にも1.0が「nearing completion」、2026年7月にもreleaseは「on the horizon」とされています。遅れた理由までは公開情報から分かりません。2026年9月10日のDVCon Japanには「Accellera SystemVerilog Mixed-Signal Interface Birds of a Feather」が予定されており、現在のproposalを紹介することになっています。そこでの説明では、将来IEEE 1800/SystemVerilog-2028への取り込みを想定し、このsemanticsをSystemVerilog-AMSやUVM-MSでも利用する計画です。([accellera.org](https://www.accellera.org/news/newsletters/2024-february?utm_source=chatgpt.com))

## まとめ

`wreal`の時代には、AMSの「線」は基本的に一つのreal値を運ぶものでした。loadingまでDMSで扱おうとするとそれでは足りず、SystemVerilog UDNとEEnetによって、V/I/Rをまとめて運べるようになりました。

その後に起きたのは、V/I/Rが業界共通のanalog netになっていくことではありませんでした。Renesasはcharge redistributionのためV/Q/Cを使い、NXPはMEMS interfaceのためcapacitanceを追加しています。UDNによって「回路に必要な情報を線に載せる」という設計が可能になったため、nettype自体がモデルの一部になりました。

SV-MSIが標準化しようとしている場所は、その一段上です。すべてのAMSモデルに同じ線を使わせるのではなく、異なる線を作れる自由度を残したまま、それらをSoCの中で接続できるようにする。2026年にもAMSの「線」が標準化されているのは、線の表現方法がまだ決まっていないからではなく、すでに複数の表現方法を作れるようになったからです。
