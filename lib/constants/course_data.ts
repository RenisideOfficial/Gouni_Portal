// src/lib/constants/course_data.ts

export const courseMapping: Record<
  string,
  Record<string, Record<string, any[]>>
> = {
  "Computer Science": {
    "100L": {
      "1st Semester": [
        {
          code: "CSC 101",
          title: "Introduction to Computer Science",
          units: 3,
        },
        { code: "MTH 101", title: "Elementary Mathematics I", units: 3 },
        { code: "GST 101", title: "Use of English I", units: 2 },
        { code: "PHY 101", title: "General Physics I", units: 3 },
        {
          code: "GST 103",
          title: "Logic, Philosophy & Human Existence",
          units: 2,
        },
        {
          code: "CSC 103",
          title: "Computer Appreciation & Applications",
          units: 2,
        },
      ],
      "2nd Semester": [
        { code: "CSC 102", title: "Introduction to Problem Solving", units: 3 },
        { code: "MTH 102", title: "Elementary Mathematics II", units: 3 },
        { code: "GST 102", title: "Philosophy & Human Existence", units: 2 },
        { code: "PHY 102", title: "General Physics II", units: 3 },
        { code: "GST 104", title: "Nigerian Peoples & Culture", units: 2 },
        { code: "CSC 104", title: "Web Design Fundamentals", units: 2 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "CSC 201", title: "Discrete Mathematics", units: 3 },
        { code: "CSC 203", title: "Object-Oriented Programming I", units: 3 },
        { code: "MTH 201", title: "Linear Algebra I", units: 3 },
        { code: "CSC 205", title: "Digital Logic Design", units: 3 },
        { code: "STA 201", title: "Probability & Statistics I", units: 3 },
      ],
      "2nd Semester": [
        { code: "CSC 202", title: "Data Structures", units: 3 },
        { code: "CSC 204", title: "Object-Oriented Programming II", units: 3 },
        {
          code: "CSC 206",
          title: "Computer Organization & Architecture",
          units: 3,
        },
        { code: "MTH 202", title: "Linear Algebra II", units: 2 },
        { code: "GST 202", title: "Peace & Conflict Resolution", units: 2 },
      ],
    },
    "300L": {
      "1st Semester": [
        { code: "CSC 301", title: "Database Management Systems I", units: 3 },
        { code: "CSC 303", title: "Operating Systems I", units: 3 },
        { code: "CSC 305", title: "Software Engineering I", units: 3 },
        { code: "CSC 307", title: "Human-Computer Interaction", units: 3 },
        { code: "CSC 309", title: "Numerical Methods", units: 3 },
      ],
      "2nd Semester": [
        { code: "CSC 302", title: "Database Management Systems II", units: 3 },
        { code: "CSC 304", title: "Operating Systems II", units: 3 },
        { code: "CSC 306", title: "Computer Networks", units: 3 },
        { code: "CSC 308", title: "System Analysis & Design", units: 3 },
        {
          code: "CSC 310",
          title: "Professional Ethics in Computing",
          units: 2,
        },
        { code: "ENT 302", title: "Entrepreneurship", units: 2 },
      ],
    },
    "400L": {
      "1st Semester": [
        { code: "CSC 401", title: "Data Structures & Algorithms", units: 3 },
        { code: "CSC 405", title: "Artificial Intelligence", units: 3 },
        { code: "CSC 421", title: "Net-Centric Computing", units: 3 },
        { code: "CSC 411", title: "Project Management", units: 2 },
        { code: "CSC 415", title: "Cyber Security", units: 3 },
      ],
      "2nd Semester": [
        { code: "CSC 499", title: "Final Year Project", units: 6 },
        { code: "CSC 402", title: "Compiler Construction", units: 3 },
        { code: "CSC 406", title: "Machine Learning", units: 3 },
        { code: "CSC 408", title: "Ethical Hacking", units: 3 },
        { code: "CSC 410", title: "Cloud Computing", units: 3 },
      ],
    },
  },
  "Nursing Sciences": {
    "100L": {
      "1st Semester": [
        { code: "NUR 101", title: "Introduction to Nursing", units: 3 },
        { code: "BIO 101", title: "General Biology I", units: 3 },
        { code: "CHM 101", title: "General Chemistry I", units: 3 },
        { code: "PHY 101", title: "General Physics I", units: 3 },
        { code: "PSY 101", title: "Introduction to Psychology", units: 2 },
        { code: "GST 101", title: "Use of English I", units: 2 },
      ],
      "2nd Semester": [
        { code: "NUR 102", title: "Foundations of Nursing Practice", units: 3 },
        { code: "BIO 102", title: "General Biology II", units: 3 },
        { code: "CHM 102", title: "General Chemistry II", units: 3 },
        { code: "SOC 102", title: "Introduction to Sociology", units: 2 },
        { code: "ANA 102", title: "Human Anatomy I", units: 3 },
        { code: "GST 102", title: "Philosophy & Human Existence", units: 2 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "NUR 201", title: "Health Assessment", units: 3 },
        { code: "NUR 203", title: "Medical-Surgical Nursing I", units: 3 },
        { code: "PHS 201", title: "Physiology I", units: 3 },
        { code: "MIC 201", title: "Microbiology & Parasitology", units: 3 },
        { code: "NUT 201", title: "Nutrition & Dietetics", units: 2 },
        { code: "GST 203", title: "Logic & Critical Thinking", units: 2 },
      ],
      "2nd Semester": [
        { code: "NUR 202", title: "Medical-Surgical Nursing II", units: 3 },
        { code: "NUR 204", title: "Pharmacology for Nurses", units: 3 },
        { code: "NUR 206", title: "Community Health Nursing I", units: 3 },
        { code: "PHS 202", title: "Physiology II", units: 3 },
        { code: "PAT 202", title: "Pathophysiology", units: 3 },
        { code: "GST 204", title: "Entrepreneurship", units: 2 },
      ],
    },
    "300L": {
      "1st Semester": [
        { code: "NUR 301", title: "Maternal & Child Health Nursing", units: 4 },
        { code: "NUR 303", title: "Psychiatric Nursing", units: 3 },
        { code: "NUR 305", title: "Research Methodology", units: 3 },
        { code: "NUR 307", title: "Nursing Informatics", units: 2 },
        { code: "NUR 309", title: "Community Health Nursing II", units: 3 },
      ],
      "2nd Semester": [
        { code: "NUR 302", title: "Pediatric Nursing", units: 3 },
        {
          code: "NUR 304",
          title: "Leadership & Management in Nursing",
          units: 3,
        },
        { code: "NUR 306", title: "Emergency & Disaster Nursing", units: 3 },
        { code: "NUR 308", title: "Nursing Ethics & Jurisprudence", units: 2 },
        { code: "NUR 310", title: "Gerontologic Nursing", units: 2 },
        {
          code: "SIWES 300",
          title: "Students' Industrial Work Scheme",
          units: 3,
        },
      ],
    },
    "400L": {
      "1st Semester": [
        {
          code: "NUR 401",
          title: "Advanced Medical-Surgical Nursing",
          units: 4,
        },
        { code: "NUR 403", title: "Critical Care Nursing", units: 3 },
        { code: "NUR 405", title: "Oncology Nursing", units: 2 },
        { code: "NUR 407", title: "Health Policy & Economics", units: 2 },
      ],
      "2nd Semester": [
        { code: "NUR 499", title: "Nursing Project", units: 6 },
        { code: "NUR 402", title: "Community Health Nursing III", units: 3 },
        { code: "NUR 404", title: "Nursing Education", units: 3 },
        { code: "NUR 406", title: "Palliative Care", units: 2 },
        { code: "NUR 408", title: "Trends & Issues in Nursing", units: 2 },
      ],
    },
  },
  Accounting: {
    "100L": {
      "1st Semester": [
        {
          code: "ACC 101",
          title: "Introduction to Financial Accounting",
          units: 3,
        },
        { code: "ECO 101", title: "Principles of Economics I", units: 3 },
        { code: "BUS 101", title: "Introduction to Business", units: 2 },
        { code: "MTH 101", title: "Elementary Mathematics I", units: 3 },
        { code: "GST 101", title: "Use of English I", units: 2 },
        {
          code: "GST 103",
          title: "Logic, Philosophy & Human Existence",
          units: 2,
        },
      ],
      "2nd Semester": [
        { code: "ACC 102", title: "Financial Accounting I", units: 3 },
        { code: "ECO 102", title: "Principles of Economics II", units: 3 },
        { code: "BUS 102", title: "Business Communication", units: 2 },
        { code: "MTH 102", title: "Elementary Mathematics II", units: 3 },
        { code: "GST 102", title: "Nigerian Peoples & Culture", units: 2 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "ACC 201", title: "Financial Accounting II", units: 3 },
        { code: "ACC 203", title: "Cost Accounting", units: 3 },
        { code: "BUS 201", title: "Principles of Management", units: 3 },
        { code: "ECO 201", title: "Microeconomics", units: 3 },
        { code: "STA 201", title: "Business Statistics", units: 3 },
        { code: "GST 201", title: "Peace & Conflict Resolution", units: 2 },
      ],
      "2nd Semester": [
        { code: "ACC 202", title: "Financial Accounting III", units: 3 },
        { code: "ACC 204", title: "Management Accounting I", units: 3 },
        { code: "BUS 202", title: "Business Law I", units: 3 },
        { code: "ECO 202", title: "Macroeconomics", units: 3 },
        { code: "ACC 206", title: "Accounting Information Systems", units: 3 },
        { code: "ENT 202", title: "Entrepreneurship", units: 2 },
      ],
    },
    "300L": {
      "1st Semester": [
        { code: "ACC 301", title: "Corporate Financial Reporting I", units: 3 },
        { code: "ACC 303", title: "Management Accounting II", units: 3 },
        { code: "ACC 305", title: "Public Sector Accounting", units: 3 },
        { code: "FIN 301", title: "Business Finance I", units: 3 },
        { code: "LAW 301", title: "Company Law", units: 3 },
      ],
      "2nd Semester": [
        {
          code: "ACC 302",
          title: "Corporate Financial Reporting II",
          units: 3,
        },
        { code: "ACC 304", title: "Taxation I", units: 3 },
        { code: "ACC 306", title: "Auditing & Assurance I", units: 3 },
        { code: "FIN 302", title: "Business Finance II", units: 3 },
        { code: "ACC 308", title: "Advanced Management Accounting", units: 3 },
      ],
    },
    "400L": {
      "1st Semester": [
        { code: "ACC 401", title: "Advanced Financial Accounting", units: 3 },
        { code: "ACC 403", title: "Taxation II", units: 3 },
        { code: "ACC 405", title: "Auditing & Assurance II", units: 3 },
        { code: "ACC 407", title: "International Accounting", units: 3 },
        { code: "ACC 409", title: "Forensic Accounting", units: 2 },
      ],
      "2nd Semester": [
        { code: "ACC 499", title: "Accounting Project", units: 6 },
        { code: "ACC 402", title: "Strategic Financial Management", units: 3 },
        { code: "ACC 404", title: "Accounting Theory & Practice", units: 3 },
        { code: "ACC 406", title: "Financial Statement Analysis", units: 3 },
        { code: "ACC 408", title: "Ethics & Governance", units: 2 },
      ],
    },
  },
  Economics: {
    "100L": {
      "1st Semester": [
        { code: "ECO 101", title: "Principles of Economics I", units: 3 },
        {
          code: "ACC 101",
          title: "Introduction to Financial Accounting",
          units: 3,
        },
        { code: "MTH 101", title: "Elementary Mathematics I", units: 3 },
        { code: "GST 101", title: "Use of English I", units: 2 },
        {
          code: "GST 103",
          title: "Logic, Philosophy & Human Existence",
          units: 2,
        },
      ],
      "2nd Semester": [
        { code: "ECO 102", title: "Principles of Economics II", units: 3 },
        { code: "STA 102", title: "Introduction to Statistics", units: 3 },
        { code: "MTH 102", title: "Elementary Mathematics II", units: 3 },
        { code: "GST 102", title: "Nigerian Peoples & Culture", units: 2 },
        { code: "BUS 102", title: "Introduction to Business", units: 2 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "ECO 201", title: "Microeconomics I", units: 3 },
        { code: "ECO 203", title: "Mathematics for Economists I", units: 3 },
        { code: "STA 201", title: "Statistical Methods I", units: 3 },
        { code: "ACC 201", title: "Financial Accounting I", units: 3 },
        { code: "GST 201", title: "Peace & Conflict Resolution", units: 2 },
      ],
      "2nd Semester": [
        { code: "ECO 202", title: "Macroeconomics I", units: 3 },
        { code: "ECO 204", title: "Mathematics for Economists II", units: 3 },
        { code: "STA 202", title: "Statistical Methods II", units: 3 },
        { code: "ECO 206", title: "History of Economic Thought", units: 2 },
        { code: "ENT 202", title: "Entrepreneurship", units: 2 },
      ],
    },
    "300L": {
      "1st Semester": [
        { code: "ECO 301", title: "Microeconomics II", units: 3 },
        { code: "ECO 303", title: "Macroeconomics II", units: 3 },
        { code: "ECO 305", title: "Econometrics I", units: 3 },
        { code: "ECO 307", title: "Public Finance", units: 3 },
        { code: "ECO 309", title: "Development Economics", units: 3 },
      ],
      "2nd Semester": [
        { code: "ECO 302", title: "International Economics", units: 3 },
        { code: "ECO 304", title: "Monetary Economics", units: 3 },
        { code: "ECO 306", title: "Econometrics II", units: 3 },
        { code: "ECO 308", title: "Labour Economics", units: 3 },
        { code: "ECO 310", title: "Nigerian Economic Structure", units: 2 },
      ],
    },
    "400L": {
      "1st Semester": [
        { code: "ECO 401", title: "Advanced Microeconomics", units: 3 },
        { code: "ECO 403", title: "Advanced Macroeconomics", units: 3 },
        { code: "ECO 405", title: "Project Evaluation", units: 3 },
        { code: "ECO 407", title: "Agricultural Economics", units: 3 },
        { code: "ECO 409", title: "Health Economics", units: 2 },
      ],
      "2nd Semester": [
        { code: "ECO 499", title: "Economics Research Project", units: 6 },
        { code: "ECO 402", title: "Political Economy", units: 3 },
        { code: "ECO 404", title: "Environmental Economics", units: 3 },
        { code: "ECO 406", title: "Financial Economics", units: 3 },
      ],
    },
  },
  "Mass Communications": {
    "100L": {
      "1st Semester": [
        {
          code: "MAC 101",
          title: "Introduction to Mass Communication",
          units: 3,
        },
        { code: "MAC 103", title: "Elements of Journalism", units: 3 },
        { code: "GST 101", title: "Use of English I", units: 2 },
        { code: "GST 103", title: "Logic & Philosophy", units: 2 },
        { code: "SOC 101", title: "Introduction to Sociology", units: 3 },
        {
          code: "POL 101",
          title: "Introduction to Political Science",
          units: 3,
        },
      ],
      "2nd Semester": [
        { code: "MAC 102", title: "History of Mass Media", units: 3 },
        { code: "MAC 104", title: "Media Literacy", units: 3 },
        { code: "GST 102", title: "Nigerian Peoples & Culture", units: 2 },
        { code: "PSY 102", title: "Introduction to Psychology", units: 2 },
        { code: "MAC 106", title: "News Writing & Reporting I", units: 3 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "MAC 201", title: "News Writing & Reporting II", units: 3 },
        { code: "MAC 203", title: "Principles of Public Relations", units: 3 },
        { code: "MAC 205", title: "Media Law & Ethics", units: 3 },
        { code: "MAC 207", title: "Print Media Production", units: 3 },
        { code: "GST 201", title: "Peace & Conflict Resolution", units: 2 },
      ],
      "2nd Semester": [
        { code: "MAC 202", title: "Broadcast Journalism", units: 3 },
        { code: "MAC 204", title: "Advertising Principles", units: 3 },
        { code: "MAC 206", title: "Media Research Methods", units: 3 },
        { code: "MAC 208", title: "Photojournalism", units: 2 },
        { code: "ENT 202", title: "Entrepreneurship", units: 2 },
      ],
    },
    "300L": {
      "1st Semester": [
        { code: "MAC 301", title: "Feature Writing", units: 3 },
        { code: "MAC 303", title: "Radio Production", units: 3 },
        { code: "MAC 305", title: "Media Management", units: 3 },
        { code: "MAC 307", title: "Development Communication", units: 3 },
        { code: "MAC 309", title: "Online Journalism", units: 3 },
      ],
      "2nd Semester": [
        { code: "MAC 302", title: "TV Production", units: 3 },
        { code: "MAC 304", title: "Corporate Communication", units: 3 },
        { code: "MAC 306", title: "Media & Society", units: 3 },
        { code: "MAC 308", title: "Crisis Communication", units: 2 },
        { code: "SIWES 300", title: "Industrial Training", units: 3 },
      ],
    },
    "400L": {
      "1st Semester": [
        { code: "MAC 401", title: "Advanced Public Relations", units: 3 },
        { code: "MAC 403", title: "International Communication", units: 3 },
        { code: "MAC 405", title: "Political Communication", units: 3 },
        { code: "MAC 407", title: "Media & Gender", units: 2 },
      ],
      "2nd Semester": [
        { code: "MAC 499", title: "Mass Comm Project", units: 6 },
        { code: "MAC 402", title: "Media & Conflict Resolution", units: 3 },
        { code: "MAC 404", title: "Digital Media Strategies", units: 3 },
        { code: "MAC 406", title: "Investigative Journalism", units: 3 },
      ],
    },
  },
  "Applied Biology": {
    "100L": {
      "1st Semester": [
        { code: "BIO 101", title: "General Biology I", units: 3 },
        { code: "CHM 101", title: "General Chemistry I", units: 3 },
        { code: "PHY 101", title: "General Physics I", units: 3 },
        { code: "MTH 101", title: "Elementary Mathematics I", units: 3 },
        { code: "GST 101", title: "Use of English I", units: 2 },
      ],
      "2nd Semester": [
        { code: "BIO 102", title: "General Biology II", units: 3 },
        { code: "CHM 102", title: "General Chemistry II", units: 3 },
        { code: "PHY 102", title: "General Physics II", units: 3 },
        { code: "MTH 102", title: "Elementary Mathematics II", units: 3 },
        { code: "GST 102", title: "Philosophy & Human Existence", units: 2 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "BIO 201", title: "Plant Biology", units: 3 },
        { code: "BIO 203", title: "Animal Biology", units: 3 },
        { code: "BIO 205", title: "Genetics I", units: 3 },
        { code: "CHM 201", title: "Organic Chemistry I", units: 3 },
        { code: "STA 201", title: "Biostatistics", units: 3 },
      ],
      "2nd Semester": [
        { code: "BIO 202", title: "Cell Biology", units: 3 },
        { code: "BIO 204", title: "Ecology", units: 3 },
        { code: "BIO 206", title: "Introductory Microbiology", units: 3 },
        { code: "CHM 202", title: "Organic Chemistry II", units: 3 },
        { code: "GST 202", title: "Entrepreneurship", units: 2 },
      ],
    },
    "300L": {
      "1st Semester": [
        { code: "BIO 301", title: "Molecular Biology", units: 3 },
        { code: "BIO 303", title: "Applied Entomology", units: 3 },
        { code: "BIO 305", title: "Fisheries & Aquaculture", units: 3 },
        { code: "BIO 307", title: "Biochemistry I", units: 3 },
        { code: "BIO 309", title: "Environmental Biology", units: 3 },
      ],
      "2nd Semester": [
        { code: "BIO 302", title: "Plant Physiology", units: 3 },
        { code: "BIO 304", title: "Animal Physiology", units: 3 },
        { code: "BIO 306", title: "Biotechnology", units: 3 },
        { code: "BIO 308", title: "Taxonomy of Plants & Animals", units: 3 },
        { code: "SIWES 300", title: "Industrial Training", units: 3 },
      ],
    },
    "400L": {
      "1st Semester": [
        { code: "BIO 401", title: "Genetics II", units: 3 },
        { code: "BIO 403", title: "Immunology", units: 3 },
        { code: "BIO 405", title: "Conservation Biology", units: 3 },
        { code: "BIO 407", title: "Research Methods", units: 2 },
      ],
      "2nd Semester": [
        { code: "BIO 499", title: "Biology Project", units: 6 },
        { code: "BIO 402", title: "Parasitology", units: 3 },
        { code: "BIO 404", title: "Evolutionary Biology", units: 3 },
        { code: "BIO 406", title: "Toxicology", units: 3 },
      ],
    },
  },
  Biochemistry: {
    "100L": {
      "1st Semester": [
        { code: "BCH 101", title: "General Chemistry I", units: 3 },
        { code: "BIO 101", title: "General Biology I", units: 3 },
        { code: "PHY 101", title: "General Physics I", units: 3 },
        { code: "MTH 101", title: "Elementary Mathematics I", units: 3 },
        { code: "GST 101", title: "Use of English I", units: 2 },
      ],
      "2nd Semester": [
        { code: "BCH 102", title: "General Chemistry II", units: 3 },
        { code: "BIO 102", title: "General Biology II", units: 3 },
        { code: "PHY 102", title: "General Physics II", units: 3 },
        { code: "MTH 102", title: "Elementary Mathematics II", units: 3 },
        { code: "GST 102", title: "Nigerian Peoples & Culture", units: 2 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "BCH 201", title: "Organic Chemistry I", units: 3 },
        { code: "BCH 203", title: "Introductory Biochemistry", units: 3 },
        { code: "BIO 201", title: "Cell Biology", units: 3 },
        { code: "CHM 201", title: "Physical Chemistry", units: 3 },
        { code: "STA 201", title: "Biostatistics", units: 3 },
      ],
      "2nd Semester": [
        { code: "BCH 202", title: "Organic Chemistry II", units: 3 },
        { code: "BCH 204", title: "Analytical Biochemistry", units: 3 },
        { code: "BCH 206", title: "Enzymology", units: 3 },
        { code: "BIO 202", title: "Genetics", units: 3 },
        { code: "ENT 202", title: "Entrepreneurship", units: 2 },
      ],
    },
    "300L": {
      "1st Semester": [
        {
          code: "BCH 301",
          title: "Carbohydrate & Lipid Biochemistry",
          units: 3,
        },
        { code: "BCH 303", title: "Protein Chemistry", units: 3 },
        { code: "BCH 305", title: "Metabolism I", units: 3 },
        { code: "BCH 307", title: "Biophysical Chemistry", units: 3 },
        { code: "BCH 309", title: "Nutritional Biochemistry", units: 3 },
      ],
      "2nd Semester": [
        {
          code: "BCH 302",
          title: "Nucleic Acids & Molecular Biology",
          units: 3,
        },
        { code: "BCH 304", title: "Metabolism II", units: 3 },
        { code: "BCH 306", title: "Vitamins & Coenzymes", units: 3 },
        { code: "BCH 308", title: "Clinical Biochemistry", units: 3 },
        { code: "SIWES 300", title: "Industrial Training", units: 3 },
      ],
    },
    "400L": {
      "1st Semester": [
        { code: "BCH 401", title: "Advanced Enzymology", units: 3 },
        {
          code: "BCH 403",
          title: "Biotechnology & Genetic Engineering",
          units: 3,
        },
        { code: "BCH 405", title: "Hormone Biochemistry", units: 3 },
        { code: "BCH 407", title: "Toxicology", units: 3 },
      ],
      "2nd Semester": [
        { code: "BCH 499", title: "Biochemistry Project", units: 6 },
        { code: "BCH 402", title: "Advanced Molecular Biology", units: 3 },
        { code: "BCH 404", title: "Pharmaceutical Biochemistry", units: 3 },
        { code: "BCH 406", title: "Immunochemistry", units: 3 },
      ],
    },
  },
  Mathematics: {
    "100L": {
      "1st Semester": [
        { code: "MTH 101", title: "Elementary Mathematics I", units: 3 },
        { code: "MTH 103", title: "Algebra & Trigonometry", units: 3 },
        { code: "PHY 101", title: "General Physics I", units: 3 },
        { code: "GST 101", title: "Use of English I", units: 2 },
        { code: "GST 103", title: "Logic & Philosophy", units: 2 },
      ],
      "2nd Semester": [
        { code: "MTH 102", title: "Elementary Mathematics II", units: 3 },
        { code: "MTH 104", title: "Calculus I", units: 3 },
        { code: "PHY 102", title: "General Physics II", units: 3 },
        { code: "GST 102", title: "Nigerian Peoples & Culture", units: 2 },
        { code: "CSC 102", title: "Introduction to Programming", units: 2 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "MTH 201", title: "Linear Algebra I", units: 3 },
        { code: "MTH 203", title: "Calculus II", units: 3 },
        { code: "MTH 205", title: "Real Analysis I", units: 3 },
        {
          code: "MTH 207",
          title: "Ordinary Differential Equations I",
          units: 3,
        },
        { code: "STA 201", title: "Probability I", units: 3 },
      ],
      "2nd Semester": [
        { code: "MTH 202", title: "Linear Algebra II", units: 3 },
        { code: "MTH 204", title: "Vector Calculus", units: 3 },
        { code: "MTH 206", title: "Complex Analysis I", units: 3 },
        { code: "MTH 208", title: "Numerical Analysis I", units: 3 },
        { code: "ENT 202", title: "Entrepreneurship", units: 2 },
      ],
    },
    "300L": {
      "1st Semester": [
        { code: "MTH 301", title: "Real Analysis II", units: 3 },
        { code: "MTH 303", title: "Group Theory", units: 3 },
        { code: "MTH 305", title: "Partial Differential Equations", units: 3 },
        { code: "MTH 307", title: "Operations Research", units: 3 },
        { code: "MTH 309", title: "Mathematical Modeling", units: 3 },
      ],
      "2nd Semester": [
        { code: "MTH 302", title: "Topology", units: 3 },
        { code: "MTH 304", title: "Ring Theory", units: 3 },
        { code: "MTH 306", title: "Functional Analysis", units: 3 },
        { code: "MTH 308", title: "Numerical Analysis II", units: 3 },
        { code: "MTH 310", title: "Financial Mathematics", units: 3 },
      ],
    },
    "400L": {
      "1st Semester": [
        { code: "MTH 401", title: "Measure Theory", units: 3 },
        { code: "MTH 403", title: "Advanced Differential Equations", units: 3 },
        { code: "MTH 405", title: "Graph Theory", units: 3 },
        { code: "MTH 407", title: "Optimization Theory", units: 3 },
      ],
      "2nd Semester": [
        { code: "MTH 499", title: "Mathematics Project", units: 6 },
        { code: "MTH 402", title: "Stochastic Processes", units: 3 },
        { code: "MTH 404", title: "Mathematical Methods in Physics", units: 3 },
        { code: "MTH 406", title: "Cryptography", units: 3 },
      ],
    },
  },
  "English and Lit Studies": {
    "100L": {
      "1st Semester": [
        { code: "ENG 101", title: "Use of English I", units: 2 },
        { code: "ENG 103", title: "Introduction to Literature I", units: 3 },
        { code: "ENG 105", title: "Nigerian Literature I", units: 3 },
        { code: "GST 103", title: "Logic & Philosophy", units: 2 },
        { code: "HIS 101", title: "History of Africa", units: 2 },
      ],
      "2nd Semester": [
        { code: "ENG 102", title: "Use of English II", units: 2 },
        { code: "ENG 104", title: "Introduction to Literature II", units: 3 },
        { code: "ENG 106", title: "Nigerian Literature II", units: 3 },
        { code: "GST 102", title: "Nigerian Peoples & Culture", units: 2 },
        { code: "ENG 108", title: "Creative Writing I", units: 2 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "ENG 201", title: "English Poetry I", units: 3 },
        { code: "ENG 203", title: "English Drama I", units: 3 },
        { code: "ENG 205", title: "English Prose Fiction I", units: 3 },
        { code: "ENG 207", title: "Linguistics I", units: 3 },
        { code: "GST 201", title: "Peace & Conflict", units: 2 },
      ],
      "2nd Semester": [
        { code: "ENG 202", title: "English Poetry II", units: 3 },
        { code: "ENG 204", title: "English Drama II", units: 3 },
        { code: "ENG 206", title: "English Prose Fiction II", units: 3 },
        { code: "ENG 208", title: "Linguistics II", units: 3 },
        { code: "ENT 202", title: "Entrepreneurship", units: 2 },
      ],
    },
    "300L": {
      "1st Semester": [
        { code: "ENG 301", title: "Shakespeare", units: 3 },
        { code: "ENG 303", title: "American Literature", units: 3 },
        { code: "ENG 305", title: "African Poetry", units: 3 },
        { code: "ENG 307", title: "Stylistics", units: 3 },
        { code: "ENG 309", title: "Literary Theory & Criticism", units: 3 },
      ],
      "2nd Semester": [
        { code: "ENG 302", title: "Modern Poetry", units: 3 },
        { code: "ENG 304", title: "Modern Drama", units: 3 },
        { code: "ENG 306", title: "Caribbean Literature", units: 3 },
        { code: "ENG 308", title: "Sociolinguistics", units: 3 },
        { code: "ENG 310", title: "Research Methods", units: 2 },
      ],
    },
    "400L": {
      "1st Semester": [
        { code: "ENG 401", title: "Postcolonial Literature", units: 3 },
        { code: "ENG 403", title: "Women's Writing", units: 3 },
        { code: "ENG 405", title: "World Literature", units: 3 },
        { code: "ENG 407", title: "Advanced Literary Criticism", units: 3 },
      ],
      "2nd Semester": [
        { code: "ENG 499", title: "English Project", units: 6 },
        { code: "ENG 402", title: "Creative Writing II", units: 3 },
        { code: "ENG 404", title: "Film & Literature", units: 3 },
        { code: "ENG 406", title: "Publishing & Editing", units: 3 },
      ],
    },
  },
  Law: {
    "100L": {
      "1st Semester": [
        { code: "LAW 101", title: "Introduction to Law", units: 3 },
        { code: "LAW 103", title: "Legal Methods I", units: 3 },
        { code: "LAW 105", title: "Nigerian Legal System I", units: 3 },
        { code: "GST 101", title: "Use of English I", units: 2 },
        { code: "GST 103", title: "Logic & Philosophy", units: 2 },
        {
          code: "POL 101",
          title: "Introduction to Political Science",
          units: 2,
        },
      ],
      "2nd Semester": [
        { code: "LAW 102", title: "Legal Methods II", units: 3 },
        { code: "LAW 104", title: "Nigerian Legal System II", units: 3 },
        { code: "LAW 106", title: "Constitutional Law I", units: 3 },
        { code: "GST 102", title: "Nigerian Peoples & Culture", units: 2 },
        { code: "ECO 102", title: "Introduction to Economics", units: 2 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "LAW 201", title: "Constitutional Law II", units: 3 },
        { code: "LAW 203", title: "Law of Contract I", units: 3 },
        { code: "LAW 205", title: "Criminal Law I", units: 3 },
        { code: "LAW 207", title: "Legal Writing & Drafting", units: 2 },
        { code: "LAW 209", title: "Land Law I", units: 3 },
      ],
      "2nd Semester": [
        { code: "LAW 202", title: "Law of Contract II", units: 3 },
        { code: "LAW 204", title: "Criminal Law II", units: 3 },
        { code: "LAW 206", title: "Law of Torts I", units: 3 },
        { code: "LAW 208", title: "Land Law II", units: 3 },
        { code: "LAW 210", title: "Company Law I", units: 3 },
      ],
    },
    "300L": {
      "1st Semester": [
        { code: "LAW 301", title: "Law of Torts II", units: 3 },
        { code: "LAW 303", title: "Company Law II", units: 3 },
        { code: "LAW 305", title: "Commercial Law", units: 3 },
        { code: "LAW 307", title: "Evidence I", units: 3 },
        { code: "LAW 309", title: "Equity & Trusts", units: 3 },
      ],
      "2nd Semester": [
        { code: "LAW 302", title: "Evidence II", units: 3 },
        { code: "LAW 304", title: "Property Law", units: 3 },
        { code: "LAW 306", title: "Law of Banking & Insurance", units: 3 },
        { code: "LAW 308", title: "International Law I", units: 3 },
        { code: "LAW 310", title: "Jurisprudence I", units: 3 },
      ],
    },
    "400L": {
      "1st Semester": [
        { code: "LAW 401", title: "Public International Law", units: 3 },
        { code: "LAW 403", title: "Law of Taxation", units: 3 },
        { code: "LAW 405", title: "Intellectual Property Law", units: 3 },
        { code: "LAW 407", title: "Environmental Law", units: 3 },
        { code: "LAW 409", title: "Human Rights Law", units: 3 },
      ],
      "2nd Semester": [
        { code: "LAW 402", title: "Private International Law", units: 3 },
        { code: "LAW 404", title: "Administrative Law", units: 3 },
        { code: "LAW 406", title: "Labour Law", units: 3 },
        { code: "LAW 408", title: "Jurisprudence II", units: 3 },
        { code: "LAW 410", title: "Clinical Legal Education", units: 2 },
      ],
    },
    "500L": {
      "1st Semester": [
        { code: "LAW 501", title: "Law of Evidence (Advanced)", units: 3 },
        { code: "LAW 503", title: "Civil Procedure", units: 3 },
        { code: "LAW 505", title: "Criminal Procedure", units: 3 },
        {
          code: "LAW 507",
          title: "Legal Ethics & Professional Responsibility",
          units: 2,
        },
        { code: "LAW 509", title: "Moot Court I", units: 2 },
      ],
      "2nd Semester": [
        { code: "LAW 502", title: "Company Law & Practice", units: 3 },
        { code: "LAW 504", title: "Arbitration & ADR", units: 3 },
        { code: "LAW 506", title: "Law of the Sea", units: 2 },
        { code: "LAW 508", title: "Moot Court II", units: 2 },
        { code: "LAW 510", title: "Long Essay", units: 3 },
      ],
    },
  },
  "Medicine and Surgery": {
    "100L": {
      "1st Semester": [
        { code: "ANA 101", title: "Gross Anatomy I", units: 4 },
        { code: "BCH 101", title: "Medical Biochemistry I", units: 3 },
        { code: "PHY 101", title: "Medical Physics", units: 3 },
        { code: "BIO 101", title: "General Biology", units: 3 },
        { code: "GST 101", title: "Use of English I", units: 2 },
        { code: "GST 103", title: "Logic & Philosophy", units: 2 },
      ],
      "2nd Semester": [
        { code: "ANA 102", title: "Gross Anatomy II", units: 4 },
        { code: "BCH 102", title: "Medical Biochemistry II", units: 3 },
        { code: "PHS 102", title: "Physiology I", units: 3 },
        { code: "MIC 102", title: "Introductory Microbiology", units: 2 },
        { code: "GST 102", title: "Nigerian Peoples & Culture", units: 2 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "ANA 201", title: "Anatomy of the Thorax & Abdomen", units: 4 },
        { code: "PHS 201", title: "Physiology II", units: 3 },
        { code: "BCH 201", title: "Metabolic Biochemistry", units: 3 },
        { code: "PAT 201", title: "General Pathology", units: 3 },
        { code: "PHM 201", title: "Pharmacology I", units: 3 },
      ],
      "2nd Semester": [
        { code: "ANA 202", title: "Neuroanatomy", units: 4 },
        { code: "PHS 202", title: "Physiology III", units: 3 },
        { code: "BCH 202", title: "Clinical Biochemistry", units: 3 },
        { code: "PAT 202", title: "Systemic Pathology", units: 3 },
        { code: "PHM 202", title: "Pharmacology II", units: 3 },
      ],
    },
    "300L": {
      "1st Semester": [
        {
          code: "MED 301",
          title: "Introduction to Clinical Medicine",
          units: 4,
        },
        { code: "CPH 301", title: "Community Health I", units: 3 },
        {
          code: "MIC 301",
          title: "Medical Microbiology & Parasitology",
          units: 3,
        },
        { code: "FOR 301", title: "Forensic Medicine", units: 2 },
        { code: "CLS 301", title: "Clinical Skills I", units: 3 },
      ],
      "2nd Semester": [
        { code: "MED 302", title: "Internal Medicine I", units: 4 },
        { code: "SUR 302", title: "Surgery I", units: 4 },
        { code: "OBS 302", title: "Obstetrics & Gynaecology I", units: 3 },
        { code: "PAE 302", title: "Paediatrics I", units: 3 },
        { code: "CLS 302", title: "Clinical Skills II", units: 3 },
      ],
    },
    "400L": {
      "1st Semester": [
        { code: "MED 401", title: "Internal Medicine II", units: 5 },
        { code: "SUR 401", title: "Surgery II", units: 5 },
        { code: "OBS 401", title: "Obstetrics & Gynaecology II", units: 4 },
        { code: "PAE 401", title: "Paediatrics II", units: 4 },
        { code: "PSY 401", title: "Psychiatry", units: 2 },
      ],
      "2nd Semester": [
        { code: "MED 402", title: "Internal Medicine III", units: 5 },
        { code: "SUR 402", title: "Surgery III", units: 5 },
        { code: "OBS 402", title: "Obstetrics & Gynaecology III", units: 4 },
        { code: "PAE 402", title: "Paediatrics III", units: 4 },
        { code: "ENT 402", title: "Otorhinolaryngology", units: 2 },
      ],
    },
    "500L": {
      "1st Semester": [
        { code: "MED 501", title: "Internal Medicine Clerkship", units: 6 },
        { code: "SUR 501", title: "Surgery Clerkship", units: 6 },
        { code: "OBS 501", title: "Obstetrics Clerkship", units: 4 },
        { code: "PAE 501", title: "Paediatrics Clerkship", units: 4 },
      ],
      "2nd Semester": [
        { code: "MED 502", title: "Elective Rotation", units: 6 },
        { code: "CPH 502", title: "Community Health Rotation", units: 4 },
        { code: "PSY 502", title: "Psychiatry Clerkship", units: 3 },
        { code: "RAD 502", title: "Radiology Clerkship", units: 2 },
      ],
    },
    "600L": {
      "1st Semester": [
        { code: "MED 601", title: "Advanced Clinical Medicine", units: 6 },
        { code: "SUR 601", title: "Advanced Surgical Practice", units: 6 },
        { code: "OBS 601", title: "Advanced Obstetrics", units: 4 },
        { code: "PAE 601", title: "Advanced Paediatrics", units: 4 },
      ],
      "2nd Semester": [
        {
          code: "MED 602",
          title: "Final Clinical Examination Preparation",
          units: 6,
        },
        { code: "SUR 602", title: "Final Surgery Preparation", units: 6 },
        { code: "OBS 602", title: "Final Obstetrics Preparation", units: 4 },
        { code: "PAE 602", title: "Final Paediatrics Preparation", units: 4 },
      ],
    },
  },
  "Business Education": {
    "100L": {
      "1st Semester": [
        {
          code: "BED 101",
          title: "Introduction to Business Education",
          units: 3,
        },
        { code: "ACC 101", title: "Introductory Accounting", units: 3 },
        { code: "ECO 101", title: "Principles of Economics I", units: 3 },
        { code: "BUS 101", title: "Introduction to Business", units: 3 },
        { code: "GST 101", title: "Use of English I", units: 2 },
      ],
      "2nd Semester": [
        { code: "BED 102", title: "Principles of Teaching", units: 3 },
        { code: "ACC 102", title: "Financial Accounting I", units: 3 },
        { code: "ECO 102", title: "Principles of Economics II", units: 3 },
        { code: "MKT 102", title: "Principles of Marketing", units: 3 },
        { code: "GST 102", title: "Philosophy & Logic", units: 2 },
      ],
    },
    "200L": {
      "1st Semester": [
        { code: "BED 201", title: "Curriculum Development", units: 3 },
        { code: "ACC 201", title: "Cost Accounting", units: 3 },
        { code: "BUS 201", title: "Business Communication", units: 2 },
        { code: "BED 203", title: "Educational Psychology", units: 3 },
        { code: "GST 201", title: "Peace & Conflict", units: 2 },
      ],
      "2nd Semester": [
        {
          code: "BED 202",
          title: "Methods of Teaching Business Subjects",
          units: 3,
        },
        { code: "ACC 202", title: "Management Accounting", units: 3 },
        { code: "BUS 202", title: "Business Law", units: 3 },
        { code: "BED 204", title: "Assessment & Evaluation", units: 3 },
        { code: "ENT 202", title: "Entrepreneurship", units: 2 },
      ],
    },
    "300L": {
      "1st Semester": [
        { code: "BED 301", title: "Economics of Education", units: 3 },
        { code: "BED 303", title: "Office Technology & Management", units: 3 },
        {
          code: "BED 305",
          title: "Guidance & Counselling in Education",
          units: 3,
        },
        { code: "STA 301", title: "Educational Statistics", units: 3 },
        { code: "SIWES 300", title: "Industrial Training", units: 3 },
      ],
      "2nd Semester": [
        { code: "BED 302", title: "Business Research Methods", units: 3 },
        { code: "BED 304", title: "Comparative Education", units: 3 },
        { code: "BED 306", title: "Educational Technology", units: 3 },
        { code: "BED 308", title: "Classroom Management", units: 2 },
      ],
    },
    "400L": {
      "1st Semester": [
        { code: "BED 401", title: "School Administration", units: 3 },
        { code: "BED 403", title: "Special Needs Education", units: 3 },
        { code: "BED 405", title: "Financial Management in Schools", units: 3 },
        { code: "BED 407", title: "Practicum I", units: 3 },
      ],
      "2nd Semester": [
        { code: "BED 499", title: "Project in Business Education", units: 6 },
        { code: "BED 402", title: "Entrepreneurship Education", units: 3 },
        { code: "BED 404", title: "Practicum II", units: 3 },
      ],
    },
  },
};
