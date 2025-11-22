# User Management React App (sample)

This is a minimal React app for the assignment.

## Features
- Login (mock): admin@example.com / admin123
- Dashboard with 3 stat cards (computed from users)
- Users list from jsonplaceholder API
  - Search, filter (Active/Inactive), sort by name
  - Pagination (4 per page)
- User detail page with editable Status
- Create user (adds to UI)
- Uses Context API for global state
- Uses fetch() to call API

## Run locally
1. Unzip the folder and open terminal in project root.
2. Install:
   ```
   npm install
   ```
3. Start:
   ```
   npm start
   ```
4. App will open at http://localhost:3000

## Notes
- Data is persisted to localStorage (key: uma_users_v1) after initial fetch.
- Login state is stored in localStorage as well.
