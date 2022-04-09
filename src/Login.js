import { useState } from "react";
import { useAuthSignInWithEmailAndPassword, useAuthSignOut } from "@react-query-firebase/auth";
import { useAuthUser } from "@react-query-firebase/auth";
import { Button, Column, TextInput, Theme } from "@carbon/react";
import { Link, Navigate } from "react-router-dom";
import { auth } from "./config";
import GoogleLoginButton from "./components/GoogleLoginButton";
import Loader from "./components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const user = useAuthUser(["user"], auth);
  const mutationLogout = useAuthSignOut(auth);

  const mutation = useAuthSignInWithEmailAndPassword(auth, {
    onError(error) {
      setError(error);
    },
  });

  function onSignIn() {
    mutation.mutate({ email, password });
  }

  if (user.isLoading) return <Loader />;
  if (user.data && mutationLogout?.data) {
    return <Navigate to="/app" />;
  }

  return (
    <section
      style={{
        width: "calc(100vw - 32px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Theme theme="g10">
        <Column lg={4}>
          <h1 style={{ marginBottom: 24, textAlign: "center" }}>TodoApp</h1>
          <h2 style={{ marginBottom: 16 }}>Log in</h2>
          <form onSubmit={onSignIn}>
            <TextInput
              type="text"
              id="login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              labelText="Email"
              required
              style={{ marginBottom: 8 }}
            />
            <TextInput
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              labelText="Password"
            />
            <div style={{ display: "flex", marginTop: 32 }}>
              <Button type="submit" style={{ marginRight: 16 }}>
                Login
              </Button>
              <GoogleLoginButton auth={auth} kind="secondary">
                Sign via Google
              </GoogleLoginButton>
            </div>
          </form>
          <p style={{ marginTop: 24, fontSize: 14 }}>
            Don't have account? Sign in <Link to="/register">here</Link>.
          </p>
        </Column>
      </Theme>
    </section>
  );
};

export default Login;
