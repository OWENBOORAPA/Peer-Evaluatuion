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

const RED = "var(--color-text-danger)";
const RED_BG = "var(--color-background-danger)";
const RED_BORDER = "var(--color-border-danger)";

const BLUE = "var(--color-text-info)";
const BLUE_BG = "var(--color-background-info)";
const BLUE_BORDER = "var(--color-border-info)";

function AvatarCircle({ nick, size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: RED_BG, border: `1px solid ${RED_BORDER}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, color: RED, fontWeight: 500,
    }}>{nick[0]}</div>
  );
}

function ProgressBar({ current, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i < current ? BLUE : "var(--color-border-tertiary)",
          transition: "background 0.25s",
        }} />
      ))}
      <span style={{ fontSize: 12, color: "var(--color-text-secondary)", whiteSpace: "nowrap", marginLeft: 4 }}>
        {current} / {total}
      </span>
    </div>
  );
}

function ScoreBtn({ value, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 42, height: 42, borderRadius: "50%", cursor: "pointer",
      border: selected ? `2px solid ${BLUE}` : "0.5px solid var(--color-border-secondary)",
      background: selected ? BLUE : "var(--color-background-secondary)",
      color: selected ? "var(--color-background-primary)" : "var(--color-text-secondary)",
      fontSize: 15, fontWeight: selected ? 500 : 400,
      transform: selected ? "scale(1.12)" : "scale(1)",
      boxShadow: selected ? `0 0 0 3px ${BLUE_BG}` : "none",
      transition: "all 0.15s", flexShrink: 0,
    }}>{value}</button>
  );
}

function PrimaryBtn({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      flex: 2, padding: "10px 0", borderRadius: "var(--border-radius-md)",
      background: disabled ? "var(--color-background-secondary)" : RED,
      border: disabled ? "0.5px solid var(--color-border-secondary)" : "none",
      color: disabled ? "var(--color-text-secondary)" : "var(--color-background-primary)",
      fontSize: 14, fontWeight: 500, cursor: disabled ? "default" : "pointer",
      transition: "all 0.2s",
    }}>{children}</button>
  );
}

function GhostBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: "10px 0", borderRadius: "var(--border-radius-md)",
      background: "var(--color-background-secondary)",
      border: "0.5px solid var(--color-border-secondary)",
      color: "var(--color-text-secondary)", fontSize: 14, cursor: "pointer",
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
    window.storage.get("config:sheetsUrl").then(r => {
      if (r?.value) { setSheetsUrl(r.value); setSheetsInput(r.value); }
    }).catch(() => {});
  }, []);

  const saveSheetUrl = async () => {
    const url = sheetsInput.trim();
    await window.storage.set("config:sheetsUrl", url).catch(() => {});
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
      await window.storage.set(`eval:${groupKey}:${selfId}`, JSON.stringify(payload), true);
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
    <div style={{ padding: "1.5rem 0", maxWidth: 560 }}>
      {content}
    </div>
  );

  if (step === 1) return wrap(
    <>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 13, color: RED, fontWeight: 500, marginBottom: 2 }}>同伴互评表</p>
            <h2 style={{ fontSize: 20, fontWeight: 500, margin: 0, color: "var(--color-text-primary)" }}>
              แบบประเมิน Peer Group
            </h2>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 6 }}>
              เลือก Section/Group และชื่อของคุณ จากนั้นประเมินสมาชิกทุกคนในกลุ่ม
            </p>
          </div>
          <button onClick={() => setShowSettings(s => !s)} title="ตั้งค่า Google Sheets" style={{
            background: showSettings ? RED_BG : "var(--color-background-secondary)",
            border: showSettings ? `1px solid ${RED_BORDER}` : "0.5px solid var(--color-border-tertiary)",
            borderRadius: "var(--border-radius-md)", padding: "6px 10px", cursor: "pointer",
            fontSize: 13, color: showSettings ? RED : "var(--color-text-secondary)", flexShrink: 0, marginLeft: 12,
          }}>
            ⚙ Sheets
          </button>
        </div>
        {showSettings && (
          <div style={{
            marginTop: 12, padding: "14px 16px", borderRadius: "var(--border-radius-md)",
            border: `1px solid ${RED_BORDER}`, background: RED_BG,
          }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: RED, marginBottom: 8 }}>
              Google Apps Script URL
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text" value={sheetsInput}
                onChange={e => setSheetsInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/…/exec"
                style={{ flex: 1, fontSize: 12 }}
              />
              <button onClick={saveSheetUrl} style={{
                padding: "0 14px", borderRadius: "var(--border-radius-md)",
                background: sheetsSaved ? "var(--color-background-success)" : RED,
                border: "none", color: "var(--color-background-primary)",
                fontSize: 13, cursor: "pointer", whiteSpace: "nowrap",
              }}>
                {sheetsSaved ? "บันทึกแล้ว ✓" : "บันทึก"}
              </button>
            </div>
            {sheetsUrl
              ? <p style={{ fontSize: 11, color: RED, marginTop: 6 }}>เชื่อมต่อแล้ว — ข้อมูลจะส่งเข้า Google Sheet อัตโนมัติ</p>
              : <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 6 }}>ยังไม่ได้ตั้งค่า — ดูวิธีตั้งค่าด้านล่าง</p>
            }
          </div>
        )}
      </div>

      <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 6 }}>
        Section — Group
      </label>
      <select
        value={groupKey}
        onChange={e => { setGroupKey(e.target.value); setSelfId(""); }}
        style={{ width: "100%", marginBottom: 20 }}
      >
        <option value="">— กรุณาเลือก Section/Group —</option>
        {["1","2","3","4"].map(sec => (
          <optgroup key={sec} label={`Section ${sec}`}>
            {Object.entries(GROUPS)
              .filter(([k]) => k.startsWith(sec + "-"))
              .map(([k, g]) => <option key={k} value={k}>{g.label}</option>)}
          </optgroup>
        ))}
      </select>

      {groupKey && (
        <>
          <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 10 }}>
            คุณคือใคร? (ฉันคือ…)
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8, marginBottom: 24 }}>
            {GROUPS[groupKey].members.map(m => {
              const active = selfId === m.id;
              return (
                <div key={m.id} onClick={() => setSelfId(m.id)} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: "var(--border-radius-md)", cursor: "pointer",
                  border: active ? `1.5px solid ${RED}` : "0.5px solid var(--color-border-tertiary)",
                  background: active ? RED_BG : "var(--color-background-primary)",
                  transition: "all 0.15s",
                }}>
                  <AvatarCircle nick={m.nick} size={38} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)" }}>{m.nick}</div>
                    <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>
                      {m.name.replace(/^(Miss|Mr\.) /, "")}
                    </div>
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
          ประเมินสมาชิก <strong style={{ color: RED }}>{peerIdx + 1}</strong> / {peers.length} คน
        </span>
        <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{group?.label}</span>
      </div>
      <ProgressBar current={peerIdx + 1} total={peers.length} />

      <div style={{
        display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
        borderRadius: "var(--border-radius-lg)", marginBottom: 20,
        background: "var(--color-background-secondary)",
        border: "0.5px solid var(--color-border-tertiary)",
      }}>
        <AvatarCircle nick={currentPeer.nick} size={52} />
        <div>
          <div style={{ fontSize: 17, fontWeight: 500, color: "var(--color-text-primary)" }}>{currentPeer.nick}</div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>{currentPeer.name}</div>
          <div style={{ fontSize: 11, color: "var(--color-text-secondary)", opacity: 0.65 }}>{currentPeer.id}</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {QUESTIONS.map(q => {
          const answered = peerScores[q.id] != null;
          return (
            <div key={q.id} style={{
              padding: "12px 14px", borderRadius: "var(--border-radius-md)",
              border: answered
                ? `1px solid ${BLUE_BORDER}`
                : "0.5px solid var(--color-border-tertiary)",
              background: answered ? BLUE_BG : "var(--color-background-primary)",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
              transition: "all 0.2s",
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>
                  {q.id}. {q.zh}
                </div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 1 }}>{q.th}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2, 3].map(v => (
                  <ScoreBtn key={v} value={v}
                    selected={peerScores[q.id] === v}
                    onClick={() => setScore(currentPeer.id, q.id, v)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <GhostBtn onClick={() => peerIdx > 0 ? setPeerIdx(i => i - 1) : setStep(1)}>
          ← ย้อนกลับ
        </GhostBtn>
        <PrimaryBtn onClick={goNext} disabled={!allAnswered}>
          {peerIdx < peers.length - 1 ? "ถัดไป →" : "ตรวจสอบคำตอบ →"}
        </PrimaryBtn>
      </div>
    </>
  );

  if (step === 3) return wrap(
    <>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 2 }}>ตรวจสอบคะแนนก่อนส่ง</h2>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
          ผู้ประเมิน: {selfMember?.nick} · {selfMember?.name}
        </p>
      </div>

      <div style={{
        padding: "8px 14px", borderRadius: "var(--border-radius-md)", marginBottom: 14,
        background: "var(--color-background-secondary)",
        border: "0.5px solid var(--color-border-tertiary)",
        display: "grid", gridTemplateColumns: "1fr repeat(8, auto) auto",
        gap: "6px 10px", alignItems: "center",
        fontSize: 11, color: "var(--color-text-secondary)", fontWeight: 500,
      }}>
        <span>สมาชิก</span>
        {QUESTIONS.map(q => <span key={q.id} style={{ textAlign: "center" }}>{q.id}</span>)}
        <span style={{ textAlign: "right" }}>รวม</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
        {peers.map(peer => {
          const total = totalScore(peer.id);
          return (
            <div key={peer.id} style={{
              padding: "10px 14px", borderRadius: "var(--border-radius-md)",
              border: "0.5px solid var(--color-border-tertiary)",
              background: "var(--color-background-primary)",
              display: "grid", gridTemplateColumns: "1fr repeat(8, auto) auto",
              gap: "6px 10px", alignItems: "center",
            }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{peer.nick}</span>
                <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginLeft: 6 }}>
                  {peer.name.replace(/^(Miss|Mr\.) /, "")}
                </span>
              </div>
              {QUESTIONS.map(q => (
                <span key={q.id} style={{
                  fontSize: 13, textAlign: "center",
                  color: scores[peer.id]?.[q.id] ? "var(--color-text-primary)" : RED,
                  fontWeight: 500,
                }}>
                  {scores[peer.id]?.[q.id] || "—"}
                </span>
              ))}
              <span style={{ fontSize: 14, fontWeight: 500, color: RED, textAlign: "right" }}>
                {total}/{MAX}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <GhostBtn onClick={() => { setPeerIdx(peers.length - 1); setStep(2); }}>
          ← แก้ไข
        </GhostBtn>
        <PrimaryBtn onClick={handleSubmit} disabled={saving}>
          {saving ? "กำลังบันทึก..." : "ยืนยันและส่งคะแนน ✓"}
        </PrimaryBtn>
      </div>
    </>
  );

  if (step === 4) return wrap(
    <>
      <div style={{ textAlign: "center", padding: "16px 0 28px" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", margin: "0 auto 14px",
          background: RED_BG, border: `1px solid ${RED_BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, color: RED,
        }}>✓</div>
        <h2 style={{ fontSize: 19, fontWeight: 500, margin: "0 0 6px" }}>ส่งแบบประเมินเรียบร้อยแล้ว!</h2>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
          {selfMember?.nick} ({selfMember?.name}) · {group?.label}
        </p>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
          ประเมินสมาชิกทั้งหมด {peers.length} คนเรียบร้อย
        </p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 10, fontWeight: 500 }}>
          สรุปคะแนนที่ประเมิน
        </p>
        {peers.map(peer => {
          const total = totalScore(peer.id);
          const pct = Math.round((total / MAX) * 100);
          return (
            <div key={peer.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13 }}>
                  {peer.nick}
                  <span style={{ fontSize: 11, color: "var(--color-text-secondary)", marginLeft: 8 }}>
                    {peer.name.replace(/^(Miss|Mr\.) /, "")}
                  </span>
                </span>
                <span style={{ fontSize: 13, fontWeight: 500, color: RED }}>{total}/{MAX}</span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: "var(--color-border-tertiary)" }}>
                <div style={{
                  width: `${pct}%`, height: "100%", borderRadius: 3,
                  background: RED, transition: "width 0.4s",
                }} />
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
