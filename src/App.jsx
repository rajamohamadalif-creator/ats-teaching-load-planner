import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Faculty workload planning</p>
          <h1>ATS Teaching Load Planner</h1>
          <p className="hero-text">
            A clean system for program coordinators to assign teaching loads,
            review lecturer hours, and reduce duplicate class assignments.
          </p>
        </div>
        <button className="primary-btn">New Assignment</button>
      </header>

      <main className="content-grid">
        <section className="card">
          <h2>Quick assignment</h2>
          <div className="form-grid">
            <label>
              Lecturer
              <select defaultValue="">
                <option value="" disabled>Choose lecturer</option>
                <option>Dr Aisyah Rahman</option>
                <option>Dr Daniel Lee</option>
                <option>Ms Nurul Huda</option>
              </select>
            </label>

            <label>
              Course code
              <input type="text" placeholder="e.g. MUF404" />
            </label>

            <label>
              Course name
              <input type="text" placeholder="e.g. Theory I" />
            </label>

            <label>
              Group / section
              <input type="text" placeholder="e.g. Group A" />
            </label>

            <label>
              Program
              <select defaultValue="">
                <option value="" disabled>Choose program</option>
                <option>Composition</option>
                <option>Performance</option>
                <option>Music Education</option>
              </select>
            </label>

            <label>
              Hours
              <input type="number" placeholder="e.g. 2" />
            </label>
          </div>

          <div className="actions">
            <button className="primary-btn">Check & Save</button>
            <button className="secondary-btn">Reset</button>
          </div>
        </section>

        <section className="card">
          <h2>Duplicate assignment warning idea</h2>
          <div className="warning-box">
            <p><strong>Example:</strong> MUF404 / Group A already has a lecturer assigned.</p>
            <p>
              When a duplicate is detected, the app can show the current assignment
              details and let the coordinator cancel or override.
            </p>
          </div>

          <h2>Planned modules</h2>
          <ul className="module-list">
            <li>Lecturers</li>
            <li>Teaching assignments</li>
            <li>MUF shared classes</li>
            <li>Performing groups</li>
            <li>Export to timetable app</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App