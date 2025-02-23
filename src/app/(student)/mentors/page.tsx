"use client"

import React, { useState, useEffect } from 'react';

import {
  Search,
  SlidersHorizontal,
  Mail,
  Phone,
  Star,
  Award,
  UserCheck,
  Users,
  IndianRupee
} from 'lucide-react';
import Link from 'next/link';
import PrimaryButton from '@/app/components/buttons/PrimaryButton';
import { getAllInstructors } from '@/api/studentApi';

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
  planPrice:number
};

type SortOption = 'verified' | 'expertise' | 'newest';

export default function MentorListing() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('verified');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await getAllInstructors();
        if (Array.isArray(response)) {
          setMentors(response.filter(mentor => !mentor.isBlocked));
          setFilteredMentors(response.filter(mentor => !mentor.isBlocked));
        }
      } catch (error) {
        console.error('Failed to fetch mentors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    let filtered = [...mentors];

    if (searchQuery) {
      filtered = filtered.filter(mentor =>
        mentor.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.skills.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedExpertise.length > 0) {
      filtered = filtered.filter(mentor =>
        selectedExpertise.some(exp => mentor.expertise.includes(exp))
      );
    }

    switch (sortBy) {
      case 'verified':
        filtered.sort((a, b) => Number(b.isVerified) - Number(a.isVerified));
        break;
      case 'expertise':
        filtered.sort((a, b) => a.expertise.localeCompare(b.expertise));
        break;
      case 'newest':
        filtered.sort((a, b) => b._id.localeCompare(a._id));
        break;
    }

    setFilteredMentors(filtered);
  }, [mentors, searchQuery, selectedExpertise, sortBy]);

  const uniqueExpertise = Array.from(
    new Set(mentors.map(mentor => mentor.expertise).filter(Boolean))
  );

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
                className="w-full  text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
                        onChange={() => {
                          setSelectedExpertise(prev =>
                            prev.includes(expertise)
                              ? prev.filter(e => e !== expertise)
                              : [...prev, expertise]
                          );
                        }}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-600">{expertise}</span>
                    </label>
                  )
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredMentors.length} mentors
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border text-black border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="verified">Verified First</option>
                <option value="expertise">By Expertise</option>
                <option value="newest">Newest</option>
              </select>
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
                {filteredMentors.map((mentor) => (
                  <div
                    key={mentor._id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
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
                          {mentor.expertise}
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
                          {mentor.mobile}
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

            {filteredMentors.length === 0 && !loading && (
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