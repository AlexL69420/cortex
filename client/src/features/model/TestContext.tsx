import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';

export interface TestState {
  givenAnswers: { [key: number]: string };
  results: { [key: number]: boolean };
  isTestCompleted: boolean;
  timeLeft: number;
  isTimerRunning: boolean;
  timerPaused: boolean;
}

export type TestAction = 
  | { type: 'SET_ANSWER'; payload: { exerciseId: number; answer: string } }
  | { type: 'SET_RESULTS'; payload: { results: { [key: number]: boolean } } }
  | { type: 'COMPLETE_TEST' }
  | { type: 'SET_TIME_LEFT'; payload: number }
  | { type: 'SET_TIMER_RUNNING'; payload: boolean }
  | { type: 'TOGGLE_TIMER_PAUSE' }
  | { type: 'RESET_TEST' };

const initialState: TestState = {
  givenAnswers: {},
  results: {},
  isTestCompleted: false,
  timeLeft: 1800,
  isTimerRunning: true,
  timerPaused: false,
};

const testReducer = (state: TestState, action: TestAction): TestState => {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        givenAnswers: {
          ...state.givenAnswers,
          [action.payload.exerciseId]: action.payload.answer,
        },
      };
    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload.results,
      };
    case 'COMPLETE_TEST':
      return {
        ...state,
        isTestCompleted: true,
        isTimerRunning: false,
      };
    case 'SET_TIME_LEFT':
      return { ...state, timeLeft: action.payload };
    case 'SET_TIMER_RUNNING':
      return { ...state, isTimerRunning: action.payload };
    case 'TOGGLE_TIMER_PAUSE':
      return { ...state, timerPaused: !state.timerPaused };
    case 'RESET_TEST':
      return { 
        ...initialState, 
        timeLeft: state.timeLeft 
      };
    default:
      return state;
  }
};

interface TestContextType {
  state: TestState;
  dispatch: React.Dispatch<TestAction>;
  setAnswer: (exerciseId: number, answer: string) => void;
  setResults: (results: { [key: number]: boolean }) => void;
  completeTest: () => void;
  setTimeLeft: (time: number) => void;
  toggleTimerPause: () => void;
  resetTest: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(testReducer, initialState);

  const setAnswer = useCallback((exerciseId: number, answer: string) => {
    dispatch({ type: 'SET_ANSWER', payload: { exerciseId, answer } });
  }, []);

  const setResults = useCallback((results: { [key: number]: boolean }) => {
    dispatch({ type: 'SET_RESULTS', payload: { results } });
  }, []);

  const completeTest = useCallback(() => {
    dispatch({ type: 'COMPLETE_TEST' });
  }, []);

  const setTimeLeft = useCallback((time: number) => {
    dispatch({ type: 'SET_TIME_LEFT', payload: time });
  }, []);

  const toggleTimerPause = useCallback(() => {
    dispatch({ type: 'TOGGLE_TIMER_PAUSE' });
  }, []);

  const resetTest = useCallback(() => {
    dispatch({ type: 'RESET_TEST' });
  }, []);

  const value: TestContextType = {
    state,
    dispatch,
    setAnswer,
    setResults,
    completeTest,
    setTimeLeft,
    toggleTimerPause,
    resetTest,
  };

  return (
    <TestContext.Provider value={value}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};