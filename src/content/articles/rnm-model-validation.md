---
title: "回路を検証するためのRNMを、誰が検証するのか"
published: "2026-08-31"
summary: "RNMで検証を高速化すると、モデル自体が新しい検証対象になる。Analog Devices、Dialog、Renesas、TIの公開事例から、モデル検証が独立した工程として発達した流れを見る。"
sources:
  - title: "Digitizing Mixed Signal Verification on the LMA Project"
    publisher: "DVCon Proceedings"
    url: "https://dvcon-proceedings.org/wp-content/uploads/digitizing-mixed-signal-verification.pdf"
  - title: "Model Validation for Mixed-Signal Verification: The Importance of Being Earnest about Modeling"
    publisher: "DVCon Proceedings"
    url: "https://dvcon-proceedings.org/wp-content/uploads/model-validation-for-mixed-signal-verification-the-importance-of-being-earnest-about-modeling.pdf"
  - title: "Automated Modeling Testbench Methodology Tested with Four Types of PLL Models"
    publisher: "DVCon Proceedings"
    url: "https://dvcon-proceedings.org/wp-content/uploads/1022-Automated-Modeling-Testbench-Methodology-Tested-with-four-Types-of-PLL-Models.pdf"
  - title: "ANA-MODELGEN: Automating Analog IP Model Generation and Validation for Efficient Mixed-Signal Verification"
    publisher: "DAC 2026"
    url: "https://63dac.conference-program.com/presentation/?id=ENGPRES367&sess=sess295"
relatedEvents:
  - analog-devices-2014-metric-driven-mixed-signal-verification
  - dialog-semiconductor-2016-mixed-signal-model-validation
  - renesas-2023-automated-pll-model-testbench
  - texas-instruments-2026-ana-modelgen-ams-model-generation
---

## はじめに

2014年、Analog DevicesはDVConで「Digitizing Mixed Signal Verification」を発表しています。SystemVerilogやUVM、RNMをアナログ／ミックスドシグナル検証へ持ち込み、それまでSPICEでは難しかった多数の条件を高速に確認した事例です。ただし、その中には一部のモデルが間違っており、その誤りをテープアウト前に発見できず、実シリコンの問題につながったという報告もあります。[[1]](#source-1)

> “some items were incorrectly modeled and were not identified before tapeout, resulting in silicon issues.”

当時のモデル検証は、一部のSPICE比較とレビューが中心でした。論文では、その反省として自動化されたモデル検証の仕組みが必要だと書かれています。回路を高速に検証するためにRNMを作ると、今度はそのRNM自体が新しい検証対象になります。

モデルの誤りは、一つの回路機能の不具合とは少し性質が違います。同じモデルを何百というテストが使っていれば、多数のテストが同じ誤った振る舞いを前提に正常終了する可能性があります。RNMによって検証を高速化できるほど、一つのモデルの誤りが影響する範囲も広くなります。

## RNMを使うほど、モデル自体が検証対象になる

RNMの利点は、トランジスタレベルでは重すぎる検証をイベント駆動シミュレーションへ移し、多数の動作モードや設定、シーケンスを回帰テストで確認できることです。一方で、テスト数やカバレッジを増やしても、モデルから抜け落ちている回路の振る舞いは検出できません。2016年にDialog Semiconductorが発表した「Model Validation for Mixed-Signal Verification」でも、優れたUVM環境があっても、基礎となるアナログモデルが不適切なら十分な安心材料にはならないと論じています。[[2]](#source-2)

モデル検証で確認したいのは、「このモデルは正しいか」という単純な○×だけではありません。例えばPLLのRNMなら、周波数やロック動作は再現していても、電源依存性や細かな過渡現象を意図的に省略していることがあります。それ自体はモデルの欠陥ではなく、高速化のための抽象化です。

必要なのは、「何について、どの条件まで、このモデルを信用してよいか」を確認することです。回路を完全に再現するモデルを要求すれば、抽象化によって得た速度の利点も失われます。モデル検証には、回路との一致だけでなく、そのモデルをどの検証に使えるかを明確にする役割もあります。

## 回路と一致すれば終わり、ではない

Dialogの論文では、モデルを一種類として扱っていません。実装からなるべく独立して仕様や機能を表す仕様モデルと、実際の回路構成を反映する実装モデルを区別し、さらにトランジスタ回路との比較を行っています。[[2]](#source-2)

| 表現 | 役割 |
| --- | --- |
| 仕様モデル | 仕様や基本機能を実装から独立して表す |
| 実装モデル | 実際の回路構成や振る舞いを反映する |
| トランジスタ回路 | 実際に設計された回路 |

この構成では、SPICE回路が常に一方向の「正解」になるわけではありません。実際、このモデル検証を適用した結果、Dialogはモデルではなくアナログ回路側の問題も発見したと報告しています。仕様、モデル、回路を比較すると、「モデルと回路が違う」という事実は分かりますが、どちらが間違っているかは別途判断する必要があります。[[2]](#source-2)

モデル検証はモデルの品質確認であると同時に、複数の設計表現の間にある矛盾を探す検証とも考えられます。RNMを導入すると計算量は減りますが、仕様、モデル、回路という照合すべき表現は増えます。抽象化によって検証が単純になる部分と、新しく管理が必要になる部分が同時に生まれます。

## 一つの回路に、一つのモデルとは限らない

2023年のRenesasのPLL事例では、同じPLLについてVerilog-AMSのモデル、open-loop RNM、closed-loop RNM、EEnetを使ったclosed-loop RNMの4種類を比較しています。前提になっているのは、設計やテストによって適したモデルが異なるという考え方です。Renesasが作ったテストベンチも、モデルと回路だけでなく、二つの異なるモデルを比較できるようになっています。[[3]](#source-3)

例えば詳細なモデルでは過渡応答まで確認し、軽いRNMではチップレベルのシーケンスを大量に回す、といった使い分けができます。どちらか一方を唯一の正しいモデルにする必要はありません。複数の抽象度を使うなら、それぞれのモデルがどの検証目的を担当し、モデル同士でどの性質が一致していなければならないかを管理する必要があります。

この段階になると、モデル検証はモデルを書いた人が波形を何本か確認する作業では足りません。複数のモデルと回路へ共通の刺激や測定を適用し、モデル対回路だけでなくモデル対モデルも比較できる検証環境が必要になります。モデルが再利用されるのと同じように、モデルを検証する仕組みも再利用可能なものになっていきます。

## モデル生成を自動化すると、検証が次の仕事になる

モデル作成そのものを自動化すると、別の問題が出ます。モデルを作る時間が短くなっても、そのモデルを人が一つずつ回路と比較していたら、今度はモデル検証の方が開発時間を占めます。自動化によって作業が消えるというより、ボトルネックが隣の工程へ移ります。

DAC 2026でTexas Instrumentsが発表した「ANA-MODELGEN: Automating Analog IP Model Generation and Validation for Efficient Mixed-Signal Verification」は、この流れの現在地点として分かりやすい例です。公開された説明では、アナログのビヘイビアモデルだけでなく自動判定付きテストベンチも生成し、SPICE referenceとの等価性確認まで行う仕組みとして紹介されています。TIはこれを製品SoCの検証フローへ展開したと報告しています。[[4]](#source-4)

2014年のAnalog Devicesは、モデル検証不足による問題を経験し、自動化された検証の必要性を挙げていました。それから十年以上たった現在は、モデルをどう作るかだけでなく、「作ったモデルをどう信用できる状態にするか」まで自動化の対象になっています。モデルを速く作れるようになれば、検証されていないモデルも速く増やせるため、生成と検証が同じフローへ入っていくのは自然な流れです。[[1]](#source-1)[[4]](#source-4)

## まとめ

RNMによって、アナログ回路を含むシステムでも大量の回帰テストを実行しやすくなりました。その一方で、広く再利用されるモデルの誤りは、多数のテストへ共通して入り込む可能性があります。RNMが検証の基盤になるほど、モデルそのものを検証する必要性も大きくなります。

その検証は、RNMとSPICEの波形を一致させれば終わるものでもありません。仕様モデル、実装モデル、複数のRNM、トランジスタ回路を使い分け、それぞれがどの範囲で有効なのかを確認する必要があります。SPICEがRNMによって不要になったというより、大量の条件探索をRNMへ移したことで、SPICEや元回路をモデル検証や対象を絞ったデバッグに使えるようになり、その間をつなぐ「モデルを検証する工程」が発達してきた、と見る方が実態には近そうです。
