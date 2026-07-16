
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
