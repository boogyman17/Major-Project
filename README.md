# Major-Project
## Prerequisites

- **Python 3.9+** and `pip`
- **Node.js** (v18 or newer) and `npm`

## Backend Setup

1. Create and activate a Python virtual environment:
   ```bash
   cd django-nextjs-backend-api
   python -m venv venv
   source venv/bin/activate
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Apply migrations and run the Django server:
   ```bash
   cd src
   python manage.py migrate
   python manage.py runserver
   ```

## Frontend Setup

1. Install JavaScript dependencies:
   ```bash
   cd django-nextjs-frontend
   npm install
   ```
2. Start the Next.js development server:
   ```bash
   npm run dev
   ```

## Default Credentials

The development server includes a default admin user:
```
ADMIN LOG INL:
Username: jason.budiman07@gmail.com
Password: Jasonbudiman12321!

You can create a customer Login using SignIn

``

