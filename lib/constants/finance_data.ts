// src/lib/constants/finance_data.ts

export const paymentBanks = [
  { bankId: 1, bankName: "Fidelity" },
  { bankId: 2, bankName: "First Bank" },
  { bankId: 3, bankName: "GTB" },
  { bankId: 4, bankName: "Polaris" },
  { bankId: 5, bankName: "Umuchinemerem" },
  { bankId: 6, bankName: "UBA" },
  { bankId: 7, bankName: "Zenith" },
  { bankId: 8, bankName: "Etranzact Offline Uploading" },
  { bankId: 9, bankName: "Remita Offline Uploading" },
];

// Based on GOUNI 2025/2026 Session Fees Structure
export const feeStructure = {
  tuition: {
    "Computer Science": 1220000,
    "Medicine and Surgery": 4600000,
    "Nursing Sciences": 1902000,
    "Juris & Int'l Law": 1700000,
    "Public Law": 1700000,
    "Private & Biz Law": 1700000,
    Accounting: 750000,
    Economics: 750000,
    "Mass Communications": 770000,
    Microbiology: 820000,
    Architecture: 870000,
    Default: 631200, // Base for Education/Arts
  },
  otherFees: [
    { id: "ict", name: "Online Course Reg/ICT Fee", amount: 60000 },
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
    { id: "parents_forum", name: "Parents' Forum Fee", amount: 10000 },
    { id: "library", name: "Library Fee", amount: 20000 },
    { id: "medical", name: "Medical and Drug Test Fee", amount: 10000 },
    { id: "sports", name: "Sports Levy", amount: 5000 },
    { id: "sanitation", name: "Sanitation", amount: 3000 },
  ],
};

export const getTuitionFee = (prog: string) => {
  return (
    feeStructure.tuition[prog as keyof typeof feeStructure.tuition] ||
    feeStructure.tuition["Default"]
  );
};
