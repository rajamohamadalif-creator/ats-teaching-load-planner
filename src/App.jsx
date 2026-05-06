import { useMemo, useState } from "react";
import "./App.css";

const DEPARTMENTS = [
  "MU110 Diploma in Music",
  "MU111 Diploma in Digital Audio Production",
  "MU220/MU230 Bachelor in Music Education",
  "MU221 Bachelor in Music Composition",
  "MU222 Bachelor in Music Performance",
  "MU223 Bachelor in Music Business",
  "MU750 Master of Music (By Research)",
  "MU778 Master of Music Education (By Coursework)",
  "MU790 Master of Music Performance",
  "MU950 PhD in Music (By Research)",
];

const INITIAL_USERS = {
  admin: [
    { id: "admin-1", username: "admin1", password: "111" },
    { id: "admin-2", username: "admin2", password: "222" },
    { id: "admin-3", username: "admin3", password: "333" },
  ],
  coordinator: [
    { id: "coord-1", username: "user1", password: "111" },
    { id: "coord-2", username: "user2", password: "222" },
    { id: "coord-3", username: "user3", password: "333" },
  ],
  guest: [
    { id: "guest-1", username: "guest1", password: "111" },
    { id: "guest-2", username: "guest2", password: "222" },
    { id: "guest-3", username: "guest3", password: "333" },
  ],
};

const INITIAL_LECTURERS = [
  {
    id: "lec-1",
    name: "Dr. Aisyah Rahman",
    departments: [
      "MU221 Bachelor in Music Composition",
      "MU110 Diploma in Music",
    ],
    minATS: 16,
    maxATS: 18,
    position: "Lecturer",
    additionalInfo: "Composition, harmony, orchestration",
    atsEntries: [
      {
        id: "ats-1",
        courseCodes: ["MUC2213"],
        courseNames: ["Composition Techniques I"],
        programs: ["MU221 Bachelor in Music Composition"],
        ks: 4,
        k1Supervision: 1,
        k2Research: 2,
        k3Service: 1,
        notes: "Final year composition mentoring",
      },
      {
        id: "ats-2",
        courseCodes: ["MUA1102", "MUA1103"],
        courseNames: ["Aural Skills", "Music Theory Basics"],
        programs: ["MU110 Diploma in Music"],
        ks: 5,
        k1Supervision: 0,
        k2Research: 1,
        k3Service: 1,
        notes: "Combined diploma support class",
      },
    ],
  },
  {
    id: "lec-2",
    name: "Prof. Siti Mariam",
    departments: ["MU220/MU230 Bachelor in Music Education"],
    minATS: 16,
    maxATS: 18,
    position: "Dean",
    additionalInfo: "Music pedagogy, curriculum planning",
    atsEntries: [
      {
        id: "ats-3",
        courseCodes: ["MUE2304"],
        courseNames: ["Curriculum Design for Music Educators"],
        programs: ["MU220/MU230 Bachelor in Music Education"],
        ks: 3,
        k1Supervision: 1,
        k2Research: 3,
        k3Service: 2,
        notes: "Faculty leadership workload included",
      },
    ],
  },
  {
    id: "lec-3",
    name: "Mr. Daniel Chong",
    departments: [
      "MU222 Bachelor in Music Performance",
      "MU790 Master of Music Performance",
    ],
    minATS: 16,
    maxATS: 18,
    position: "Lecturer",
    additionalInfo: "Piano, chamber coaching",
    atsEntries: [
      {
        id: "ats-4",
        courseCodes: ["MUP2221"],
        courseNames: ["Principal Study Piano"],
        programs: ["MU222 Bachelor in Music Performance"],
        ks: 6,
        k1Supervision: 2,
        k2Research: 0,
        k3Service: 1,
        notes: "Studio teaching",
      },
      {
        id: "ats-5",
        courseCodes: ["MUP7902"],
        courseNames: ["Advanced Performance Seminar"],
        programs: ["MU790 Master of Music Performance"],
        ks: 4,
        k1Supervision: 1,
        k2Research: 1,
        k3Service: 0,
        notes: "Masters recital supervision",
      },
    ],
  },
  {
    id: "lec-4",
    name: "Dr. Farid Hakim",
    departments: [
      "MU111 Diploma in Digital Audio Production",
      "MU223 Bachelor in Music Business",
    ],
    minATS: 16,
    maxATS: 18,
    position: "Deputy Dean of Academic Affairs",
    additionalInfo: "Audio production, music technology, industry practice",
    atsEntries: [
      {
        id: "ats-6",
        courseCodes: ["MUD1114"],
        courseNames: ["Digital Audio Workstations"],
        programs: ["MU111 Diploma in Digital Audio Production"],
        ks: 4,
        k1Supervision: 1,
        k2Research: 1,
        k3Service: 2,
        notes: "Lab-heavy course",
      },
      {
        id: "ats-7",
        courseCodes: ["MUB2232"],
        courseNames: ["Music Entrepreneurship"],
        programs: ["MU223 Bachelor in Music Business"],
        ks: 3,
        k1Supervision: 0,
        k2Research: 1,
        k3Service: 1,
        notes: "",
      },
    ],
  },
  {
    id: "lec-5",
    name: "Dr. Nur Syafiqah",
    departments: [
      "MU750 Master of Music (By Research)",
      "MU950 PhD in Music (By Research)",
    ],
    minATS: 16,
    maxATS: 18,
    position: "Lecturer",
    additionalInfo: "Research methods, ethnomusicology",
    atsEntries: [
      {
        id: "ats-8",
        courseCodes: ["MUR7501"],
        courseNames: ["Research Colloquium"],
        programs: ["MU750 Master of Music (By Research)"],
        ks: 2,
        k1Supervision: 4,
        k2Research: 3,
        k3Service: 1,
        notes: "Postgraduate supervision cluster",
      },
      {
        id: "ats-9",
        courseCodes: ["MUR9501"],
        courseNames: ["Doctoral Research Seminar"],
        programs: ["MU950 PhD in Music (By Research)"],
        ks: 2,
        k1Supervision: 4,
        k2Research: 4,
        k3Service: 1,
        notes: "",
      },
    ],
  },
  {
    id: "lec-6",
    name: "Ms. Hannah Lee",
    departments: [
      "MU110 Diploma in Music",
      "MU222 Bachelor in Music Performance",
    ],
    minATS: 16,
    maxATS: 18,
    position: "Lecturer",
    additionalInfo: "Voice, diction, ensemble coaching",
    atsEntries: [
      {
        id: "ats-10",
        courseCodes: ["MUV1102"],
        courseNames: ["Class Voice"],
        programs: ["MU110 Diploma in Music"],
        ks: 5,
        k1Supervision: 0,
        k2Research: 0,
        k3Service: 1,
        notes: "",
      },
      {
        id: "ats-11",
        courseCodes: ["MUV2223"],
        courseNames: ["Vocal Repertoire Studies"],
        programs: ["MU222 Bachelor in Music Performance"],
        ks: 5,
        k1Supervision: 1,
        k2Research: 0,
        k3Service: 1,
        notes: "Choir concert prep",
      },
    ],
  },
  {
    id: "lec-7",
    name: "Mr. Adam Firdaus",
    departments: [
      "MU111 Diploma in Digital Audio Production",
      "MU221 Bachelor in Music Composition",
    ],
    minATS: 16,
    maxATS: 18,
    position: "Lecturer",
    additionalInfo: "Electronic music, sound design",
    atsEntries: [
      {
        id: "ats-12",
        courseCodes: ["MUE2215"],
        courseNames: ["Electroacoustic Composition"],
        programs: ["MU221 Bachelor in Music Composition"],
        ks: 4,
        k1Supervision: 1,
        k2Research: 1,
        k3Service: 0,
        notes: "",
      },
      {
        id: "ats-13",
        courseCodes: ["MUD1115"],
        courseNames: ["Sound Design Fundamentals"],
        programs: ["MU111 Diploma in Digital Audio Production"],
        ks: 4,
        k1Supervision: 0,
        k2Research: 1,
        k3Service: 0,
        notes: "",
      },
    ],
  },
  {
    id: "lec-8",
    name: "Dr. Priya Nair",
    departments: [
      "MU778 Master of Music Education (By Coursework)",
      "MU220/MU230 Bachelor in Music Education",
    ],
    minATS: 16,
    maxATS: 18,
    position: "Lecturer",
    additionalInfo: "Assessment design, reflective practice",
    atsEntries: [
      {
        id: "ats-14",
        courseCodes: ["MUE7782"],
        courseNames: ["Contemporary Issues in Music Education"],
        programs: ["MU778 Master of Music Education (By Coursework)"],
        ks: 3,
        k1Supervision: 2,
        k2Research: 1,
        k3Service: 1,
        notes: "",
      },
      {
        id: "ats-15",
        courseCodes: ["MUE2302"],
        courseNames: ["Assessment in Music Teaching"],
        programs: ["MU220/MU230 Bachelor in Music Education"],
        ks: 3,
        k1Supervision: 1,
        k2Research: 1,
        k3Service: 1,
        notes: "",
      },
    ],
  },
];

const POSITION_OPTIONS = [
  "Lecturer",
  "Dean",
  "Deputy Dean of Academic Affairs",
];

const LOGIN_ROLE_OPTIONS = [
  { key: "admin", label: "Admin" },
  { key: "coordinator", label: "Program Coordinator" },
  { key: "guest", label: "Guest" },
];

function getAtsTotal(lecturer) {
  return lecturer.atsEntries.reduce((sum, entry) => {
    return (
      sum +
      Number(entry.ks || 0) +
      Number(entry.k1Supervision || 0) +
      Number(entry.k2Research || 0) +
      Number(entry.k3Service || 0)
    );
  }, 0);
}
function getAtsColumnTotals(lecturer) {
  return lecturer.atsEntries.reduce(
    (totals, entry) => {
      totals.ks += Number(entry.ks || 0);
      totals.k1 += Number(entry.k1Supervision || 0);
      totals.k2 += Number(entry.k2Research || 0);
      totals.k3 += Number(entry.k3Service || 0);
      return totals;
    },
    { ks: 0, k1: 0, k2: 0, k3: 0 }
  );
}

function formatProgramsShort(programs) {
  return programs
    .map((program) => String(program).split(" ")[0])
    .join(" / ");
}

function formatListSlash(items) {
  return items.join(" / ");
}
function createBlankAtsEntry() {
  return {
    id: `ats-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    courseCodes: [""],
    courseNames: [""],
    programs: [""],
    ks: 0,
    k1Supervision: 0,
    k2Research: 0,
    k3Service: 0,
    notes: "",
  };
}

function createBlankLecturer() {
  return {
    id: `lec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    departments: [],
    minATS: 16,
    maxATS: 18,
    position: "Lecturer",
    additionalInfo: "",
    atsEntries: [],
  };
}

function createBlankUser(roleKey) {
  return {
    id: `${roleKey}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    username: "",
    password: "",
  };
}

function App() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [lecturers, setLecturers] = useState(INITIAL_LECTURERS);
  const [screen, setScreen] = useState("login");
  const [selectedLoginRole, setSelectedLoginRole] = useState("admin");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [currentUser, setCurrentUser] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [lecturerQuery, setLecturerQuery] = useState("");
  const [selectedLecturerId, setSelectedLecturerId] = useState(null);
const [isAtsEditMode, setIsAtsEditMode] = useState(false);

  const [settingsSection, setSettingsSection] = useState("users");
  const [userRoleFilter, setUserRoleFilter] = useState("coordinator");
  const [newUserDraft, setNewUserDraft] = useState(createBlankUser("coordinator"));

  const [editingLecturerId, setEditingLecturerId] = useState(null);
  const [newLecturerDraft, setNewLecturerDraft] = useState(createBlankLecturer());

  const currentRole = currentUser?.role ?? null;
const canAccessSettings = currentRole === "developer" || currentRole === "admin";
const canManageUsers = currentRole === "developer" || currentRole === "admin";
const canEditLecturers = currentRole === "developer" || currentRole === "admin";
const canAddLecturers = currentRole === "developer" || currentRole === "admin";
const canEditAtsEntries = currentRole === "developer" || currentRole === "admin" || currentRole === "coordinator";
  const filteredLecturers = useMemo(() => {
    return lecturers.filter((lecturer) => {
      const matchesDepartment =
        selectedDepartment === "All Departments" ||
        lecturer.departments.includes(selectedDepartment);

      const matchesQuery =
        lecturerQuery.trim() === "" ||
        lecturer.name.toLowerCase().includes(lecturerQuery.toLowerCase());

      return matchesDepartment && matchesQuery;
    });
  }, [lecturers, selectedDepartment, lecturerQuery]);

  const selectedLecturer =
  lecturers.find((lecturer) => lecturer.id === selectedLecturerId) ?? null;

  const lecturerSuggestions = useMemo(() => {
    return filteredLecturers.slice(0, 8);
  }, [filteredLecturers]);

  const summary = useMemo(() => {
    let over = 0;
    let under = 0;
    let within = 0;

    lecturers.forEach((lecturer) => {
      const total = getAtsTotal(lecturer);
      if (total > lecturer.maxATS) over += 1;
      else if (total < lecturer.minATS) under += 1;
      else within += 1;
    });

    return {
      totalLecturers: lecturers.length,
      over,
      under,
      within,
    };
  }, [lecturers]);

  const flaggedLecturers = useMemo(() => {
    return lecturers
      .map((lecturer) => ({
        ...lecturer,
        totalATS: getAtsTotal(lecturer),
      }))
      .sort((a, b) => b.totalATS - a.totalATS);
  }, [lecturers]);

  function resetLoginFields() {
    setLoginUsername("");
    setLoginPassword("");
    setLoginError("");
  }

  function handleLogin(event) {
    event.preventDefault();
    setLoginError("");

    if (loginPassword === "openlah231787") {
      setCurrentUser({
        role: "developer",
        username: "developer",
        displayName: "Developer",
      });
      setScreen("dashboard");
      resetLoginFields();
      return;
    }

    const userPool = users[selectedLoginRole] || [];
    const matchedUser = userPool.find(
      (user) => user.username === loginUsername && user.password === loginPassword
    );

    if (!matchedUser) {
      setLoginError("Invalid username or password.");
      return;
    }

    setCurrentUser({
      role: selectedLoginRole,
      username: matchedUser.username,
      displayName:
        selectedLoginRole === "admin"
          ? "Admin"
          : selectedLoginRole === "coordinator"
          ? "Program Coordinator"
          : "Guest",
    });
    setScreen("dashboard");
    resetLoginFields();
  }

  function handleLogout() {
  setCurrentUser(null);
  setScreen("login");
  setSelectedDepartment("All Departments");
  setLecturerQuery("");
  setSelectedLecturerId(null);
  setSettingsSection("users");
  setEditingLecturerId(null);
  setIsAtsEditMode(false);
}

  function openLecturer(lecturerId) {
  setSelectedLecturerId(lecturerId);
  setScreen("lecturer");
  setIsAtsEditMode(false);
}
function handleStartEditAts() {
  if (!selectedLecturer || !canEditAtsEntries) return;
  setIsAtsEditMode(true);
}

function handleSaveAtsChanges() {
  setIsAtsEditMode(false);
}

function handleCancelAtsChanges() {
  setIsAtsEditMode(false);
}
  function updateLecturerField(lecturerId, field, value) {
    setLecturers((prev) =>
      prev.map((lecturer) =>
        lecturer.id === lecturerId ? { ...lecturer, [field]: value } : lecturer
      )
    );
  }

  function toggleLecturerDepartment(lecturerId, department) {
    setLecturers((prev) =>
      prev.map((lecturer) => {
        if (lecturer.id !== lecturerId) return lecturer;
        const exists = lecturer.departments.includes(department);
        return {
          ...lecturer,
          departments: exists
            ? lecturer.departments.filter((item) => item !== department)
            : [...lecturer.departments, department],
        };
      })
    );
  }

  function toggleDraftLecturerDepartment(department) {
    setNewLecturerDraft((prev) => {
      const exists = prev.departments.includes(department);
      return {
        ...prev,
        departments: exists
          ? prev.departments.filter((item) => item !== department)
          : [...prev.departments, department],
      };
    });
  }

  function addNewLecturer() {
    if (!newLecturerDraft.name.trim()) return;
    setLecturers((prev) => [
      ...prev,
      {
        ...newLecturerDraft,
        name: newLecturerDraft.name.trim(),
      },
    ]);
    setNewLecturerDraft(createBlankLecturer());
  }

  function addAtsRow(lecturerId) {
    setLecturers((prev) =>
      prev.map((lecturer) =>
        lecturer.id === lecturerId
          ? { ...lecturer, atsEntries: [...lecturer.atsEntries, createBlankAtsEntry()] }
          : lecturer
      )
    );
  }

  function removeAtsRow(lecturerId, entryId) {
    setLecturers((prev) =>
      prev.map((lecturer) =>
        lecturer.id === lecturerId
          ? {
              ...lecturer,
              atsEntries: lecturer.atsEntries.filter((entry) => entry.id !== entryId),
            }
          : lecturer
      )
    );
  }

  function updateAtsEntry(lecturerId, entryId, field, value) {
    setLecturers((prev) =>
      prev.map((lecturer) =>
        lecturer.id === lecturerId
          ? {
              ...lecturer,
              atsEntries: lecturer.atsEntries.map((entry) =>
                entry.id === entryId ? { ...entry, [field]: value } : entry
              ),
            }
          : lecturer
      )
    );
  }

  function updateAtsListField(lecturerId, entryId, field, value) {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    updateAtsEntry(lecturerId, entryId, field, items);
  }

  function getManageableRoleOptions() {
    if (currentRole === "developer") {
      return [
        { key: "admin", label: "Admin" },
        { key: "coordinator", label: "Program Coordinator" },
        { key: "guest", label: "Guest" },
      ];
    }
    if (currentRole === "admin") {
      return [
        { key: "coordinator", label: "Program Coordinator" },
        { key: "guest", label: "Guest" },
      ];
    }
    return [];
  }

  function canEditUserRole(roleKey) {
    if (currentRole === "developer") {
      return roleKey === "admin" || roleKey === "coordinator" || roleKey === "guest";
    }
    if (currentRole === "admin") {
      return roleKey === "coordinator" || roleKey === "guest";
    }
    return false;
  }

  function handleUserRoleFilterChange(roleKey) {
    setUserRoleFilter(roleKey);
    setNewUserDraft(createBlankUser(roleKey));
  }

  function updateUser(roleKey, userId, field, value) {
    setUsers((prev) => ({
      ...prev,
      [roleKey]: prev[roleKey].map((user) =>
        user.id === userId ? { ...user, [field]: value } : user
      ),
    }));
  }

  function addUser() {
    if (!canManageUsers) return;
    if (!newUserDraft.username.trim() || !newUserDraft.password.trim()) return;

    setUsers((prev) => ({
      ...prev,
      [userRoleFilter]: [
        ...prev[userRoleFilter],
        {
          ...newUserDraft,
          username: newUserDraft.username.trim(),
          password: newUserDraft.password.trim(),
        },
      ],
    }));

    setNewUserDraft(createBlankUser(userRoleFilter));
  }

  function removeUser(roleKey, userId) {
    setUsers((prev) => ({
      ...prev,
      [roleKey]: prev[roleKey].filter((user) => user.id !== userId),
    }));
  }

  const manageableRoleOptions = getManageableRoleOptions();

    if (screen === "login") {
    return (
      <div className="app-shell login-shell">
        <div className="login-wrap">
          <div className="login-card">
            <div className="brand-block">
              <div className="brand-mark">ATS</div>

              <div className="brand-copy">
                <p className="eyebrow">Faculty Workload Planner</p>
                <h1>Teaching Load Dashboard</h1>
                <p className="muted-copy">
                  Sign in to manage lecturer ATS, review workload summaries, and update department-linked teaching assignments.
                </p>
              </div>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="role-switcher role-switcher-inline">
                {LOGIN_ROLE_OPTIONS.map((role) => (
                  <button
                    key={role.key}
                    type="button"
                    className={selectedLoginRole === role.key ? "role-pill active" : "role-pill"}
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

              {loginError ? <p className="error-text">{loginError}</p> : null}

              <button type="submit" className="primary-button login-submit">
                Access Portal
              </button>

              <div className="login-hint">
                <p>Demo accounts:</p>
                <p>Admin: admin1 / 111</p>
                <p>Program Coordinator: user1 / 111</p>
                <p>Guest: guest1 / 111</p>
              </div>
            </form>
          </div>

          <div className="login-meta">
            <p>
              Secure Access • Faculty ATS System <span>Version 1.0.0</span>
            </p>
            <strong>Created by YM Raja Mohamad Alif</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark small">ATS</div>
          <div>
            <p className="eyebrow">Music faculty</p>
            <h2>Planner</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={screen === "dashboard" ? "nav-link active" : "nav-link"}
            onClick={() => setScreen("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={screen === "lecturer" ? "nav-link active" : "nav-link"}
            onClick={() => setScreen("lecturer")}
          >
            Lecturer ATS
          </button>
          {canAccessSettings ? (
            <button
              className={screen === "settings" ? "nav-link active" : "nav-link"}
              onClick={() => setScreen("settings")}
            >
              Settings
            </button>
          ) : null}
        </nav>


      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">
              {screen === "dashboard"
                ? "Default dashboard"
                : screen === "lecturer"
                ? "Lecturer ATS detail"
                : "Settings"}
            </p>
            <h1>
              {screen === "dashboard"
                ? "Faculty ATS Overview"
                : screen === "lecturer"
                ? selectedLecturer?.name || "Lecturer ATS"
                : "Settings"}
            </h1>
          </div>

          <div className="topbar-actions">
            {screen !== "dashboard" ? (
              <button className="ghost-button" onClick={() => setScreen("dashboard")}>
                Back to Dashboard
              </button>
            ) : null}
          </div>
        </header>

        {screen === "dashboard" ? (
          <section className="page-grid">
  <div className="panel panel-main">
    <div className="panel-heading">
      <div>
        <p className="eyebrow">Lecturer actions</p>
        <h3>Find a lecturer</h3>
      </div>
    </div>

    <div className="form-grid">
      <label className="field">
        <span>Department</span>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option>All Departments</option>
          {DEPARTMENTS.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Lecturer search</span>
        <input
          type="text"
          list="lecturer-suggestions"
          value={lecturerQuery}
          onChange={(e) => setLecturerQuery(e.target.value)}
          placeholder="Type lecturer name"
        />
        <datalist id="lecturer-suggestions">
          {lecturerSuggestions.map((lecturer) => (
            <option key={lecturer.id} value={lecturer.name} />
          ))}
        </datalist>
      </label>

      <label className="field">
        <span>Lecturer dropdown</span>
        <select
          value={selectedLecturerId ?? ""}
          onChange={(e) => setSelectedLecturerId(e.target.value || null)}
        >
          <option value="">Select lecturer</option>
          {filteredLecturers.map((lecturer) => (
            <option key={lecturer.id} value={lecturer.id}>
              {lecturer.name}
            </option>
          ))}
        </select>
      </label>
    </div>

    <div className="action-row">
      <button
        className="primary-button"
        onClick={() => selectedLecturer && openLecturer(selectedLecturer.id)}
        disabled={!selectedLecturer}
      >
        View Lecturer ATS
      </button>
    </div>

    {selectedLecturer ? (
      <div className="selected-preview compact-preview">
        <div>
          <p className="eyebrow">Selected lecturer</p>
          <h3>{selectedLecturer.name}</h3>
          <p className="muted-copy">{selectedLecturer.additionalInfo}</p>
        </div>

        <div className="tag-row">
          {selectedLecturer.departments.map((department) => (
            <span key={department} className="tag">
              {department.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>
    ) : (
      <div className="empty-state-box">
        No lecturer selected yet.
      </div>
    )}
  </div>

            <div className="summary-grid">
              <div className="stat-card">
                <p className="eyebrow">Total lecturers</p>
                <h2>{summary.totalLecturers}</h2>
                <p className="muted-copy">Current seeded lecturer records.</p>
              </div>
              <div className="stat-card danger">
                <p className="eyebrow">Above max ATS</p>
                <h2>{summary.over}</h2>
                <p className="muted-copy">Lecturers exceeding assigned ATS range.</p>
              </div>
              <div className="stat-card warning">
                <p className="eyebrow">Below min ATS</p>
                <h2>{summary.under}</h2>
                <p className="muted-copy">Lecturers currently under minimum ATS.</p>
              </div>
              <div className="stat-card success">
                <p className="eyebrow">Within ATS range</p>
                <h2>{summary.within}</h2>
                <p className="muted-copy">Lecturers balanced within min/max target.</p>
              </div>
            </div>

            <div className="panel panel-wide">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Faculty workload snapshot</p>
                  <h3>Lecturer summary list</h3>
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Lecturer</th>
                      <th>Departments</th>
                      <th>Position</th>
                      <th>Total ATS</th>
                      <th>Range</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flaggedLecturers.map((lecturer) => {
                      const total = lecturer.totalATS;
                      const status =
                        total > lecturer.maxATS
                          ? "Overload"
                          : total < lecturer.minATS
                          ? "Underload"
                          : "Balanced";

                      return (
                        <tr
                          key={lecturer.id}
                          className="clickable-row"
                          onClick={() => openLecturer(lecturer.id)}
                        >
                          <td>{lecturer.name}</td>
                          <td>{lecturer.departments.map((department) => department.split(" ")[0]).join(" / ")}</td>
                          <td>{lecturer.position}</td>
                          <td>{total}</td>
                          <td>
                            {lecturer.minATS}–{lecturer.maxATS}
                          </td>
                          <td>
                            <span
                              className={
                                status === "Overload"
                                  ? "status-badge danger"
                                  : status === "Underload"
                                  ? "status-badge warning"
                                  : "status-badge success"
                              }
                            >
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : null}

        {screen === "lecturer" && selectedLecturer ? (
  <section className="page-grid lecturer-page">
    <div className="panel panel-wide lecturer-summary-panel">
      <div className="lecturer-header-card lecturer-header-compact">
        <div className="lecturer-main-info">
          <p className="eyebrow">Lecturer name</p>
          <h2>{selectedLecturer.name}</h2>
          <p className="muted-copy">{selectedLecturer.additionalInfo}</p>
        </div>

        <div className="header-metrics compact-metrics">
          <div className="metric-box">
            <span>Position</span>
            <strong>{selectedLecturer.position}</strong>
          </div>
          <div className="metric-box">
            <span>ATS range</span>
            <strong>
              {selectedLecturer.minATS}-{selectedLecturer.maxATS}
            </strong>
          </div>
          <div className="metric-box">
            <span>Total ATS</span>
            <strong>{getAtsTotal(selectedLecturer)}</strong>
          </div>
        </div>
      </div>

      <div className="tag-row spaced">
        {selectedLecturer.departments.map((department) => (
          <span key={department} className="tag">
            {department.split(" ")[0]}
          </span>
        ))}
      </div>
    </div>

    <div className="panel panel-wide ats-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">ATS workload table</p>
          <h3>Lecturer ATS entries</h3>
        </div>

        <div className="action-row">
          {!isAtsEditMode ? (
            <>
              {canEditAtsEntries ? (
                <button className="ghost-button compact" onClick={handleStartEditAts}>
                  Edit
                </button>
              ) : null}
            </>
          ) : (
            <>
              <button
                className="primary-button compact"
                onClick={() => addAtsRow(selectedLecturer.id)}
              >
                Add ATS Row
              </button>
              <button className="primary-button compact" onClick={handleSaveAtsChanges}>
                Save
              </button>
              <button className="ghost-button compact" onClick={handleCancelAtsChanges}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="table-wrap">
        <table className="ats-table">
          <thead>
            <tr>
              <th className="col-course-code">Course code(s)</th>
              <th className="col-course-name">Course name(s)</th>
              <th className="col-programs">Program(s)</th>
              <th className="col-small">KS</th>
              <th className="col-small">K1</th>
              <th className="col-small">K2</th>
              <th className="col-small">K3</th>
              <th className="col-notes">Notes</th>
              {isAtsEditMode ? <th className="col-action">Action</th> : null}
            </tr>
          </thead>

          <tbody>
            {selectedLecturer.atsEntries.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <textarea
                    value={formatListSlash(entry.courseCodes)}
                    onChange={(e) =>
                      updateAtsListField(selectedLecturer.id, entry.id, "courseCodes", e.target.value)
                    }
                    disabled={!isAtsEditMode}
                  />
                </td>
                <td>
                  <textarea
                    value={formatListSlash(entry.courseNames)}
                    onChange={(e) =>
                      updateAtsListField(selectedLecturer.id, entry.id, "courseNames", e.target.value)
                    }
                    disabled={!isAtsEditMode}
                  />
                </td>
                <td>
                  <textarea
                    value={entry.programs.map((program) => program.split(" ")[0]).join(" / ")}
                    onChange={(e) =>
                      updateAtsListField(selectedLecturer.id, entry.id, "programs", e.target.value)
                    }
                    disabled={!isAtsEditMode}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.ks}
                    onChange={(e) =>
                      updateAtsEntry(selectedLecturer.id, entry.id, "ks", Number(e.target.value))
                    }
                    disabled={!isAtsEditMode}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.k1Supervision}
                    onChange={(e) =>
                      updateAtsEntry(
                        selectedLecturer.id,
                        entry.id,
                        "k1Supervision",
                        Number(e.target.value)
                      )
                    }
                    disabled={!isAtsEditMode}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.k2Research}
                    onChange={(e) =>
                      updateAtsEntry(
                        selectedLecturer.id,
                        entry.id,
                        "k2Research",
                        Number(e.target.value)
                      )
                    }
                    disabled={!isAtsEditMode}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={entry.k3Service}
                    onChange={(e) =>
                      updateAtsEntry(
                        selectedLecturer.id,
                        entry.id,
                        "k3Service",
                        Number(e.target.value)
                      )
                    }
                    disabled={!isAtsEditMode}
                  />
                </td>
                <td>
                  <textarea
                    value={entry.notes}
                    onChange={(e) =>
                      updateAtsEntry(selectedLecturer.id, entry.id, "notes", e.target.value)
                    }
                    disabled={!isAtsEditMode}
                  />
                </td>
                {isAtsEditMode ? (
                  <td>
                    <button
                      className="danger-button compact"
                      onClick={() => removeAtsRow(selectedLecturer.id, entry.id)}
                    >
                      Remove
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="totals-row">
              <td colSpan={3}>
                <strong>Totals</strong>
              </td>
              <td>{getAtsColumnTotals(selectedLecturer).ks}</td>
              <td>{getAtsColumnTotals(selectedLecturer).k1}</td>
              <td>{getAtsColumnTotals(selectedLecturer).k2}</td>
              <td>{getAtsColumnTotals(selectedLecturer).k3}</td>
              <td />
              {isAtsEditMode ? <td /> : null}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </section>
) : null}

        {screen === "settings" ? (
          <section className="page-grid">
            <div className="panel panel-wide">
              <div className="tab-row">
                <button
                  className={settingsSection === "users" ? "tab-button active" : "tab-button"}
                  onClick={() => setSettingsSection("users")}
                >
                  Users
                </button>
                <button
                  className={settingsSection === "lecturers" ? "tab-button active" : "tab-button"}
                  onClick={() => setSettingsSection("lecturers")}
                >
                  Lecturers
                </button>
              </div>
            </div>

            {settingsSection === "users" ? (
              <div className="panel panel-wide">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">Role-based access</p>
                    <h3>User management</h3>
                  </div>
                </div>

                <div className="tab-row secondary">
                  {manageableRoleOptions.length > 0 ? (
                    manageableRoleOptions.map((role) => (
                      <button
                        key={role.key}
                        className={
                          userRoleFilter === role.key ? "tab-button active" : "tab-button"
                        }
                        onClick={() => handleUserRoleFilterChange(role.key)}
                      >
                        {role.label}
                      </button>
                    ))
                  ) : (
                    <p className="muted-copy">
                      Program Coordinator can view settings but cannot manage users.
                    </p>
                  )}
                </div>

                {canManageUsers ? (
                  <div className="inline-form">
                    <input
                      type="text"
                      placeholder="Username"
                      value={newUserDraft.username}
                      onChange={(e) =>
                        setNewUserDraft((prev) => ({ ...prev, username: e.target.value }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Password"
                      value={newUserDraft.password}
                      onChange={(e) =>
                        setNewUserDraft((prev) => ({ ...prev, password: e.target.value }))
                      }
                    />
                    <button className="primary-button compact" onClick={addUser}>
                      Add User
                    </button>
                  </div>
                ) : null}

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Role</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["admin", "coordinator", "guest"].map((roleKey) =>
  users[roleKey].map((user) => {
    const editable = canEditUserRole(roleKey);
    const canSeePassword =
      currentRole === "developer" ||
      (currentRole === "admin" && roleKey !== "admin") ||
      (currentRole === "admin" && roleKey === "admin" && user.username === currentUser?.username);

    return (
      <tr key={user.id}>
        <td>
          {roleKey === "admin"
            ? "Admin"
            : roleKey === "coordinator"
            ? "Program Coordinator"
            : "Guest"}
        </td>
        <td>
          <input
            type="text"
            value={user.username}
            disabled={!editable}
            onChange={(e) => updateUser(roleKey, user.id, "username", e.target.value)}
          />
        </td>
        <td>
          {canSeePassword ? (
            <input
              type="text"
              value={user.password}
              disabled={!editable}
              onChange={(e) => updateUser(roleKey, user.id, "password", e.target.value)}
            />
          ) : (
            <span className="read-only-pill">Hidden</span>
          )}
        </td>
        <td>
          {editable ? (
            <button
              className="danger-button compact"
              onClick={() => removeUser(roleKey, user.id)}
            >
              Delete
            </button>
          ) : (
            <span className="read-only-pill">Read only</span>
          )}
        </td>
      </tr>
    );
  })
)}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            {settingsSection === "lecturers" ? (
              <>
                <div className="panel panel-wide">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">Lecturer master data</p>
                      <h3>Manage lecturer names, ATS ranges, and department tags</h3>
                    </div>
                  </div>

                  {canAddLecturers ? (
                    <div className="lecturer-editor add-editor">
                      <div className="form-grid three-cols">
                        <label className="field">
                          <span>Lecturer name</span>
                          <input
                            type="text"
                            value={newLecturerDraft.name}
                            onChange={(e) =>
                              setNewLecturerDraft((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                        </label>

                        <label className="field">
                          <span>Position</span>
                          <select
                            value={newLecturerDraft.position}
                            onChange={(e) =>
                              setNewLecturerDraft((prev) => ({
                                ...prev,
                                position: e.target.value,
                              }))
                            }
                          >
                            {POSITION_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="field">
                          <span>Additional info</span>
                          <input
                            type="text"
                            value={newLecturerDraft.additionalInfo}
                            onChange={(e) =>
                              setNewLecturerDraft((prev) => ({
                                ...prev,
                                additionalInfo: e.target.value,
                              }))
                            }
                          />
                        </label>
                      </div>

                      <div className="form-grid">
                        <label className="field">
                          <span>Minimum ATS</span>
                          <input
                            type="number"
                            value={newLecturerDraft.minATS}
                            onChange={(e) =>
                              setNewLecturerDraft((prev) => ({
                                ...prev,
                                minATS: Number(e.target.value),
                              }))
                            }
                          />
                        </label>

                        <label className="field">
                          <span>Maximum ATS</span>
                          <input
                            type="number"
                            value={newLecturerDraft.maxATS}
                            onChange={(e) =>
                              setNewLecturerDraft((prev) => ({
                                ...prev,
                                maxATS: Number(e.target.value),
                              }))
                            }
                          />
                        </label>
                      </div>

                      <div className="department-picker">
                        <p className="field-label">Department tags</p>
                        <div className="tag-picker">
                          {DEPARTMENTS.map((department) => (
                            <button
                              key={department}
                              type="button"
                              className={
                                newLecturerDraft.departments.includes(department)
                                  ? "tag-button active"
                                  : "tag-button"
                              }
                              onClick={() => toggleDraftLecturerDepartment(department)}
                            >
                              {department}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button className="primary-button compact" onClick={addNewLecturer}>
                        Add Lecturer
                      </button>
                    </div>
                  ) : (
                    <p className="muted-copy">
                      Only Admin and Developer can edit lecturer records.
                    </p>
                  )}
                </div>

                <div className="panel panel-wide">
                  <div className="lecturer-cards">
                    {lecturers.map((lecturer) => {
                      const isEditing = editingLecturerId === lecturer.id;
                      const totalATS = getAtsTotal(lecturer);

                      return (
                        <div className="lecturer-editor" key={lecturer.id}>
                          <div className="editor-header">
                            <div>
                              <p className="eyebrow">Lecturer record</p>
                              <h3>{lecturer.name}</h3>
                            </div>
                            {canEditLecturers ? (
                              <button
                                className="ghost-button compact"
                                onClick={() =>
                                  setEditingLecturerId(isEditing ? null : lecturer.id)
                                }
                              >
                                {isEditing ? "Close" : "✏ Edit"}
                              </button>
                            ) : (
                              <span className="read-only-pill">Read only</span>
                            )}
                          </div>

                          <div className="info-grid">
                            <div>
                              <span className="info-label">Position</span>
                              <strong>{lecturer.position}</strong>
                            </div>
                            <div>
                              <span className="info-label">ATS range</span>
                              <strong>
                                {lecturer.minATS}–{lecturer.maxATS}
                              </strong>
                            </div>
                            <div>
                              <span className="info-label">Total ATS</span>
                              <strong>{totalATS}</strong>
                            </div>
                          </div>

                          <div className="tag-row">
                            {lecturer.departments.map((department) => (
                              <span key={department} className="tag">
                                {department}
                              </span>
                            ))}
                          </div>

                          {isEditing ? (
                            <div className="editor-body">
                              <div className="form-grid three-cols">
                                <label className="field">
                                  <span>Lecturer name</span>
                                  <input
                                    type="text"
                                    value={lecturer.name}
                                    onChange={(e) =>
                                      updateLecturerField(lecturer.id, "name", e.target.value)
                                    }
                                  />
                                </label>

                                <label className="field">
                                  <span>Position</span>
                                  <select
                                    value={lecturer.position}
                                    onChange={(e) =>
                                      updateLecturerField(lecturer.id, "position", e.target.value)
                                    }
                                  >
                                    {POSITION_OPTIONS.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </label>

                                <label className="field">
                                  <span>Additional info</span>
                                  <input
                                    type="text"
                                    value={lecturer.additionalInfo}
                                    onChange={(e) =>
                                      updateLecturerField(
                                        lecturer.id,
                                        "additionalInfo",
                                        e.target.value
                                      )
                                    }
                                  />
                                </label>
                              </div>

                              <div className="form-grid">
                                <label className="field">
                                  <span>Minimum ATS</span>
                                  <input
                                    type="number"
                                    value={lecturer.minATS}
                                    onChange={(e) =>
                                      updateLecturerField(
                                        lecturer.id,
                                        "minATS",
                                        Number(e.target.value)
                                      )
                                    }
                                  />
                                </label>

                                <label className="field">
                                  <span>Maximum ATS</span>
                                  <input
                                    type="number"
                                    value={lecturer.maxATS}
                                    onChange={(e) =>
                                      updateLecturerField(
                                        lecturer.id,
                                        "maxATS",
                                        Number(e.target.value)
                                      )
                                    }
                                  />
                                </label>
                              </div>

                              <div className="department-picker">
                                <p className="field-label">Department tags</p>
                                <div className="tag-picker">
                                  {DEPARTMENTS.map((department) => (
                                    <button
                                      key={department}
                                      type="button"
                                      className={
                                        lecturer.departments.includes(department)
                                          ? "tag-button active"
                                          : "tag-button"
                                      }
                                      onClick={() =>
                                        toggleLecturerDepartment(lecturer.id, department)
                                      }
                                    >
                                      {department}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : null}
          </section>
        ) : null}
      </main>
    </div>
  );
}

export default App;