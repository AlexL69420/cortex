// features/hooks/useTimer.ts
import { useEffect, useCallback } from 'react';
import { useTest } from '../model/TestContext';

export const useTimer = (onTimeEnd?: () => void) => {
  const { state, setTimeLeft, completeTest } = useTest();
  const { timeLeft, isTimerRunning, timerPaused } = state;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerRunning && !timerPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      completeTest();
      onTimeEnd?.();
    }

    return () => clearInterval(timer);
  }, [isTimerRunning, timerPaused, timeLeft, setTimeLeft, completeTest, onTimeEnd]);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }, []);

  return {
    timeLeft,
    isTimerRunning,
    timerPaused,
    formatTime,
  };
};