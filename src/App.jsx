import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const DEVELOPER_PASSWORD_DEFAULT = "openlah231787";

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

const RAW_COURSES = [
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

const RAW_GROUPS = [
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

const RAW_LECTURERS = [
  "Adee Arifin",
  "Ahmad Munir bin Mahzair",
  "Ahmad Rithaudin Md Noor (PM. Dr.)",
  "Ainolnaim bin Azizol (Dr.)",
  "Alia Farahin Abd Wahab (Dr.)",
  "Amanina Alwani Badaruddin",
  "Azli Mohd Taslim",
  "Caryn Ong Wen Bin (Dr.)",
  "Chaing Yi Ling",
  "Chong Yew Yoong (PM Dr.)",
  "Dayang Siti Hazar (Dr.)",
  "Eddy Lim You Cheng",
  "Faezah Hamdan",
  "Firdaus Zainal",
  "Janette Jannah Poheng",
  "Juriani Jamaludin (Dr.)",
  "Juwairiyah bt Zakaria",
  "Ken Hor",
  "Khairul Anwar Tony",
  "Khairul Hazwan Bin Musa",
  "Khairunnisa Diyana Md Noor",
  "Khatriza Ahmad Saffian (Dr.)",
  "Maryann Magdalena Linnis",
  "Md Jais Ismail (PM Dr.)",
  "Mohamad Ridza Mubarak",
  "Mohd Adam Masumi",
  "Mohd Kamrulbahri Hussin",
  "Mohd Razli Bin Zulkafli",
  "Mohd Shafic Aminuddin",
  "Mohd Yusri bin Hamid",
  "Muhamad Faiz Rushli@Rosli",
  "Mustafa Fuzer Nawi (Datuk)",
  "Nadia Widyawati Madzhi (Dr.)",
  "Nur Idayu Roslan (Dr.)",
  "Nur Izzati Jamalludin (Dr.)",
  "Nurulhamimi Abdul Rahman (Dr.)",
  "Phang Kong Chien (Dr.)",
  "Raja Mohamad Alif Raja Mohamad Adnan (YM)",
  "Rayner Naili",
  "Rita Mardhatillah Umar Rauf",
  "Rizal Ezuan Zulkifly Tony",
  "Ruviyamin Ruslan",
  "Sarah Alia Ahmad Jamal",
  "Shahanum Mohd Shah (Prof Dr.)",
  "Shahwalnaz Hussin",
  "Sharifah Faizah Syed Mohammed (PM. Dr.)",
  "Siti Hajar Mohamad Seperah (Dr.)",
  "Siti Nur Hajarul Aswad bt Shakeeb Arsalaan Bajunid",
  "Tazul Izan Tajuddin (Prof. Dr.)",
  "Thompson Yunga",
  "Yap Eng Sim",
  "Yeoh Pei Ann (Dr.)",
  "Yuri Edris",
  "Zailan Razak",
  "Zamzahardi",
  "Afiqah Aisyah Saiful Bahar",
  "Helmi bin Rosli",
  "Valerie Ross Nee Colleen Oh Seo Bin (PM Dr.)",
];

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

function getDeptFromGroup(groupName) {
  if (groupName.includes("110")) return "MU110";
  if (groupName.includes("111")) return "MU111";
  if (groupName.includes("230") || groupName.includes("220")) return "MU220/ MU230";
  if (groupName.includes("221")) return "MU221";
  if (groupName.includes("222")) return "MU222";
  if (groupName.includes("223")) return "MU223";
  if (groupName.includes("777")) return "CAMU777";
  if (groupName.includes("778")) return "CAMU778";
  if (groupName.includes("790")) return "CAMU790";
  return "";
}

function extractSemester(groupName) {
  const semMatch = groupName.match(/SEM(\d+)/i);
  if (semMatch) return semMatch[1];
  const digitMatch = groupName.match(/(\d)[A-Za-z]*$/);
  if (digitMatch) return digitMatch[1];
  return "-";
}

function getDeptForLecturerIndex(index) {
  return [DEPARTMENTS[index % DEPARTMENTS.length]];
}

const INITIAL_PROGRAMS = PROGRAM_CODES_RAW.map((name, i) => ({
  id: `prog-${i + 1}`,
  name,
  isHidden: false,
}));

const INITIAL_COURSES = RAW_COURSES.map((course, i) => {
  const [code, ...nameParts] = course.split(" - ");
  return {
    id: `crs-${i + 1}`,
    code: code.trim(),
    name: nameParts.join(" - ").trim(),
    programs: [INITIAL_PROGRAMS[i % INITIAL_PROGRAMS.length].name],
    isHidden: false,
  };
});

const INITIAL_GROUPS = RAW_GROUPS.map((groupName, i) => ({
  id: `grp-${i + 1}`,
  department: getDeptFromGroup(groupName),
  groupName,
  studentCount: 15 + (i % 15),
  isHidden: false,
}));

const INITIAL_LECTURERS = RAW_LECTURERS.map((name, i) => {
  let atsEntries = [];

  if (i === 0) {
    atsEntries = [
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
        remarks: "Core teaching allocation.",
      },
    ];
  } else if (i === 1) {
    atsEntries = [
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
    atsEntries = [
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
    atsEntries = [
      {
        id: "ats-test-4",
        courseCodes: ["ENT311"],
        courseNames: ["ESSENTIALS OF ENTREPRENEURSHIP"],
        programs: ["MU220"],
        groups: ["CAMU221SEM1"],
        contactHours: 6,
        ks: 6,
        k1Supervision: 4,
        k2Research: 3,
        k3Service: 2,
        remarks: "",
      },
    ];
  }

  return {
    id: `lec-${i + 1}`,
    name,
    departments: getDeptForLecturerIndex(i),
    minATS: 16,
    maxATS: 18,
    position: "Lecturer",
    additionalInfo: "",
    remarks: "",
    atsEntries,
    isHidden: false,
  };
});

const INITIAL_USERS = {
  admin: [{ id: "u-1", username: "admin1", password: "111" }],
  coordinator: [{ id: "u-2", username: "user1", password: "111" }],
  guest: [{ id: "u-3", username: "guest1", password: "111" }],
};

let committeeCounter = 1;
const INITIAL_COMMITTEES = COMMITTEE_CATEGORIES.flatMap((category) =>
  RAW_COMMITTEES[category].map((name) => ({
    id: `com-${committeeCounter++}`,
    category,
    name,
    members: [],
  }))
);

function getAtsTotal(lecturer) {
  if (!lecturer?.atsEntries) return 0;
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

function getTotalKs(lecturer) {
  if (!lecturer?.atsEntries) return 0;
  return lecturer.atsEntries.reduce((sum, entry) => sum + Number(entry.ks || 0), 0);
}

function getLecturerStatus(lecturer) {
  const total = getAtsTotal(lecturer);
  if (total === 0) return "No ATS";
  if (total > lecturer.maxATS) return "Overload";
  if (total < lecturer.minATS) return "Underload";
  return "Normal";
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

function createBlankLecturer() {
  return {
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
  };
}

function createBlankCourse() {
  return {
    id: `crs-${Date.now()}`,
    code: "",
    name: "",
    programs: [],
    isHidden: false,
  };
}

function createBlankProgram() {
  return {
    id: `prog-${Date.now()}`,
    name: "",
    isHidden: false,
  };
}

function createBlankGroup() {
  return {
    id: `grp-${Date.now()}`,
    department: DEPARTMENTS[0],
    groupName: "",
    studentCount: 0,
    isHidden: false,
  };
}

function sortHiddenLast(a, b) {
  if (a.isHidden === b.isHidden) return 0;
  return a.isHidden ? 1 : -1;
}

function SearchableSingleSelect({
  options = [],
  selected = "",
  onChange,
  placeholder = "Search...",
}) {
  const [query, setQuery] = useState(selected || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setQuery(selected || "");
  }, [selected]);

  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes((query || "").toLowerCase())
  );

  return (
    <div className="autocomplete-container">
      <div className="autocomplete-input-box single">
        <input
          className="autocomplete-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value, false);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          placeholder={placeholder}
        />
        {query ? (
          <button
            type="button"
            className="clear-btn"
            onClick={() => {
              setQuery("");
              onChange("", true);
            }}
          >
            ×
          </button>
        ) : null}
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {filteredOptions.map((item) => (
            <li
              key={item}
              onMouseDown={(e) => {
                e.preventDefault();
                setQuery(item);
                onChange(item, true);
                setIsOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MultiSelectChips({ options = [], selected = [], onChange, placeholder = "Search..." }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const safeSelected = Array.isArray(selected) ? selected : [];
  const filteredOptions = options.filter(
    (item) =>
      item &&
      item.toLowerCase().includes(query.toLowerCase()) &&
      !safeSelected.includes(item)
  );

  const addItem = (value) => {
    onChange([...safeSelected, value]);
    setQuery("");
    setIsOpen(false);
  };

  const removeItem = (value) => {
    onChange(safeSelected.filter((item) => item !== value));
  };

  return (
    <div className="autocomplete-container">
      <div className="autocomplete-input-box" onClick={() => setIsOpen(true)}>
        {safeSelected.map((item) => (
          <span className="chip" key={item}>
            {item}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeItem(item);
              }}
            >
              ×
            </button>
          </span>
        ))}

        <input
          className="autocomplete-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          placeholder={safeSelected.length ? "" : placeholder}
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <ul className="autocomplete-dropdown">
          {filteredOptions.map((item) => (
            <li
              key={item}
              onMouseDown={(e) => {
                e.preventDefault();
                addItem(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [developerPassword, setDeveloperPassword] = useState(DEVELOPER_PASSWORD_DEFAULT);
  const [developerPasswordDraft, setDeveloperPasswordDraft] = useState(DEVELOPER_PASSWORD_DEFAULT);

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

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isOtherCoursesOpen, setIsOtherCoursesOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLecturerId, setSelectedLecturerId] = useState(null);
  const [groupFilterDept, setGroupFilterDept] = useState("All");
  const [settingsTab, setSettingsTab] = useState("general");
  const [comSettingsTab, setComSettingsTab] = useState(COMMITTEE_CATEGORIES[0]);
  const [userRoleTab, setUserRoleTab] = useState("admin");

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
  const [viewCommitteeData, setViewCommitteeData] = useState(null);
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

  const visibleLecturers = lecturers.filter((item) => !item.isHidden);
  const visibleCourses = coursesList.filter((item) => !item.isHidden);
  const visibleGroups = groups.filter((item) => !item.isHidden);
  const visiblePrograms = programsList.filter((item) => !item.isHidden);

  const isAdmin = currentUser?.role === "admin";
  const isDeveloper = currentUser?.role === "developer";
  const canAccessSettings = isAdmin || isDeveloper;
  const canSeeDeveloperControls = isDeveloper;
  const isReadOnly =
    (globalInfo.mode === "Completed" && !isAdmin && !isDeveloper) ||
    currentUser?.role === "guest";

  const filteredLecturers = useMemo(() => {
    return visibleLecturers.filter(
      (lecturer) =>
        selectedDepartment === "All Departments" ||
        lecturer.departments.includes(selectedDepartment)
    );
  }, [visibleLecturers, selectedDepartment]);

  const selectedLecturer =
    lecturers.find((lecturer) => lecturer.id === selectedLecturerId) || null;

  const lecturersStatus = visibleLecturers
    .map((lecturer) => ({
      ...lecturer,
      total: getAtsTotal(lecturer),
      status: getLecturerStatus(lecturer),
    }))
    .filter((lecturer) => lecturer.status !== "Normal");

  const courseUsage = visibleCourses.map((course) => {
    const assignedLecturers = visibleLecturers.filter((lecturer) =>
      lecturer.atsEntries.some((entry) => entry.courseCodes.includes(course.code))
    );
    return { ...course, assignedLecturers };
  });

  const unassignedCourses = courseUsage.filter(
    (course) => course.assignedLecturers.length === 0
  );
  const overAssignedCourses = courseUsage.filter(
    (course) => course.assignedLecturers.length > 1
  );

  const logActivity = (action, undoData = null) => {
    if (isDeveloper) return;

    const entry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      user: currentUser?.id || "System",
      action,
      undoData,
    };
    setActivityLogs((prev) => [entry, ...prev]);
  };

  const confirmAction = (title, message, onConfirm) => {
    setConfirmConfig({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        if (onConfirm) onConfirm();
        setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    if (loginPassword === developerPassword) {
      setCurrentUser({
        id: "dev-session",
        displayName: "System User",
        role: "developer",
      });
      setScreen("dashboard");
      setLoginUsername("");
      setLoginPassword("");
      return;
    }

    const matched = users[selectedLoginRole]?.find(
      (user) => user.username === loginUsername && user.password === loginPassword
    );

    if (!matched) {
      setLoginError("Invalid username or password.");
      return;
    }

    setCurrentUser({
      id: matched.username,
      displayName: matched.username,
      role: selectedLoginRole,
    });
    setScreen("dashboard");
    setLoginUsername("");
    setLoginPassword("");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setScreen("login");
    setSelectedLecturerId(null);
  };

  const getLecturerCommittees = (lecturerId) => {
    const result = [];
    committees.forEach((committee) => {
      const member = committee.members.find((item) => item.lecturerId === lecturerId);
      if (member) {
        result.push({
          committeeId: committee.id,
          category: committee.category,
          committeeName: committee.name,
          position: member.position,
        });
      }
    });
    return result;
  };

  const handleAtsCourseCodesChange = (value) => {
    const courseNames = value
      .map((code) => visibleCourses.find((course) => course.code === code)?.name)
      .filter(Boolean);

    setNewAtsDraft((prev) => ({
      ...prev,
      courseCodes: value,
      courseNames,
    }));
  };

  const openEditAtsEntry = (entry) => {
    setNewAtsDraft({ ...entry });
    setIsAddAtsModalOpen(true);
  };

  const saveAtsEntry = () => {
    if (!selectedLecturerId) return;

    const previous = lecturers.find((lecturer) => lecturer.id === selectedLecturerId);

    setLecturers((prev) =>
      prev.map((lecturer) => {
        if (lecturer.id !== selectedLecturerId) return lecturer;

        const exists = lecturer.atsEntries.some((entry) => entry.id === newAtsDraft.id);

        return {
          ...lecturer,
          atsEntries: exists
            ? lecturer.atsEntries.map((entry) =>
                entry.id === newAtsDraft.id ? newAtsDraft : entry
              )
            : [...lecturer.atsEntries, newAtsDraft],
        };
      })
    );

    logActivity(`Saved ATS Entry for ${selectedLecturer?.name}`, {
      target: "lecturers",
      id: selectedLecturerId,
      prev: previous,
    });

    setIsAddAtsModalOpen(false);
    setNewAtsDraft(createBlankAtsEntry());
  };

  const deleteAtsEntry = (entryId) => {
    confirmAction(
      "Delete ATS Entry",
      "Are you sure you want to delete this ATS record?",
      () => {
        const previous = lecturers.find((lecturer) => lecturer.id === selectedLecturerId);

        setLecturers((prev) =>
          prev.map((lecturer) =>
            lecturer.id === selectedLecturerId
              ? {
                  ...lecturer,
                  atsEntries: lecturer.atsEntries.filter((entry) => entry.id !== entryId),
                }
              : lecturer
          )
        );

        logActivity(`Deleted ATS Entry for ${selectedLecturer?.name}`, {
          target: "lecturers",
          id: selectedLecturerId,
          prev: previous,
        });
      }
    );
  };

  const openEditLecturer = (lecturer = null) => {
    setLecturerDraft(lecturer ? { ...lecturer } : createBlankLecturer());
  };

  const saveLecturer = () => {
    if (!lecturerDraft?.name?.trim()) return;

    const previous = lecturers.find((item) => item.id === lecturerDraft.id) || null;

    setLecturers((prev) =>
      prev.some((item) => item.id === lecturerDraft.id)
        ? prev.map((item) => (item.id === lecturerDraft.id ? lecturerDraft : item))
        : [...prev, lecturerDraft]
    );

    logActivity(`Saved Lecturer ${lecturerDraft.name}`, {
      target: "lecturers",
      id: lecturerDraft.id,
      prev: previous,
    });

    setLecturerDraft(null);
  };

  const deleteLecturer = (id) => {
    confirmAction(
      "Delete Lecturer",
      "This will remove the lecturer and their ATS records. Continue?",
      () => {
        const previous = lecturers.find((item) => item.id === id);

        setLecturers((prev) => prev.filter((item) => item.id !== id));
        setCommittees((prev) =>
          prev.map((committee) => ({
            ...committee,
            members: committee.members.filter((member) => member.lecturerId !== id),
          }))
        );

        logActivity(`Deleted Lecturer ${previous?.name || id}`, {
          target: "lecturers",
          id,
          prev: previous,
        });
      }
    );
  };

  const openEditCourse = (course = null) => {
    setCourseDraft(course ? { ...course } : createBlankCourse());
  };

  const saveCourse = () => {
    if (!courseDraft?.code?.trim() || !courseDraft?.name?.trim()) return;

    const previous = coursesList.find((item) => item.id === courseDraft.id) || null;

    setCoursesList((prev) =>
      prev.some((item) => item.id === courseDraft.id)
        ? prev.map((item) => (item.id === courseDraft.id ? courseDraft : item))
        : [...prev, courseDraft]
    );

    logActivity(`Saved Course ${courseDraft.code}`, {
      target: "courses",
      id: courseDraft.id,
      prev: previous,
    });

    setCourseDraft(null);
  };

  const deleteCourse = (id) => {
    confirmAction("Delete Course", "Delete this course?", () => {
      const previous = coursesList.find((item) => item.id === id);

      setCoursesList((prev) => prev.filter((item) => item.id !== id));

      logActivity(`Deleted Course ${previous?.code || id}`, {
        target: "courses",
        id,
        prev: previous,
      });
    });
  };

  const openEditProgram = (program = null) => {
    setProgramDraft(program ? { ...program } : createBlankProgram());
  };

  const saveProgram = () => {
    if (!programDraft?.name?.trim()) return;

    const previous = programsList.find((item) => item.id === programDraft.id) || null;

    setProgramsList((prev) =>
      prev.some((item) => item.id === programDraft.id)
        ? prev.map((item) => (item.id === programDraft.id ? programDraft : item))
        : [...prev, programDraft]
    );

    logActivity(`Saved Program ${programDraft.name}`, {
      target: "programs",
      id: programDraft.id,
      prev: previous,
    });

    setProgramDraft(null);
  };

  const deleteProgram = (id) => {
    confirmAction("Delete Program", "Delete this program?", () => {
      const previous = programsList.find((item) => item.id === id);

      setProgramsList((prev) => prev.filter((item) => item.id !== id));

      logActivity(`Deleted Program ${previous?.name || id}`, {
        target: "programs",
        id,
        prev: previous,
      });
    });
  };

  const openEditGroup = (group = null) => {
    setGroupDraft(group ? { ...group } : createBlankGroup());
  };

  const saveGroup = () => {
    if (!groupDraft?.groupName?.trim()) return;

    const previous = groups.find((item) => item.id === groupDraft.id) || null;

    setGroups((prev) =>
      prev.some((item) => item.id === groupDraft.id)
        ? prev.map((item) => (item.id === groupDraft.id ? groupDraft : item))
        : [...prev, groupDraft]
    );

    logActivity(`Saved Group ${groupDraft.groupName}`, {
      target: "groups",
      id: groupDraft.id,
      prev: previous,
    });

    setGroupDraft(null);
  };

  const deleteGroup = (id) => {
    confirmAction("Delete Group", "Delete this group?", () => {
      const previous = groups.find((item) => item.id === id);

      setGroups((prev) => prev.filter((item) => item.id !== id));

      logActivity(`Deleted Group ${previous?.groupName || id}`, {
        target: "groups",
        id,
        prev: previous,
      });
    });
  };

  const openEditUser = (role, user = null) => {
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
  };

  const saveUser = () => {
    if (!userDraft?.username?.trim() || !userDraft?.password?.trim()) return;

    const previous = users[userDraft.role]?.find((user) => user.id === userDraft.id) || null;

    setUsers((prev) => {
      const next = { ...prev };
      const roleUsers = next[userDraft.role] || [];

      next[userDraft.role] = roleUsers.some((user) => user.id === userDraft.id)
        ? roleUsers.map((user) => (user.id === userDraft.id ? userDraft : user))
        : [...roleUsers, userDraft];

      return next;
    });

    logActivity(`Saved User ${userDraft.username}`, {
      target: "users",
      role: userDraft.role,
      id: userDraft.id,
      prev: previous,
    });

    setUserDraft(null);
  };

  const deleteUser = (role, id) => {
    confirmAction("Delete User", "Remove this user?", () => {
      const previous = users[role]?.find((user) => user.id === id);

      setUsers((prev) => ({
        ...prev,
        [role]: (prev[role] || []).filter((user) => user.id !== id),
      }));

      logActivity(`Deleted User ${previous?.username || id}`, {
        target: "users",
        role,
        id,
        prev: previous,
      });
    });
  };

  const saveDeveloperPassword = () => {
    if (!developerPasswordDraft.trim()) return;
    setDeveloperPassword(developerPasswordDraft.trim());
  };

  const toggleHide = (type, id) => {
    if (type === "lecturer") {
      const previous = lecturers.find((item) => item.id === id);
      setLecturers((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isHidden: !item.isHidden } : item
        )
      );
      logActivity(`${previous?.isHidden ? "Unhid" : "Hid"} Lecturer ${previous?.name}`, {
        target: "lecturers",
        id,
        prev: previous,
      });
    }

    if (type === "course") {
      const previous = coursesList.find((item) => item.id === id);
      setCoursesList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isHidden: !item.isHidden } : item
        )
      );
      logActivity(`${previous?.isHidden ? "Unhid" : "Hid"} Course ${previous?.code}`, {
        target: "courses",
        id,
        prev: previous,
      });
    }

    if (type === "program") {
      const previous = programsList.find((item) => item.id === id);
      setProgramsList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isHidden: !item.isHidden } : item
        )
      );
      logActivity(`${previous?.isHidden ? "Unhid" : "Hid"} Program ${previous?.name}`, {
        target: "programs",
        id,
        prev: previous,
      });
    }

    if (type === "group") {
      const previous = groups.find((item) => item.id === id);
      setGroups((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isHidden: !item.isHidden } : item
        )
      );
      logActivity(`${previous?.isHidden ? "Unhid" : "Hid"} Group ${previous?.groupName}`, {
        target: "groups",
        id,
        prev: previous,
      });
    }
  };

  const saveCommitteeMember = () => {
    if (!manageCommitteeData || !newMemberDraft.lecturerName) return;

    const lecturer = lecturers.find((item) => item.name === newMemberDraft.lecturerName);
    if (!lecturer) return;

    setCommittees((prev) =>
      prev.map((committee) => {
        if (committee.id !== manageCommitteeData.id) return committee;

        const cleaned = committee.members.filter(
          (member) => member.lecturerId !== lecturer.id
        );

        return {
          ...committee,
          members: [
            ...cleaned,
            {
              lecturerId: lecturer.id,
              position: newMemberDraft.position || "Ahli Jawatankuasa",
            },
          ],
        };
      })
    );

    setManageCommitteeData((prev) => {
      if (!prev) return prev;
      const cleaned = prev.members.filter((member) => member.lecturerId !== lecturer.id);

      return {
        ...prev,
        members: [
          ...cleaned,
          {
            lecturerId: lecturer.id,
            position: newMemberDraft.position || "Ahli Jawatankuasa",
          },
        ],
      };
    });

    if (viewCommitteeData?.id === manageCommitteeData.id) {
      setViewCommitteeData((prev) => {
        if (!prev) return prev;
        const cleaned = prev.members.filter((member) => member.lecturerId !== lecturer.id);
        return {
          ...prev,
          members: [
            ...cleaned,
            {
              lecturerId: lecturer.id,
              position: newMemberDraft.position || "Ahli Jawatankuasa",
            },
          ],
        };
      });
    }

    logActivity(`Assigned ${lecturer.name} to ${manageCommitteeData.name}`);
    setNewMemberDraft({ lecturerName: "", position: "" });
  };

  const deleteCommitteeMember = (lecturerId) => {
    if (!manageCommitteeData) return;

    setCommittees((prev) =>
      prev.map((committee) =>
        committee.id === manageCommitteeData.id
          ? {
              ...committee,
              members: committee.members.filter(
                (member) => member.lecturerId !== lecturerId
              ),
            }
          : committee
      )
    );

    setManageCommitteeData((prev) =>
      prev
        ? {
            ...prev,
            members: prev.members.filter((member) => member.lecturerId !== lecturerId),
          }
        : prev
    );

    if (viewCommitteeData?.id === manageCommitteeData.id) {
      setViewCommitteeData((prev) =>
        prev
          ? {
              ...prev,
              members: prev.members.filter((member) => member.lecturerId !== lecturerId),
            }
          : prev
      );
    }

    logActivity(`Removed member from ${manageCommitteeData.name}`);
  };

  const archiveSemester = () => {
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
        logActivity(`Archived Semester ${globalInfo.semester}`);
      }
    );
  };

  const loadArchive = (archive) => {
    confirmAction(
      "Load Archive",
      `Load data from ${archive.semester}? Current data will be overwritten.`,
      () => {
        setLecturers(archive.data.lecturers || []);
        setCoursesList(archive.data.coursesList || []);
        setGroups(archive.data.groups || []);
        setProgramsList(archive.data.programsList || []);
        setCommittees(archive.data.committees || INITIAL_COMMITTEES);
        setGlobalInfo((prev) => ({ ...prev, semester: archive.semester }));
        logActivity(`Loaded Archive ${archive.semester}`);
      }
    );
  };

  const deleteArchive = (id) => {
    confirmAction("Delete Archive", "Delete this archive?", () => {
      setArchives((prev) => prev.filter((archive) => archive.id !== id));
      logActivity(`Deleted Archive ${id}`);
    });
  };

  const undoToLog = (logEntry) => {
    if (!logEntry.undoData) return;

    confirmAction("Undo Action", `Undo "${logEntry.action}"?`, () => {
      const undo = logEntry.undoData;

      if (undo.target === "lecturers") {
        if (undo.prev) {
          setLecturers((prev) =>
            prev.some((item) => item.id === undo.id)
              ? prev.map((item) => (item.id === undo.id ? undo.prev : item))
              : [...prev, undo.prev]
          );
        } else {
          setLecturers((prev) => prev.filter((item) => item.id !== undo.id));
        }
      }

      if (undo.target === "courses") {
        if (undo.prev) {
          setCoursesList((prev) =>
            prev.some((item) => item.id === undo.id)
              ? prev.map((item) => (item.id === undo.id ? undo.prev : item))
              : [...prev, undo.prev]
          );
        } else {
          setCoursesList((prev) => prev.filter((item) => item.id !== undo.id));
        }
      }

      if (undo.target === "groups") {
        if (undo.prev) {
          setGroups((prev) =>
            prev.some((item) => item.id === undo.id)
              ? prev.map((item) => (item.id === undo.id ? undo.prev : item))
              : [...prev, undo.prev]
          );
        } else {
          setGroups((prev) => prev.filter((item) => item.id !== undo.id));
        }
      }

      if (undo.target === "programs") {
        if (undo.prev) {
          setProgramsList((prev) =>
            prev.some((item) => item.id === undo.id)
              ? prev.map((item) => (item.id === undo.id ? undo.prev : item))
              : [...prev, undo.prev]
          );
        } else {
          setProgramsList((prev) => prev.filter((item) => item.id !== undo.id));
        }
      }

      if (undo.target === "users") {
        if (undo.prev) {
          setUsers((prev) => {
            const next = { ...prev };
            const roleUsers = next[undo.role] || [];
            next[undo.role] = roleUsers.some((user) => user.id === undo.id)
              ? roleUsers.map((user) => (user.id === undo.id ? undo.prev : user))
              : [...roleUsers, undo.prev];
            return next;
          });
        } else {
          setUsers((prev) => ({
            ...prev,
            [undo.role]: (prev[undo.role] || []).filter((user) => user.id !== undo.id),
          }));
        }
      }

      setActivityLogs((prev) => prev.filter((item) => item.id !== logEntry.id));
    });
  };

  const renderSidebar = () => (
    <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-top-row">
          <div className="sidebar-brand">
            <div className="brand-mark">ATS</div>
            {!sidebarCollapsed && (
              <div className="sidebar-brand-text">
                <h2>ATS Planner</h2>
                <p className="muted-copy small-text">{globalInfo.faculty}</p>
                <p className="muted-copy small-text">{globalInfo.semester}</p>
                <span className={`mode-badge ${globalInfo.mode.toLowerCase()}`}>
                  {globalInfo.mode}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-divider" />
      </div>

      <div className="sidebar-collapse-row">
        <button
          className="collapse-button relocated"
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? "»" : "«"}
        </button>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-link ${screen === "dashboard" ? "active" : ""}`}
          onClick={() => setScreen("dashboard")}
          title="Dashboard"
        >
          <span className="nav-icon">◻</span>
          {!sidebarCollapsed && <span>Dashboard</span>}
        </button>

        <button
          className={`nav-link ${screen === "groupInfo" ? "active" : ""}`}
          onClick={() => setScreen("groupInfo")}
          title="Group Info"
        >
          <span className="nav-icon">◫</span>
          {!sidebarCollapsed && <span>Group Info</span>}
        </button>

        <button
          className={`nav-link ${screen === "lecturerAts" ? "active" : ""}`}
          onClick={() => setScreen("lecturerAts")}
          title="Lecturer ATS"
        >
          <span className="nav-icon">◧</span>
          {!sidebarCollapsed && <span>Lecturer ATS</span>}
        </button>

        <button
          className={`nav-link ${screen === "allLecturersAts" ? "active" : ""}`}
          onClick={() => setScreen("allLecturersAts")}
          title="All Lecturers ATS"
        >
          <span className="nav-icon">◨</span>
          {!sidebarCollapsed && <span>All Lecturers ATS</span>}
        </button>

        {!sidebarCollapsed && (
          <div className="other-courses-dropdown">
            <button
              className="nav-link dropdown-toggle"
              onClick={() => setIsOtherCoursesOpen((prev) => !prev)}
            >
              <span className="nav-inline-label">
                <span className="nav-icon">▣</span>
                <span>Other Courses</span>
              </span>
              <span>{isOtherCoursesOpen ? "▾" : "▸"}</span>
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
                  className={`nav-link sub-link ${screen === "performing" ? "active" : ""}`}
                  onClick={() => setScreen("performing")}
                >
                  Performing Groups
                </button>
                <button
                  className={`nav-link sub-link ${screen === "servicing" ? "active" : ""}`}
                  onClick={() => setScreen("servicing")}
                >
                  Servicing Codes
                </button>
                <button
                  className={`nav-link sub-link ${screen === "forum" ? "active" : ""}`}
                  onClick={() => setScreen("forum")}
                >
                  Forum / Colloquium
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        {!sidebarCollapsed && currentUser?.role !== "developer" && (
          <div className="user-status-text">
            Logged in as <strong>{currentUser?.displayName}</strong>
          </div>
        )}

        {canAccessSettings && (
          <button
            className="ghost-button footer-btn"
            onClick={() => setScreen("settings")}
            title="Settings / Admin"
          >
            {sidebarCollapsed ? "⚙" : "Settings / Admin"}
          </button>
        )}

        <button
          className="ghost-button red footer-btn"
          onClick={handleLogout}
          title="Sign out"
        >
          {sidebarCollapsed ? "↪" : "Sign out"}
        </button>
      </div>
    </aside>
  );

  const renderDashboard = () => {
    const counts = {
      overload: lecturersStatus.filter((item) => item.status === "Overload").length,
      underload: lecturersStatus.filter((item) => item.status === "Underload").length,
      noAts: lecturersStatus.filter((item) => item.status === "No ATS").length,
    };

    return (
      <section className="page-grid">
        <div className="panel dashboard-banner">
          <div>
            <p className="eyebrow">Overview</p>
            <h2>Dashboard Insights</h2>
            <p className="muted-copy">
              Monitor workload warnings, over-assigned courses, and missing assignments.
            </p>
          </div>
          <button className="primary-button" onClick={() => setScreen("allLecturersAts")}>
            View All Lecturers ATS
          </button>
        </div>

        <div className="stats-grid">
          <div className="panel stat-card">
            <span className="stat-label">Overload</span>
            <strong>{counts.overload}</strong>
          </div>
          <div className="panel stat-card">
            <span className="stat-label">Underload</span>
            <strong>{counts.underload}</strong>
          </div>
          <div className="panel stat-card">
            <span className="stat-label">No ATS</span>
            <strong>{counts.noAts}</strong>
          </div>
          <div className="panel stat-card">
            <span className="stat-label">Unassigned Courses</span>
            <strong>{unassignedCourses.length}</strong>
          </div>
        </div>

        <div className="three-panel-stack">
          <div className="panel slim-panel">
            <div>
              <h3>Load Warnings</h3>
              <p className="muted-copy">
                <strong>{counts.overload}</strong> overload, <strong>{counts.underload}</strong>{" "}
                underload, <strong>{counts.noAts}</strong> no ATS.
              </p>
            </div>
            <button className="ghost-button" onClick={() => setScreen("loadWarningsDetails")}>
              View Full Data
            </button>
          </div>

          <div className="panel slim-panel">
            <div>
              <h3>Over-assigned Courses</h3>
              <p className="muted-copy">
                <strong>{overAssignedCourses.length}</strong> course(s) assigned to multiple
                lecturers.
              </p>
            </div>
            <button className="ghost-button" onClick={() => setScreen("overAssignedDetails")}>
              View Full Data
            </button>
          </div>

          <div className="panel slim-panel">
            <div>
              <h3>Unassigned Courses</h3>
              <p className="muted-copy">
                <strong>{unassignedCourses.length}</strong> active course(s) not linked to ATS.
              </p>
            </div>
            <button className="ghost-button" onClick={() => setScreen("unassignedDetails")}>
              View Full Data
            </button>
          </div>
        </div>
      </section>
    );
  };

  const renderLoadWarningsDetails = () => (
    <section className="page-grid">
      <div className="panel">
        <div className="panel-header">
          <h3>Load Warnings - Full Data</h3>
          <button className="ghost-button compact" onClick={() => setScreen("dashboard")}>
            Back to Dashboard
          </button>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Lecturer</th>
                <th>Total ATS</th>
                <th>Limits</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {lecturersStatus.map((lecturer) => (
                <tr key={lecturer.id}>
                  <td>
                    <button
                      className="link-button"
                      onClick={() => {
                        setSelectedLecturerId(lecturer.id);
                        setScreen("lecturerAts");
                      }}
                    >
                      <strong>{lecturer.name}</strong>
                    </button>
                  </td>
                  <td>{lecturer.total}</td>
                  <td>
                    {lecturer.minATS} - {lecturer.maxATS}
                  </td>
                  <td>
                    <span
                      className={`status-pill ${lecturer.status
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {lecturer.status}
                    </span>
                  </td>
                </tr>
              ))}

              {lecturersStatus.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center muted-copy">
                    All lecturers are within limits.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  const renderOverAssignedDetails = () => (
    <section className="page-grid">
      <div className="panel">
        <div className="panel-header">
          <h3>Over-assigned Courses - Full Data</h3>
          <button className="ghost-button compact" onClick={() => setScreen("dashboard")}>
            Back to Dashboard
          </button>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Lecturers Assigned</th>
              </tr>
            </thead>
            <tbody>
              {overAssignedCourses.map((course) => {
                const isExpanded = expandedCourseCode === course.code;

                return (
                  <React.Fragment key={course.code}>
                    <tr className={isExpanded ? "expanded-row-parent active" : "expanded-row-parent"}>
                      <td>
                        <button
                          className="link-button"
                          onClick={() =>
                            setExpandedCourseCode(isExpanded ? null : course.code)
                          }
                        >
                          <strong>{course.code}</strong>
                        </button>
                      </td>
                      <td>{course.name}</td>
                      <td>
                        <span className="pill">{course.assignedLecturers.length} Staff</span>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className="expanded-row-child">
                        <td colSpan="3">
                          <div className="dropdown-panel-content">
                            <p className="muted-copy">Lecturers handling {course.code}:</p>
                            <ul className="simple-list">
                              {course.assignedLecturers.map((lecturer) => (
                                <li key={lecturer.id}>{lecturer.name}</li>
                              ))}
                            </ul>
                          </div>
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

  const renderUnassignedDetails = () => (
    <section className="page-grid">
      <div className="panel">
        <div className="panel-header">
          <h3>Unassigned Courses - Full Data</h3>
          <button className="ghost-button compact" onClick={() => setScreen("dashboard")}>
            Back to Dashboard
          </button>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Programs</th>
              </tr>
            </thead>
            <tbody>
              {unassignedCourses.map((course) => (
                <tr key={course.code}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{(course.programs || []).join(", ")}</td>
                </tr>
              ))}

              {unassignedCourses.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center muted-copy">
                    All courses assigned.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  const renderAllLecturersAts = () => {
    const filtered = visibleLecturers
      .filter(
        (lecturer) =>
          !lecSearchName ||
          lecturer.name.toLowerCase().includes(lecSearchName.toLowerCase())
      )
      .filter(
        (lecturer) =>
          !lecSearchDept ||
          lecturer.departments.some((dept) =>
            dept.toLowerCase().includes(lecSearchDept.toLowerCase())
          )
      );

    return (
      <section className="page-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>All Lecturers ATS</h3>
            <button className="ghost-button compact" onClick={() => setScreen("dashboard")}>
              Back to Dashboard
            </button>
          </div>

          <div className="form-grid split-2">
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
              <SearchableSingleSelect
                options={DEPARTMENTS}
                selected={lecSearchDept}
                onChange={(value) => setLecSearchDept(value)}
                placeholder="Type or select department..."
              />
            </label>
          </div>

          <div className="table-wrapper">
            <table className="data-table tight-table all-lecturers-table">
              <thead>
                <tr>
                  <th>Lecturer Name</th>
                  <th>Department</th>
                  <th>Groups Handled</th>
                  <th>Total ATS</th>
                  <th>Min/Max</th>
                  <th>Committees</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lecturer) => {
                  const uniqueGroups = [
                    ...new Set(lecturer.atsEntries.flatMap((entry) => entry.groups || [])),
                  ];
                  const committeesCount = getLecturerCommittees(lecturer.id).length;
                  const isExpanded = expandedLecturerId === lecturer.id;

                  return (
                    <React.Fragment key={lecturer.id}>
                      <tr className={isExpanded ? "expanded-row-parent active" : "expanded-row-parent"}>
                        <td>
                          <button
                            className="link-button"
                            onClick={() => {
                              setSelectedLecturerId(lecturer.id);
                              setScreen("lecturerAts");
                            }}
                          >
                            <strong>{lecturer.name}</strong>
                          </button>
                        </td>
                        <td>{lecturer.departments.join(", ")}</td>
                        <td>{uniqueGroups.join(", ") || "-"}</td>
                        <td>{getAtsTotal(lecturer)}</td>
                        <td>
                          {lecturer.minATS} - {lecturer.maxATS}
                        </td>
                        <td>{committeesCount}</td>
                        <td>
                          <button
                            className="ghost-button compact"
                            onClick={() =>
                              setExpandedLecturerId(isExpanded ? null : lecturer.id)
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
                              <h4>ATS Breakdown for {lecturer.name}</h4>

                              {lecturer.atsEntries.length > 0 ? (
                                <div className="table-wrapper inner-table-wrapper">
                                  <table className="data-table condensed expanded-ats-table">
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
                                      {lecturer.atsEntries.map((entry) => (
                                        <tr key={entry.id}>
                                          <td>{entry.courseCodes.join(", ")}</td>
                                          <td>{entry.courseNames.join(", ")}</td>
                                          <td className="programs-cell">
                                            {entry.programs.join(", ")}
                                          </td>
                                          <td>{entry.groups.join(", ")}</td>
                                          <td className="cell-number">{entry.ks}</td>
                                          <td className="cell-number">{entry.k1Supervision}</td>
                                          <td className="cell-number">{entry.k2Research}</td>
                                          <td className="cell-number">{entry.k3Service}</td>
                                          <td>{entry.remarks || "-"}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
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
  };

  const renderLecturerAts = () => {
    const totals = selectedLecturer
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

    const lecturerCommitteeCount = selectedLecturer
      ? getLecturerCommittees(selectedLecturer.id).length
      : 0;

    return (
      <section className="page-grid">
        <div className="panel">
          <div className="form-grid lecturer-toolbar-grid">
            <label className="field">
              <span>Department</span>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option>All Departments</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Lecturer</span>
              <SearchableSingleSelect
                options={filteredLecturers.map((lecturer) => lecturer.name)}
                selected={selectedLecturer?.name || ""}
                onChange={(value, exact) => {
                  const match = lecturers.find((lecturer) => lecturer.name === value);
                  if (exact && match) setSelectedLecturerId(match.id);
                  if (!value) setSelectedLecturerId(null);
                }}
                placeholder="Search and select lecturer..."
              />
            </label>

            {!isReadOnly && selectedLecturer && (
              <button
                className="primary-button align-end"
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
            <div className="panel lecturer-summary-panel">
              <div className="lecturer-summary-left">
                <h3>{selectedLecturer.name}</h3>
                <p className="muted-copy">
                  {selectedLecturer.position} • {selectedLecturer.departments.join(", ")}
                </p>
                <p>{selectedLecturer.additionalInfo || "No expertise info."}</p>
              </div>

              <div className="lecturer-summary-right">
                <div className="quick-stat-card quick-stat-blue">
                  <span>Total KS</span>
                  <strong>{getTotalKs(selectedLecturer)}</strong>
                </div>
                <div className="quick-stat-card quick-stat-green">
                  <span>Committees</span>
                  <strong>{lecturerCommitteeCount}</strong>
                </div>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="data-table ats-detailed-table">
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
                    <th>Coms.</th>
                    {!isReadOnly && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {selectedLecturer.atsEntries.map((entry) => {
                    const myCommittees = getLecturerCommittees(selectedLecturer.id);

                    return (
                      <tr key={entry.id}>
                        <td>{entry.courseCodes.join(", ")}</td>
                        <td>{entry.courseNames.join(", ")}</td>
                        <td>{entry.programs.join(", ")}</td>
                        <td>{entry.groups.join(", ")}</td>
                        <td className="cell-number">{entry.ks}</td>
                        <td className="cell-number">{entry.k1Supervision}</td>
                        <td className="cell-number">{entry.k2Research}</td>
                        <td className="cell-number">{entry.k3Service}</td>
                        <td>{entry.remarks || "-"}</td>
                        <td>
                          <button
                            className="link-button"
                            onClick={() => setViewLecturerComsId(selectedLecturer.id)}
                          >
                            {myCommittees.length}
                          </button>
                        </td>
                        {!isReadOnly && (
                          <td>
                            <div className="actions-cell">
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
                      <td className="cell-number">{totals.ks}</td>
                      <td className="cell-number">{totals.k1}</td>
                      <td className="cell-number">{totals.k2}</td>
                      <td className="cell-number">{totals.k3}</td>
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
              Search and select a lecturer above to view ATS details.
            </p>
          </div>
        )}
      </section>
    );
  };

  const renderGroupInfo = () => {
    const filtered = visibleGroups.filter(
      (group) => groupFilterDept === "All" || group.department === groupFilterDept
    );

    return (
      <section className="page-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Group Info</h3>
              <p className="muted-copy">
                Manage student counts. {isReadOnly ? "(Read-Only Mode)" : ""}
              </p>
            </div>

            <label className="field mini-field">
              <span>Department Filter</span>
              <select
                value={groupFilterDept}
                onChange={(e) => setGroupFilterDept(e.target.value)}
              >
                <option value="All">All</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
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
                  <th>Semester</th>
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
                            prev.map((item) =>
                              item.id === group.id
                                ? { ...item, studentCount: Number(e.target.value) }
                                : item
                            )
                          )
                        }
                        className="small-number-input"
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
  };

  const renderSettings = () => {
    if (!canAccessSettings) {
      return (
        <section className="page-grid">
          <div className="panel empty-state">
            <p className="muted-copy">You do not have permission to access Settings.</p>
          </div>
        </section>
      );
    }

    const visibleUserTabs = ["admin", "coordinator", "guest"];

    return (
      <section className="page-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Settings & Admin</h3>
              <p className="muted-copy">
                Manage core data, system globals, and permissions.
              </p>
            </div>
          </div>

          <div className="tab-row">
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
              ...(isDeveloper ? ["developer"] : []),
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
          <div className="panel">
            <div className="form-grid three-cols">
              <label className="field">
                <span>Faculty</span>
                <input
                  value={globalInfo.faculty}
                  disabled={isReadOnly}
                  onChange={(e) =>
                    setGlobalInfo((prev) => ({ ...prev, faculty: e.target.value }))
                  }
                />
              </label>

              <label className="field">
                <span>Semester</span>
                <input
                  value={globalInfo.semester}
                  disabled={isReadOnly}
                  onChange={(e) =>
                    setGlobalInfo((prev) => ({ ...prev, semester: e.target.value }))
                  }
                />
              </label>

              <label className="field">
                <span>Mode</span>
                <select
                  value={globalInfo.mode}
                  disabled={!isAdmin && !isDeveloper}
                  onChange={(e) =>
                    setGlobalInfo((prev) => ({ ...prev, mode: e.target.value }))
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
          <div className="panel">
            <div className="tab-row">
              {visibleUserTabs.map((role) => (
                <button
                  key={role}
                  className={`tab-button ${userRoleTab === role ? "active" : ""}`}
                  onClick={() => setUserRoleTab(role)}
                >
                  {role}
                </button>
              ))}
            </div>

            {!isReadOnly && (
              <button
                className="primary-button compact section-action"
                onClick={() => openEditUser(userRoleTab, null)}
              >
                Add User
              </button>
            )}

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Password</th>
                    {!isReadOnly && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {(users[userRoleTab] || []).map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.password}</td>
                      {!isReadOnly && (
                        <td className="actions-cell">
                          <button
                            className="ghost-button compact"
                            onClick={() => openEditUser(userRoleTab, user)}
                          >
                            Edit
                          </button>
                          <button
                            className="ghost-button compact red"
                            onClick={() => deleteUser(userRoleTab, user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}

                  {(users[userRoleTab] || []).length === 0 && (
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

        {settingsTab === "developer" && isDeveloper && (
          <div className="panel">
            <div className="form-grid split-2">
              <label className="field">
                <span>Developer Password</span>
                <input
                  type="text"
                  value={developerPasswordDraft}
                  onChange={(e) => setDeveloperPasswordDraft(e.target.value)}
                />
              </label>

              <div className="field">
                <span>Action</span>
                <button className="primary-button" onClick={saveDeveloperPassword}>
                  Save Developer Password
                </button>
              </div>
            </div>
          </div>
        )}

        {settingsTab === "committees" && (
          <div className="panel">
            <div className="tab-row">
              {COMMITTEE_CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`tab-button ${comSettingsTab === category ? "active" : ""}`}
                  onClick={() => setComSettingsTab(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="table-wrapper">
              <table className="data-table committee-table">
                <thead>
                  <tr>
                    <th>Committee / Position</th>
                    <th className="text-center">Members Count</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {committees
                    .filter((committee) => committee.category === comSettingsTab)
                    .map((committee) => (
                      <tr key={committee.id}>
                        <td>
                          <button
                            className="link-button"
                            onClick={() => setViewCommitteeData(committee)}
                          >
                            {committee.name}
                          </button>
                        </td>
                        <td className="cell-number">{committee.members.length}</td>
                        <td>
                          <button
                            className="ghost-button compact"
                            onClick={() => setManageCommitteeData(committee)}
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
          <div className="panel">
            <div className="panel-header stack-mobile">
              <input
                className="search-alone"
                value={searchProgram}
                onChange={(e) => setSearchProgram(e.target.value)}
                placeholder="Search program..."
              />

              {!isReadOnly && (
                <button className="primary-button compact" onClick={() => openEditProgram()}>
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
                    .filter((program) =>
                      program.name.toLowerCase().includes(searchProgram.toLowerCase())
                    )
                    .sort(sortHiddenLast)
                    .map((program) => (
                      <tr key={program.id} className={program.isHidden ? "hidden-row" : ""}>
                        <td>{program.name}</td>
                        {!isReadOnly && (
                          <td className="actions-cell">
                            <button
                              className="ghost-button compact"
                              onClick={() => openEditProgram(program)}
                            >
                              Edit
                            </button>
                            <button
                              className="ghost-button compact"
                              onClick={() => toggleHide("program", program.id)}
                            >
                              {program.isHidden ? "Unhide" : "Hide"}
                            </button>
                            <button
                              className="ghost-button compact red"
                              onClick={() => deleteProgram(program.id)}
                            >
                              Delete
                            </button>
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
          <div className="panel">
            <div className="panel-header stack-mobile">
              <div className="toolbar compact-toolbar">
                <input
                  value={searchGroup}
                  onChange={(e) => setSearchGroup(e.target.value)}
                  placeholder="Search group..."
                />
                <select
                  value={filterGroupDept}
                  onChange={(e) => setFilterGroupDept(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {!isReadOnly && (
                <button className="primary-button compact" onClick={() => openEditGroup()}>
                  Add Group
                </button>
              )}
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Group</th>
                    <th>Department</th>
                    <th>Student Count</th>
                    {!isReadOnly && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {groups
                    .filter(
                      (group) =>
                        (filterGroupDept === "All" || group.department === filterGroupDept) &&
                        group.groupName.toLowerCase().includes(searchGroup.toLowerCase())
                    )
                    .sort(sortHiddenLast)
                    .map((group) => (
                      <tr key={group.id} className={group.isHidden ? "hidden-row" : ""}>
                        <td>{group.groupName}</td>
                        <td>{group.department}</td>
                        <td>{group.studentCount}</td>
                        {!isReadOnly && (
                          <td className="actions-cell">
                            <button
                              className="ghost-button compact"
                              onClick={() => openEditGroup(group)}
                            >
                              Edit
                            </button>
                            <button
                              className="ghost-button compact"
                              onClick={() => toggleHide("group", group.id)}
                            >
                              {group.isHidden ? "Unhide" : "Hide"}
                            </button>
                            <button
                              className="ghost-button compact red"
                              onClick={() => deleteGroup(group.id)}
                            >
                              Delete
                            </button>
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
          <div className="panel">
            <div className="panel-header stack-mobile">
              <div className="toolbar compact-toolbar">
                <input
                  value={searchLecturer}
                  onChange={(e) => setSearchLecturer(e.target.value)}
                  placeholder="Search lecturer..."
                />
                <select
                  value={filterLecturerDept}
                  onChange={(e) => setFilterLecturerDept(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {!isReadOnly && (
                <button className="primary-button compact" onClick={() => openEditLecturer()}>
                  Add Lecturer
                </button>
              )}
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Departments</th>
                    <th>Position</th>
                    <th>ATS Range</th>
                    {!isReadOnly && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {lecturers
                    .filter(
                      (lecturer) =>
                        (filterLecturerDept === "All" ||
                          lecturer.departments.includes(filterLecturerDept)) &&
                        lecturer.name.toLowerCase().includes(searchLecturer.toLowerCase())
                    )
                    .sort(sortHiddenLast)
                    .map((lecturer) => (
                      <tr key={lecturer.id} className={lecturer.isHidden ? "hidden-row" : ""}>
                        <td>{lecturer.name}</td>
                        <td>{lecturer.departments.join(", ")}</td>
                        <td>{lecturer.position}</td>
                        <td>
                          {lecturer.minATS} - {lecturer.maxATS}
                        </td>
                        {!isReadOnly && (
                          <td className="actions-cell">
                            <button
                              className="ghost-button compact"
                              onClick={() => openEditLecturer(lecturer)}
                            >
                              Edit
                            </button>
                            <button
                              className="ghost-button compact"
                              onClick={() => toggleHide("lecturer", lecturer.id)}
                            >
                              {lecturer.isHidden ? "Unhide" : "Hide"}
                            </button>
                            <button
                              className="ghost-button compact red"
                              onClick={() => deleteLecturer(lecturer.id)}
                            >
                              Delete
                            </button>
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
          <div className="panel">
            <div className="panel-header stack-mobile">
              <div className="toolbar compact-toolbar">
                <input
                  value={searchCourse}
                  onChange={(e) => setSearchCourse(e.target.value)}
                  placeholder="Search code or course..."
                />
                <select
                  value={filterCourseDept}
                  onChange={(e) => setFilterCourseDept(e.target.value)}
                >
                  <option value="All">All Programs</option>
                  {visiblePrograms.map((program) => (
                    <option key={program.id} value={program.name}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              {!isReadOnly && (
                <button className="primary-button compact" onClick={() => openEditCourse()}>
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
                      (course) =>
                        (filterCourseDept === "All" ||
                          course.programs?.includes(filterCourseDept)) &&
                        (course.code.toLowerCase().includes(searchCourse.toLowerCase()) ||
                          course.name.toLowerCase().includes(searchCourse.toLowerCase()))
                    )
                    .sort(sortHiddenLast)
                    .map((course) => (
                      <tr key={course.id} className={course.isHidden ? "hidden-row" : ""}>
                        <td>{course.code}</td>
                        <td>{course.name}</td>
                        <td>{course.programs.join(", ")}</td>
                        {!isReadOnly && (
                          <td className="actions-cell">
                            <button
                              className="ghost-button compact"
                              onClick={() => openEditCourse(course)}
                            >
                              Edit
                            </button>
                            <button
                              className="ghost-button compact"
                              onClick={() => toggleHide("course", course.id)}
                            >
                              {course.isHidden ? "Unhide" : "Hide"}
                            </button>
                            <button
                              className="ghost-button compact red"
                              onClick={() => deleteCourse(course.id)}
                            >
                              Delete
                            </button>
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
          <div className="panel">
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User ID</th>
                    <th>Action</th>
                    <th>Undo</th>
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
          <div className="panel">
            <div className="panel-header">
              <p className="muted-copy">Save the current state to refer back to later.</p>
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
                  {archives.map((archive) => (
                    <tr key={archive.id}>
                      <td>{archive.dateArchived}</td>
                      <td>{archive.semester}</td>
                      <td className="actions-cell">
                        <button
                          className="ghost-button compact"
                          onClick={() => loadArchive(archive)}
                        >
                          Load
                        </button>
                        <button
                          className="ghost-button compact red"
                          onClick={() => deleteArchive(archive.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {archives.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center muted-copy">
                        No archives saved.
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
  };

  const renderSimplePlaceholder = (title) => (
    <section className="page-grid">
      <div className="panel empty-state">
        <p className="muted-copy">{title} page is under construction.</p>
      </div>
    </section>
  );

  const renderCurrentScreen = () => {
    switch (screen) {
      case "dashboard":
        return renderDashboard();
      case "groupInfo":
        return renderGroupInfo();
      case "lecturerAts":
        return renderLecturerAts();
      case "allLecturersAts":
        return renderAllLecturersAts();
      case "loadWarningsDetails":
        return renderLoadWarningsDetails();
      case "overAssignedDetails":
        return renderOverAssignedDetails();
      case "unassignedDetails":
        return renderUnassignedDetails();
      case "settings":
        return renderSettings();
      case "muf":
        return renderSimplePlaceholder("MUF Codes");
      case "performing":
        return renderSimplePlaceholder("Performing Groups");
      case "servicing":
        return renderSimplePlaceholder("Servicing Codes");
      case "forum":
        return renderSimplePlaceholder("Forum / Colloquium");
      default:
        return renderDashboard();
    }
  };

  if (screen === "login") {
    return (
      <div className="app-shell login-shell">
        <div className="login-card">
          <div className="brand-block">
            <div className="brand-mark large">ATS</div>
            <h1>Lecturer Load Planner</h1>
            <p className="muted-copy">
              Faculty workload management system for teaching load planning.
            </p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div>
              <h2>Welcome back</h2>
              <p className="muted-copy">Please sign in to continue.</p>
            </div>

            <div className="role-switcher-inline">
              {LOGIN_ROLE_OPTIONS.map((role) => (
                <button
                  key={role.key}
                  type="button"
                  className={`role-pill ${selectedLoginRole === role.key ? "active" : ""}`}
                  onClick={() => setSelectedLoginRole(role.key)}
                >
                  {role.label}
                </button>
              ))}
            </div>

            <label className="field">
              <span>Username</span>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Leave blank only for developer access"
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </label>

            {loginError && <p className="error-text">{loginError}</p>}

            <button type="submit" className="primary-button login-submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {renderSidebar()}

      <div className="main-content">
        <header className="topbar">
          <h1>
            ATS Application -{" "}
            {screen === "lecturerAts"
              ? "Lecturer ATS"
              : screen === "groupInfo"
              ? "Group Info"
              : screen === "allLecturersAts"
              ? "All Lecturers ATS"
              : screen === "loadWarningsDetails"
              ? "Load Warnings"
              : screen === "overAssignedDetails"
              ? "Over-assigned Courses"
              : screen === "unassignedDetails"
              ? "Unassigned Courses"
              : screen === "settings"
              ? "Settings"
              : screen.charAt(0).toUpperCase() + screen.slice(1)}
          </h1>
        </header>

        <main className="main-scroll">{renderCurrentScreen()}</main>
      </div>

      {lecturerDraft && (
        <div className="global-overlay">
          <div className="modal-content center-modal">
            <div className="modal-header">
              <h3>{lecturerDraft.name ? "Edit Lecturer" : "Add Lecturer"}</h3>
              <button className="ghost-button compact" onClick={() => setLecturerDraft(null)}>
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
                      setLecturerDraft({ ...lecturerDraft, name: e.target.value })
                    }
                  />
                </label>

                <label className="field">
                  <span>Position</span>
                  <select
                    value={lecturerDraft.position}
                    onChange={(e) =>
                      setLecturerDraft({ ...lecturerDraft, position: e.target.value })
                    }
                  >
                    {POSITION_OPTIONS.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Expertise</span>
                  <input
                    type="text"
                    value={lecturerDraft.additionalInfo}
                    onChange={(e) =>
                      setLecturerDraft({
                        ...lecturerDraft,
                        additionalInfo: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <div className="field">
                <span>Departments</span>
                <MultiSelectChips
                  options={DEPARTMENTS}
                  selected={lecturerDraft.departments}
                  onChange={(value) =>
                    setLecturerDraft({ ...lecturerDraft, departments: value })
                  }
                  placeholder="Select departments..."
                />
              </div>

              <div className="form-grid three-cols">
                <label className="field">
                  <span>Min ATS</span>
                  <input
                    type="number"
                    value={lecturerDraft.minATS}
                    onChange={(e) =>
                      setLecturerDraft({
                        ...lecturerDraft,
                        minATS: Number(e.target.value),
                      })
                    }
                  />
                </label>

                <label className="field">
                  <span>Max ATS</span>
                  <input
                    type="number"
                    value={lecturerDraft.maxATS}
                    onChange={(e) =>
                      setLecturerDraft({
                        ...lecturerDraft,
                        maxATS: Number(e.target.value),
                      })
                    }
                  />
                </label>

                <label className="field">
                  <span>Remarks</span>
                  <input
                    type="text"
                    value={lecturerDraft.remarks}
                    onChange={(e) =>
                      setLecturerDraft({ ...lecturerDraft, remarks: e.target.value })
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
      )}

      {courseDraft && (
        <div className="global-overlay">
          <div className="modal-content center-modal">
            <div className="modal-header">
              <h3>{courseDraft.code ? "Edit Course" : "Add Course"}</h3>
              <button className="ghost-button compact" onClick={() => setCourseDraft(null)}>
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
                      setCourseDraft({ ...courseDraft, code: e.target.value.toUpperCase() })
                    }
                  />
                </label>

                <label className="field">
                  <span>Course Name</span>
                  <input
                    type="text"
                    value={courseDraft.name}
                    onChange={(e) =>
                      setCourseDraft({ ...courseDraft, name: e.target.value.toUpperCase() })
                    }
                  />
                </label>
              </div>

              <div className="field">
                <span>Programs</span>
                <MultiSelectChips
                  options={visiblePrograms.map((program) => program.name)}
                  selected={courseDraft.programs}
                  onChange={(value) => setCourseDraft({ ...courseDraft, programs: value })}
                  placeholder="Select programs..."
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="primary-button full-width" onClick={saveCourse}>
                Save Course
              </button>
            </div>
          </div>
        </div>
      )}

      {programDraft && (
        <div className="global-overlay">
          <div className="modal-content center-modal">
            <div className="modal-header">
              <h3>{programDraft.name ? "Edit Program" : "Add Program"}</h3>
              <button className="ghost-button compact" onClick={() => setProgramDraft(null)}>
                Close
              </button>
            </div>
            <div className="modal-body">
              <label className="field">
                <span>Program Name</span>
                <input
                  type="text"
                  value={programDraft.name}
                  onChange={(e) =>
                    setProgramDraft({ ...programDraft, name: e.target.value.toUpperCase() })
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
          <div className="modal-content center-modal">
            <div className="modal-header">
              <h3>{groupDraft.groupName ? "Edit Group" : "Add Group"}</h3>
              <button className="ghost-button compact" onClick={() => setGroupDraft(null)}>
                Close
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid three-cols">
                <label className="field">
                  <span>Group Name</span>
                  <input
                    type="text"
                    value={groupDraft.groupName}
                    onChange={(e) =>
                      setGroupDraft({ ...groupDraft, groupName: e.target.value.toUpperCase() })
                    }
                  />
                </label>

                <label className="field">
                  <span>Department</span>
                  <select
                    value={groupDraft.department}
                    onChange={(e) =>
                      setGroupDraft({ ...groupDraft, department: e.target.value })
                    }
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
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
                      setGroupDraft({
                        ...groupDraft,
                        studentCount: Number(e.target.value),
                      })
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

      {userDraft && canAccessSettings && (
        <div className="global-overlay">
          <div className="modal-content center-modal">
            <div className="modal-header">
              <h3>{userDraft.username ? "Edit User" : "Add User"}</h3>
              <button className="ghost-button compact" onClick={() => setUserDraft(null)}>
                Close
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid split-2">
                <label className="field">
                  <span>Username</span>
                  <input
                    type="text"
                    value={userDraft.username}
                    onChange={(e) =>
                      setUserDraft({ ...userDraft, username: e.target.value })
                    }
                  />
                </label>

                <label className="field">
                  <span>Password</span>
                  <input
                    type="text"
                    value={userDraft.password}
                    onChange={(e) =>
                      setUserDraft({ ...userDraft, password: e.target.value })
                    }
                  />
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

      {isAddAtsModalOpen && (
        <div className="global-overlay">
          <div className="modal-content center-modal">
            <div className="modal-header">
              <h3>{newAtsDraft.id.includes("ats-test") ? "Edit ATS Entry" : "Add ATS Entry"}</h3>
              <button
                className="ghost-button compact"
                onClick={() => {
                  setIsAddAtsModalOpen(false);
                  setNewAtsDraft(createBlankAtsEntry());
                }}
              >
                Close
              </button>
            </div>

            <div className="modal-body">
              <div className="field">
                <span>Course Codes</span>
                <MultiSelectChips
                  options={visibleCourses.map((course) => course.code)}
                  selected={newAtsDraft.courseCodes}
                  onChange={handleAtsCourseCodesChange}
                  placeholder="Select course codes..."
                />
              </div>

              <div className="form-grid split-2">
                <label className="field">
                  <span>Programs</span>
                  <MultiSelectChips
                    options={visiblePrograms.map((program) => program.name)}
                    selected={newAtsDraft.programs}
                    onChange={(value) => setNewAtsDraft({ ...newAtsDraft, programs: value })}
                    placeholder="Select programs..."
                  />
                </label>

                <label className="field">
                  <span>Groups</span>
                  <MultiSelectChips
                    options={visibleGroups.map((group) => group.groupName)}
                    selected={newAtsDraft.groups}
                    onChange={(value) => setNewAtsDraft({ ...newAtsDraft, groups: value })}
                    placeholder="Select groups..."
                  />
                </label>
              </div>

              <div className="form-grid ats-metrics-grid">
                <label className="field">
                  <span>KS</span>
                  <input
                    type="number"
                    value={newAtsDraft.ks}
                    onChange={(e) =>
                      setNewAtsDraft({ ...newAtsDraft, ks: Number(e.target.value) })
                    }
                  />
                </label>

                <label className="field">
                  <span>Contact Hours</span>
                  <input
                    type="number"
                    value={newAtsDraft.contactHours}
                    onChange={(e) =>
                      setNewAtsDraft({
                        ...newAtsDraft,
                        contactHours: Number(e.target.value),
                      })
                    }
                  />
                </label>

                <label className="field">
                  <span>K1 Supervision</span>
                  <input
                    type="number"
                    value={newAtsDraft.k1Supervision}
                    onChange={(e) =>
                      setNewAtsDraft({
                        ...newAtsDraft,
                        k1Supervision: Number(e.target.value),
                      })
                    }
                  />
                </label>

                <label className="field">
                  <span>K2 Research</span>
                  <input
                    type="number"
                    value={newAtsDraft.k2Research}
                    onChange={(e) =>
                      setNewAtsDraft({
                        ...newAtsDraft,
                        k2Research: Number(e.target.value),
                      })
                    }
                  />
                </label>

                <label className="field">
                  <span>K3 Service</span>
                  <input
                    type="number"
                    value={newAtsDraft.k3Service}
                    onChange={(e) =>
                      setNewAtsDraft({
                        ...newAtsDraft,
                        k3Service: Number(e.target.value),
                      })
                    }
                  />
                </label>
              </div>

              <label className="field">
                <span>Remarks</span>
                <textarea
                  value={newAtsDraft.remarks}
                  onChange={(e) =>
                    setNewAtsDraft({ ...newAtsDraft, remarks: e.target.value })
                  }
                  placeholder="You can press Enter for paragraph breaks..."
                />
              </label>
            </div>

            <div className="modal-footer">
              <button className="primary-button full-width" onClick={saveAtsEntry}>
                Save ATS Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {manageCommitteeData && (
        <div className="global-overlay">
          <div className="modal-content center-modal">
            <div className="modal-header">
              <h3>Manage Committee - {manageCommitteeData.name}</h3>
              <button
                className="ghost-button compact"
                onClick={() => {
                  setManageCommitteeData(null);
                  setNewMemberDraft({ lecturerName: "", position: "" });
                }}
              >
                Close
              </button>
            </div>

            <div className="modal-body">
              <div className="form-grid split-2">
                <label className="field">
                  <span>Lecturer</span>
                  <SearchableSingleSelect
                    options={lecturers.map((lecturer) => lecturer.name)}
                    selected={newMemberDraft.lecturerName}
                    onChange={(value) =>
                      setNewMemberDraft((prev) => ({ ...prev, lecturerName: value }))
                    }
                    placeholder="Search lecturer..."
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
                    placeholder="Committee role..."
                  />
                </label>
              </div>

              <button className="primary-button compact section-action" onClick={saveCommitteeMember}>
                Add / Update Member
              </button>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Lecturer</th>
                      <th>Position</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {manageCommitteeData.members.map((member) => {
                      const lecturer = lecturers.find((item) => item.id === member.lecturerId);
                      return (
                        <tr key={member.lecturerId}>
                          <td>{lecturer?.name || member.lecturerId}</td>
                          <td>{member.position}</td>
                          <td>
                            <button
                              className="ghost-button compact red"
                              onClick={() => deleteCommitteeMember(member.lecturerId)}
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
      )}

      {viewCommitteeData && (
        <div className="global-overlay">
          <div className="modal-content center-modal">
            <div className="modal-header">
              <h3>{viewCommitteeData.name}</h3>
              <button className="ghost-button compact" onClick={() => setViewCommitteeData(null)}>
                Close
              </button>
            </div>

            <div className="modal-body">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Lecturer</th>
                      <th>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewCommitteeData.members.map((member) => {
                      const lecturer = lecturers.find((item) => item.id === member.lecturerId);
                      return (
                        <tr key={member.lecturerId}>
                          <td>{lecturer?.name || member.lecturerId}</td>
                          <td>{member.position}</td>
                        </tr>
                      );
                    })}

                    {viewCommitteeData.members.length === 0 && (
                      <tr>
                        <td colSpan="2" className="text-center muted-copy">
                          No committee members found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewLecturerComsId && (
        <div className="global-overlay">
          <div className="modal-content center-modal">
            <div className="modal-header">
              <h3>Lecturer Committees</h3>
              <button className="ghost-button compact" onClick={() => setViewLecturerComsId(null)}>
                Close
              </button>
            </div>

            <div className="modal-body">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Committee</th>
                      <th>Category</th>
                      <th>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getLecturerCommittees(viewLecturerComsId).map((committee) => (
                      <tr key={`${committee.committeeId}-${committee.position}`}>
                        <td>{committee.committeeName}</td>
                        <td>{committee.category}</td>
                        <td>{committee.position}</td>
                      </tr>
                    ))}

                    {getLecturerCommittees(viewLecturerComsId).length === 0 && (
                      <tr>
                        <td colSpan="3" className="text-center muted-copy">
                          No committee assignments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmConfig.isOpen && (
        <div className="global-overlay">
          <div className="modal-content center-modal confirm-modal">
            <div className="modal-header">
              <h3>{confirmConfig.title}</h3>
            </div>
            <div className="modal-body">
              <p>{confirmConfig.message}</p>
            </div>
            <div className="modal-footer confirm-buttons">
              <button
                className="ghost-button"
                onClick={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
              >
                Cancel
              </button>
              <button className="primary-button" onClick={confirmConfig.onConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}