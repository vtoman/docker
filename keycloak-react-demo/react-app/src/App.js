import React, { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "react-oidc-context";
import "./App.css";

const issuer = "http://localhost:8080/realms/demo";
const oidcConfig = {
  authority: issuer,
  client_id: "react-app",
  redirect_uri: window.location.origin,
  scope: "openid profile email",
  response_type: "code",
  metadata: {
    issuer,
    authorization_endpoint: `${issuer}/protocol/openid-connect/auth`,
    token_endpoint: `${issuer}/protocol/openid-connect/token`,
    userinfo_endpoint: `${issuer}/protocol/openid-connect/userinfo`,
    end_session_endpoint: `${issuer}/protocol/openid-connect/logout`,
    jwks_uri: `${issuer}/protocol/openid-connect/certs`,
  },
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

const App = () => (
  <AuthProvider {...oidcConfig}>
    <Main />
  </AuthProvider>
);

const Main = () => {
  const auth = useAuth();
  const [users, setUsers] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const fetchUsers = async () => {
        try {
          const response = await fetch(
            "http://localhost:8080/admin/realms/demo/users",
            {
              headers: {
                Authorization: `Bearer ${auth.user?.access_token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
          }

          const data = await response.json();
          setUsers(data);
        } catch (err) {
          setFetchError(err.message);
        }
      };

      fetchUsers();
    } else {
      setUsers(null);
    }
  }, [auth.isAuthenticated, auth.user]);

  if (auth.isLoading) {
    return <div>Loading authentication...</div>;
  }

  if (auth.error) {
    return <div>Authentication error: {auth.error.message}</div>;
  }

  if (!auth.isAuthenticated) {
    return (
      <button onClick={() => auth.signinRedirect({ prompt: "login" })}>
        Login
      </button>
    );
  }

  return (
    <div>
      <h1>Welcome, {auth.user?.profile?.preferred_username}</h1>
      <button onClick={() => auth.signoutRedirect()}>Logout</button>

      <h2>Users in realm "demo"</h2>
      {fetchError && <div style={{ color: "red" }}>{fetchError}</div>}
      {!users && !fetchError && <div>Fetching users...</div>}
      {users && (
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
