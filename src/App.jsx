import React from "react";
// import "./App.css";
// import LoginForm from "./components/Auth/LoginForm";
import GlobalStyles from "./styles/GlobalStyles";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Books from "./pages/Books";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ui/ProtectedRoute";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 0 },
    },
  });

  return (
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
          />
          <Route path="applayout" element={<AppLayout />} />
          {/*  <Route index element={<Navigate replace to="dashboard" />} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="books" element={<Books />} />
          <Route path="issues" />
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
  );
}

export default App;
