const ProfilePage = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
              <p className="text-gray-600">Frontend Developer | Learner</p>
              <p className="text-gray-500 mt-2">johndoe@gmail.com</p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-500">
              Edit Profile
            </button>
            <button className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900">
              Change Password
            </button>
          </div>
        </div>
  
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">12</h2>
            <p className="text-gray-600 mt-2">Enrolled Courses</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">7</h2>
            <p className="text-gray-600 mt-2">Certificates Earned</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">98%</h2>
            <p className="text-gray-600 mt-2">Completion Rate</p>
          </div>
        </div>
  
        {/* Enrolled Courses */}
        <div className="bg-white shadow rounded-lg p-6 mt-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800">Enrolled Courses</h2>
          <div className="flex flex-col gap-4 mt-4">
            {/* Course Card */}
            <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Course"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">React for Beginners</h3>
                <p className="text-gray-600">Instructor: Jane Smith</p>
                <p className="text-gray-500 text-sm">Progress: 85%</p>
              </div>
              <button className="ml-auto bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                View
              </button>
            </div>
            {/* Repeat the above for other courses */}
          </div>
        </div>
  
        {/* Editable Details Section */}
        <div className="bg-white shadow rounded-lg p-6 mt-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800">Personal Details</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-gray-600 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Phone</label>
              <input
                type="tel"
                placeholder="+123 456 7890"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Profession</label>
              <input
                type="text"
                placeholder="Frontend Developer"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <button
              type="submit"
              className="col-span-1 sm:col-span-2 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;
  