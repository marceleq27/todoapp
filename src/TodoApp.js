import {
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderGlobalAction,
  HeaderGlobalBar,
} from "@carbon/react";
import { Logout } from "@carbon/react/icons";
import { auth } from "./config";
import List from "./List";
import Loader from "./components/Loader";
import { useAuthReload, useAuthSignOut, useAuthUser } from "@react-query-firebase/auth";

const TodoApp = () => {
  const mutation = useAuthSignOut(auth);
  const user = useAuthUser(["user"], auth);

  const mutationReload = useAuthReload();
  const logout = () => {
    mutation.mutate();
    mutationReload.mutate({
      user: auth.currentUser,
    });
  };

  if (mutation?.isSuccess || (!mutation?.data && mutation?.status !== "idle")) {
    window.location.href = "/";
    return null;
  }

  return user?.data ? (
    <>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <Header aria-label="TodoApp">
            <HeaderMenuButton aria-label="Open menu" onClick={onClickSideNavExpand} isActive={isSideNavExpanded} />
            <HeaderName href="#" prefix="TodoApp">
              [Platform]
            </HeaderName>
            <HeaderNavigation aria-label="TodoApp [Platform]"></HeaderNavigation>
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Your profile"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "auto",
                  padding: "0 8px",
                  marginRight: 8,
                }}
              >
                <div style={{ display: "inline", fontSize: 13 }}>
                  <strong>{user.data?.email}</strong>
                </div>
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Logout"
                onClick={logout}
                style={{ display: "flex", justifyContent: "center", marginRight: 16 }}
              >
                <Logout size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
          </Header>
        )}
      />
      <section style={{ marginTop: 80, width: "calc(100vw - 32px)" }}>
        <List user={user.data} />
      </section>
    </>
  ) : (
    <Loader />
  );
};

export default TodoApp;
