import { useMemo, useState, useEffect } from "react";
import "./App.css";

// --- Initial Data ---
const INITIAL_PROGRAMS = [
  "MU110", "MU111", "MU220/MU230", "MU221", "MU222", 
  "MU223", "MU750", "MU778", "MU790", "MU950",
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

const INITIAL_COURSES = [
  { id: "crs-1", code: "MUC2213", name: "Composition Techniques I", programs: ["MU221"] },
  { id: "crs-2", code: "MUA1102", name: "Aural Skills", programs: ["MU110"] },
  { id: "crs-3", code: "MUE2304", name: "Curriculum Design", programs: ["MU220/MU230"] },
  { id: "crs-4", code: "MUP2221", name: "Principal Study Piano", programs: ["MU222"] },
  { id: "crs-5", code: "MUD1114", name: "Digital Audio Workstations", programs: ["MU111"] }
];

const INITIAL_GROUPS = [
  { id: "group-1", department: "MU221", groupName: "MU221SEM1N", studentCount: 12 },
  { id: "group-2", department: "MU221", groupName: "MU221SEM2", studentCount: 10 },
  { id: "group-3", department: "MU222", groupName: "MU222SEM3", studentCount: 8 },
  { id: "group-4", department: "MU220/MU230", groupName: "MU230SEM6", studentCount: 9 },
  { id: "group-5", department: "MU110", groupName: "MU110SEM1", studentCount: 15 },
  { id: "group-6", department: "MU111", groupName: "MU111SEM1", studentCount: 22 },
];

const INITIAL_USERS = {
  admin: [{ id: "admin-1", username: "admin1", password: "111" }],
  coordinator: [{ id: "coord-1", username: "user1", password: "111" }],
  guest: [{ id: "guest-1", username: "guest1", password: "111" }],
};

const INITIAL_LECTURERS = [
  {
    id: "lec-1", name: "Dr. Aisyah Rahman", departments: ["MU221", "MU110"],
    minATS: 16, maxATS: 18, position: "Lecturer", additionalInfo: "Composition", remarks: "",
    atsEntries: [{ id: "ats-1", courseCodes: ["MUC2213"], courseNames: ["Composition Techniques I"], programs: ["MU221"], groups: ["MU221SEM1N"], contactHours: 4, ks: 4, k1Supervision: 1, k2Research: 2, k3Service: 1, notes: "Final year composition" }]
  },
  {
    id: "lec-2", name: "Prof. Siti Mariam", departments: ["MU220/MU230"],
    minATS: 16, maxATS: 18, position: "Dean", additionalInfo: "Pedagogy", remarks: "Leadership workload",
    atsEntries: []
  },
  {
    id: "lec-3", name: "Dr. Ahmad Fariz", departments: ["MU111"],
    minATS: 14, maxATS: 16, position: "Senior Lecturer", additionalInfo: "Audio Tech", remarks: "",
    atsEntries: [{ id: "ats-2", courseCodes: ["MUD1114"], courseNames: ["Digital Audio Workstations"], programs: ["MU111"], groups: ["MU111SEM1"], contactHours: 3, ks: 3, k1Supervision: 0, k2Research: 2, k3Service: 0, notes: "Lab based" }]
  },
  {
    id: "lec-4", name: "Assoc. Prof. Chloe", departments: ["MU222"],
    minATS: 12, maxATS: 15, position: "Assoc. Professor", additionalInfo: "Classical Piano", remarks: "",
    atsEntries: [{ id: "ats-3", courseCodes: ["MUP2221"], courseNames: ["Principal Study Piano"], programs: ["MU222"], groups: ["MU222SEM3"], contactHours: 6, ks: 6, k1Supervision: 3, k2Research: 4, k3Service: 2, notes: "1-on-1 sessions" }]
  },
  {
    id: "lec-5", name: "Mr. Tan Wei", departments: ["MU110"],
    minATS: 18, maxATS: 20, position: "Lecturer", additionalInfo: "Aural Training", remarks: "Heavy teaching load",
    atsEntries: [{ id: "ats-4", courseCodes: ["MUA1102"], courseNames: ["Aural Skills"], programs: ["MU110"], groups: ["MU110SEM1"], contactHours: 5, ks: 5, k1Supervision: 0, k2Research: 1, k3Service: 0, notes: "Large group" }]
  }
];

// --- Helper Functions ---
function getAtsTotal(lecturer) {
  if (!lecturer || !lecturer.atsEntries) return 0;
  return lecturer.atsEntries.reduce((sum, entry) => sum + Number(entry.ks || 0) + Number(entry.k1Supervision || 0) + Number(entry.k2Research || 0) + Number(entry.k3Service || 0), 0);
}

function getSemesterFromGroup(groupName) {
  if (groupName && typeof groupName === 'string' && groupName.includes("SEM")) {
    return "Semester " + groupName.split("SEM")[1];
  }
  return "-";
}

function createBlankAtsEntry() {
  return { id: `ats-${Date.now()}`, courseCodes: [], courseNames: [], programs: [], groups: [], contactHours: 0, ks: 0, k1Supervision: 0, k2Research: 0, k3Service: 0, notes: "" };
}

// --- Custom UI Components ---
function AutocompleteMultiSelect({ options = [], selected = [], onChange, placeholder }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const safeSelected = Array.isArray(selected) ? selected : [];
  const filteredOptions = (options || []).filter(opt => 
    opt && opt.toLowerCase().includes((query || "").toLowerCase()) && !safeSelected.includes(opt)
  );

  const handleSelect = (val) => {
    onChange([...safeSelected, val]);
    setQuery("");
    setIsOpen(false);
  };

  const handleRemove = (val) => {
    onChange(safeSelected.filter(item => item !== val));
  };

  return (
    <div className="autocomplete-container">
      <div className="autocomplete-input-box" onClick={() => setIsOpen(true)}>
        {safeSelected.map(s => (
          <span key={s} className="chip">
            {s} 
            <button type="button" onClick={(e) => { e.stopPropagation(); handleRemove(s); }}>&times;</button>
          </span>
        ))}
        <input 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={safeSelected.length === 0 ? placeholder : ""}
          className="autocomplete-input"
        />
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

function AutocompleteSingleSelect({ options = [], selected, onChange, placeholder }) {
  const [query, setQuery] = useState(selected || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setQuery(selected || "");
  }, [selected]);

  const filteredOptions = (options || []).filter(opt => 
    opt && opt.toLowerCase().includes((query || "").toLowerCase())
  );

  const handleSelect = (val) => {
    onChange(val);
    setQuery(val);
    setIsOpen(false);
  };

  return (
    <div className="autocomplete-container">
      <div className="autocomplete-input-box single">
        <input 
          value={query} 
          onChange={e => { setQuery(e.target.value); if(!isOpen) setIsOpen(true); onChange(""); }} 
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="autocomplete-input"
        />
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

// --- Main App Component ---
export default function App() {
  const [users] = useState(INITIAL_USERS);
  const [lecturers, setLecturers] = useState(INITIAL_LECTURERS);
  const [coursesList, setCoursesList] = useState(INITIAL_COURSES);
  const [groups, setGroups] = useState(INITIAL_GROUPS);
  const [programsList, setProgramsList] = useState(INITIAL_PROGRAMS);
  
  const [globalInfo, setGlobalInfo] = useState({
    faculty: "Faculty of Music",
    semester: "Semester 2026/2",
    mode: "Draft" 
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
  
  const [isOtherCoursesOpen, setIsOtherCoursesOpen] = useState(false);
  const [isAddAtsModalOpen, setIsAddAtsModalOpen] = useState(false);
  const [newAtsDraft, setNewAtsDraft] = useState(createBlankAtsEntry());

  const [lecturerDraft, setLecturerDraft] = useState(null);
  const [courseDraft, setCourseDraft] = useState(null);

  const isAdminOrDev = currentUser?.role === "admin" || currentUser?.role === "developer";
  const isReadOnly = globalInfo.mode === "Completed" && !isAdminOrDev;

  const filteredLecturers = useMemo(() => {
    return lecturers.filter(l => selectedDepartment === "All Departments" || (l.departments || []).includes(selectedDepartment));
  }, [lecturers, selectedDepartment]);

  const selectedLecturer = lecturers.find(l => l.id === selectedLecturerId) || null;

  function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    if (loginPassword === "dev") {
      setCurrentUser({ role: "developer", displayName: "Developer" });
      setScreen("dashboard");
      return;
    }
    const matchedUser = (users[selectedLoginRole] || []).find(u => u.username === loginUsername && u.password === loginPassword);
    if (!matchedUser) { setLoginError("Invalid username or password."); return; }
    setCurrentUser({ role: selectedLoginRole, displayName: selectedLoginRole });
    setScreen("dashboard");
  }

  function saveAtsEntry() {
    setLecturers(prev => prev.map(l => l.id === selectedLecturerId ? { ...l, atsEntries: [...(l.atsEntries || []), newAtsDraft] } : l));
    setIsAddAtsModalOpen(false);
    setNewAtsDraft(createBlankAtsEntry());
  }

  const handleSelectMultipleChange = (stateSetter, field, e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    stateSetter(prev => ({ ...prev, [field]: selected }));
  };

  function getGroupDisplay(groupName) {
    if (!groupName) return "-";
    const groupObj = groups.find(g => g.groupName === groupName);
    return groupObj ? `${groupName} (${groupObj.studentCount || 0})` : groupName;
  }

  function openEditLecturer(lecturer) {
    if (lecturer) setLecturerDraft(lecturer);
    else setLecturerDraft({ id: `lec-${Date.now()}`, name: "", departments: [], minATS: 16, maxATS: 18, position: "Lecturer", additionalInfo: "", remarks: "", atsEntries: [] });
  }

  function saveLecturer() {
    if (lecturers.find(l => l.id === lecturerDraft.id)) {
      setLecturers(lecturers.map(l => l.id === lecturerDraft.id ? lecturerDraft : l));
    } else {
      setLecturers([...lecturers, lecturerDraft]);
    }
    setLecturerDraft(null);
  }

  function openEditCourse(course) {
    if (course) setCourseDraft(course);
    else setCourseDraft({ id: `crs-${Date.now()}`, code: "", name: "", programs: [] });
  }

  function saveCourse() {
    if (coursesList.find(c => c.id === courseDraft.id)) {
      setCoursesList(coursesList.map(c => c.id === courseDraft.id ? courseDraft : c));
    } else {
      setCoursesList([...coursesList, courseDraft]);
    }
    setCourseDraft(null);
  }

  function renderSidebar() {
    return (
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="brand-mark small">ATS</div>
            <h2>Planner</h2>
          </div>
          <div className="sidebar-sub-brand">
            <p>{globalInfo.faculty}</p>
            <p>{globalInfo.semester}</p>
            <span className={`mode-badge ${globalInfo.mode.toLowerCase()}`}>{globalInfo.mode} Mode</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-link ${screen === "dashboard" ? "active" : ""}`} onClick={() => setScreen("dashboard")}>Dashboard</button>
          <button className={`nav-link ${screen === "groupInfo" ? "active" : ""}`} onClick={() => setScreen("groupInfo")}>Group Info</button>
          <button className={`nav-link ${screen === "lecturerAts" ? "active" : ""}`} onClick={() => setScreen("lecturerAts")}>Lecturer ATS</button>

          <div className="other-courses-dropdown">
            <button className="nav-link dropdown-toggle" onClick={() => setIsOtherCoursesOpen(!isOtherCoursesOpen)}>
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
          <div className="user-status-text">Logged in as <strong>{currentUser?.displayName}</strong></div>
          {isAdminOrDev && (
            <button className={`ghost-button footer-btn ${screen === "settings" ? "active" : ""}`} onClick={() => setScreen("settings")}>
              ⚙️ Settings (Admin)
            </button>
          )}
          <button className="ghost-button red footer-btn" onClick={() => { setCurrentUser(null); setScreen("login"); }}>
            Sign out
          </button>
        </div>
      </aside>
    );
  }

  function renderAddAtsModal() {
    if (!isAddAtsModalOpen) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-content fullscreen-modal">
          <div className="modal-header">
            <h3>Add ATS Entry for {selectedLecturer?.name || "Lecturer"}</h3>
            <button className="ghost-button compact" onClick={() => setIsAddAtsModalOpen(false)}>Close</button>
          </div>
          <div className="modal-body">
            <div className="ats-grid-row-1">
              <label className="field"><span>Course Code(s)</span>
                <AutocompleteMultiSelect 
                  options={coursesList.map(c => c.code)} 
                  selected={newAtsDraft.courseCodes} 
                  onChange={val => setNewAtsDraft({...newAtsDraft, courseCodes: val})} 
                  placeholder="Type to search codes..."
                />
              </label>
              <label className="field"><span>Course Name(s)</span>
                <AutocompleteMultiSelect 
                  options={coursesList.map(c => c.name)} 
                  selected={newAtsDraft.courseNames} 
                  onChange={val => setNewAtsDraft({...newAtsDraft, courseNames: val})} 
                  placeholder="Type to search names..."
                />
              </label>
              <label className="field"><span>Program(s)</span>
                <AutocompleteMultiSelect 
                  options={programsList} 
                  selected={newAtsDraft.programs} 
                  onChange={val => setNewAtsDraft({...newAtsDraft, programs: val})} 
                  placeholder="Type to search programs..."
                />
              </label>
            </div>

            <div className="ats-grid-row-2">
              <label className="field"><span>Group(s)</span>
                <AutocompleteMultiSelect 
                  options={groups.map(g => g.groupName)} 
                  selected={newAtsDraft.groups} 
                  onChange={val => setNewAtsDraft({...newAtsDraft, groups: val})} 
                  placeholder="Type to search groups..."
                />
              </label>
              <label className="field tight-input"><span>Contact Hours</span>
                <input type="number" value={newAtsDraft.contactHours} onChange={e => setNewAtsDraft({...newAtsDraft, contactHours: e.target.value})} />
              </label>
              <label className="field tight-input"><span>KS</span>
                <input type="number" value={newAtsDraft.ks} onChange={e => setNewAtsDraft({...newAtsDraft, ks: e.target.value})} />
              </label>
            </div>

            <div className="ats-grid-row-3">
              <label className="field tight-input"><span>K1 (Supervision)</span>
                <input type="number" value={newAtsDraft.k1Supervision} onChange={e => setNewAtsDraft({...newAtsDraft, k1Supervision: e.target.value})} />
              </label>
              <label className="field tight-input"><span>K2 (Research)</span>
                <input type="number" value={newAtsDraft.k2Research} onChange={e => setNewAtsDraft({...newAtsDraft, k2Research: e.target.value})} />
              </label>
              <label className="field tight-input"><span>K3 (Service)</span>
                <input type="number" value={newAtsDraft.k3Service} onChange={e => setNewAtsDraft({...newAtsDraft, k3Service: e.target.value})} />
              </label>
            </div>

            <div className="ats-grid-row-4">
              <label className="field"><span>Notes</span>
                <textarea rows="2" value={newAtsDraft.notes} onChange={e => setNewAtsDraft({...newAtsDraft, notes: e.target.value})} placeholder="Any additional notes..."></textarea>
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button className="primary-button full-width" onClick={saveAtsEntry}>Save ATS Entry</button>
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
            <h3>{lecturerDraft.id.startsWith("lec-") && lecturerDraft.name ? "Edit Lecturer" : "Add New Lecturer"}</h3>
            <button className="ghost-button compact" onClick={() => setLecturerDraft(null)}>Close</button>
          </div>
          <div className="modal-body">
            <div className="form-grid three-cols">
              <label className="field"><span>Name</span>
                <input type="text" value={lecturerDraft.name} onChange={e => setLecturerDraft({...lecturerDraft, name: e.target.value})} />
              </label>
              <label className="field"><span>Position</span>
                <select value={lecturerDraft.position} onChange={e => setLecturerDraft({...lecturerDraft, position: e.target.value})}>
                  <option value="">Select Position...</option>
                  {POSITION_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </label>
              <label className="field"><span>Department(s)</span>
                <select multiple value={lecturerDraft.departments || []} onChange={e => handleSelectMultipleChange(setLecturerDraft, "departments", e)} className="multi-select" style={{height: "90px"}}>
                  {programsList.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <small className="hint">Hold Ctrl/Cmd to select multiple</small>
              </label>
            </div>
            <div className="form-grid three-cols" style={{marginTop: "1rem"}}>
              <label className="field tight-input"><span>Min ATS</span>
                <input type="number" value={lecturerDraft.minATS} onChange={e => setLecturerDraft({...lecturerDraft, minATS: Number(e.target.value)})} />
              </label>
              <label className="field tight-input"><span>Max ATS</span>
                <input type="number" value={lecturerDraft.maxATS} onChange={e => setLecturerDraft({...lecturerDraft, maxATS: Number(e.target.value)})} />
              </label>
              <label className="field"><span>Expertise</span>
                <input type="text" value={lecturerDraft.additionalInfo} onChange={e => setLecturerDraft({...lecturerDraft, additionalInfo: e.target.value})} />
              </label>
            </div>
            <div className="ats-grid-row-4">
              <label className="field"><span>Remarks</span>
                <textarea rows="2" value={lecturerDraft.remarks || ""} onChange={e => setLecturerDraft({...lecturerDraft, remarks: e.target.value})} placeholder="Any additional remarks..."></textarea>
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button className="primary-button full-width" onClick={saveLecturer}>Save Lecturer</button>
          </div>
        </div>
      </div>
    );
  }

  function renderCourseModal() {
    if (!courseDraft) return null;
    return (
      <div className="global-overlay">
        <div className="modal-content center-modal">
          <div className="modal-header">
            <h3>{courseDraft.id.startsWith("crs-") && courseDraft.code ? "Edit Course" : "Add New Course"}</h3>
            <button className="ghost-button compact" onClick={() => setCourseDraft(null)}>Close</button>
          </div>
          <div className="modal-body">
            <div className="form-grid three-cols">
              <label className="field"><span>Course Code</span>
                <input type="text" value={courseDraft.code} onChange={e => setCourseDraft({...courseDraft, code: e.target.value})} />
              </label>
              <label className="field"><span>Course Name</span>
                <input type="text" value={courseDraft.name} onChange={e => setCourseDraft({...courseDraft, name: e.target.value})} />
              </label>
              <label className="field"><span>Program(s)</span>
                <select multiple value={courseDraft.programs || []} onChange={e => handleSelectMultipleChange(setCourseDraft, "programs", e)} className="multi-select" style={{height: "100px"}}>
                  {programsList.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <small className="hint">Hold Ctrl/Cmd to select multiple</small>
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button className="primary-button full-width" onClick={saveCourse}>Save Course</button>
          </div>
        </div>
      </div>
    );
  }

  function renderMainContent() {
    if (screen === "dashboard") {
      const lecturersStatus = lecturers.map(l => {
        const total = getAtsTotal(l);
        let status = "Normal";
        if (total === 0) status = "No ATS";
        else if (total > l.maxATS) status = "Overload";
        else if (total < l.minATS) status = "Underload";
        return { ...l, total, status };
      }).filter(l => l.status !== "Normal");

      const assignedCourseCodes = lecturers.flatMap(l => (l.atsEntries || []).flatMap(e => e.courseCodes || []));
      const unassignedCourses = coursesList.filter(c => !assignedCourseCodes.includes(c.code));

      const courseCodeCounts = {};
      lecturers.forEach(l => {
        (l.atsEntries || []).forEach(e => {
          (e.courseCodes || []).forEach(code => {
             courseCodeCounts[code] = (courseCodeCounts[code] || 0) + 1;
          });
        });
      });
      const duplicateCourseCodes = Object.entries(courseCodeCounts).filter(([_, count]) => count > 1).map(([code, count]) => ({ code, count }));

      return (
        <section className="page-grid">
          <div className="panel panel-wide">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <p className="eyebrow">Overview</p>
                  <h3>Dashboard</h3>
                </div>
                <button className="primary-button" onClick={() => setScreen("allLecturersAts")}>
                  View All Lecturers ATS
                </button>
             </div>
          </div>

          <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            <div className="panel">
              <h3>Lecturer Load Status</h3>
              <p className="muted-copy" style={{fontSize: "0.8rem", marginBottom: "1rem"}}>Flags lecturers under or over ATS limits.</p>
              <div className="tight-table-wrapper" style={{maxHeight: "300px", overflowY: "auto"}}>
                <table className="tight-table data-table">
                  <thead><tr><th>Lecturer</th><th>Total (Min-Max)</th><th>Status</th></tr></thead>
                  <tbody>
                    {lecturersStatus.map(l => (
                      <tr key={l.id}>
                        <td>{l.name}</td><td>{l.total} ({l.minATS}-{l.maxATS})</td>
                        <td><span className={`status-pill ${l.status.replace(/\s+/g, '-').toLowerCase()}`}>{l.status}</span></td>
                      </tr>
                    ))}
                    {lecturersStatus.length === 0 && <tr><td colSpan="3" className="muted-copy text-center">All loaded optimally.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel">
              <h3>Unassigned Courses</h3>
              <p className="muted-copy" style={{fontSize: "0.8rem", marginBottom: "1rem"}}>Courses not yet mapped to any lecturer.</p>
              <div className="tight-table-wrapper" style={{maxHeight: "300px", overflowY: "auto"}}>
                <table className="tight-table data-table">
                  <thead><tr><th>Course Code</th><th>Course Name</th></tr></thead>
                  <tbody>
                    {unassignedCourses.map(c => <tr key={c.id}><td>{c.code}</td><td>{c.name}</td></tr>)}
                    {unassignedCourses.length === 0 && <tr><td colSpan="2" className="muted-copy text-center">All courses assigned.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel">
              <h3>Duplicate Courses</h3>
              <p className="muted-copy" style={{fontSize: "0.8rem", marginBottom: "1rem"}}>Courses assigned multiple times.</p>
              <div className="tight-table-wrapper" style={{maxHeight: "300px", overflowY: "auto"}}>
                <table className="tight-table data-table">
                  <thead><tr><th>Course Code</th><th>Occurrences</th></tr></thead>
                  <tbody>
                    {duplicateCourseCodes.map(d => <tr key={d.code}><td>{d.code}</td><td>{d.count} times</td></tr>)}
                    {duplicateCourseCodes.length === 0 && <tr><td colSpan="2" className="muted-copy text-center">No duplicates found.</td></tr>}
                  </tbody>
                </table>
              </div>
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
               <h3>All Lecturers ATS</h3>
               <button className="ghost-button compact" onClick={() => setScreen("dashboard")}>Back</button>
             </div>
             <div className="tab-row" style={{marginTop: "1rem"}}>
                <button className={`tab-button ${selectedDepartment === "All Departments" ? "active" : ""}`} onClick={() => setSelectedDepartment("All Departments")}>All</button>
                {programsList.map(dep => (
                  <button key={dep} className={`tab-button ${selectedDepartment === dep ? "active" : ""}`} onClick={() => setSelectedDepartment(dep)}>{dep}</button>
                ))}
             </div>
             <div className="tight-table-wrapper">
               <table className="tight-table data-table">
                  <thead><tr><th>Lecturer Name</th><th>Dept</th><th>Groups Handled</th><th>Total ATS</th><th>Min/Max</th></tr></thead>
                  <tbody>
                    {filteredLecturers.map(l => {
                      const allGroups = (l.atsEntries || []).flatMap(e => e.groups || []);
                      const uniqueGroups = [...new Set(allGroups)].filter(Boolean);
                      return (
                        <tr key={l.id}>
                          <td>
                            <button className="link-button" onClick={() => { setSelectedLecturerId(l.id); setScreen("lecturerAts"); }}>
                              <strong>{l.name}</strong>
                            </button>
                          </td>
                          <td>{(l.departments || []).join(", ")}</td>
                          <td style={{fontSize: "0.85rem", color: "#a8b5d6"}}>
                            {uniqueGroups.map(g => getGroupDisplay(g)).join(", ") || "-"}
                          </td>
                          <td>{getAtsTotal(l)}</td>
                          <td>{l.minATS} - {l.maxATS}</td>
                        </tr>
                      )
                    })}
                  </tbody>
               </table>
             </div>
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
                  {programsList.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead><tr><th>Group Name</th><th>Program</th><th>SEMESTER</th><th>Student Count</th></tr></thead>
                <tbody>
                  {filteredGroups.map((group) => (
                    <tr key={group.id}>
                      <td>{group.groupName}</td>
                      <td>{group.department}</td>
                      <td><span className="pill">{getSemesterFromGroup(group.groupName)}</span></td>
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

    if (screen === "lecturerAts") {
      return (
        <section className="page-grid">
          <div className="panel panel-wide" style={{overflow: "visible"}}>
            <div style={{ maxWidth: "400px", marginBottom: "2rem", zIndex: 50, position: "relative" }}>
              <label className="field">
                <span style={{color: "#fff", fontWeight: "600"}}>Search & Select Lecturer</span>
                <AutocompleteSingleSelect 
                  options={lecturers.map(l => l.name)}
                  selected={selectedLecturer?.name}
                  onChange={(val) => {
                    const l = lecturers.find(x => x.name === val);
                    setSelectedLecturerId(l ? l.id : null);
                  }}
                  placeholder="Type lecturer name..."
                />
              </label>
            </div>

            {selectedLecturer ? (
              <div className="fade-in">
                <div className="lecturer-header-card" style={{ marginBottom: "1rem" }}>
                  <div>
                    <h2 style={{margin: 0, color: "#fff"}}>{selectedLecturer.name}</h2>
                    <p className="muted-copy" style={{margin: "0.2rem 0 0"}}>{selectedLecturer.position} • {(selectedLecturer.departments || []).join(", ")}</p>
                  </div>
                  <div className="metric-box">
                    <span>Total ATS:</span>
                    <strong>{getAtsTotal(selectedLecturer)}</strong>
                  </div>
                </div>

                {!isReadOnly && (
                  <div className="action-row">
                    <button className="primary-button" onClick={() => setIsAddAtsModalOpen(true)}>+ Add ATS Entry</button>
                  </div>
                )}

                <div className="table-wrapper" style={{ marginTop: "1rem" }}>
                  <table className="data-table tight-inputs">
                    <thead>
                      <tr>
                        <th>Course Codes</th>
                        <th>Course Names</th>
                        <th>Programs</th>
                        <th>Groups (Students)</th>
                        <th>KS</th>
                        <th>K1</th>
                        <th>K2</th>
                        <th>K3</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedLecturer.atsEntries || []).map(entry => (
                        <tr key={entry.id}>
                          <td><textarea readOnly value={(entry.courseCodes || []).join("\n")}></textarea></td>
                          <td><textarea readOnly value={(entry.courseNames || []).join("\n")}></textarea></td>
                          <td><textarea readOnly value={(entry.programs || []).join("\n")}></textarea></td>
                          <td>
                            <textarea readOnly value={(entry.groups || []).map(g => getGroupDisplay(g)).join("\n")}></textarea>
                          </td>
                          <td>{entry.ks}</td>
                          <td>{entry.k1Supervision}</td>
                          <td>{entry.k2Research}</td>
                          <td>{entry.k3Service}</td>
                        </tr>
                      ))}
                      {(!selectedLecturer.atsEntries || selectedLecturer.atsEntries.length === 0) && (
                        <tr><td colSpan="8" className="text-center muted-copy">No ATS entries found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #243250", borderRadius: "12px" }}>
                <p className="muted-copy">Search and select a lecturer above to view their ATS details.</p>
              </div>
            )}
          </div>
        </section>
      );
    }

    if (screen === "settings") {
      return (
        <section className="page-grid">
           <div className="panel panel-wide">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3>Admin Settings</h3>
                  <p className="muted-copy">Manage core data, system globals, and permissions.</p>
                </div>
                <div className="tab-row" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                  <button className={`tab-button ${settingsTab === "general" ? "active" : ""}`} onClick={() => setSettingsTab("general")}>General / Mode</button>
                  <button className={`tab-button ${settingsTab === "lecturers" ? "active" : ""}`} onClick={() => setSettingsTab("lecturers")}>Lecturers</button>
                  <button className={`tab-button ${settingsTab === "courses" ? "active" : ""}`} onClick={() => setSettingsTab("courses")}>Courses</button>
                  <button className={`tab-button ${settingsTab === "programs" ? "active" : ""}`} onClick={() => setSettingsTab("programs")}>Programs</button>
                  <button className={`tab-button ${settingsTab === "groups" ? "active" : ""}`} onClick={() => setSettingsTab("groups")}>Groups</button>
                </div>
              </div>

              {settingsTab === "general" && (
                <div className="form-grid three-cols" style={{ padding: "1.5rem", border: "1px solid #243250", borderRadius: "14px"}}>
                  <label className="field"><span>Faculty Name</span>
                    <input type="text" value={globalInfo.faculty} onChange={e => setGlobalInfo({...globalInfo, faculty: e.target.value})} />
                  </label>
                  <label className="field"><span>Semester Config</span>
                    <input type="text" value={globalInfo.semester} onChange={e => setGlobalInfo({...globalInfo, semester: e.target.value})} />
                  </label>
                  <label className="field"><span>Planner Mode</span>
                    <select value={globalInfo.mode} onChange={e => setGlobalInfo({...globalInfo, mode: e.target.value})}>
                      <option value="Draft">Draft (Editable by all roles)</option>
                      <option value="Completed">Completed (Locked for non-admins)</option>
                    </select>
                    <small className="hint" style={{marginTop: "0.2rem"}}>Locks inputs when Complete.</small>
                  </label>
                </div>
              )}

              {settingsTab === "programs" && (
                <div style={{ padding: "1.5rem", border: "1px solid #243250", borderRadius: "14px"}}>
                  <h4>Manage Programs / Departments</h4>
                  <p className="muted-copy" style={{fontSize: "0.85rem", marginBottom: "1rem"}}>Add new programs using the input below.</p>
                  <div className="form-grid three-cols" style={{alignItems: "end"}}>
                    <label className="field"><span>New Program Code</span>
                      <input type="text" id="newProgInput" placeholder="e.g. MU333" />
                    </label>
                    <button className="primary-button compact" onClick={() => {
                      const val = document.getElementById("newProgInput")?.value;
                      if(val && !programsList.includes(val)) {
                        setProgramsList([...programsList, val]);
                        document.getElementById("newProgInput").value = "";
                      }
                    }}>Add Program</button>
                  </div>
                  <div className="table-wrapper">
                    <table className="tight-table data-table" style={{width: "50%"}}>
                      <thead><tr><th>Existing Programs</th></tr></thead>
                      <tbody>
                        {programsList.map(p => <tr key={p}><td>{p}</td></tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {settingsTab === "groups" && (
                <div style={{ padding: "1.5rem", border: "1px solid #243250", borderRadius: "14px"}}>
                   <h4>Add New Group</h4>
                   <div className="form-grid three-cols" style={{marginTop: "1rem", alignItems: "end"}}>
                     <label className="field"><span>Group Code</span>
                       <input type="text" placeholder="e.g. MU110SEM1" />
                     </label>
                     <label className="field"><span>Program</span>
                        <select>
                          {programsList.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                     </label>
                     <button className="primary-button compact">Add Group</button>
                   </div>
                </div>
              )}

              {settingsTab === "lecturers" && (
                <div>
                  <button className="primary-button compact" onClick={() => openEditLecturer(null)}>+ Add New Lecturer</button>
                  <div className="table-wrapper" style={{marginTop: "1rem"}}>
                    <table className="data-table">
                      <thead>
                        <tr><th>Name</th><th>Department</th><th>Position</th><th>Min/Max ATS</th><th>Actions</th></tr>
                      </thead>
                      <tbody>
                        {lecturers.map(l => (
                          <tr key={l.id}>
                            <td>{l.name}</td>
                            <td>{(l.departments || []).join(", ")}</td>
                            <td>{l.position}</td>
                            <td>{l.minATS} - {l.maxATS}</td>
                            <td>
                              <button className="ghost-button compact" onClick={() => openEditLecturer(l)}>✏️ Edit</button>
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
                  <div className="table-wrapper" style={{marginTop: "1rem"}}>
                    <table className="data-table">
                      <thead>
                        <tr><th>Course Code</th><th>Course Name</th><th>Programs</th><th>Actions</th></tr>
                      </thead>
                      <tbody>
                        {coursesList.map(c => (
                          <tr key={c.id}>
                            <td>{c.code}</td>
                            <td>{c.name}</td>
                            <td>{(c.programs || []).join(", ")}</td>
                            <td>
                              <button className="ghost-button compact" onClick={() => openEditCourse(c)}>✏️ Edit</button>
                            </td>
                          </tr>
                        ))}
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
          <p className="muted-copy">This section is currently empty or under construction.</p>
        </div>
      </section>
    );
  }

  // --- Wrappers ---
  if (screen === "login") {
    return (
      <div className="app-shell login-shell">
        <div className="login-wrap">
          <div className="login-card">
            <div className="brand-block">
              <div className="brand-mark">ATS</div>
              <div className="brand-copy">
                <h1>Lecturer Load Planner</h1>
                <p className="muted-copy">Manage and optimize academic workloads.</p>
              </div>
            </div>
            <form className="login-form" onSubmit={handleLogin}>
              <div><h2 style={{ marginBottom: "0.2rem" }}>Welcome back</h2><p className="muted-copy">Select your role and sign in.</p></div>
              <div className="role-switcher-inline">
                {LOGIN_ROLE_OPTIONS.map(role => (
                  <button key={role.key} type="button" className={`role-pill ${selectedLoginRole === role.key ? "active" : ""}`} onClick={() => setSelectedLoginRole(role.key)}>{role.label}</button>
                ))}
              </div>
              <label className="field"><span>Username</span><input type="text" value={loginUsername} onChange={e => setLoginUsername(e.target.value)} required /></label>
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
      <div className="main-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header className="topbar">
          <div className="topbar-info">
            <h1>ATS Application - {(screen || "").charAt(0).toUpperCase() + (screen || "").slice(1).replace(/([A-Z])/g, ' $1')}</h1>
          </div>
        </header>
        <main style={{ padding: "1.5rem", overflowY: "auto", flex: 1, position: "relative" }}>
          {renderMainContent()}
        </main>
      </div>
      {renderAddAtsModal()}
      {renderLecturerModal()}
      {renderCourseModal()}
    </div>
  );
}