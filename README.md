# Full-Stack To-Do App

A full-stack task management application that lets users create, update, and delete to-do items with persistent backend support.

## 🧰 Features

* Create new tasks
* Read/view current tasks
* Update (edit) tasks
* Delete tasks
* Persistent storage via backend (database)
* Responsive frontend UI for desktop & mobile

## 📁 Project Structure

```
/
├── backend/           # API server (Express / Node.js or your chosen tech)
├── frontend/          # Client application (React or other)
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

* Node.js (v14+ recommended)
* npm or yarn
* (Optional) Database setup if required by backend

### Installation & Setup

1. Clone the repo

   ```bash
   git clone https://github.com/GMuchoki/Full-Stack-To-Do-App.git
   cd Full-Stack-To-Do-App
   ```

2. Setup backend

   ```bash
   cd backend
   npm install
   # Configure database connection if required (e.g., .env)
   npm start
   ```

3. Setup frontend

   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. Open your browser at `http://localhost:3000` (or whichever port your frontend uses) to view the app.

## 🧪 Usage

* On launch, the app displays a list of to-do items (if any exist)
* Use the form/input to add a new task
* Click/edit an item to modify it
* Use delete action to remove tasks
* Data is stored via backend so refresh retains tasks

## 🛠 Tech Stack

* **Backend**: Node.js, Express (or your chosen backend tech)
* **Frontend**: React (or other framework)
* **Database**: e.g., SQLite, MongoDB, PostgreSQL (as configured)
* **Other**: RESTful API endpoints for CRUD operations

## ✅ Why This Project?

* Demonstrates full stack CRUD operations (Create-Read-Update-Delete)
* Good starter project for learning how frontend and backend interact
* Clean organization, separation of concerns, persistent state

## 🤝 Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request detailing your changes

Please follow existing code style and ensure your changes are tested.

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Maintained by **GMuchoki**.
Feel free to open issues or pull requests.

---

*Happy coding & happy task-tracking!* 📝
