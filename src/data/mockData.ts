import { 
  CitizenProfile, 
  Scheme, 
  CivicService, 
  GovOffice, 
  CitizenApplication, 
  NotificationItem, 
  AdminMetric 
} from '../types';

export const PRESET_PERSONAS: CitizenProfile[] = [
  {
    id: 'p-1',
    name: 'Ramesh Gowda',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    occupation: 'Small Scale Farmer',
    state: 'Karnataka',
    district: 'Mandya',
    age: 44,
    gender: 'Male',
    annualIncome: 140000,
    category: 'OBC',
    isFarmer: true,
    isStudent: false,
    isSeniorCitizen: false,
    isBPL: true,
    isDisabled: false,
    isVerifiedCitizen: true,
    documentsInVault: ['Aadhaar Card', 'Pahani (RTC) Land Record', 'BPL Ration Card', 'Bank Passbook']
  },
  {
    id: 'p-2',
    name: 'Priya Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    occupation: 'Undergraduate Engineering Student',
    state: 'Delhi',
    district: 'New Delhi',
    age: 20,
    gender: 'Female',
    annualIncome: 65000,
    category: 'General',
    isFarmer: false,
    isStudent: true,
    isSeniorCitizen: false,
    isBPL: false,
    isDisabled: false,
    isVerifiedCitizen: true,
    documentsInVault: ['Aadhaar Card', '10th & 12th Marksheets', 'College Bonafide Certificate', 'Income Certificate']
  },
  {
    id: 'p-3',
    name: 'Sunita Devi',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    occupation: 'Handicrafts Artisan & Self-Employed',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    age: 38,
    gender: 'Female',
    annualIncome: 95000,
    category: 'SC',
    isFarmer: false,
    isStudent: false,
    isSeniorCitizen: false,
    isBPL: true,
    isDisabled: false,
    isVerifiedCitizen: true,
    documentsInVault: ['Aadhaar Card', 'Caste Certificate', 'Artisan Registration Card']
  },
  {
    id: 'p-4',
    name: 'Col. K. R. Nambiar (Retd.)',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    occupation: 'Retired Defense Personnel',
    state: 'Kerala',
    district: 'Kozhikode',
    age: 68,
    gender: 'Male',
    annualIncome: 480000,
    category: 'General',
    isFarmer: false,
    isStudent: false,
    isSeniorCitizen: true,
    isBPL: false,
    isDisabled: false,
    isVerifiedCitizen: true,
    documentsInVault: ['Aadhaar Card', 'Pension Payment Order (PPO)', 'Senior Citizen Card']
  }
];

export const SCHEMES_DATA: Scheme[] = [
  {
    id: 'pm-kisan',
    title: 'PM Kisan Samman Nidhi Yojana',
    shortCode: 'PM-KISAN',
    sponsoringBody: 'Central Government',
    department: 'Ministry of Agriculture and Farmers Welfare',
    category: 'Agriculture',
    stateApplicability: ['All States & UTs'],
    simplifiedDescription: 'Direct financial benefit of ₹6,000 per year paid in three equal 4-monthly installments of ₹2,000 to all landholding farmer families.',
    detailedOverview: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme with 100% funding from the Government of India. The amount is directly transferred into the Aadhaar-linked bank accounts of eligible farmer households.',
    financialAssistance: '₹6,000 / year (Direct DBT)',
    status: 'Active',
    deadline: 'Continuous rolling enrollment',
    eligibilityCriteria: {
      occupations: ['Farmer', 'Small Scale Farmer', 'Cultivator'],
      farmerOnly: true,
      customRules: [
        'Must own cultivable agricultural landholding in revenue records (RTC/Pahani)',
        'Must not be an institutional landholder or high-income taxpayer',
        'Mandatory e-KYC via Aadhaar OTP or Biometric Seva Kendra'
      ]
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Pahani / Land Record (Khata/Khasra/ROR)',
      'Active Bank Account linked to Aadhaar (NPCI mapped)',
      'Mobile number linked to Aadhaar'
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Check e-KYC & Land Record', description: 'Ensure your land document is digitally updated in state revenue records.' },
      { stepNumber: 2, title: 'Online Registration', description: 'Apply via PM-KISAN portal or visit your nearest CSC Gram One / Seva Kendra.' },
      { stepNumber: 3, title: 'State Nodal Verification', description: 'The Patwari / Village Accountant verifies land title electronically.' },
      { stepNumber: 4, title: 'PFMS Validation', description: 'Bank account is validated by Public Financial Management System.' },
      { stepNumber: 5, title: 'DBT Disbursal', description: 'Direct transfer of ₹2,000 every 4 months directly to your savings account.' }
    ],
    officialPortalUrl: 'https://pmkisan.gov.in',
    isPopular: true
  },
  {
    id: 'ayushman-bharat',
    title: 'Ayushman Bharat PM-JAY',
    shortCode: 'PM-JAY',
    sponsoringBody: 'Central Government',
    department: 'National Health Authority (MoHFW)',
    category: 'Healthcare',
    stateApplicability: ['All States & UTs'],
    simplifiedDescription: 'Comprehensive health cover of ₹5,00,000 per family per year for secondary and tertiary hospital care at empaneled public & private hospitals.',
    detailedOverview: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana is the world’s largest government-financed health assurance scheme, covering over 12 crore poor and vulnerable families (approx 55 crore beneficiaries). Provides completely cashless treatment.',
    financialAssistance: '₹5,00,000 / year cashless health cover',
    status: 'Active',
    deadline: 'Always Active',
    eligibilityCriteria: {
      bplOnly: true,
      customRules: [
        'Family identified under SECC (Socio-Economic Caste Census 2011) or NFSA Ration Card database',
        'Senior citizens aged 70 and above automatically eligible under expanded Ayushman Vaya Vandana',
        'No restriction on family size, age, or gender'
      ]
    },
    requiredDocuments: [
      'Aadhaar Card of all family members',
      'Ration Card (NFSA / BPL / Antyodaya)',
      'Active Mobile number'
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Check Beneficiary Status', description: 'Search name using Aadhaar or Ration Card number on mera.pmjay.gov.in.' },
      { stepNumber: 2, title: 'Generate Ayushman Card', description: 'Visit any empaneled hospital or CSC to complete instant facial/fingerprint e-KYC.' },
      { stepNumber: 3, title: 'Receive Digital PVC Card', description: 'Download Ayushman PVC Golden Card instantly on your smartphone or DigiLocker.' },
      { stepNumber: 4, title: 'Avail Cashless Hospitalization', description: 'Show card at Ayushman Mitra desk at any network hospital nationwide.' }
    ],
    officialPortalUrl: 'https://pmjay.gov.in',
    isPopular: true
  },
  {
    id: 'pm-awas-yojana',
    title: 'Pradhan Mantri Awas Yojana (Urban & Gramin)',
    shortCode: 'PMAY',
    sponsoringBody: 'Central Government',
    department: 'Ministry of Housing and Urban Affairs / MoRD',
    category: 'Housing',
    stateApplicability: ['All States & UTs'],
    simplifiedDescription: 'Financial subsidy up to ₹2.67 Lakh for pucca house construction or home loan interest subsidy for EWS/LIG families.',
    detailedOverview: 'PMAY envisions Housing for All by providing financial assistance to eligible families without a permanent pucca house. Includes basic civic amenities like water tap, toilet, and electricity connection.',
    financialAssistance: 'Up to ₹2,67,000 subsidy',
    status: 'Active',
    eligibilityCriteria: {
      maxIncome: 300000,
      customRules: [
        'Beneficiary family must not own a pucca house anywhere in India',
        'House must be registered in the name of the female head or joint ownership'
      ]
    },
    requiredDocuments: [
      'Aadhaar Card of all family members',
      'Income Certificate issued by Revenue Authority',
      'Land / Site allotment deed or ownership paper',
      'Bank Account Passbook with IFSC'
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Verify Housing Status', description: 'Ensure household is listed in Gram Sabha housing survey or municipal portal.' },
      { stepNumber: 2, title: 'Form Submission', description: 'Apply through municipal ward office or CSC center with geotagged site photo.' },
      { stepNumber: 3, title: 'Geo-tagging Inspection', description: 'Government surveyor verifies site coordinates before and during construction.' },
      { stepNumber: 4, title: 'Tranche Disbursal', description: 'Direct bank transfer in 3 milestone-linked installments.' }
    ],
    officialPortalUrl: 'https://pmaymis.gov.in',
    isPopular: true
  },
  {
    id: 'pm-mudra-yojana',
    title: 'Pradhan Mantri MUDRA Yojana',
    shortCode: 'PMMY',
    sponsoringBody: 'Central Government',
    department: 'Department of Financial Services, Ministry of Finance',
    category: 'Employment',
    stateApplicability: ['All States & UTs'],
    simplifiedDescription: 'Collateral-free micro loans up to ₹20 Lakh for non-corporate, non-farm small/micro enterprises (Shishu, Kishore, Tarun, Tarun Plus).',
    detailedOverview: 'Provides loans through Commercial Banks, RRBs, Small Finance Banks, MFIs, and NBFCs for income-generating activities in manufacturing, processing, trading, or service sector.',
    financialAssistance: 'Loans up to ₹20,00,000 (No collateral required)',
    status: 'Active',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 65,
      customRules: [
        'Any Indian citizen having business proposal for income-generating micro enterprise',
        'Clean credit history with no past bank defaults'
      ]
    },
    requiredDocuments: [
      'Aadhaar & PAN Card',
      'Proof of Business Enterprise (Udyam Registration / GST / Shop Act License)',
      'Last 6 months Bank Account Statement',
      'Projected business plan or quotation for machinery purchase'
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Formulate Business Plan', description: 'Prepare brief estimate of capital needed for equipment, inventory or shop.' },
      { stepNumber: 2, title: 'Apply on Udyamitra', description: 'Submit loan request on udyamitra.in portal or directly visit any branch.' },
      { stepNumber: 3, title: 'Document Verification', description: 'Bank assesses viability and sanctions loan without asking collateral security.' },
      { stepNumber: 4, title: 'Receive MUDRA Debit Card', description: 'Get dedicated RuPay MUDRA debit card for working capital withdrawals.' }
    ],
    officialPortalUrl: 'https://www.mudra.org.in',
    isPopular: false
  },
  {
    id: 'national-scholarship',
    title: 'Post-Matric & Higher Education Scholarships (NSP)',
    shortCode: 'NSP',
    sponsoringBody: 'Central Government',
    department: 'Ministry of Social Justice & MoE',
    category: 'Education',
    stateApplicability: ['All States & UTs'],
    simplifiedDescription: '100% tuition waiver plus monthly maintenance stipend for meritorious students from EWS, SC, ST, OBC and minority communities.',
    detailedOverview: 'The National Scholarship Portal (NSP) is a one-stop electronic platform offering common application, automated verification, and direct DBT disbursement of central scholarships.',
    financialAssistance: 'Full tuition + ₹12,000–₹50,000/year allowance',
    status: 'Expiring Soon',
    deadline: 'October 31, 2026',
    eligibilityCriteria: {
      studentOnly: true,
      maxIncome: 250000,
      customRules: [
        'Enrolled in recognized College, Polytechnic, or University',
        'Secured at least 50% marks in preceding annual examination'
      ]
    },
    requiredDocuments: [
      'Student Aadhaar Card & College ID',
      'Previous Year Academic Marksheet',
      'Tehsildar Income Certificate (< 1 year valid)',
      'Fee Receipt of Current Academic Year',
      'Bank Passbook in Student’s own name'
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'One-Time Registration (OTR)', description: 'Create digital biometric OTR profile on scholarships.gov.in.' },
      { stepNumber: 2, title: 'Institute Verification', description: 'College Nodal Officer verifies admission and bonafide credentials.' },
      { stepNumber: 3, title: 'District Nodal Approval', description: 'Social welfare department approves applicant quota.' },
      { stepNumber: 4, title: 'DBT Payment', description: 'Funds credited directly to bank account linked to Aadhaar.' }
    ],
    officialPortalUrl: 'https://scholarships.gov.in',
    isPopular: true
  },
  {
    id: 'pm-surya-ghar',
    title: 'PM Surya Ghar: Muft Bijli Yojana',
    shortCode: 'SURYA-GHAR',
    sponsoringBody: 'Central Government',
    department: 'Ministry of New and Renewable Energy',
    category: 'Utilities',
    stateApplicability: ['All States & UTs'],
    simplifiedDescription: 'Up to ₹78,000 direct subsidy for installing rooftop solar panels to provide up to 300 units of free electricity every month.',
    detailedOverview: 'Flagship rooftop solar initiative aimed at lighting up 1 crore households with clean energy, eliminating monthly power bills, and enabling families to earn surplus by selling solar power back to the grid.',
    financialAssistance: 'Direct capital subsidy up to ₹78,000',
    status: 'Active',
    eligibilityCriteria: {
      customRules: [
        'Must own a residential roof with adequate sunlight space',
        'Must have active domestic electricity meter connection with DISCOM'
      ]
    },
    requiredDocuments: [
      'Electricity Bill (latest)',
      'Aadhaar Card of Consumer',
      'Bank Account Passbook or Cancelled Cheque',
      'Rooftop ownership document / tax receipt'
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register on National Portal', description: 'Enter DISCOM consumer account number on pmsuryaghar.gov.in.' },
      { stepNumber: 2, title: 'DISCOM Feasibility Approval', description: 'Power utility sanctions grid-tie technical feasibility.' },
      { stepNumber: 3, title: 'Vendor Installation', description: 'Registered empaneled vendor installs ALMM solar modules.' },
      { stepNumber: 4, title: 'Net Meter Commissioning', description: 'DISCOM installs bi-directional net meter and issues commissioning report.' },
      { stepNumber: 5, title: 'Subsidy in Account', description: 'Central subsidy credited to bank account within 30 days.' }
    ],
    officialPortalUrl: 'https://pmsuryaghar.gov.in',
    isPopular: true
  },
  {
    id: 'gruha-lakshmi',
    title: 'Gruha Lakshmi Direct Cash Assistance',
    shortCode: 'GRUHA-LAKSHMI',
    sponsoringBody: 'State Government',
    department: 'Women and Child Development Department (Karnataka)',
    category: 'Social Welfare',
    stateApplicability: ['Karnataka'],
    simplifiedDescription: 'Direct monthly financial support of ₹2,000 to the woman head of household in eligible Antyodaya, BPL and APL families.',
    detailedOverview: 'Empowers female household heads by providing monthly unconditional basic financial support directly credited to bank accounts, assisting in household nutrition and family welfare.',
    financialAssistance: '₹2,000 / month (₹24,000 annually)',
    status: 'Active',
    eligibilityCriteria: {
      genders: ['Female'],
      customRules: [
        'Applicant woman must be designated head of family on Ration Card',
        'Husband or applicant must not be income tax payer or GST filer'
      ]
    },
    requiredDocuments: [
      'Ration Card (RC Number)',
      'Aadhaar Card of Woman Head and Husband',
      'Bank Account linked to Aadhaar (NPCI DBTC enabled)'
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Grama One / Seva Sindhu', description: 'Submit Ration Card number at Bangalore One, Karnataka One or Grama One center.' },
      { stepNumber: 2, title: 'Biometric Confirmation', description: 'Woman head authenticates fingerprint or iris scanner.' },
      { stepNumber: 3, title: 'Acknowledgment Slip', description: 'Receive SMS with application confirmation number.' },
      { stepNumber: 4, title: 'Monthly DBT', description: '₹2,000 credited automatically every month.' }
    ],
    officialPortalUrl: 'https://sevasindhu.karnataka.gov.in',
    isPopular: false
  }
];

export const CIVIC_SERVICES_DATA: CivicService[] = [
  {
    id: 'srv-birth-cert',
    title: 'Birth Certificate Issuance & Correction',
    category: 'Documents',
    department: 'Civil Registration System / Urban Local Bodies',
    shortDescription: 'Obtain an official birth certificate digitally signed by the Registrar of Births and Deaths with QR verification.',
    detailedDescription: 'Essential civic identity document proving date and place of birth, mandatory for school admissions, passport, voter ID, and citizenship records.',
    onlineAvailability: 'Fully Online',
    turnaroundTime: '3 to 7 Working Days',
    officialFee: '₹25 to ₹50 (Government statutory fee)',
    requiredDocuments: [
      'Hospital Discharge Summary / Institutional Birth Report',
      'Aadhaar Card of Parents',
      'Marriage Certificate of Parents (if available)',
      'Address proof of applicant'
    ],
    applicationSteps: [
      'Log into State Municipal Portal or Service Plus',
      'Provide Hospital Registration reference or date/hospital details',
      'Upload parental identity proof',
      'Pay online fee and download digitally signed certificate with QR Code'
    ],
    officialUrl: 'https://crsorgi.gov.in',
    serviceCount: 14
  },
  {
    id: 'srv-income-cert',
    title: 'Income & Asset Certificate (Tehsildar / Revenue)',
    category: 'Documents',
    department: 'Department of Revenue & Land Records',
    shortDescription: 'Certified declaration of gross annual household income, necessary for scholarships, subsidies, and quota concessions.',
    detailedDescription: 'Issued by the Revenue Authority following field inspection by Village Accountant or Revenue Inspector. Valid for 1 to 3 fiscal years.',
    onlineAvailability: 'Hybrid (Apply Online / Biometrics in Center)',
    turnaroundTime: '7 to 14 Working Days',
    officialFee: '₹40',
    requiredDocuments: [
      'Aadhaar Card',
      'Salary Slip / Form 16 or Self-Declaration Affidavit',
      'Electricity Bill or Ration Card',
      'Land Ownership document (for agricultural households)'
    ],
    applicationSteps: [
      'Apply online via State e-District portal or nearest Citizen Service Center',
      'Village Administrative Officer conducts physical verification',
      'Tehsildar approves electronic digital signature',
      'Download certificate online or collect stamped copy'
    ],
    officialUrl: 'https://edistrict.gov.in',
    serviceCount: 18
  },
  {
    id: 'srv-caste-cert',
    title: 'Caste & Category Certificate (SC/ST/OBC/EWS)',
    category: 'Documents',
    department: 'Social Welfare & Revenue Department',
    shortDescription: 'Statutory proof of belonging to designated social categories for reservations in public employment and education.',
    detailedDescription: 'Permanent legal document certifying genealogical social group status issued under the authority of District Magistrate / Tehsildar.',
    onlineAvailability: 'Fully Online',
    turnaroundTime: '15 Working Days',
    officialFee: '₹40',
    requiredDocuments: [
      'Aadhaar Card',
      'Father or Paternal Relative Caste Certificate / School TC',
      'Ration Card / Voter ID',
      'Affidavit sworn before Notary'
    ],
    applicationSteps: [
      'Submit request on State Citizen Service Portal',
      'Revenue Inspector inspects genealogical lineage',
      'Digital certificate issued with Barcode verification'
    ],
    officialUrl: 'https://serviceonline.gov.in',
    serviceCount: 12
  },
  {
    id: 'srv-driving-lic',
    title: 'Driving License Services (Learner, Renewal & Address Change)',
    category: 'Transport',
    department: 'Ministry of Road Transport and Highways (Sarathi)',
    shortDescription: 'Complete contactless learner license test from home using Aadhaar authentication, or apply for renewal/endorsement.',
    detailedDescription: 'Powered by Parivahan Sarathi, enabling citizens to avoid visits to Regional Transport Offices (RTO) for 18+ contactless services.',
    onlineAvailability: 'Fully Online',
    turnaroundTime: 'Instant (Learner) / 7 Days (Plastic Card)',
    officialFee: '₹200 to ₹500',
    requiredDocuments: [
      'Aadhaar Card (e-KYC verified)',
      'Medical Certificate Form 1A (for applicants over 40)',
      'Current License (for renewal / address update)',
      'Passport size photograph'
    ],
    applicationSteps: [
      'Visit Parivahan Sarathi website',
      'Select state and authentic via Aadhaar e-KYC',
      'Take online proctored road safety tutorial & test',
      'Download digital driving license in DigiLocker or mParivahan'
    ],
    officialUrl: 'https://sarathi.parivahan.gov.in',
    serviceCount: 22
  },
  {
    id: 'srv-ration-card',
    title: 'Ration Card Addition / Modification / Surrender',
    category: 'Utilities',
    department: 'Department of Food, Civil Supplies and Consumer Affairs',
    shortDescription: 'Add family member names (newborn child, daughter-in-law) or split/transfer ration cards digitally.',
    detailedDescription: 'Ensures uninterrupted access to National Food Security Act (NFSA) grains and serves as foundational proof of address.',
    onlineAvailability: 'Hybrid (Apply Online / Biometrics in Center)',
    turnaroundTime: '14 to 21 Working Days',
    officialFee: '₹50',
    requiredDocuments: [
      'Existing Ration Card number',
      'Birth Certificate of new child or Marriage Certificate',
      'Aadhaar Card of member to be added with mobile linked'
    ],
    applicationSteps: [
      'Login to State PDS Food Portal',
      'Select "Add New Family Member"',
      'Upload Birth Certificate and Aadhaar',
      'Food Inspector approves after duplicate database check'
    ],
    officialUrl: 'https://nfsa.gov.in',
    serviceCount: 9
  },
  {
    id: 'srv-property-tax',
    title: 'Property Tax Payment & Khata Transfer',
    category: 'Municipal Services',
    department: 'City Municipal Corporation / Directorate of Municipal Administration',
    shortDescription: 'Calculate annual property tax, view dues, pay online, and download digital SAS receipt instantly.',
    detailedDescription: 'Pay Self-Assessment Scheme (SAS) property tax with early-bird rebates, generate property tax receipts, and request Khata certificate.',
    onlineAvailability: 'Fully Online',
    turnaroundTime: 'Instant (Payment) / 15 Days (Khata Transfer)',
    officialFee: 'Variable based on unit area / guidance value',
    requiredDocuments: [
      'Previous Year Property Tax Receipt / SAS PID Number',
      'Sale Deed or Title Deed copy',
      'Electricity meter RR Number'
    ],
    applicationSteps: [
      'Enter Property Identification (PID) number',
      'Review automated assessment calculation',
      'Pay via UPI, NetBanking or Credit Card',
      'Download official digital tax clearance receipt'
    ],
    officialUrl: 'https://bbmp.gov.in',
    serviceCount: 16
  },
  {
    id: 'srv-ayushman-card',
    title: 'Ayushman Bharat PVC Golden Card Issuance',
    category: 'Healthcare',
    department: 'National Health Authority (NHA)',
    shortDescription: 'Generate and print high-security PVC health card for cashless hospital cover up to ₹5 Lakh.',
    detailedDescription: 'Empowers eligible SECC, NFSA, and senior citizen households with instant cashless medical entitlement tokens valid across 27,000+ empaneled hospitals.',
    onlineAvailability: 'Fully Online',
    turnaroundTime: 'Instant (Download) / 5 Days (PVC Home Delivery)',
    officialFee: 'Free of Cost (Government Sponsored)',
    requiredDocuments: [
      'Aadhaar Card with biometric e-KYC',
      'Ration Card / PM-JAY Family ID',
      'Active Mobile number'
    ],
    applicationSteps: [
      'Search name on mera.pmjay.gov.in',
      'Complete biometric e-KYC at hospital desk or Grama One',
      'Download electronic PDF card with secure QR code',
      'Avail zero-billing hospital admissions'
    ],
    officialUrl: 'https://pmjay.gov.in',
    serviceCount: 12
  },
  {
    id: 'srv-nsp-bonafide',
    title: 'College Bonafide & Student Scholarship Verification',
    category: 'Education',
    department: 'Ministry of Education & State Higher Education Council',
    shortDescription: 'Institutional verification of college enrollment credentials for National Scholarship Portal disbursement.',
    detailedDescription: 'Enables students to get digital institutional endorsement from College Nodal Officers for post-matric and merit scholarships.',
    onlineAvailability: 'Fully Online',
    turnaroundTime: '3 to 5 Working Days',
    officialFee: 'Free of Cost',
    requiredDocuments: [
      'Student College ID Card',
      'Current Academic Semester Admission Fee Receipt',
      'Previous Year Marksheet',
      'Aadhaar Card'
    ],
    applicationSteps: [
      'Apply on scholarships.gov.in with OTR number',
      'Submit bonafide request to College Academic Registrar',
      'Nodal officer approves digital signature',
      'Direct DBT credit into student bank account'
    ],
    officialUrl: 'https://scholarships.gov.in',
    serviceCount: 14
  },
  {
    id: 'srv-udyam-reg',
    title: 'Udyam MSME Registration & Priority Lending Certificate',
    category: 'Employment',
    department: 'Ministry of Micro, Small and Medium Enterprises',
    shortDescription: 'Paperless, zero-cost government registration for micro, small, and medium businesses and self-employed artisans.',
    detailedDescription: 'Permanent identity number with digital e-certificate that unlocks priority sector bank credit, collateral-free MUDRA loans, and government tender exemptions.',
    onlineAvailability: 'Fully Online',
    turnaroundTime: 'Instant (Digital Certificate)',
    officialFee: 'Free of Cost (Zero official fee)',
    requiredDocuments: [
      'Aadhaar Card of Entrepreneur',
      'PAN Card (mandatory for business entities)',
      'Bank Account details with IFSC',
      'GSTIN (if applicable under turnover rules)'
    ],
    applicationSteps: [
      'Visit udyamregistration.gov.in',
      'Authenticate Aadhaar via OTP',
      'Fill in enterprise name, unit location, and NIC business code',
      'Receive instant Udyam Registration Certificate with dynamic QR code'
    ],
    officialUrl: 'https://udyamregistration.gov.in',
    serviceCount: 16
  },
  {
    id: 'srv-pmay-survey',
    title: 'PMAY Housing Beneficiary Verification & Site Survey',
    category: 'Housing',
    department: 'Housing Board & Directorate of Municipal Administration',
    shortDescription: 'Request municipal geotagged inspection of residential site for PMAY pucca house subsidy installment release.',
    detailedDescription: 'Required for validation of foundation, lintel, and roof levels to trigger stage-wise Direct Benefit Transfer credits into beneficiary bank accounts.',
    onlineAvailability: 'Hybrid (Apply Online / Biometrics in Center)',
    turnaroundTime: '7 to 10 Working Days',
    officialFee: 'Free of Cost',
    requiredDocuments: [
      'PMAY Beneficiary Registration ID',
      'Site Allotment / Ownership Title Deed',
      'Aadhaar Card of Female Household Head',
      'Geotagged photos of foundation / plinth level'
    ],
    applicationSteps: [
      'Login to PMAY-Urban / PMAY-Gramin state portal',
      'Request milestone inspection with progress photograph',
      'Municipal field surveyor conducts on-site GPS verification',
      'Subsidy installment released directly to bank account'
    ],
    officialUrl: 'https://pmaymis.gov.in',
    serviceCount: 9
  },
  {
    id: 'srv-police-pcc',
    title: 'Police Verification Certificate (PCC & Tenant Clearance)',
    category: 'Public Safety',
    department: 'State Police Department / Criminal Investigation Department',
    shortDescription: 'Obtain statutory police character certificate for employment, passport clearance, or tenant lease agreements.',
    detailedDescription: 'Digitally verified non-involvement in criminal proceedings issued by the District Superintendent of Police or Commissionerate.',
    onlineAvailability: 'Fully Online',
    turnaroundTime: '7 to 14 Working Days',
    officialFee: '₹250 (Official government fee)',
    requiredDocuments: [
      'Aadhaar Card / Voter ID',
      'Address Proof of Residence in jurisdiction',
      'Passport size digital photo',
      'Affidavit of no pending criminal FIRs'
    ],
    applicationSteps: [
      'Submit application on State Police Citizen Portal',
      'Local Beat Police Constable conducts address verification',
      'Assistant Commissioner / DSP authorizes digital certificate',
      'Download PCC with verifiable barcode seal'
    ],
    officialUrl: 'https://digitalpolice.gov.in',
    serviceCount: 8
  },
  {
    id: 'srv-pension-dbt',
    title: 'Senior Citizen & Widow Social Security Pension Mandate',
    category: 'Social Welfare',
    department: 'Directorate of Social Security and Pensions',
    shortDescription: 'Enroll for monthly direct bank transfer allowance for destitute senior citizens, widows, and physically challenged persons.',
    detailedDescription: 'Guarantees regular monthly subsistence pension directly credited to Aadhaar-seeded bank accounts under Sandhya Suraksha / IGNOAPS.',
    onlineAvailability: 'Hybrid (Apply Online / Biometrics in Center)',
    turnaroundTime: '15 to 21 Working Days',
    officialFee: 'Free of Cost',
    requiredDocuments: [
      'Aadhaar Card proving age (60+ for seniors)',
      'Income & Asset Certificate (< ₹50,000 annual limit)',
      'Bank Account Passbook with NPCI Aadhaar link',
      'Death Certificate of Spouse (for widow pension)'
    ],
    applicationSteps: [
      'Submit request at Grama One, Bangalore One, or Taluk Office',
      'Village Accountant confirms economic status',
      'Tahsildar sanctions Pension Payment Order (PPO)',
      'Monthly DBT credited on the 1st of every month'
    ],
    officialUrl: 'https://nsap.nic.in',
    serviceCount: 17
  }
];

export const GOV_OFFICES_DATA: GovOffice[] = [
  {
    id: 'off-1',
    name: 'Mandya Taluk Administrative Office (Mini Vidhana Soudha)',
    category: 'Taluk Office',
    address: 'Court Road, Subhash Nagar, Mandya, Karnataka 571401',
    district: 'Mandya',
    state: 'Karnataka',
    contactNumber: '+91 82322 24500',
    email: 'tahsildar-mnd@karnataka.gov.in',
    timings: '10:00 AM – 05:30 PM',
    workingDays: 'Monday to Saturday (Except 2nd & 4th Sat)',
    distanceKm: 2.3,
    latitude: 12.5238,
    longitude: 76.8953,
    servicesProvided: ['Pahani RTC Mutation', 'Income & Caste Certificates', 'Election Voter ID', 'Disaster Relief']
  },
  {
    id: 'off-2',
    name: 'Mandya Central CSC Grama One / Seva Kendra',
    category: 'Seva Kendra',
    address: 'Near Old Bus Stand, Market Circle, Mandya, Karnataka 571401',
    district: 'Mandya',
    state: 'Karnataka',
    contactNumber: '+91 94480 12345',
    email: 'gramaone-mnd@csc.gov.in',
    timings: '09:00 AM – 07:00 PM',
    workingDays: 'Monday to Sunday',
    distanceKm: 1.1,
    latitude: 12.5270,
    longitude: 76.8980,
    servicesProvided: ['Aadhaar e-KYC', 'PM-KISAN Biometrics', 'Ayushman PVC Card Print', 'Ration Card Member Addition']
  },
  {
    id: 'off-3',
    name: 'Mandya District Government Hospital & Ayushman Mitra Desk',
    category: 'Hospital',
    address: 'Bangalore-Mysore Highway, Mandya, Karnataka 571401',
    district: 'Mandya',
    state: 'Karnataka',
    contactNumber: '+91 82322 22222',
    email: 'dsho-mnd@karnataka.gov.in',
    timings: '24 Hours Emergency / OPD: 09:00 AM – 04:00 PM',
    workingDays: 'All 7 Days',
    distanceKm: 3.5,
    latitude: 12.5320,
    longitude: 76.9020,
    servicesProvided: ['Ayushman Bharat Cashless Desk', 'Maternity & Janani Suraksha', 'Free Dialysis', 'Jan Aushadhi Kendra']
  },
  {
    id: 'off-4',
    name: 'Regional Transport Office (RTO KA-11)',
    category: 'RTO',
    address: 'Induvalu Industrial Area, Mysore Road, Mandya 571401',
    district: 'Mandya',
    state: 'Karnataka',
    contactNumber: '+91 82322 23411',
    email: 'rto-ka11@karnataka.gov.in',
    timings: '10:00 AM – 05:00 PM',
    workingDays: 'Monday to Friday',
    distanceKm: 4.8,
    latitude: 12.5110,
    longitude: 76.8820,
    servicesProvided: ['Driving License Driving Test', 'Vehicle Fitness Certificate', 'RC Transfer & Hypothecation', 'High Security Plates']
  }
];

export const SAMPLE_APPLICATIONS: CitizenApplication[] = [
  {
    id: 'app-101',
    applicationNumber: 'CIVI-PMK-2026-9901',
    schemeOrServiceName: 'PM Kisan Samman Nidhi Yojana',
    category: 'Agriculture',
    appliedDate: '2026-08-14',
    lastUpdated: '2026-09-18',
    currentStep: 4,
    totalSteps: 5,
    status: 'Under Verification',
    department: 'Ministry of Agriculture',
    estimatedCompletion: '2026-09-25'
  },
  {
    id: 'app-102',
    applicationNumber: 'CIVI-AYU-2026-4412',
    schemeOrServiceName: 'Ayushman Bharat PM-JAY Golden Card',
    category: 'Healthcare',
    appliedDate: '2026-09-02',
    lastUpdated: '2026-09-03',
    currentStep: 4,
    totalSteps: 4,
    status: 'Approved',
    department: 'National Health Authority',
    estimatedCompletion: 'Completed'
  },
  {
    id: 'app-103',
    applicationNumber: 'CIVI-INC-2026-1189',
    schemeOrServiceName: 'Income & Asset Certificate (Tehsildar)',
    category: 'Documents',
    appliedDate: '2026-09-10',
    lastUpdated: '2026-09-15',
    currentStep: 2,
    totalSteps: 4,
    status: 'Action Required',
    department: 'Mandya Taluk Revenue Office',
    actionRequiredNote: 'Please re-upload clear electricity bill scan with visible consumer RR number.',
    estimatedCompletion: '2026-09-28'
  }
];

export const SAMPLE_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'application_update',
    title: 'Action Required on Income Certificate',
    message: 'Revenue inspector requested a clearer copy of your electricity bill for application #CIVI-INC-2026-1189.',
    timestamp: '10 mins ago',
    isRead: false,
    actionUrl: '/applications',
    priority: 'high'
  },
  {
    id: 'notif-2',
    type: 'scheme_deadline',
    title: 'National Scholarship Deadline Approaching',
    message: 'Post-Matric Scholarship portal closes in 41 days. Submit college bonafide to lock your application.',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: '/schemes',
    priority: 'high'
  },
  {
    id: 'notif-3',
    type: 'civiai_recommendation',
    title: 'New Scheme Match: PM Surya Ghar',
    message: 'Based on your Mandya home ownership profile, you are eligible for up to ₹78,000 solar subsidy.',
    timestamp: 'Yesterday',
    isRead: true,
    actionUrl: '/schemes',
    priority: 'normal'
  },
  {
    id: 'notif-4',
    type: 'local_announcement',
    title: 'Special Aadhaar & Seva Camp this Saturday',
    message: 'Mandya Mini Vidhana Soudha will host a free biometric update camp from 9 AM to 4 PM.',
    timestamp: '2 days ago',
    isRead: true,
    actionUrl: '/map',
    priority: 'normal'
  }
];

export const ADMIN_METRICS: AdminMetric[] = [
  {
    title: 'Total Citizens Onboarded',
    value: '1,428,910',
    change: '+14.2%',
    isPositive: true,
    subtext: 'verified via Aadhaar & DigiLocker'
  },
  {
    title: 'Active Welfare Schemes',
    value: '384',
    change: '+8',
    isPositive: true,
    subtext: 'across Central & 28 State Govts'
  },
  {
    title: 'AI Civic Queries Answered',
    value: '4,892,104',
    change: '+28.6%',
    isPositive: true,
    subtext: 'average response latency 420ms'
  },
  {
    title: 'Direct Benefits Disbursed',
    value: '₹842.6 Cr',
    change: '+19.1%',
    isPositive: true,
    subtext: 'processed through zero-leakage DBT'
  }
];
