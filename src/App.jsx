import { useMemo, useState, useEffect } from "react";
import React from "react";
import "./App.css";

// --- Extracted Data ---
const PROGRAM_CODES = [
  "CAMU110", "CAMU111", "CAMU220", "CAMU221", "CAMU222", "CAMU223", "CAMU230", 
  "CAMU777", "CAMU778", "CAMU790", "MU110", "MU111", "MU220", "MU221", "MU222", 
  "MU223", "MU230", "MU778", "MU790"
];

const DEPARTMENTS = [
  "MU110", "MU111", "MU220/ MU230", "MU221", "MU222", "MU223", 
  "CAMU777", "CAMU778", "CAMU790"
];

const POSITION_OPTIONS = [
  "Lecturer", "Senior Lecturer", "Assoc. Professor", 
  "Professor", "Dean", "Deputy Dean", "Head of Program"
];

const LOGIN_ROLE_OPTIONS = [
  { key: "admin", label: "Admin" },
  { key: "coordinator", label: "Program Coordinator" },
  { key: "guest", label: "Guest" },
];

const rawCourses = [
  "CTU101 - FUNDAMENTALS OF ISLAM", "CTU152 - VALUES AND CIVILIZATION", "CTU282 - ARTS AND CREATIVITY IN ISLAM",
  "CTU552 - PHILOSOPHY AND CURRENT ISSUES", "CTU554 - PENGHAYATAN ETIKA & PERADABAN", "ENT311 - ESSENTIALS OF ENTREPRENEURSHIP",
  "ENT530 - PRINCIPLES OF ENTREPRENEURSHIP", "LCC121 - ENGLISH FOR LANGUAGE COMPETENCE I", "LCC122 - ENGLISH FOR LANGUAGE COMPETENCE II",
  "LCC123 - ENGLISH FOR LANGUAGE COMPETENCE III", "LCC400 - ENGLISH FOR INFORMATIVE SPEECHES", "LCC402 - ENGLISH FOR ORAL REPORTING",
  "LCC500 - ENGLISH FOR WORKPLACE COMMUNICATION", "MUB234 - MUSIC INDUSTRY MANAGEMENT", "MUC252 - BASIC ARRANGING",
  "MUC400 - ELEMENTARY MUSIC ARRANGING", "MUD100 - INSTRUMENTAL PRACTICE I", "MUD111 - MUSIC THEORY AND APPLICATION I",
  "MUD112 - AURAL THEORY AND APPLICATION I", "MUD150 - INSTRUMENTAL PRACTICE II", "MUD151 - KEYBOARD PROFICIENCY II",
  "MUD200 - INSTRUMENTAL PRATICE III", "MUD203 - MUSIC TECHNOLOGY", "MUD250 - INSTRUMENTAL PRACTICE IV",
  "MUD252 - FUNDAMENTAL OF COMPOSITION", "MUD300 - DIPLOMA RECITAL", "MUE232 - FUNDAMENTAL OF MUSIC EDUCATION",
  "MUF105 - MALAYSIAN MUSIC I", "MUF106 - WESTERN ART MUSIC I", "MUF110 - LARGE ENSEMBLE I", "MUF155 - MALAYSIAN MUSIC II",
  "MUF156 - WESTERN ART MUSIC II", "MUF160 - LARGE ENSEMBLE II", "MUF161 - MUSIC THEORY AND APPLICATION II",
  "MUF162 - AURAL THEORY AND APPPLICATION II", "MUF205 - MALAYSIAN MUSIC III", "MUF206 - WORLD MUSIC HISTORY",
  "MUF210 - LARGE ENSEMBLE III", "MUF260 - LARGE ENSEMBLE IV", "MUF308 - INTRO TO HARMONY", "MUF310 - LARGE ENSEMBLE V",
  "MUF402 - AURAL TRAINING I", "MUF404 - THEORY OF MUSIC I", "MUF405 - WESTERN ARTS MUSIC HISTORY", "MUF408 - MALAYSIAN TRADITIONAL MUSIC I",
  "MUF452 - AURAL TRAINING II", "MUF455 - WORLD MUSIC HISTORY", "MUF458 - MALAYSIAN TRADITIONAL MUSIC II", "MUF502 - AURAL TRAINING III",
  "MUF504 - THEORY OF MUSIC III", "MUF555 - RESEARCH METHODOLOGY", "MUP251 - BASIC IMPROVISION", "MUP311 - JAZZ & FUSION ENSEMBLE",
  "MUP312 - POP & ROCK ENSEMBLE", "MUP314 - PERCUSSION ENSEMBLE", "MUP315 - TRADITIONAL ENSEMBLE", "MUP316 - CONTEMPORARY TRADITIONAL ENSEMBLE",
  "MUP317 - VOICE ENSEMBLE", "MUT254 - INTRODUCTION TO AUDIO AND MUSIC PRODUCTION", "TMC401 - BAHASA KETIGA I",
  "TMC451 - BAHASA KETIGA II", "TMC501 - BAHASA KETIGA III", "UMU102 - FUNDAMENTAL OF MUSIC"
];

const rawGroups = [
  "CAMU1101A", "CAMU1101B", "CAMU1101C", "CAMU1101D", "CAMU1101E", "CAMU1102A", "CAMU1102B", "CAMU1102C", "CAMU1102D", "CAMU1102E",
  "CAMU1103A", "CAMU1103B", "CAMU1103C", "CAMU1103D", "CAMU1103E", "CAMU1104A", "CAMU1104B", "CAMU1104C", "CAMU1104D", "CAMU1104E",
  "CAMU1105A", "CAMU1105B", "CAMU1105C", "CAMU1105D", "CAMU1105E", "CAMU221SEM1", "CAMU221SEM1N", "CAMU221SEM2", "CAMU221SEM2N",
  "CAMU221SEM3", "CAMU221SEM3N", "CAMU221SEM4", "CAMU221SEM4N", "CAMU221SEM5", "CAMU221SEM5N", "CAMU221SEM6", "CAMU221SEM6N",
  "CAMU222SEM1", "CAMU222SEM2", "CAMU222SEM3", "CAMU222SEM4", "CAMU222SEM5", "CAMU222SEM6", "CAMU222SEM7", "CAMU223SEM4",
  "CAMU230SEM1", "CAMU230SEM2", "CAMU230SEM3", "CAMU230SEM4", "CAMU230SEM5", "CAMU230SEM6", "CAMU230SEM7", "MU1101A", "MU1101B",
  "MU1101C", "MU1101D", "MU1101E", "MU1102A", "MU1102B", "MU1102C", "MU1102D", "MU1102E", "MU1103A", "MU1103B", "MU1103C",
  "MU1103D", "MU1103E", "MU1104A", "MU1104B", "MU1104C", "MU1104D", "MU1104E", "MU1105A", "MU1105B", "MU1105C", "MU1105D",
  "MU1105E", "MU1112A", "MU221SEM1", "MU221SEM1N", "MU221SEM2", "MU221SEM2N", "MU221SEM3", "MU221SEM3N", "MU221SEM4", "MU221SEM4N",
  "MU221SEM5", "MU221SEM5N", "MU221SEM6", "MU221SEM6N", "MU222SEM1", "MU222SEM10", "MU222SEM2", "MU222SEM3", "MU222SEM4", "MU222SEM5",
  "MU222SEM6", "MU222SEM7", "MU223SEM2", "MU223SEM4", "MU230SEM1", "MU230SEM2", "MU230SEM3", "MU230SEM4", "MU230SEM5", "MU230SEM6", "MU230SEM7"
];

const rawLecturers = [
  "Adee Arifin", "Ahmad Munir bin Mahzair", "Ahmad Rithaudin Md Noor (PM. Dr.)", "Ainolnaim bin Azizol (Dr.)", "Alia Farahin Abd Wahab (Dr.)",
  "Amanina Alwani Badaruddin", "Azli Mohd Taslim", "Caryn Ong Wen Bin (Dr.)", "Chaing Yi Ling", "Chong Yew Yoong (PM Dr.)",
  "Dayang Siti Hazar (Dr.)", "Eddy Lim You Cheng", "Faezah Hamdan", "Firdaus Zainal", "Janette Jannah Poheng", "Juriani Jamaludin (Dr.)",
  "Juwairiyah bt Zakaria", "Ken Hor", "Khairul Anwar Tony", "Khairul Hazwan Bin Musa", "Khairunnisa Diyana Md Noor", "Khatriza Ahmad Saffian (Dr.)",
  "Maryann Magdalena Linnis", "Md Jais Ismail (PM Dr.)", "Mohamad Ridza Mubarak", "Mohd Adam Masumi", "Mohd Kamrulbahri Hussin",
  "Mohd Razli Bin Zulkafli", "Mohd Shafic Aminuddin", "Mohd Yusri bin Hamid", "Muhamad Faiz Rushli@Rosli", "Mustafa Fuzer Nawi (Datuk)",
  "Nadia Widyawati Madzhi (Dr.)", "Nur Idayu Roslan (Dr.)", "Nur Izzati Jamalludin (Dr.)", "Nurulhamimi Abdul Rahman (Dr.)", "Phang Kong Chien (Dr.)",
  "Raja Mohamad Alif Raja Mohamad Adnan (YM)", "Rayner Naili", "Rita Mardhatillah Umar Rauf", "Rizal Ezuan Zulkifly Tony", "Ruviyamin Ruslan",
  "Sarah Alia Ahmad Jamal", "Shahanum Mohd Shah (Prof Dr.)", "Shahwalnaz Hussin", "Sharifah Faizah Syed Mohammed (PM. Dr.)",
  "Siti Hajar Mohamad Seperah (Dr.)", "Siti Nur Hajarul Aswad bt Shakeeb Arsalaan Bajunid", "Tazul Izan Tajuddin (Prof. Dr.)", "Thompson Yunga",
  "Yap Eng Sim", "Yeoh Pei Ann (Dr.)", "Yuri Edris", "Zailan Razak", "Zamzahardi", "Afiqah Aisyah Saiful Bahar", "Helmi bin Rosli",
  "Valerie Ross Nee Colleen Oh Seo Bin (PM Dr.)"
];

function getDeptFromGroup(g) {
  if (g.includes("110")) return "MU110";
  if (g.includes("111")) return "MU111";
  if (g.includes("230") || g.includes("220")) return "MU220/ MU230";
  if (g.includes("221")) return "MU221";
  if (g.includes("222")) return "MU222";
  if (g.includes("223")) return "MU223";
  if (g.includes("777")) return "CAMU777";
  if (g.includes("778")) return "CAMU778";
  if (g.includes("790")) return "CAMU790";
  return "";
}

function extractSemester(g) {
  const semMatch = g.match(/SEM(\d+)/i);
  if (semMatch) return semMatch[1];
  const digitMatch = g.match(/(\d)[A-Za-z]*$/);
  if (digitMatch) return digitMatch[1];
  return "-";
}

// Pre-fill robust data for testing
const INITIAL_COURSES = rawCourses.map((c, i) => {
  const [code, ...nameParts] = c.split(" - ");
  // Prefill a program randomly based on index
  return { id: `crs-${i+1}`, code: code.trim(), name: nameParts.join(" - ").trim(), programs: [PROGRAM_CODES[i % PROGRAM_CODES.length]] };
});

const INITIAL_GROUPS = rawGroups.map((g, i) => ({
  // Prefill student count
  id: `grp-${i+1}`, department: getDeptFromGroup(g), groupName: g, studentCount: 15 + (i % 15)
}));

const INITIAL_LECTURERS = rawLecturers.map((name, i) => {
  let depts = [DEPARTMENTS[i % DEPARTMENTS.length]];
  let ats = [];
  
  // Create mock data scenarios
  if (i === 0) { // Adee Arifin: Overload (>18)
    ats = [{ id: "ats-test-1", courseCodes: ["CTU101", "MUB234"], courseNames: ["FUNDAMENTALS OF ISLAM", "MUSIC INDUSTRY MANAGEMENT"], programs: ["MU110"], groups: ["CAMU1101A"], contactHours: 8, ks: 8, k1Supervision: 4, k2Research: 4, k3Service: 5, notes: "", remarks: "" }];
  } else if (i === 1) { // Ahmad Munir: Underload (<16 but >0)
    ats = [{ id: "ats-test-2", courseCodes: ["CTU152"], courseNames: ["VALUES AND CIVILIZATION"], programs: ["MU111"], groups: ["CAMU1101B"], contactHours: 4, ks: 4, k1Supervision: 2, k2Research: 2, k3Service: 2, notes: "", remarks: "" }];
  } else if (i === 2) { // Ahmad Rithaudin: Normal (16-18)
    ats = [{ id: "ats-test-3", courseCodes: ["ENT311"], courseNames: ["ESSENTIALS OF ENTREPRENEURSHIP"], programs: ["MU220"], groups: ["CAMU1102A"], contactHours: 8, ks: 8, k1Supervision: 4, k2Research: 3, k3Service: 1, notes: "", remarks: "" }];
  } else if (i === 3) { // Ainolnaim: Normal, but shares ENT311 (Creating an Over-assigned Course)
    ats = [{ id: "ats-test-4", courseCodes: ["ENT311"], courseNames: ["ESSENTIALS OF ENTREPRENEURSHIP"], programs: ["MU220"], groups: ["CAMU1102B"], contactHours: 8, ks: 8, k1Supervision: 4, k2Research: 3, k3Service: 1, notes: "", remarks: "" }];
  }
  // i === 4 (Alia Farahin) will have no ATS (No ATS scenario)
  // Many courses will have 0 lecturers (Unassigned scenario)

  return { id: `lec-${i+1}`, name, departments: depts, minATS: 16, maxATS: 18, position: "Lecturer", additionalInfo: "", remarks: "", atsEntries: ats };
});

const INITIAL_USERS = {
  admin: [{ id: "u-1", username: "admin1", password: "111" }],
  coordinator: [{ id: "u-2", username: "user1", password: "111" }],
  guest: [{ id: "u-3", username: "guest1", password: "111" }],
};

function getAtsTotal(lecturer) {
  if (!lecturer || !lecturer.atsEntries) return 0;
  return lecturer.atsEntries.reduce((sum, entry) => sum + Number(entry.ks || 0) + Number(entry.k1Supervision || 0) + Number(entry.k2Research || 0) + Number(entry.k3Service || 0), 0);
}

function createBlankAtsEntry() {
  return { id: `ats-${Date.now()}`, courseCodes: [], courseNames: [], programs: [], groups: [], contactHours: 0, ks: 0, k1Supervision: 0, k2Research: 0, k3Service: 0, notes: "", remarks: "" };
}

// --- Custom UI Components ---
function AutocompleteMultiSelect({ options = [], selected = [], onChange, placeholder }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const safeSelected = Array.isArray(selected) ? selected : [];
  const filteredOptions = (options || []).filter(opt => 
    opt && opt.toLowerCase().includes((query || "").toLowerCase()) && !safeSelected.includes(opt)
  );

  const handleSelect = (val) => { onChange([...safeSelected, val]); setQuery(""); setIsOpen(false); };
  const handleRemove = (val) => { onChange(safeSelected.filter(item => item !== val)); };

  return (
    <div className="autocomplete-container">
      <div className="autocomplete-input-box" onClick={() => setIsOpen(true)}>
        {safeSelected.map(s => (
          <span key={s} className="chip">{s} <button type="button" onClick={(e) => { e.stopPropagation(); handleRemove(s); }}>&times;</button></span>
        ))}
        <input value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setIsOpen(true)} onBlur={() => setTimeout(() => setIsOpen(false), 200)} placeholder={safeSelected.length === 0 ? placeholder : ""} className="autocomplete-input" />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {filteredOptions.map(opt => (
            <li key={opt} onMouseDown={(e) => { e.preventDefault(); handleSelect(opt); }}>{opt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AutocompleteSingleSelect({ options = [], selected, onChange, placeholder, onClear }) {
  const [query, setQuery] = useState(selected || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setQuery(selected || ""); }, [selected]);

  const filteredOptions = (options || []).filter(opt => opt && opt.toLowerCase().includes((query || "").toLowerCase()));

  const handleSelect = (val) => { onChange(val); setQuery(val); setIsOpen(false); };
  
  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
    setQuery("");
    if(onClear) onClear();
  }

  return (
    <div className="autocomplete-container">
      <div className="autocomplete-input-box single">
        <input value={query} onChange={e => { setQuery(e.target.value); if(!isOpen) setIsOpen(true); onChange(""); }} onFocus={() => setIsOpen(true)} onBlur={() => setTimeout(() => setIsOpen(false), 200)} placeholder={placeholder} className="autocomplete-input" />
        {selected && <button type="button" className="clear-btn" onClick={handleClear}>&times;</button>}
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {filteredOptions.map(opt => <li key={opt} onMouseDown={(e) => { e.preventDefault(); handleSelect(opt); }}>{opt}</li>)}
        </ul>
      )}
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [devPassword, setDevPassword] = useState("openlah231787"); // Secret Dev Login
  const [lecturers, setLecturers] = useState(INITIAL_LECTURERS);
  const [coursesList, setCoursesList] = useState(INITIAL_COURSES);
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [programsList, setProgramsList] = useState(PROGRAM_CODES);
  
  // Archiving & Logging
  const [archives, setArchives] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  const [globalInfo, setGlobalInfo] = useState({ faculty: "Faculty of Music", semester: "Semester 2026/2", mode: "Draft" });

  const [screen, setScreen] = useState("login");
  const [selectedLoginRole, setSelectedLoginRole] = useState("admin");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLecturerId, setSelectedLecturerId] = useState(null);
  const [groupFilterDept, setGroupFilterDept] = useState("All");
  const [settingsTab, setSettingsTab] = useState("general");
  
  const [isOtherCoursesOpen, setIsOtherCoursesOpen] = useState(false);
  const [isAddAtsModalOpen, setIsAddAtsModalOpen] = useState(false);
  const [newAtsDraft, setNewAtsDraft] = useState(createBlankAtsEntry());

  // Search States for Settings
  const [lecSearchName, setLecSearchName] = useState("");
  const [lecSearchDept, setLecSearchDept] = useState("");
  const [expandedLecturerId, setExpandedLecturerId] = useState(null);
  
  // Dashboard expanded states
  const [expandedCourseCode, setExpandedCourseCode] = useState(null);

  const [setSearchProgram, setSetSearchProgram] = useState("");
  const [setSearchCourse, setSetSearchCourse] = useState("");
  const [setFilterCourseDept, setSetFilterCourseDept] = useState("All");
  const [setSearchGroup, setSetSearchGroup] = useState("");
  const [setFilterGroupDept, setSetFilterGroupDept] = useState("All");
  const [setSearchLecturer, setSetSearchLecturer] = useState("");
  const [setFilterLecturerDept, setSetFilterLecturerDept] = useState("All");

  // Draft States
  const [lecturerDraft, setLecturerDraft] = useState(null);
  const [courseDraft, setCourseDraft] = useState(null);
  const [programDraft, setProgramDraft] = useState(null); 
  const [groupDraft, setGroupDraft] = useState(null); 
  const [userDraft, setUserDraft] = useState(null);

  // Confirm Modal State
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: "", message: "", onConfirm: null });

  const isAdminOrDev = currentUser?.role === "admin" || currentUser?.role === "developer";
  const isReadOnly = globalInfo.mode === "Completed" && !isAdminOrDev;

  const filteredLecturers = useMemo(() => {
    return lecturers.filter(l => selectedDepartment === "All Departments" || (l.departments || []).includes(selectedDepartment));
  }, [lecturers, selectedDepartment]);

  const selectedLecturer = lecturers.find(l => l.id === selectedLecturerId) || null;

  // --- Core Utility Functions ---
  function confirmAction(title, message, onConfirm) {
    setConfirmConfig({ isOpen: true, title, message, onConfirm: () => { onConfirm(); setConfirmConfig({...confirmConfig, isOpen: false}); } });
  }

  function handleLogin(e) {
    e.preventDefault(); setLoginError("");
    
    // Stealth Dev Login
    if (loginPassword === devPassword) { 
      setCurrentUser({ role: "developer", displayName: "Developer", id: "developer" }); 
      setScreen("dashboard"); 
      return; 
    }
    
    const matchedUser = (users[selectedLoginRole] || []).find(u => u.username === loginUsername && u.password === loginPassword);
    if (!matchedUser) { setLoginError("Invalid username or password."); return; }
    
    setCurrentUser({ role: selectedLoginRole, displayName: selectedLoginRole, id: matchedUser.username }); 
    setScreen("dashboard");
  }

  function logActivity(actionDesc, undoData) {
    // Developers operate completely off the books
    if (currentUser?.role === "developer") return;

    const timestamp = new Date().toLocaleString();
    const logEntry = { 
      id: `log-${Date.now()}`, 
      timestamp, 
      user: currentUser?.id || "System", 
      action: actionDesc,
      undoData
    };
    setActivityLogs(prev => [logEntry, ...prev]);
  }

  function undoToLog(logToRestore) {
    confirmAction("Undo Action", `Undo: "${logToRestore.action}"?`, () => {
      const undo = logToRestore.undoData;
      if (!undo) return; // Legacy safety

      // Target-specific state reversal
      if (undo.target === 'lecturers') {
        if(undo.prev) setLecturers(prev => prev.find(l => l.id === undo.id) ? prev.map(l => l.id === undo.id ? undo.prev : l) : [...prev, undo.prev]);
        else setLecturers(prev => prev.filter(l => l.id !== undo.id));
      } else if (undo.target === 'courses') {
        if(undo.prev) setCoursesList(prev => prev.find(c => c.id === undo.id) ? prev.map(c => c.id === undo.id ? undo.prev : c) : [...prev, undo.prev]);
        else setCoursesList(prev => prev.filter(c => c.id !== undo.id));
      } else if (undo.target === 'groups') {
        if(undo.prev) setGroups(prev => prev.find(g => g.id === undo.id) ? prev.map(g => g.id === undo.id ? undo.prev : g) : [...prev, undo.prev]);
        else setGroups(prev => prev.filter(g => g.id !== undo.id));
      } else if (undo.target === 'programs') {
        setProgramsList(prev => prev.map(p => p === undo.newName ? undo.oldName : p));
      } else if (undo.target === 'programs_add') {
        setProgramsList(prev => prev.filter(p => p !== undo.name));
      } else if (undo.target === 'programs_delete') {
        setProgramsList(prev => [...prev, undo.name]);
      } else if (undo.target === 'users') {
        if(undo.prev) setUsers(prev => ({ ...prev, [undo.role]: prev[undo.role].find(u => u.id === undo.id) ? prev[undo.role].map(u => u.id === undo.id ? undo.prev : u) : [...prev[undo.role], undo.prev] }));
        else setUsers(prev => ({ ...prev, [undo.role]: prev[undo.role].filter(u => u.id !== undo.id) }));
      }

      // Remove just this specific log
      setActivityLogs(prev => prev.filter(l => l.id !== logToRestore.id));
    });
  }

  // --- Linking Course Code & Name in ATS Modal ---
  function handleAtsCourseCodesChange(val) {
    const matchedNames = [];
    val.forEach(code => {
      const c = coursesList.find(course => course.code === code);
      if (c && !matchedNames.includes(c.name)) matchedNames.push(c.name);
    });
    setNewAtsDraft({ ...newAtsDraft, courseCodes: val, courseNames: matchedNames });
  }

  function handleAtsCourseNamesChange(val) {
    const matchedCodes = [];
    val.forEach(name => {
      const c = coursesList.find(course => course.name === name);
      if (c && !matchedCodes.includes(c.code)) matchedCodes.push(c.code);
    });
    setNewAtsDraft({ ...newAtsDraft, courseNames: val, courseCodes: matchedCodes });
  }

  function openEditAtsEntry(entry) {
    setNewAtsDraft(entry);
    setIsAddAtsModalOpen(true);
  }

  function saveAtsEntry() {
    const prevLecturer = lecturers.find(l => l.id === selectedLecturerId);
    logActivity(`Updated ATS Entry for ${selectedLecturer?.name}`, { target: 'lecturers', id: selectedLecturerId, prev: prevLecturer });
    setLecturers(prev => prev.map(l => {
      if (l.id === selectedLecturerId) {
        const exists = l.atsEntries.find(e => e.id === newAtsDraft.id);
        if (exists) return { ...l, atsEntries: l.atsEntries.map(e => e.id === newAtsDraft.id ? newAtsDraft : e) };
        return { ...l, atsEntries: [...(l.atsEntries || []), newAtsDraft] };
      }
      return l;
    }));
    setIsAddAtsModalOpen(false); setNewAtsDraft(createBlankAtsEntry());
  }

  function deleteAtsEntry(entryId) {
    confirmAction("Delete ATS Entry", "Are you sure you want to remove this course assignment?", () => {
      const prevLecturer = lecturers.find(l => l.id === selectedLecturerId);
      logActivity(`Deleted an ATS Entry for ${selectedLecturer?.name}`, { target: 'lecturers', id: selectedLecturerId, prev: prevLecturer });
      setLecturers(prev => prev.map(l => {
        if (l.id === selectedLecturerId) return { ...l, atsEntries: l.atsEntries.filter(e => e.id !== entryId) };
        return l;
      }));
    });
  }

  function getGroupDisplay(groupName) {
    if (!groupName) return "-";
    const groupObj = groups.find(g => g.groupName === groupName);
    return groupObj ? `${groupName} (${groupObj.studentCount || 0})` : groupName;
  }

  // --- Setting Handlers ---
  function openEditLecturer(lecturer) { setLecturerDraft(lecturer ? {...lecturer} : { id: `lec-${Date.now()}`, name: "", departments: [], minATS: 16, maxATS: 18, position: "Lecturer", additionalInfo: "", remarks: "", atsEntries: [] }); }
  function saveLecturer() {
    const prevObj = lecturers.find(l => l.id === lecturerDraft.id) || null;
    logActivity(`Saved Lecturer: ${lecturerDraft.name}`, { target: 'lecturers', id: lecturerDraft.id, prev: prevObj });
    setLecturers(prev => prev.find(l => l.id === lecturerDraft.id) ? prev.map(l => l.id === lecturerDraft.id ? lecturerDraft : l) : [...prev, lecturerDraft]);
    setLecturerDraft(null);
  }
  function deleteLecturer(id) { 
    confirmAction("Delete Lecturer", "Are you sure? This will remove all their ATS records.", () => {
      const deletedObj = lecturers.find(l => l.id === id);
      logActivity(`Deleted Lecturer: ${deletedObj?.name}`, { target: 'lecturers', id, prev: deletedObj });
      setLecturers(prev => prev.filter(l => l.id !== id))
    }); 
  }

  function openEditCourse(course) { setCourseDraft(course ? {...course} : { id: `crs-${Date.now()}`, code: "", name: "", programs: [] }); }
  function saveCourse() {
    const prevObj = coursesList.find(c => c.id === courseDraft.id) || null;
    logActivity(`Saved Course: ${courseDraft.code}`, { target: 'courses', id: courseDraft.id, prev: prevObj });
    setCoursesList(prev => prev.find(c => c.id === courseDraft.id) ? prev.map(c => c.id === courseDraft.id ? courseDraft : c) : [...prev, courseDraft]);
    setCourseDraft(null);
  }
  function deleteCourse(id) { confirmAction("Delete Course", "Are you sure you want to delete this course?", () => { 
    const deletedObj = coursesList.find(c => c.id === id);
    logActivity(`Deleted Course: ${deletedObj?.code}`, { target: 'courses', id, prev: deletedObj }); 
    setCoursesList(prev => prev.filter(c => c.id !== id)); 
  }); }

  function saveProgram() {
    if(!programDraft.newName) return;
    logActivity(`Renamed Program: ${programDraft.oldName} to ${programDraft.newName}`, { target: 'programs', oldName: programDraft.oldName, newName: programDraft.newName });
    setProgramsList(prev => prev.map(p => p === programDraft.oldName ? programDraft.newName : p));
    setProgramDraft(null);
  }
  function deleteProgram(prog) { confirmAction("Delete Program", `Delete ${prog}?`, () => { 
    logActivity(`Deleted Program: ${prog}`, { target: 'programs_delete', name: prog }); 
    setProgramsList(prev => prev.filter(p => p !== prog)); 
  }); }

  function openEditGroup(group) { setGroupDraft(group ? {...group} : { id: `grp-${Date.now()}`, department: programsList[0] || "", groupName: "", studentCount: 0 }); }
  function saveGroup() {
    const prevObj = groups.find(g => g.id === groupDraft.id) || null;
    logActivity(`Saved Group: ${groupDraft.groupName}`, { target: 'groups', id: groupDraft.id, prev: prevObj });
    setGroups(prev => prev.find(g => g.id === groupDraft.id) ? prev.map(g => g.id === groupDraft.id ? groupDraft : g) : [...prev, groupDraft]);
    setGroupDraft(null);
  }
  function deleteGroup(id) { confirmAction("Delete Group", "Remove this group?", () => { 
    const deletedObj = groups.find(g => g.id === id);
    logActivity(`Deleted Group: ${deletedObj?.groupName}`, { target: 'groups', id, prev: deletedObj }); 
    setGroups(prev => prev.filter(g => g.id !== id)); 
  }); }

  function openEditUser(role, user) {
    setUserDraft(user ? {...user, role} : { id: `u-${Date.now()}`, username: "", password: "", role: role || "coordinator" });
  }
  function saveUser() {
    const prevObj = (users[userDraft.role]||[]).find(u => u.id === userDraft.id) || null;
    logActivity(`Saved User: ${userDraft.username}`, { target: 'users', role: userDraft.role, id: userDraft.id, prev: prevObj });
    setUsers(prev => {
      const newUsers = { ...prev };
      const roleArr = newUsers[userDraft.role] || [];
      if (roleArr.find(u => u.id === userDraft.id)) newUsers[userDraft.role] = roleArr.map(u => u.id === userDraft.id ? userDraft : u);
      else newUsers[userDraft.role] = [...roleArr, userDraft];
      return newUsers;
    });
    setUserDraft(null);
  }
  function deleteUser(role, id) {
    confirmAction("Delete User", "Remove this user access?", () => {
      const deletedObj = users[role].find(u => u.id === id);
      logActivity(`Deleted User ID: ${id}`, { target: 'users', role, id, prev: deletedObj });
      setUsers(prev => ({ ...prev, [role]: prev[role].filter(u => u.id !== id) }));
    });
  }

  function archiveSemester() {
    confirmAction("Archive Semester", `Archive all current data as ${globalInfo.semester}?`, () => {
      const snapshot = {
        id: `arch-${Date.now()}`,
        dateArchived: new Date().toLocaleString(),
        semester: globalInfo.semester,
        data: { lecturers, coursesList, groups, programsList }
      };
      setArchives(prev => [snapshot, ...prev]);
      logActivity(`Archived Semester: ${globalInfo.semester}`, null);
    });
  }

  function loadArchive(arch) {
    confirmAction("Load Archive", `Load data from ${arch.semester}? Current unsaved changes will be overridden.`, () => {
      logActivity(`Loaded Archive: ${arch.semester}`, null); // Cannot targeted undo a full snapshot load
      setLecturers(arch.data.lecturers);
      setCoursesList(arch.data.coursesList);
      setGroups(arch.data.groups);
      setProgramsList(arch.data.programsList);
      setGlobalInfo(prev => ({...prev, semester: arch.semester}));
    });
  }

  function deleteArchive(id) {
    confirmAction("Delete Archive", "Are you sure? This cannot be undone.", () => {
      setArchives(prev => prev.filter(a => a.id !== id));
      logActivity(`Deleted Archive ID: ${id}`, null);
    })
  }

  // --- Data Crunching for Dashboards ---
  const lecturersStatus = lecturers.map(l => {
    const total = getAtsTotal(l);
    let status = "Normal";
    if (total === 0) status = "No ATS"; else if (total > l.maxATS) status = "Overload"; else if (total < l.minATS) status = "Underload";
    return { ...l, total, status };
  }).filter(l => l.status !== "Normal");
  
  const courseUsage = coursesList.map(c => {
     const assignedLecturers = lecturers.filter(l => l.atsEntries.some(e => (e.courseCodes || []).includes(c.code)));
     return { ...c, assignedLecturers };
  });
  
  const unassignedCourses = courseUsage.filter(c => c.assignedLecturers.length === 0);
  const overAssignedCourses = courseUsage.filter(c => c.assignedLecturers.length > 1);

  // --- Renders ---
  function renderSidebar() {
    return (
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="brand-mark small">ATS</div><h2>Planner</h2>
          </div>
          <div className="sidebar-sub-brand">
            <p>{globalInfo.faculty}</p><p>{globalInfo.semester}</p>
            <span className={`mode-badge ${globalInfo.mode.toLowerCase()}`}>{globalInfo.mode} Mode</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-link ${screen === "dashboard" ? "active" : ""}`} onClick={() => setScreen("dashboard")}>Dashboard</button>
          <button className={`nav-link ${screen === "groupInfo" ? "active" : ""}`} onClick={() => setScreen("groupInfo")}>Group Info</button>
          <button className={`nav-link ${screen === "lecturerAts" ? "active" : ""}`} onClick={() => setScreen("lecturerAts")}>Lecturer ATS</button>
          
          <div className="other-courses-dropdown">
            <button className="nav-link dropdown-toggle" onClick={() => setIsOtherCoursesOpen(!isOtherCoursesOpen)} style={{width: "100%"}}>
              Other Courses {isOtherCoursesOpen ? "▼" : "▶"}
            </button>
            {isOtherCoursesOpen && (
              <div className="dropdown-menu">
                <button className={`nav-link sub-link ${screen === "muf" ? "active" : ""}`} onClick={() => setScreen("muf")}>MUF Codes</button>
                <button className={`nav-link sub-link ${screen === "performing" ? "active" : ""}`} onClick={() => setScreen("performing")}>Performing Groups</button>
                <button className={`nav-link sub-link ${screen === "servicing" ? "active" : ""}`} onClick={() => setScreen("servicing")}>Servicing Codes</button>
                <button className={`nav-link sub-link ${screen === "forum" ? "active" : ""}`} onClick={() => setScreen("forum")}>Forum/Colloquium</button>
              </div>
            )}
          </div>
        </nav>
        <div className="sidebar-footer">
          <div className="user-status-text">Logged in as <strong>{currentUser?.displayName} {currentUser?.role === 'developer' && "(Ghost)"}</strong></div>
          {isAdminOrDev && <button className={`ghost-button footer-btn ${screen === "settings" ? "active" : ""}`} onClick={() => setScreen("settings")}>⚙️ Settings (Admin)</button>}
          <button className="ghost-button red footer-btn" onClick={() => confirmAction("Sign Out", "Are you sure you want to sign out?", () => { setCurrentUser(null); setScreen("login"); })}>Sign out</button>
        </div>
      </aside>
    );
  }

  function renderConfirmModal() {
    if (!confirmConfig.isOpen) return null;
    return (
      <div className="global-overlay" style={{zIndex: 10000}}>
        <div className="modal-content center-modal" style={{maxWidth: "400px"}}>
          <div className="modal-header"><h3>{confirmConfig.title}</h3></div>
          <div className="modal-body"><p>{confirmConfig.message}</p></div>
          <div className="modal-footer" style={{display: "flex", gap: "1rem"}}>
            <button className="ghost-button full-width" onClick={() => setConfirmConfig({...confirmConfig, isOpen: false})}>Cancel</button>
            <button className="primary-button full-width" style={{background: "linear-gradient(135deg, #ff6384, #ff8a9f)"}} onClick={confirmConfig.onConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    );
  }

  function renderAddAtsModal() {
    if (!isAddAtsModalOpen) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-content fullscreen-modal">
          <div className="modal-header">
            <h3>{newAtsDraft.id.startsWith("ats-") && newAtsDraft.courseCodes.length > 0 ? "Edit" : "Add"} ATS Entry for {selectedLecturer?.name || "Lecturer"}</h3>
            <button className="ghost-button compact" onClick={() => setIsAddAtsModalOpen(false)}>Close</button>
          </div>
          <div className="modal-body">
            <div className="ats-grid-row-1">
              <label className="field"><span>Course Code(s)</span>
                <AutocompleteMultiSelect options={coursesList.map(c => c.code)} selected={newAtsDraft.courseCodes} onChange={handleAtsCourseCodesChange} placeholder="Search codes..."/>
              </label>
              <label className="field"><span>Course Name(s)</span>
                <AutocompleteMultiSelect options={coursesList.map(c => c.name)} selected={newAtsDraft.courseNames} onChange={handleAtsCourseNamesChange} placeholder="Search names..."/>
              </label>
              <label className="field"><span>Program(s)</span>
                <AutocompleteMultiSelect options={programsList} selected={newAtsDraft.programs} onChange={val => setNewAtsDraft({...newAtsDraft, programs: val})} placeholder="Search programs..."/>
              </label>
            </div>
            <div className="ats-grid-row-2">
              <label className="field"><span>Group(s)</span>
                <AutocompleteMultiSelect options={groups.map(g => g.groupName)} selected={newAtsDraft.groups} onChange={val => setNewAtsDraft({...newAtsDraft, groups: val})} placeholder="Search groups..."/>
              </label>
              <label className="field tight-input"><span>Contact Hours</span><input type="number" value={newAtsDraft.contactHours} onChange={e => setNewAtsDraft({...newAtsDraft, contactHours: e.target.value})} /></label>
              <label className="field tight-input"><span>KS</span><input type="number" value={newAtsDraft.ks} onChange={e => setNewAtsDraft({...newAtsDraft, ks: e.target.value})} /></label>
            </div>
            <div className="ats-grid-row-3">
              <label className="field tight-input"><span>K1 (Supervision)</span><input type="number" value={newAtsDraft.k1Supervision} onChange={e => setNewAtsDraft({...newAtsDraft, k1Supervision: e.target.value})} /></label>
              <label className="field tight-input"><span>K2 (Research)</span><input type="number" value={newAtsDraft.k2Research} onChange={e => setNewAtsDraft({...newAtsDraft, k2Research: e.target.value})} /></label>
              <label className="field tight-input"><span>K3 (Service)</span><input type="number" value={newAtsDraft.k3Service} onChange={e => setNewAtsDraft({...newAtsDraft, k3Service: e.target.value})} /></label>
            </div>
            <div className="ats-grid-row-4">
              <label className="field"><span>Remarks</span><textarea rows="2" value={newAtsDraft.remarks} onChange={e => setNewAtsDraft({...newAtsDraft, remarks: e.target.value})} placeholder="Remarks..."></textarea></label>
              <label className="field"><span>Notes</span><textarea rows="2" value={newAtsDraft.notes} onChange={e => setNewAtsDraft({...newAtsDraft, notes: e.target.value})} placeholder="Any notes..."></textarea></label>
            </div>
          </div>
          <div className="modal-footer"><button className="primary-button full-width" onClick={saveAtsEntry}>Save ATS Entry</button></div>
        </div>
      </div>
    );
  }

  function renderLecturerModal() {
    if (!lecturerDraft) return null;
    return (
      <div className="global-overlay">
        <div className="modal-content center-modal">
          <div className="modal-header">
            <h3>{lecturerDraft.id.startsWith("lec-") && lecturerDraft.name ? "Edit Lecturer" : "Add New Lecturer"}</h3>
            <button className="ghost-button compact" onClick={() => setLecturerDraft(null)}>Close</button>
          </div>
          <div className="modal-body">
            <div className="form-grid three-cols">
              <label className="field"><span>Name</span><input type="text" value={lecturerDraft.name} onChange={e => setLecturerDraft({...lecturerDraft, name: e.target.value})} /></label>
              <label className="field"><span>Position</span>
                <select value={lecturerDraft.position} onChange={e => setLecturerDraft({...lecturerDraft, position: e.target.value})}>
                  <option value="">Select Position...</option>
                  {POSITION_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className="field"><span>Department(s)</span>
                <AutocompleteMultiSelect options={DEPARTMENTS} selected={lecturerDraft.departments || []} onChange={val => setLecturerDraft({...lecturerDraft, departments: val})} placeholder="Add department..." />
              </label>
            </div>
            <div className="form-grid three-cols" style={{marginTop: "1rem"}}>
              <label className="field tight-input"><span>Min ATS</span><input type="number" value={lecturerDraft.minATS} onChange={e => setLecturerDraft({...lecturerDraft, minATS: Number(e.target.value)})} /></label>
              <label className="field tight-input"><span>Max ATS</span><input type="number" value={lecturerDraft.maxATS} onChange={e => setLecturerDraft({...lecturerDraft, maxATS: Number(e.target.value)})} /></label>
              <label className="field"><span>Expertise</span><input type="text" value={lecturerDraft.additionalInfo} onChange={e => setLecturerDraft({...lecturerDraft, additionalInfo: e.target.value})} /></label>
            </div>
            <div className="ats-grid-row-4"><label className="field"><span>Remarks</span><textarea rows="2" value={lecturerDraft.remarks || ""} onChange={e => setLecturerDraft({...lecturerDraft, remarks: e.target.value})}></textarea></label></div>
          </div>
          <div className="modal-footer"><button className="primary-button full-width" onClick={saveLecturer}>Save Lecturer</button></div>
        </div>
      </div>
    );
  }
  
  function renderCourseModal() {
    if (!courseDraft) return null;
    return (
      <div className="global-overlay">
        <div className="modal-content center-modal" style={{maxWidth: "500px"}}>
          <div className="modal-header">
            <h3>{courseDraft.id.startsWith("crs-") && courseDraft.code ? "Edit Course" : "Add New Course"}</h3>
            <button className="ghost-button compact" onClick={() => setCourseDraft(null)}>Close</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <label className="field"><span>Course Code</span><input type="text" value={courseDraft.code} onChange={e => setCourseDraft({...courseDraft, code: e.target.value.toUpperCase()})} placeholder="e.g. MUF101" /></label>
              <label className="field"><span>Course Name</span><input type="text" value={courseDraft.name} onChange={e => setCourseDraft({...courseDraft, name: e.target.value.toUpperCase()})} placeholder="e.g. INTRO TO MUSIC" /></label>
              <label className="field"><span>Program(s)</span>
                <AutocompleteMultiSelect options={programsList} selected={courseDraft.programs || []} onChange={val => setCourseDraft({...courseDraft, programs: val})} placeholder="Add programs..." />
              </label>
            </div>
          </div>
          <div className="modal-footer"><button className="primary-button full-width" onClick={saveCourse}>Save Course</button></div>
        </div>
      </div>
    );
  }
  
  function renderUserModal() {
    if (!userDraft) return null;
    return (
      <div className="global-overlay">
        <div className="modal-content center-modal" style={{maxWidth: "400px"}}>
          <div className="modal-header">
            <h3>{userDraft.id.startsWith("u-") && userDraft.username ? "Edit User" : "Add User"}</h3>
            <button className="ghost-button compact" onClick={() => setUserDraft(null)}>Close</button>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <label className="field"><span>Role</span>
                <select value={userDraft.role} disabled={userDraft.id.startsWith("u-") && userDraft.username} onChange={e => setUserDraft({...userDraft, role: e.target.value})}>
                  {currentUser?.role === "developer" && <option value="admin">Admin</option>}
                  <option value="coordinator">Program Coordinator</option>
                  <option value="guest">Guest</option>
                </select>
              </label>
              <label className="field"><span>Username (ID)</span><input type="text" value={userDraft.username} onChange={e => setUserDraft({...userDraft, username: e.target.value})} /></label>
              <label className="field"><span>Password</span><input type="text" value={userDraft.password} onChange={e => setUserDraft({...userDraft, password: e.target.value})} /></label>
            </div>
          </div>
          <div className="modal-footer"><button className="primary-button full-width" onClick={saveUser}>Save User Access</button></div>
        </div>
      </div>
    )
  }

  function renderMainContent() {
    if (screen === "dashboard") {
      const counts = {
        overload: lecturersStatus.filter(l => l.status === "Overload").length,
        underload: lecturersStatus.filter(l => l.status === "Underload").length,
        noAts: lecturersStatus.filter(l => l.status === "No ATS").length
      };

      return (
        <section className="page-grid">
          <div className="panel panel-wide">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div><p className="eyebrow">Overview</p><h3>Dashboard Insights</h3></div>
                <button className="primary-button" onClick={() => setScreen("allLecturersAts")}>View All Lecturers ATS</button>
             </div>
          </div>
          
          <div className="dashboard-grid-stacked" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h3 style={{margin: 0}}>Load Warnings</h3>
                <p className="muted-copy" style={{fontSize: "0.9rem", margin: "0.2rem 0 0"}}>
                  <strong>{counts.overload}</strong> Overload &nbsp;|&nbsp; <strong>{counts.underload}</strong> Underload &nbsp;|&nbsp; <strong>{counts.noAts}</strong> No ATS
                </p>
              </div>
              <button className="ghost-button" onClick={() => setScreen("loadWarningsDetails")}>View Full Data</button>
            </div>
            
            <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h3 style={{margin: 0}}>Over-assigned Courses</h3>
                <p className="muted-copy" style={{fontSize: "0.9rem", margin: "0.2rem 0 0"}}>
                  <strong>{overAssignedCourses.length}</strong> course(s) assigned to multiple lecturers.
                </p>
              </div>
              <button className="ghost-button" onClick={() => setScreen("overAssignedDetails")}>View Full Data</button>
            </div>

            <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h3 style={{margin: 0}}>Unassigned Courses</h3>
                <p className="muted-copy" style={{fontSize: "0.9rem", margin: "0.2rem 0 0"}}>
                  <strong>{unassignedCourses.length}</strong> active course(s) not linked to any ATS.
                </p>
              </div>
              <button className="ghost-button" onClick={() => setScreen("unassignedDetails")}>View Full Data</button>
            </div>

          </div>
        </section>
      );
    }
    
    // --- Detailed Drill-Down Views ---
    if (screen === "loadWarningsDetails") {
      return (
        <section className="page-grid">
           <div className="panel panel-wide">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem"}}>
                 <h3>Load Warnings - Full Data</h3>
                 <button className="ghost-button compact" onClick={() => setScreen("dashboard")}>Back to Dashboard</button>
              </div>
              <div className="tight-table-wrapper" style={{overflowX: "auto"}}>
                <table className="tight-table data-table">
                  <thead><tr><th>Lecturer</th><th>Total ATS</th><th>Limits</th><th>Status</th></tr></thead>
                  <tbody>
                    {lecturersStatus.map(l => (
                      <tr key={l.id}>
                        <td><button className="link-button" onClick={() => { setSelectedLecturerId(l.id); setScreen("lecturerAts"); }}><strong>{l.name}</strong></button></td>
                        <td>{l.total}</td>
                        <td>{l.minATS} - {l.maxATS}</td>
                        <td><span className={`status-pill ${l.status.replace(/\s+/g, '-').toLowerCase()}`}>{l.status}</span></td>
                      </tr>
                    ))}
                    {lecturersStatus.length === 0 && <tr><td colSpan="4" className="text-center muted-copy">All lecturers within limits.</td></tr>}
                  </tbody>
                </table>
              </div>
           </div>
        </section>
      );
    }

    if (screen === "overAssignedDetails") {
      return (
        <section className="page-grid">
           <div className="panel panel-wide">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem"}}>
                 <h3>Over-assigned Courses - Full Data</h3>
                 <button className="ghost-button compact" onClick={() => setScreen("dashboard")}>Back to Dashboard</button>
              </div>
              <div className="tight-table-wrapper" style={{overflowX: "auto"}}>
                <table className="tight-table data-table">
                  <thead><tr><th>Course Code</th><th>Course Name</th><th>Lecturers Assigned</th></tr></thead>
                  <tbody>
                    {overAssignedCourses.map(c => {
                       const isExp = expandedCourseCode === c.code;
                       return (
                         <React.Fragment key={c.code}>
                           <tr style={{background: isExp ? "rgba(94, 140, 255, 0.15)" : ""}}>
                             <td><button className="link-button" onClick={() => setExpandedCourseCode(isExp ? null : c.code)}><strong>{isExp ? "▼" : "▶"} {c.code}</strong></button></td>
                             <td>{c.name}</td>
                             <td><span className="pill">{c.assignedLecturers.length} Staff</span></td>
                           </tr>
                           {isExp && (
                             <tr className="expanded-row-child">
                               <td colSpan="3" style={{padding: "0.8rem", background: "#020813", borderLeft: "2px solid #ff9f40"}}>
                                 <p style={{margin: "0 0 0.5rem 0", fontSize: "0.8rem", color: "#8fa4d8"}}>Lecturers handling {c.code}:</p>
                                 <div style={{display: "flex", flexDirection: "column", gap: "0.4rem"}}>
                                   {c.assignedLecturers.map(l => (
                                     <button key={l.id} className="link-button" style={{fontSize: "0.85rem"}} onClick={() => { setSelectedLecturerId(l.id); setScreen("lecturerAts"); }}>• {l.name}</button>
                                   ))}
                                 </div>
                               </td>
                             </tr>
                           )}
                         </React.Fragment>
                       )
                    })}
                    {overAssignedCourses.length === 0 && <tr><td colSpan="3" className="text-center muted-copy">No overlapping courses.</td></tr>}
                  </tbody>
                </table>
              </div>
           </div>
        </section>
      );
    }

    if (screen === "unassignedDetails") {
      return (
        <section className="page-grid">
           <div className="panel panel-wide">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem"}}>
                 <h3>Unassigned Courses - Full Data</h3>
                 <button className="ghost-button compact" onClick={() => setScreen("dashboard")}>Back to Dashboard</button>
              </div>
              <div className="tight-table-wrapper" style={{overflowX: "auto"}}>
                <table className="tight-table data-table">
                  <thead><tr><th>Course Code</th><th>Course Name</th><th>Programs</th></tr></thead>
                  <tbody>
                    {unassignedCourses.map(c => (
                      <tr key={c.id}>
                        <td><strong>{c.code}</strong></td>
                        <td>{c.name}</td>
                        <td>{(c.programs||[]).join(", ")}</td>
                      </tr>
                    ))}
                    {unassignedCourses.length === 0 && <tr><td colSpan="3" className="text-center muted-copy">All courses assigned!</td></tr>}
                  </tbody>
                </table>
              </div>
           </div>
        </section>
      );
    }

    if (screen === "allLecturersAts") {
      return (
        <section className="page-grid">
          <div className="panel panel-wide">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <h3>All Lecturers ATS</h3><button className="ghost-button compact" onClick={() => setScreen("dashboard")}>Back</button>
             </div>
             <div className="tab-row" style={{marginTop: "1rem", overflowX: "auto", whiteSpace: "nowrap", paddingBottom: "10px"}}>
                <button className={`tab-button ${selectedDepartment === "All Departments" ? "active" : ""}`} onClick={() => setSelectedDepartment("All Departments")}>All</button>
                {DEPARTMENTS.map(dep => <button key={dep} className={`tab-button ${selectedDepartment === dep ? "active" : ""}`} onClick={() => setSelectedDepartment(dep)}>{dep}</button>)}
             </div>
             
             <div className="table-wrapper" style={{overflowX: "auto", maxWidth: "100%"}}>
               <table className="data-table">
                  <thead><tr><th>Lecturer Name</th><th>Dept</th><th>Groups Handled</th><th className="text-center">Total ATS</th><th>Min/Max</th><th>Action</th></tr></thead>
                  <tbody>
                    {filteredLecturers.map(l => {
                      const allGroups = (l.atsEntries || []).flatMap(e => e.groups || []);
                      const uniqueGroups = [...new Set(allGroups)].filter(Boolean);
                      const isExpanded = expandedLecturerId === l.id;
                      
                      const kTotals = l.atsEntries.reduce((acc, curr) => ({
                        ks: acc.ks + Number(curr.ks||0), k1: acc.k1 + Number(curr.k1Supervision||0), k2: acc.k2 + Number(curr.k2Research||0), k3: acc.k3 + Number(curr.k3Service||0)
                      }), {ks:0, k1:0, k2:0, k3:0});

                      return (
                        <React.Fragment key={l.id}>
                          <tr className={isExpanded ? "expanded-row-parent active" : "expanded-row-parent"}>
                            <td><button className="link-button" onClick={() => setExpandedLecturerId(isExpanded ? null : l.id)}><strong>{isExpanded ? "▼" : "▶"} {l.name}</strong></button></td>
                            <td>{(l.departments || []).join(", ")}</td>
                            <td style={{fontSize: "0.85rem", color: "#a8b5d6"}}>{uniqueGroups.map(g => getGroupDisplay(g)).join(", ") || "-"}</td>
                            <td className="text-center"><strong>{getAtsTotal(l)}</strong></td>
                            <td>{l.minATS} - {l.maxATS}</td>
                            <td><button className="ghost-button compact" onClick={() => { setSelectedLecturerId(l.id); setScreen("lecturerAts"); }}>Edit ➔</button></td>
                          </tr>
                          {isExpanded && (
                            <tr className="expanded-row-child">
                              <td colSpan="6">
                                <div className="dropdown-panel-content">
                                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem"}}>
                                    <h4 style={{margin: 0, color: "#5e8cff"}}>ATS Breakdown for {l.name}</h4>
                                    <button className="primary-button compact" onClick={() => { setSelectedLecturerId(l.id); setScreen("lecturerAts"); }}>✏️ Go to Full Edit Page</button>
                                  </div>
                                  {l.atsEntries.length > 0 ? (
                                    <table className="data-table tight-inputs condensed">
                                      <thead>
                                        <tr>
                                          <th>Course</th><th>Program</th><th>Groups</th>
                                          <th className="bordered-col text-center">KS</th>
                                          <th className="bordered-col text-center">K1</th>
                                          <th className="bordered-col text-center">K2</th>
                                          <th className="bordered-col text-center">K3</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {l.atsEntries.map(entry => (
                                          <tr key={entry.id}>
                                            <td>{(entry.courseCodes||[]).join(", ")}</td><td>{(entry.programs||[]).join(", ")}</td><td>{(entry.groups||[]).map(g => getGroupDisplay(g)).join(", ")}</td>
                                            <td className="bordered-col text-center">{entry.ks}</td>
                                            <td className="bordered-col text-center">{entry.k1Supervision}</td>
                                            <td className="bordered-col text-center">{entry.k2Research}</td>
                                            <td className="bordered-col text-center">{entry.k3Service}</td>
                                          </tr>
                                        ))}
                                        <tr className="totals-row">
                                          <td colSpan="3" className="text-right" style={{paddingRight: "1rem"}}><strong>TOTALS</strong></td>
                                          <td className="bordered-col text-center"><strong>{kTotals.ks}</strong></td>
                                          <td className="bordered-col text-center"><strong>{kTotals.k1}</strong></td>
                                          <td className="bordered-col text-center"><strong>{kTotals.k2}</strong></td>
                                          <td className="bordered-col text-center"><strong>{kTotals.k3}</strong></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  ) : <p className="muted-copy text-center" style={{margin:0}}>No ATS entries found.</p>}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    })}
                  </tbody>
               </table>
             </div>
          </div>
        </section>
      );
    }

    if (screen === "lecturerAts") {
      let availableLecturers = lecturers;
      if (lecSearchDept) availableLecturers = availableLecturers.filter(l => (l.departments||[]).includes(lecSearchDept));
      
      const kTotals = selectedLecturer ? selectedLecturer.atsEntries.reduce((acc, curr) => ({
        ks: acc.ks + Number(curr.ks||0), k1: acc.k1 + Number(curr.k1Supervision||0), k2: acc.k2 + Number(curr.k2Research||0), k3: acc.k3 + Number(curr.k3Service||0)
      }), {ks:0, k1:0, k2:0, k3:0}) : {ks:0, k1:0, k2:0, k3:0};

      return (
        <section className="page-grid">
          <div className="panel panel-wide" style={{overflow: "visible"}}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", zIndex: 50, position: "relative", flexWrap: "wrap" }}>
              <label className="field" style={{flex: "1", minWidth: "250px"}}>
                <span style={{color: "#fff", fontWeight: "600"}}>Filter by Department</span>
                <AutocompleteSingleSelect options={DEPARTMENTS} selected={lecSearchDept} onChange={setLecSearchDept} placeholder="Type department..." onClear={() => setLecSearchDept("")} />
              </label>
              <label className="field" style={{flex: "2", minWidth: "300px"}}>
                <span style={{color: "#fff", fontWeight: "600"}}>Search & Select Lecturer</span>
                <AutocompleteSingleSelect options={availableLecturers.map(l => l.name)} selected={selectedLecturer?.name} onChange={(val) => { const l = lecturers.find(x => x.name === val); setSelectedLecturerId(l ? l.id : null); setLecSearchName(val); }} placeholder="Type lecturer name..." onClear={() => { setSelectedLecturerId(null); setLecSearchName(""); }} />
              </label>
            </div>

            {selectedLecturer ? (
              <div className="fade-in">
                <div className="lecturer-header-card" style={{ marginBottom: "1rem" }}>
                  <div><h2 style={{margin: 0, color: "#fff"}}>{selectedLecturer.name}</h2><p className="muted-copy" style={{margin: "0.2rem 0 0"}}>{selectedLecturer.position} • {(selectedLecturer.departments || []).join(", ")}</p></div>
                  <div className="metric-box"><span>Total ATS:</span><strong>{getAtsTotal(selectedLecturer)}</strong></div>
                </div>

                {!isReadOnly && <div className="action-row"><button className="primary-button" onClick={() => { setNewAtsDraft(createBlankAtsEntry()); setIsAddAtsModalOpen(true); }}>+ Add ATS Entry</button></div>}

                <div className="table-wrapper" style={{ marginTop: "1rem", overflowX: "auto" }}>
                  <table className="data-table tight-inputs ats-detailed-table">
                    <thead>
                      <tr>
                        <th className="col-codes">Course Codes</th>
                        <th className="col-names">Course Names</th>
                        <th className="col-programs">Programs</th>
                        <th className="col-groups">Groups</th>
                        <th className="bordered-col text-center">KS</th>
                        <th className="bordered-col text-center">K1</th>
                        <th className="bordered-col text-center">K2</th>
                        <th className="bordered-col text-center">K3</th>
                        <th className="col-remarks">Remarks</th>
                        {!isReadOnly && <th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedLecturer.atsEntries || []).map(entry => (
                        <tr key={entry.id}>
                          <td className="col-codes"><textarea readOnly value={(entry.courseCodes || []).join("\n")}></textarea></td>
                          <td className="col-names"><textarea readOnly value={(entry.courseNames || []).join("\n")}></textarea></td>
                          <td className="col-programs"><textarea readOnly value={(entry.programs || []).join("\n")}></textarea></td>
                          <td className="col-groups"><textarea readOnly value={(entry.groups || []).map(g => getGroupDisplay(g)).join("\n")}></textarea></td>
                          <td className="bordered-col text-center">{entry.ks}</td>
                          <td className="bordered-col text-center">{entry.k1Supervision}</td>
                          <td className="bordered-col text-center">{entry.k2Research}</td>
                          <td className="bordered-col text-center">{entry.k3Service}</td>
                          <td className="col-remarks"><textarea readOnly value={entry.remarks || ""}></textarea></td>
                          {!isReadOnly && (
                            <td>
                              <div style={{display: "flex", gap: "0.3rem", alignItems: "center"}}>
                                <button className="ghost-button compact" onClick={() => openEditAtsEntry(entry)}>✏️</button>
                                <button className="clear-btn" onClick={() => deleteAtsEntry(entry.id)}>✖</button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                      {selectedLecturer.atsEntries.length > 0 ? (
                        <tr className="totals-row">
                          <td colSpan="4" className="text-right" style={{paddingRight: "1rem"}}><strong>TOTALS</strong></td>
                          <td className="bordered-col text-center"><strong>{kTotals.ks}</strong></td>
                          <td className="bordered-col text-center"><strong>{kTotals.k1}</strong></td>
                          <td className="bordered-col text-center"><strong>{kTotals.k2}</strong></td>
                          <td className="bordered-col text-center"><strong>{kTotals.k3}</strong></td>
                          <td colSpan={isReadOnly ? 1 : 2}></td>
                        </tr>
                      ) : <tr><td colSpan="10" className="text-center muted-copy">No ATS entries found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : <div className="empty-state"><p className="muted-copy">Search and select a lecturer above to view their ATS details.</p></div>}
          </div>
        </section>
      );
    }

    if (screen === "groupInfo") {
      const filteredGroups = groups.filter(g => groupFilterDept === "All" || g.department === groupFilterDept);
      return (
        <section className="page-grid">
          <div className="panel panel-wide">
            <div className="panel-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3>Group Info</h3>
                <p className="muted-copy" style={{fontSize: "0.85rem"}}>Manage student counts. {isReadOnly ? "(Read-Only Mode)" : ""}</p>
              </div>
              <div style={{width: "200px"}}>
                <select value={groupFilterDept} onChange={e => setGroupFilterDept(e.target.value)}>
                  <option value="All">All Programs</option>
                  {DEPARTMENTS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead><tr><th>Group Name</th><th>Department</th><th>SEMESTER</th><th>Student Count</th></tr></thead>
                <tbody>
                  {filteredGroups.map((group) => (
                    <tr key={group.id}>
                      <td>{group.groupName}</td>
                      <td>{group.department}</td>
                      <td><span className="pill">{extractSemester(group.groupName)}</span></td>
                      <td>
                        <input type="number" 
                          value={group.studentCount} 
                          disabled={isReadOnly}
                          onChange={(e) => setGroups(groups.map(g => g.id === group.id ? {...g, studentCount: e.target.value} : g))} 
                          style={{width: "80px", padding: "0.4rem", opacity: isReadOnly ? 0.6 : 1}} 
                        />
                      </td>
                    </tr>
                  ))}
                  {filteredGroups.length === 0 && <tr><td colSpan="4" className="text-center muted-copy">No groups found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );
    }

    // --- SETTINGS VIEW ---
    if (screen === "settings") {
      const isDev = currentUser?.role === "developer";
      const editableRoles = isDev ? ["admin", "coordinator", "guest"] : ["coordinator", "guest"];
      
      return (
        <section className="page-grid">
           <div className="panel panel-wide">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: "wrap", gap: "1rem" }}>
                <div><h3>Admin Settings</h3><p className="muted-copy">Manage core data, system globals, and permissions.</p></div>
                <div className="tab-row" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                  <button className={`tab-button ${settingsTab === "general" ? "active" : ""}`} onClick={() => setSettingsTab("general")}>General / Mode</button>
                  <button className={`tab-button ${settingsTab === "users" ? "active" : ""}`} onClick={() => setSettingsTab("users")}>Users & Access</button>
                  <button className={`tab-button ${settingsTab === "lecturers" ? "active" : ""}`} onClick={() => setSettingsTab("lecturers")}>Lecturers</button>
                  <button className={`tab-button ${settingsTab === "courses" ? "active" : ""}`} onClick={() => setSettingsTab("courses")}>Courses</button>
                  <button className={`tab-button ${settingsTab === "programs" ? "active" : ""}`} onClick={() => setSettingsTab("programs")}>Programs</button>
                  <button className={`tab-button ${settingsTab === "groups" ? "active" : ""}`} onClick={() => setSettingsTab("groups")}>Groups</button>
                  <button className={`tab-button ${settingsTab === "logs" ? "active" : ""}`} onClick={() => setSettingsTab("logs")}>Activity Logs</button>
                  <button className={`tab-button ${settingsTab === "archives" ? "active" : ""}`} onClick={() => setSettingsTab("archives")}>Archives</button>
                </div>
              </div>

              {settingsTab === "general" && (
                <div className="form-grid three-cols" style={{ padding: "1.5rem", border: "1px solid #243250", borderRadius: "14px"}}>
                  <label className="field"><span>Faculty Name</span><input type="text" value={globalInfo.faculty} onChange={e => setGlobalInfo({...globalInfo, faculty: e.target.value})} /></label>
                  <label className="field"><span>Semester Config</span><input type="text" value={globalInfo.semester} onChange={e => setGlobalInfo({...globalInfo, semester: e.target.value})} /></label>
                  <label className="field"><span>Planner Mode</span>
                    <select value={globalInfo.mode} onChange={e => {
                        const newMode = e.target.value;
                        confirmAction("Change Mode", `Change planner mode to ${newMode}?`, () => {
                          setGlobalInfo(prev => ({...prev, mode: newMode}));
                          logActivity(`Changed Planner Mode to ${newMode}`, null);
                        });
                      }}>
                      <option value="Draft">Draft (Editable by all roles)</option>
                      <option value="Completed">Completed (Locked for non-admins)</option>
                    </select>
                  </label>
                </div>
              )}

              {settingsTab === "users" && (
                <div>
                  <button className="primary-button compact" onClick={() => openEditUser(null, null)}>+ Add New User</button>
                  {isDev && (
                    <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(255, 99, 132, 0.1)", border: "1px solid #ff6384", borderRadius: "12px" }}>
                       <h4 style={{margin: "0 0 0.5rem", color: "#ff6384"}}>Developer Secret Password</h4>
                       <label className="field tight-input" style={{maxWidth: "300px"}}>
                         <input type="text" value={devPassword} onChange={e => setDevPassword(e.target.value)} />
                       </label>
                    </div>
                  )}
                  
                  {editableRoles.map(roleKey => (
                    <div key={roleKey} style={{marginTop: "1.5rem", padding: "1.5rem", border: "1px solid #243250", borderRadius: "14px"}}>
                       <h4 style={{margin: "0 0 1rem", textTransform: "capitalize"}}>{roleKey === "coordinator" ? "Program Coordinators" : roleKey} Access</h4>
                       <div className="table-wrapper">
                         <table className="tight-table data-table">
                           <thead><tr><th>Username (ID)</th><th>Password</th><th>Actions</th></tr></thead>
                           <tbody>
                             {(users[roleKey] || []).map(u => (
                               <tr key={u.id}>
                                 <td>{u.username}</td><td>{u.password}</td>
                                 <td>
                                   <button className="ghost-button compact" onClick={() => openEditUser(roleKey, u)}>✏️ Edit</button>
                                   <button className="ghost-button compact red" style={{marginLeft: "0.5rem"}} onClick={() => deleteUser(roleKey, u.id)}>🗑️ Delete</button>
                                 </td>
                               </tr>
                             ))}
                             {(!users[roleKey] || users[roleKey].length === 0) && <tr><td colSpan="3" className="text-center muted-copy">No users in this role.</td></tr>}
                           </tbody>
                         </table>
                       </div>
                    </div>
                  ))}
                </div>
              )}

              {settingsTab === "programs" && (
                <div style={{ padding: "1.5rem", border: "1px solid #243250", borderRadius: "14px"}}>
                  <h4>Manage Programs</h4>
                  <div className="form-grid three-cols" style={{alignItems: "end"}}>
                    <label className="field"><span>New Program Code</span><input type="text" id="newProgInput" placeholder="e.g. MU333" /></label>
                    <div style={{marginBottom: "1rem"}}>
                      <button className="primary-button compact" onClick={() => { const val = document.getElementById("newProgInput")?.value; if(val && !programsList.includes(val)) { setProgramsList([...programsList, val]); logActivity(`Added new program: ${val}`, { target: 'programs_add', name: val }); document.getElementById("newProgInput").value = ""; } }}>Add Program</button>
                    </div>
                  </div>
                  <div style={{marginTop: "1rem"}}>
                     <input type="text" placeholder="Search Programs..." value={setSearchProgram} onChange={e => setSetSearchProgram(e.target.value)} style={{maxWidth: "300px"}}/>
                  </div>
                  <div className="table-wrapper">
                    <table className="tight-table data-table" style={{width: "100%", maxWidth: "600px"}}>
                      <thead><tr><th>Program</th><th>Actions</th></tr></thead>
                      <tbody>
                        {programsList.filter(p => p.toLowerCase().includes(setSearchProgram.toLowerCase())).map(p => (
                          <tr key={p}>
                            <td>{p}</td>
                            <td>
                              <button className="ghost-button compact" onClick={() => setProgramDraft({oldName: p, newName: p})}>✏️ Edit</button>
                              <button className="ghost-button compact red" style={{marginLeft: "0.5rem"}} onClick={() => deleteProgram(p)}>🗑️ Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {settingsTab === "groups" && (
                <div>
                  <button className="primary-button compact" onClick={() => openEditGroup(null)}>+ Add New Group</button>
                  <div style={{marginTop: "1rem", display: "flex", gap: "1rem"}}>
                     <input type="text" placeholder="Search Group Name..." value={setSearchGroup} onChange={e => setSetSearchGroup(e.target.value)} style={{flex: 1, maxWidth: "300px"}}/>
                     <select value={setFilterGroupDept} onChange={e => setSetFilterGroupDept(e.target.value)} style={{flex: 1, maxWidth: "250px"}}>
                        <option value="All">All Departments</option>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                     </select>
                  </div>
                  <div className="table-wrapper" style={{marginTop: "1rem"}}>
                    <table className="data-table">
                      <thead><tr><th>Group Name</th><th>Department</th><th>Semester</th><th>Student Count</th><th>Actions</th></tr></thead>
                      <tbody>
                        {groups
                           .filter(g => setFilterGroupDept === "All" || g.department === setFilterGroupDept)
                           .filter(g => g.groupName.toLowerCase().includes(setSearchGroup.toLowerCase()))
                           .map(g => (
                          <tr key={g.id}>
                            <td>{g.groupName}</td><td>{g.department}</td><td>{extractSemester(g.groupName)}</td><td>{g.studentCount}</td>
                            <td>
                              <button className="ghost-button compact" onClick={() => openEditGroup(g)}>✏️ Edit</button>
                              <button className="ghost-button compact red" style={{marginLeft: "0.5rem"}} onClick={() => deleteGroup(g.id)}>🗑️ Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {settingsTab === "lecturers" && (
                <div>
                  <button className="primary-button compact" onClick={() => openEditLecturer(null)}>+ Add New Lecturer</button>
                  <div style={{marginTop: "1rem", display: "flex", gap: "1rem"}}>
                     <input type="text" placeholder="Search Lecturer..." value={setSearchLecturer} onChange={e => setSetSearchLecturer(e.target.value)} style={{flex: 1, maxWidth: "300px"}}/>
                     <select value={setFilterLecturerDept} onChange={e => setSetFilterLecturerDept(e.target.value)} style={{flex: 1, maxWidth: "250px"}}>
                        <option value="All">All Departments</option>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                     </select>
                  </div>
                  <div className="table-wrapper" style={{marginTop: "1rem"}}>
                    <table className="data-table">
                      <thead><tr><th>Name</th><th>Department</th><th>Position</th><th>Min/Max ATS</th><th>Actions</th></tr></thead>
                      <tbody>
                        {lecturers
                           .filter(l => setFilterLecturerDept === "All" || (l.departments || []).includes(setFilterLecturerDept))
                           .filter(l => l.name.toLowerCase().includes(setSearchLecturer.toLowerCase()))
                           .map(l => (
                          <tr key={l.id}>
                            <td>{l.name}</td><td>{(l.departments || []).join(", ")}</td><td>{l.position}</td><td>{l.minATS} - {l.maxATS}</td>
                            <td>
                              <button className="ghost-button compact" onClick={() => openEditLecturer(l)}>✏️ Edit</button>
                              <button className="ghost-button compact red" style={{marginLeft: "0.5rem"}} onClick={() => deleteLecturer(l.id)}>🗑️ Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {settingsTab === "courses" && (
                <div>
                  <button className="primary-button compact" onClick={() => openEditCourse(null)}>+ Add New Course</button>
                  <div style={{marginTop: "1rem", display: "flex", gap: "1rem"}}>
                     <input type="text" placeholder="Search Course Code/Name..." value={setSearchCourse} onChange={e => setSetSearchCourse(e.target.value)} style={{flex: 1, maxWidth: "300px"}}/>
                     <select value={setFilterCourseDept} onChange={e => setSetFilterCourseDept(e.target.value)} style={{flex: 1, maxWidth: "250px"}}>
                        <option value="All">All Programs</option>
                        {programsList.map(p => <option key={p} value={p}>{p}</option>)}
                     </select>
                  </div>
                  <div className="table-wrapper" style={{marginTop: "1rem"}}>
                    <table className="data-table">
                      <thead><tr><th>Course Code</th><th>Course Name</th><th>Programs</th><th>Actions</th></tr></thead>
                      <tbody>
                        {coursesList
                           .filter(c => setFilterCourseDept === "All" || (c.programs || []).includes(setFilterCourseDept))
                           .filter(c => c.code.toLowerCase().includes(setSearchCourse.toLowerCase()) || c.name.toLowerCase().includes(setSearchCourse.toLowerCase()))
                           .map(c => (
                          <tr key={c.id}>
                            <td>{c.code}</td><td>{c.name}</td><td>{(c.programs || []).join(", ")}</td>
                            <td>
                              <button className="ghost-button compact" onClick={() => openEditCourse(c)}>✏️ Edit</button>
                              <button className="ghost-button compact red" style={{marginLeft: "0.5rem"}} onClick={() => deleteCourse(c.id)}>🗑️ Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {settingsTab === "logs" && (
                <div style={{ padding: "1.5rem", border: "1px solid #243250", borderRadius: "14px"}}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h4>System Activity Logs</h4>
                    {isDev && <span className="pill">Developer stealth active. Your actions bypass this log.</span>}
                  </div>
                  <div className="table-wrapper" style={{marginTop: "1rem", maxHeight: "400px", overflowY: "auto"}}>
                    <table className="tight-table data-table">
                      <thead><tr><th>Timestamp</th><th>User ID</th><th>Action Description</th><th>Targeted Undo</th></tr></thead>
                      <tbody>
                        {activityLogs.map(log => (
                          <tr key={log.id}>
                            <td style={{fontSize: "0.85rem", color: "#a8b5d6"}}>{log.timestamp}</td>
                            <td><span className="pill">{log.user}</span></td>
                            <td>{log.action}</td>
                            <td>
                               {log.undoData ? <button className="ghost-button compact red" onClick={() => undoToLog(log)}>↶ Undo</button> : <span className="muted-copy">-</span>}
                            </td>
                          </tr>
                        ))}
                        {activityLogs.length === 0 && <tr><td colSpan="4" className="text-center muted-copy">No recent activity.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {settingsTab === "archives" && (
                <div style={{ padding: "1.5rem", border: "1px solid #243250", borderRadius: "14px"}}>
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div>
                      <h4>Semester Archives</h4>
                      <p className="muted-copy" style={{fontSize: "0.85rem", margin: 0}}>Save the current state to refer back to later.</p>
                    </div>
                    <button className="primary-button compact" onClick={archiveSemester}>📦 Archive Current Semester ({globalInfo.semester})</button>
                  </div>
                  <div className="table-wrapper" style={{marginTop: "1rem"}}>
                    <table className="tight-table data-table">
                      <thead><tr><th>Archived Date</th><th>Semester Config</th><th>Actions</th></tr></thead>
                      <tbody>
                        {archives.map(arch => (
                          <tr key={arch.id}>
                            <td>{arch.dateArchived}</td><td><strong>{arch.semester}</strong></td>
                            <td>
                              <button className="ghost-button compact" onClick={() => loadArchive(arch)}>📂 Load Archive</button>
                              <button className="ghost-button compact red" style={{marginLeft: "0.5rem"}} onClick={() => deleteArchive(arch.id)}>🗑️ Delete</button>
                            </td>
                          </tr>
                        ))}
                        {archives.length === 0 && <tr><td colSpan="3" className="text-center muted-copy">No archives saved yet.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

           </div>
        </section>
      )
    }

    return (
      <section className="page-grid">
        <div className="panel panel-wide">
          <h3>{(screen || "").toUpperCase()}</h3>
          <p className="muted-copy">This section is currently under construction.</p>
        </div>
      </section>
    );
  }

  // --- External Modals ---
  function renderProgramModal() {
    if(!programDraft) return null;
    return (
      <div className="global-overlay">
        <div className="modal-content center-modal" style={{maxWidth: "400px"}}>
          <div className="modal-header"><h3>Edit Program</h3><button className="ghost-button compact" onClick={() => setProgramDraft(null)}>Close</button></div>
          <div className="modal-body"><label className="field"><span>Program Code</span><input type="text" value={programDraft.newName} onChange={e => setProgramDraft({...programDraft, newName: e.target.value})} /></label></div>
          <div className="modal-footer"><button className="primary-button full-width" onClick={saveProgram}>Save Program</button></div>
        </div>
      </div>
    )
  }

  function renderGroupModal() {
    if(!groupDraft) return null;
    return (
      <div className="global-overlay">
        <div className="modal-content center-modal" style={{maxWidth: "500px"}}>
          <div className="modal-header"><h3>{groupDraft.id.startsWith("grp-") && groupDraft.groupName ? "Edit Group" : "Add Group"}</h3><button className="ghost-button compact" onClick={() => setGroupDraft(null)}>Close</button></div>
          <div className="modal-body">
            <div className="form-grid">
              <label className="field"><span>Group Code (Name)</span><input type="text" value={groupDraft.groupName} onChange={e => setGroupDraft({...groupDraft, groupName: e.target.value, department: getDeptFromGroup(e.target.value)})} placeholder="e.g. CAMU1101A" /></label>
              <label className="field"><span>Program / Department</span>
                <select value={groupDraft.department} onChange={e => setGroupDraft({...groupDraft, department: e.target.value})}>
                  <option value="">Auto-detected based on Group Name...</option>
                  {DEPARTMENTS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className="field"><span>Student Count</span><input type="number" value={groupDraft.studentCount} onChange={e => setGroupDraft({...groupDraft, studentCount: Number(e.target.value)})} /></label>
            </div>
          </div>
          <div className="modal-footer"><button className="primary-button full-width" onClick={saveGroup}>Save Group</button></div>
        </div>
      </div>
    )
  }

  // --- Main Wrappers ---
  if (screen === "login") {
    return (
      <div className="app-shell login-shell">
        <div className="login-wrap">
          <div className="login-card">
            <div className="brand-block"><div className="brand-mark">ATS</div><div className="brand-copy"><h1>Lecturer Load Planner</h1></div></div>
            <form className="login-form" onSubmit={handleLogin}>
              <div><h2 style={{ marginBottom: "0.2rem" }}>Welcome back</h2></div>
              <div className="role-switcher-inline">{LOGIN_ROLE_OPTIONS.map(role => <button key={role.key} type="button" className={`role-pill ${selectedLoginRole === role.key ? "active" : ""}`} onClick={() => setSelectedLoginRole(role.key)}>{role.label}</button>)}</div>
              <label className="field"><span>Username</span><input type="text" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} required={loginPassword !== devPassword} /></label>
              <label className="field"><span>Password</span><input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required /></label>
              {loginError && <p className="error-text" style={{color: "#ff6384"}}>{loginError}</p>}
              <button type="submit" className="primary-button login-submit">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {renderSidebar()}
      <div className="main-content" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header className="topbar">
          <div className="topbar-info"><h1>ATS Application - {(screen || "").charAt(0).toUpperCase() + (screen || "").slice(1).replace(/([A-Z])/g, ' $1')}</h1></div>
        </header>
        <main style={{ padding: "1.5rem", overflowY: "auto", overflowX: "hidden", flex: 1, position: "relative" }}>
          {renderMainContent()}
        </main>
      </div>
      {renderAddAtsModal()}
      {renderLecturerModal()}
      {renderCourseModal()}
      {renderProgramModal()}
      {renderGroupModal()}
      {renderUserModal()}
      {renderConfirmModal()}
    </div>
  );
}