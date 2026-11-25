const params = new URLSearchParams(location.search);
const type = params.get("type") || "all";
const QUESTION_LIMIT = 50;

const quizInfo = {
  "kaijiDairishi": {
    "title": "海事代理士",
    "desc": "海事法令、船舶登記、海技資格、手続実務の基礎"
  },
  "kaigishi": {
    "title": "海技士",
    "desc": "船舶運航、航海、機関、法規、安全管理の基礎"
  },
  "kaihoSchool": {
    "title": "海上保安学校採用試験対策",
    "desc": "海上保安、基礎能力、判断推理、法令、安全の基礎"
  },
  "airTrafficController": {
    "title": "航空管制官採用試験",
    "desc": "航空管制、空域、英語、判断推理、安全管理の基礎"
  },
  "jieikanCandidate": {
    "title": "自衛官候補生試験",
    "desc": "国語、数学、社会、時事、服務、安全の基礎"
  },
  "weatherForecaster": {
    "title": "気象予報士",
    "desc": "気象学、天気図、予報業務、気象法規、防災の基礎"
  },
  "clinicalLabTech": {
    "title": "臨床検査技師",
    "desc": "検体検査、生理検査、微生物、血液、病理、医療安全"
  },
  "radiologicalTech": {
    "title": "診療放射線技師",
    "desc": "放射線物理、撮影技術、画像診断、放射線防護、医療安全"
  },
  "clinicalEngineer": {
    "title": "臨床工学技士",
    "desc": "医療機器、人工呼吸、血液浄化、循環、電気電子、医療安全"
  },
  "judoTherapist": {
    "title": "柔道整復師",
    "desc": "解剖、生理、整復、固定、関係法規、安全管理"
  },
  "hariShi": {
    "title": "はり師",
    "desc": "東洋医学、経穴、鍼施術、衛生、関係法規、安全管理"
  },
  "kyuShi": {
    "title": "きゅう師",
    "desc": "東洋医学、灸施術、経穴、衛生、関係法規、安全管理"
  },
  "anmaMassageShiatsu": {
    "title": "あん摩マッサージ指圧師",
    "desc": "解剖、生理、手技、東洋医学、衛生、関係法規"
  },
  "biotopeManager": {
    "title": "ビオトープ管理士",
    "desc": "生物多様性、外来種対策、水辺環境、モニタリング"
  },
  "forestInstructor": {
    "title": "森林インストラクター",
    "desc": "森林生態系、里山管理、自然案内、環境教育"
  },
  "greenAdvisor": {
    "title": "グリーンアドバイザー",
    "desc": "園芸、植物管理、用土、肥料、病害虫防除"
  },
  "japaneseAgriculturalTech": {
    "title": "日本農業技術検定",
    "desc": "作物、野菜、果樹、畜産、農業機械、農薬安全"
  },
  "jumokui": {
    "title": "樹木医",
    "desc": "樹木診断、腐朽、根系、土壌、剪定、病害虫管理"
  },
  "soilDoctor": {
    "title": "土壌医検定",
    "desc": "土壌pH、CEC、団粒構造、有機物、窒素循環"
  },
  "ajestheEsthetician": {
    "title": "AJESTHE認定エステティシャン",
    "desc": "皮膚科学、フェイシャル、ボディ、衛生、カウンセリング"
  },
  "aromaInstructor": {
    "title": "アロマテラピーインストラクター",
    "desc": "精油学、解剖生理、健康学、安全管理、教育法"
  },
  "aromaTest": {
    "title": "アロマテラピー検定",
    "desc": "精油、芳香浴、キャリアオイル、安全性、抽出法"
  },
  "barber": {
    "title": "理容師",
    "desc": "理容師法、顔そり、消毒、頭皮ケア、シェービング"
  },
  "beautician": {
    "title": "美容師",
    "desc": "美容師法、消毒、毛髪、シャンプー、カット、カラー"
  },
  "jnaGelNail": {
    "title": "JNAジェルネイル技能検定",
    "desc": "ジェルネイル、プレパレーション、硬化、衛生、オフ"
  },
  "makeupTech": {
    "title": "メイクアップ技術検定",
    "desc": "ベースメイク、ファンデーション、アイメイク、眉、チーク"
  },
  "nailist": {
    "title": "ネイリスト技能検定",
    "desc": "ネイルケア、ファイリング、カラーリング、衛生、リペア"
  },
  "personalColor": {
    "title": "パーソナルカラー実務検定",
    "desc": "色相、明度、彩度、清濁、4シーズン、診断"
  },
  "reflexologist": {
    "title": "リフレクソロジスト",
    "desc": "反射区、足浴、足部観察、禁忌、圧のかけ方、衛生"
  }
  ,"angerManagement": {
    "title": "アンガーマネジメントファシリテーター",
    "desc": "怒りの仕組み、感情コントロール、支援倫理、安全管理、記録"
  },
  "careerConsultant": {
    "title": "キャリアコンサルタント",
    "desc": "キャリア支援、相談技法、職業理解、倫理、個人情報保護"
  },
  "certifiedPsychologist": {
    "title": "公認心理師",
    "desc": "心理支援、アセスメント、倫理、多職種連携、安全管理"
  },
  "clinicalPsychologist": {
    "title": "臨床心理士",
    "desc": "心理面接、心理査定、臨床倫理、支援計画、連携"
  },
  "healthExerciseInstructor": {
    "title": "健康運動指導士",
    "desc": "運動指導、健康評価、リスク管理、生活習慣病予防"
  },
  "healthExercisePractitioner": {
    "title": "健康運動実践指導者",
    "desc": "運動実践、体力測定、安全管理、指導計画、記録"
  },
  "industrialCounselor": {
    "title": "産業カウンセラー",
    "desc": "職場メンタルヘルス、傾聴、倫理、支援連携、記録"
  },
  "jatiAti": {
    "title": "JATI認定トレーニング指導者",
    "desc": "トレーニング理論、指導計画、安全管理、評価"
  },
  "mentalPsychology": {
    "title": "心理・カウンセリング",
    "desc": "心理支援の基本、面接、倫理、記録、専門機関連携"
  },
  "mentalPsychologyCounselor": {
    "title": "メンタル心理カウンセラー",
    "desc": "カウンセリング基礎、心理理解、同意、記録、安全管理"
  },
  "nestaPft": {
    "title": "NESTA-PFT",
    "desc": "パーソナルトレーニング、評価、指導、安全管理、倫理"
  },
  "nscaCpt": {
    "title": "NSCA-CPT",
    "desc": "運動科学、トレーニング指導、評価、リスク管理"
  },
  "pilatesInstructor": {
    "title": "ピラティスインストラクター",
    "desc": "姿勢、呼吸、体幹、指導計画、安全管理、禁忌"
  },
  "sportsFoodAdvisor": {
    "title": "スポーツフードアドバイザー",
    "desc": "栄養、食事計画、スポーツ現場、説明責任、安全管理"
  },
  "yogaInstructor": {
    "title": "ヨガインストラクター",
    "desc": "ヨガ指導、呼吸法、ポーズ、安全管理、個別配慮"
  },
  "machining": {
    "title": "機械加工技能士",
    "desc": "旋盤加工、フライス加工、NC、切削条件、測定、安全作業"
  },
  "heatTreatment": {
    "title": "金属熱処理技能士",
    "desc": "焼入れ、焼戻し、焼なまし、浸炭、窒化、硬さ試験"
  },
  "weldingEngineer": {
    "title": "溶接管理技術者",
    "desc": "アーク溶接、TIG、溶接欠陥、施工要領、予熱、安全衛生"
  },
  "ndtTechnician": {
    "title": "非破壊試験技術者",
    "desc": "放射線透過、超音波探傷、磁粉、浸透、判定、記録管理"
  },
  "qualityManager": {
    "title": "品質管理責任者",
    "desc": "QC七つ道具、工程能力、管理図、標準化、不適合管理、監査"
  }
  ,"ikebanaKadoshihan": {
    "title": "華道家元資格",
    "desc": "花材の特徴、季節感、構成、作法、華道文化の基礎"
  },
  "ikebanaKadoshihan": {
    "title": "華道家元資格",
    "desc": "華道の基礎知識、実務、用語、いけばな文化の基礎"
  },
  "teaCulture": {
    "title": "茶道文化検定",
    "desc": "茶の湯の歴史、茶道具、作法、茶室、茶道文化の基礎"
  },
  "kitsukeGinoushi": {
    "title": "着付け技能士",
    "desc": "着物、帯、小物、体型補整、礼装、着付け実務の基礎"
  },
  "shodoShihan": {
    "title": "書道師範",
    "desc": "筆法、字形、臨書、書体、作品指導、書道文化の基礎"
  },
  "washokuLeader": {
    "title": "和食文化継承リーダー",
    "desc": "和食文化、行事食、だし、郷土料理、食育、継承活動の基礎"
  },
  "jewelryCoordinator": {
    "title": "ジュエリーコーディネーター",
    "desc": "宝石、貴金属、品質表示、接客、販売提案、商品知識の基礎"
  },
  "bridalCoordinate": {
    "title": "ブライダルコーディネート技能検定",
    "desc": "婚礼準備、衣装、進行、接遇、会場運営、関連知識の基礎"
  },
  "flowerDecoration": {
    "title": "フラワー装飾技能士",
    "desc": "花材、装飾技法、会場装花、管理、デザイン、安全衛生の基礎"
  },
  "flowerDesigner": {
    "title": "フラワーデザイナー資格",
    "desc": "花材、色彩、構成、作品制作、デザイン、実務提案の基礎"
  },
  "funeralDirector": {
    "title": "葬祭ディレクター技能審査",
    "desc": "葬儀進行、接遇、儀礼、宗教知識、会場運営、安全管理の基礎"
  }


};

// 問題データが存在するカテゴリだけを表示する
Object.keys(quizInfo).forEach(key => {
  if (!Array.isArray(window.quizData?.[key])) delete quizInfo[key];
});


const pageTitle = document.getElementById("pageTitle");
const pageDesc = document.getElementById("pageDesc");
const quizList = document.getElementById("quizList");

if (type === "all") {
  document.title = "資格クイズ総合サイト";
  pageTitle.textContent = "資格クイズ総合サイト";
  pageDesc.textContent = `${Object.keys(quizInfo).length}カテゴリ・各180問から50問ランダムで出題`;
} else {
  const info = quizInfo[type] || quizInfo[Object.keys(quizInfo)[0]];
  document.title = info.title;
  pageTitle.textContent = info.title;
  pageDesc.textContent = info.desc;
}

quizList.innerHTML = `
  <a href="index.html" class="${type === "all" ? "active" : ""}">全カテゴリ50問</a>
  ${Object.keys(quizInfo).map(key => `
    <a href="?type=${key}" class="${type === key ? "active" : ""}">${quizInfo[key].title}</a>
  `).join("")}
`;

function normalizeQuestion(q){
  return {
    question: q.question || q.q,
    choices: q.choices || q.c,
    answer: q.answer || q.a,
    explanation: q.explanation || q.e || ""
  };
}

function shuffle(array){
  return array.map(v => [Math.random(), v]).sort((a,b) => a[0] - b[0]).map(v => v[1]);
}

function uniqueByQuestion(array){
  const seen = new Set();
  return array.filter(q => {
    const key = (q.question || q.q || "").trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

let questions = [];

if (type === "all") {
  Object.keys(quizInfo).forEach(key => {
    if (window.quizData && Array.isArray(window.quizData[key])) {
      questions.push(...window.quizData[key].map(normalizeQuestion));
    }
  });
} else {
  questions = window.quizData?.[type] ? window.quizData[type].map(normalizeQuestion) : [];
}

questions = shuffle(uniqueByQuestion(questions)).slice(0, QUESTION_LIMIT);

let currentIndex = 0;
let score = 0;
let answered = false;

const counter = document.getElementById("counter");
const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");

function showQuestion() {
  answered = false;
  resultEl.textContent = "";
  nextBtn.style.display = "none";

  if (questions.length === 0) {
    questionEl.textContent = "問題データが読み込めませんでした";
    choicesEl.innerHTML = "";
    counter.textContent = "0 / 0";
    scoreEl.textContent = "スコア: 0";
    progressBar.style.width = "0%";
    return;
  }

  if (currentIndex >= questions.length) {
    questionEl.textContent = "終了！";
    choicesEl.innerHTML = "";
    counter.textContent = `${questions.length} / ${questions.length}`;
    scoreEl.textContent = `スコア: ${score}`;
    resultEl.textContent = `${questions.length}問中 ${score}問正解`;
    progressBar.style.width = "100%";
    return;
  }

  const q = questions[currentIndex];
  counter.textContent = `${currentIndex + 1} / ${questions.length}`;
  scoreEl.textContent = `スコア: ${score}`;
  questionEl.textContent = q.question;
  progressBar.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  choicesEl.innerHTML = "";

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => {
      if (answered) return;
      answered = true;

      if (choice === q.answer) {
        score++;
        resultEl.textContent = "正解！";
        btn.classList.add("correct");
      } else {
        resultEl.textContent = `不正解。正解は「${q.answer}」`;
        btn.classList.add("wrong");
      }

      [...choicesEl.children].forEach(b => {
        b.disabled = true;
        if (b.textContent === q.answer) b.classList.add("correct");
      });

      if (q.explanation) resultEl.textContent += ` ${q.explanation}`;
      scoreEl.textContent = `スコア: ${score}`;
      setTimeout(() => {
        currentIndex++;
        showQuestion();
      }, 900);
    };
    choicesEl.appendChild(btn);
  });
}

nextBtn.onclick = () => {
  currentIndex++;
  showQuestion();
};

showQuestion();
