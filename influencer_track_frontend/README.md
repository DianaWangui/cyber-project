# Next.js Campaign Management Dashboard

##  Project Overview
This is a **Campaign Management Dashboard** built with **Next.js** and **MongoDB (Mongoose)**. The dashboard allows users to manage campaigns, view campaign details, and interact with the system in a responsive and dynamic UI.

## 🚀 Features
- CRUD Operations for Campaigns
- Responsive Design with Tailwind CSS
- Sidebar Navigation & Mobile Menu
- API Integration with Axios
- Database Management with MongoDB & Mongoose
- Animations with Framer Motion

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, MongoDB, Mongoose
- **Libraries**: Axios, Lucide-React

---

## Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/nextjs-campaign-dashboard.git
cd nextjs-campaign-dashboard
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

###  Start the Development Server
```sh
npm run dev
```
Your app will be running at **http://localhost:3000**

---

##  API Routes
The API is built using Next.js API routes.

### Campaigns API
| Method | Endpoint            | Description                 |
|--------|---------------------|-----------------------------|
| GET    | `/api/campaigns`    | Fetch all campaigns        |
| POST   | `/api/campaigns`    | Create a new campaign      |
| GET    | `/api/campaigns/:id` | Get a single campaign      |


---

---

## 📌 Deployment
To deploy the application on **Vercel**, run:
```sh
vercel
```
Ensure you have set the environment variables in **Vercel Settings**.

---

## 📌 Contact
For any inquiries, reach out to **Diana Wangui** via [LinkedIn](https://www.linkedin.com/in/diana-wangui-8967a0253/dd R) or email at **dianawanguikt048@gmail.com**.

