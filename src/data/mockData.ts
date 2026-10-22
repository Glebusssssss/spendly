import type { Budget, Expense } from '../types';

export const initialBudgets: Budget[] = [
  { id: '1', department: 'Engineering', allocated: 50000, spent: 34200 },
  { id: '2', department: 'Marketing', allocated: 30000, spent: 22100 },
  { id: '3', department: 'Operations', allocated: 20000, spent: 14500 },
  { id: '4', department: 'Sales', allocated: 25000, spent: 19800 },
];

export const initialExpenses: Expense[] = [
  { id: 'e1', title: 'AWS Cloud Infrastructure Q3', amount: 4500, department: 'Engineering', status: 'Approved', date: '2026-10-18', submittedBy: 'Sarah Connor' },
  { id: 'e2', title: 'Dublin Tech Conference Sponsorship', amount: 3200, department: 'Marketing', status: 'Pending', date: '2026-10-20', submittedBy: 'Alex Murphy' },
  { id: 'e3', title: 'Office Ergonomic Seating Upgrade', amount: 1800, department: 'Operations', status: 'Approved', date: '2026-10-15', submittedBy: 'John Matrix' },
  { id: 'e4', title: 'Client Q3 Onsite Catering', amount: 850, department: 'Sales', status: 'Pending', date: '2026-10-21', submittedBy: 'Ellen Ripley' },
];