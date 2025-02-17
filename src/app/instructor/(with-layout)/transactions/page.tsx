"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getInstructorTransactions } from '@/api/instructorApi';
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

interface Transaction {
  txnid: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: Date;
}

const WalletTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction;
    direction: 'asc' | 'desc';
  }>({ key: 'date', direction: 'desc' });

  const instructor = useSelector((state: RootState) => state.instructor);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (instructor?.email) {
        setIsLoading(true);
        try {
          // Only use the original API parameters
          const fetchedData = await getInstructorTransactions(
            instructor.email, 
            currentPage, 
            itemsPerPage
          );
          
          if (fetchedData.data) {
            let filteredData = fetchedData.data.data || [];
            
            // Apply search filter client-side
            if (searchTerm) {
              filteredData = filteredData.filter((transaction: Transaction) =>
                Object.values(transaction).some((value) =>
                  String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
              );
            }

            // Apply sorting client-side
            filteredData.sort((a: Transaction, b: Transaction) => {
              if (sortConfig.key === 'date') {
                const dateA = new Date(a[sortConfig.key]).getTime();
                const dateB = new Date(b[sortConfig.key]).getTime();
                return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
              }
              
              if (sortConfig.key === 'amount') {
                return sortConfig.direction === 'asc' 
                  ? a[sortConfig.key] - b[sortConfig.key]
                  : b[sortConfig.key] - a[sortConfig.key];
              }
              
              const valueA = String(a[sortConfig.key]).toLowerCase();
              const valueB = String(b[sortConfig.key]).toLowerCase();
              return sortConfig.direction === 'asc'
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
            });

            setTransactions(filteredData);
            setTotalTransactions(fetchedData.data.total || filteredData.length);
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTransactions();
  }, [instructor?.email, currentPage, itemsPerPage, searchTerm, sortConfig]);

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

  // Handle sort
  const handleSort = (key: keyof Transaction) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const totalPages = Math.ceil(totalTransactions / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Wallet Transactions</h1>

          {/* Search and Items Per Page */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-64 px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={1}>5</option>
                <option value={3}>10</option>
                <option value={4}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('txnid')}
                      className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                    >
                      Transaction ID
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                    >
                      Date
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('type')}
                      className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                    >
                      Type
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('amount')}
                      className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                    >
                      Amount
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('description')}
                      className="flex items-center gap-1 text-sm font-semibold text-gray-900"
                    >
                      Description
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction, index) => (
                    <tr key={transaction.txnid || index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {transaction.txnid}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.type === 'credit'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={
                            transaction.type === 'credit'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          ${transaction.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
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
            <div className="text-sm text-gray-600">
              Showing {totalTransactions === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalTransactions)} of {totalTransactions}{' '}
              transactions
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
                className="p-2 rounded-lg bg-purple-800 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(currentPage - page) <= 1
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 py-1">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      disabled={isLoading}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === page
                          ? 'bg-purple-600 text-white'
                          : 'hover:bg-purple-700 text-white bg-purple-800'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || isLoading}
                className="p-2 rounded-lg hover:bg-purple-700 bg-purple-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
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

export default WalletTransactions;