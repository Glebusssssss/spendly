import React, { useState } from 'react';
import { initialBudgets, initialExpenses } from './data/mockData'
import type { Department, Expense } from './types';
import { 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  PlusCircle, 
  Sparkles,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';

export default function App() {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiMessage, setAiMessage] = useState('');

  // Calculate totals
  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocated, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  // Handle Approve / Reject expense
  const handleStatusChange = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setExpenses(prev => prev.map(exp => {
      if (exp.id === id) {
        if (newStatus === 'Approved' && exp.status !== 'Approved') {
          setBudgets(bList => bList.map(b => 
            b.department === exp.department ? { ...b, spent: b.spent + exp.amount } : b
          ));
        }
        return { ...exp, status: newStatus };
      }
      return exp;
    }));
  };

  // Mock AI Smart Parse Handler
  const handleAiParse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    const lower = aiPrompt.toLowerCase();
    let detectedDept: Department = 'Engineering';
    if (lower.includes('marketing')) detectedDept = 'Marketing';
    if (lower.includes('sales')) detectedDept = 'Sales';
    if (lower.includes('operations') || lower.includes('office')) detectedDept = 'Operations';

    const matchAmount = aiPrompt.match(/[\d]+/);
    const amount = matchAmount ? parseInt(matchAmount[0]) : 500;

    const newExpense: Expense = {
      id: Date.now().toString(),
      title: aiPrompt,
      amount: amount,
      department: detectedDept,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      submittedBy: 'Hlieb Verbovenko (AI Logged)'
    };

    setExpenses([newExpense, ...expenses]);
    setAiMessage(`Successfully parsed and logged expense for ${detectedDept} (€${amount})!`);
    setAiPrompt('');
    setTimeout(() => setAiMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Spendly</h1>
              <p className="text-xs text-slate-500">Enterprise Spend & Budget Intelligence</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Medusa Workspace Active</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Allocated Budget</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">€{totalAllocated.toLocaleString()}</h3>
            </div>
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Spent to Date</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">€{totalSpent.toLocaleString()}</h3>
            </div>
            <div className="bg-amber-50 text-amber-600 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Remaining Pool</p>
              <h3 className="text-2xl font-bold text-indigo-600 mt-1">€{totalRemaining.toLocaleString()}</h3>
            </div>
            <div className="bg-indigo-50 text-indigo-600 p-3 rounded-lg">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md">
          <div className="flex items-center space-x-2 text-indigo-300 text-sm font-semibold mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Workhuman AI Productivity Assistant</span>
          </div>
          <h2 className="text-lg font-bold mb-1">Quick Natural Language Expense Logger</h2>
          <p className="text-slate-300 text-sm mb-4">Type an expense in plain text and our AI will categorize, tag, and log it instantly.</p>
          
          <form onSubmit={handleAiParse} className="flex gap-3">
            <input 
              type="text" 
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g., Team lunch for engineering department cost 350 euros..."
              aria-label="Natural language expense description"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <button 
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log with AI</span>
            </button>
          </form>
          {aiMessage && <p className="text-emerald-400 text-xs mt-3 font-medium animate-pulse">{aiMessage}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgets.map(b => {
            const percentage = Math.round((b.spent / b.allocated) * 100);
            return (
              <div key={b.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">{b.department}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">{percentage}% Spent</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Spent: €{b.spent.toLocaleString()}</span>
                    <span>Cap: €{b.allocated.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${percentage > 85 ? 'bg-rose-500' : 'bg-indigo-600'}`} 
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Pending & Recent Expense Approvals</h3>
              <p className="text-xs text-slate-500">Review and authorize cross-functional departmental purchases.</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">
              {expenses.filter(e => e.status === 'Pending').length} Pending Requests
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-6">Description</th>
                  <th className="py-3 px-6">Department</th>
                  <th className="py-3 px-6">Amount</th>
                  <th className="py-3 px-6">Submitted By</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {expenses.map(exp => (
                  <tr key={exp.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-6 font-medium text-slate-900">{exp.title}</td>
                    <td className="py-4 px-6 text-slate-600">{exp.department}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">€{exp.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-slate-500">{exp.submittedBy}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        exp.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                        exp.status === 'Rejected' ? 'bg-rose-50 text-rose-700' :
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {exp.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {exp.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(exp.id, 'Approved')}
                            aria-label={`Approve expense ${exp.title}`}
                            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 p-1.5 rounded-lg transition inline-flex items-center"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(exp.id, 'Rejected')}
                            aria-label={`Reject expense ${exp.title}`}
                            className="bg-rose-50 text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg transition inline-flex items-center"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}