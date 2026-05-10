import { useMemo, useState } from "react";
import "./App.css";

const DEPARTMENTS = [
  "MU110",
  "MU111",
  "MU220/MU230",
  "MU221",
  "MU222",
  "MU223",
  "MU750",
  "MU778",
  "MU790",
  "MU950",
];

const PROGRAM_CODES = [
  "MU110",
  "MU111",
  "MU220/MU230",
  "MU221",
  "MU222",
  "MU223",
  "MU750",
  "MU778",
  "MU790",
  "MU950",
];

const INITIAL_GROUPS = [
  {
    id: "group-1",
    department: "MU221",
    groupName: "MU221SEM1N",
    studentCount: 12,
  },
  {
    id: "group-2",
    department: "MU221",
    groupName: "MU221SEM2",
    studentCount: 10,
  },
  {
    id: "group-3",
    department: "MU222",
    groupName: "MU222SEM3",
    studentCount: 8,
  },
  {
    id: "group-4",
    department: "MU220/MU230",
    groupName: "MU230SEM6",
    studentCount: 9,
  },
  {
    id: "group-5",
    department: "MU110",
    groupName: "MU110SEM1",
    studentCount: 15,
  },
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
      "MU221",
      "MU110",
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
        programs: ["MU221"],
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
        programs: ["MU110"],
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
    departments: ["MU220/MU230"],
    minATS: 16,
    maxATS: 18,
    position: "Dean",
    additionalInfo: "Music pedagogy, curriculum planning",
    atsEntries: [
      {
        id: "ats-3",
        courseCodes: ["MUE2304"],
        courseNames: ["Curriculum Design for Music Educators"],
        programs: ["MU220/MU230"],
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
      "MU222",
      "MU790",
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
        programs: ["MU222"],
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
        programs: ["MU790"],
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
      "MU111",
      "MU223",
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
        programs: ["MU111"],
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
        programs: ["MU223"],
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
      "MU750",
      "MU950",
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
        programs: ["MU750"],
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
        programs: ["MU950"],
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
      "MU110",
      "MU222",
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
        programs: ["MU110"],
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
        programs: ["MU222"],
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
      "MU111",
      "MU221",
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
        programs: ["MU221"],
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
        programs: ["MU111"],
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
      "MU778",
      "MU220/MU230",
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
        programs: ["MU778"],
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
        programs: ["MU220/MU230"],
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
    groups: [],
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

  const [settingsSection, setSettingsSection] = useState("users");
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [selectedGroupDepartment, setSelectedGroupDepartment] = useState(PROGRAM_CODES[0] ?? "");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupStudentCount, setNewGroupStudentCount] = useState("");
  const [isAtsEditMode, setIsAtsEditMode] = useState(false);
  const [isAddAtsModalOpen, setIsAddAtsModalOpen] = useState(false);
  const [newAtsDraft, setNewAtsDraft] = useState(createBlankAtsEntry());
  const atsSuggestionPool = useMemo(() => {
  const entries = lecturers.flatMap((lecturer) => lecturer.atsEntries || []);

  const unique = (values) =>
    Array.from(
      new Set(
        values
          .map((value) => (value ?? "").toString().trim())
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b));

  return {
    courseCodes: unique(entries.map((entry) => entry.courseCodes)),
    courseNames: unique(entries.map((entry) => entry.courseNames)),
    programs: unique(entries.map((entry) => entry.programs)),
    groups: unique(entries.map((entry) => entry.group)),
  };
}, [lecturers]);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [editingAtsEntryId, setEditingAtsEntryId] = useState(null);
  const [atsDraft, setAtsDraft] = useState(createBlankAtsEntry());
  const [servicingSection, setServicingSection] = useState("diploma");
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
  const filteredGroups = groups.filter(
  (group) => group.department === selectedGroupDepartment
  );
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
function renderMainContent() {
  if (screen === "groupInfo") {
  return (
    <section className="page-grid">
      <div className="panel panel-wide">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Academic admin</p>
            <h3>Group Info</h3>
            <p className="muted-copy">
              Manage group codes by program and track the number of students in each group.
            </p>
          </div>
        </div>

        <div className="form-grid three-cols">
          <label className="field">
            <span>Program Code</span>
            <select
              value={selectedGroupDepartment}
              onChange={(e) => setSelectedGroupDepartment(e.target.value)}
            >
              {PROGRAM_CODES.map((programCode) => (
                <option key={programCode} value={programCode}>
                  {programCode}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Group Code</span>
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Example: MU221SEM1N"
            />
          </label>

          <label className="field">
            <span>Student Count</span>
            <input
              type="number"
              min="0"
              value={newGroupStudentCount}
              onChange={(e) => setNewGroupStudentCount(e.target.value)}
              placeholder="0"
            />
          </label>
        </div>

        <div className="action-row">
          <button type="button" className="primary-button" onClick={handleAddGroup}>
            Add Group
          </button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Program Code</th>
                <th>Group Code</th>
                <th>Student Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
                  <tr key={group.id}>
                    <td>{group.department}</td>
                    <td>{group.groupName}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={group.studentCount}
                        onChange={(e) =>
                          handleUpdateGroupStudentCount(group.id, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">
                    <div className="empty-state-box">
                      No groups added for this program code yet.
                    </div>
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

  if (screen === "servicingCodes") {
    return (
      <section className="page-grid">
        <div className="panel panel-wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Placeholder module</p>
              <h3>Servicing Codes</h3>
            </div>
          </div>

          <div className="tab-row secondary">
            <button
              type="button"
              className={servicingSection === "diploma" ? "tab-button active" : "tab-button"}
              onClick={() => setServicingSection("diploma")}
            >
              Diploma Servicing Codes
            </button>

            <button
              type="button"
              className={servicingSection === "degree" ? "tab-button active" : "tab-button"}
              onClick={() => setServicingSection("degree")}
            >
              Degree Servicing Codes
            </button>
          </div>

          <div className="empty-state-box">
            {servicingSection === "diploma"
              ? "Diploma Servicing Codes section added. Functionality will be added later."
              : "Degree Servicing Codes section added. Functionality will be added later."}
          </div>
        </div>
      </section>
    );
  }

  return null;
}

function handleAddGroup() {
  if (!selectedGroupDepartment || !newGroupName.trim()) return;

  setGroups((current) => [
    ...current,
    {
      id: `group-${Date.now()}`,
      department: selectedGroupDepartment,
      groupName: newGroupName.trim(),
      studentCount: Number(newGroupStudentCount) || 0,
    },
  ]);

  setNewGroupName("");
  setNewGroupStudentCount("");
}

function handleUpdateGroupStudentCount(groupId, value) {
  setGroups((current) =>
    current.map((group) =>
      group.id === groupId
        ? { ...group, studentCount: Number(value) || 0 }
        : group
    )
  );
}

function openAddAtsModal() {
  setEditingAtsEntryId(null);
  setAtsDraft(createBlankAtsEntry());
  setIsAtsModalOpen(true);
}

function openEditAtsModal(entry) {
  setEditingAtsEntryId(entry.id);
  setAtsDraft({
    ...entry,
    courseCodes: [...(entry.courseCodes ?? [""])],
    courseNames: [...(entry.courseNames ?? [""])],
    programs: [...(entry.programs ?? [""])],
    groups: [...(entry.groups ?? [])],
    notes: entry.notes ?? "",
  });
  setIsAtsModalOpen(true);
}

function closeAtsModal() {
  setIsAtsModalOpen(false);
  setEditingAtsEntryId(null);
  setAtsDraft(createBlankAtsEntry());
}

function updateAtsDraftField(field, value) {
  setAtsDraft((current) => ({
    ...current,
    [field]: value,
  }));
}

function updateAtsDraftListField(field, value) {
  setAtsDraft((current) => ({
    ...current,
    [field]: value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  }));
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
  setIsAddAtsModalOpen(false);
  setNewAtsDraft(createBlankAtsEntry());
  setServicingSection("diploma");
}

  function openLecturer(lecturerId) {
  setSelectedLecturerId(lecturerId);
  setScreen("lecturer");
  setIsAtsEditMode(false);
  setIsAddAtsModalOpen(false);
  setNewAtsDraft(createBlankAtsEntry());
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

function openAddAtsModal() {
  if (!selectedLecturer || !canEditAtsEntries) return;
  setNewAtsDraft(createBlankAtsEntry());
  setIsAddAtsModalOpen(true);
}

function closeAddAtsModal() {
  setIsAddAtsModalOpen(false);
  setNewAtsDraft(createBlankAtsEntry());
}

function updateNewAtsDraft(field, value) {
  setNewAtsDraft((prev) => ({
    ...prev,
    [field]: value,
  }));
}

function updateNewAtsDraftList(field, value) {
  const items = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  setNewAtsDraft((prev) => ({
    ...prev,
    [field]: items,
  }));
}

function submitNewAtsEntry() {
  if (!selectedLecturer || !canEditAtsEntries) return;

  const hasCourseCode = newAtsDraft.courseCodes.length > 0;
  const hasCourseName = newAtsDraft.courseNames.length > 0;

  if (!hasCourseCode && !hasCourseName) return;

  setLecturers((prev) =>
    prev.map((lecturer) =>
      lecturer.id === selectedLecturer.id
        ? {
            ...lecturer,
            atsEntries: [...lecturer.atsEntries, newAtsDraft],
          }
        : lecturer
    )
  );

  closeAddAtsModal();
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

  {selectedLecturer ? (
    <button
      className={screen === "lecturer" ? "nav-link active" : "nav-link"}
      onClick={() => openLecturer(selectedLecturer.id)}
    >
      Lecturer ATS
    </button>
  ) : null}

  <button
    className={screen === "mufCodes" ? "nav-link active" : "nav-link"}
    onClick={() => setScreen("mufCodes")}
  >
    MUF Codes
  </button>

  <button
    className={screen === "performingGroups" ? "nav-link active" : "nav-link"}
    onClick={() => setScreen("performingGroups")}
  >
    Performing Groups
  </button>

<button
  className={screen === "groupInfo" ? "nav-link active" : "nav-link"}
  onClick={() => setScreen("groupInfo")}
>
  Group Info
</button>

  <button
    className={screen === "servicingCodes" ? "nav-link active" : "nav-link"}
    onClick={() => setScreen("servicingCodes")}
  >
    Servicing Codes
  </button>

  <button
    className={screen === "forumColloquim" ? "nav-link active" : "nav-link"}
    onClick={() => setScreen("forumColloquim")}
  >
    Forum/Colloquim
  </button>
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
    ? selectedLecturer?.name
    : screen === "settings"
    ? "Settings"
    : screen === "mufCodes"
    ? "MUF Codes"
    : screen === "performingGroups"
    ? "Performing Groups"
    : screen === "groupInfo"
    ? "Group Info"
    : screen === "servicingCodes"
    ? "Servicing Codes"
    : screen === "forumColloquim"
    ? "Forum/Colloquim"
    : "Faculty ATS Overview"}
</h1>
          </div>

          <div className="topbar-actions topbar-actions-right">
  {screen !== "dashboard" ? (
    <button className="ghost-button" onClick={() => setScreen("dashboard")}>
      Back to Dashboard
    </button>
  ) : null}

  {canAccessSettings ? (
    <button
      className={screen === "settings" ? "icon-button active" : "icon-button"}
      onClick={() => setScreen("settings")}
      aria-label="Settings"
      title="Settings"
    >
      ⚙
    </button>
  ) : null}

  <div className="user-chip user-chip-top">
    <span className="status-dot" />
    <div>
      <strong>{currentUser?.displayName}</strong>
      <p>{currentUser?.username}</p>
    </div>
  </div>

  <button className="ghost-button" onClick={handleLogout}>
    Logout
  </button>
</div>

        </header>
        
{renderMainContent()}

        {screen === "dashboard" ? (
          <section className="page-grid">
  <div className="panel panel-main">
    <div className="panel-heading">
      <div>
        <p className="eyebrow">Lecturer actions</p>
        <h3>Find a lecturer</h3>
      </div>
    </div>

<div className="form-grid lecturer-picker-grid">
  <label className="field">
    <span>Department</span>
    <select
      value={selectedDepartment}
      onChange={(e) => {
        setSelectedDepartment(e.target.value);
        setSelectedLecturerId(null);
      }}
    >
      <option>All Departments</option>
      {DEPARTMENTS.map((department) => (
        <option key={department} value={department}>
          {department}
        </option>
      ))}
    </select>
  </label>

  <label className="field lecturer-search-field">
    <span>Lecturer</span>
    <input
      type="text"
      list="lecturer-suggestions"
      value={lecturerQuery}
      onChange={(e) => {
        const value = e.target.value;
        setLecturerQuery(value);

        const matchedLecturer = filteredLecturers.find(
          (lecturer) => lecturer.name.toLowerCase() === value.toLowerCase()
        );

        setSelectedLecturerId(matchedLecturer ? matchedLecturer.id : null);
      }}
      placeholder="Search or select lecturer"
    />
    <datalist id="lecturer-suggestions">
      {filteredLecturers.map((lecturer) => (
        <option key={lecturer.id} value={lecturer.name} />
      ))}
    </datalist>
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

        <div className="ats-toolbar">
          <button
            type="button"
            className="secondary-button"
            onClick={openAddAtsModal}
          >
            Add New
          </button>

          <button
            type="button"
            className={isAtsEditMode ? "ghost-button active" : "ghost-button"}
            onClick={() => setIsAtsEditMode((prev) => !prev)}
          >
            {isAtsEditMode ? "Done Editing" : "Edit"}
          </button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="ats-table">
          <thead>
            <tr>
              <th className="col-course-code">Course code(s)</th>
              <th className="col-course-name">Course name(s)</th>
              <th className="col-programs">Program(s)</th>
              <th className="col-group">Group(s)</th>
              <th className="col-contact-hours">Contact Hours</th>
              <th className="col-small">KS</th>
              <th className="col-small">K1</th>
              <th className="col-small">K2</th>
              <th className="col-small">K3</th>
              <th className="col-notes">Notes</th>
              {canEditAtsEntries && isAtsEditMode ? (
                <th className="col-action">Action</th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {selectedLecturer.atsEntries.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <textarea
                    value={(entry.courseCodes ?? []).join(", ")}
                    onChange={(e) =>
                      updateAtsListField(
                        selectedLecturer.id,
                        entry.id,
                        "courseCodes",
                        e.target.value
                      )
                    }
                    disabled={!(canEditAtsEntries && isAtsEditMode)}
                  />
                </td>

                <td>
                  <textarea
                    value={(entry.courseNames ?? []).join(", ")}
                    onChange={(e) =>
                      updateAtsListField(
                        selectedLecturer.id,
                        entry.id,
                        "courseNames",
                        e.target.value
                      )
                    }
                    disabled={!(canEditAtsEntries && isAtsEditMode)}
                  />
                </td>

                <td>
                  <textarea
                    value={(entry.programs ?? []).join(", ")}
                    onChange={(e) =>
                      updateAtsListField(
                        selectedLecturer.id,
                        entry.id,
                        "programs",
                        e.target.value
                      )
                    }
                    disabled={!(canEditAtsEntries && isAtsEditMode)}
                  />
                </td>

                <td>
                  <textarea
                    value={(entry.groups ?? []).join(", ")}
                    onChange={(e) =>
                      updateAtsListField(
                        selectedLecturer.id,
                        entry.id,
                        "groups",
                        e.target.value
                      )
                    }
                    disabled={!(canEditAtsEntries && isAtsEditMode)}
                    placeholder="Example: MU221SEM1N"
                  />
                </td>

                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={entry.contactHours ?? ""}
                    onChange={(e) =>
                      updateAtsEntry(
                        selectedLecturer.id,
                        entry.id,
                        "contactHours",
                        e.target.value
                      )
                    }
                    disabled={!(canEditAtsEntries && isAtsEditMode)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={entry.ks}
                    onChange={(e) =>
                      updateAtsEntry(
                        selectedLecturer.id,
                        entry.id,
                        "ks",
                        Number(e.target.value)
                      )
                    }
                    disabled={!(canEditAtsEntries && isAtsEditMode)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={entry.k1Supervision}
                    onChange={(e) =>
                      updateAtsEntry(
                        selectedLecturer.id,
                        entry.id,
                        "k1Supervision",
                        Number(e.target.value)
                      )
                    }
                    disabled={!(canEditAtsEntries && isAtsEditMode)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={entry.k2Research}
                    onChange={(e) =>
                      updateAtsEntry(
                        selectedLecturer.id,
                        entry.id,
                        "k2Research",
                        Number(e.target.value)
                      )
                    }
                    disabled={!(canEditAtsEntries && isAtsEditMode)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={entry.k3Service}
                    onChange={(e) =>
                      updateAtsEntry(
                        selectedLecturer.id,
                        entry.id,
                        "k3Service",
                        Number(e.target.value)
                      )
                    }
                    disabled={!(canEditAtsEntries && isAtsEditMode)}
                  />
                </td>

                <td>
                  <textarea
                    value={entry.notes ?? ""}
                    onChange={(e) =>
                      updateAtsEntry(
                        selectedLecturer.id,
                        entry.id,
                        "notes",
                        e.target.value
                      )
                    }
                    disabled={!(canEditAtsEntries && isAtsEditMode)}
                  />
                </td>

                {canEditAtsEntries && isAtsEditMode ? (
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
              <td className="totals-label" colSpan={5}>
                Totals
              </td>
              <td>
                <div className="total-box">
                  {selectedLecturer.atsEntries.reduce(
                    (sum, entry) => sum + Number(entry.ks || 0),
                    0
                  )}
                </div>
              </td>
              <td>
                <div className="total-box">
                  {selectedLecturer.atsEntries.reduce(
                    (sum, entry) => sum + Number(entry.k1Supervision || 0),
                    0
                  )}
                </div>
              </td>
              <td>
                <div className="total-box">
                  {selectedLecturer.atsEntries.reduce(
                    (sum, entry) => sum + Number(entry.k2Research || 0),
                    0
                  )}
                </div>
              </td>
              <td>
                <div className="total-box">
                  {selectedLecturer.atsEntries.reduce(
                    (sum, entry) => sum + Number(entry.k3Service || 0),
                    0
                  )}
                </div>
              </td>
              {canEditAtsEntries ? <td /> : null}
            </tr>
          </tfoot>
        </table>
      </div>

      {canEditAtsEntries && isAtsEditMode ? (
        <div className="action-row">
          <button
            type="button"
            className="secondary-button"
            onClick={() => addAtsRow(selectedLecturer.id)}
          >
            Add ATS Row
          </button>
        </div>
      ) : null}

      {isAddAtsModalOpen ? (
        <div className="modal-backdrop" onClick={closeAddAtsModal}>
          <div
            className="modal-card ats-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="panel-heading">
              <div>
                <p className="eyebrow">New ATS entry</p>
                <h3>Add lecturer ATS row</h3>
              </div>

              <button
                type="button"
                className="ghost-button compact"
                onClick={closeAddAtsModal}
              >
                Close
              </button>
            </div>

            <div className="form-grid three-cols">
              <label className="field">
                <span>Course code(s)</span>
                <input
                  type="text"
                  value={(newAtsDraft.courseCodes ?? []).join(", ")}
                  onChange={(e) =>
                    updateNewAtsDraftList("courseCodes", e.target.value)
                  }
                  placeholder="e.g. MUC2213, MUC2214"
                />
              </label>

              <label className="field">
                <span>Course name(s)</span>
                <input
                  type="text"
                  value={(newAtsDraft.courseNames ?? []).join(", ")}
                  onChange={(e) =>
                    updateNewAtsDraftList("courseNames", e.target.value)
                  }
                  placeholder="e.g. Composition Techniques I"
                />
              </label>

              <label className="field">
                <span>Program(s)</span>
                <input
                  type="text"
                  value={(newAtsDraft.programs ?? []).join(", ")}
                  onChange={(e) =>
                    updateNewAtsDraftList("programs", e.target.value)
                  }
                  placeholder="e.g. MU221 Bachelor in Music Composition"
                />
              </label>

              <label className="field">
                <span>Group(s)</span>
                <input
                  type="text"
                  value={(newAtsDraft.groups ?? []).join(", ")}
                  onChange={(e) =>
                    updateNewAtsDraftList("groups", e.target.value)
                  }
                  placeholder="e.g. MU221SEM1N"
                />
              </label>

              <label className="field">
                <span>Contact Hours</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={newAtsDraft.contactHours ?? ""}
                  onChange={(e) =>
                    updateNewAtsDraft("contactHours", e.target.value)
                  }
                  placeholder="e.g. 2"
                />
              </label>
            </div>

            <div className="form-grid">
              <label className="field">
                <span>KS</span>
                <input
                  type="number"
                  value={newAtsDraft.ks}
                  onChange={(e) =>
                    updateNewAtsDraft("ks", Number(e.target.value))
                  }
                />
              </label>

              <label className="field">
                <span>K1</span>
                <input
                  type="number"
                  value={newAtsDraft.k1Supervision}
                  onChange={(e) =>
                    updateNewAtsDraft(
                      "k1Supervision",
                      Number(e.target.value)
                    )
                  }
                />
              </label>

              <label className="field">
                <span>K2</span>
                <input
                  type="number"
                  value={newAtsDraft.k2Research}
                  onChange={(e) =>
                    updateNewAtsDraft("k2Research", Number(e.target.value))
                  }
                />
              </label>

              <label className="field">
                <span>K3</span>
                <input
                  type="number"
                  value={newAtsDraft.k3Service}
                  onChange={(e) =>
                    updateNewAtsDraft("k3Service", Number(e.target.value))
                  }
                />
              </label>
            </div>

            <label className="field">
              <span>Notes</span>
              <textarea
                value={newAtsDraft.notes}
                onChange={(e) =>
                  updateNewAtsDraft("notes", e.target.value)
                }
                placeholder="Optional notes"
              />
            </label>

            <div className="action-row">
              <button
                type="button"
                className="ghost-button"
                onClick={closeAddAtsModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={submitNewAtsEntry}
              >
                Save ATS Entry
              </button>
            </div>
          </div>
        </div>
      ) : null}
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
{screen === "mufCodes" ? (
  <section className="page-grid">
    <div className="panel panel-wide">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Placeholder module</p>
          <h3>MUF Codes</h3>
        </div>
      </div>
      <div className="empty-state-box">
        MUF Codes page added. Functionality will be added later.
      </div>
    </div>
  </section>
) : null}

{screen === "performingGroups" ? (
  <section className="page-grid">
    <div className="panel panel-wide">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Placeholder module</p>
          <h3>Performing Groups</h3>
        </div>
      </div>
      <div className="empty-state-box">
        Performing Groups page added. Functionality will be added later.
      </div>
    </div>
  </section>
) : null}

{screen === "forumColloquim" ? (
  <section className="page-grid">
    <div className="panel panel-wide">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Placeholder module</p>
          <h3>Forum/Colloquim</h3>
        </div>
      </div>
      <div className="empty-state-box">
        Forum/Colloquim page added. Functionality will be added later.
      </div>
    </div>
  </section>
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