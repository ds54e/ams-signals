---
title: "AMS検証チームは、会社のどこに置くべきなのか"
published: "2026-08-31"
summary: "Apple、MediaTek、Skyworks、NXPの公開求人から、製品固有のAMS検証と会社横断の検証技術をどこで分けているかを見る。"
sources:
  - title: "PMU Design Verification Engineer: Analog & Mixed Signal Engineer"
    publisher: "Apple"
    url: "https://jobs.apple.com/en-us/details/200658493-0836/pmu-design-verification-engineer-analog-mixed-signal-engineer?team=HRDWR"
  - title: "Senior CAD Automation and Mixed-Signal Simulation Engineer"
    publisher: "Apple"
    url: "https://jobs.apple.com/en-us/search?location=sunnyvale-SVL"
  - title: "Analog/Mixed-Signal Design Verification Methodology Development Engineer"
    publisher: "MediaTek"
    url: "https://careers.mediatek.com/en/jobs/MTK120231030001"
  - title: "Senior AMS Verification Leader"
    publisher: "NXP"
    url: "https://nxp.wd3.myworkdayjobs.com/careers/job/Milan/Senior-AMS-Verification-leader_R-10065738"
  - title: "Director, Central AMS Verification"
    publisher: "Skyworks"
    url: "https://careers.skyworksinc.com/job/San-Jose-Director%2C-Central-AMS-Verification-CA-95101/1358461100/"
  - title: "Analog/Mixed-Signal Modeling Methodology Development Engineer"
    publisher: "MediaTek"
    url: "https://careers.mediatek.com/en/jobs/MTK120231030000"
relatedEvents:
  - apple-2026-pmu-ams-design-verification-team-hiring
  - apple-2026-08-cad-ams-simulation-methodology
  - mediatek-2026-08-ams-methodology-and-modeling-hiring
  - skyworks-2026-07-central-ams-verification-hiring
  - nxp-2026-advanced-power-ams-verification-lead-hiring
---

2026年のAppleには、AMS検証に関係する性格の違う求人が同時に出ています。一つはPMUの「Design Verification Engineer」で、仕様レビューから検証計画、アナログ回路とRTLを組み合わせたシミュレーション、問題の切り分けまでを担当します。もう一つは「Senior CAD Automation and Mixed-Signal Simulation Engineer」です。こちらはアナログ、RF、インターコネクト、PMIC、メモリといった複数の設計チームが使うAMSシミュレーション環境を担当します。[[1]](#source-1)

PMUを正しく検証する仕事と、そのPMUチームを含む複数の設計組織が使うシミュレーション手法を整える仕事が、同じ会社の中で分かれています。[[2]](#source-2)

各社でこの境界は異なります。MediaTekではモデル作成手法とAMS検証手法を別々の専任グループで扱っています。Skyworksは中央AMS検証チームそのものを新設しようとしており、NXPではAdvanced Power Systemという製品領域の中にAMS Verification Leaderを置き、製品検証と検証手法の改善を同じ役割に持たせています。[[3]](#source-3) [[4]](#source-4) [[5]](#source-5) [[6]](#source-6)

## 製品の近くに残したい仕事

AppleのPMU向けAMS検証は、製品に近い位置にあります。アーキテクトとの初期検討から仕様レビュー、検証計画、シミュレーション、問題の切り分けまでを担当し、フルチップ検証にも関わります。どの機能を重点的に見るか、どんな条件で問題が起きそうかといった判断にはPMUそのものの知識が必要です。この部分を製品チームから完全に切り離すのは難しいでしょう。[[1]](#source-1)

NXPも比較的こちら側です。「Senior AMS Verification Leader」はAdvanced Power Systemチームに所属し、仕様レビューから検証計画、回帰テスト、カバレッジ、バグ管理、実チップとの比較までを担当します。ただし仕事内容にはビヘイビアモデルやチェッカ、アサーション、再利用可能な検証部品の開発も含まれており、製品検証だけを行う役割ではありません。手法改善によってシミュレーション効率や再利用性、品質を上げることも職務に含まれています。[[4]](#source-4)

NXPでは、製品をよく知る検証チームの中に手法改善まで残しています。回路から離れすぎないことを優先しながら、そこで作ったものは次のプロジェクトにも使う、という形です。[[4]](#source-4)

## 共通部分を製品チームの外へ出す

AppleのCAD側は、製品チームに残す仕事とは性格が違います。回路解析、レイアウト前後のシミュレーション、RTLシミュレーション、ビヘイビアモデル、アナログ／デジタル協調シミュレーションなどを扱い、対象となる設計チームもPMICだけではありません。製品固有のテスト内容ではなく、複数の設計分野で繰り返し使うシミュレーション技術を持つ役割です。[[2]](#source-2)

Skyworksは、さらに広い範囲を一つのAMS検証組織へ寄せようとしています。2026年1月の「Director, Central AMS Verification」は、新しい中央AMS SoC検証チームを立ち上げる求人でした。

> “found and lead our central AMS SoC Verification Team ... architect an enterprise-wide verification platform”

担当範囲には共通ライブラリ、モデル、テストベンチ部品、再利用可能な検証IP、カバレッジ、アサーション、回帰テストの自動化まで含まれています。Appleが製品AMS検証とCADを分けているのに対し、Skyworksは検証側の共通部分を「Central AMS Verification」という組織へ広く集める構成です。[[5]](#source-5)

## MediaTekは「作り方」まで専門化する

MediaTekには「Analog/Mixed-Signal Design Verification Methodology Development Engineer」という専任の求人があります。テストベンチ、ドライバ、チェッカ、アサーション、カバレッジなどを扱いますが、新しい検証方法を考えるだけで仕事が終わるわけではありません。

実際のAMS IPチームと一緒に検証フローやプロセスを試し、調整してから社内へ展開するところまで担当します。横断組織を作ると現場の回路から離れやすくなりますが、MediaTekの求人では、実IPで試す工程まで専任グループの仕事に含めていました。[[3]](#source-3)

さらに別の「Analog/Mixed-Signal Modeling Methodology Development Engineer」が、ビヘイビアモデルの作成方法、検証方法、元の回路との比較、各検証環境への組み込みを担当します。「モデルを書く人」と「検証する人」を分けるだけではありません。「モデルの作り方を整える仕事」と「検証の作り方を整える仕事」まで、それぞれ専門領域として切り出されています。[[6]](#source-6)

## 4社で境界が違う

公開求人から見える範囲を整理すると、同じAMS検証でも組織の切り方は異なります。

| 会社 | 製品に近い検証 | 共通部分を持つ場所 |
| --- | --- | --- |
| Apple | PMUなどのAMS検証 | CADが複数設計部門のAMS環境を担当 |
| MediaTek | 各AMS IP/Chip DV | モデル作成手法とAMS検証手法を別々に専任化 |
| Skyworks | 各製品・設計チーム | Central AMS Verification Teamを新設 |
| NXP | Advanced Power内のAMS検証 | 同じ製品領域の中で手法改善と再利用も担当 |

この違いは、単なる組織図の好みだけではなさそうです。AMS検証には、回路の近くにいた方がよい仕事と、会社横断で整えた方がよい仕事が混在しています。PLLとPMICでは重要な不具合の出方もテスト条件も違いますが、RNMの検証方法、UVMとの接続、共通部品、回帰テストやカバレッジの管理まで製品ごとに別々である必要はありません。

Appleはその境界を製品チームとCADの間に置いています。MediaTekはさらにモデル作成手法と検証手法へ分け、Skyworksは共通部分を中央AMS検証チームへ広く集めようとしています。一方、NXPは回路知識を持つ製品領域の中に手法改善まで残しました。中央化の度合いだけで並べるより、「どの仕事を回路の近くに残すか」という違いとして見ると、それぞれの特徴が分かりやすくなります。

## どこまでを共通化するか

2026年の公開求人を見ると、AMS検証の組織に一つの定番があるわけではありません。Appleは製品AMS検証と横断CADを分け、MediaTekはモデル作成手法と検証手法まで別々の専任グループで持っています。Skyworksは中央AMS検証チームの新設を進め、NXPは製品領域の中で検証と手法改善を一緒に担当させています。

各社に共通しているのは、AMS検証を全部中央化していることではありません。製品固有の仕様や不具合を扱う仕事と、モデル作成、共通部品、カバレッジ、回帰テスト、シミュレーション環境のように複数プロジェクトで使える仕事を分けて考えている点です。その境界をどこに置くかについて、4社は異なる答えを出しています。

求人だけから実際の組織図や運用範囲まで断定することはできません。それでも、どの仕事を製品チームへ残し、どの仕事を横断側へ持たせているかを見ると、各社がAMS検証のどこを製品固有のノウハウと考え、どこからを会社として蓄積できる技術と見ているかが表れています。
