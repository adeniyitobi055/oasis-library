import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";
import GlobalStyles from "./styles/GlobalStyles";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import Books from "./pages/Books";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ui/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import Issues from "./pages/Issues";
import Members from "./pages/Members";
import Account from "./pages/Account";
import Issue from "./pages/Issue";
import Checkin from "./pages/Checkin";
import Checkout from "./pages/Checkout";
import Book from "./pages/Book";
import Member from "./pages/Member";
import Activate from "./pages/Activate";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 0 },
    },
  });

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GlobalStyles />
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* <Route path="applayout" element={<AppLayout />} /> */}
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="books" element={<Books />} />
              <Route path="books/:bookId" element={<Book />} />
              <Route path="issues" element={<Issues />} />
              <Route path="issues/:issueId" element={<Issue />} />
              <Route path="checkin/:issueId" element={<Checkin />} />
              <Route path="checkout/:issueId" element={<Checkout />} />
              <Route path="users" element={<Users />} />
              <Route path="members" element={<Members />} />
              <Route path="members/:memberId" element={<Member />} />
              <Route path="activate/:memberId" element={<Activate />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
              style: {
                fontSize: "15px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
