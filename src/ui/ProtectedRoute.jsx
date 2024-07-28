import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../components/Auth/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var() (--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //   1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //   2. If there is NO authenticated UserActivation, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //   3. While loading, show a Spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
