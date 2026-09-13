---
title: "ChipAgentsのAMS検証支援はどこまで進んだか"
published: "2026-09-13"
summary: "公式のモデル生成記事、Broadcomの求人、Micron・ADIの共同講演を読み、AMSで確認できる工程と、モデル精度を判断するために足りない情報を整理する。"
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
  - title: "Micron and ChipAgents — English automatic captions, 15:14–22:19 and 28:45–28:56"
    publisher: "DACtv / Alon Shtepel"
    url: "https://www.youtube.com/watch?v=rbOkfDU0RNs&t=1111s"
  - title: "DAC 2026: From Hype to Impact: Where Agentic AI Actually Delivers Value in Chip Design Today"
    publisher: "DAC 2026"
    url: "https://63dac.conference-program.com/presentation/?id=TT103&sess=sess188"
  - title: "Analog Devices and ChipAgents — English automatic captions, 35:08–35:29 and 36:38–37:16"
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

ChipAgentsのAMS関連資料を読むと、モデル生成の手法、採用で求める経験、顧客との共同開発という、性格の異なる情報が見つかります。AMS検証に関わる立場からは、それぞれがどの工程を説明しているのかを確かめたいところです。[[1]](#source-1) [[2]](#source-2) [[5]](#source-5)

たとえば「AMSで使われた」という説明だけでは、モデルを書いたのか、テストベンチを作ったのか、既存環境のデバッグを支援したのかまでは分かりません。モデルと元回路をどの条件で比較したかによっても、利用者が判断できることは変わります。

この記事は2026年9月13日までに確認した公開資料を基にしています。Micron・ADIの講演内容は公開動画の英語自動字幕による確認で、原音や全スライドとの照合は未実施です。講演日は主催者のプログラムで確認し、9月の動画公開とは分けて扱います。[[4]](#source-4) [[5]](#source-5) [[6]](#source-6) [[7]](#source-7)

## モデル生成と照合を一つの工程にする

6月5日の公式記事は、参照シミュレーションからモデルを作り、照合結果に応じて追加実験とモデル修正を反復する流れを説明しています。検証には「same or reserved stimulus sets」とあり、生成時と同じ刺激集合を使う場合も含まれます。[[1]](#source-1)

ここは、生成と検証の自動化を評価するときに気を付けたい点です。生成に使った条件で一致すれば、その条件を再現できたことは確認できます。一方、別の動作条件にも適用するには、生成に使わなかった条件での評価が必要になります。単に「goldenと比較した」という説明だけでは、この区別はつきません。

検証エンジニアにとっての関心は、この反復をどこまで日常の回帰テストに組み込めるかです。回路や仕様が変わったとき、既存モデルを再評価し、差分の原因を調べ、適用範囲を更新できるなら、コード生成時間とは別の価値が生まれます。これは公開フローから考えられる利用価値であり、ここで挙げた運用全体の導入実績を確認したという意味ではありません。

## Broadcomの採用要件とMicronの共同開発

BroadcomのR024672求人は、仕様からanalog SVモデルとテストベンチを生成する際のCursorやchipAgentsの使用経験を挙げています。対象にはタッチ、給電、ヘルスセンシングなどのAFEがあり、DMS、wrealやEEnetを含むnettype、モデル対schematicの照合も職務に含まれます。製品名が具体的なAMS作業と並んでいる点が特徴です。ただし、これは募集内容の記録であり、列挙された全形式がChipAgentsの対応仕様だとは判断できません。[[2]](#source-2)

開発側にも資料があります。Sidharth Kannanは公開CVで、自身が出荷したAMS検証toolchainがBroadcomとMicronなどで使われたと述べています。求人より直接的な利用への言及ですが、本人による職務実績の説明です。対象部署や回路、出荷日は示されておらず、在籍開始の2026年3月を導入日に置き換えることもできません。[[3]](#source-3)

Micronでは、7月27日のDAC共同講演でAlon Shtepelが顧客側の説明をしています。15:14以降に自組織の対象をデータセンターSSD向けASICと説明し、18:31–20:18ではChipAgentsとの共同開発と、立ち上げ中のanalog flowsに言及しました。Micronという社名だけからDRAMやHBMの事例とは読めません。また、analog flowsの具体的なモデル形式や対象ブロックは、この説明では特定できません。[[4]](#source-4) [[5]](#source-5)

## ADIが説明した外部連携と内製の分担

7月29日のDAC共同講演では、ADIのNimay Shahが36:38–37:16で外部連携と内製の分担を説明しています。platformではChipAgentsと連携し、専門領域の知識は自社で持つという方針です。続けて、強化学習・深層ニューラルネットを使うアナログ回路最適化とcoverage closureを、自社で開発する例に挙げています。[[6]](#source-6) [[7]](#source-7)

この説明から確認できるのは、ChipAgentsとの連携とADI内製の機能が同じ講演で明確に区別されていることです。ADIのアナログ最適化をそのままChipAgentsの製品実績として紹介すると、発言の意味が変わります。一方で、この分担が外部のAMS製品を併用していないことの証明になるわけでもありません。

適用範囲の限界も語られています。Shahは35:08–35:29で、デバッグの品質がIPからsubsystem、SoCへ進むにつれて落ちると説明しました。Micron側も20:23以降に複雑なfull-chipの文脈理解を、21:48以降には技術者やLLMが変わったときの結果の予測可能性を課題に挙げています。両者の発言は、同じ評価条件による比較ではなく、各社が経験した課題の報告として読む必要があります。[[5]](#source-5) [[7]](#source-7)

## 求人に現れた二つのAMS製品ライン

ChipAgentsのAMS製品責任者求人には、AMS Behavioral ModelingとAMS Layoutという二つの製品ラインが記されています。前者はモデルの自動生成・検証、後者は初回からDRC/LVSを満たすアナログレイアウトを目標に掲げています。二つの領域が担当範囲として明記されている点が目につきます。[[8]](#source-8)

同じ求人は、顧客の課題整理、研究開発、デモ、評価、販売までを職務に含めています。このため、製品ラインの名称があることと、特定のPDKや顧客回路で目標を達成したことは区別して読む必要があります。募集開始日は確認できていないので、ここでは9月13日時点で確認した職務記述として扱います。[[8]](#source-8)

今後の資料で確かめたいのは、この担当範囲が具体的な生成物と評価結果にどう結び付くかです。モデル生成なら入力仕様・出力コード・比較条件、レイアウトなら対象回路・制約・検証結果が一緒に示されれば、工程としての実体を把握しやすくなります。

## PLLに使うなら何を確かめたいか

PLLのモデルを評価するなら、平均周波数が合うこと、ロック過程を再現すること、位相やjitterを扱えることは、それぞれ別の確認項目です。用途が起動シーケンスの検証なのか、制御ループの過渡応答なのかによっても、必要なモデルは変わります。

たとえば未知条件での適用範囲を見るには、モデル生成に使った条件と評価専用の条件を分け、電源や設定の変化、動作モードの切り替えなどに対する応答を確認したいところです。評価指標も、測定窓、比較基準、許容誤差を伴って初めてモデルを採用する判断に使えます。

今回の資料を組み合わせても、特定の顧客PLL、生成モデル、評価条件、結果を一組として追える公開事例には至っていません。したがって、ここで判断できるのは公開された手法や協働の範囲です。PLLモデルの精度や、そのモデルを使った検証の妥当性については、別途具体的な評価資料が必要です。

## まとめ

今回の資料で特徴的なのは、Broadcomでは採用要件、Micronでは共同開発中の工程、ADIでは外部platformと内製機能の分担という、異なる角度からAMSとの関係が見えることです。会社ごとに出典が述べる範囲を保つと、次に確かめたい工程も具体的になります。

モデル生成支援を検証へ取り込む際には、出力コードとともに、何を省略し、どの条件で比較し、どこまで使用を認めるかを管理する必要があります。この問題は、既存記事の[「回路を検証するためのRNMを、誰が検証するのか」](../rnm-model-validation/)ともつながります。

次に注目したいのは、対象回路、生成物、評価条件、結果がまとまって示される資料です。それが出れば、現在の方法の説明や工程単位の報告から、実際のモデルをどう評価して使うかへ議論を進められます。
