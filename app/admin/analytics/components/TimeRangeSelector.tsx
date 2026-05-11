"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeRangeSelectorProps {
  timeRange: number;
  onTimeRangeChange: (days: number) => void;
}

const PRESETS = [1, 7, 30, 90];

/**
 * TimeRangeSelector — Preset buttons + custom calendar date picker.
 * The calendar lets users pick a date range visually (shadcn-inspired design).
 */
export function TimeRangeSelector({ timeRange, onTimeRangeChange }: TimeRangeSelectorProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // First click or reset
      setStartDate(date);
      setEndDate(null);
    } else {
      // Second click
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      // Calculate days difference and apply
      const diffMs = Math.abs(date.getTime() - startDate.getTime());
      const diffDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      onTimeRangeChange(diffDays);
      setTimeout(() => setShowCalendar(false), 300);
    }
  };

  const prevMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const renderCalendarGrid = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cells: React.ReactNode[] = [];
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Day name headers
    dayNames.forEach((d) => (
      cells.push(
        <div key={`h-${d}`} className="text-xs font-medium text-[var(--color-text-muted)] text-center py-1">
          {d}
        </div>
      )
    ));

    // Empty cells for alignment
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} />);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      const isToday = date.getTime() === today.getTime();
      const isFuture = date > today;
      const isStart = startDate && date.getTime() === startDate.getTime();
      const isEnd = endDate && date.getTime() === endDate.getTime();
      const isInRange = startDate && endDate && date > startDate && date < endDate;

      cells.push(
        <button
          key={day}
          disabled={isFuture}
          onClick={() => handleDateClick(date)}
          className={`
            w-8 h-8 rounded-lg text-sm transition-all flex items-center justify-center
            ${isFuture ? "text-[var(--color-text-muted)]/30 cursor-not-allowed" : "hover:bg-[var(--color-accent)]/10 cursor-pointer"}
            ${isToday ? "ring-1 ring-[var(--color-accent)]/50" : ""}
            ${isStart || isEnd ? "bg-[var(--color-accent)] text-white font-semibold" : ""}
            ${isInRange ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]" : ""}
            ${!isStart && !isEnd && !isInRange && !isFuture ? "text-[var(--color-text-primary)]" : ""}
          `}
        >
          {day}
        </button>
      );
    }

    return cells;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="relative" ref={calendarRef}>
      <div className="flex flex-wrap items-center gap-1.5 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl p-1">
        {PRESETS.map((days) => (
          <button
            key={days}
            onClick={() => {
              onTimeRangeChange(days);
              setShowCalendar(false);
              setStartDate(null);
              setEndDate(null);
            }}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              timeRange === days && !showCalendar
                ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent)]/5"
            }`}
          >
            {days === 1 ? "24h" : `${days}d`}
          </button>
        ))}
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
            !PRESETS.includes(timeRange) || showCalendar
              ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent)]/5"
          }`}
        >
          <Calendar className="w-4 h-4" />
          {!PRESETS.includes(timeRange) ? `${timeRange}d` : "Custom"}
        </button>
      </div>

      {/* ── Calendar Dropdown ── */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 z-50 w-[280px] bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl shadow-2xl shadow-black/20 p-4"
          >
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-1.5 rounded-lg hover:bg-[var(--color-accent)]/10 text-[var(--color-text-secondary)] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
              </span>
              <button
                onClick={nextMonth}
                className="p-1.5 rounded-lg hover:bg-[var(--color-accent)]/10 text-[var(--color-text-secondary)] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {renderCalendarGrid()}
            </div>

            {/* Selection hint */}
            <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-text-muted)] text-center">
                {!startDate
                  ? "Click to select start date"
                  : !endDate
                    ? "Click to select end date"
                    : `Selected: ${Math.max(1, Math.ceil(Math.abs(endDate.getTime() - startDate.getTime()) / 86400000))} days`}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
