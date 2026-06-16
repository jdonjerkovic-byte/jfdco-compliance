/* ============================================================
   JFDCO COMPLIANCE SYSTEM — app.js
   Complete client-side application logic
   ============================================================ */

// ============================================================
// 1. DEFAULTS & CONFIGURATION
// ============================================================
const DEFAULT_PASSWORD = 'jfdco2026';
const DB_NAME = 'JFDCOCompliance';
const DB_VERSION = 1;

const DEFAULT_SETTINGS = {
  company: {
    name: 'JFDCO PTY LTD',
    acn: '698 582 946',
    abn: '38 698 582 946',
    address: '3 Gulf Court, Largs Bay SA 5016',
    purpose: 'Corporate Trustee — JFDCO FAMILY TRUST',
    secretary: 'Not Appointed (exempt under s.204A)',
    dateIncorporated: '05/06/2026',
    asicRegistrationDate: '01/06/2026'
  },
  trust: {
    name: 'JFDCO FAMILY TRUST',
    abn: '76 143 458 288',
    settlementDate: '04/06/2026',
    settlorName: 'Ivan Donjerkovic',
    settlorAddress: '24 Kanimbla Street, Taperoo SA 5017',
    settlementSum: '$10.00',
    vestingPeriod: '80 years from establishment',
    type: 'Discretionary family trust'
  },
  director: {
    fullName: 'James Francis Donaghy',
    dob: '13/06/1984',
    address: '3 Gulf Court, Largs Bay SA 5016',
    occupation: 'Welder',
    directorId: '',
    email: 'jfdassetinvestment@protonmail.com',
    phone: '0414 894 276',
    personalEmail: 'jamesdonaghy530@gmail.com'
  },
  beneficiaries: [
    { name: 'James Francis Donaghy', type: 'Primary' },
    { name: 'Taya Thomas', type: 'Primary' },
    { name: 'Jayde Herraman', type: 'Primary' },
    { name: 'Tori Thomas', type: 'Primary' }
  ],
  shares: {
    totalShares: 100,
    class: 'Ordinary',
    paidPerShare: '$1.00',
    totalPaid: '$100.00'
  }
};

const REGISTER_SCHEMAS = {
  // Company registers
  companyShares: {
    label: 'Share Certificate Register', prefix: 'Share', idField: 'certNo',
    columns: [
      { key: 'certNo', label: 'Cert No', width: '80px' },
      { key: 'shareholder', label: 'Shareholder' },
      { key: 'address', label: 'Address' },
      { key: 'numShares', label: 'Shares', width: '70px' },
      { key: 'class', label: 'Class', width: '90px' },
      { key: 'issueDate', label: 'Issue Date', width: '110px', type: 'date' },
      { key: 'cancelled', label: 'Cancelled?', width: '90px' },
      { key: 'notes', label: 'Notes' }
    ]
  },
  companyMembers: {
    label: 'Register of Members', prefix: 'Member', idField: 'memberNo',
    columns: [
      { key: 'memberNo', label: 'Member No', width: '90px' },
      { key: 'fullName', label: 'Full Name' },
      { key: 'dob', label: 'DOB', width: '100px', type: 'date' },
      { key: 'address', label: 'Address' },
      { key: 'email', label: 'Email' },
      { key: 'class', label: 'Class', width: '80px' },
      { key: 'shares', label: 'Shares', width: '70px' },
      { key: 'paidPerShare', label: 'Paid/Share', width: '90px' },
      { key: 'totalPaid', label: 'Total Paid', width: '90px' },
      { key: 'certNo', label: 'Cert No', width: '80px' },
      { key: 'dateIssued', label: 'Date Issued', width: '110px', type: 'date' },
      { key: 'ceased', label: 'Ceased', width: '80px' },
      { key: 'notes', label: 'Notes' }
    ]
  },
  companyDirectors: {
    label: 'Register of Directors & Officers', prefix: 'Director', idField: 'dirNo',
    columns: [
      { key: 'dirNo', label: 'Dir No', width: '80px' },
      { key: 'fullName', label: 'Full Name' },
      { key: 'dob', label: 'DOB', width: '100px', type: 'date' },
      { key: 'address', label: 'Address' },
      { key: 'occupation', label: 'Occupation', width: '120px' },
      { key: 'role', label: 'Role', width: '120px' },
      { key: 'dateAppointed', label: 'Appointed', width: '110px', type: 'date' },
      { key: 'dateCeased', label: 'Ceased', width: '100px' },
      { key: 'consentSigned', label: 'Consent', width: '80px' },
      { key: 'directorId', label: 'Director ID', width: '100px' },
      { key: 'notes', label: 'Notes' }
    ]
  },
  companyDirChanges: {
    label: 'Director & Officer Change Log', prefix: 'DirChange', idField: 'id',
    columns: [
      { key: 'id', label: '#', width: '60px' },
      { key: 'date', label: 'Date', width: '110px', type: 'date' },
      { key: 'changeType', label: 'Change Type', width: '150px' },
      { key: 'personAffected', label: 'Person Affected' },
      { key: 'newDetails', label: 'New Details' },
      { key: 'asicNotified', label: 'ASIC Notified', width: '110px' },
      { key: 'notes', label: 'Notes' }
    ]
  },
  companyResolutions: {
    label: 'Company Resolution Register', prefix: 'CompRes', idField: 'resolutionNo',
    columns: [
      { key: 'resolutionNo', label: 'Res No', width: '80px' },
      { key: 'date', label: 'Date', width: '110px', type: 'date' },
      { key: 'description', label: 'Description' },
      { key: 'signedBy', label: 'Signed By' },
      { key: 'filed', label: 'Filed', width: '70px' }
    ]
  },
  // Trust registers
  trustAssets: {
    label: 'Trust Asset Register', prefix: 'Asset', idField: 'assetId',
    columns: [
      { key: 'assetId', label: 'Asset ID', width: '90px' },
      { key: 'type', label: 'Type', width: '100px' },
      { key: 'description', label: 'Description' },
      { key: 'dateAcquired', label: 'Acquired', width: '110px', type: 'date' },
      { key: 'purchasePrice', label: 'Price', width: '110px' },
      { key: 'vendor', label: 'Vendor' },
      { key: 'currentValue', label: 'Current Value', width: '110px' },
      { key: 'disposalDate', label: 'Disposed', width: '100px' },
      { key: 'disposalPrice', label: 'Disposal $', width: '100px' },
      { key: 'notes', label: 'Notes' }
    ]
  },
  trustCapital: {
    label: 'Trust Capital Register', prefix: 'Capital', idField: 'entryNo',
    columns: [
      { key: 'entryNo', label: 'Entry No', width: '90px' },
      { key: 'date', label: 'Date', width: '110px', type: 'date' },
      { key: 'contributor', label: 'Contributor' },
      { key: 'amount', label: 'Amount', width: '120px' },
      { key: 'type', label: 'Type', width: '160px' },
      { key: 'notes', label: 'Notes' }
    ]
  },
  trustLoans: {
    label: 'Trust Loan Register', prefix: 'Loan', idField: 'loanId',
    columns: [
      { key: 'loanId', label: 'Loan ID', width: '90px' },
      { key: 'date', label: 'Date', width: '110px', type: 'date' },
      { key: 'direction', label: 'Direction', width: '90px' },
      { key: 'party', label: 'Party' },
      { key: 'amount', label: 'Amount', width: '120px' },
      { key: 'interestRate', label: 'Rate', width: '80px' },
      { key: 'term', label: 'Term', width: '100px' },
      { key: 'status', label: 'Status', width: '90px' },
      { key: 'notes', label: 'Notes' }
    ]
  },
  trustInvestments: {
    label: 'Trust Investment Register', prefix: 'Invest', idField: 'investId',
    columns: [
      { key: 'investId', label: 'Invest ID', width: '90px' },
      { key: 'date', label: 'Date', width: '110px', type: 'date' },
      { key: 'type', label: 'Type', width: '120px' },
      { key: 'description', label: 'Description' },
      { key: 'amount', label: 'Amount', width: '120px' },
      { key: 'currentValue', label: 'Current Value', width: '120px' },
      { key: 'status', label: 'Status', width: '90px' },
      { key: 'notes', label: 'Notes' }
    ]
  },
  trustResolutions: {
    label: 'Trust Resolutions Register', prefix: 'Resolution', idField: 'resolutionNo',
    columns: [
      { key: 'resolutionNo', label: 'Res No', width: '90px' },
      { key: 'date', label: 'Date', width: '110px', type: 'date' },
      { key: 'description', label: 'Description' },
      { key: 'meetingRef', label: 'Meeting Ref', width: '110px' },
      { key: 'signedBy', label: 'Signed By' },
      { key: 'filed', label: 'Filed', width: '70px' }
    ]
  },
  trustTransactions: {
    label: 'Trust Transaction Register', prefix: 'Transaction', idField: 'transId',
    columns: [
      { key: 'transId', label: 'Trans ID', width: '90px' },
      { key: 'date', label: 'Date', width: '110px', type: 'date' },
      { key: 'type', label: 'Type', width: '120px' },
      { key: 'description', label: 'Description' },
      { key: 'debit', label: 'Debit', width: '100px' },
      { key: 'credit', label: 'Credit', width: '100px' },
      { key: 'balance', label: 'Balance', width: '100px' },
      { key: 'relatedRef', label: 'Related Ref', width: '110px' },
      { key: 'notes', label: 'Notes' }
    ]
  },
  trustDocChecks: {
    label: 'Supporting Documents Checklist', prefix: 'DocCheck', idField: 'docId',
    columns: [
      { key: 'docId', label: 'Doc ID', width: '90px' },
      { key: 'documentName', label: 'Document Name' },
      { key: 'required', label: 'Required', width: '90px' },
      { key: 'included', label: 'Included', width: '90px' },
      { key: 'dateFiled', label: 'Date Filed', width: '110px', type: 'date' },
      { key: 'notes', label: 'Notes' }
    ]
  }
};

const INITIAL_DATA = {
  companyShares: [
    { certNo: '001', shareholder: 'James Francis Donaghy', address: '3 Gulf Court, Largs Bay SA 5016', numShares: '100', class: 'Ordinary', issueDate: '05/06/2026', cancelled: 'No', notes: 'Initial issue' }
  ],
  companyMembers: [
    { memberNo: 'M001', fullName: 'James Francis Donaghy', dob: '13/06/1984', address: '3 Gulf Court, Largs Bay SA 5016', email: 'jfdassetinvestment@protonmail.com', class: 'Ordinary', shares: '100', paidPerShare: '$1.00', totalPaid: '$100.00', certNo: '001', dateIssued: '05/06/2026', ceased: '—', notes: 'Sole Member. Holds the Trustee Share. Shares held beneficially in personal capacity.' }
  ],
  companyDirectors: [
    { dirNo: 'D001', fullName: 'James Francis Donaghy', dob: '13/06/1984', address: '3 Gulf Court, Largs Bay SA 5016', occupation: 'Welder', role: 'Sole Director', dateAppointed: '05/06/2026', dateCeased: '—', consentSigned: 'Yes', directorId: '', notes: 'Founding director. Also Sole Member/Shareholder. Witness: Ivan Donjerkovic.' }
  ],
  companyDirChanges: [],
  companyResolutions: [
    { resolutionNo: '001', date: '05/06/2026', description: 'Adoption of Constitution', signedBy: 'James Francis Donaghy', filed: 'Yes' },
    { resolutionNo: '002', date: '05/06/2026', description: 'Appointment of Director', signedBy: 'James Francis Donaghy', filed: 'Yes' },
    { resolutionNo: '003', date: '05/06/2026', description: 'Issue of Trustee Share (100 Ordinary Shares @ $1.00)', signedBy: 'James Francis Donaghy', filed: 'Yes' },
    { resolutionNo: '004', date: '05/06/2026', description: 'Acceptance of Trusteeship — JFDCO Family Trust', signedBy: 'James Francis Donaghy', filed: 'Yes' },
    { resolutionNo: '005', date: '05/06/2026', description: 'Banking Authority — NAB Port Adelaide (Business Transaction + Cash Maximiser)', signedBy: 'James Francis Donaghy', filed: 'Yes' },
    { resolutionNo: '006', date: '05/06/2026', description: 'Registered Office Confirmation — 3 Gulf Court, Largs Bay SA 5016', signedBy: 'James Francis Donaghy', filed: 'Yes' }
  ],
  trustAssets: [],
  trustCapital: [
    { entryNo: 'C001', date: '05/06/2026', contributor: 'Ivan Donjerkovic (Settlor)', amount: '$10.00', type: 'Settlement Sum', notes: 'Initial settlement. Settlor: Ivan Donjerkovic, 24 Kanimbla St, Taperoo SA 5017. Witness: Jayde Herraman.' }
  ],
  trustLoans: [],
  trustInvestments: [],
  trustResolutions: [
    { resolutionNo: 'TR001', date: '05/06/2026', description: 'Acceptance of Trusteeship', meetingRef: '—', signedBy: 'James Francis Donaghy', filed: 'Yes' },
    { resolutionNo: 'TR002', date: '05/06/2026', description: 'Adoption of Trust Deed', meetingRef: '—', signedBy: 'James Francis Donaghy', filed: 'Yes' },
    { resolutionNo: 'TR003', date: '05/06/2026', description: 'Banking Authority — NAB Port Adelaide Trust Account (Business Everyday + Cash Maximiser)', meetingRef: '—', signedBy: 'James Francis Donaghy', filed: 'Yes' },
    { resolutionNo: 'TR004', date: '05/06/2026', description: 'Vehicle Purchase Authorisation — Motor Vehicle (details TBC)', meetingRef: 'Minutes_TR004', signedBy: 'James Francis Donaghy', filed: 'Yes' },
    { resolutionNo: 'TR005', date: '14/06/2026', description: 'Banking Authority — ANNA Money Trust Account', meetingRef: '—', signedBy: 'James Francis Donaghy', filed: 'Yes' }
  ],
  trustTransactions: [
    { transId: 'T001', date: '05/06/2026', type: 'Settlement', description: 'Initial settlement sum — Ivan Donjerkovic (Settlor)', debit: '', credit: '$10.00', balance: '$10.00', relatedRef: 'C001', notes: 'Trust establishment. Account 3000 — Settled Sum.' }
  ],
  trustDocChecks: []
};

const ACTION_TYPES = [
  { id: 'capitalContribution', label: 'Capital Contribution', icon: '💰', desc: 'Record a capital contribution to the trust' },
  { id: 'assetProperty', label: 'Property Acquisition', icon: '🏠', desc: 'Acquire real property in the trust' },
  { id: 'assetVehicle', label: 'Vehicle Acquisition', icon: '🚗', desc: 'Acquire a motor vehicle in the trust' },
  { id: 'assetGeneral', label: 'General Asset', icon: '📦', desc: 'Acquire a general asset in the trust' },
  { id: 'annualDistribution', label: 'Annual Distribution', icon: '📊', desc: 'Year-end income distribution to beneficiaries' },
  { id: 'bankAccount', label: 'Bank Account Opening', icon: '🏦', desc: 'Open a new trust bank account' },
  { id: 'loan', label: 'Loan To/From Trust', icon: '🤝', desc: 'Record a loan arrangement' },
  { id: 'generalResolution', label: 'General Resolution', icon: '📋', desc: 'Pass a general trustee resolution' }
];

// ============================================================
// 2. DATABASE (IndexedDB)
// ============================================================
const DB = {
  db: null,
  async open() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('settings')) db.createObjectStore('settings', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('registers')) db.createObjectStore('registers', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('docHistory')) db.createObjectStore('docHistory', { keyPath: 'id', autoIncrement: true });
        if (!db.objectStoreNames.contains('auth')) db.createObjectStore('auth', { keyPath: 'id' });
      };
      req.onsuccess = (e) => { DB.db = e.target.result; resolve(DB.db); };
      req.onerror = (e) => reject(e.target.error);
    });
  },
  async get(store, key) {
    return new Promise((resolve, reject) => {
      const tx = DB.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },
  async put(store, data) {
    return new Promise((resolve, reject) => {
      const tx = DB.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).put(data);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },
  async getAll(store) {
    return new Promise((resolve, reject) => {
      const tx = DB.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },
  async clear(store) {
    return new Promise((resolve, reject) => {
      const tx = DB.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },
  async delete(store, key) {
    return new Promise((resolve, reject) => {
      const tx = DB.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
};

// ============================================================
// 3. AUTH
// ============================================================
const Auth = {
  async hashPassword(pw) {
    const enc = new TextEncoder().encode(pw);
    const buf = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  },
  async getStoredHash() {
    const rec = await DB.get('auth', 'passwordHash');
    return rec ? rec.hash : null;
  },
  async setPassword(pw) {
    const hash = await Auth.hashPassword(pw);
    await DB.put('auth', { id: 'passwordHash', hash });
  },
  async verify(pw) {
    let stored = await Auth.getStoredHash();
    if (!stored) {
      await Auth.setPassword(DEFAULT_PASSWORD);
      stored = await Auth.hashPassword(DEFAULT_PASSWORD);
    }
    const inputHash = await Auth.hashPassword(pw);
    return inputHash === stored;
  },
  login() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainApp').classList.add('visible');
    sessionStorage.setItem('jfdco_auth', '1');
    App.onLogin();
  },
  logout() {
    sessionStorage.removeItem('jfdco_auth');
    localStorage.removeItem('jfdco_remember');
    document.getElementById('mainApp').classList.remove('visible');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('passwordInput').value = '';
  },
  checkRemember() {
    return localStorage.getItem('jfdco_remember') === '1' || sessionStorage.getItem('jfdco_auth') === '1';
  }
};

// ============================================================
// 4. TOAST NOTIFICATIONS
// ============================================================
const Toast = {
  show(msg, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    toast.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span><span class="toast-msg">${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, duration);
  }
};

// ============================================================
// 5. CONFIRM DIALOG
// ============================================================
const Confirm = {
  show(title, msg, onOk, icon = '⚠️') {
    const d = document.getElementById('confirmDialog');
    document.getElementById('confirmIcon').textContent = icon;
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMsg').textContent = msg;
    d.classList.add('show');
    const okBtn = document.getElementById('confirmOk');
    const cancelBtn = document.getElementById('confirmCancel');
    const cleanup = () => { d.classList.remove('show'); okBtn.onclick = null; cancelBtn.onclick = null; };
    okBtn.onclick = () => { cleanup(); onOk(); };
    cancelBtn.onclick = cleanup;
  }
};

// ============================================================
// 6. LOADING OVERLAY
// ============================================================
const Loading = {
  show(text = 'Generating documents…') {
    document.getElementById('loadingText').textContent = text;
    document.getElementById('loadingOverlay').classList.add('show');
  },
  hide() { document.getElementById('loadingOverlay').classList.remove('show'); }
};

// ============================================================
// 7. MODAL
// ============================================================
const Modal = {
  show(title, bodyHtml, footerHtml = '') {
    document.getElementById('genericModalTitle').textContent = title;
    document.getElementById('genericModalBody').innerHTML = bodyHtml;
    document.getElementById('genericModalFooter').innerHTML = footerHtml;
    document.getElementById('genericModal').classList.add('show');
  },
  close() { document.getElementById('genericModal').classList.remove('show'); }
};

// ============================================================
// 8. NAVIGATION
// ============================================================
const Nav = {
  init() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => Nav.switchTab(btn.dataset.tab));
    });
    document.querySelectorAll('.sub-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => Nav.switchSubNav(btn));
    });
    document.querySelectorAll('.reg-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => Nav.switchRegTab(btn));
    });
  },
  switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    const panel = { trust: 'tabTrust', company: 'tabCompany', operating: 'tabOperating', settings: 'tabSettings' }[tab];
    if (panel) document.getElementById(panel).classList.add('active');
  },
  switchSubNav(btn) {
    const group = btn.dataset.subnav;
    const section = btn.dataset.section;
    document.querySelectorAll(`.sub-nav-btn[data-subnav="${group}"]`).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const prefix = group === 'company' ? 'comp' : 'op';
    document.querySelectorAll(`.${prefix === 'comp' ? 'comp' : 'op'}-section`).forEach(s => s.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
    if (section.includes('Register')) RegisterUI.render(group);
  },
  switchRegTab(btn) {
    const regName = btn.dataset.reg;
    const parent = btn.closest('.reg-tabs');
    parent.querySelectorAll('.reg-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    RegisterUI.renderRegister(regName);
  }
};

// ============================================================
// 9. SETTINGS
// ============================================================
const Settings = {
  data: null,
  async load() {
    const saved = await DB.get('settings', 'main');
    Settings.data = saved ? saved.data : JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    return Settings.data;
  },
  async save() {
    Settings.readFromForm();
    await DB.put('settings', { id: 'main', data: Settings.data });
    Toast.show('Settings saved', 'success');
    const msg = document.getElementById('settingsSaveMsg');
    if (msg) { msg.style.display = 'inline'; setTimeout(() => msg.style.display = 'none', 2000); }
  },
  get(path) {
    return path.split('.').reduce((o, k) => (o || {})[k], Settings.data);
  },
  populate() {
    const s = Settings.data;
    const companyFields = [
      { key: 'name', label: 'Company Name' }, { key: 'acn', label: 'ACN' },
      { key: 'abn', label: 'ABN (Company)' }, { key: 'address', label: 'Registered Office' },
      { key: 'purpose', label: 'Purpose' }, { key: 'dateIncorporated', label: 'Date of Incorporation' }
    ];
    const trustFields = [
      { key: 'name', label: 'Trust Name' }, { key: 'abn', label: 'ABN (Trust)' },
      { key: 'settlementDate', label: 'Settlement Date' }, { key: 'settlorName', label: 'Settlor Name' },
      { key: 'settlorAddress', label: 'Settlor Address' }, { key: 'settlementSum', label: 'Settlement Sum' },
      { key: 'vestingPeriod', label: 'Vesting Period' }
    ];
    const directorFields = [
      { key: 'fullName', label: 'Full Legal Name' }, { key: 'dob', label: 'Date of Birth' },
      { key: 'address', label: 'Address' }, { key: 'occupation', label: 'Occupation' },
      { key: 'directorId', label: 'Director ID' }, { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' }, { key: 'personalEmail', label: 'Personal Email' }
    ];
    const shareFields = [
      { key: 'totalShares', label: 'Total Shares' }, { key: 'class', label: 'Class' },
      { key: 'paidPerShare', label: 'Paid Per Share' }, { key: 'totalPaid', label: 'Total Paid' }
    ];
    const renderGroup = (containerId, fields, section) => {
      const el = document.getElementById(containerId);
      if (!el) return;
      el.innerHTML = fields.map(f => `
        <div class="form-group">
          <label>${f.label}</label>
          <input type="text" class="form-control" data-settings="${section}.${f.key}" value="${(s[section] || {})[f.key] || ''}">
        </div>
      `).join('');
    };
    renderGroup('settingsCompany', companyFields, 'company');
    renderGroup('settingsTrust', trustFields, 'trust');
    renderGroup('settingsDirector', directorFields, 'director');
    renderGroup('settingsShares', shareFields, 'shares');
    Settings.populateBeneficiaries();
    Settings.populateInfoCards();
  },
  populateBeneficiaries() {
    const container = document.getElementById('settingsBeneficiaries');
    if (!container) return;
    container.innerHTML = (Settings.data.beneficiaries || []).map((b, i) => `
      <div class="bene-row">
        <input type="text" class="form-control" data-bene-name="${i}" value="${b.name}">
        <span class="bene-type">${b.type}</span>
        <button class="btn btn-icon btn-sm" onclick="Settings.removeBeneficiary(${i})" title="Remove">✕</button>
      </div>
    `).join('');
  },
  addBeneficiary() {
    Settings.data.beneficiaries.push({ name: '', type: 'General' });
    Settings.populateBeneficiaries();
  },
  removeBeneficiary(idx) {
    Settings.data.beneficiaries.splice(idx, 1);
    Settings.populateBeneficiaries();
  },
  readFromForm() {
    document.querySelectorAll('[data-settings]').forEach(el => {
      const [section, key] = el.dataset.settings.split('.');
      if (Settings.data[section]) Settings.data[section][key] = el.value;
    });
    document.querySelectorAll('[data-bene-name]').forEach(el => {
      const idx = parseInt(el.dataset.beneName);
      if (Settings.data.beneficiaries[idx]) Settings.data.beneficiaries[idx].name = el.value;
    });
  },
  populateInfoCards() {
    const s = Settings.data;
    const trustInfo = document.getElementById('trustInfoGrid');
    if (trustInfo) {
      trustInfo.innerHTML = `
        <div class="entity-detail"><span class="detail-label">ABN</span><span class="detail-value">${s.trust.abn}</span></div>
        <div class="entity-detail"><span class="detail-label">Trustee</span><span class="detail-value">${s.company.name}</span></div>
        <div class="entity-detail"><span class="detail-label">Settlor</span><span class="detail-value">${s.trust.settlorName}</span></div>
        <div class="entity-detail"><span class="detail-label">Established</span><span class="detail-value">${s.trust.settlementDate}</span></div>
      `;
    }
    const compInfo = document.getElementById('companyInfoGrid');
    if (compInfo) {
      compInfo.innerHTML = `
        <div class="entity-detail"><span class="detail-label">ACN</span><span class="detail-value">${s.company.acn}</span></div>
        <div class="entity-detail"><span class="detail-label">ABN</span><span class="detail-value">${s.company.abn}</span></div>
        <div class="entity-detail"><span class="detail-label">Director</span><span class="detail-value">${s.director.fullName}</span></div>
        <div class="entity-detail"><span class="detail-label">Incorporated</span><span class="detail-value">${s.company.dateIncorporated}</span></div>
      `;
    }
    const opInfo = document.getElementById('operatingInfoGrid');
    if (opInfo) {
      opInfo.innerHTML = `
        <div class="entity-detail"><span class="detail-label">Trust ABN</span><span class="detail-value">${s.trust.abn}</span></div>
        <div class="entity-detail"><span class="detail-label">Company ACN</span><span class="detail-value">${s.company.acn}</span></div>
        <div class="entity-detail"><span class="detail-label">Director</span><span class="detail-value">${s.director.fullName}</span></div>
        <div class="entity-detail"><span class="detail-label">Address</span><span class="detail-value">${s.company.address}</span></div>
      `;
    }
    const beneList = document.getElementById('trustBeneList');
    if (beneList) {
      beneList.innerHTML = (s.beneficiaries || []).map(b => `
        <div style="display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid var(--border);">
          <span style="flex:1; font-size:14px;">${b.name}</span>
          <span class="bene-type">${b.type}</span>
        </div>
      `).join('');
    }
  }
};

// ============================================================
// 10. REGISTER UI
// ============================================================
const RegisterUI = {
  data: {},
  async loadAll() {
    const saved = await DB.get('registers', 'all');
    if (saved) {
      RegisterUI.data = saved.data;
    } else {
      RegisterUI.data = JSON.parse(JSON.stringify(INITIAL_DATA));
      await RegisterUI.saveAll();
    }
  },
  async saveAll() {
    await DB.put('registers', { id: 'all', data: RegisterUI.data });
  },
  getNextId(regName) {
    const schema = REGISTER_SCHEMAS[regName];
    if (!schema) return '001';
    const rows = RegisterUI.data[regName] || [];
    const idField = schema.idField;
    const prefix = schema.prefix;
    let maxNum = 0;
    rows.forEach(r => {
      const val = r[idField] || '';
      const match = val.match(/(\d+)$/);
      if (match) maxNum = Math.max(maxNum, parseInt(match[1]));
    });
    const next = maxNum + 1;
    if (regName.startsWith('trust') && regName !== 'trustDocChecks') {
      const prefixes = { trustAssets: 'A', trustCapital: 'C', trustLoans: 'L', trustInvestments: 'I', trustResolutions: 'TR', trustTransactions: 'T' };
      return (prefixes[regName] || '') + String(next).padStart(3, '0');
    }
    return String(next).padStart(3, '0');
  },
  render(group) {
    if (group === 'company') {
      const active = document.querySelector('#compRegTabs .reg-tab-btn.active');
      if (active) RegisterUI.renderRegister(active.dataset.reg);
    } else {
      const active = document.querySelector('#trustRegTabs .reg-tab-btn.active');
      if (active) RegisterUI.renderRegister(active.dataset.reg);
    }
  },
  renderRegister(regName) {
    const schema = REGISTER_SCHEMAS[regName];
    if (!schema) return;
    const rows = RegisterUI.data[regName] || [];
    const containerId = regName.startsWith('company') ? 'compRegisterContent' : 'trustRegisterContent';
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `<div class="card"><div class="card-header">
      <div class="card-title"><span class="icon">📋</span> ${schema.label}</div>
      <button class="btn btn-secondary btn-sm" onclick="RegisterUI.addRow('${regName}')">+ Add Entry</button>
    </div>`;

    if (rows.length === 0) {
      html += `<p style="color:var(--text-muted); font-size:13px; padding:20px 0; text-align:center;">No entries yet.</p>`;
    } else {
      html += `<div style="overflow-x:auto;"><table class="reg-table"><thead><tr>`;
      schema.columns.forEach(c => { html += `<th style="${c.width ? 'width:'+c.width : ''}">${c.label}</th>`; });
      html += `<th style="width:90px;">Actions</th></tr></thead><tbody>`;
      rows.forEach((row, idx) => {
        html += `<tr>`;
        schema.columns.forEach(c => { html += `<td>${row[c.key] || '—'}</td>`; });
        html += `<td>
          <button class="btn btn-icon btn-sm" onclick="RegisterUI.editRow('${regName}',${idx})" title="Edit">✏️</button>
          <button class="btn btn-icon btn-sm" onclick="RegisterUI.deleteRow('${regName}',${idx})" title="Delete">🗑️</button>
        </td></tr>`;
      });
      html += `</tbody></table></div>`;
    }
    html += `</div>`;
    container.innerHTML = html;
  },
  addRow(regName) {
    const schema = REGISTER_SCHEMAS[regName];
    if (!schema) return;
    const newRow = {};
    schema.columns.forEach(c => { newRow[c.key] = ''; });
    newRow[schema.idField] = RegisterUI.getNextId(regName);
    if (!RegisterUI.data[regName]) RegisterUI.data[regName] = [];
    RegisterUI.data[regName].push(newRow);
    RegisterUI.saveAll();
    RegisterUI.renderRegister(regName);
    RegisterUI.editRow(regName, RegisterUI.data[regName].length - 1);
  },
  editRow(regName, idx) {
    const schema = REGISTER_SCHEMAS[regName];
    const row = RegisterUI.data[regName][idx];
    if (!schema || !row) return;
    document.getElementById('rowEditTitle').textContent = `Edit ${schema.label} Entry`;
    let body = '<div class="form-row">';
    schema.columns.forEach(c => {
      body += `<div class="form-group">
        <label>${c.label}</label>
        <input type="text" class="form-control" data-edit-key="${c.key}" value="${(row[c.key] || '').replace(/"/g, '&quot;')}">
      </div>`;
    });
    body += '</div>';
    document.getElementById('rowEditBody').innerHTML = body;
    document.getElementById('rowEditSaveBtn').onclick = () => {
      document.querySelectorAll('[data-edit-key]').forEach(el => {
        row[el.dataset.editKey] = el.value;
      });
      RegisterUI.saveAll();
      RegisterUI.renderRegister(regName);
      RegisterUI.closeEdit();
      Toast.show('Entry updated', 'success');
    };
    document.getElementById('rowEditModal').classList.add('show');
  },
  closeEdit() { document.getElementById('rowEditModal').classList.remove('show'); },
  deleteRow(regName, idx) {
    Confirm.show('Delete Entry', 'Are you sure you want to delete this register entry? This cannot be undone.', () => {
      RegisterUI.data[regName].splice(idx, 1);
      RegisterUI.saveAll();
      RegisterUI.renderRegister(regName);
      Toast.show('Entry deleted', 'info');
    }, '🗑️');
  },
  async addEntry(regName, entry) {
    if (!RegisterUI.data[regName]) RegisterUI.data[regName] = [];
    RegisterUI.data[regName].push(entry);
    await RegisterUI.saveAll();
  }
};

// ============================================================
// 11. DOCUMENT TEMPLATES
// ============================================================
const Templates = {
  _docStyle() {
    return `
      <style>
        .doc-frame { font-family: Georgia, 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; color: #1a1a1a;
          background: white; padding: 20mm 18mm; max-width: 210mm; margin: 0 auto; }
        .doc-frame h1 { font-size: 16pt; margin: 0 0 2px; letter-spacing: 1px; }
        .doc-frame h2 { font-size: 14pt; margin: 16px 0 8px; }
        .doc-frame h3 { font-size: 12pt; margin: 12px 0 6px; }
        .doc-frame .sub { font-size: 10pt; color: #444; margin: 2px 0; }
        .doc-frame .header-block { border-bottom: 2px solid #1a1a1a; padding-bottom: 12px; margin-bottom: 20px; }
        .doc-frame table { border-collapse: collapse; width: 100%; margin: 10px 0; }
        .doc-frame table th, .doc-frame table td { border: 1px solid #999; padding: 6px 10px; text-align: left; font-size: 11pt; }
        .doc-frame table th { background: #f0f0f0; font-weight: bold; }
        .doc-frame .sig-line { border-top: 1px solid #1a1a1a; width: 250px; margin-top: 50px; padding-top: 5px; }
        .doc-frame .res-box { background: #f8f8f0; border: 1px solid #ccc; padding: 12px 16px; margin: 12px 0; border-radius: 4px; }
        .doc-frame ul { margin: 8px 0; padding-left: 24px; }
        .doc-frame li { margin-bottom: 6px; }
      </style>
    `;
  },
  _letterhead(entity = 'trust') {
    const s = Settings.data;
    if (entity === 'company') {
      return `<div class="header-block">
        <h1>${s.company.name}</h1>
        <div class="sub">ACN ${s.company.acn} | ABN ${s.company.abn}</div>
        <div class="sub">${s.company.address}</div>
      </div>`;
    }
    return `<div class="header-block">
      <h1>${s.company.name}</h1>
      <div class="sub">ACN ${s.company.acn} | ABN ${s.company.abn}</div>
      <div class="sub">As Trustee for the <b>${s.trust.name}</b></div>
      <div class="sub">${s.company.address}</div>
    </div>`;
  },
  _sigBlock(role = 'Director') {
    const s = Settings.data;
    return `<div class="sig-line">
      <b>${s.director.fullName}</b><br>${role}<br>${s.company.name}
    </div>`;
  },

  // -- Meeting Minutes (Trust / ATF) --
  meetingMinutes(data) {
    const s = Settings.data;
    return `<div class="doc-frame">${this._docStyle()}
      ${this._letterhead('trust')}
      <h2 style="text-align:center;">Minutes of Meeting of the Director(s)</h2>
      <table>
        <tr><td style="width:160px;"><b>Date</b></td><td>${data.date || '____/____/________'}</td></tr>
        <tr><td><b>Time</b></td><td>${data.time || '10:00 AM'}</td></tr>
        <tr><td><b>Location</b></td><td>${data.location || s.company.address}</td></tr>
        <tr><td><b>Director(s) Present</b></td><td>${s.director.fullName}</td></tr>
        <tr><td><b>Chairperson</b></td><td>${s.director.fullName}</td></tr>
        <tr><td><b>Quorum</b></td><td>Achieved</td></tr>
      </table>
      <h3>Business</h3>
      <p>${data.business || ''}</p>
      <h3>Resolutions</h3>
      ${(data.resolutions || []).map((r, i) => `<div class="res-box"><b>Resolution ${data.resolutionNos ? data.resolutionNos[i] : (i+1)}:</b> ${r}</div>`).join('')}
      <p style="margin-top:20px;">Meeting closed at: ${data.closeTime || '10:30 AM'}</p>
      <p style="margin-top:10px;">Signed:</p>
      ${this._sigBlock('Director')}
      <p style="margin-top:8px;">Date: ${data.date || '____/____/________'}</p>
    </div>`;
  },

  // -- Trustee Resolution --
  trusteeResolution(data) {
    const s = Settings.data;
    return `<div class="doc-frame">${this._docStyle()}
      ${this._letterhead('trust')}
      <h2 style="text-align:center;">Resolution of the Sole Director</h2>
      <table>
        <tr><td style="width:160px;"><b>Resolution No</b></td><td>${data.resolutionNo || '____'}</td></tr>
        <tr><td><b>Date</b></td><td>${data.date || '____/____/________'}</td></tr>
      </table>
      <p>I, <b>${s.director.fullName}</b>, being the sole director of <b>${s.company.name}</b> (ACN ${s.company.acn}), in my capacity as trustee of the <b>${s.trust.name}</b>, hereby resolve as follows:</p>
      <ul>${(data.points || []).map(p => `<li>${p}</li>`).join('')}</ul>
      <p style="margin-top:20px;">Signed:</p>
      ${this._sigBlock('Sole Director')}
      <p style="margin-top:8px;">Date: ${data.date || '____/____/________'}</p>
    </div>`;
  },

  // -- Declaration of Beneficial Ownership --
  beneficialOwnership(data) {
    const s = Settings.data;
    return `<div class="doc-frame">${this._docStyle()}
      ${this._letterhead('trust')}
      <h2 style="text-align:center;">Declaration of Beneficial Ownership</h2>
      <p>I, <b>${s.director.fullName}</b>, being the sole director of <b>${s.company.name}</b> (ACN ${s.company.acn}), in my capacity as trustee of the <b>${s.trust.name}</b>, hereby declare that:</p>
      <ul>
        <li>The following asset is held by <b>${s.company.name}</b> as trustee of the <b>${s.trust.name}</b> and forms part of the trust property:</li>
      </ul>
      <table>
        <tr><td style="width:160px;"><b>Asset Description</b></td><td>${data.description || ''}</td></tr>
        <tr><td><b>Asset Type</b></td><td>${data.type || ''}</td></tr>
        <tr><td><b>Date Acquired</b></td><td>${data.dateAcquired || ''}</td></tr>
        <tr><td><b>Purchase Price</b></td><td>${data.purchasePrice || ''}</td></tr>
        <tr><td><b>Vendor</b></td><td>${data.vendor || ''}</td></tr>
        <tr><td><b>Asset Register ID</b></td><td>${data.assetId || ''}</td></tr>
      </table>
      <ul>
        <li>The asset is held for the benefit of the beneficiaries of the trust as defined in the trust deed.</li>
        <li>The trustee company has no personal beneficial interest in this asset.</li>
        <li>This declaration is made for the purposes of confirming trust ownership and for inclusion in the trust records.</li>
      </ul>
      <p style="margin-top:20px;">Signed:</p>
      ${this._sigBlock('Director')}
      <p style="margin-top:8px;">Date: ${data.dateAcquired || '____/____/________'}</p>
    </div>`;
  },

  // -- Capital Contribution Resolution --
  capitalContributionResolution(data) {
    return this.trusteeResolution({
      resolutionNo: data.resolutionNo,
      date: data.date,
      points: [
        `The Trustee acknowledges receipt of a capital contribution in the amount of <b>${data.amount}</b> from <b>${data.contributor}</b>.`,
        'The contribution is accepted as trust capital and forms part of the trust corpus.',
        'The Trustee directs that the capital contribution be recorded in the Capital Register and the General Ledger under the appropriate equity account.',
        'The Trustee confirms that this contribution is not income and does not constitute a loan.',
        'The Trustee authorises the updating of all trust records to reflect this contribution.'
      ]
    });
  },

  // -- Trustee Receipt Form --
  trusteeReceipt(data) {
    const s = Settings.data;
    return `<div class="doc-frame">${this._docStyle()}
      ${this._letterhead('trust')}
      <h2 style="text-align:center;">Trustee Receipt Form</h2>
      <table>
        <tr><td style="width:160px;"><b>Date Received</b></td><td>${data.date || ''}</td></tr>
        <tr><td><b>Received From</b></td><td>${data.contributor || ''}</td></tr>
        <tr><td><b>Amount</b></td><td>${data.amount || ''}</td></tr>
        <tr><td><b>Description</b></td><td>${data.description || 'Capital Contribution'}</td></tr>
      </table>
      <p>The trustee hereby acknowledges receipt of the above funds, which have been deposited into the trust's bank account titled <b>${s.company.name} ATF ${s.trust.name}</b> and are held as trust capital.</p>
      <p style="margin-top:20px;">Signed:</p>
      ${this._sigBlock('Director')}
      <p style="margin-top:8px;">Date: ${data.date || '____/____/________'}</p>
    </div>`;
  },

  // -- Acknowledgement Letter --
  capitalAcknowledgement(data) {
    const s = Settings.data;
    return `<div class="doc-frame">${this._docStyle()}
      ${this._letterhead('trust')}
      <p><b>Date:</b> ${data.date || ''}</p>
      <p><b>To:</b> ${data.contributor || ''}<br>${s.company.address}</p>
      <p><b>Subject:</b> Acknowledgement of Capital Contribution to the ${s.trust.name}</p>
      <p>Dear ${(data.contributor || '').split(' ')[0]},</p>
      <p>We confirm receipt of your capital contribution of <b>${data.amount}</b> made on ${data.date} to the <b>${s.trust.name}</b>.</p>
      <p>The funds were deposited into the trust's bank account titled <b>${s.company.name} ATF ${s.trust.name}</b>.</p>
      <p>This contribution has been accepted by the trustee as trust capital in accordance with the resolution dated ${data.date} and will be held as part of the trust corpus under the terms of the trust deed.</p>
      <p>The trustee acknowledges that:</p>
      <ul>
        <li>The funds are not repayable to you except as permitted by the trust deed.</li>
        <li>The contribution does not constitute income or a loan.</li>
        <li>The funds will be managed solely for the benefit of the beneficiaries of the trust.</li>
      </ul>
      <p>Yours faithfully,</p>
      ${this._sigBlock('Director')}
    </div>`;
  },

  // -- Vehicle Acquisition Resolution --
  vehicleResolution(data) {
    return this.trusteeResolution({
      resolutionNo: data.resolutionNo,
      date: data.date,
      points: [
        `The Trustee is authorised to acquire the following motor vehicle on behalf of the ${Settings.data.trust.name}:`,
        `<b>Make:</b> ${data.make || '[To be confirmed]'} | <b>Model:</b> ${data.model || '[TBC]'} | <b>Year:</b> ${data.year || '[TBC]'}`,
        `<b>VIN:</b> ${data.vin || '[TBC]'} | <b>Registration:</b> ${data.rego || '[TBC]'}`,
        `<b>Purchase Price:</b> ${data.purchasePrice || '[TBC]'} | <b>Seller:</b> ${data.seller || '[TBC]'}`,
        'The vehicle shall be registered in the name of the trustee company as trustee for the trust.',
        'The purchase price shall be paid from trust funds.',
        'The vehicle shall be recorded in the Trust Asset Register.',
        'A Declaration of Beneficial Ownership shall be executed.'
      ]
    });
  },

  // -- Property Acquisition Resolution --
  propertyResolution(data) {
    return this.trusteeResolution({
      resolutionNo: data.resolutionNo,
      date: data.date,
      points: [
        `The Trustee is authorised to acquire the following real property on behalf of the ${Settings.data.trust.name}:`,
        `<b>Property Address:</b> ${data.propertyAddress || '[TBC]'}`,
        `<b>Title Reference:</b> ${data.titleRef || '[TBC]'}`,
        `<b>Purchase Price:</b> ${data.purchasePrice || '[TBC]'} | <b>Settlement Date:</b> ${data.settlementDate || '[TBC]'}`,
        `<b>Vendor:</b> ${data.vendor || '[TBC]'}`,
        'The property shall be registered in the name of the trustee company as trustee for the trust.',
        'The purchase price and associated costs shall be paid from trust funds.',
        'The property shall be recorded in the Trust Asset Register.',
        'A Declaration of Beneficial Ownership shall be executed.',
        'The Trustee shall engage solicitors to complete the conveyancing on behalf of the trust.'
      ]
    });
  },

  // -- Bank Account Letter --
  bankLetterTrust(data) {
    const s = Settings.data;
    return `<div class="doc-frame">${this._docStyle()}
      ${this._letterhead('trust')}
      <p><b>Date:</b> ${data.date || ''}</p>
      <p><b>To:</b> The Branch Manager<br>${data.bankName || '[Bank Name]'}<br>${data.branch || '[Branch]'}</p>
      <p><b>Subject:</b> Request to Open a Trust Bank Account — ${s.company.name} ATF ${s.trust.name}</p>
      <p>Dear Sir/Madam,</p>
      <p>I write on behalf of <b>${s.company.name}</b> (ACN ${s.company.acn}), in its capacity as trustee of the <b>${s.trust.name}</b>, to request the opening of a trust bank account.</p>
      <table>
        <tr><td><b>Trust Name</b></td><td>${s.trust.name}</td></tr>
        <tr><td><b>Trustee Company</b></td><td>${s.company.name}</td></tr>
        <tr><td><b>ACN</b></td><td>${s.company.acn}</td></tr>
        <tr><td><b>ABN</b></td><td>${s.trust.abn}</td></tr>
        <tr><td><b>Director</b></td><td>${s.director.fullName}</td></tr>
        <tr><td><b>Account Name</b></td><td>${s.company.name} ATF ${s.trust.name}</td></tr>
        <tr><td><b>Initial Deposit</b></td><td>${data.initialDeposit || '$10.00'}</td></tr>
      </table>
      <p>This account will be used exclusively for trust funds.</p>
      <p>Yours faithfully,</p>
      ${this._sigBlock('Director, ' + s.company.name + '\\nAs Trustee for the ' + s.trust.name)}
      <p style="font-size:10pt; margin-top:12px;">Email: ${s.director.email}<br>Phone: ${s.director.phone}</p>
    </div>`;
  },

  // -- General Resolution --
  generalResolution(data) {
    return this.trusteeResolution({
      resolutionNo: data.resolutionNo,
      date: data.date,
      points: data.points || ['[Resolution text]']
    });
  },

  // -- Accountant Confirmation Letter --
  accountantConfirmation(data) {
    const s = Settings.data;
    return `<div class="doc-frame">${this._docStyle()}
      ${this._letterhead('trust')}
      <p><b>Date:</b> ${data.date || '____/____/________'}</p>
      <p><b>To:</b> ${data.contributor || ''}<br>Attention: Your Accountant / Tax Adviser</p>
      <p><b>Subject:</b> Capital Contribution Confirmation — ${s.trust.name}</p>
      <p>Dear Sir/Madam,</p>
      <p>We write to confirm that a capital contribution has been made to the <b>${s.trust.name}</b> as follows:</p>
      <table>
        <tr><td style="width:200px;"><b>Contributor</b></td><td>${data.contributor || ''}</td></tr>
        <tr><td><b>Amount</b></td><td>${data.amount || ''}</td></tr>
        <tr><td><b>Date Received</b></td><td>${data.date || ''}</td></tr>
        <tr><td><b>Nature</b></td><td>Capital contribution — NOT income, NOT a loan</td></tr>
        <tr><td><b>Capital Register No</b></td><td>${data.capitalNo || ''}</td></tr>
      </table>
      <p>For taxation and accounting purposes:</p>
      <ul>
        <li>This amount is recorded as trust capital (corpus) and does not form part of the trust's income.</li>
        <li>No tax is payable by the trust on receipt of this amount.</li>
        <li>The contribution does not alter the beneficial entitlements of beneficiaries unless the trustee exercises its discretion.</li>
      </ul>
      <p>Please update your records accordingly.</p>
      <p>Yours faithfully,</p>
      ${this._sigBlock('Director')}
    </div>`;
  },

  // -- Annual Distribution --
  annualDistribution(data) {
    const s = Settings.data;
    let rows = (data.distributions || []).map(d => `<tr><td>${d.name}</td><td>${d.percentage}</td><td>${d.amount}</td></tr>`).join('');
    return `<div class="doc-frame">${this._docStyle()}
      ${this._letterhead('trust')}
      <h2 style="text-align:center;">Annual Distribution Minute</h2>
      <p><b>Date:</b> ${data.date || '____/____/________'} (MUST be before 30 June)</p>
      <p>The trustee, <b>${s.company.name}</b>, resolves:</p>
      <p>That the net income of the trust for the financial year ending 30 June ${data.fy || '____'} be distributed as follows:</p>
      <table><thead><tr><th>Beneficiary</th><th>Percentage</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table>
      <p style="margin-top:20px;">Signed:</p>
      ${this._sigBlock('Director')}
      <p style="margin-top:8px;">Date: ${data.date || '____/____/________'}</p>
    </div>`;
  },

  // -- Trust Distribution Strategy Worksheet --
  distributionWorksheet(data) {
    const s = Settings.data;
    let rows = (data.distributions || []).map(d =>
      `<tr><td>${d.name}</td><td style="text-align:center;">${d.percentage}</td><td style="text-align:right;">${d.amount}</td><td style="text-align:center;">Discretionary</td><td></td></tr>`
    ).join('');
    return `<div class="doc-frame">${this._docStyle()}
      ${this._letterhead('trust')}
      <h2 style="text-align:center;">Trust Distribution Strategy Worksheet</h2>
      <h3>Financial Year Ending 30 June ${data.fy || '____'}</h3>
      <table>
        <tr><td style="width:200px;"><b>Date of Resolution</b></td><td>${data.date || ''}</td></tr>
        <tr><td><b>Resolution No</b></td><td>${data.resolutionNo || ''}</td></tr>
        <tr><td><b>Trust</b></td><td>${s.trust.name}</td></tr>
        <tr><td><b>Trustee</b></td><td>${s.company.name}</td></tr>
        <tr><td><b>ABN</b></td><td>${s.trust.abn}</td></tr>
      </table>
      <h3>Distribution Schedule</h3>
      <table>
        <thead><tr><th>Beneficiary</th><th>%</th><th>Amount ($)</th><th>Type</th><th>Notes</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <h3>Trustee's Notes</h3>
      <ul>
        <li>This resolution MUST be made and signed before 30 June in the relevant financial year.</li>
        <li>A copy of this worksheet must be provided to each beneficiary's accountant.</li>
        <li>The distribution will be reflected in each beneficiary's income tax return.</li>
        <li>Retain this document with the Trust Deed and other trust records.</li>
      </ul>
      <p style="margin-top:20px;">Signed:</p>
      ${this._sigBlock('Director')}
      <p style="margin-top:8px;">Date: ${data.date || '____/____/________'}</p>
    </div>`;
  },

  // -- Company Director Resolution --
  companyDirectorResolution(data) {
    const s = Settings.data;
    return `<div class="doc-frame">${this._docStyle()}
      ${this._letterhead('company')}
      <h2 style="text-align:center;">Resolution of the Sole Director</h2>
      <p><b>Date:</b> ${data.date || '____/____/________'}</p>
      <p>I, the sole director of <b>${s.company.name}</b>, resolve:</p>
      <ul>${(data.points || []).map(p => `<li>${p}</li>`).join('')}</ul>
      <p style="margin-top:20px;">Signed:</p>
      ${this._sigBlock('Sole Director')}
      <p style="margin-top:8px;">Date: ${data.date || '____/____/________'}</p>
    </div>`;
  },

  // -- Loan Agreement Outline --
  loanAgreement(data) {
    const s = Settings.data;
    return `<div class="doc-frame">${this._docStyle()}
      ${this._letterhead('trust')}
      <h2 style="text-align:center;">Loan Agreement — Outline</h2>
      <p style="text-align:center; font-size:10pt; color:#888;">This document outlines the terms of the loan for record-keeping purposes. A formal loan agreement may be required for amounts above $10,000.</p>
      <table>
        <tr><td style="width:200px;"><b>Date</b></td><td>${data.date || ''}</td></tr>
        <tr><td><b>Loan Reference</b></td><td>${data.loanNo || ''}</td></tr>
        <tr><td><b>Direction</b></td><td>Loan ${data.direction || ''} the Trust</td></tr>
        <tr><td><b>Trustee (Party A)</b></td><td>${s.company.name} ATF ${s.trust.name}</td></tr>
        <tr><td><b>${data.direction === 'To' ? 'Lender (Party B)' : 'Borrower (Party B)'}</b></td><td>${data.party || ''}</td></tr>
        <tr><td><b>Principal Amount</b></td><td>${data.amount || ''}</td></tr>
        <tr><td><b>Interest Rate</b></td><td>${data.rate || 'Interest-free'}</td></tr>
        <tr><td><b>Term</b></td><td>${data.term || 'On demand'}</td></tr>
        <tr><td><b>Status</b></td><td>Active</td></tr>
      </table>
      <h3>Terms</h3>
      <ol>
        <li>The ${data.direction === 'To' ? 'lender' : 'borrower'} agrees to ${data.direction === 'To' ? 'lend' : 'repay'} the principal amount of ${data.amount} to the ${data.direction === 'To' ? 'trust' : data.party || '[Party]'}.</li>
        <li>Interest ${data.rate && data.rate !== '0%' ? `accrues at ${data.rate} per annum` : 'is waived for the term of this agreement'}.</li>
        <li>The loan is repayable ${data.term === 'On demand' ? 'on demand in writing' : `within ${data.term}`}.</li>
        <li>This agreement is governed by the laws of South Australia.</li>
      </ol>
      <p style="margin-top:30px;">Signed by the Trustee:</p>
      ${this._sigBlock('Director, ' + s.company.name)}
      <p style="margin-top:20px;">Signed by ${data.party || 'Other Party'}:</p>
      <div class="sig-line" style="border-top:1px solid #333; width:250px; margin-top:50px; padding-top:5px;">
        <b>${data.party || ''}</b><br>Date: ${data.date || ''}
      </div>
    </div>`;
  },

  // -- Appointor Letter --
  appointorLetter(data) {
    const s = Settings.data;
    return `<div class="doc-frame">${this._docStyle()}
      <div class="header-block">
        <h1>${s.trust.name}</h1>
        <div class="sub">Appointor: ${s.director.fullName}</div>
        <div class="sub">${s.company.address}</div>
      </div>
      <p><b>Date:</b> ${data.date || '____/____/________'}</p>
      <p><b>To:</b> ${s.company.name}<br>ACN ${s.company.acn}<br>As Trustee for the ${s.trust.name}<br>${s.company.address}</p>
      <p><b>Subject:</b> ${data.title || '[Subject]'}</p>
      <p>Dear Trustee,</p>
      <p>I, <b>${s.director.fullName}</b>, in my capacity as Appointor of the <b>${s.trust.name}</b>, write to provide the following instructions:</p>
      <div class="res-box">${data.instructions || '[Instructions]'}</div>
      <p>Please acknowledge receipt of this letter and take the necessary action in accordance with the trust deed.</p>
      <p>Yours faithfully,</p>
      ${data.signatureImg ? `<img src="${data.signatureImg}" style="max-height:80px; margin:10px 0;">` : ''}
      <div class="sig-line">
        <b>${s.director.fullName}</b><br>Appointor, ${s.trust.name}
      </div>
    </div>`;
  }
};

// ============================================================
// 12. ACTION FORMS
// ============================================================
const Actions = {
  currentAction: null,
  populateMenu() {
    const menu = document.getElementById('actionMenu');
    if (!menu) return;
    menu.innerHTML = ACTION_TYPES.map(a => `
      <button class="action-card" onclick="Actions.select('${a.id}')">
        <span class="action-icon">${a.icon}</span>
        <span class="action-label">${a.label}</span>
        <span class="action-desc">${a.desc}</span>
      </button>
    `).join('');
  },
  select(actionId) {
    Actions.currentAction = actionId;
    const area = document.getElementById('actionFormArea');
    area.classList.remove('hidden');
    area.innerHTML = Actions.getForm(actionId);
    area.scrollIntoView({ behavior: 'smooth' });
  },
  getForm(actionId) {
    const today = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const forms = {
      capitalContribution: `
        <div class="card">
          <div class="card-header"><div class="card-title">💰 Capital Contribution</div></div>
          <div class="form-row">
            <div class="form-group"><label>Date</label><input type="text" class="form-control" id="af_date" value="${today}"></div>
            <div class="form-group"><label>Contributor Name</label><input type="text" class="form-control" id="af_contributor" value="${Settings.data.director.fullName}"></div>
            <div class="form-group"><label>Amount</label><input type="text" class="form-control" id="af_amount" placeholder="$0.00"></div>
            <div class="form-group"><label>Description</label><input type="text" class="form-control" id="af_description" value="Capital Contribution"></div>
          </div>
          <button class="btn btn-primary btn-lg" onclick="Actions.generate()">Generate Documents</button>
        </div>`,
      assetVehicle: `
        <div class="card">
          <div class="card-header"><div class="card-title">🚗 Vehicle Acquisition</div></div>
          <div class="form-row">
            <div class="form-group"><label>Date</label><input type="text" class="form-control" id="af_date" value="${today}"></div>
            <div class="form-group"><label>Make</label><input type="text" class="form-control" id="af_make" placeholder="e.g. Toyota"></div>
            <div class="form-group"><label>Model</label><input type="text" class="form-control" id="af_model" placeholder="e.g. Hilux"></div>
            <div class="form-group"><label>Year</label><input type="text" class="form-control" id="af_year"></div>
            <div class="form-group"><label>VIN</label><input type="text" class="form-control" id="af_vin"></div>
            <div class="form-group"><label>Registration</label><input type="text" class="form-control" id="af_rego"></div>
            <div class="form-group"><label>Purchase Price</label><input type="text" class="form-control" id="af_price" placeholder="$0.00"></div>
            <div class="form-group"><label>Seller Name / ABN</label><input type="text" class="form-control" id="af_seller"></div>
          </div>
          <button class="btn btn-primary btn-lg" onclick="Actions.generate()">Generate Documents</button>
        </div>`,
      assetProperty: `
        <div class="card">
          <div class="card-header"><div class="card-title">🏠 Property Acquisition</div></div>
          <div class="form-row">
            <div class="form-group"><label>Date</label><input type="text" class="form-control" id="af_date" value="${today}"></div>
            <div class="form-group"><label>Property Address</label><input type="text" class="form-control" id="af_address"></div>
            <div class="form-group"><label>Title Reference</label><input type="text" class="form-control" id="af_titleRef"></div>
            <div class="form-group"><label>Purchase Price</label><input type="text" class="form-control" id="af_price" placeholder="$0.00"></div>
            <div class="form-group"><label>Settlement Date</label><input type="text" class="form-control" id="af_settlementDate"></div>
            <div class="form-group"><label>Vendor Name</label><input type="text" class="form-control" id="af_vendor"></div>
            <div class="form-group"><label>Solicitor</label><input type="text" class="form-control" id="af_solicitor"></div>
          </div>
          <button class="btn btn-primary btn-lg" onclick="Actions.generate()">Generate Documents</button>
        </div>`,
      assetGeneral: `
        <div class="card">
          <div class="card-header"><div class="card-title">📦 General Asset Acquisition</div></div>
          <div class="form-row">
            <div class="form-group"><label>Date</label><input type="text" class="form-control" id="af_date" value="${today}"></div>
            <div class="form-group"><label>Description</label><input type="text" class="form-control" id="af_description"></div>
            <div class="form-group"><label>Purchase Price</label><input type="text" class="form-control" id="af_price" placeholder="$0.00"></div>
            <div class="form-group"><label>Seller</label><input type="text" class="form-control" id="af_seller"></div>
            <div class="form-group"><label>Category</label><input type="text" class="form-control" id="af_category" placeholder="e.g. Equipment, Furniture"></div>
          </div>
          <button class="btn btn-primary btn-lg" onclick="Actions.generate()">Generate Documents</button>
        </div>`,
      annualDistribution: `
        <div class="card">
          <div class="card-header"><div class="card-title">📊 Annual Distribution</div></div>
          <div class="form-row">
            <div class="form-group"><label>Date (before 30 June)</label><input type="text" class="form-control" id="af_date" value="${today}"></div>
            <div class="form-group"><label>Financial Year Ending</label><input type="text" class="form-control" id="af_fy" placeholder="e.g. 2026"></div>
          </div>
          <div id="distributionRows">
            ${(Settings.data.beneficiaries || []).map((b, i) => `
              <div class="distrib-row">
                <input type="text" class="form-control name-field" data-dist-name="${i}" value="${b.name}" readonly>
                <input type="text" class="form-control pct-field" data-dist-pct="${i}" placeholder="%" value="">
                <input type="text" class="form-control amt-field" data-dist-amt="${i}" placeholder="$" value="">
              </div>
            `).join('')}
          </div>
          <button class="btn btn-primary btn-lg" onclick="Actions.generate()">Generate Documents</button>
        </div>`,
      bankAccount: `
        <div class="card">
          <div class="card-header"><div class="card-title">🏦 Bank Account Opening</div></div>
          <div class="form-row">
            <div class="form-group"><label>Date</label><input type="text" class="form-control" id="af_date" value="${today}"></div>
            <div class="form-group"><label>Bank Name</label><input type="text" class="form-control" id="af_bankName"></div>
            <div class="form-group"><label>Branch</label><input type="text" class="form-control" id="af_branch"></div>
            <div class="form-group"><label>Initial Deposit</label><input type="text" class="form-control" id="af_deposit" value="$10.00"></div>
          </div>
          <button class="btn btn-primary btn-lg" onclick="Actions.generate()">Generate Documents</button>
        </div>`,
      loan: `
        <div class="card">
          <div class="card-header"><div class="card-title">🤝 Loan To/From Trust</div></div>
          <div class="form-row">
            <div class="form-group"><label>Date</label><input type="text" class="form-control" id="af_date" value="${today}"></div>
            <div class="form-group"><label>Direction</label>
              <select class="form-control" id="af_direction"><option value="To">To Trust</option><option value="From">From Trust</option></select>
            </div>
            <div class="form-group"><label>Party Name</label><input type="text" class="form-control" id="af_party"></div>
            <div class="form-group"><label>Amount</label><input type="text" class="form-control" id="af_amount" placeholder="$0.00"></div>
            <div class="form-group"><label>Interest Rate</label><input type="text" class="form-control" id="af_rate" placeholder="e.g. 0% or 5%"></div>
            <div class="form-group"><label>Term</label><input type="text" class="form-control" id="af_term" placeholder="e.g. On demand, 12 months"></div>
          </div>
          <button class="btn btn-primary btn-lg" onclick="Actions.generate()">Generate Documents</button>
        </div>`,
      generalResolution: `
        <div class="card">
          <div class="card-header"><div class="card-title">📋 General Resolution</div></div>
          <div class="form-row">
            <div class="form-group"><label>Date</label><input type="text" class="form-control" id="af_date" value="${today}"></div>
            <div class="form-group"><label>Resolution Title</label><input type="text" class="form-control" id="af_title"></div>
          </div>
          <div class="form-group">
            <label>Resolution Text</label>
            <textarea class="form-control" id="af_text" rows="5" placeholder="Enter the full resolution text..."></textarea>
          </div>
          <button class="btn btn-primary btn-lg" onclick="Actions.generate()">Generate Documents</button>
        </div>`
    };
    return forms[actionId] || '<p>Action not implemented yet.</p>';
  },

  async generate() {
    const action = Actions.currentAction;
    if (!action) return;
    Loading.show();
    try {
      const docs = [];
      const regUpdates = [];
      const date = (document.getElementById('af_date') || {}).value || '';
      const resNo = RegisterUI.getNextId('trustResolutions');
      const s = Settings.data;

      switch (action) {
        case 'capitalContribution': {
          const contributor = document.getElementById('af_contributor').value;
          const amount = document.getElementById('af_amount').value;
          const desc = document.getElementById('af_description').value;
          const capitalNo = RegisterUI.getNextId('trustCapital');
          const transNo = RegisterUI.getNextId('trustTransactions');
          docs.push({ name: `Minutes_${resNo}`, html: Templates.meetingMinutes({ date, business: `Capital contribution of ${amount} from ${contributor}.`, resolutions: [`Acceptance of capital contribution — ${amount} from ${contributor}`], resolutionNos: [resNo] }) });
          docs.push({ name: `Resolution_${resNo}`, html: Templates.capitalContributionResolution({ resolutionNo: resNo, date, amount, contributor }) });
          docs.push({ name: `Receipt_${capitalNo}`, html: Templates.trusteeReceipt({ date, contributor, amount, description: desc }) });
          docs.push({ name: `Acknowledgement_${capitalNo}`, html: Templates.capitalAcknowledgement({ date, contributor, amount }) });
          docs.push({ name: `AccountantConfirm_${capitalNo}`, html: Templates.accountantConfirmation({ date, contributor, amount, capitalNo }) });
          regUpdates.push({ reg: 'trustCapital', entry: { entryNo: capitalNo, date, contributor, amount, type: desc, notes: '' } });
          regUpdates.push({ reg: 'trustResolutions', entry: { resolutionNo: resNo, date, description: `Capital Contribution — ${amount} from ${contributor}`, meetingRef: `Minutes_${resNo}`, signedBy: s.director.fullName, filed: 'Yes' } });
          regUpdates.push({ reg: 'trustTransactions', entry: { transId: transNo, date, type: 'Capital', description: `Capital contribution from ${contributor}`, debit: '', credit: amount, balance: '', relatedRef: capitalNo, notes: '' } });
          break;
        }
        case 'assetVehicle': {
          const make = document.getElementById('af_make').value;
          const model = document.getElementById('af_model').value;
          const year = document.getElementById('af_year').value;
          const vin = document.getElementById('af_vin').value;
          const rego = document.getElementById('af_rego').value;
          const price = document.getElementById('af_price').value;
          const seller = document.getElementById('af_seller').value;
          const assetNo = RegisterUI.getNextId('trustAssets');
          const transNo = RegisterUI.getNextId('trustTransactions');
          const desc = `${year} ${make} ${model}`.trim() || 'Motor Vehicle';
          docs.push({ name: `Minutes_${resNo}`, html: Templates.meetingMinutes({ date, business: `Acquisition of motor vehicle: ${desc}`, resolutions: [`Authorise acquisition of ${desc} for ${price || '[TBC]'}`], resolutionNos: [resNo] }) });
          docs.push({ name: `Resolution_${resNo}`, html: Templates.vehicleResolution({ resolutionNo: resNo, date, make, model, year, vin, rego, purchasePrice: price, seller }) });
          docs.push({ name: `Declaration_${assetNo}`, html: Templates.beneficialOwnership({ description: desc + (vin ? ` (VIN: ${vin})` : ''), type: 'Vehicle', dateAcquired: date, purchasePrice: price, vendor: seller, assetId: assetNo }) });
          regUpdates.push({ reg: 'trustAssets', entry: { assetId: assetNo, type: 'Vehicle', description: desc + (vin ? ` VIN:${vin}` : '') + (rego ? ` Rego:${rego}` : ''), dateAcquired: date, purchasePrice: price, vendor: seller, currentValue: price, disposalDate: '', disposalPrice: '', notes: '' } });
          regUpdates.push({ reg: 'trustResolutions', entry: { resolutionNo: resNo, date, description: `Vehicle Acquisition — ${desc}`, meetingRef: `Minutes_${resNo}`, signedBy: s.director.fullName, filed: 'Yes' } });
          if (price) regUpdates.push({ reg: 'trustTransactions', entry: { transId: transNo, date, type: 'Asset Purchase', description: `Vehicle: ${desc}`, debit: price, credit: '', balance: '', relatedRef: assetNo, notes: '' } });
          break;
        }
        case 'assetProperty': {
          const addr = document.getElementById('af_address').value;
          const titleRef = document.getElementById('af_titleRef').value;
          const price = document.getElementById('af_price').value;
          const settlDate = document.getElementById('af_settlementDate').value;
          const vendor = document.getElementById('af_vendor').value;
          const assetNo = RegisterUI.getNextId('trustAssets');
          const transNo = RegisterUI.getNextId('trustTransactions');
          docs.push({ name: `Minutes_${resNo}`, html: Templates.meetingMinutes({ date, business: `Acquisition of property: ${addr}`, resolutions: [`Authorise acquisition of ${addr} for ${price || '[TBC]'}`], resolutionNos: [resNo] }) });
          docs.push({ name: `Resolution_${resNo}`, html: Templates.propertyResolution({ resolutionNo: resNo, date, propertyAddress: addr, titleRef, purchasePrice: price, settlementDate: settlDate, vendor }) });
          docs.push({ name: `Declaration_${assetNo}`, html: Templates.beneficialOwnership({ description: addr, type: 'Property', dateAcquired: date, purchasePrice: price, vendor, assetId: assetNo }) });
          regUpdates.push({ reg: 'trustAssets', entry: { assetId: assetNo, type: 'Property', description: addr + (titleRef ? ` (Title: ${titleRef})` : ''), dateAcquired: date, purchasePrice: price, vendor, currentValue: price, disposalDate: '', disposalPrice: '', notes: '' } });
          regUpdates.push({ reg: 'trustResolutions', entry: { resolutionNo: resNo, date, description: `Property Acquisition — ${addr}`, meetingRef: `Minutes_${resNo}`, signedBy: s.director.fullName, filed: 'Yes' } });
          if (price) regUpdates.push({ reg: 'trustTransactions', entry: { transId: transNo, date, type: 'Asset Purchase', description: `Property: ${addr}`, debit: price, credit: '', balance: '', relatedRef: assetNo, notes: '' } });
          break;
        }
        case 'assetGeneral': {
          const desc = document.getElementById('af_description').value;
          const price = document.getElementById('af_price').value;
          const seller = document.getElementById('af_seller').value;
          const assetNo = RegisterUI.getNextId('trustAssets');
          const transNo = RegisterUI.getNextId('trustTransactions');
          docs.push({ name: `Minutes_${resNo}`, html: Templates.meetingMinutes({ date, business: `Acquisition of asset: ${desc}`, resolutions: [`Authorise acquisition of ${desc} for ${price || '[TBC]'}`], resolutionNos: [resNo] }) });
          docs.push({ name: `Resolution_${resNo}`, html: Templates.trusteeResolution({ resolutionNo: resNo, date, points: [`The Trustee is authorised to acquire: <b>${desc}</b>`, `Purchase Price: ${price || '[TBC]'}`, `Seller: ${seller || '[TBC]'}`, 'The asset shall be recorded in the Trust Asset Register.', 'A Declaration of Beneficial Ownership shall be executed.'] }) });
          docs.push({ name: `Declaration_${assetNo}`, html: Templates.beneficialOwnership({ description: desc, type: 'General', dateAcquired: date, purchasePrice: price, vendor: seller, assetId: assetNo }) });
          regUpdates.push({ reg: 'trustAssets', entry: { assetId: assetNo, type: 'General', description: desc, dateAcquired: date, purchasePrice: price, vendor: seller, currentValue: price, disposalDate: '', disposalPrice: '', notes: '' } });
          regUpdates.push({ reg: 'trustResolutions', entry: { resolutionNo: resNo, date, description: `Asset Acquisition — ${desc}`, meetingRef: `Minutes_${resNo}`, signedBy: s.director.fullName, filed: 'Yes' } });
          if (price) regUpdates.push({ reg: 'trustTransactions', entry: { transId: transNo, date, type: 'Asset Purchase', description: desc, debit: price, credit: '', balance: '', relatedRef: assetNo, notes: '' } });
          break;
        }
        case 'annualDistribution': {
          const fy = document.getElementById('af_fy').value;
          const distributions = [];
          document.querySelectorAll('[data-dist-name]').forEach((el, i) => {
            const name = el.value;
            const pct = document.querySelector(`[data-dist-pct="${i}"]`).value;
            const amt = document.querySelector(`[data-dist-amt="${i}"]`).value;
            if (name && (pct || amt)) distributions.push({ name, percentage: pct, amount: amt });
          });
          docs.push({ name: `Minutes_${resNo}`, html: Templates.meetingMinutes({ date, business: `Annual distribution of trust income for FY${fy}`, resolutions: [`Distribute trust income for FY${fy} to beneficiaries as per the distribution minute`], resolutionNos: [resNo] }) });
          docs.push({ name: `Distribution_FY${fy}`, html: Templates.annualDistribution({ date, fy, distributions, resolutionNo: resNo }) });
          docs.push({ name: `DistribWorksheet_FY${fy}`, html: Templates.distributionWorksheet({ date, fy, distributions, resolutionNo: resNo }) });
          regUpdates.push({ reg: 'trustResolutions', entry: { resolutionNo: resNo, date, description: `Annual Distribution — FY${fy}`, meetingRef: `Minutes_${resNo}`, signedBy: s.director.fullName, filed: 'Yes' } });
          distributions.forEach(d => {
            const tNo = RegisterUI.getNextId('trustTransactions');
            regUpdates.push({ reg: 'trustTransactions', entry: { transId: tNo, date, type: 'Distribution', description: `FY${fy} distribution to ${d.name}`, debit: d.amount, credit: '', balance: '', relatedRef: resNo, notes: `${d.percentage}` } });
          });
          break;
        }
        case 'bankAccount': {
          const bankName = document.getElementById('af_bankName').value;
          const branch = document.getElementById('af_branch').value;
          const deposit = document.getElementById('af_deposit').value;
          docs.push({ name: `Minutes_${resNo}`, html: Templates.meetingMinutes({ date, business: `Opening of trust bank account with ${bankName}`, resolutions: [`Authorise opening of trust bank account with ${bankName}`], resolutionNos: [resNo] }) });
          docs.push({ name: `Resolution_${resNo}`, html: Templates.trusteeResolution({ resolutionNo: resNo, date, points: [`The Trustee is authorised to open a bank account with ${bankName} (${branch}) in the name of ${s.company.name} ATF ${s.trust.name}.`, `Initial deposit: ${deposit}`, `Sole signatory: ${s.director.fullName}, Director.`] }) });
          docs.push({ name: `BankLetter_${resNo}`, html: Templates.bankLetterTrust({ date, bankName, branch, initialDeposit: deposit }) });
          regUpdates.push({ reg: 'trustResolutions', entry: { resolutionNo: resNo, date, description: `Banking Authority — ${bankName}`, meetingRef: `Minutes_${resNo}`, signedBy: s.director.fullName, filed: 'Yes' } });
          break;
        }
        case 'loan': {
          const direction = document.getElementById('af_direction').value;
          const party = document.getElementById('af_party').value;
          const amount = document.getElementById('af_amount').value;
          const rate = document.getElementById('af_rate').value;
          const term = document.getElementById('af_term').value;
          const loanNo = RegisterUI.getNextId('trustLoans');
          const transNo = RegisterUI.getNextId('trustTransactions');
          docs.push({ name: `Minutes_${resNo}`, html: Templates.meetingMinutes({ date, business: `Loan ${direction.toLowerCase()} trust — ${amount} ${direction === 'To' ? 'from' : 'to'} ${party}`, resolutions: [`Authorise loan of ${amount} ${direction.toLowerCase()} the trust ${direction === 'To' ? 'from' : 'to'} ${party}`], resolutionNos: [resNo] }) });
          docs.push({ name: `Resolution_${resNo}`, html: Templates.trusteeResolution({ resolutionNo: resNo, date, points: [`The Trustee is authorised to ${direction === 'To' ? 'accept a loan' : 'make a loan'} of ${amount} ${direction === 'To' ? 'from' : 'to'} ${party}.`, `Interest Rate: ${rate || 'Interest-free'}`, `Term: ${term || 'On demand'}`, 'The loan shall be recorded in the Trust Loan Register.'] }) });
          docs.push({ name: `LoanAgreement_${loanNo}`, html: Templates.loanAgreement({ date, loanNo, direction, party, amount, rate, term }) });
          regUpdates.push({ reg: 'trustLoans', entry: { loanId: loanNo, date, direction, party, amount, interestRate: rate || '0%', term: term || 'On demand', status: 'Active', notes: '' } });
          regUpdates.push({ reg: 'trustResolutions', entry: { resolutionNo: resNo, date, description: `Loan ${direction} Trust — ${amount} (${party})`, meetingRef: `Minutes_${resNo}`, signedBy: s.director.fullName, filed: 'Yes' } });
          regUpdates.push({ reg: 'trustTransactions', entry: { transId: transNo, date, type: 'Loan', description: `Loan ${direction.toLowerCase()} trust — ${party}`, debit: direction === 'From' ? amount : '', credit: direction === 'To' ? amount : '', balance: '', relatedRef: loanNo, notes: '' } });
          break;
        }
        case 'generalResolution': {
          const title = document.getElementById('af_title').value;
          const text = document.getElementById('af_text').value;
          const points = text.split('\n').filter(l => l.trim());
          docs.push({ name: `Minutes_${resNo}`, html: Templates.meetingMinutes({ date, business: title, resolutions: [title], resolutionNos: [resNo] }) });
          docs.push({ name: `Resolution_${resNo}`, html: Templates.generalResolution({ resolutionNo: resNo, date, points }) });
          regUpdates.push({ reg: 'trustResolutions', entry: { resolutionNo: resNo, date, description: title, meetingRef: `Minutes_${resNo}`, signedBy: s.director.fullName, filed: 'Yes' } });
          break;
        }
      }

      Loading.hide();
      DocPreview.show(docs, regUpdates);
    } catch (err) {
      Loading.hide();
      Toast.show('Error generating documents: ' + err.message, 'error');
      console.error(err);
    }
  }
};

// ============================================================
// 13. DOCUMENT PREVIEW & PDF
// ============================================================
const DocPreview = {
  currentDocs: [],
  currentRegUpdates: [],
  show(docs, regUpdates) {
    DocPreview.currentDocs = docs;
    DocPreview.currentRegUpdates = regUpdates;
    const tabs = document.getElementById('docTabs');
    const area = document.getElementById('docPreviewArea');
    tabs.innerHTML = docs.map((d, i) => `<button class="doc-tab-btn ${i === 0 ? 'active' : ''}" onclick="DocPreview.switchDoc(${i})">${d.name}</button>`).join('');
    area.innerHTML = docs[0] ? docs[0].html : '';
    document.getElementById('docPreviewOverlay').classList.add('show');
    document.getElementById('downloadAllBtn').onclick = () => DocPreview.downloadAll();
    document.getElementById('confirmDocsBtn').onclick = () => DocPreview.confirmAndSave();
  },
  close() { document.getElementById('docPreviewOverlay').classList.remove('show'); },
  switchDoc(idx) {
    document.querySelectorAll('.doc-tab-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
    document.getElementById('docPreviewArea').innerHTML = DocPreview.currentDocs[idx].html;
  },
  async downloadAll() {
    Loading.show('Generating PDFs…');
    try {
      for (const doc of DocPreview.currentDocs) {
        const container = document.createElement('div');
        container.innerHTML = doc.html;
        document.body.appendChild(container);
        await html2pdf().set({
          margin: 0, filename: doc.name + '.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).from(container.firstElementChild).save();
        document.body.removeChild(container);
        await new Promise(r => setTimeout(r, 500));
      }
      Toast.show(`${DocPreview.currentDocs.length} PDFs downloaded`, 'success');
    } catch (err) {
      Toast.show('PDF generation error: ' + err.message, 'error');
    }
    Loading.hide();
  },
  async confirmAndSave() {
    for (const upd of DocPreview.currentRegUpdates) {
      await RegisterUI.addEntry(upd.reg, upd.entry);
    }
    // Save to doc history
    const historyEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      action: Actions.currentAction,
      docNames: DocPreview.currentDocs.map(d => d.name),
      docCount: DocPreview.currentDocs.length,
      regUpdates: DocPreview.currentRegUpdates.length
    };
    await DB.put('docHistory', historyEntry);

    DocPreview.close();
    document.getElementById('actionFormArea').classList.add('hidden');
    Toast.show('Documents confirmed and registers updated', 'success');
  }
};

// ============================================================
// 14. COMPANY TEMPLATE MODALS
// ============================================================
const CompanyTemplates = {
  show(templateId) {
    const today = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const forms = {
      directorResolution: {
        title: "Director's Resolution",
        body: `<div class="form-row">
          <div class="form-group"><label>Date</label><input type="text" class="form-control" id="ct_date" value="${today}"></div>
        </div>
        <div class="form-group"><label>Resolution Points (one per line)</label>
          <textarea class="form-control" id="ct_text" rows="5" placeholder="Enter resolution points..."></textarea>
        </div>`,
        generate: () => {
          const date = document.getElementById('ct_date').value;
          const points = document.getElementById('ct_text').value.split('\n').filter(l => l.trim());
          const resNo = RegisterUI.getNextId('companyResolutions');
          const doc = { name: `CompRes_${resNo}`, html: Templates.companyDirectorResolution({ date, points }) };
          DocPreview.show([doc], [{ reg: 'companyResolutions', entry: { resolutionNo: resNo, date, description: points[0] || 'Director Resolution', signedBy: Settings.data.director.fullName, filed: 'Yes' } }]);
          Modal.close();
        }
      },
      meetingMinutesCompany: {
        title: 'Meeting Minutes',
        body: `<div class="form-row">
          <div class="form-group"><label>Date</label><input type="text" class="form-control" id="ct_date" value="${today}"></div>
          <div class="form-group"><label>Time</label><input type="text" class="form-control" id="ct_time" value="10:00 AM"></div>
        </div>
        <div class="form-group"><label>Business</label><textarea class="form-control" id="ct_business" rows="3"></textarea></div>
        <div class="form-group"><label>Resolutions (one per line)</label><textarea class="form-control" id="ct_resolutions" rows="3"></textarea></div>`,
        generate: () => {
          const date = document.getElementById('ct_date').value;
          const html = Templates.meetingMinutes({
            date, time: document.getElementById('ct_time').value,
            business: document.getElementById('ct_business').value,
            resolutions: document.getElementById('ct_resolutions').value.split('\n').filter(l => l.trim()),
            location: Settings.data.company.address
          });
          DocPreview.show([{ name: `CompMinutes`, html }], []);
          Modal.close();
        }
      },
      consentDirector: {
        title: 'Consent to Act as Director',
        body: `<div class="form-row">
          <div class="form-group"><label>Date</label><input type="text" class="form-control" id="ct_date" value="${today}"></div>
          <div class="form-group"><label>Director Name</label><input type="text" class="form-control" id="ct_dirName" value="${Settings.data.director.fullName}"></div>
          <div class="form-group"><label>Address</label><input type="text" class="form-control" id="ct_dirAddress" value="${Settings.data.director.address}"></div>
          <div class="form-group"><label>Director ID (if known)</label><input type="text" class="form-control" id="ct_dirId" value=""></div>
        </div>`,
        generate: () => {
          const s = Settings.data;
          const date = document.getElementById('ct_date').value;
          const dirName = document.getElementById('ct_dirName').value;
          const dirAddress = document.getElementById('ct_dirAddress').value;
          const dirId = document.getElementById('ct_dirId').value;
          const html = `<div class="doc-frame">${Templates._docStyle()}
            ${Templates._letterhead('company')}
            <h2 style="text-align:center;">Consent to Act as Director</h2>
            <p>I, <b>${dirName}</b>, of ${dirAddress}, hereby consent to act as a director of <b>${s.company.name}</b> (ACN ${s.company.acn}).</p>
            <p>I acknowledge that:</p>
            <ul>
              <li>I am not disqualified from managing a corporation under the Corporations Act 2001;</li>
              <li>I have read the company's constitution and understand my obligations as a director;</li>
              <li>I will act in the best interests of the company and perform my duties in accordance with the Corporations Act 2001.</li>
            </ul>
            ${dirId ? `<p><b>Director ID:</b> ${dirId}</p>` : ''}
            <p style="margin-top:30px;">Signed:</p>
            <div class="sig-line" style="border-top:1px solid #333; width:250px; margin-top:50px; padding-top:5px;">
              <b>${dirName}</b><br>Director
            </div>
            <p style="margin-top:8px;">Date: ${date}</p>
          </div>`;
          DocPreview.show([{ name: `Consent_Director`, html }], []);
          Modal.close();
        }
      },
      shareCertificate: {
        title: 'Share Certificate',
        body: `<div class="form-row">
          <div class="form-group"><label>Certificate No</label><input type="text" class="form-control" id="ct_certNo" value="${RegisterUI.getNextId('companyShares')}"></div>
          <div class="form-group"><label>Date</label><input type="text" class="form-control" id="ct_date" value="${today}"></div>
          <div class="form-group"><label>Shareholder Name</label><input type="text" class="form-control" id="ct_shName" value="${Settings.data.director.fullName}"></div>
          <div class="form-group"><label>Address</label><input type="text" class="form-control" id="ct_shAddress" value="${Settings.data.director.address}"></div>
          <div class="form-group"><label>Number of Shares</label><input type="text" class="form-control" id="ct_shares" value="100"></div>
          <div class="form-group"><label>Class</label><input type="text" class="form-control" id="ct_class" value="Ordinary"></div>
          <div class="form-group"><label>Amount Paid Per Share</label><input type="text" class="form-control" id="ct_paid" value="$1.00"></div>
        </div>`,
        generate: () => {
          const s = Settings.data;
          const certNo = document.getElementById('ct_certNo').value;
          const date = document.getElementById('ct_date').value;
          const shName = document.getElementById('ct_shName').value;
          const shAddress = document.getElementById('ct_shAddress').value;
          const shares = document.getElementById('ct_shares').value;
          const cls = document.getElementById('ct_class').value;
          const paid = document.getElementById('ct_paid').value;
          const totalPaid = `$${(parseFloat(shares) * parseFloat(paid.replace('$','')) || 0).toFixed(2)}`;
          const html = `<div class="doc-frame">${Templates._docStyle()}
            <div style="border:3px double #1a1a1a; padding:30px; margin:10px; text-align:center;">
              <div style="font-size:10pt; letter-spacing:2px; color:#666; margin-bottom:6px;">CERTIFICATE NUMBER: ${certNo}</div>
              <h1 style="font-size:18pt; letter-spacing:2px; margin-bottom:4px;">${s.company.name}</h1>
              <div style="font-size:10pt; color:#444;">ACN ${s.company.acn} | ABN ${s.company.abn}</div>
              <div style="font-size:10pt; color:#444; margin-bottom:20px;">Incorporated in South Australia</div>
              <div style="border-top:1px solid #999; border-bottom:1px solid #999; padding:16px 0; margin:16px 0;">
                <div style="font-size:10pt;">This is to certify that</div>
                <div style="font-size:16pt; font-weight:bold; margin:8px 0;">${shName}</div>
                <div style="font-size:10pt;">${shAddress}</div>
                <div style="font-size:10pt; margin-top:8px;">is the registered holder of</div>
                <div style="font-size:22pt; font-weight:bold; margin:8px 0;">${shares}</div>
                <div style="font-size:14pt;">${cls} Shares</div>
                <div style="font-size:10pt; margin-top:8px;">of ${s.company.name}, fully paid at ${paid} per share</div>
                <div style="font-size:10pt;">Total Consideration: ${totalPaid}</div>
              </div>
              <div style="font-size:10pt; margin-top:16px;">Issued on: ${date}</div>
              <div style="margin-top:30px; display:flex; justify-content:space-around;">
                <div style="text-align:center;">
                  <div style="border-top:1px solid #333; width:200px; padding-top:5px; margin:auto;"></div>
                  <div>${s.director.fullName}</div>
                  <div style="font-size:10pt; color:#555;">Director</div>
                </div>
              </div>
            </div>
          </div>`;
          const resNo = RegisterUI.getNextId('companyResolutions');
          DocPreview.show([{ name: `ShareCert_${certNo}`, html }],
            [{ reg: 'companyShares', entry: { certNo, shareholder: shName, address: shAddress, numShares: shares, class: cls, issueDate: date, cancelled: 'No', notes: 'Issued' } },
             { reg: 'companyResolutions', entry: { resolutionNo: resNo, date, description: `Issue of ${shares} ${cls} shares to ${shName}`, signedBy: s.director.fullName, filed: 'Yes' } }]);
          Modal.close();
        }
      },
      shareTransfer: {
        title: 'Share Transfer Form',
        body: `<div class="form-row">
          <div class="form-group"><label>Date</label><input type="text" class="form-control" id="ct_date" value="${today}"></div>
          <div class="form-group"><label>Transferor (Seller) Name</label><input type="text" class="form-control" id="ct_transferor" value="${Settings.data.director.fullName}"></div>
          <div class="form-group"><label>Transferee (Buyer) Name</label><input type="text" class="form-control" id="ct_transferee"></div>
          <div class="form-group"><label>Transferee Address</label><input type="text" class="form-control" id="ct_transAddress"></div>
          <div class="form-group"><label>Number of Shares</label><input type="text" class="form-control" id="ct_shares" value="100"></div>
          <div class="form-group"><label>Class</label><input type="text" class="form-control" id="ct_class" value="Ordinary"></div>
          <div class="form-group"><label>Consideration</label><input type="text" class="form-control" id="ct_consideration" placeholder="$0.00"></div>
          <div class="form-group"><label>Certificate No</label><input type="text" class="form-control" id="ct_certNo" value="001"></div>
        </div>`,
        generate: () => {
          const s = Settings.data;
          const date = document.getElementById('ct_date').value;
          const transferor = document.getElementById('ct_transferor').value;
          const transferee = document.getElementById('ct_transferee').value;
          const transAddress = document.getElementById('ct_transAddress').value;
          const shares = document.getElementById('ct_shares').value;
          const cls = document.getElementById('ct_class').value;
          const consideration = document.getElementById('ct_consideration').value;
          const certNo = document.getElementById('ct_certNo').value;
          const html = `<div class="doc-frame">${Templates._docStyle()}
            ${Templates._letterhead('company')}
            <h2 style="text-align:center;">Transfer of Shares</h2>
            <p>For valuable consideration of <b>${consideration}</b> (receipt of which is hereby acknowledged), I/We, the transferor(s), do hereby transfer to the transferee(s) the shares described below:</p>
            <table>
              <tr><td style="width:180px;"><b>Number of Shares</b></td><td>${shares}</td></tr>
              <tr><td><b>Class</b></td><td>${cls}</td></tr>
              <tr><td><b>Certificate No(s)</b></td><td>${certNo}</td></tr>
              <tr><td><b>Consideration</b></td><td>${consideration}</td></tr>
            </table>
            <h3>Transferor</h3>
            <table>
              <tr><td style="width:180px;"><b>Name</b></td><td>${transferor}</td></tr>
              <tr><td><b>Signature</b></td><td style="height:50px;"></td></tr>
              <tr><td><b>Date</b></td><td>${date}</td></tr>
            </table>
            <h3>Transferee</h3>
            <table>
              <tr><td style="width:180px;"><b>Name</b></td><td>${transferee}</td></tr>
              <tr><td><b>Address</b></td><td>${transAddress}</td></tr>
              <tr><td><b>Signature</b></td><td style="height:50px;"></td></tr>
              <tr><td><b>Date</b></td><td>${date}</td></tr>
            </table>
            <p style="font-size:10pt; margin-top:16px;">I/We, the above-named transferee, hereby agree to accept the above transfer subject to the conditions on which the transferor held the same immediately before execution of this instrument of transfer, and I/We request that the transfer be registered in the Register of Members of ${s.company.name}.</p>
            <p style="font-size:9pt; margin-top:10px;">This instrument of transfer is made pursuant to section 1071B of the Corporations Act 2001 (Cth).</p>
          </div>`;
          DocPreview.show([{ name: `ShareTransfer_${date}`, html }], []);
          Modal.close();
        }
      },
      shareAllotment: {
        title: 'Share Allotment Resolution',
        body: `<div class="form-row">
          <div class="form-group"><label>Date</label><input type="text" class="form-control" id="ct_date" value="${today}"></div>
          <div class="form-group"><label>Allottee Name</label><input type="text" class="form-control" id="ct_allottee" value="${Settings.data.director.fullName}"></div>
          <div class="form-group"><label>Number of Shares</label><input type="text" class="form-control" id="ct_shares" value="100"></div>
          <div class="form-group"><label>Class</label><input type="text" class="form-control" id="ct_class" value="Ordinary"></div>
          <div class="form-group"><label>Price Per Share</label><input type="text" class="form-control" id="ct_price" value="$1.00"></div>
        </div>`,
        generate: () => {
          const s = Settings.data;
          const date = document.getElementById('ct_date').value;
          const allottee = document.getElementById('ct_allottee').value;
          const shares = document.getElementById('ct_shares').value;
          const cls = document.getElementById('ct_class').value;
          const price = document.getElementById('ct_price').value;
          const total = `$${(parseFloat(shares) * parseFloat(price.replace('$','')) || 0).toFixed(2)}`;
          const resNo = RegisterUI.getNextId('companyResolutions');
          const html = Templates.companyDirectorResolution({
            date,
            points: [
              `That ${shares} ${cls} shares of ${price} each be allotted to ${allottee} for a total consideration of ${total}.`,
              `That the allotment be recorded in the Register of Members and a share certificate be issued accordingly.`,
              `That the company secretary (or director) be authorised to update ASIC records and sign all documents necessary to give effect to this resolution.`
            ]
          });
          DocPreview.show([{ name: `ShareAllotment_${resNo}`, html }],
            [{ reg: 'companyResolutions', entry: { resolutionNo: resNo, date, description: `Allotment of ${shares} ${cls} shares to ${allottee}`, signedBy: s.director.fullName, filed: 'Yes' } }]);
          Modal.close();
        }
      },
      bankLetterCompany: {
        title: 'Letter to Bank — Company Account',
        body: `<div class="form-row">
          <div class="form-group"><label>Date</label><input type="text" class="form-control" id="ct_date" value="${today}"></div>
          <div class="form-group"><label>Bank Name</label><input type="text" class="form-control" id="ct_bank" placeholder="e.g. Commonwealth Bank"></div>
          <div class="form-group"><label>Branch</label><input type="text" class="form-control" id="ct_branch"></div>
          <div class="form-group"><label>Account Type</label><input type="text" class="form-control" id="ct_acctType" value="Business Transaction Account"></div>
        </div>`,
        generate: () => {
          const s = Settings.data;
          const date = document.getElementById('ct_date').value;
          const bank = document.getElementById('ct_bank').value;
          const branch = document.getElementById('ct_branch').value;
          const acctType = document.getElementById('ct_acctType').value;
          const html = `<div class="doc-frame">${Templates._docStyle()}
            ${Templates._letterhead('company')}
            <p><b>Date:</b> ${date}</p>
            <p><b>To:</b> The Branch Manager<br>${bank}<br>${branch}</p>
            <p><b>Subject:</b> Request to Open a ${acctType} — ${s.company.name}</p>
            <p>Dear Sir/Madam,</p>
            <p>I write on behalf of <b>${s.company.name}</b> (ACN ${s.company.acn}, ABN ${s.company.abn}), to request the opening of a ${acctType.toLowerCase()} in the company's name.</p>
            <table>
              <tr><td style="width:180px;"><b>Company Name</b></td><td>${s.company.name}</td></tr>
              <tr><td><b>ACN</b></td><td>${s.company.acn}</td></tr>
              <tr><td><b>ABN</b></td><td>${s.company.abn}</td></tr>
              <tr><td><b>Registered Office</b></td><td>${s.company.address}</td></tr>
              <tr><td><b>Account Name</b></td><td>${s.company.name}</td></tr>
              <tr><td><b>Authorised Signatory</b></td><td>${s.director.fullName} (Sole Director)</td></tr>
            </table>
            <p>The director is the sole authorised signatory on this account.</p>
            <p>Yours faithfully,</p>
            ${Templates._sigBlock('Sole Director')}
            <p style="font-size:10pt; margin-top:12px;">Email: ${s.director.email}<br>Phone: ${s.director.phone}</p>
          </div>`;
          const resNo = RegisterUI.getNextId('companyResolutions');
          DocPreview.show([{ name: `BankLetter_Company`, html }],
            [{ reg: 'companyResolutions', entry: { resolutionNo: resNo, date, description: `Banking Authority — ${bank}`, signedBy: s.director.fullName, filed: 'Yes' } }]);
          Modal.close();
        }
      }
    };

    const tmpl = forms[templateId];
    if (!tmpl) { Toast.show('Template not implemented yet', 'warning'); return; }
    Modal.show(tmpl.title, tmpl.body, `<button class="btn btn-primary" onclick="CompanyTemplates._currentGenerate()">Generate</button>`);
    CompanyTemplates._currentGenerate = tmpl.generate;
  },
  _currentGenerate: null
};

// ============================================================
// 15. TRUST TEMPLATE (Appointor Letter)
// ============================================================
const TrustTemplates = {
  show(templateId) {
    if (templateId !== 'appointorLetter') return;
    const today = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    Modal.show('Letter from Appointor to Trustee', `
      <div class="form-row">
        <div class="form-group"><label>Date</label><input type="text" class="form-control" id="al_date" value="${today}"></div>
        <div class="form-group"><label>Subject / Title</label><input type="text" class="form-control" id="al_title" placeholder="e.g. Instruction to Remove Trustee"></div>
      </div>
      <div class="form-group"><label>Instructions</label><textarea class="form-control" id="al_instructions" rows="6" placeholder="Enter the appointor's instructions to the trustee..."></textarea></div>
    `, `<button class="btn btn-primary" onclick="TrustTemplates.generate()">Generate</button>`);
  },
  generate() {
    const html = Templates.appointorLetter({
      date: document.getElementById('al_date').value,
      title: document.getElementById('al_title').value,
      instructions: document.getElementById('al_instructions').value.replace(/\n/g, '<br>')
    });
    DocPreview.show([{ name: 'AppointorLetter', html }], []);
    Modal.close();
  }
};

// ============================================================
// 16. DOC HISTORY
// ============================================================
const DocHistory = {
  async render() {
    const items = await DB.getAll('docHistory');
    const container = document.getElementById('docHistoryList');
    if (!container) return;
    if (items.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:20px;">No documents generated yet.</p>';
      return;
    }
    items.sort((a, b) => b.id - a.id);
    container.innerHTML = items.map(item => `
      <div class="history-item">
        <div class="history-item-info">
          <div class="history-item-title">${item.action || 'Document'}</div>
          <div class="history-item-meta">${new Date(item.date).toLocaleString('en-AU')} · ${item.docCount || 0} documents · ${item.regUpdates || 0} register updates</div>
        </div>
        <div class="history-item-count">${(item.docNames || []).join(', ')}</div>
      </div>
    `).join('');
  }
};

// ============================================================
// 17. BACKUP & RESTORE
// ============================================================
const Backup = {
  async export() {
    const data = {
      version: 1,
      exportDate: new Date().toISOString(),
      settings: Settings.data,
      registers: RegisterUI.data,
      docHistory: await DB.getAll('docHistory')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `JFDCO-Backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click(); URL.revokeObjectURL(url);
    localStorage.setItem('jfdco_lastBackup', new Date().toISOString());
    Toast.show('Backup exported successfully', 'success');
  },
  async import(event) {
    const file = event.target.files[0];
    if (!file) return;
    Confirm.show('Restore Backup', 'This will overwrite ALL current data. Are you sure?', async () => {
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (!data.version || !data.settings || !data.registers) throw new Error('Invalid backup file');
        Settings.data = data.settings;
        await DB.put('settings', { id: 'main', data: Settings.data });
        RegisterUI.data = data.registers;
        await RegisterUI.saveAll();
        if (data.docHistory) {
          await DB.clear('docHistory');
          for (const item of data.docHistory) await DB.put('docHistory', item);
        }
        Settings.populate();
        Toast.show('Backup restored successfully', 'success');
      } catch (err) {
        Toast.show('Error restoring backup: ' + err.message, 'error');
      }
    }, '📥');
    event.target.value = '';
  },
  checkOverdue() {
    const last = localStorage.getItem('jfdco_lastBackup');
    if (!last) { document.getElementById('backupBadge').style.display = 'inline-flex'; return; }
    const days = (Date.now() - new Date(last).getTime()) / (1000 * 60 * 60 * 24);
    document.getElementById('backupBadge').style.display = days > 30 ? 'inline-flex' : 'none';
    const info = document.getElementById('lastBackupInfo');
    if (info) info.textContent = `Last backup: ${new Date(last).toLocaleString('en-AU')}`;
  }
};

// ============================================================
// 18. THEME TOGGLE
// ============================================================
const Theme = {
  init() {
    const saved = localStorage.getItem('jfdco_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    const btn = document.getElementById('themeToggle');
    btn.textContent = saved === 'dark' ? '🌙' : '☀️';
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('jfdco_theme', next);
      btn.textContent = next === 'dark' ? '🌙' : '☀️';
    });
  }
};

// ============================================================
// 19. MAIN APP CONTROLLER
// ============================================================
const App = {
  async init() {
    await DB.open();
    Theme.init();
    Nav.init();

    // Login form
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const pw = document.getElementById('passwordInput').value;
      const valid = await Auth.verify(pw);
      if (valid) {
        if (document.getElementById('rememberMeCheck').checked) localStorage.setItem('jfdco_remember', '1');
        Auth.login();
      } else {
        document.getElementById('loginError').style.display = 'block';
      }
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      Confirm.show('Logout', 'Are you sure you want to log out?', () => Auth.logout(), '🔒');
    });

    // Auto-login check
    if (Auth.checkRemember()) {
      Auth.login();
    }
  },
  async onLogin() {
    await Settings.load();
    await RegisterUI.loadAll();
    Settings.populate();
    Actions.populateMenu();
    Backup.checkOverdue();
    await DocHistory.render();
  },
  showTrustTemplate(id) { TrustTemplates.show(id); },
  showCompanyTemplate(id) { CompanyTemplates.show(id); },
  async clearDocHistory() {
    Confirm.show('Clear History', 'Delete all document history? This cannot be undone.', async () => {
      await DB.clear('docHistory');
      await DocHistory.render();
      Toast.show('History cleared', 'info');
    }, '🗑️');
  },
  exportBackup() { Backup.export(); },
  importBackup(event) { Backup.import(event); },
  showChangePassword() {
    Modal.show('Change Password', `
      <div class="form-group"><label>New Password</label><input type="password" class="form-control" id="newPw1" placeholder="Enter new password"></div>
      <div class="form-group"><label>Confirm Password</label><input type="password" class="form-control" id="newPw2" placeholder="Confirm new password"></div>
    `, `<button class="btn btn-primary" onclick="App.doChangePassword()">Change Password</button>`);
  },
  async doChangePassword() {
    const pw1 = document.getElementById('newPw1').value;
    const pw2 = document.getElementById('newPw2').value;
    if (!pw1 || pw1.length < 4) { Toast.show('Password must be at least 4 characters', 'warning'); return; }
    if (pw1 !== pw2) { Toast.show('Passwords do not match', 'warning'); return; }
    await Auth.setPassword(pw1);
    Modal.close();
    Toast.show('Password changed successfully', 'success');
  }
};

// ============================================================
// BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', () => App.init());
