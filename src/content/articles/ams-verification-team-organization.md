---
title: "AMS検証チームは、会社のどこに置くべきなのか"
published: "2026-08-31"
summary: "Apple、MediaTek、Skyworks、NXPの公開求人から、製品固有のAMS検証と会社横断の検証技術をどこで分けているかを見る。"
relatedEvents:
  - apple-2026-pmu-ams-design-verification-team-hiring
  - apple-2026-08-cad-ams-simulation-methodology
  - mediatek-2026-08-ams-methodology-and-modeling-hiring
  - skyworks-2026-07-central-ams-verification-hiring
  - nxp-2026-advanced-power-ams-verification-lead-hiring
---

## はじめに

2026年のAppleには、AMS検証に関係する性格の違う求人が同時に出ています。一つはPMUの「Design Verification Engineer」で、仕様レビューから検証計画、アナログ回路とRTLを組み合わせたシミュレーション、問題の切り分けまでを担当します。もう一つは「Senior CAD Automation and Mixed-Signal Simulation Engineer」で、こちらはアナログ、RF、インターコネクト、PMIC、メモリといった複数の設計チームが使うAMSシミュレーション環境を担当します。([Apple](https://jobs.apple.com/en-us/details/200658493-0836/pmu-design-verification-engineer-analog-mixed-signal-engineer?team=HRDWR\&utm_source=chatgpt.com "PMU Design Verification Engineer: Analog & Mixed Signal Engineer - Jobs - Careers at Apple"))

CAD側の求人には、

> “own and drive Apple's AMS simulation methodology ... for our analog, RF, interconnect, PMIC, and memory design teams”

とあります。PMUを正しく検証する仕事と、そのPMUチームを含む複数の設計組織が使うシミュレーション手法を整える仕事が、同じ会社の中で分かれています。([Apple](https://jobs.apple.com/en-us/search?location=sunnyvale-SVL\&utm_source=chatgpt.com "Search Jobs - Sunnyvale - Jobs - Careers at Apple"))

この分け方は会社によってかなり違います。MediaTekはモデル作成手法とAMS検証手法を別々の専任グループで扱い、Skyworksは中央AMS検証チームそのものを新しく作ろうとしています。NXPではAdvanced Power Systemという製品領域の中にAMS Verification Leaderを置き、製品検証と検証手法の改善を同じ役割に持たせています。([MediaTek Careers](https://careers.mediatek.com/en/jobs/MTK120231030001?utm_source=chatgpt.com "Analog/Mixed-Signal Design Verification Methodology Development Engineer | MediaTek Careers"))

## 製品の近くに残したい仕事

AppleのPMU向けAMS検証は、かなり製品に近い位置にあります。アーキテクトとの初期検討から仕様レビュー、検証計画、シミュレーション、問題の切り分けまでを担当し、フルチップ検証にも関わります。どの機能を重点的に見るか、どんな条件で壊れそうかといった判断にはPMUそのものの知識が必要なので、この部分を製品チームから完全に切り離すのは難しそうです。([Apple](https://jobs.apple.com/en-us/details/200658493-0836/pmu-design-verification-engineer-analog-mixed-signal-engineer?team=HRDWR\&utm_source=chatgpt.com "PMU Design Verification Engineer: Analog & Mixed Signal Engineer - Jobs - Careers at Apple"))

NXPも比較的こちら側です。「Senior AMS Verification Leader」はAdvanced Power Systemチームに所属し、仕様レビューから検証計画、回帰テスト、カバレッジ、バグ管理、シリコンとの比較までを担当します。ただし仕事内容にはビヘイビアモデルやチェッカ、アサーション、再利用可能な検証部品の開発も含まれており、製品検証だけを行う役割ではありません。([NXP Careers](https://nxp.wd3.myworkdayjobs.com/careers/job/Milan/Senior-AMS-Verification-leader_R-10065738?utm_source=chatgpt.com "Senior AMS Verification leader"))

> “Drive methodology improvements to increase simulation efficiency, reuse, quality, and cost effectiveness.”

NXPでは、製品をよく知る検証チームの中に手法改善まで残しています。回路から離れすぎないことを優先しながら、そこで作ったものは次のプロジェクトにも使う、という形です。([NXP Careers](https://nxp.wd3.myworkdayjobs.com/careers/job/Milan/Senior-AMS-Verification-leader_R-10065738?utm_source=chatgpt.com "Senior AMS Verification leader"))

## 共通部分を製品チームの外へ出す

AppleのCAD側は、製品チームに残す仕事とはかなり違います。回路解析、レイアウト前後のシミュレーション、RTLシミュレーション、ビヘイビアモデル、アナログ／デジタル協調シミュレーションなどを扱い、対象となる設計チームもPMICだけではありません。製品固有のテスト内容ではなく、複数の設計分野で繰り返し使うシミュレーション技術を持っています。([Apple](https://jobs.apple.com/en-us/search?location=sunnyvale-SVL\&utm_source=chatgpt.com "Search Jobs - Sunnyvale - Jobs - Careers at Apple"))

Skyworksはさらに広い範囲を一つのAMS検証組織へ寄せようとしています。2026年1月の「Director, Central AMS Verification」は、新しい中央AMS SoC検証チームを立ち上げる求人です。

> “found and lead our central AMS SoC Verification Team ... architect an enterprise-wide verification platform”

その担当には共通ライブラリ、モデル、テストベンチ部品、再利用可能な検証IP、カバレッジ、アサーション、回帰テストの自動化まで含まれています。Appleが製品AMS検証とCADを分けているのに対して、Skyworksは検証側の共通部分を「Central AMS Verification」という組織へかなり広く集める構成です。([Skyworks Careers](https://careers.skyworksinc.com/job/San-Jose-Director%2C-Central-AMS-Verification-CA-95101/1358461100/?utm_source=chatgpt.com "Director, Central AMS Verification Job Details | Skyworks"))

## MediaTekは「作り方」まで専門化する

MediaTekには「Analog/Mixed-Signal Design Verification Methodology Development Engineer」という専任の求人があります。テストベンチ、ドライバ、チェッカ、アサーション、カバレッジなどを扱いますが、特徴的なのは、新しい検証方法を考えるだけで終わらないことです。

> “work hands-on with AMS IP Teams for AMS DV flow and process experiments, demonstrations, adaptions, and deployment.”

実際のAMS IPチームと一緒に試し、調整してから社内へ展開するところまで仕事になっています。横断組織を作ると、現場の回路から離れすぎるという問題が出ますが、MediaTekの求人では実IPで試す工程まで専任グループの仕事に含めています。([MediaTek Careers](https://careers.mediatek.com/en/jobs/MTK120231030001?utm_source=chatgpt.com "Analog/Mixed-Signal Design Verification Methodology Development Engineer | MediaTek Careers"))

さらに別の「Analog/Mixed-Signal Modeling Methodology Development Engineer」が、ビヘイビアモデルの作成方法、検証方法、元の回路との比較、各検証環境への組み込みを担当します。「モデルを書く人」と「検証する人」を分けるだけでなく、「モデルの作り方を整える仕事」と「検証の作り方を整える仕事」まで別の専門領域になっています。([MediaTek Careers](https://careers.mediatek.com/en/jobs/MTK120231030000?utm_source=chatgpt.com "Analog/Mixed-Signal Modeling Methodology Development Engineer | MediaTek Careers"))

## 4社で境目がかなり違う

公開求人から見える範囲を整理すると、同じAMS検証でも組織の切り方はかなり違います。

| 会社製品に近い検証共通部分を持つ場所 |                       |                                  |
| ------------------ | --------------------- | -------------------------------- |
| Apple              | PMUなどのAMS検証           | CADが複数設計部門のAMS環境を担当              |
| MediaTek           | 各AMS IP / Chip DV     | モデル作成手法とAMS検証手法を別々に専任化           |
| Skyworks           | 各製品・設計チーム             | Central AMS Verification Teamを新設 |
| NXP                | Advanced Power内のAMS検証 | 同じ製品領域の中で手法改善と再利用も担当             |

この違いは、単なる組織図の好みだけではなさそうです。AMS検証には、回路の近くにいた方がよい仕事と、会社で一度整えた方がよい仕事が混在しています。PLLとPMICでは重要なfailureもテスト条件も違いますが、RNMの検証方法、UVMとの接続、共通部品、回帰テストやカバレッジの管理まで製品ごとに別々である必要はありません。

その境目をAppleは製品チームとCADの間に置き、MediaTekはさらにモデル作成手法と検証手法へ分けています。Skyworksは共通部分を中央AMS検証チームへかなり広く集め、NXPは回路知識を持つ製品領域の中に手法改善まで残しています。中央化の度合いだけで並べるより、「回路の近くに残す知識をどこまでにするか」という違いとして見る方が、それぞれの組織の特徴が分かりやすくなります。

## まとめ

2026年の公開求人を見ると、AMS検証の組織に一つの定番があるわけではありません。Appleは製品AMS検証と横断CADを分け、MediaTekはモデル作成手法と検証手法まで別々の専任グループで持っています。Skyworksは中央AMS検証チームを新設し、NXPは製品領域の中で検証と手法改善を一緒に担当させています。([Apple](https://jobs.apple.com/en-us/search?location=sunnyvale-SVL\&utm_source=chatgpt.com "Search Jobs - Sunnyvale - Jobs - Careers at Apple"))

各社に共通しているのは、AMS検証を全部中央化していることではありません。製品固有の仕様やfailureを扱う仕事と、モデル作成、共通部品、カバレッジ、回帰テスト、シミュレーション環境のように複数プロジェクトで使える仕事を分けて考えていることです。その境目をどこに置くかについて、4社はかなり違う答えを出しています。

求人だけから実際の組織図や運用範囲まで断定することはできません。それでも、どの仕事を製品チームへ残し、どの仕事を横断側へ持たせているかを見ると、各社がAMS検証のどこを製品固有のノウハウと考え、どこからを会社として蓄積できる技術と考えているかが見えてきます。
