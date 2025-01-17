const UsersTable = () => {
    const users = [
      { id: 1, name: "John Doe", email: "johndoe@gmail.com", status: "Active" },
      { id: 2, name: "Jane Smith", email: "janesmith@gmail.com", status: "Blocked" },
      { id: 3, name: "Alice Johnson", email: "alicej@gmail.com", status: "Active" },
      { id: 4, name: "Bob Brown", email: "bobbrown@gmail.com", status: "Inactive" },
    ];
  
    const getStatusStyle = (status: string) => {
      switch (status) {
        case "Active":
          return "text-green-600 bg-green-100";
        case "Blocked":
          return "text-red-600 bg-red-100";
        case "Inactive":
          return "text-yellow-600 bg-yellow-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <div className="w-full bg-gray-800 px-6 py-4 rounded-lg">
          <h1 className="text-2xl text-white font-semibold">User Listing</h1>
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto border-collapse bg-gray-800 rounded-lg">
            <thead>
              <tr className="bg-gray-900 text-gray-200">
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase">Status</th>
                <th className="px-6 py-3 text-center text-sm font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="text-gray-300 border-t border-gray-300 hover:bg-gray-700"
                >
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md"
                    >
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default UsersTable;
