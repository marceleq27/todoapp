import { FirebaseAuthProvider } from "@react-firebase/auth";
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { firebaseConfig } from "./config";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.scss";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
        <FirebaseDatabaseProvider {...firebaseConfig} firebase={firebase}>
          <App />
        </FirebaseDatabaseProvider>
      </FirebaseAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
