
# Booking Reporting System - Backend

A Spring Boot REST API for importing booking data from CSV files, storing it in a MySQL database, generating dashboard analytics, sending booking summary reports via email, and securing APIs using JWT Authentication.

---

# Features

- CSV Upload and Import
- Relational Database Design (MySQL)
- Spring Data JPA ORM
- Dashboard Analytics APIs
- Email Report Generation (PDF Attachment)
- JWT Authentication
- BCrypt Password Encryption
- Swagger/OpenAPI Documentation
- Global Exception Handling
- Logging with SLF4J
- Bean Validation
- Transaction Management

---

# Technology Stack

| Technology | Version |
|------------|----------|
| Java | 21 |
| Spring Boot | 3.x |
| Spring Data JPA | Latest |
| Spring Security | 6.x |
| JWT (JJWT) | 0.12.6 |
| MySQL | 8.x |
| OpenCSV | Latest |
| OpenPDF | Latest |
| Swagger (OpenAPI) | springdoc-openapi |
| Lombok | Latest |
| Maven | 3.9+ |

---


# Database Schema

The application uses a relational database design.

```
Country
    |
    | One-To-Many
    |
Booking
    |
    | Many-To-One
    |
Agent

Booking
    |
    | Many-To-One
    |
TourType

User
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login and Receive JWT |

---

## Booking

| Method | Endpoint |
|---------|----------|
| POST | /api/bookings/upload |

Imports booking data from CSV.

---

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /api/dashboard/summary |
| GET | /api/dashboard/revenue-country |
| GET | /api/dashboard/agent-bookings |
| GET | /api/dashboard/monthly-revenue |

---

## Email

| Method | Endpoint |
|---------|----------|
| POST | /api/email/report |

Sends booking summary PDF via email.

---

# Swagger

Open Swagger UI

```
http://localhost:8081/swagger-ui/index.html
```
---

# Email Configuration

Configure Gmail SMTP inside

```
application.properties
```

Example

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=YOUR_APP_PASSWORD

spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

---

# JWT Configuration

```properties
jwt.secret=YOUR_BASE64_SECRET
jwt.expiration=86400000
```

---

# Running the Project

Clone the repository

```bash
git clone https://github.com/dsahlk/booking-reporting-system.git
```

Navigate to the project

```bash
cd booking-reporting-system
```

Configure

```
application.properties
```

Run

```bash
mvn spring-boot:run
```

or

```bash
./mvnw spring-boot:run
```

Application starts

```
http://localhost:8081
```

---

# CSV Import

Upload booking CSV using

```
POST

/api/bookings/upload
```

Validation includes

- Duplicate Booking Numbers
- Empty Required Fields
- Invalid Dates
- Negative Amounts
- Invalid Records

---

# Dashboard Analytics

The system provides

- Total Bookings
- Confirmed Bookings
- Cancelled Bookings
- Total Revenue
- Revenue by Country
- Bookings by Agent
- Monthly Revenue


---

# Error Handling

Global Exception Handler returns consistent API responses.

Example

```json
{
    "timestamp":"2026-07-17T10:30:00",
    "status":400,
    "message":"Invalid CSV file"
}
```

---

# Author

**Sahan Dilshan**

Spring Boot • Spring Security • JPA • MySQL • JWT • REST API

# Booking Analytics Dashboard - Frontend

A modern React-based frontend for the **Booking Analytics Dashboard**. This application provides an interactive dashboard for visualizing booking analytics, uploading CSV booking data, and generating summary reports.

---

## Technologies Used

- React 19
- Vite
- Material UI (MUI)
- React Router DOM
- Axios
- Recharts
- JavaScript (ES6)

---

## Features

### Dashboard

- View booking summary statistics
- Total Bookings
- Confirmed Bookings
- Cancelled Bookings
- Total Revenue

### Analytics Charts

- Revenue by Country (Bar Chart)
- Booking Status (Pie Chart)
- Monthly Revenue (Line Chart)
- Top 5 Booking Agents (Horizontal Bar Chart)

### CSV Upload

- Upload booking CSV files
- File validation
- Upload progress indicator
- Upload summary
- Display validation errors returned from backend

### Summary Report

- Generate booking summary report
- Send report to a specified email address

---

## Project Structure

```
src
│
├── api
│   └── axios.js
│
├── components
│   ├── BookingStatusChart.jsx
│   ├── KPICards.jsx
│   ├── MonthlyRevenueChart.jsx
│   ├── Navbar.jsx
│   ├── RevenueCountryChart.jsx
│   ├── Sidebar.jsx
│   └── TopAgentsChart.jsx
│
├── pages
│   ├── Dashboard.jsx
│   └── UploadPage.jsx
│
├── services
│   ├── bookingService.js
│   └── emailService.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

---

## Run the Application

```bash
npm run dev
```

Application will start on

```
http://localhost:5173
```

---

## Required Backend

The frontend requires the Spring Boot backend to be running.

Default Backend URL

```
http://localhost:8081
```

Axios Base URL

```javascript
http://localhost:8081/api
```

---

## API Endpoints Used

### Dashboard

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/dashboard/summary | Dashboard Summary |
| GET | /api/dashboard/revenue-country | Revenue by Country |
| GET | /api/dashboard/monthly-revenue | Monthly Revenue |
| GET | /api/dashboard/agent-bookings | Top Booking Agents |

### Booking Upload

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/bookings/upload | Upload Booking CSV |

### Email Report

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/email/report | Generate and Email Summary Report |

---

## Dashboard Components

### KPI Cards

Displays

- Total Bookings
- Confirmed Bookings
- Cancelled Bookings
- Total Revenue

---

### Revenue by Country

Visualized using

- Recharts BarChart

---

### Booking Status

Visualized using

- Recharts PieChart

---

### Monthly Revenue

Visualized using

- Recharts LineChart

---

### Top Booking Agents

Visualized using

- Recharts Horizontal BarChart

---

## CSV Upload Workflow

1. Select CSV file
2. Validate file type
3. Upload to backend
4. Display upload summary
5. Show validation errors (if any)

---

## Email Report Workflow

1. Enter recipient email address
2. Click **Generate Summary Report**
3. Backend generates report
4. Report is emailed to recipient
5. Success or error message displayed


---

## Future Improvements

- Authentication and Authorization
- Dark Mode
- Download PDF Reports
- Export Dashboard as PDF
- Dashboard Filters
- Pagination
- Search Functionality
- Responsive Mobile Layout
- Real-time Dashboard Updates

---

## Author

**Sahan Dilshan**

Booking Analytics Dashboard Frontend

Built with React, Material UI, Axios, and Recharts.
