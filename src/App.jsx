import { useState, useEffect } from "react";

const QUESTIONS = [
  { id:"Q1", zh:"专业知识", th:"ความรู้เชิงวิชาการ" },
  { id:"Q2", zh:"沟通能力", th:"ความสามารถด้านการสื่อสาร" },
  { id:"Q3", zh:"批判性思维", th:"การคิดเชิงวิพากษ์" },
  { id:"Q4", zh:"团队能力", th:"ความสามารถในการทำงานเป็นทีม" },
  { id:"Q5", zh:"技术能力", th:"ความสามารถด้านเทคโนโลยี" },
  { id:"Q6", zh:"公共意识", th:"จิตสาธารณะ" },
  { id:"Q7", zh:"责任心", th:"ความรับผิดชอบ" },
  { id:"Q8", zh:"准时", th:"ความตรงต่อเวลา" },
];

const MAX = QUESTIONS.length * 3;

const GROUPS = {
  "1-1":{ label:"Section 1 — Group 1", members:[
    {id:"6532404003",nick:"玛丽珍",name:"Miss Kamonsila Masai"},
    {id:"6532404012",nick:"王念珍",name:"Miss Jiraschaya Masantei"},
    {id:"6532404021",nick:"冰一",name:"Miss Thitiworada Tantisirisomboon"},
    {id:"6532404028",nick:"天雅丽",name:"Miss Natthaporn Sanguansin"},
  ]},
  "1-2":{ label:"Section 1 — Group 2", members:[
    {id:"6532404002",nick:"赵梦佳",name:"Miss Kotchawan Punyaburt"},
    {id:"6532404007",nick:"陈俊龙",name:"Mr. Kittiphong Norabut"},
    {id:"6532404015",nick:"李语桐",name:"Miss Chayanun Wongsinthon"},
    {id:"6532404024",nick:"苏芳爱",name:"Miss Natthanica Gadpasook"},
  ]},
  "1-3":{ label:"Section 1 — Group 3", members:[
    {id:"6532404004",nick:"林忆文",name:"Miss Kavisara Pavekornrakul"},
    {id:"6532404023",nick:"王艺菲",name:"Miss Natchon Bunsuwan"},
    {id:"6532404025",nick:"宁丽",name:"Miss Natthanan Nonaran"},
    {id:"6532404026",nick:"丁爱美",name:"Miss Nutthanicha Phasukphol"},
  ]},
  "1-4":{ label:"Section 1 — Group 4", members:[
    {id:"6532404014",nick:"文心",name:"Miss Jeerawan Lilititthanon"},
    {id:"6532404020",nick:"黄文金",name:"Miss Yanisa Promthong"},
    {id:"6532404029",nick:"楚天恒",name:"Mr. Nattawut Chooin"},
    {id:"6532404084",nick:"兰梦",name:"Miss Siriporn Auntalad"},
  ]},
  "1-5":{ label:"Section 1 — Group 5", members:[
    {id:"6532404006",nick:"吴静",name:"Miss Ginggaew Wachiranantakul"},
    {id:"6532404010",nick:"林阿妮",name:"Miss Khemika Kokklang"},
    {id:"6532404013",nick:"文吉乐",name:"Miss Jirathiwat Weerawat"},
    {id:"6532404016",nick:"许可馨",name:"Miss Chanita Detaudom"},
    {id:"6532404027",nick:"周贝贝",name:"Miss Natthida Thawarin"},
  ]},
  "1-6":{ label:"Section 1 — Group 6", members:[
    {id:"6532404005",nick:"叶未央",name:"Miss Kanyawee Boonseng"},
    {id:"6532404017",nick:"金铭",name:"Miss Chomphunut Chaokowitkun"},
    {id:"6532404018",nick:"谭舒窈",name:"Miss Chaleeta Tinoi"},
    {id:"6532404019",nick:"吴明兰",name:"Miss Yanapa Gogapun"},
    {id:"6532404030",nick:"方菲尽",name:"Miss Nutpada Prachumpan"},
  ]},
  "2-1":{ label:"Section 2 — Group 1", members:[
    {id:"6432404178",nick:"tai_le",name:"Mr. Nattawut Rengsomboonsuk"},
    {id:"6532404046",nick:"罗安琳",name:"Miss Patthamawadi Suchatwut"},
    {id:"6532404047",nick:"刘芳仙",name:"Miss Praphaphan Fesungnoen"},
    {id:"6532404060",nick:"王珊珊",name:"Miss Pornsuda Lannarong"},
    {id:"6532404067",nick:"罗文芳",name:"Miss Pattaraporn Panthurat"},
  ]},
  "2-2":{ label:"Section 2 — Group 2", members:[
    {id:"6532404036",nick:"李金财",name:"Mr. Thanachart Tongpord"},
    {id:"6532404040",nick:"林瑾萱",name:"Miss Naphason Chuisakun"},
    {id:"6532404054",nick:"顾思思",name:"Miss Punchaya Saengsutthiset"},
    {id:"6532404056",nick:"吴美冰",name:"Miss Pornchanok Napajaras"},
    {id:"6532404059",nick:"花林月",name:"Miss Pornsawan Pumketkeaw"},
  ]},
  "2-3":{ label:"Section 2 — Group 3", members:[
    {id:"6432404167",nick:"陈冰洁",name:"Miss Sangdaw Wirakiatkhackon"},
    {id:"6532404033",nick:"林梦洁",name:"Miss Tatsakamon Thammasin"},
    {id:"6532404037",nick:"张宝拉",name:"Miss Thanyapron Rueangsom"},
    {id:"6532404039",nick:"赵雪珍",name:"Miss Thanpitcha Saenai"},
    {id:"6532404043",nick:"林星星",name:"Miss Niyada Dittapipatkun"},
  ]},
  "2-4":{ label:"Section 2 — Group 4", members:[
    {id:"6432404010",nick:"邓储丞",name:"Miss Keetakan Tejasao"},
    {id:"6432404035",nick:"蓝天",name:"Miss Nongnapas Rattanapapanun"},
    {id:"6532404031",nick:"蓝路冰",name:"Miss Nayranchaya Rattanatharakul"},
    {id:"6532404038",nick:"谭梅雅",name:"Miss Tanyarak Ketkaew"},
    {id:"6532404041",nick:"梅宁丽",name:"Miss Narisara Saseesang"},
  ]},
  "2-5":{ label:"Section 2 — Group 5", members:[
    {id:"6532404045",nick:"宋丹丹",name:"Miss Butsakorn Suemdon"},
    {id:"6532404048",nick:"丁小爱",name:"Miss Pranpriya Tintechat"},
    {id:"6532404049",nick:"莲花",name:"Miss Priyaphat Paripunyo"},
    {id:"6532404052",nick:"王映月",name:"Miss Panatthita Duangsaphon"},
    {id:"6532404064",nick:"赵翌",name:"Miss Petcharat Ratanakunakorn"},
  ]},
  "2-6":{ label:"Section 2 — Group 6", members:[
    {id:"6532404034",nick:"胡茗洁",name:"Miss Tichakorn Promjit"},
    {id:"6532404051",nick:"邓依一",name:"Miss Pantita Deemak"},
    {id:"6532404058",nick:"白安",name:"Miss Phornwaleenan Chanthaphum"},
    {id:"6532404061",nick:"侯栗",name:"Miss Pichayapron Tiprat"},
    {id:"6532404063",nick:"孔元宝",name:"Mr. Petch Kongsawatsrisuk"},
  ]},
  "3-1":{ label:"Section 3 — Group 1", members:[
    {id:"6532404081",nick:"李佳琳",name:"Miss Sasipa Phatjathak"},
    {id:"6532404099",nick:"陈静雅",name:"Miss Sunita Suwannakan"},
    {id:"6532404100",nick:"韩诗荣",name:"Miss Suphichaya Chonchoptham"},
    {id:"6532404105",nick:"子美",name:"Miss Onpreeya Yangyen"},
    {id:"6532404107",nick:"张清兰",name:"Miss Arisa Jainanta"},
  ]},
  "3-2":{ label:"Section 3 — Group 2", members:[
    {id:"6432404025",nick:"王文俊",name:"Mr. Natdanai Saewa"},
    {id:"6432404176",nick:"刘欣萍",name:"Miss Chutipa Thepha"},
    {id:"6532404070",nick:"刘伟",name:"Mr. Phanuwat Damrat"},
    {id:"6532404079",nick:"从甜静",name:"Miss Srisakul Yangklang"},
    {id:"6532404096",nick:"丽婷",name:"Miss Sudarat Matiwong"},
  ]},
  "3-3":{ label:"Section 3 — Group 3", members:[
    {id:"6532404077",nick:"小苹果",name:"Mr. Watcharine Sonsueb"},
    {id:"6532404090",nick:"吴益玲",name:"Miss Salinee Phupom"},
    {id:"6532404102",nick:"阮梅",name:"Mr. Anuphong Keinsau"},
    {id:"6532404103",nick:"刘小妍",name:"Miss Apinda Khanthaniyom"},
    {id:"6532404106",nick:"奕辰",name:"Mr. Aritouch Jansa"},
  ]},
  "3-4":{ label:"Section 3 — Group 4", members:[
    {id:"6432404177",nick:"尹杰",name:"Mr. Naphat Pongsaparn"},
    {id:"6532404068",nick:"王新心",name:"Miss Pattaraphon Pudchim"},
    {id:"6532404089",nick:"郑艺惟",name:"Miss Satinee Phungmai"},
    {id:"6532404115",nick:"宋建豪",name:"Mr. ANode Jadee"},
    {id:"6532404134",nick:"刘英雄",name:"Mr. Ratchapon Tardsri"},
  ]},
  "3-5":{ label:"Section 3 — Group 5", members:[
    {id:"6532404062",nick:"杨玲菲",name:"Miss Peerada Yingcharoensomsuk"},
    {id:"6532404065",nick:"朱雪茹",name:"Miss Pornpansiri Junnual"},
    {id:"6532404069",nick:"许柳金",name:"Miss Pattariya Kowthaworn"},
    {id:"6532404076",nick:"林沛雅",name:"Miss Warathaya Kanha"},
    {id:"6532404097",nick:"张星月",name:"Miss Sutthikan Butdama"},
  ]},
  "3-6":{ label:"Section 3 — Group 6", members:[
    {id:"6532404083",nick:"张美丽",name:"Miss Siriporn Payee"},
    {id:"6532404085",nick:"宋飞",name:"Miss Sirilak Samitwong"},
    {id:"6532404091",nick:"马薇",name:"Miss Sidaphon Phusaeng"},
    {id:"6532404094",nick:"刘芳怡",name:"Miss Sirilak Yothakunsiri"},
    {id:"6532404108",nick:"李圆圆",name:"Miss Angkana Pornittiphol"},
  ]},
  "4-1":{ label:"Section 4 — Group 1", members:[
    {id:"6532404121",nick:"李美林",name:"Miss Yanapha Khongnoum"},
    {id:"6532404126",nick:"董娜娜",name:"Miss Nathnare Thongvijit"},
    {id:"6532404138",nick:"郑诗懿",name:"Miss Sornwanee Yodsarn"},
    {id:"6532404143",nick:"彭雅",name:"Miss Atitaya Poonkwan"},
  ]},
  "4-2":{ label:"Section 4 — Group 2", members:[
    {id:"6432404180",nick:"王小红",name:"Miss Nang Mo Mo Kham Leik"},
    {id:"6532404101",nick:"珍妮",name:"Miss Suphattinee Chidkrua"},
    {id:"6532404114",nick:"吴迪娜",name:"Miss Inthira Nukuea"},
    {id:"6532404122",nick:"苏晴珊",name:"Miss Thitakorn Seedee"},
    {id:"6532404144",nick:"易安宁",name:"Miss Aornjira Sirijaroen"},
  ]},
  "4-3":{ label:"Section 4 — Group 3", members:[
    {id:"6532404119",nick:"宋娟笛",name:"Miss Jantima Chonsongkram"},
    {id:"6532404120",nick:"迎春",name:"Miss Jutharat Poonsri"},
    {id:"6532404129",nick:"彭怡莎",name:"Miss Phojphijcha Phongnoree"},
    {id:"6532404141",nick:"文惠",name:"Miss Siriyakorn Pothi"},
    {id:"6532404145",nick:"叶好",name:"Miss Orawan Suksiri"},
  ]},
  "4-4":{ label:"Section 4 — Group 4", members:[
    {id:"6532404111",nick:"林叶子",name:"Miss Arthittaya Srinithi"},
    {id:"6532404127",nick:"廖炫玉",name:"Miss Papichaya Riawsanguanwong"},
    {id:"6532404128",nick:"李思彤",name:"Miss Paweechart Pitikawinsin"},
    {id:"6532404132",nick:"林明",name:"Miss Patteera Saelim"},
    {id:"6532404136",nick:"何聪慧",name:"Miss Witchayada Nuchnual"},
  ]},
  "4-5":{ label:"Section 4 — Group 5", members:[
    {id:"6432404090",nick:"林念真",name:"Miss Kingdao Inpa"},
    {id:"6432404104",nick:"朱婷婷",name:"Miss Nutcha Ngamnikunchalin"},
    {id:"6432404141",nick:"王碧雁",name:"Miss Pattarawan Choedchom"},
    {id:"6532404124",nick:"王娇晶",name:"Miss Nutnaree Chimsutthiwan"},
    {id:"6532404148",nick:"金慧书",name:"Miss Narattayaporn Temchitt"},
  ]},
  "4-6":{ label:"Section 4 — Group 6", members:[
    {id:"6532404112",nick:"吕达",name:"Miss Arrinya Chaiphom"},
    {id:"6532404113",nick:"李苏苏",name:"Mr. Itthimon Sangkaew"},
    {id:"6532404118",nick:"李安琪",name:"Miss Kasinee Commoonsrie"},
    {id:"6532404123",nick:"杨珍梦",name:"Miss Napatr Lerdpreecha"},
    {id:"6532404139",nick:"诸思杰",name:"Mr. Siriphat Dechkajonpit"},
  ]},
};

const C = {
  red: "#c0392b", redBg: "#fdf2f2", redBorder: "#f5c6c6",
  blue: "#2563eb", blueBg: "#eff6ff", blueBorder: "#bfdbfe",
  bg: "#f8f9fa", card: "#ffffff", border: "#e5e7eb",
  text: "#111827", textSub: "#6b7280", textHint: "#9ca3af",
  s1: "#f59e0b", s1Bg: "#fffbeb", s1Border: "#fde68a",
  s2: "#3b82f6", s2Bg: "#eff6ff", s2Border: "#bfdbfe",
  s3: "#10b981", s3Bg: "#ecfdf5", s3Border: "#6ee7b7",
  green: "#059669",
};

const SCORE_COLOR = { 1: C.s1, 2: C.s2, 3: C.s3 };
const SCORE_BG = { 1: C.s1Bg, 2: C.s2Bg, 3: C.s3Bg };
const SCORE_BORDER = { 1: C.s1Border, 2: C.s2Border, 3: C.s3Border };
const SCORE_LABEL = { 1: "พอใช้", 2: "ดี", 3: "ดีมาก" };

function AvatarCircle({ nick, size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: C.redBg, border: `2px solid ${C.redBorder}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, color: C.red, fontWeight: 700,
    }}>{nick[0]}</div>
  );
}

function ProgressBar({ current, total }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 6, borderRadius: 3,
            background: i < current ? C.blue : C.border,
            transition: "background 0.25s",
          }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: C.textSub }}>ความคืบหน้า</span>
        <span style={{ fontSize: 12, color: C.blue, fontWeight: 600 }}>{current} / {total} คน</span>
      </div>
    </div>
  );
}

function ScoreBtn({ value, selected, onClick }) {
  const col = SCORE_COLOR[value];
  const bg = SCORE_BG[value];
  const border = SCORE_BORDER[value];
  return (
    <button onClick={onClick} style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 2,
      width: 56, height: 56, borderRadius: 12, cursor: "pointer",
      border: selected ? `2px solid ${col}` : `1.5px solid ${C.border}`,
      background: selected ? bg : "#fff",
      color: selected ? col : C.textHint,
      fontSize: 18, fontWeight: 700,
      transform: selected ? "scale(1.08)" : "scale(1)",
      boxShadow: selected ? `0 0 0 3px ${bg}` : "none",
      transition: "all 0.15s", flexShrink: 0,
    }}>
      <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 9, fontWeight: 500, opacity: selected ? 1 : 0 }}>{SCORE_LABEL[value]}</span>
    </button>
  );
}

function PrimaryBtn({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      flex: 2, padding: "12px 0", borderRadius: 10,
      background: disabled ? C.border : C.red,
      border: "none",
      color: disabled ? C.textHint : "#fff",
      fontSize: 15, fontWeight: 600, cursor: disabled ? "default" : "pointer",
      transition: "all 0.2s",
      boxShadow: disabled ? "none" : "0 2px 8px rgba(192,57,43,0.25)",
    }}>{children}</button>
  );
}

function GhostBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: "12px 0", borderRadius: 10,
      background: "#fff", border: `1.5px solid ${C.border}`,
      color: C.textSub, fontSize: 14, fontWeight: 500, cursor: "pointer",
    }}>{children}</button>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [groupKey, setGroupKey] = useState("");
  const [selfId, setSelfId] = useState("");
  const [peerIdx, setPeerIdx] = useState(0);
  const [scores, setScores] = useState({});
  const [saving, setSaving] = useState(false);
  const DEFAULT_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzLTGBteILKKLZgr91HNbtMhCC7sAWnZjDQmPVyc9FSVWUKcyU-o6ha35jD2cXLjZkXKA/exec";
  const [sheetsUrl, setSheetsUrl] = useState(DEFAULT_SHEETS_URL);
  const [sheetsInput, setSheetsInput] = useState(DEFAULT_SHEETS_URL);
  const [showSettings, setShowSettings] = useState(false);
  const [sheetsSaved, setSheetsSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("config:sheetsUrl");
      if (saved) { setSheetsUrl(saved); setSheetsInput(saved); }
    } catch(e) {}
  }, []);

  const saveSheetUrl = () => {
    const url = sheetsInput.trim();
    try { localStorage.setItem("config:sheetsUrl", url); } catch(e) {}
    setSheetsUrl(url);
    setSheetsSaved(true);
    setTimeout(() => setSheetsSaved(false), 2000);
  };

  const group = GROUPS[groupKey];
  const peers = group ? group.members.filter(m => m.id !== selfId) : [];
  const selfMember = group?.members.find(m => m.id === selfId);
  const currentPeer = peers[peerIdx];
  const peerScores = currentPeer ? (scores[currentPeer.id] || {}) : {};
  const allAnswered = QUESTIONS.every(q => peerScores[q.id] != null);

  const setScore = (pid, qid, v) =>
    setScores(s => ({ ...s, [pid]: { ...(s[pid] || {}), [qid]: v } }));

  const totalScore = id =>
    QUESTIONS.reduce((sum, q) => sum + (scores[id]?.[q.id] || 0), 0);

  const goNext = () => {
    if (peerIdx < peers.length - 1) setPeerIdx(i => i + 1);
    else setStep(3);
  };

  const handleSubmit = async () => {
    setSaving(true);
    const evaluateeNames = {};
    peers.forEach(p => { evaluateeNames[p.id] = p.name; });
    const payload = {
      evaluatorId: selfId,
      evaluatorName: selfMember?.name,
      groupKey,
      groupLabel: group?.label,
      scores,
      evaluateeNames,
      submittedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(`eval:${groupKey}:${selfId}`, JSON.stringify(payload));
    } catch (e) { console.error(e); }
    if (sheetsUrl) {
      try {
        await fetch(sheetsUrl, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      } catch (e) { console.error("Sheets error:", e); }
    }
    setSaving(false);
    setStep(4);
  };

  const resetAll = () => {
    setStep(1); setGroupKey(""); setSelfId(""); setPeerIdx(0); setScores({});
  };

  const wrap = (content) => (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "0 0 40px" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px" }}>
        {content}
      </div>
    </div>
  );

  if (step === 1) return wrap(
    <>
      <div style={{
        background: C.red, padding: "24px 20px 20px", margin: "0 -16px 24px",
        borderRadius: "0 0 20px 20px",
      }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginBottom: 4, letterSpacing: 1 }}>同伴互评表</p>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#fff" }}>
          แบบประเมิน Peer Group
        </h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 6 }}>
          เลือก Section/Group และชื่อของคุณ จากนั้นประเมินสมาชิกทุกคนในกลุ่ม
        </p>
        <button onClick={() => setShowSettings(s => !s)} style={{
          marginTop: 10, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: 8, padding: "5px 12px", cursor: "pointer",
          fontSize: 12, color: "#fff",
        }}>
          ⚙ ตั้งค่า Google Sheets {sheetsUrl ? "✓" : ""}
        </button>
        {showSettings && (
          <div style={{ marginTop: 12, padding: "12px", borderRadius: 10, background: "rgba(255,255,255,0.15)" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 8 }}>Google Apps Script URL</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="text" value={sheetsInput} onChange={e => setSheetsInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/…/exec"
                style={{ flex: 1, fontSize: 12, borderRadius: 8, border: "none", padding: "6px 10px" }} />
              <button onClick={saveSheetUrl} style={{
                padding: "0 14px", borderRadius: 8, background: sheetsSaved ? C.green : "#fff",
                border: "none", color: sheetsSaved ? "#fff" : C.red,
                fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
              }}>
                {sheetsSaved ? "✓ บันทึก" : "บันทึก"}
              </button>
            </div>
          </div>
        )}
      </div>

      <label style={{ fontSize: 13, color: C.textSub, display: "block", marginBottom: 6, fontWeight: 500 }}>
        Section — Group
      </label>
      <select value={groupKey} onChange={e => { setGroupKey(e.target.value); setSelfId(""); }}
        style={{ width: "100%", marginBottom: 20, padding: "10px 12px", borderRadius: 10,
          border: `1.5px solid ${C.border}`, fontSize: 14, background: "#fff", color: C.text }}>
        <option value="">— กรุณาเลือก Section/Group —</option>
        {["1","2","3","4"].map(sec => (
          <optgroup key={sec} label={`Section ${sec}`}>
            {Object.entries(GROUPS).filter(([k]) => k.startsWith(sec + "-"))
              .map(([k, g]) => <option key={k} value={k}>{g.label}</option>)}
          </optgroup>
        ))}
      </select>

      {groupKey && (
        <>
          <label style={{ fontSize: 13, color: C.textSub, display: "block", marginBottom: 10, fontWeight: 500 }}>
            คุณคือใคร? (ฉันคือ…)
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8, marginBottom: 24 }}>
            {GROUPS[groupKey].members.map(m => {
              const active = selfId === m.id;
              return (
                <div key={m.id} onClick={() => setSelfId(m.id)} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 12, cursor: "pointer",
                  border: active ? `2px solid ${C.red}` : `1.5px solid ${C.border}`,
                  background: active ? C.redBg : "#fff",
                  boxShadow: active ? `0 0 0 3px ${C.redBg}` : "none",
                  transition: "all 0.15s",
                }}>
                  <AvatarCircle nick={m.nick} size={38} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{m.nick}</div>
                    <div style={{ fontSize: 11, color: C.textSub }}>{m.name.replace(/^(Miss|Mr\.) /, "")}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {selfId && (
            <PrimaryBtn onClick={() => { setPeerIdx(0); setStep(2); }}>
              เริ่มประเมินเพื่อน ({peers.length} คน) →
            </PrimaryBtn>
          )}
        </>
      )}
    </>
  );

  if (step === 2 && currentPeer) return wrap(
    <>
      <div style={{ padding: "20px 0 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: C.textSub }}>
            ประเมินสมาชิก <strong style={{ color: C.blue }}>{peerIdx + 1}</strong> / {peers.length} คน
          </span>
          <span style={{ fontSize: 11, color: C.textHint, background: C.border, borderRadius: 6, padding: "2px 8px" }}>{group?.label}</span>
        </div>
        <ProgressBar current={peerIdx + 1} total={peers.length} />
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 14, padding: "16px",
        borderRadius: 16, marginBottom: 16,
        background: "#fff", border: `1.5px solid ${C.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        <AvatarCircle nick={currentPeer.nick} size={52} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{currentPeer.nick}</div>
          <div style={{ fontSize: 13, color: C.textSub }}>{currentPeer.name}</div>
          <div style={{ fontSize: 11, color: C.textHint }}>{currentPeer.id}</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.blue }}>
            {QUESTIONS.filter(q => peerScores[q.id] != null).length}
          </div>
          <div style={{ fontSize: 10, color: C.textHint }}>/{QUESTIONS.length} ข้อ</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {QUESTIONS.map(q => {
          const answered = peerScores[q.id] != null;
          const sel = peerScores[q.id];
          return (
            <div key={q.id} style={{
              padding: "12px 14px", borderRadius: 12,
              border: answered ? `1.5px solid ${SCORE_BORDER[sel]}` : `1.5px solid ${C.border}`,
              background: answered ? SCORE_BG[sel] : "#fff",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
              transition: "all 0.2s", boxShadow: answered ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{q.id}. {q.zh}</div>
                <div style={{ fontSize: 12, color: C.textSub, marginTop: 1 }}>{q.th}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3].map(v => (
                  <ScoreBtn key={v} value={v} selected={peerScores[q.id] === v}
                    onClick={() => setScore(currentPeer.id, q.id, v)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <GhostBtn onClick={() => peerIdx > 0 ? setPeerIdx(i => i - 1) : setStep(1)}>← ย้อนกลับ</GhostBtn>
        <PrimaryBtn onClick={goNext} disabled={!allAnswered}>
          {peerIdx < peers.length - 1 ? "ถัดไป →" : "ตรวจสอบคำตอบ →"}
        </PrimaryBtn>
      </div>
    </>
  );

  if (step === 3) return wrap(
    <>
      <div style={{ padding: "20px 0 16px" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: C.text }}>ตรวจสอบคะแนนก่อนส่ง</h2>
        <p style={{ fontSize: 13, color: C.textSub }}>ผู้ประเมิน: {selfMember?.nick} · {selfMember?.name}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {peers.map(peer => {
          const total = totalScore(peer.id);
          const pct = Math.round((total / MAX) * 100);
          return (
            <div key={peer.id} style={{
              padding: "14px 16px", borderRadius: 14,
              border: `1.5px solid ${C.border}`, background: "#fff",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <AvatarCircle nick={peer.nick} size={36} />
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{peer.nick}</span>
                    <div style={{ fontSize: 11, color: C.textSub }}>{peer.name.replace(/^(Miss|Mr\.) /, "")}</div>
                  </div>
                </div>
                <span style={{ fontSize: 18, fontWeight: 700, color: C.red }}>{total}<span style={{ fontSize: 12, color: C.textHint }}>/{MAX}</span></span>
              </div>
              <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                {QUESTIONS.map(q => {
                  const v = scores[peer.id]?.[q.id];
                  return (
                    <div key={q.id} style={{
                      flex: 1, textAlign: "center", padding: "4px 2px", borderRadius: 6,
                      background: v ? SCORE_BG[v] : C.bg,
                      border: `1px solid ${v ? SCORE_BORDER[v] : C.border}`,
                    }}>
                      <div style={{ fontSize: 9, color: C.textHint }}>{q.id}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: v ? SCORE_COLOR[v] : C.textHint }}>{v || "—"}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ height: 6, borderRadius: 3, background: C.bg }}>
                <div style={{ width: `${pct}%`, height: "100%", borderRadius: 3, background: C.red, transition: "width 0.4s" }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <GhostBtn onClick={() => { setPeerIdx(peers.length - 1); setStep(2); }}>← แก้ไข</GhostBtn>
        <PrimaryBtn onClick={handleSubmit} disabled={saving}>
          {saving ? "กำลังบันทึก..." : "ยืนยันและส่งคะแนน ✓"}
        </PrimaryBtn>
      </div>
    </>
  );

  if (step === 4) return wrap(
    <>
      <div style={{ textAlign: "center", padding: "40px 0 28px" }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%", margin: "0 auto 16px",
          background: "#ecfdf5", border: `2px solid ${C.green}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, color: C.green,
        }}>✓</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px", color: C.text }}>ส่งแบบประเมินเรียบร้อย!</h2>
        <p style={{ fontSize: 14, color: C.textSub }}>{selfMember?.nick} · {group?.label}</p>
        <p style={{ fontSize: 13, color: C.textHint }}>ประเมินสมาชิกทั้งหมด {peers.length} คนเรียบร้อย</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        {peers.map(peer => {
          const total = totalScore(peer.id);
          const pct = Math.round((total / MAX) * 100);
          return (
            <div key={peer.id} style={{ marginBottom: 12, padding: "12px 14px", borderRadius: 12, background: "#fff", border: `1.5px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{peer.nick}
                  <span style={{ fontSize: 11, color: C.textSub, marginLeft: 8 }}>{peer.name.replace(/^(Miss|Mr\.) /, "")}</span>
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.green }}>{total}/{MAX}</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: C.bg }}>
                <div style={{ width: `${pct}%`, height: "100%", borderRadius: 4, background: C.green, transition: "width 0.4s" }} />
              </div>
            </div>
          );
        })}
      </div>

      <GhostBtn onClick={resetAll}>ประเมินใหม่ (คนถัดไป)</GhostBtn>
    </>
  );

  return null;
}
