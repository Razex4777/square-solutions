"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { Lock, ChevronDown } from "lucide-react";
import { DashboardShell } from "./components/DashboardShell";

/**
 * Analytics Dashboard — Protected admin page
 * Features: Login gate → Full analytics dashboard with:
 * - KPI cards, session timeline, geo map, device/browser breakdown
 * - Hourly traffic heatmap, section popularity, recent sessions table
 * - Custom calendar date picker, real-time auto-refresh
 */
export default function AnalyticsDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("sq_admin_auth");
    if (auth === "true") setIsAuthenticated(true);
    setIsCheckingAuth(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const { data, error } = await supabase.rpc("verify_admin", {
        p_username: username,
        p_password: password,
      });
      if (error) throw error;
      if (data) {
        setIsAuthenticated(true);
        localStorage.setItem("sq_admin_auth", "true");
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (err: any) {
      setLoginError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("sq_admin_auth");
  }, []);

  if (isCheckingAuth) return null;

  // ─── LOGIN SCREEN ───
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface)] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,var(--color-text-muted)_0.5px,transparent_0.5px)] [background-size:40px_40px] opacity-[0.15] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] shadow-2xl relative z-10 backdrop-blur-sm"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-[var(--color-accent)]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-[var(--color-text-primary)] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-center text-[var(--color-text-muted)] mb-8">
            Enter your credentials to access analytics
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
                placeholder="squaresolutions"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <AnimatePresence>
              {loginError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {loginError}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-green)] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Login"}
              {!isLoading && <ChevronDown className="w-4 h-4 -rotate-90" />}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ─── DASHBOARD ───
  return <DashboardShell onLogout={handleLogout} />;
}
