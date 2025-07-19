## postgresql

Running a **PostgreSQL** container and a **pgAdmin** container, to easily manage the database via a web UI.

### ▶️ Run the containers:

```bash
docker compose up -d
```

### 🌐 Access:

- **pgAdmin**: [http://localhost:8080](http://localhost:8080)
- Login with:

  - **Email**: `admin@example.com`
  - **Password**: `admin`

Once logged into pgAdmin, add a new server with:

- **Name**: `Postgres`
- **Host**: `db`
- **Port**: `5432`
- **Username**: `admin`
- **Password**: `secret`

---
