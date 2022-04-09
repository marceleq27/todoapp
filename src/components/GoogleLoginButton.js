import { Button, InlineLoading } from "@carbon/react";
import { useAuthSignInWithPopup } from "@react-query-firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Navigate } from "react-router-dom";

const GoogleLoginButton = ({ children, kind, auth }) => {
  const mutation = useAuthSignInWithPopup(auth);

  const signInWithGoogle = () => {
    mutation.mutate({
      provider: new GoogleAuthProvider(),
    });
  };

  if (mutation.isSuccess) return <Navigate to="/app" />;

  return (
    <div style={{ display: "flex", width: 178 }}>
      {mutation?.isLoading ? (
        <InlineLoading style={{ marginLeft: 16, minWidth: 178 }} status="active" description="Loading" />
      ) : (
        <Button onClick={signInWithGoogle} kind={kind}>
          {children}
        </Button>
      )}
    </div>
  );
};

export default GoogleLoginButton;
