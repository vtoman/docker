Step-by-step **guide** to starting your Keycloak + PostgreSQL + pgAdmin setup using Docker Compose and logging into both Keycloak and PostgreSQL via pgAdmin.

---

## 🧰 Prerequisites

1. Docker and Docker Compose installed
2. A working `docker-compose.yml` file

---

## 🚀 Step-by-Step Guide

### 1. Start the Containers

```bash
docker-compose up -d
```

Verify with:

```bash
docker ps
```

You should see `keycloak`, `keycloak_postgres`, and `pgadmin` running.

---

### 2. Log in to Keycloak

- Open your browser and go to: [http://localhost:8080](http://localhost:8080)
- Click **"Administration Console"**
- Enter credentials:

  - **Username**: `admin`
  - **Password**: `admin`

✅ You’re now in the Keycloak admin panel.

---

### 3. Log in to pgAdmin

- Open your browser and go to: [http://localhost:5050](http://localhost:5050)
- Use the login credentials:

  - **Email**: `admin@example.com`
  - **Password**: `admin`

---

### 4. Connect pgAdmin to PostgreSQL

Once inside pgAdmin:

#### A. Add a New Server

1. In the left panel, right-click **Servers** → **Create** → **Server**
2. Under the **General** tab:

   - **Name**: `KeycloakDB` (or anything you like)

#### B. Under the **Connection** tab:

- **Host name/address**: `postgres`
- **Port**: `5432`
- **Username**: `keycloak`
- **Password**: `secret`
- Check ✅ **Save Password**
- Click **Save**

---

### 5. Explore the Keycloak Database

- In the left tree under `KeycloakDB`, expand:

  - `Databases` → `keycloak` → `Schemas` → `public` → `Tables`

- You’ll see tables like `realm`, `user_entity`, etc. that Keycloak uses.

---

## 🧼 Optional Cleanup

To stop and remove everything:

```bash
docker-compose down
```

To also wipe volumes (Postgres and pgAdmin data):

```bash
docker-compose down -v
```

---
