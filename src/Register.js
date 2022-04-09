import { useState } from "react";
import { Button, Column, TextInput, Theme } from "@carbon/react";
import { useAuthCreateUserWithEmailAndPassword } from "@react-query-firebase/auth";
import { auth } from "./config";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useAuthCreateUserWithEmailAndPassword(auth);

  function onCreateUser() {
    mutation.mutate({ email, password });
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
          <h2 style={{ marginBottom: 16 }}>Register</h2>
          <TextInput
            labelText="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 8 }}
            disabled={mutation?.isLoading}
          />
          <TextInput
            labelText="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={mutation?.isLoading}
          />
          <div style={{ display: "flex", marginTop: 32 }}>
            <Button
              style={{ marginRight: 16 }}
              onClick={onCreateUser}
              disabled={mutation?.isLoading || mutation?.isSuccess}
            >
              Register
            </Button>
            <Button as={Link} to="/" kind="secondary">
              Back to login
            </Button>
          </div>
          {mutation?.success && <p style={{ marginTop: 16 }}>Account successfully created.</p>}
        </Column>
      </Theme>
    </section>
  );
};

export default Register;
