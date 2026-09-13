---
title: "ChipAgentsと半導体メーカーの分業が見えてきた"
published: "2026-09-13"
summary: "Micronは機能を共同開発し、ADIは専門機能を内製し、Broadcomは生成物と検証工程を採用要件に書く。顧客側の具体的な仕事から、ChipAgentsが引き受ける領域を読む。"
sources:
  - title: "Why Chip Engineers Should Care About AI-Created Behavioral Models"
    publisher: "ChipAgents / Sidharth Kannan"
    url: "https://chipagents.ai/blogs/ai-created-behavioral-models"
  - title: "Analog/Mixed Signal Verilog Modeling Design Engineer — R024672"
    publisher: "Broadcom"
    url: "https://broadcom.wd1.myworkdayjobs.com/en-US/External_Career/job/USA-CA-Irvine-Alton-Parkway-Bldg-1/Analog-Mixed-Signal-Verilog-Modeling-Design-Engineer_R024672"
  - title: "CV — ChipAgents Research Engineer experience"
    publisher: "Sidharth Kannan"
    url: "https://sidk2.github.io/cv/"
  - title: "DAC 2026: Autonomous Root Cause Analysis: Agentic AI for Debugging at Commercial Scale"
    publisher: "DAC 2026"
    url: "https://63dac.conference-program.com/presentation/?id=EF102&sess=sess229"
  - title: "Micron and ChipAgents — 確認範囲：英語自動字幕 15:14–22:19、28:11–28:56"
    publisher: "DACtv / Alon Shtepel"
    url: "https://www.youtube.com/watch?v=rbOkfDU0RNs&t=1111s"
  - title: "DAC 2026: From Hype to Impact: Where Agentic AI Actually Delivers Value in Chip Design Today"
    publisher: "DAC 2026"
    url: "https://63dac.conference-program.com/presentation/?id=TT103&sess=sess188"
  - title: "Analog Devices and ChipAgents — 確認範囲：英語自動字幕 35:08–35:29、36:38–37:16"
    publisher: "DACtv / Nimay Shah"
    url: "https://www.youtube.com/watch?v=2FCm8BWmQbo&t=2198s"
  - title: "Product Line Director, AMS"
    publisher: "ChipAgents"
    url: "https://jobs.ashbyhq.com/alpha-design-ai-inc/ed78fd5d-77b7-44ea-8c85-1ee57758debc"
relatedEvents:
  - chipagents-2026-agentic-ams-behavioral-modeling
  - broadcom-2026-07-dms-modeling-hiring
  - micron-chipagents-2026-07-analog-flows-collaboration
  - analog-devices-chipagents-2026-07-platform-and-internal-ams
---

## はじめに

2026年7月27日のDACで、MicronのAlon ShtepelはChipAgentsとの関係を「we co-developed」と表現した。ダッシュボード、指標、RCA、セキュリティ機能を一緒に開発し、analog flowsも立ち上げているという。顧客が自社の検証フローを持ち込み、AIツールの開発に参加している。[[4]](#source-4) [[5]](#source-5)

2日後の共同講演では、ADIのNimay Shahが外部連携と内製の分担を説明した。ChipAgentsとはplatformで連携し、アナログ回路最適化やcoverage closureは自社で作る。AIを導入する側にも、独自のAI機能を開発する仕事がある。[[6]](#source-6) [[7]](#source-7)

さらにBroadcomの求人を見ると、AIに作らせるSVモデルとテストベンチ、その先のschematic照合まで具体的に書かれている。3社の資料を並べると、AIベンダーと半導体メーカーの仕事の境界が見えてくる。[[2]](#source-2)

## Micronでは、時差をまたぐデバッグの受け渡しに入る

Shtepelが所属するのは、データセンターSSD向けのASIC組織だ。講演では、4大陸に数百人のメンバーがいて、設計、検証、physical design、post-siliconまでを扱うと説明している。ChipAgentsとの協業も、この大きな開発組織の中で進んでいる。[[5]](#source-5)

具体的な使い方が出るのは28:11以降だ。RCAが原因と修正案をまとめ、設計者へ渡す。設計者はその修正が妥当かを読み、判断する。Shtepelは、複数のタイムゾーンにまたがる会社で、この受け渡しが速くなることを挙げた。修正案を添えて渡せれば、相手の返答を待ってから追加調査する往復を減らせる。この工程の短縮は、グローバルなDVチームには効く。[[5]](#source-5)

Shtepelは小規模IPでの効果を説明し、full-chipでは文脈の把握、速度、精度を課題に挙げている。個別IPで役立つ道具を、さらに広い設計の文脈で使えるようにする。この作業とanalog flowsの立ち上げが、顧客との共同開発として語られている点が面白い。[[5]](#source-5)

## ADIは、専門知識を実装する場所を自社に持つ

ADIのShahは、36:38以降で「buy plus build」という方針を説明する。platformではChipAgentsと連携し、domain intelligenceは自社で持つ。その具体例として、強化学習と深層ニューラルネットによるアナログ回路最適化、coverage closureの仕組みを挙げ、どちらも自社開発だと述べた。[[7]](#source-7)

分業の軸は、ADIが競争力を置く場所にある。Shah自身がこれらの内製機能を差別化要因と位置付けている。回路をどう最適化するか、検証をどう収束させるかという専門領域へ、自社の開発力を投入する考え方だ。[[7]](#source-7)

この説明を分業として読むと、ChipAgents側は共通基盤を磨き、ADI側は自社の回路や検証に踏み込む解法を作る、という役割が浮かぶ。外部のAI基盤を導入した後も、顧客側のAI開発は続く。半導体メーカーが持つ専門知識を、どちらがどの形で実装するかが事業の境界になる。

## Broadcomの求人には、生成物の渡し先が書かれている

BroadcomのR024672求人は、タッチコントローラ、ワイヤレス給電、ヘルスセンシング、衛星向けAFEを対象にしたモデル開発職だ。SystemVerilog DMS、wrealやEEnetを含むnettype、モデル対schematicの照合が職務に並ぶ。生成モデルが入っていく先のAMS/DMS環境まで見える。[[2]](#source-2)

同じ求人は、仕様からanalog SVモデルとテストベンチを生成する際のCursorやchipAgentsの使用経験を求めている。ツール名を選択肢として示しながら、生成物と照合工程は具体的に指定している。AIの出力を既存のシミュレーション環境へ接続し、回路と比較できる状態にする仕事が、採用要件になっている。[[2]](#source-2)

開発者側にも接点がある。6月5日にChipAgentsのモデル生成記事を書いたSidharth Kannanは、自身のCVで、出荷したAMS検証toolchainがBroadcomとMicronなどで使われたと記している。公式の技術記事、顧客側の求人、開発者の職務実績をつなぐと、モデル生成を実際の検証工程へ持ち込む担当者と作業が見えてくる。[[1]](#source-1) [[3]](#source-3)

## 求人が求めるのは、顧客の課題から購入までをつなぐ人

ChipAgents自身のAMS製品責任者求人には、AMS Behavioral ModelingとAMS Layoutの二つの製品ラインが記されている。前者はモデルの自動生成・検証、後者は初回からDRC/LVSを満たすアナログレイアウトを目標に掲げる。担当者は両方の製品づくりを率いる。[[8]](#source-8)

この求人で目を引くのは「validate willingness to pay before we build」という一節だ。最初に役立つ用途を顧客と絞り、開発前に支払い意思を確かめる。職務全体も「problem to purchase order」と表現され、課題整理、研究開発、デモ、評価、販売までが一人の責任範囲に入っている。[[8]](#source-8)

必要なモデル精度、減らしたい工数、顧客が払う価格を結び付けて、次に作る機能を決める。技術と事業を同時に詰める職務だ。Micronの共同開発と重ねると、顧客の工程に深く入り、その場で価値の出る用途を製品へ育てるという仕事の進め方が見える。

## まとめ

Micronは開発に参加し、ADIは専門機能を自社で作り、Broadcomは生成物と照合工程を採用要件に書く。それぞれの資料に、AIベンダーへ渡す仕事と、半導体メーカーが持つ仕事が現れている。

AMS向けAIを事業にするには、生成、デバッグ、最適化などの機能を、顧客の設計組織と検証環境へ接続する必要がある。Broadcomの求人にある[モデル自体の検証](../rnm-model-validation/)も、その接続部分に当たる。顧客側の工程を読むと、AI製品が入り込む場所が具体的になる。

ChipAgentsの動向を追うときは、顧客名と一緒に、その会社がどの工程を任せ、どの知識を自社で持つかを追いたい。共同開発の対象や内製との境界が動いたとき、半導体メーカーとAIベンダーの分業も変わる。

資料確認日：2026年9月13日。講演の発言は、Sourcesに示した時刻の英語自動字幕を参照した。
