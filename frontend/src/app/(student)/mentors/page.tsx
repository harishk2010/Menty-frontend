"use client"

import React, { useState, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  Mail,
  Phone,
  UserCheck,
  Users,
  IndianRupee,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import PrimaryButton from '@/app/components/buttons/PrimaryButton';
import { getAllPaginatedMentors, getMentorExpertise } from '@/api/instructorApi';


type Mentor = {
  _id: string;
  username: string;
  email: string;
  mobile: string;
  expertise: string;
  skills: string;
  profilePicUrl: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  isVerified: boolean;
  isBlocked: boolean;
  planPrice: number;
};

type SortOption = 'verified' | 'expertise' | 'price-low' | 'price-high' | 'newest';

export default function MentorListing() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('verified');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMentors, setTotalMentors] = useState(0);
  const [itemsCount, setItemsCount] = useState<number>(6);
  const [isSearching, setIsSearching] = useState(false);
  const [filterChanged, setFilterChanged] = useState(false);
  const [uniqueExpertise, setUniqueExpertise] = useState<string[]>([]);

  // Fetch mentors with pagination, filtering, and sorting from the backend
  const fetchMentors = async (resetPage = false) => {
    try {
      setLoading(true);
      setIsSearching(true);
      
      // If filters changed, reset to page 1
      const pageToFetch = resetPage ? 1 : currentPage;
      if (resetPage) {
        setCurrentPage(1);
      }
      
      
      const response = await getAllPaginatedMentors(
        pageToFetch,
        itemsCount,
        searchQuery,
        sortBy,
        selectedExpertise.length > 0 ? selectedExpertise : undefined
      );
      
      setMentors(response.mentors);
      setTotalPages(response.totalPages);
      setTotalMentors(response.totalMentors);
      
      // Fetch all expertise if we don't have them yet
      if (uniqueExpertise.length === 0) {
        const expertiseResponse = await getMentorExpertise();
        if (expertiseResponse.success) {
          setUniqueExpertise(expertiseResponse.data || []);
        }
      }
    } catch (error) {
      console.error("Failed to fetch mentors:", error);
    } finally {
      setLoading(false);
      setIsSearching(false);
      setFilterChanged(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchMentors();
  }, []);

  // Effect for handling filter changes
  useEffect(() => {
    if (filterChanged) {
      fetchMentors(true);
    }
  }, [filterChanged]);

  // Effect for handling pagination
  useEffect(() => {
    if (!filterChanged) {
      fetchMentors(false);
    }
  }, [currentPage]);

  // Handle expertise selection
  const handleExpertiseChange = (expertise: string) => {
    setSelectedExpertise(prev => {
      const newExpertise = prev.includes(expertise)
        ? prev.filter(e => e !== expertise)
        : [...prev, expertise];
      
      return newExpertise;
    });
    setFilterChanged(true);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
    setFilterChanged(true);
  };

  // Handle items per page change
  const handleItemsChange = (itemCount: number) => {
    setItemsCount(itemCount);
    setFilterChanged(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Mentor</h1>
            <p className="mt-2 text-gray-600">
              Connect with experienced mentors to guide your learning journey
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:w-96">
              <input
                type="text"
                placeholder="Search mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setFilterChanged(true);
                  }
                }}
                className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer" 
                onClick={() => setFilterChanged(true)}
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <SlidersHorizontal className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block space-y-6`}>
            <div>
              <h3 className="font-semibold text-gray-900">Expertise</h3>
              <div className="mt-2 space-y-2">
                {uniqueExpertise.map(expertise => (
                  expertise && (
                    <label key={expertise} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedExpertise.includes(expertise)}
                        onChange={() => handleExpertiseChange(expertise)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-600">{expertise}</span>
                    </label>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Mentor Grid */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {/* Showing { 1} of {totalMentors} mentors */}
                Showing {mentors.length | 1} of {totalMentors} mentors
              </p>
              <div className="space-x-3">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  className="border text-gray-800 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="verified">Verified First</option>
                  <option value="expertise">By Expertise</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
                <select
                  value={itemsCount}
                  onChange={(e) => handleItemsChange(parseInt(e.target.value))}
                  className="border text-gray-800 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-white rounded-lg shadow-sm p-4 h-64"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                  <div
                    key={mentor._id}
                    className="bg-white rounded-lg hover:shadow-purple-300 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={mentor.profilePicUrl}
                          alt={mentor.username}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {mentor.username}
                          </h3>
                          <div className="flex items-center mt-1">
                            {mentor.isVerified && (
                              <span className="flex items-center text-green-600 text-sm">
                                <UserCheck className="h-4 w-4 mr-1" />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">
                          <Award className="h-4 w-4 inline mr-2" />
                          {mentor.expertise||"Instructor"}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-purple-500 line-clamp-2">
                          <IndianRupee className="h-4 w-4 inline mr-2" />
                          Plan Price: {mentor.planPrice}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-col space-y-2">
                        <Link
                          href={`mailto:${mentor.email}`}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          {mentor.email}
                        </Link>
                        <p className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {mentor.mobile || 'Not provided'}
                        </p>
                      </div>

                      <div className="mt-4">
                        <Link href={`/mentorProfile/${mentor._id}`}>
                          <PrimaryButton type="button" name="View Profile" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center p-2 rounded-md ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md ${
                        currentPage === i + 1
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-600 hover:bg-purple-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center p-2 rounded-md ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {mentors.length === 0 && !loading && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No mentors found</h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}