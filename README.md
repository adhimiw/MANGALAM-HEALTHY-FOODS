# Mangalam Healthy Foods - Backend & Frontend Integration

This repository contains the dynamic Vite + React frontend integrated with a Python Django backend configured for Vercel serverless hosting, OpenWA WhatsApp gateway notification dispatch, detailed customer activity tracking logs, and a dynamic coupon discount validation system.

---

## 🏗️ Architecture

1. **Frontend (Vite + React)**:
   * Dynamic content loading: Fetches products and config parameters from the API on mount.
   * Tracks customer lifecycle events (page views, cart operations, checkout submissions) and sends them to the logging service.
   * Prompts address details and validation code during checkout inside the `CartDrawer`.
2. **Backend (Django REST Framework)**:
   * **CMS Settings**: Edit logo text, announcement bar text, and recipient numbers dynamically.
   * **Order Processing**: Creates records, handles discount deductions, and forwards invoice alerts.
   * **OpenWA Connection**: Calls OpenWA Gateway to send WhatsApp text alerts to the business owner.

---

## ⚡ Setup & Local Run

### 1. Run the Django Backend
Make sure you have python installed. Run the following commands:

```bash
# Create/Verify Virtualenv
python3 -m venv backend/venv

# Install dependencies
backend/venv/bin/pip install -r requirements.txt

# Run migrations
backend/venv/bin/python backend/manage.py migrate

# Start backend dev server
backend/venv/bin/python backend/manage.py runserver 0.0.0.0:8000
```
* Django Admin Panel: `http://localhost:8000/admin/`
* Default Admin Account:
  * Username: `admin`
  * Password: `adminpassword`

### 2. Run the OpenWA Docker Gateway
OpenWA acts as the local API wrapper for the WhatsApp Web client.

```bash
git clone https://github.com/rmyndharis/OpenWA.git
cd OpenWA
docker compose -f docker-compose.dev.yml up -d
```
* Dashboard URL: `http://localhost:2785/`
* Scan the QR code in the dashboard using WhatsApp Link Device option to authorize the sender session.

### 3. Run the Frontend (Vite)
Open another terminal:

```bash
# Install packages
npm install

# Start Vite client dev server
npm run dev
```
* Visit `http://localhost:5180` in your web browser.

---

## ☁️ Vercel Deployment

The repository includes a [vercel.json](vercel.json) file at the root. When linked to Vercel:
* Vercel will build the React app using the `build` script and place it in edge storage.
* Vercel will install the python packages from `requirements.txt` and invoke `backend/config/wsgi.py` for all `/api/` and `/admin/` path requests.
* Database config detects if `DATABASE_URL` environment variable is available (for PostgreSQL integration), otherwise it defaults to SQLite file database.
