# GO University Student & Staff Portal 🎓

A high-fidelity, full-stack academic management prototype built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion** — developed as a core **Human-Computer Interaction (HCI)** study to observe and improve user workflows in existing university systems.

---

## 🌟 HCI & UX Philosophy

Unlike traditional administrative software, this portal is built in strict adherence to HCI principles to reduce cognitive load and improve **Visibility of System Status**.

| Principle                         | Implementation                                                                                                                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Zero-Latency Feedback**         | Client-side persistence via `localStorage` provides instantaneous state updates (e.g., student approval, result publishing), meeting the HCI requirement for fluid system response |
| **Aesthetic & Minimalist Design** | Card-based UI prevents information overload — students and staff only see context-relevant data                                                                                    |
| **Consistency & Standards**       | A unified design language across three distinct user roles (Student, Staff, Admin), keeping the user's mental model stable throughout the platform                                 |
| **Accessibility — Dark Mode**     | Fully integrated CSS variables for dark mode support, catering to low-light usage common in student environments                                                                   |
| **Error Prevention & Recovery**   | Multi-step registration forms use persistent state objects to ensure no data is lost during navigation                                                                             |

---

## 🛠️ Tech Stack

| Layer          | Technology                                         |
| -------------- | -------------------------------------------------- |
| **Framework**  | Next.js 14 (App Router)                            |
| **Styling**    | Tailwind CSS                                       |
| **Animations** | Framer Motion                                      |
| **Icons**      | Lucide React                                       |
| **Storage**    | Browser LocalStorage (Synchronised Client-Side DB) |
| **Deployment** | Vercel                                             |

---

## 🚀 Key Modules

### 1. Administrative Module

- **Admission Control** — Approve applicants and simulate the generation and emailing of matriculation numbers and activation tokens
- **Staff CRUD** — Manage staff profiles, set salary details, and assign courses to lecturers
- **Financial Reporting** — Set school fee structures and view high-level revenue reports
- **Student Management** — Activate/suspend student accounts and edit registration details

### 2. Staff Module

- **Result Entry** — Manual and CSV-based result uploads for assigned courses
- **Student Tracking** — View and export lists of students registered for specific courses
- **Welfare** — View payment history and download payslips

### 3. Student Module

- **Registration** — Multi-step onboarding process with full input persistence
- **Academic Hub** — Course registration, result viewing (GPA/CGPA tracking), and clearance tracking
- **Accommodation** — Real-time hostel viewing and booking simulation

---

## 💾 LocalStorage "Database" Logic

To ensure this project remains a robust, zero-downtime presentation tool, all data is synchronised through the browser's `localStorage`.

- **Simulated Auth** — The login component verifies credentials against a `gouni_users` array stored locally
- **Global Sync** — Changes made in the Admin dashboard (e.g., approving a student) are reflected immediately in that student's active session
- **Persistence Fix** — Multi-step forms use a `useEffect` hydration strategy to prevent Next.js hydration mismatches while keeping form data intact across page refreshes

---

## 🏁 Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/gouni-portal.git
```

**2. Install dependencies**

```bash
npm install
```

**3. Run the development server**

```bash
npm run dev
```

**4. Open in browser**

```
http://localhost:3000
```

---

## 🔐 Demo Credentials

For the live presentation, the login system includes a fallback with the following pre-seeded credentials:

| Role    | ID        | Password  |
| ------- | --------- | --------- |
| Admin   | `admin`   | `admin`   |
| Staff   | `staff`   | `staff`   |
| Student | `student` | `student` |

---

## 📄 License

This project is for **academic purposes only**, developed as part of an HCI study at Godfrey Okoye University.
