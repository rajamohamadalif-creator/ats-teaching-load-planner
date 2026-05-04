import { useMemo, useState } from "react";
import "./App.css";

const PUBLIC_ROLES = ["Admin", "Program Coordinator", "Guest"];

const seedUsers = () => ({
  admins: [
    { id: crypto.randomUUID(), username: "admin1", password: "111", role: "Admin" },
    { id: crypto.randomUUID(), username: "admin2", password: "222", role: "Admin" },
    { id: crypto.randomUUID(), username: "admin3", password: "333", role: "Admin" },
  ],
  coordinators: [
    {
      id: crypto.randomUUID(),
      username: "user1",
      password: "111",
      role: "Program Coordinator",
    },
    {
      id: crypto.randomUUID(),
      username: "user2",
      password: "222",
      role: "Program Coordinator",
    },
    {
      id: crypto.randomUUID(),
      username: "user3",
      password: "333",
      role: "Program Coordinator",
    },
  ],
  guests: [
    { id: crypto.randomUUID(), username: "guest1", password: "111", role: "Guest" },
    { id: crypto.randomUUID(), username: "guest2", password: "222", role: "Guest" },
    { id: crypto.randomUUID(), username: "guest3", password: "333", role: "Guest" },
  ],
});

const SETTINGS_TABS = [
  { key: "admins", label: "Admins" },
  { key: "coordinators", label: "Program Coordinators" },
  { key: "guests", label: "Guests" },
];

function canOpenSettings(role) {
  return role === "Developer" || role === "Admin" || role === "Program Coordinator";
}

function getVisibleTabsForRole(role) {
  if (role === "Developer") return ["admins", "coordinators", "guests"];
  if (role === "Admin") return ["coordinators", "guests"];
  if (role === "Program Coordinator") return ["coordinators", "guests"];
  return [];
}

function canEditRole(currentRole, tabKey) {
  if (currentRole === "Developer") return ["admins", "coordinators", "guests"].includes(tabKey);
  if (currentRole === "Admin") return tabKey === "coordinators";
  return false;
}

function canAddRole(currentRole, tabKey) {
  if (currentRole === "Developer") return ["admins", "coordinators", "guests"].includes(tabKey);
  if (currentRole === "Admin") return tabKey === "coordinators" || tabKey === "guests";
  return false;
}

function getCollectionName(tabKey) {
  if (tabKey === "admins") return "admins";
  if (tabKey === "coordinators") return "coordinators";
  return "guests";
}

function getRoleLabel(tabKey) {
  if (tabKey === "admins") return "Admin";
  if (tabKey === "coordinators") return "Program Coordinator";
  return "Guest";
}

function LoginScreen({ users, onLogin }) {
  const [selectedRole, setSelectedRole] = useState("Program Coordinator");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const allPublicAccounts = useMemo(
    () => ({
      Admin: users.admins,
      "Program Coordinator": users.coordinators,
      Guest: users.guests,
    }),
    [users]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (password === "openlah231787") {
      onLogin({
        role: "Developer",
        username: "System Maintainer",
      });
      return;
    }

    const accountPool = allPublicAccounts[selectedRole] || [];
    const match = accountPool.find(
      (account) => account.username === username && account.password === password
    );

    if (!match) {
      setError("Invalid username or password.");
      return;
    }

    onLogin({
      role: match.role,
      username: match.username,
      id: match.id,
    });
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-icon">
          <span className="lock-circle">🔒</span>
        </div>

        <h1 className="login-title">ATS Teaching Load Planner</h1>
        <p className="login-subtitle">
          Please authenticate to access the workload planning sandbox.
        </p>

        <div className="role-toggle" aria-label="Choose role">
          {PUBLIC_ROLES.map((role) => (
            <button
              key={role}
              type="button"
              className={`role-pill ${selectedRole === role ? "role-pill--active" : ""}`}
              onClick={() => {
                setSelectedRole(role);
                setError("");
              }}
            >
              {role}
            </button>
          ))}
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span className="login-label">Username</span>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="login-field">
            <span className="login-label">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-primary-button">
            Access portal
          </button>
        </form>

        <div className="login-footer">
          <span>Secure Access · ATS Workload Planner · Version 0.1.0</span>
          <span className="login-footer-credit">CREATED BY YM RAJA MOHAMAD ALIF</span>
        </div>
      </div>
    </div>
  );
}

function DashboardHome({ currentUser, onOpenSettings, onLogout }) {
  return (
    <div className="app-shell">
      <header className="planner-header">
        <div>
          <p className="eyebrow">FACULTY WORKLOAD PLANNING</p>
          <h1>ATS Teaching Load Planner</h1>
          <p className="hero-text">
            Assign modules, monitor lecturer hours, and reduce duplicate teaching-load
            conflicts across programmes.
          </p>
        </div>

        <div className="user-badge">
          <div className="user-role">{currentUser.role}</div>
          <div className="user-name">{currentUser.username}</div>

          <div className="header-actions">
            {canOpenSettings(currentUser.role) && (
              <button className="secondary-button" onClick={onOpenSettings}>
                Settings
              </button>
            )}
            <button className="ghost-button" onClick={onLogout}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="content-grid">
        <section className="card card--feature">
          <div className="card-topline">Teaching Load Control</div>
          <h2>Planner workspace</h2>
          <p>
            Use this area for module assignment, lecturer matching, duplicate detection,
            and summary calculations for your ATS timetable workflow.
          </p>

          <div className="mini-stats">
            <div className="mini-stat">
              <span className="mini-stat-label">Current role</span>
              <strong>{currentUser.role}</strong>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">Settings access</span>
              <strong>{canOpenSettings(currentUser.role) ? "Enabled" : "Hidden"}</strong>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-label">User controls</span>
              <strong>
                {currentUser.role === "Developer"
                  ? "Full"
                  : currentUser.role === "Admin"
                  ? "Limited"
                  : currentUser.role === "Program Coordinator"
                  ? "Read-only"
                  : "None"}
              </strong>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-topline">Next build area</div>
          <h2>Planner modules</h2>
          <ul className="feature-list">
            <li>Lecturer load summaries.</li>
            <li>Duplicate class assignment detection.</li>
            <li>Programme and semester filtering.</li>
            <li>Export-ready timetable allocation views.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

function SettingsScreen({
  currentUser,
  users,
  setUsers,
  onBack,
  onLogout,
}) {
  const visibleTabs = getVisibleTabsForRole(currentUser.role);
  const [activeTab, setActiveTab] = useState(visibleTabs[0] || "coordinators");
  const [drafts, setDrafts] = useState({});
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState({ username: "", password: "" });

  const tabMeta =
    SETTINGS_TABS.find((tab) => tab.key === activeTab) || SETTINGS_TABS[1];
  const collectionName = getCollectionName(activeTab);
  const rows = users[collectionName];

  const editable = canEditRole(currentUser.role, activeTab);
  const addable = canAddRole(currentUser.role, activeTab);
  const readOnly = !editable && currentUser.role === "Program Coordinator";

  const updateDraft = (id, field, value) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: value,
      },
    }));
  };

  const handleSaveRow = (id) => {
    if (!editable) return;

    const draft = drafts[id];
    if (!draft) return;

    setUsers((prev) => ({
      ...prev,
      [collectionName]: prev[collectionName].map((row) =>
        row.id === id ? { ...row, ...draft } : row
      ),
    }));

    setDrafts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

    setMessage(`${tabMeta.label.slice(0, -1)} account updated.`);
  };

  const handleAddUser = (event) => {
    event.preventDefault();
    if (!addable) return;
    if (!newUser.username.trim() || !newUser.password.trim()) return;

    const payload = {
      id: crypto.randomUUID(),
      username: newUser.username.trim(),
      password: newUser.password.trim(),
      role: getRoleLabel(activeTab),
    };

    setUsers((prev) => ({
      ...prev,
      [collectionName]: [...prev[collectionName], payload],
    }));

    setNewUser({ username: "", password: "" });
    setMessage(`${getRoleLabel(activeTab)} account added.`);
  };

  return (
    <div className="app-shell">
      <header className="settings-header">
        <div>
          <p className="eyebrow">SYSTEM SETTINGS</p>
          <h1>User access management</h1>
          <p className="hero-text">
            Manage visible account groups according to the permissions of the signed-in
            role.
          </p>
        </div>

        <div className="user-badge">
          <div className="user-role">{currentUser.role}</div>
          <div className="user-name">{currentUser.username}</div>

          <div className="header-actions">
            <button className="secondary-button" onClick={onBack}>
              Back to planner
            </button>
            <button className="ghost-button" onClick={onLogout}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="settings-layout">
        <section className="settings-sidebar card">
          <h2>Account groups</h2>
          <div className="settings-tab-list">
            {SETTINGS_TABS.filter((tab) => visibleTabs.includes(tab.key)).map((tab) => (
              <button
                key={tab.key}
                className={`settings-tab ${activeTab === tab.key ? "settings-tab--active" : ""}`}
                onClick={() => {
                  setActiveTab(tab.key);
                  setMessage("");
                  setNewUser({ username: "", password: "" });
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="settings-rule-box">
            <h3>Permission summary</h3>
            <p>
              {currentUser.role === "Developer" &&
                "You can add and edit Admin, Program Coordinator, and Guest accounts."}
              {currentUser.role === "Admin" &&
                "You can edit Program Coordinators, and add Program Coordinators or Guests."}
              {currentUser.role === "Program Coordinator" &&
                "You can view user groups here, but editing is disabled."}
            </p>
          </div>
        </section>

        <section className="settings-main card">
          <div className="settings-main-header">
            <div>
              <span className="card-topline">Visible accounts</span>
              <h2>{tabMeta.label}</h2>
            </div>
            {message && <div className="status-message">{message}</div>}
          </div>

          <div className="user-table-wrap">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const draft = drafts[row.id] || {};
                  const usernameValue = draft.username ?? row.username;
                  const passwordValue = draft.password ?? row.password;

                  return (
                    <tr key={row.id}>
                      <td>
                        {editable ? (
                          <input
                            value={usernameValue}
                            onChange={(e) => updateDraft(row.id, "username", e.target.value)}
                          />
                        ) : (
                          <span className="table-value">{row.username}</span>
                        )}
                      </td>
                      <td>
                        {editable ? (
                          <input
                            value={passwordValue}
                            onChange={(e) => updateDraft(row.id, "password", e.target.value)}
                          />
                        ) : (
                          <span className="table-value">{row.password}</span>
                        )}
                      </td>
                      <td>
                        <span className="table-badge">{row.role}</span>
                      </td>
                      <td>
                        {editable ? (
                          <button
                            className="table-action"
                            onClick={() => handleSaveRow(row.id)}
                          >
                            Save
                          </button>
                        ) : (
                          <span className="read-only-label">
                            {readOnly ? "Read only" : "No access"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {addable && (
            <form className="add-user-panel" onSubmit={handleAddUser}>
              <div className="add-user-header">
                <div>
                  <span className="card-topline">Create account</span>
                  <h3>Add {getRoleLabel(activeTab)}</h3>
                </div>
              </div>

              <div className="add-user-grid">
                <label className="login-field">
                  <span className="login-label">Username</span>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser((prev) => ({ ...prev, username: e.target.value }))
                    }
                    placeholder="Enter username"
                  />
                </label>

                <label className="login-field">
                  <span className="login-label">Password</span>
                  <input
                    type="text"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser((prev) => ({ ...prev, password: e.target.value }))
                    }
                    placeholder="Enter password"
                  />
                </label>
              </div>

              <button type="submit" className="login-primary-button add-user-button">
                Add user
              </button>
            </form>
          )}

          {!addable && !editable && (
            <div className="read-only-panel">
              This account group is visible here for reference only. Editing and account
              creation are disabled for your role.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState(seedUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("login");

  const handleLogin = (user) => {
    setCurrentUser(user);
    setView("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("login");
  };

  if (!currentUser) {
    return <LoginScreen users={users} onLogin={handleLogin} />;
  }

  if (view === "settings" && canOpenSettings(currentUser.role)) {
    return (
      <SettingsScreen
        currentUser={currentUser}
        users={users}
        setUsers={setUsers}
        onBack={() => setView("dashboard")}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <DashboardHome
      currentUser={currentUser}
      onOpenSettings={() => setView("settings")}
      onLogout={handleLogout}
    />
  );
}

export default App;