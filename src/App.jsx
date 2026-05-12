import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

// --- Extracted Data ---
const PROGRAM_CODES_RAW = [
  "CAMU110",
  "CAMU111",
  "CAMU220",
  "CAMU221",
  "CAMU222",
  "CAMU223",
  "CAMU230",
  "CAMU777",
  "CAMU778",
  "CAMU790",
  "MU110",
  "MU111",
  "MU220",
  "MU221",
  "MU222",
  "MU223",
  "MU230",
  "MU778",
  "MU790",
];

const DEPARTMENTS = [
  "MU110",
  "MU111",
  "MU220/ MU230",
  "MU221",
  "MU222",
  "MU223",
  "CAMU777",
  "CAMU778",
  "CAMU790",
];

const POSITION_OPTIONS = [
  "Lecturer",
  "Senior Lecturer",
  "Assoc. Professor",
  "Professor",
  "Dean",
  "Deputy Dean",
  "Head of Program",
];

const LOGIN_ROLE_OPTIONS = [
  { key: "admin", label: "Admin" },
  { key: "coordinator", label: "Program Coordinator" },
  { key: "guest", label: "Guest" },
];

const rawCourses = [
  "CTU101 - FUNDAMENTALS OF ISLAM",
  "CTU152 - VALUES AND CIVILIZATION",
  "ENT311 - ESSENTIALS OF ENTREPRENEURSHIP",
  "LCC121 - ENGLISH FOR LANGUAGE COMPETENCE I",
  "MUB234 - MUSIC INDUSTRY MANAGEMENT",
  "MUC252 - BASIC ARRANGING",
  "MUD100 - INSTRUMENTAL PRACTICE I",
  "MUD111 - MUSIC THEORY AND APPLICATION I",
  "MUE232 - FUNDAMENTAL OF MUSIC EDUCATION",
  "MUF105 - MALAYSIAN MUSIC I",
  "MUF106 - WESTERN ART MUSIC I",
  "MUF110 - LARGE ENSEMBLE I",
  "MUP311 - JAZZ & FUSION ENSEMBLE",
  "MUT254 - INTRODUCTION TO AUDIO AND MUSIC PRODUCTION",
  "TMC401 - BAHASA KETIGA I",
  "UMU102 - FUNDAMENTAL OF MUSIC",
];

const rawGroups = [
  "CAMU1101A",
  "CAMU1101B",
  "CAMU1102A",
  "CAMU221SEM1",
  "CAMU222SEM1",
  "CAMU230SEM1",
  "MU1101A",
  "MU1101B",
  "MU221SEM1",
];

const rawLecturers = [
  "Adee Arifin",
  "Ahmad Munir bin Mahzair",
  "Ahmad Rithaudin Md Noor (PM. Dr.)",
  "Ainolnaim bin Azizol (Dr.)",
  "Alia Farahin Abd Wahab (Dr.)",
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

const INITIAL_PROGRAMS = PROGRAM_CODES_RAW.map((p, i) => ({
  id: `prog-${i + 1}`,
  name: p,
  isHidden: false,
}));

const INITIAL_COURSES = rawCourses.map((c, i) => {
  const [code, ...nameParts] = c.split(" - ");
  return {
    id: `crs-${i + 1}`,
    code: code.trim(),
    name: nameParts.join(" - ").trim(),
    programs: [INITIAL_PROGRAMS[i % INITIAL_PROGRAMS.length].name],
    isHidden: false,
  };
});

const INITIAL_GROUPS = rawGroups.map((g, i) => ({
  id: `grp-${i + 1}`,
  department: getDeptFromGroup(g),
  groupName: g,
  studentCount: 15 + (i % 15),
  isHidden: false,
}));

const INITIAL_LECTURERS = rawLecturers.map((name, i) => {
  let depts = [DEPARTMENTS[i % DEPARTMENTS.length]];
  let ats = [];

  if (i === 0) {
    ats = [
      {
        id: "ats-test-1",
        courseCodes: ["CTU101", "MUB234"],
        courseNames: ["FUNDAMENTALS OF ISLAM", "MUSIC INDUSTRY MANAGEMENT"],
        programs: ["MU110"],
        groups: ["CAMU1101A"],
        contactHours: 8,
        ks: 8,
        k1Supervision: 4,
        k2Research: 4,
        k3Service: 5,
        remarks: "",
      },
    ];
  } else if (i === 1) {
    ats = [
      {
        id: "ats-test-2",
        courseCodes: ["CTU152"],
        courseNames: ["VALUES AND CIVILIZATION"],
        programs: ["MU111"],
        groups: ["CAMU1101B"],
        contactHours: 4,
        ks: 4,
        k1Supervision: 2,
        k2Research: 2,
        k3Service: 2,
        remarks: "",
      },
    ];
  } else if (i === 2) {
    ats = [
      {
        id: "ats-test-3",
        courseCodes: ["ENT311"],
        courseNames: ["ESSENTIALS OF ENTREPRENEURSHIP"],
        programs: ["MU220"],
        groups: ["CAMU1102A"],
        contactHours: 8,
        ks: 8,
        k1Supervision: 4,
        k2Research: 3,
        k3Service: 1,
        remarks: "",
      },
    ];
  } else if (i === 3) {
    ats = [
      {
        id: "ats-test-4",
        courseCodes: ["ENT311"],
        courseNames: ["ESSENTIALS OF ENTREPRENEURSHIP"],
        programs: ["MU220"],
        groups: ["CAMU1102B"],
        contactHours: 8,
        ks: 8,
        k1Supervision: 4,
        k2Research: 3,
        k3Service: 1,
        remarks: "",
      },
    ];
  }

  return {
    id: `lec-${i + 1}`,
    name,
    departments: depts,
    minATS: 16,
    maxATS: 18,
    position: "Lecturer",
    additionalInfo: "Pakar Rujuk Muzik Tradisional",
    remarks: "",
    atsEntries: ats,
    isHidden: false,
  };
});

const INITIAL_USERS = {
  admin: [{ id: "u-1", username: "admin1", password: "111" }],
  coordinator: [{ id: "u-2", username: "user1", password: "111" }],
  guest: [{ id: "u-3", username: "guest1", password: "111" }],
};

const COMMITTEE_CATEGORIES = [
  "Pengurusan",
  "Pengarah/Ketua/Koordinator/Penyelaras",
  "Unit Pentadbiran",
  "Unit HEA",
  "Unit HEP",
  "Unit PI",
];

const RAW_COMMITTEES = {
  Pengurusan: [
    "Dekan",
    "Timbalan Dekan (Hal Ehwal Akademik)",
    "Timbalan Dekan (Hal Ehwal Pelajar)",
    "Timbalan Dekan (Penyelidikan & Jaringan Industri)",
    "Ketua Pentadbiran",
  ],
  "Pengarah/Ketua/Koordinator/Penyelaras": [
    "Ketua Unit Kualiti",
    "Penyelaras Strategik dan Transformasi",
    "Penyelaras Unit Komunikasi Korporat",
    "Penyelaras Pengurusan Risiko",
    "Penyelaras Ruang & Fasiliti",
    "Penyelaras Perkhidmatan Muzik",
    "Penyelaras Akademie Muzika",
    "Penyelaras Pembelajaran Digital",
    "Pegawai Perhubungan Perpustakaan",
    "Penyelaras NOBLe",
  ],
  "Unit Pentadbiran": [
    "Jawatankuasa Eksekutif Fakulti (JEF)",
    "Jawatankuasa Mesyuarat Pengurusan Fakulti",
    "Panel Pembangunan Sumber Manusia (PPSM)",
    "Jawatankuasa Perancangan Dan Maklumat Strategik",
  ],
  "Unit HEA": [
    "Jawatankuasa Akademik Fakulti (JAF)",
    "Jawatankuasa Akademik Pengajian Pascasiswazah (JKAPS)",
    "Jawatankuasa Kecil Kurikulum Fakulti (JKKF)",
    "Jawatankuasa Pengajaran Dan Pembelajaran",
  ],
  "Unit HEP": [
    "Jawatankuasa Hal Ehwal Pelajar",
    "Jawatankuasa Tatatertib Fakulti Muzik",
    "Jawatankuasa Aktiviti Pelajar",
  ],
  "Unit PI": [
    "Jawatankuasa Penyelidikan Dan Jaringan Industri Fakulti",
    "Jawatankuasa Etika Penyelidikan",
    "Jawatankuasa Tabung Amanah Unit Penyelidikan Dan Perundingan",
  ],
};

let comIdCounter = 1;
const INITIAL_COMMITTEES = COMMITTEE_CATEGORIES.flatMap((cat) =>
  RAW_COMMITTEES[cat].map((name) => ({
    id: `com-${comIdCounter++}`,
    category: cat,
    name,
    members: [],
  }))
);

function getAtsTotal(lecturer) {
  if (!lecturer || !lecturer.atsEntries) return 0;
  return lecturer.atsEntries.reduce(
    (sum, entry) =>
      sum +
      Number(entry.ks || 0) +
      Number(entry.k1Supervision || 0) +
      Number(entry.k2Research || 0) +
      Number(entry.k3Service || 0),
    0
  );
}

function createBlankAtsEntry() {
  return {
    id: `ats-${Date.now()}`,
    courseCodes: [],
    courseNames: [],
    programs: [],
    groups: [],
    contactHours: 0,
    ks: 0,
    k1Supervision: 0,
    k2Research: 0,
    k3Service: 0,
    remarks: "",
  };
}

function AutocompleteMultiSelect({
  options = [],
  selected = [],
  onChange,
  placeholder,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const safeSelected = Array.isArray(selected) ? selected : [];

  const filteredOptions = (options || []).filter(
    (opt) =>
      opt &&
      opt.toLowerCase().includes((query || "").toLowerCase()) &&
      !safeSelected.includes(opt)
  );

  const handleSelect = (val) => {
    onChange([...safeSelected, val]);
    setQuery("");
    setIsOpen(false);
  };

  const handleRemove = (val) => {
    onChange(safeSelected.filter((item) => item !== val));
  };

  return (
    <div className="autocomplete-container">
      <div className="autocomplete-input-box" onClick={() => setIsOpen(true)}>
        {safeSelected.map((s) => (
          <span key={s} className="chip">
            {s}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(s);
              }}
            >
              ×
            </button>
          </span>
        ))}

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={safeSelected.length === 0 ? placeholder : ""}
          className="autocomplete-input"
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {filteredOptions.map((opt) => (
            <li
              key={opt}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(opt);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AutocompleteSingleSelect({
  options = [],
  selected = "",
  onChange,
  placeholder,
  onClear,
}) {
  const [query, setQuery] = useState(selected || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setQuery(selected || "");
  }, [selected]);

  const filteredOptions = (options || []).filter((opt) =>
    opt.toLowerCase().includes((query || "").toLowerCase())
  );

  const handleSelect = (val) => {
    onChange(val);
    setQuery(val);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
    setQuery("");
    if (onClear) onClear();
  };

  return (
    <div className="autocomplete-container">
      <div className="autocomplete-input-box single">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
            onChange(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="autocomplete-input"
        />
        {selected && (
          <button type="button" className="clear-btn" onClick={handleClear}>
            ×
          </button>
        )}
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {filteredOptions.map((opt) => (
            <li
              key={opt}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(opt);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const sortHiddenLast = (a, b) => {
  if (a.isHidden === b.isHidden) return 0;
  return a.isHidden ? 1 : -1;
};

export default function App() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [devPassword] = useState("openlah231787");
  const [lecturers, setLecturers] = useState(INITIAL_LECTURERS);
  const [coursesList, setCoursesList] = useState(INITIAL_COURSES);
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [programsList, setProgramsList] = useState(INITIAL_PROGRAMS);
  const [committees, setCommittees] = useState(INITIAL_COMMITTEES);

  const [archives, setArchives] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  const [globalInfo, setGlobalInfo] = useState({
    faculty: "Faculty of Music",
    semester: "Semester 2026/2",
    mode: "Draft",
  });

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
  const [comSettingsTab, setComSettingsTab] = useState(COMMITTEE_CATEGORIES[0]);
  const [isOtherCoursesOpen, setIsOtherCoursesOpen] = useState(false);
  const [isAddAtsModalOpen, setIsAddAtsModalOpen] = useState(false);
  const [newAtsDraft, setNewAtsDraft] = useState(createBlankAtsEntry());

  const [lecSearchName, setLecSearchName] = useState("");
  const [lecSearchDept, setLecSearchDept] = useState("");
  const [expandedLecturerId, setExpandedLecturerId] = useState(null);
  const [expandedCourseCode, setExpandedCourseCode] = useState(null);

  const [searchProgram, setSearchProgram] = useState("");
  const [searchCourse, setSearchCourse] = useState("");
  const [filterCourseDept, setFilterCourseDept] = useState("All");
  const [searchGroup, setSearchGroup] = useState("");
  const [filterGroupDept, setFilterGroupDept] = useState("All");
  const [searchLecturer, setSearchLecturer] = useState("");
  const [filterLecturerDept, setFilterLecturerDept] = useState("All");

  const [lecturerDraft, setLecturerDraft] = useState(null);
  const [courseDraft, setCourseDraft] = useState(null);
  const [programDraft, setProgramDraft] = useState(null);
  const [groupDraft, setGroupDraft] = useState(null);
  const [userDraft, setUserDraft] = useState(null);

  const [manageCommitteeData, setManageCommitteeData] = useState(null);
  const [newMemberDraft, setNewMemberDraft] = useState({
    lecturerName: "",
    position: "",
  });
  const [viewLecturerComsId, setViewLecturerComsId] = useState(null);

  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const isAdminOrDev =
    currentUser?.role === "admin" || currentUser?.role === "developer";

  const isReadOnly =
    (globalInfo.mode === "Completed" && !isAdminOrDev) ||
    currentUser?.role === "guest";

  const visibleLecturers = lecturers.filter((l) => !l.isHidden);
  const visibleCourses = coursesList.filter((c) => !c.isHidden);
  const visibleGroups = groups.filter((g) => !g.isHidden);
  const visiblePrograms = programsList.filter((p) => !p.isHidden);

  const filteredLecturers = useMemo(() => {
    return visibleLecturers.filter(
      (l) =>
        selectedDepartment === "All Departments" ||
        l.departments.includes(selectedDepartment)
    );
  }, [visibleLecturers, selectedDepartment]);

  const selectedLecturer =
    lecturers.find((l) => l.id === selectedLecturerId) || null;

  function confirmAction(title, message, onConfirm) {
    setConfirmConfig({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        if (onConfirm) onConfirm();
        setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
      },
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    setLoginError("");

    if (loginPassword === devPassword) {
      setCurrentUser({
        role: "developer",
        displayName: "Developer",
        id: "developer",
      });
      setScreen("dashboard");
      return;
    }

    const matchedUser = users[selectedLoginRole]?.find(
      (u) => u.username === loginUsername && u.password === loginPassword
    );

    if (!matchedUser) {
      setLoginError("Invalid username or password.");
      return;
    }

    setCurrentUser({
      role: selectedLoginRole,
      displayName: selectedLoginRole,
      id: matchedUser.username,
    });
    setScreen("dashboard");
  }

  function logActivity(actionDesc, undoData = null) {
    if (currentUser?.role === "developer") return;
    const timestamp = new Date().toLocaleString();
    const logEntry = {
      id: `log-${Date.now()}`,
      timestamp,
      user: currentUser?.id || "System",
      action: actionDesc,
      undoData,
    };
    setActivityLogs((prev) => [logEntry, ...prev]);
  }

  function undoToLog(logToRestore) {
    confirmAction("Undo Action", `Undo "${logToRestore.action}"?`, () => {
      const undo = logToRestore.undoData;
      if (!undo) return;

      if (undo.target === "lecturers") {
        if (undo.prev) {
          setLecturers((prev) =>
            prev.find((l) => l.id === undo.id)
              ? prev.map((l) => (l.id === undo.id ? undo.prev : l))
              : [...prev, undo.prev]
          );
        } else {
          setLecturers((prev) => prev.filter((l) => l.id !== undo.id));
        }
      } else if (undo.target === "courses") {
        if (undo.prev) {
          setCoursesList((prev) =>
            prev.find((c) => c.id === undo.id)
              ? prev.map((c) => (c.id === undo.id ? undo.prev : c))
              : [...prev, undo.prev]
          );
        } else {
          setCoursesList((prev) => prev.filter((c) => c.id !== undo.id));
        }
      } else if (undo.target === "groups") {
        if (undo.prev) {
          setGroups((prev) =>
            prev.find((g) => g.id === undo.id)
              ? prev.map((g) => (g.id === undo.id ? undo.prev : g))
              : [...prev, undo.prev]
          );
        } else {
          setGroups((prev) => prev.filter((g) => g.id !== undo.id));
        }
      } else if (undo.target === "programs") {
        if (undo.prev) {
          setProgramsList((prev) =>
            prev.find((p) => p.id === undo.id)
              ? prev.map((p) => (p.id === undo.id ? undo.prev : p))
              : [...prev, undo.prev]
          );
        } else {
          setProgramsList((prev) => prev.filter((p) => p.id !== undo.id));
        }
      } else if (undo.target === "users") {
        if (undo.prev) {
          setUsers((prev) => {
            const next = { ...prev };
            const roleArr = next[undo.role] || [];
            next[undo.role] = roleArr.find((u) => u.id === undo.id)
              ? roleArr.map((u) => (u.id === undo.id ? undo.prev : u))
              : [...roleArr, undo.prev];
            return next;
          });
        } else {
          setUsers((prev) => ({
            ...prev,
            [undo.role]: (prev[undo.role] || []).filter((u) => u.id !== undo.id),
          }));
        }
      }

      setActivityLogs((prev) => prev.filter((l) => l.id !== logToRestore.id));
    });
  }

  function toggleHide(type, id) {
    if (type === "lecturer") {
      const target = lecturers.find((l) => l.id === id);
      if (!target) return;
      logActivity(
        `${target.isHidden ? "Unhidden" : "Hidden"} Lecturer ${target.name}`,
        { target: "lecturers", id, prev: target }
      );
      setLecturers((prev) =>
        prev.map((l) => (l.id === id ? { ...l, isHidden: !l.isHidden } : l))
      );
    } else if (type === "course") {
      const target = coursesList.find((c) => c.id === id);
      if (!target) return;
      logActivity(
        `${target.isHidden ? "Unhidden" : "Hidden"} Course ${target.code}`,
        { target: "courses", id, prev: target }
      );
      setCoursesList((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isHidden: !c.isHidden } : c))
      );
    } else if (type === "program") {
      const target = programsList.find((p) => p.id === id);
      if (!target) return;
      logActivity(
        `${target.isHidden ? "Unhidden" : "Hidden"} Program ${target.name}`,
        { target: "programs", id, prev: target }
      );
      setProgramsList((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isHidden: !p.isHidden } : p))
      );
    } else if (type === "group") {
      const target = groups.find((g) => g.id === id);
      if (!target) return;
      logActivity(
        `${target.isHidden ? "Unhidden" : "Hidden"} Group ${target.groupName}`,
        { target: "groups", id, prev: target }
      );
      setGroups((prev) =>
        prev.map((g) => (g.id === id ? { ...g, isHidden: !g.isHidden } : g))
      );
    }
  }

  function handleAtsCourseCodesChange(val) {
    const matchedNames = [];
    val.forEach((code) => {
      const c = visibleCourses.find((course) => course.code === code);
      if (c && !matchedNames.includes(c.name)) matchedNames.push(c.name);
    });
    setNewAtsDraft((prev) => ({
      ...prev,
      courseCodes: val,
      courseNames: matchedNames,
    }));
  }

  function handleAtsCourseNamesChange(val) {
    const matchedCodes = [];
    val.forEach((name) => {
      const c = visibleCourses.find((course) => course.name === name);
      if (c && !matchedCodes.includes(c.code)) matchedCodes.push(c.code);
    });
    setNewAtsDraft((prev) => ({
      ...prev,
      courseNames: val,
      courseCodes: matchedCodes,
    }));
  }

  function openEditAtsEntry(entry) {
    setNewAtsDraft({ ...entry });
    setIsAddAtsModalOpen(true);
  }

  function saveAtsEntry() {
    if (!selectedLecturerId) return;
    const prevLecturer = lecturers.find((l) => l.id === selectedLecturerId);
    logActivity(`Updated ATS Entry for ${selectedLecturer?.name}`, {
      target: "lecturers",
      id: selectedLecturerId,
      prev: prevLecturer,
    });

    setLecturers((prev) =>
      prev.map((l) => {
        if (l.id !== selectedLecturerId) return l;
        const exists = l.atsEntries.find((e) => e.id === newAtsDraft.id);
        if (exists) {
          return {
            ...l,
            atsEntries: l.atsEntries.map((e) =>
              e.id === newAtsDraft.id ? newAtsDraft : e
            ),
          };
        }
        return { ...l, atsEntries: [...l.atsEntries, newAtsDraft] };
      })
    );

    setIsAddAtsModalOpen(false);
    setNewAtsDraft(createBlankAtsEntry());
  }

  function deleteAtsEntry(entryId) {
    confirmAction(
      "Delete ATS Entry",
      "Are you sure you want to remove this course assignment?",
      () => {
        const prevLecturer = lecturers.find((l) => l.id === selectedLecturerId);
        logActivity(`Deleted an ATS Entry for ${selectedLecturer?.name}`, {
          target: "lecturers",
          id: selectedLecturerId,
          prev: prevLecturer,
        });

        setLecturers((prev) =>
          prev.map((l) =>
            l.id === selectedLecturerId
              ? {
                  ...l,
                  atsEntries: l.atsEntries.filter((e) => e.id !== entryId),
                }
              : l
          )
        );
      }
    );
  }

  function getGroupDisplay(groupName) {
    if (!groupName) return "-";
    const groupObj = groups.find((g) => g.groupName === groupName);
    return groupObj
      ? `${groupName} (${groupObj.studentCount || 0})`
      : groupName;
  }

  function getLecturerCommittees(lecId) {
    const involved = [];
    committees.forEach((c) => {
      const isMem = c.members.find((m) => m.lecturerId === lecId);
      if (isMem) {
        involved.push({
          category: c.category,
          committeeName: c.name,
          position: isMem.position,
        });
      }
    });
    return involved;
  }

  function openEditLecturer(lecturer) {
    setLecturerDraft(
      lecturer
        ? { ...lecturer }
        : {
            id: `lec-${Date.now()}`,
            name: "",
            departments: [],
            minATS: 16,
            maxATS: 18,
            position: "Lecturer",
            additionalInfo: "",
            remarks: "",
            atsEntries: [],
            isHidden: false,
          }
    );
  }

  function saveLecturer() {
    if (!lecturerDraft?.name?.trim()) return;
    const prevObj = lecturers.find((l) => l.id === lecturerDraft.id) || null;
    logActivity(`Saved Lecturer ${lecturerDraft.name}`, {
      target: "lecturers",
      id: lecturerDraft.id,
      prev: prevObj,
    });

    setLecturers((prev) =>
      prev.find((l) => l.id === lecturerDraft.id)
        ? prev.map((l) => (l.id === lecturerDraft.id ? lecturerDraft : l))
        : [...prev, lecturerDraft]
    );
    setLecturerDraft(null);
  }

  function deleteLecturer(id) {
    confirmAction(
      "Delete Lecturer",
      "Are you sure? This will remove all their ATS records.",
      () => {
        const deletedObj = lecturers.find((l) => l.id === id);
        logActivity(`Deleted Lecturer ${deletedObj?.name || id}`, {
          target: "lecturers",
          id,
          prev: deletedObj,
        });
        setLecturers((prev) => prev.filter((l) => l.id !== id));
        setCommittees((prev) =>
          prev.map((c) => ({
            ...c,
            members: c.members.filter((m) => m.lecturerId !== id),
          }))
        );
      }
    );
  }

  function openEditCourse(course) {
    setCourseDraft(
      course
        ? { ...course }
        : {
            id: `crs-${Date.now()}`,
            code: "",
            name: "",
            programs: [],
            isHidden: false,
          }
    );
  }

  function saveCourse() {
    if (!courseDraft?.code?.trim() || !courseDraft?.name?.trim()) return;
    const prevObj = coursesList.find((c) => c.id === courseDraft.id) || null;
    logActivity(`Saved Course ${courseDraft.code}`, {
      target: "courses",
      id: courseDraft.id,
      prev: prevObj,
    });

    setCoursesList((prev) =>
      prev.find((c) => c.id === courseDraft.id)
        ? prev.map((c) => (c.id === courseDraft.id ? courseDraft : c))
        : [...prev, courseDraft]
    );
    setCourseDraft(null);
  }

  function deleteCourse(id) {
    confirmAction("Delete Course", "Delete this course?", () => {
      const deletedObj = coursesList.find((c) => c.id === id);
      logActivity(`Deleted Course ${deletedObj?.code || id}`, {
        target: "courses",
        id,
        prev: deletedObj,
      });
      setCoursesList((prev) => prev.filter((c) => c.id !== id));
    });
  }

  function openEditProgram(prog) {
    setProgramDraft(
      prog
        ? { ...prog }
        : {
            id: `prog-${Date.now()}`,
            name: "",
            isHidden: false,
          }
    );
  }

  function saveProgram() {
    if (!programDraft?.name?.trim()) return;
    const prevObj = programsList.find((p) => p.id === programDraft.id) || null;
    logActivity(`Saved Program ${programDraft.name}`, {
      target: "programs",
      id: programDraft.id,
      prev: prevObj,
    });

    setProgramsList((prev) =>
      prev.find((p) => p.id === programDraft.id)
        ? prev.map((p) => (p.id === programDraft.id ? programDraft : p))
        : [...prev, programDraft]
    );
    setProgramDraft(null);
  }

  function deleteProgram(id) {
    confirmAction("Delete Program", "Delete this program?", () => {
      const deletedObj = programsList.find((p) => p.id === id);
      logActivity(`Deleted Program ${deletedObj?.name || id}`, {
        target: "programs",
        id,
        prev: deletedObj,
      });
      setProgramsList((prev) => prev.filter((p) => p.id !== id));
    });
  }

  function openEditGroup(group) {
    setGroupDraft(
      group
        ? { ...group }
        : {
            id: `grp-${Date.now()}`,
            department: visiblePrograms.length > 0 ? visiblePrograms[0].name : "",
            groupName: "",
            studentCount: 0,
            isHidden: false,
          }
    );
  }

  function saveGroup() {
    if (!groupDraft?.groupName?.trim()) return;
    const prevObj = groups.find((g) => g.id === groupDraft.id) || null;
    logActivity(`Saved Group ${groupDraft.groupName}`, {
      target: "groups",
      id: groupDraft.id,
      prev: prevObj,
    });

    setGroups((prev) =>
      prev.find((g) => g.id === groupDraft.id)
        ? prev.map((g) => (g.id === groupDraft.id ? groupDraft : g))
        : [...prev, groupDraft]
    );
    setGroupDraft(null);
  }

  function deleteGroup(id) {
    confirmAction("Delete Group", "Remove this group?", () => {
      const deletedObj = groups.find((g) => g.id === id);
      logActivity(`Deleted Group ${deletedObj?.groupName || id}`, {
        target: "groups",
        id,
        prev: deletedObj,
      });
      setGroups((prev) => prev.filter((g) => g.id !== id));
    });
  }

  function openEditUser(role, user) {
    setUserDraft(
      user
        ? { ...user, role }
        : {
            id: `u-${Date.now()}`,
            username: "",
            password: "",
            role,
          }
    );
  }

  function saveUser() {
    if (!userDraft?.username?.trim() || !userDraft?.password?.trim()) return;
    const prevObj =
      users[userDraft.role]?.find((u) => u.id === userDraft.id) || null;

    logActivity(`Saved User ${userDraft.username}`, {
      target: "users",
      role: userDraft.role,
      id: userDraft.id,
      prev: prevObj,
    });

    setUsers((prev) => {
      const newUsers = { ...prev };
      const roleArr = newUsers[userDraft.role] || [];
      newUsers[userDraft.role] = roleArr.find((u) => u.id === userDraft.id)
        ? roleArr.map((u) => (u.id === userDraft.id ? userDraft : u))
        : [...roleArr, userDraft];
      return newUsers;
    });

    setUserDraft(null);
  }

  function deleteUser(role, id) {
    confirmAction("Delete User", "Remove this user access?", () => {
      const deletedObj = users[role]?.find((u) => u.id === id);
      logActivity(`Deleted User ID ${id}`, {
        target: "users",
        role,
        id,
        prev: deletedObj,
      });
      setUsers((prev) => ({
        ...prev,
        [role]: (prev[role] || []).filter((u) => u.id !== id),
      }));
    });
  }

  function saveCommitteeMember() {
    if (!newMemberDraft.lecturerName) return;

    const lec = lecturers.find((l) => l.name === newMemberDraft.lecturerName);
    if (!lec || !manageCommitteeData) return;

    setCommittees((prev) =>
      prev.map((c) => {
        if (c.id !== manageCommitteeData.id) return c;
        const updatedMems = c.members.filter((m) => m.lecturerId !== lec.id);
        return {
          ...c,
          members: [
            ...updatedMems,
            {
              lecturerId: lec.id,
              position: newMemberDraft.position || "Ahli Jawatankuasa",
            },
          ],
        };
      })
    );

    setManageCommitteeData((prev) => {
      if (!prev) return prev;
      const updatedMems = prev.members.filter((m) => m.lecturerId !== lec.id);
      return {
        ...prev,
        members: [
          ...updatedMems,
          {
            lecturerId: lec.id,
            position: newMemberDraft.position || "Ahli Jawatankuasa",
          },
        ],
      };
    });

    logActivity(`Assigned ${lec.name} to Committee ${manageCommitteeData.name}`, null);
    setNewMemberDraft({ lecturerName: "", position: "" });
  }

  function deleteCommitteeMember(lecId) {
    if (!manageCommitteeData) return;
    setCommittees((prev) =>
      prev.map((c) =>
        c.id === manageCommitteeData.id
          ? {
              ...c,
              members: c.members.filter((m) => m.lecturerId !== lecId),
            }
          : c
      )
    );

    setManageCommitteeData((prev) =>
      prev
        ? {
            ...prev,
            members: prev.members.filter((m) => m.lecturerId !== lecId),
          }
        : prev
    );

    logActivity(`Removed a member from Committee ${manageCommitteeData.name}`, null);
  }

  function archiveSemester() {
    confirmAction(
      "Archive Semester",
      `Archive all current data as ${globalInfo.semester}?`,
      () => {
        const snapshot = {
          id: `arch-${Date.now()}`,
          dateArchived: new Date().toLocaleString(),
          semester: globalInfo.semester,
          data: {
            lecturers,
            coursesList,
            groups,
            programsList,
            committees,
          },
        };
        setArchives((prev) => [snapshot, ...prev]);
        logActivity(`Archived Semester ${globalInfo.semester}`, null);
      }
    );
  }

  function loadArchive(arch) {
    confirmAction(
      "Load Archive",
      `Load data from ${arch.semester}? Current unsaved changes will be overridden.`,
      () => {
        logActivity(`Loaded Archive ${arch.semester}`, null);
        setLecturers(arch.data.lecturers || []);
        setCoursesList(arch.data.coursesList || []);
        setGroups(arch.data.groups || []);
        setProgramsList(arch.data.programsList || []);
        setCommittees(arch.data.committees || INITIAL_COMMITTEES);
        setGlobalInfo((prev) => ({ ...prev, semester: arch.semester }));
      }
    );
  }

  function deleteArchive(id) {
    confirmAction("Delete Archive", "Are you sure?", () => {
      setArchives((prev) => prev.filter((a) => a.id !== id));
      logActivity(`Deleted Archive ID ${id}`, null);
    });
  }

  const lecturersStatus = visibleLecturers
    .map((l) => {
      const total = getAtsTotal(l);
      let status = "Normal";
      if (total === 0) status = "No ATS";
      else if (total > l.maxATS) status = "Overload";
      else if (total < l.minATS) status = "Underload";
      return { ...l, total, status };
    })
    .filter((l) => l.status !== "Normal");

  const courseUsage = visibleCourses.map((c) => {
    const assignedLecturers = visibleLecturers.filter((l) =>
      l.atsEntries.some((e) => e.courseCodes.includes(c.code))
    );
    return { ...c, assignedLecturers };
  });

  const unassignedCourses = courseUsage.filter(
    (c) => c.assignedLecturers.length === 0
  );
  const overAssignedCourses = courseUsage.filter(
    (c) => c.assignedLecturers.length > 1
  );

  function renderSidebar() {
    return (
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div className="brand-mark">ATS</div>
            <h2>Planner</h2>
          </div>
          <div className="sidebar-sub-brand">
            <p>{globalInfo.faculty}</p>
            <p>{globalInfo.semester}</p>
            <span className={`mode-badge ${globalInfo.mode.toLowerCase()}`}>
              {globalInfo.mode} Mode
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-link ${screen === "dashboard" ? "active" : ""}`}
            onClick={() => setScreen("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`nav-link ${screen === "groupInfo" ? "active" : ""}`}
            onClick={() => setScreen("groupInfo")}
          >
            Group Info
          </button>

          <button
            className={`nav-link ${screen === "lecturerAts" ? "active" : ""}`}
            onClick={() => setScreen("lecturerAts")}
          >
            Lecturer ATS
          </button>

          <div className="other-courses-dropdown">
            <button
              className="nav-link dropdown-toggle"
              onClick={() => setIsOtherCoursesOpen(!isOtherCoursesOpen)}
              style={{ width: "100%" }}
            >
              Other Courses {isOtherCoursesOpen ? "▾" : "▸"}
            </button>

            {isOtherCoursesOpen && (
              <div className="dropdown-menu">
                <button
                  className={`nav-link sub-link ${screen === "muf" ? "active" : ""}`}
                  onClick={() => setScreen("muf")}
                >
                  MUF Codes
                </button>
                <button
                  className={`nav-link sub-link ${
                    screen === "performing" ? "active" : ""
                  }`}
                  onClick={() => setScreen("performing")}
                >
                  Performing Groups
                </button>
                <button
                  className={`nav-link sub-link ${
                    screen === "servicing" ? "active" : ""
                  }`}
                  onClick={() => setScreen("servicing")}
                >
                  Servicing Codes
                </button>
                <button
                  className={`nav-link sub-link ${
                    screen === "forum" ? "active" : ""
                  }`}
                  onClick={() => setScreen("forum")}
                >
                  Forum/Colloquium
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-status-text">
            Logged in as{" "}
            <strong>
              {currentUser?.displayName}{" "}
              {currentUser?.role === "developer" ? "(Ghost)" : ""}
            </strong>
          </div>

          {isAdminOrDev && (
            <button
              className={`ghost-button footer-btn ${
                screen === "settings" ? "active" : ""
              }`}
              onClick={() => setScreen("settings")}
            >
              Settings / Admin
            </button>
          )}

          <button
            className="ghost-button red footer-btn"
            onClick={() =>
              confirmAction("Sign Out", "Are you sure you want to sign out?", () => {
                setCurrentUser(null);
                setScreen("login");
              })
            }
          >
            Sign out
          </button>
        </div>
      </aside>
    );
  }

  function renderConfirmModal() {
    if (!confirmConfig.isOpen) return null;

    return (
      <div className="global-overlay" style={{ zIndex: 10000 }}>
        <div className="modal-content center-modal" style={{ maxWidth: "400px" }}>
          <div className="modal-header">
            <h3>{confirmConfig.title}</h3>
          </div>

          <div className="modal-body">
            <p>{confirmConfig.message}</p>
          </div>

          <div className="modal-footer" style={{ display: "flex", gap: "1rem" }}>
            <button
              className="ghost-button full-width"
              onClick={() =>
                setConfirmConfig((prev) => ({ ...prev, isOpen: false }))
              }
            >
              Cancel
            </button>
            <button
              className="primary-button full-width"
              style={{ background: "linear-gradient(135deg, #ff6384, #ff8a9f)" }}
              onClick={confirmConfig.onConfirm}
            >
              Confirm
            </button>
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
            <h3>
              {newAtsDraft.id.startsWith("ats-") && newAtsDraft.courseCodes.length > 0
                ? "Edit"
                : "Add"}{" "}
              ATS Entry for {selectedLecturer?.name || "Lecturer"}
            </h3>
            <button
              className="ghost-button compact"
              onClick={() => setIsAddAtsModalOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="modal-body">
            <div className="ats-grid-row-1">
              <label className="field">
                <span>Course Codes</span>
                <AutocompleteMultiSelect
                  options={visibleCourses.map((c) => c.code)}
                  selected={newAtsDraft.courseCodes}
                  onChange={handleAtsCourseCodesChange}
                  placeholder="Search codes..."
                />
              </label>

              <label className="field">
                <span>Course Names</span>
                <AutocompleteMultiSelect
                  options={visibleCourses.map((c) => c.name)}
                  selected={newAtsDraft.courseNames}
                  onChange={handleAtsCourseNamesChange}
                  placeholder="Search names..."
                />
              </label>

              <label className="field">
                <span>Programs</span>
                <AutocompleteMultiSelect
                  options={visiblePrograms.map((p) => p.name)}
                  selected={newAtsDraft.programs}
                  onChange={(val) =>
                    setNewAtsDraft((prev) => ({ ...prev, programs: val }))
                  }
                  placeholder="Search programs..."
                />
              </label>
            </div>

            <div className="ats-grid-row-2">
              <label className="field">
                <span>Groups</span>
                <AutocompleteMultiSelect
                  options={visibleGroups.map((g) => g.groupName)}
                  selected={newAtsDraft.groups}
                  onChange={(val) =>
                    setNewAtsDraft((prev) => ({ ...prev, groups: val }))
                  }
                  placeholder="Search groups..."
                />
              </label>

              <label className="field tight-input">
                <span>Contact Hours</span>
                <input
                  type="number"
                  value={newAtsDraft.contactHours}
                  onChange={(e) =>
                    setNewAtsDraft((prev) => ({
                      ...prev,
                      contactHours: Number(e.target.value),
                    }))
                  }
                />
              </label>

              <label className="field tight-input">
                <span>KS</span>
                <input
                  type="number"
                  value={newAtsDraft.ks}
                  onChange={(e) =>
                    setNewAtsDraft((prev) => ({
                      ...prev,
                      ks: Number(e.target.value),
                    }))
                  }
                />
              </label>
            </div>

            <div className="ats-grid-row-3">
              <label className="field tight-input">
                <span>K1 Supervision</span>
                <input
                  type="number"
                  value={newAtsDraft.k1Supervision}
                  onChange={(e) =>
                    setNewAtsDraft((prev) => ({
                      ...prev,
                      k1Supervision: Number(e.target.value),
                    }))
                  }
                />
              </label>

              <label className="field tight-input">
                <span>K2 Research</span>
                <input
                  type="number"
                  value={newAtsDraft.k2Research}
                  onChange={(e) =>
                    setNewAtsDraft((prev) => ({
                      ...prev,
                      k2Research: Number(e.target.value),
                    }))
                  }
                />
              </label>

              <label className="field tight-input">
                <span>K3 Service</span>
                <input
                  type="number"
                  value={newAtsDraft.k3Service}
                  onChange={(e) =>
                    setNewAtsDraft((prev) => ({
                      ...prev,
                      k3Service: Number(e.target.value),
                    }))
                  }
                />
              </label>
            </div>

            <div className="ats-grid-row-4">
              <label className="field" style={{ gridColumn: "span 2" }}>
                <span>Remarks</span>
                <textarea
                  rows="3"
                  value={newAtsDraft.remarks}
                  onChange={(e) =>
                    setNewAtsDraft((prev) => ({
                      ...prev,
                      remarks: e.target.value,
                    }))
                  }
                  placeholder="Remarks..."
                />
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button className="primary-button full-width" onClick={saveAtsEntry}>
              Save ATS Entry
            </button>
          </div>
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
            <h3>
              {lecturerDraft.id.startsWith("lec-") && lecturerDraft.name
                ? "Edit Lecturer"
                : "Add New Lecturer"}
            </h3>
            <button
              className="ghost-button compact"
              onClick={() => setLecturerDraft(null)}
            >
              Close
            </button>
          </div>

          <div className="modal-body">
            <div className="form-grid three-cols">
              <label className="field">
                <span>Name</span>
                <input
                  type="text"
                  value={lecturerDraft.name}
                  onChange={(e) =>
                    setLecturerDraft((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </label>

              <label className="field">
                <span>Position</span>
                <select
                  value={lecturerDraft.position}
                  onChange={(e) =>
                    setLecturerDraft((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Position...</option>
                  {POSITION_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Departments</span>
                <AutocompleteMultiSelect
                  options={DEPARTMENTS}
                  selected={lecturerDraft.departments}
                  onChange={(val) =>
                    setLecturerDraft((prev) => ({ ...prev, departments: val }))
                  }
                  placeholder="Add department..."
                />
              </label>
            </div>

            <div className="form-grid three-cols" style={{ marginTop: "1rem" }}>
              <label className="field tight-input">
                <span>Min ATS</span>
                <input
                  type="number"
                  value={lecturerDraft.minATS}
                  onChange={(e) =>
                    setLecturerDraft((prev) => ({
                      ...prev,
                      minATS: Number(e.target.value),
                    }))
                  }
                />
              </label>

              <label className="field tight-input">
                <span>Max ATS</span>
                <input
                  type="number"
                  value={lecturerDraft.maxATS}
                  onChange={(e) =>
                    setLecturerDraft((prev) => ({
                      ...prev,
                      maxATS: Number(e.target.value),
                    }))
                  }
                />
              </label>

              <label className="field">
                <span>Expertise</span>
                <input
                  type="text"
                  value={lecturerDraft.additionalInfo}
                  onChange={(e) =>
                    setLecturerDraft((prev) => ({
                      ...prev,
                      additionalInfo: e.target.value,
                    }))
                  }
                  placeholder="e.g. Pakar Muzik Tradisional"
                />
              </label>
            </div>

            <div className="ats-grid-row-4">
              <label className="field" style={{ gridColumn: "span 2" }}>
                <span>Remarks</span>
                <textarea
                  rows="2"
                  value={lecturerDraft.remarks}
                  onChange={(e) =>
                    setLecturerDraft((prev) => ({
                      ...prev,
                      remarks: e.target.value,
                    }))
                  }
                />
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button className="primary-button full-width" onClick={saveLecturer}>
              Save Lecturer
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderCourseModal() {
    if (!courseDraft) return null;

    return (
      <div className="global-overlay">
        <div className="modal-content center-modal" style={{ maxWidth: "500px" }}>
          <div className="modal-header">
            <h3>
              {courseDraft.id.startsWith("crs-") && courseDraft.code
                ? "Edit Course"
                : "Add New Course"}
            </h3>
            <button
              className="ghost-button compact"
              onClick={() => setCourseDraft(null)}
            >
              Close
            </button>
          </div>

          <div className="modal-body">
            <div className="form-grid">
              <label className="field">
                <span>Course Code</span>
                <input
                  type="text"
                  value={courseDraft.code}
                  onChange={(e) =>
                    setCourseDraft((prev) => ({
                      ...prev,
                      code: e.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="e.g. MUF101"
                />
              </label>

              <label className="field">
                <span>Course Name</span>
                <input
                  type="text"
                  value={courseDraft.name}
                  onChange={(e) =>
                    setCourseDraft((prev) => ({
                      ...prev,
                      name: e.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="e.g. INTRO TO MUSIC"
                />
              </label>

              <label className="field">
                <span>Programs</span>
                <AutocompleteMultiSelect
                  options={visiblePrograms.map((p) => p.name)}
                  selected={courseDraft.programs}
                  onChange={(val) =>
                    setCourseDraft((prev) => ({ ...prev, programs: val }))
                  }
                  placeholder="Add programs..."
                />
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button className="primary-button full-width" onClick={saveCourse}>
              Save Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderManageCommitteeModal() {
    if (!manageCommitteeData) return null;

    return (
      <div className="global-overlay">
        <div className="modal-content center-modal" style={{ maxWidth: "600px" }}>
          <div className="modal-header">
            <h3>Manage {manageCommitteeData.name}</h3>
            <button
              className="ghost-button compact"
              onClick={() => setManageCommitteeData(null)}
            >
              Close
            </button>
          </div>

          <div className="modal-body">
            <div
              style={{
                background: "#0b1530",
                padding: "1rem",
                borderRadius: "12px",
                border: "1px solid #243250",
                marginBottom: "1.5rem",
              }}
            >
              <h4 style={{ margin: "0 0 1rem" }}>Add Lecturer to Committee</h4>

              <div
                className="form-grid"
                style={{ gridTemplateColumns: "2fr 1fr" }}
              >
                <label className="field">
                  <span>Lecturer</span>
                  <AutocompleteSingleSelect
                    options={visibleLecturers.map((l) => l.name)}
                    selected={newMemberDraft.lecturerName}
                    onChange={(val) =>
                      setNewMemberDraft((prev) => ({
                        ...prev,
                        lecturerName: val,
                      }))
                    }
                    placeholder="Type name..."
                  />
                </label>

                <label className="field">
                  <span>Position</span>
                  <input
                    type="text"
                    value={newMemberDraft.position}
                    onChange={(e) =>
                      setNewMemberDraft((prev) => ({
                        ...prev,
                        position: e.target.value,
                      }))
                    }
                    placeholder="e.g. AJK"
                  />
                </label>
              </div>

              <button
                className="primary-button compact"
                style={{ marginTop: "0.5rem" }}
                onClick={saveCommitteeMember}
              >
                Add Member
              </button>
            </div>

            <h4>Current Members</h4>

            <div className="table-wrapper">
              <table className="tight-table data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {manageCommitteeData.members.map((m, idx) => {
                    const lObj = lecturers.find((x) => x.id === m.lecturerId);
                    return (
                      <tr key={idx}>
                        <td>{lObj ? lObj.name : m.lecturerId}</td>
                        <td>{m.position}</td>
                        <td>
                          <button
                            className="ghost-button compact red"
                            onClick={() => deleteCommitteeMember(m.lecturerId)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {manageCommitteeData.members.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center muted-copy">
                        No members assigned yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderViewComsModal() {
    if (!viewLecturerComsId) return null;
    const lObj = lecturers.find((l) => l.id === viewLecturerComsId);
    if (!lObj) return null;

    const coms = getLecturerCommittees(lObj.id);

    return (
      <div className="global-overlay" style={{ zIndex: 10000 }}>
        <div className="modal-content center-modal" style={{ maxWidth: "500px" }}>
          <div className="modal-header">
            <h3>Jawatankuasa {lObj.name}</h3>
            <button
              className="ghost-button compact"
              onClick={() => setViewLecturerComsId(null)}
            >
              Tutup
            </button>
          </div>

          <div className="modal-body">
            {coms.length > 0 ? (
              <ol style={{ paddingLeft: "1.5rem", margin: 0 }}>
                {coms.map((c, i) => (
                  <li key={i} style={{ marginBottom: "0.8rem" }}>
                    <strong>{c.committeeName}</strong>{" "}
                    <span style={{ fontSize: "0.85rem", color: "#a8b5d6" }}>
                      {c.category}
                    </span>
                    <br />
                    <span
                      className="pill"
                      style={{ marginTop: "0.3rem", display: "inline-block" }}
                    >
                      {c.position}
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="muted-copy text-center">
                Tiada penglibatan jawatankuasa direkodkan.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  function renderMainContent() {
    if (screen === "dashboard") {
      const counts = {
        overload: lecturersStatus.filter((l) => l.status === "Overload").length,
        underload: lecturersStatus.filter((l) => l.status === "Underload").length,
        noAts: lecturersStatus.filter((l) => l.status === "No ATS").length,
      };

      return (
        <section className="page-grid">
          <div className="panel panel-wide dashboard-banner">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <p className="eyebrow" style={{ color: "#fff", opacity: 0.8 }}>
                  Keseluruhan
                </p>
                <h2 style={{ margin: "0.2rem 0", fontSize: "1.8rem" }}>
                  Overview Dashboard Insights
                </h2>
              </div>

              <button
                className="primary-button"
                onClick={() => setScreen("allLecturersAts")}
              >
                View All Lecturers ATS
              </button>
            </div>
          </div>

          <div
            className="dashboard-grid-stacked"
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div
              className="panel"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>Load Warnings</h3>
                <p
                  className="muted-copy"
                  style={{ fontSize: "0.9rem", margin: "0.2rem 0 0" }}
                >
                  <strong>{counts.overload}</strong> Overload &nbsp;&nbsp;
                  <strong>{counts.underload}</strong> Underload &nbsp;&nbsp;
                  <strong>{counts.noAts}</strong> No ATS
                </p>
              </div>
              <button
                className="ghost-button"
                onClick={() => setScreen("loadWarningsDetails")}
              >
                View Full Data
              </button>
            </div>

            <div
              className="panel"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>Over-assigned Courses</h3>
                <p
                  className="muted-copy"
                  style={{ fontSize: "0.9rem", margin: "0.2rem 0 0" }}
                >
                  <strong>{overAssignedCourses.length}</strong> course(s) assigned
                  to multiple lecturers.
                </p>
              </div>
              <button
                className="ghost-button"
                onClick={() => setScreen("overAssignedDetails")}
              >
                View Full Data
              </button>
            </div>

            <div
              className="panel"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>Unassigned Courses</h3>
                <p
                  className="muted-copy"
                  style={{ fontSize: "0.9rem", margin: "0.2rem 0 0" }}
                >
                  <strong>{unassignedCourses.length}</strong> active course(s) not
                  linked to any ATS.
                </p>
              </div>
              <button
                className="ghost-button"
                onClick={() => setScreen("unassignedDetails")}
              >
                View Full Data
              </button>
            </div>
          </div>
        </section>
      );
    }

    if (screen === "loadWarningsDetails") {
      return (
        <section className="page-grid">
          <div className="panel panel-wide">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3>Load Warnings - Full Data</h3>
              <button
                className="ghost-button compact"
                onClick={() => setScreen("dashboard")}
              >
                Back to Dashboard
              </button>
            </div>

            <div className="tight-table-wrapper" style={{ overflowX: "auto" }}>
              <table className="tight-table data-table">
                <thead>
                  <tr>
                    <th>Lecturer</th>
                    <th>Total ATS</th>
                    <th>Limits</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lecturersStatus.map((l) => (
                    <tr key={l.id}>
                      <td>
                        <button
                          className="link-button"
                          onClick={() => {
                            setSelectedLecturerId(l.id);
                            setScreen("lecturerAts");
                          }}
                        >
                          <strong>{l.name}</strong>
                        </button>
                      </td>
                      <td>{l.total}</td>
                      <td>
                        {l.minATS} - {l.maxATS}
                      </td>
                      <td>
                        <span
                          className={`status-pill ${l.status
                            .replace(/\s/g, "-")
                            .toLowerCase()}`}
                        >
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {lecturersStatus.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center muted-copy">
                        All lecturers within limits.
                      </td>
                    </tr>
                  )}
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3>Over-assigned Courses - Full Data</h3>
              <button
                className="ghost-button compact"
                onClick={() => setScreen("dashboard")}
              >
                Back to Dashboard
              </button>
            </div>

            <div className="tight-table-wrapper" style={{ overflowX: "auto" }}>
              <table className="tight-table data-table">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Lecturers Assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {overAssignedCourses.map((c) => {
                    const isExp = expandedCourseCode === c.code;
                    return (
                      <React.Fragment key={c.code}>
                        <tr
                          className={`expanded-row-parent ${isExp ? "active" : ""}`}
                          style={{
                            background: isExp
                              ? "rgba(94, 140, 255, 0.15)"
                              : undefined,
                          }}
                        >
                          <td>
                            <button
                              className="link-button"
                              onClick={() =>
                                setExpandedCourseCode(isExp ? null : c.code)
                              }
                            >
                              <strong>{c.code}</strong>
                            </button>
                          </td>
                          <td>{c.name}</td>
                          <td>
                            <span className="pill">
                              {c.assignedLecturers.length} Staff
                            </span>
                          </td>
                        </tr>

                        {isExp && (
                          <tr className="expanded-row-child">
                            <td
                              colSpan="3"
                              style={{
                                padding: "0.8rem",
                                background: "#020813",
                                borderLeft: "2px solid #ff9f40",
                              }}
                            >
                              <p
                                style={{
                                  margin: "0 0 0.5rem 0",
                                  fontSize: "0.8rem",
                                  color: "#8fa4d8",
                                }}
                              >
                                Lecturers handling {c.code}:
                              </p>
                              <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                                {c.assignedLecturers.map((l) => (
                                  <li key={l.id}>{l.name}</li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {overAssignedCourses.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center muted-copy">
                        No overlapping courses.
                      </td>
                    </tr>
                  )}
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3>Unassigned Courses - Full Data</h3>
              <button
                className="ghost-button compact"
                onClick={() => setScreen("dashboard")}
              >
                Back to Dashboard
              </button>
            </div>

            <div className="tight-table-wrapper" style={{ overflowX: "auto" }}>
              <table className="tight-table data-table">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Programs</th>
                  </tr>
                </thead>
                <tbody>
                  {unassignedCourses.map((c) => (
                    <tr key={c.code}>
                      <td>{c.code}</td>
                      <td>{c.name}</td>
                      <td>{(c.programs || []).join(", ")}</td>
                    </tr>
                  ))}

                  {unassignedCourses.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center muted-copy">
                        All courses assigned!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );
    }

    if (screen === "allLecturersAts") {
      const filtered = visibleLecturers
        .filter(
          (l) =>
            !lecSearchName ||
            l.name.toLowerCase().includes(lecSearchName.toLowerCase())
        )
        .filter(
          (l) =>
            !lecSearchDept ||
            l.departments.some((d) =>
              d.toLowerCase().includes(lecSearchDept.toLowerCase())
            )
        );

      return (
        <section className="page-grid">
          <div className="panel panel-wide">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <h3>All Lecturers ATS</h3>
              <button
                className="ghost-button compact"
                onClick={() => setScreen("dashboard")}
              >
                Back to Dashboard
              </button>
            </div>

            <div
              className="form-grid"
              style={{
                gridTemplateColumns: "2fr 1fr",
                marginTop: "1rem",
              }}
            >
              <label className="field">
                <span>Search Lecturer</span>
                <input
                  value={lecSearchName}
                  onChange={(e) => setLecSearchName(e.target.value)}
                  placeholder="Type lecturer name..."
                />
              </label>
              <label className="field">
                <span>Search Department</span>
                <input
                  value={lecSearchDept}
                  onChange={(e) => setLecSearchDept(e.target.value)}
                  placeholder="Type department..."
                />
              </label>
            </div>

            <div className="table-wrapper">
              <table className="data-table tight-table">
                <thead>
                  <tr>
                    <th>Lecturer Name</th>
                    <th>Dept</th>
                    <th>Groups Handled</th>
                    <th>Total ATS</th>
                    <th>Min/Max</th>
                    <th>Committees</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => {
                    const uniqueGroups = [...new Set(l.atsEntries.flatMap((e) => e.groups || []))];
                    const comsCount = getLecturerCommittees(l.id).length;
                    const isExpanded = expandedLecturerId === l.id;

                    return (
                      <React.Fragment key={l.id}>
                        <tr
                          className={`expanded-row-parent ${isExpanded ? "active" : ""}`}
                        >
                          <td>{l.name}</td>
                          <td>{(l.departments || []).join(", ")}</td>
                          <td>
                            {uniqueGroups.map((g) => getGroupDisplay(g)).join(", ") || "-"}
                          </td>
                          <td>{getAtsTotal(l)}</td>
                          <td>
                            {l.minATS} - {l.maxATS}
                          </td>
                          <td>{comsCount}</td>
                          <td>
                            <button
                              className="ghost-button compact"
                              onClick={() =>
                                setExpandedLecturerId(isExpanded ? null : l.id)
                              }
                            >
                              {isExpanded ? "Hide" : "View"}
                            </button>
                          </td>
                        </tr>

                        {isExpanded && (
                          <tr className="expanded-row-child">
                            <td colSpan="7">
                              <div className="dropdown-panel-content">
                                <h4 style={{ marginTop: 0 }}>
                                  ATS Breakdown for {l.name}
                                </h4>

                                {l.atsEntries.length > 0 ? (
                                  <table className="data-table condensed">
                                    <thead>
                                      <tr>
                                        <th>Course Codes</th>
                                        <th>Course Names</th>
                                        <th>Programs</th>
                                        <th>Groups</th>
                                        <th>KS</th>
                                        <th>K1</th>
                                        <th>K2</th>
                                        <th>K3</th>
                                        <th>Remarks</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {l.atsEntries.map((entry) => (
                                        <tr key={entry.id}>
                                          <td>{entry.courseCodes.join(", ")}</td>
                                          <td>{entry.courseNames.join(", ")}</td>
                                          <td>{entry.programs.join(", ")}</td>
                                          <td>{entry.groups.join(", ")}</td>
                                          <td>{entry.ks}</td>
                                          <td>{entry.k1Supervision}</td>
                                          <td>{entry.k2Research}</td>
                                          <td>{entry.k3Service}</td>
                                          <td>{entry.remarks || "-"}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                ) : (
                                  <p className="muted-copy">No ATS entries found.</p>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );
    }

    if (screen === "lecturerAts") {
      const kTotals = selectedLecturer
        ? selectedLecturer.atsEntries.reduce(
            (acc, entry) => ({
              ks: acc.ks + Number(entry.ks || 0),
              k1: acc.k1 + Number(entry.k1Supervision || 0),
              k2: acc.k2 + Number(entry.k2Research || 0),
              k3: acc.k3 + Number(entry.k3Service || 0),
            }),
            { ks: 0, k1: 0, k2: 0, k3: 0 }
          )
        : { ks: 0, k1: 0, k2: 0, k3: 0 };

      return (
        <section className="page-grid">
          <div className="panel panel-wide">
            <div
              className="form-grid"
              style={{ gridTemplateColumns: "1fr 2fr auto", alignItems: "end" }}
            >
              <label className="field">
                <span>Department</span>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option>All Departments</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Lecturer</span>
                <AutocompleteSingleSelect
                  options={filteredLecturers.map((l) => l.name)}
                  selected={selectedLecturer?.name || ""}
                  onChange={(val) => {
                    const lec = lecturers.find((l) => l.name === val);
                    setSelectedLecturerId(lec?.id || null);
                  }}
                  placeholder="Search and select lecturer..."
                />
              </label>

              {!isReadOnly && selectedLecturer && (
                <button
                  className="primary-button"
                  onClick={() => {
                    setNewAtsDraft(createBlankAtsEntry());
                    setIsAddAtsModalOpen(true);
                  }}
                >
                  Add ATS
                </button>
              )}
            </div>
          </div>

          {selectedLecturer ? (
            <>
              <div className="panel panel-wide">
                <h3>{selectedLecturer.name}</h3>
                <p className="muted-copy">
                  {selectedLecturer.position} •{" "}
                  {(selectedLecturer.departments || []).join(", ")}
                </p>
                <p>{selectedLecturer.additionalInfo || "Tiada kepakaran dinyatakan"}</p>
              </div>

              <div className="table-wrapper">
                <table className="data-table ats-detailed-table">
                  <thead>
                    <tr>
                      <th className="col-codes">Course Codes</th>
                      <th className="col-names">Course Names</th>
                      <th className="col-programs">Programs</th>
                      <th className="col-groups">Groups</th>
                      <th className="bordered-col">KS</th>
                      <th className="bordered-col">K1</th>
                      <th className="bordered-col">K2</th>
                      <th className="bordered-col">K3</th>
                      <th className="col-remarks">Remarks</th>
                      <th className="col-committees">Coms.</th>
                      {!isReadOnly && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedLecturer.atsEntries.map((entry) => {
                      const myComs = getLecturerCommittees(selectedLecturer.id);
                      return (
                        <tr key={entry.id}>
                          <td>{entry.courseCodes.join(", ")}</td>
                          <td>{entry.courseNames.join(", ")}</td>
                          <td>{entry.programs.join(", ")}</td>
                          <td>{entry.groups.map(getGroupDisplay).join(", ")}</td>
                          <td>{entry.ks}</td>
                          <td>{entry.k1Supervision}</td>
                          <td>{entry.k2Research}</td>
                          <td>{entry.k3Service}</td>
                          <td>{entry.remarks || "-"}</td>
                          <td>{myComs.length}</td>
                          {!isReadOnly && (
                            <td>
                              <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                  className="ghost-button compact"
                                  onClick={() => openEditAtsEntry(entry)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="ghost-button compact red"
                                  onClick={() => deleteAtsEntry(entry.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}

                    {selectedLecturer.atsEntries.length > 0 && (
                      <tr className="totals-row">
                        <td colSpan="4">
                          <strong>TOTALS</strong>
                        </td>
                        <td>{kTotals.ks}</td>
                        <td>{kTotals.k1}</td>
                        <td>{kTotals.k2}</td>
                        <td>{kTotals.k3}</td>
                        <td colSpan={isReadOnly ? 2 : 3}></td>
                      </tr>
                    )}

                    {selectedLecturer.atsEntries.length === 0 && (
                      <tr>
                        <td colSpan={isReadOnly ? 10 : 11} className="text-center muted-copy">
                          No ATS entries found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="panel empty-state">
              <p className="muted-copy">
                Search and select a lecturer above to view their ATS details.
              </p>
            </div>
          )}
        </section>
      );
    }

    if (screen === "groupInfo") {
      const filtered = visibleGroups.filter(
        (g) => groupFilterDept === "All" || g.department === groupFilterDept
      );

      return (
        <section className="page-grid">
          <div className="panel panel-wide">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3>Group Info</h3>
                <p className="muted-copy">
                  Manage student counts. {isReadOnly ? "(Read-Only Mode)" : ""}
                </p>
              </div>

              <label className="field" style={{ minWidth: "220px", marginBottom: 0 }}>
                <span>Department Filter</span>
                <select
                  value={groupFilterDept}
                  onChange={(e) => setGroupFilterDept(e.target.value)}
                >
                  <option value="All">All</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Group Name</th>
                    <th>Department</th>
                    <th>SEMESTER</th>
                    <th>Student Count</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((group) => (
                    <tr key={group.id}>
                      <td>{group.groupName}</td>
                      <td>{group.department}</td>
                      <td>{extractSemester(group.groupName)}</td>
                      <td>
                        <input
                          type="number"
                          disabled={isReadOnly}
                          value={group.studentCount}
                          onChange={(e) =>
                            setGroups((prev) =>
                              prev.map((g) =>
                                g.id === group.id
                                  ? { ...g, studentCount: Number(e.target.value) }
                                  : g
                              )
                            )
                          }
                          style={{
                            width: "80px",
                            padding: "0.4rem",
                            opacity: isReadOnly ? 0.6 : 1,
                          }}
                        />
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center muted-copy">
                        No groups found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );
    }

    if (screen === "settings") {
      return (
        <section className="page-grid">
          <div className="panel panel-wide">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3>Settings & Admin</h3>
                <p className="muted-copy">
                  Manage core data, system globals, and permissions.
                </p>
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}>
              {[
                "general",
                "users",
                "committees",
                "programs",
                "groups",
                "lecturers",
                "courses",
                "logs",
                "archives",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`tab-button ${settingsTab === tab ? "active" : ""}`}
                  onClick={() => setSettingsTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {settingsTab === "general" && (
            <div className="panel panel-wide">
              <div className="form-grid three-cols">
                <label className="field">
                  <span>Faculty</span>
                  <input
                    value={globalInfo.faculty}
                    disabled={isReadOnly}
                    onChange={(e) =>
                      setGlobalInfo((prev) => ({
                        ...prev,
                        faculty: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="field">
                  <span>Semester</span>
                  <input
                    value={globalInfo.semester}
                    disabled={isReadOnly}
                    onChange={(e) =>
                      setGlobalInfo((prev) => ({
                        ...prev,
                        semester: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="field">
                  <span>Mode</span>
                  <select
                    value={globalInfo.mode}
                    disabled={!isAdminOrDev}
                    onChange={(e) =>
                      setGlobalInfo((prev) => ({
                        ...prev,
                        mode: e.target.value,
                      }))
                    }
                  >
                    <option>Draft</option>
                    <option>Completed</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {settingsTab === "users" && (
            <div className="panel panel-wide">
              <div style={{ marginBottom: "1rem" }}>
                {Object.keys(users).map((role) => (
                  <button
                    key={role}
                    className={`tab-button ${comSettingsTab === role ? "active" : ""}`}
                    onClick={() => setComSettingsTab(role)}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {!isReadOnly && (
                <button
                  className="primary-button compact"
                  style={{ marginBottom: "1rem" }}
                  onClick={() => openEditUser(comSettingsTab, null)}
                >
                  Add User
                </button>
              )}

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Username (ID)</th>
                      <th>Password</th>
                      {!isReadOnly && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {(users[comSettingsTab] || []).map((u) => (
                      <tr key={u.id}>
                        <td>{u.username}</td>
                        <td>{u.password}</td>
                        {!isReadOnly && (
                          <td>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button
                                className="ghost-button compact"
                                onClick={() => openEditUser(comSettingsTab, u)}
                              >
                                Edit
                              </button>
                              <button
                                className="ghost-button compact red"
                                onClick={() => deleteUser(comSettingsTab, u.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}

                    {(users[comSettingsTab] || []).length === 0 && (
                      <tr>
                        <td colSpan={isReadOnly ? 2 : 3} className="text-center muted-copy">
                          No users in this role.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {settingsTab === "committees" && (
            <div className="panel panel-wide">
              <div style={{ marginBottom: "1rem" }}>
                {COMMITTEE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`tab-button ${comSettingsTab === cat ? "active" : ""}`}
                    onClick={() => setComSettingsTab(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Committee / Position</th>
                      <th>Members Count</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {committees
                      .filter((c) => c.category === comSettingsTab)
                      .map((c) => (
                        <tr key={c.id}>
                          <td>{c.name}</td>
                          <td>{c.members.length}</td>
                          <td>
                            <button
                              className="ghost-button compact"
                              onClick={() => setManageCommitteeData(c)}
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {settingsTab === "programs" && (
            <div className="panel panel-wide">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <input
                  value={searchProgram}
                  onChange={(e) => setSearchProgram(e.target.value)}
                  placeholder="Search program..."
                  style={{ maxWidth: "280px" }}
                />

                {!isReadOnly && (
                  <button
                    className="primary-button compact"
                    onClick={() => openEditProgram(null)}
                  >
                    Add Program
                  </button>
                )}
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Program</th>
                      {!isReadOnly && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {programsList
                      .filter((p) =>
                        p.name.toLowerCase().includes(searchProgram.toLowerCase())
                      )
                      .sort(sortHiddenLast)
                      .map((p) => (
                        <tr key={p.id} className={p.isHidden ? "hidden-row" : ""}>
                          <td>{p.name}</td>
                          {!isReadOnly && (
                            <td>
                              <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                  className="ghost-button compact"
                                  onClick={() => openEditProgram(p)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="ghost-button compact"
                                  onClick={() => toggleHide("program", p.id)}
                                >
                                  {p.isHidden ? "Unhide" : "Hide"}
                                </button>
                                <button
                                  className="ghost-button compact red"
                                  onClick={() => deleteProgram(p.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {settingsTab === "groups" && (
            <div className="panel panel-wide">
              <div
                className="form-grid"
                style={{ gridTemplateColumns: "1fr 1fr auto", alignItems: "end" }}
              >
                <label className="field">
                  <span>Search Group</span>
                  <input
                    value={searchGroup}
                    onChange={(e) => setSearchGroup(e.target.value)}
                    placeholder="Search group..."
                  />
                </label>

                <label className="field">
                  <span>Filter Department</span>
                  <select
                    value={filterGroupDept}
                    onChange={(e) => setFilterGroupDept(e.target.value)}
                  >
                    <option value="All">All</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                {!isReadOnly && (
                  <button
                    className="primary-button compact"
                    onClick={() => openEditGroup(null)}
                  >
                    Add Group
                  </button>
                )}
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Group Name</th>
                      <th>Department</th>
                      <th>Semester</th>
                      <th>Student Count</th>
                      {!isReadOnly && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {groups
                      .filter(
                        (g) =>
                          filterGroupDept === "All" || g.department === filterGroupDept
                      )
                      .filter((g) =>
                        g.groupName.toLowerCase().includes(searchGroup.toLowerCase())
                      )
                      .sort(sortHiddenLast)
                      .map((g) => (
                        <tr key={g.id} className={g.isHidden ? "hidden-row" : ""}>
                          <td>{g.groupName}</td>
                          <td>{g.department}</td>
                          <td>{extractSemester(g.groupName)}</td>
                          <td>{g.studentCount}</td>
                          {!isReadOnly && (
                            <td>
                              <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                  className="ghost-button compact"
                                  onClick={() => openEditGroup(g)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="ghost-button compact"
                                  onClick={() => toggleHide("group", g.id)}
                                >
                                  {g.isHidden ? "Unhide" : "Hide"}
                                </button>
                                <button
                                  className="ghost-button compact red"
                                  onClick={() => deleteGroup(g.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {settingsTab === "lecturers" && (
            <div className="panel panel-wide">
              <div
                className="form-grid"
                style={{ gridTemplateColumns: "1fr 1fr auto", alignItems: "end" }}
              >
                <label className="field">
                  <span>Search Lecturer</span>
                  <input
                    value={searchLecturer}
                    onChange={(e) => setSearchLecturer(e.target.value)}
                    placeholder="Search lecturer..."
                  />
                </label>

                <label className="field">
                  <span>Filter Department</span>
                  <select
                    value={filterLecturerDept}
                    onChange={(e) => setFilterLecturerDept(e.target.value)}
                  >
                    <option value="All">All</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                {!isReadOnly && (
                  <button
                    className="primary-button compact"
                    onClick={() => openEditLecturer(null)}
                  >
                    Add Lecturer
                  </button>
                )}
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Min/Max ATS</th>
                      {!isReadOnly && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {lecturers
                      .filter(
                        (l) =>
                          filterLecturerDept === "All" ||
                          l.departments?.includes(filterLecturerDept)
                      )
                      .filter((l) =>
                        l.name.toLowerCase().includes(searchLecturer.toLowerCase())
                      )
                      .sort(sortHiddenLast)
                      .map((l) => (
                        <tr key={l.id} className={l.isHidden ? "hidden-row" : ""}>
                          <td>{l.name}</td>
                          <td>{(l.departments || []).join(", ")}</td>
                          <td>{l.position}</td>
                          <td>
                            {l.minATS} - {l.maxATS}
                          </td>
                          {!isReadOnly && (
                            <td>
                              <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                  className="ghost-button compact"
                                  onClick={() => openEditLecturer(l)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="ghost-button compact"
                                  onClick={() => toggleHide("lecturer", l.id)}
                                >
                                  {l.isHidden ? "Unhide" : "Hide"}
                                </button>
                                <button
                                  className="ghost-button compact red"
                                  onClick={() => deleteLecturer(l.id)}
                                >
                                  Delete
                                </button>
                                <button
                                  className="ghost-button compact"
                                  onClick={() => setViewLecturerComsId(l.id)}
                                >
                                  Committees
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {settingsTab === "courses" && (
            <div className="panel panel-wide">
              <div
                className="form-grid"
                style={{ gridTemplateColumns: "1fr 1fr auto", alignItems: "end" }}
              >
                <label className="field">
                  <span>Search Course</span>
                  <input
                    value={searchCourse}
                    onChange={(e) => setSearchCourse(e.target.value)}
                    placeholder="Search code or course..."
                  />
                </label>

                <label className="field">
                  <span>Filter Program</span>
                  <select
                    value={filterCourseDept}
                    onChange={(e) => setFilterCourseDept(e.target.value)}
                  >
                    <option value="All">All</option>
                    {visiblePrograms.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>

                {!isReadOnly && (
                  <button
                    className="primary-button compact"
                    onClick={() => openEditCourse(null)}
                  >
                    Add Course
                  </button>
                )}
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Programs</th>
                      {!isReadOnly && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {coursesList
                      .filter(
                        (c) =>
                          filterCourseDept === "All" ||
                          c.programs?.includes(filterCourseDept)
                      )
                      .filter(
                        (c) =>
                          c.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
                          c.name.toLowerCase().includes(searchCourse.toLowerCase())
                      )
                      .sort(sortHiddenLast)
                      .map((c) => (
                        <tr key={c.id} className={c.isHidden ? "hidden-row" : ""}>
                          <td>{c.code}</td>
                          <td>{c.name}</td>
                          <td>{(c.programs || []).join(", ")}</td>
                          {!isReadOnly && (
                            <td>
                              <div style={{ display: "flex", gap: "0.5rem" }}>
                                <button
                                  className="ghost-button compact"
                                  onClick={() => openEditCourse(c)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="ghost-button compact"
                                  onClick={() => toggleHide("course", c.id)}
                                >
                                  {c.isHidden ? "Unhide" : "Hide"}
                                </button>
                                <button
                                  className="ghost-button compact red"
                                  onClick={() => deleteCourse(c.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {settingsTab === "logs" && (
            <div className="panel panel-wide">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>User ID</th>
                      <th>Action Description</th>
                      <th>Targeted Undo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityLogs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.timestamp}</td>
                        <td>{log.user}</td>
                        <td>{log.action}</td>
                        <td>
                          {log.undoData && !isReadOnly ? (
                            <button
                              className="ghost-button compact"
                              onClick={() => undoToLog(log)}
                            >
                              Undo
                            </button>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    ))}

                    {activityLogs.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center muted-copy">
                          No recent activity.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {settingsTab === "archives" && (
            <div className="panel panel-wide">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ margin: 0 }}>
                  Save the current state to refer back to later.
                </p>
                {!isReadOnly && (
                  <button className="primary-button compact" onClick={archiveSemester}>
                    Archive Current Semester
                  </button>
                )}
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Archived Date</th>
                      <th>Semester Config</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {archives.map((arch) => (
                      <tr key={arch.id}>
                        <td>{arch.dateArchived}</td>
                        <td>{arch.semester}</td>
                        <td>
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button
                              className="ghost-button compact"
                              onClick={() => loadArchive(arch)}
                            >
                              Load
                            </button>
                            <button
                              className="ghost-button compact red"
                              onClick={() => deleteArchive(arch.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {archives.length === 0 && (
                      <tr>
                        <td colSpan="3" className="text-center muted-copy">
                          No archives saved yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      );
    }

    return (
      <section className="page-grid">
        <div className="panel empty-state">
          <p className="muted-copy">This section is currently under construction.</p>
        </div>
      </section>
    );
  }

  if (screen === "login") {
    return (
      <div className="app-shell login-shell">
        <div className="login-wrap">
          <div className="login-card">
            <div className="brand-block">
              <div className="brand-mark large">ATS</div>
              <h1 style={{ margin: "1rem 0 0.5rem" }}>Planner</h1>
              <p className="muted-copy">Faculty Workload Management System</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <h2 style={{ margin: 0 }}>Login</h2>

              <div className="role-switcher-inline">
                {LOGIN_ROLE_OPTIONS.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    className={`role-pill ${
                      selectedLoginRole === r.key ? "active" : ""
                    }`}
                    onClick={() => setSelectedLoginRole(r.key)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <label className="field">
                <span>Username</span>
                <input
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </label>

              <label className="field">
                <span>Password</span>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </label>

              {loginError && (
                <p style={{ color: "#ff8aa3", margin: 0 }}>{loginError}</p>
              )}

              <button className="primary-button full-width" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {renderSidebar()}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header className="topbar">
          <h1>
            {screen === "dashboard" && "Dashboard"}
            {screen === "groupInfo" && "Group Information"}
            {screen === "lecturerAts" && "Lecturer ATS"}
            {screen === "settings" && "Settings"}
            {screen === "loadWarningsDetails" && "Load Warnings"}
            {screen === "overAssignedDetails" && "Over-assigned Courses"}
            {screen === "unassignedDetails" && "Unassigned Courses"}
            {screen === "allLecturersAts" && "All Lecturers ATS"}
            {["muf", "performing", "servicing", "forum"].includes(screen) &&
              "Other Courses"}
          </h1>
        </header>

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1.5rem",
          }}
        >
          {renderMainContent()}
        </main>
      </div>

      {renderConfirmModal()}
      {renderAddAtsModal()}
      {renderLecturerModal()}
      {renderCourseModal()}
      {renderManageCommitteeModal()}
      {renderViewComsModal()}

      {programDraft && (
        <div className="global-overlay">
          <div className="modal-content center-modal" style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3>{programDraft.name ? "Edit Program" : "Add Program"}</h3>
              <button
                className="ghost-button compact"
                onClick={() => setProgramDraft(null)}
              >
                Close
              </button>
            </div>

            <div className="modal-body">
              <label className="field">
                <span>Program Name</span>
                <input
                  value={programDraft.name}
                  onChange={(e) =>
                    setProgramDraft((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className="modal-footer">
              <button className="primary-button full-width" onClick={saveProgram}>
                Save Program
              </button>
            </div>
          </div>
        </div>
      )}

      {groupDraft && (
        <div className="global-overlay">
          <div className="modal-content center-modal" style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3>{groupDraft.groupName ? "Edit Group" : "Add Group"}</h3>
              <button
                className="ghost-button compact"
                onClick={() => setGroupDraft(null)}
              >
                Close
              </button>
            </div>

            <div className="modal-body">
              <div className="form-grid">
                <label className="field">
                  <span>Group Name</span>
                  <input
                    value={groupDraft.groupName}
                    onChange={(e) =>
                      setGroupDraft((prev) => ({
                        ...prev,
                        groupName: e.target.value.toUpperCase(),
                      }))
                    }
                  />
                </label>

                <label className="field">
                  <span>Department</span>
                  <select
                    value={groupDraft.department}
                    onChange={(e) =>
                      setGroupDraft((prev) => ({
                        ...prev,
                        department: e.target.value,
                      }))
                    }
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Student Count</span>
                  <input
                    type="number"
                    value={groupDraft.studentCount}
                    onChange={(e) =>
                      setGroupDraft((prev) => ({
                        ...prev,
                        studentCount: Number(e.target.value),
                      }))
                    }
                  />
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="primary-button full-width" onClick={saveGroup}>
                Save Group
              </button>
            </div>
          </div>
        </div>
      )}

      {userDraft && (
        <div className="global-overlay">
          <div className="modal-content center-modal" style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3>{userDraft.username ? "Edit User" : "Add User"}</h3>
              <button
                className="ghost-button compact"
                onClick={() => setUserDraft(null)}
              >
                Close
              </button>
            </div>

            <div className="modal-body">
              <div className="form-grid">
                <label className="field">
                  <span>Username</span>
                  <input
                    value={userDraft.username}
                    onChange={(e) =>
                      setUserDraft((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="field">
                  <span>Password</span>
                  <input
                    value={userDraft.password}
                    onChange={(e) =>
                      setUserDraft((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </label>

                <label className="field">
                  <span>Role</span>
                  <select
                    value={userDraft.role}
                    onChange={(e) =>
                      setUserDraft((prev) => ({ ...prev, role: e.target.value }))
                    }
                  >
                    <option value="admin">admin</option>
                    <option value="coordinator">coordinator</option>
                    <option value="guest">guest</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="primary-button full-width" onClick={saveUser}>
                Save User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}