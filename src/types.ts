export type Department = 'Engineering' | 'Marketing' | 'Operations' | 'Sales';

export interface Budget {
  id: string;
  department: Department;
  allocated: number;
  spent: number;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  department: Department;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
  submittedBy: string;
}