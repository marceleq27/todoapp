import { Grid, Theme } from "@carbon/react";
import Login from "./Login";
import Register from "./Register";
import TodoApp from "./TodoApp";
import Helmet from "react-helmet";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Theme theme="g90">
      <Helmet>
        <title>TodoApp</title>
      </Helmet>
      <Router>
        <Grid condensed fullWidth style={{ minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/app" element={<TodoApp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Grid>
      </Router>
    </Theme>
  );
};

export default App;
