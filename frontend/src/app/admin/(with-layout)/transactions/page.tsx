"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAdminData } from '@/api/adminApi';

interface Transaction {
  txnid: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: Date;
}

const WalletTransactionsAdmin = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const admin = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (admin?.email) {
        setIsLoading(true);
        try {
          const response = await getAdminData(admin.email);
          
          if (response && response.data) {
            // Get transactions from admin wallet
            const adminTransactions = response.data.wallet?.transactions || [];
            
            // Apply search filter if there's a search term
            const filteredTransactions = searchTerm 
            ? adminTransactions.filter((txn: Transaction) => {
                // Check if transaction or any of its properties are undefined
                if (!txn) return false;
                
                const descriptionMatch = txn.description ? 
                  txn.description.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false;
                  
                const txnIdMatch = txn.txnid ? 
                  txn.txnid.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false;
                  
                const typeMatch = txn.type ? 
                  txn.type.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false;
                  
                const amountMatch = txn.amount !== undefined && txn.amount !== null ? 
                  txn.amount.toString().includes(searchTerm) : false;
                  
                return descriptionMatch || txnIdMatch || typeMatch || amountMatch;
              })
            : adminTransactions;
            
            setTotalTransactions(filteredTransactions.length);
            
            // Implement pagination on frontend
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);
            
            setTransactions(paginatedTransactions);
          }
        } catch (error) {
          console.error('Error fetching admin transactions:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTransactions();
  }, [admin?.email, currentPage, itemsPerPage, searchTerm]);

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalPages = Math.ceil(totalTransactions / itemsPerPage);

  // Handle search with immediate update
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-sm border border-gray-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-300 mb-6">Admin Wallet Transactions</h1>

          {/* Search and Items Per Page */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full sm:w-64 px-4 py-2 border border-gray-600 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-gray-600 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-300">per page</span>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction, index) => (
                    <tr key={transaction.txnid || index} className="border-t border-gray-700 hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm text-gray-100 font-medium">
                        {transaction.txnid}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.type === 'credit'
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-red-900/30 text-red-400'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={
                            transaction.type === 'credit'
                              ? 'text-green-400'
                              : 'text-red-400'
                          }
                        >
                          ₹{transaction.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">
                        {transaction.description}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-400">
              Showing {totalTransactions === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalTransactions)} of {totalTransactions}{' '}
              transactions
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
                className="p-2 rounded-lg bg-indigo-800 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-3 py-1 rounded-lg bg-indigo-600 text-white">
                {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || isLoading || totalPages === 0}
                className="p-2 rounded-lg hover:bg-indigo-700 bg-indigo-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTransactionsAdmin;