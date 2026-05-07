// src/lib/constants/finance_data.ts

export const paymentBanks = [
  // Commercial Banks
  { bankId: 1, bankName: "Access Bank" },
  { bankId: 2, bankName: "Citibank Nigeria" },
  { bankId: 3, bankName: "Ecobank Nigeria" },
  { bankId: 4, bankName: "Fidelity Bank" },
  { bankId: 5, bankName: "First Bank of Nigeria" },
  { bankId: 6, bankName: "First City Monument Bank (FCMB)" },
  { bankId: 7, bankName: "Globus Bank" },
  { bankId: 8, bankName: "Guaranty Trust Bank (GTB)" },
  { bankId: 9, bankName: "Heritage Bank" },
  { bankId: 10, bankName: "Jaiz Bank" },
  { bankId: 11, bankName: "Keystone Bank" },
  { bankId: 12, bankName: "Parallex Bank" },
  { bankId: 13, bankName: "Polaris Bank" },
  { bankId: 14, bankName: "Premium Trust Bank" },
  { bankId: 15, bankName: "Providus Bank" },
  { bankId: 16, bankName: "Stanbic IBTC Bank" },
  { bankId: 17, bankName: "Standard Chartered Bank" },
  { bankId: 18, bankName: "Sterling Bank" },
  { bankId: 19, bankName: "SunTrust Bank" },
  { bankId: 20, bankName: "TAJBank" },
  { bankId: 21, bankName: "Titan Trust Bank" },
  { bankId: 22, bankName: "Union Bank of Nigeria" },
  { bankId: 23, bankName: "United Bank for Africa (UBA)" },
  { bankId: 24, bankName: "Unity Bank" },
  { bankId: 25, bankName: "Wema Bank" },
  { bankId: 26, bankName: "Zenith Bank" },
  { bankId: 27, bankName: "Coronation Bank" },
  // Microfinance / Local
  { bankId: 28, bankName: "Umuchinemerem Microfinance Bank" },
  { bankId: 29, bankName: "Lapo Microfinance Bank" },
  { bankId: 30, bankName: "Mutual Trust Microfinance Bank" },
  { bankId: 31, bankName: "AB Microfinance Bank" },
  // Fintech / Mobile Money
  { bankId: 32, bankName: "Kuda Bank" },
  { bankId: 33, bankName: "Moniepoint" },
  { bankId: 34, bankName: "OPay" },
  { bankId: 35, bankName: "PalmPay" },
  { bankId: 36, bankName: "VFD Microfinance Bank" },
  // Offline Upload Channels
  { bankId: 37, bankName: "Etranzact Offline Uploading" },
  { bankId: 38, bankName: "Remita Offline Uploading" },
];

// Based on GOUNI 2025/2026 Session Fees Structure
export const feeStructure = {
  tuition: {
    // COLLEGE OF MEDICINE
    "Medicine & Surgery": 4600000,
    "Nursing Sciences": 1902000,
    // FACULTY OF LAW
    Law: 1700000,
    // FACULTY OF MANAGEMENT AND SOCIAL SCIENCES
    Accounting: 750000,
    // FACULTY OF COMPUTING AND INFORMATION TECHNOLOGY (FACIT)
    "Computer Science": 1220000,
    "Software Engineering": 1220000,
    Cybersecurity: 1220000,
    "Data Science": 1220000,
    // Fallback for programmes not yet in the fee table
    Default: 631200,
  },

  otherFees: [
    // MANDATORY
    { id: "ict", name: "Online Course Registration / ICT Fee", amount: 60000 },
    {
      id: "acceptance",
      name: "Acceptance Fee",
      amount: 30000,
      restrictLevel: "100L",
    },
    {
      id: "matric",
      name: "Matriculation Fee",
      amount: 20000,
      restrictLevel: "100L",
    },
    { id: "faculty", name: "Faculty Fee", amount: 5000 },
    { id: "departmental", name: "Departmental Fee", amount: 3000 },
    { id: "bazaar", name: "Bazaar Levy", amount: 1000 },
    { id: "parents_forum", name: "Parents' Forum Fee", amount: 10000 },
    { id: "sports", name: "Sports Levy", amount: 5000 },
    { id: "library", name: "Library Fee", amount: 20000 },
    { id: "medical", name: "Medical and Drug Test Fee", amount: null },
    { id: "sanitation", name: "Sanitation Fee", amount: 3000 },
    { id: "entrepreneurship", name: "Entrepreneurship Fee", amount: 7000 },
    { id: "publication", name: "Publication Fee", amount: 5000 },
    { id: "health_insurance", name: "Health Insurance", amount: 5000 },
    { id: "community_service", name: "Community Service Levy", amount: null },
    { id: "id_card", name: "ID Card Fee", amount: 3500 },
    { id: "student_affairs", name: "Student Affairs Fee", amount: null },
    { id: "cohon", name: "COHON Fee", amount: 4000 },
    { id: "prayer_book", name: "Prayer Book Fee", amount: null },
    // SPECIALIZED
    { id: "it_siwes", name: "IT / SIWES Fee", amount: null },
    { id: "project_levy", name: "Project Levy", amount: null },
    { id: "regularisation", name: "Regularisation Fee", amount: null },
    { id: "external_examiner", name: "External Examiner Fee", amount: null },
    { id: "plagiarism", name: "Plagiarism Test Fee", amount: null },
    { id: "goumsa", name: "GOUMSA Fee", amount: null },
    { id: "nisonmg", name: "NISONMG (Games) Fee", amount: null },
    { id: "nmc_booklet", name: "N&MC Schedule Booklet", amount: null },
    { id: "procedure_booklet", name: "Procedure Booklet", amount: null },
    { id: "nursing_exam", name: "Nursing Examination Fee", amount: null },
    { id: "dept_file", name: "Departmental File", amount: 3000 },
    {
      id: "nacos",
      name: "Nigeria Association of Computing Students (NACOS)",
      amount: null,
    },
    {
      id: "app_form_ug",
      name: "Undergraduate Full Time Application Form",
      amount: null,
    },
    {
      id: "app_form_jupeb",
      name: "JUPEB Full Time Application Form",
      amount: null,
    },
    {
      id: "app_form_pg",
      name: "Postgraduate Full Time Application Form",
      amount: null,
    },
    {
      id: "app_form_hnd",
      name: "HND Part Time Application Form",
      amount: null,
    },
    { id: "nursing_app", name: "Nursing Application Form Fee", amount: null },
    { id: "aptech", name: "Aptech Fee", amount: null },
    { id: "caution", name: "Caution Fee", amount: null },
    // PROFESSIONAL
    { id: "laboratory", name: "Laboratory Fee", amount: null },
    { id: "gccp", name: "GCCP Fee", amount: null },
    { id: "gotech", name: "GOTECH Entrepreneurship Fee", amount: 7000 },
    { id: "upsilon_gotech", name: "Upsilon Fee (GoTech)", amount: null },
    { id: "dnalc", name: "DNALC Fee", amount: null },
    { id: "ican_ats", name: "ICAN ATS Fee", amount: null },
    { id: "nuasa", name: "NUASA Fee", amount: null },
    // OTHER
    { id: "transfer", name: "Transfer Fee", amount: null },
  ],
};

export const getTuitionFee = (prog: string) => {
  return (
    feeStructure.tuition[prog as keyof typeof feeStructure.tuition] ||
    feeStructure.tuition["Default"]
  );
};
