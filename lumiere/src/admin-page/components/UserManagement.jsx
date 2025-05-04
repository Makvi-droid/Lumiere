import { useState, useEffect } from "react";
import { Search, UserPlus, Trash2, Edit2, X, Save, Eye, EyeOff, ChevronDown, ChevronUp, Filter } from "lucide-react";

const UserManagement = () => {
  // State for users data
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showPassword, setShowPassword] = useState(false);
  const [filterRole, setFilterRole] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  
  // Form values for new user
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
    contactNum: "",
    gender: "M"
  });

  // Initialize with mock users from localStorage or default set
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
      setFilteredUsers(JSON.parse(storedUsers));
    } else {
      // Default users as in your SignUp component
      const defaultUsers = [
        { id: 1, username: "Sgt KatCat", password: "password123", role: "customer", contactNum: "09471057194", gender: "M", email: "katcat@example.com"},
        { id: 2, username: "Biscoff", password: "password123", role: "customer", contactNum: "09671710194", gender: "F", email: "biscoff@example.com" },
        { id: 3, username: "McJobilat", password: "password123", role: "customer", contactNum: "09978057196", gender: "M", email: "mcjobilat@example.com" },
        { id: 4, username: "Gandalf", password: "password123", role: "customer", contactNum: "09841017194", gender: "F", email: "gandalf@example.com" },
        { id: 5, username: "Ryan Reynolds", password: "password123", role: "customer", contactNum: "09334718564", gender: "M", email: "reynolds@example.com" },
        { id: 6, username: "admin", password: "adminpass", role: "admin", contactNum: "09471057194", gender: "M", email: "admin@example.com" }
      ];
      setUsers(defaultUsers);
      setFilteredUsers(defaultUsers);
      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
  }, []);

  // Filter and sort users when search term, sort field, sort direction, or filter changes
  useEffect(() => {
    let result = [...users];
    
    // Apply role filter
    if (filterRole !== "all") {
      result = result.filter(user => user.role === filterRole);
    }
    
    // Apply gender filter
    if (filterGender !== "all") {
      result = result.filter(user => user.gender === filterGender);
    }
    
    // Apply search
    if (searchTerm) {
      result = result.filter(
        user => 
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (user.contactNum && user.contactNum.includes(searchTerm))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let fieldA = a[sortField] ? a[sortField].toString().toLowerCase() : '';
      let fieldB = b[sortField] ? b[sortField].toString().toLowerCase() : '';
      
      if (sortField === 'id') {
        fieldA = Number(fieldA);
        fieldB = Number(fieldB);
      }
      
      if (fieldA < fieldB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredUsers(result);
  }, [users, searchTerm, sortField, sortDirection, filterRole, filterGender]);

  // Handle editing a user
  const handleEditUser = (user) => {
    setSelectedUser({...user});
    setIsEditModalOpen(true);
  };

  // Save edited user
  const saveEditedUser = () => {
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsEditModalOpen(false);
  };

  // Handle adding a new user
  const handleAddUser = () => {
    const newId = Math.max(...users.map(user => user.id), 0) + 1;
    const userToAdd = { ...newUser, id: newId };
    const updatedUsers = [...users, userToAdd];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setNewUser({
      username: "",
      email: "",
      password: "",
      role: "customer",
      contactNum: "",
      gender: "M"
    });
    setIsAddModalOpen(false);
  };

  // Delete user function
  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setShowDeleteConfirm(false);
  };

  // Change sort direction
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get sort indicator
  const getSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 mb-4 md:mb-0">
            User Management
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 ml-2">
              Dashboard
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            {/* Search bar */}
            <div className="relative flex-1 min-w-[240px]">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all shadow-sm"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            {/* Add user button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <UserPlus size={18} />
              <span>Add User</span>
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center">
            <Filter size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-700 font-medium">Filters:</span>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="roleFilter" className="text-sm text-gray-600">Role:</label>
            <select
              id="roleFilter"
              className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="genderFilter" className="text-sm text-gray-600">Gender:</label>
            <select
              id="genderFilter"
              className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
            >
              <option value="all">All</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <th className="px-4 py-3 text-left font-semibold cursor-pointer" onClick={() => handleSort("id")}>
                    <div className="flex items-center">
                      ID {getSortIndicator("id")}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold cursor-pointer" onClick={() => handleSort("username")}>
                    <div className="flex items-center">
                      Username {getSortIndicator("username")}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold cursor-pointer" onClick={() => handleSort("email")}>
                    <div className="flex items-center">
                      Email {getSortIndicator("email")}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold cursor-pointer" onClick={() => handleSort("role")}>
                    <div className="flex items-center">
                      Role {getSortIndicator("role")}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold cursor-pointer" onClick={() => handleSort("gender")}>
                    <div className="flex items-center">
                      Gender {getSortIndicator("gender")}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold cursor-pointer" onClick={() => handleSort("contactNum")}>
                    <div className="flex items-center">
                      Contact {getSortIndicator("contactNum")}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-indigo-50'
                    } hover:bg-indigo-100 transition-colors duration-150 ease-in-out`}
                  >
                    <td className="px-4 py-3 text-gray-700">{user.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{user.username}</td>
                    <td className="px-4 py-3 text-gray-600">{user.email || "-"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin" 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {user.gender === "M" ? "Male" : "Female"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.contactNum || "-"}</td>
                    <td className="px-4 py-3 flex justify-center gap-2">
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-1.5 bg-indigo-100 text-indigo-600 rounded-md hover:bg-indigo-200 transition-colors"
                        title="Edit user"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          setUserToDelete(user);
                          setShowDeleteConfirm(true);
                        }}
                        className="p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      No users found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-gray-500 text-sm">
            Showing {filteredUsers.length} out of {users.length} users
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl transform transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit User</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedUser.username}
                  onChange={(e) => setSelectedUser({...selectedUser, username: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedUser.email || ""}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                    value={selectedUser.password}
                    onChange={(e) => setSelectedUser({...selectedUser, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2.5 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedUser.contactNum || ""}
                  onChange={(e) => setSelectedUser({...selectedUser, contactNum: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="gender"
                      value="M"
                      checked={selectedUser.gender === "M"}
                      onChange={() => setSelectedUser({...selectedUser, gender: "M"})}
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="gender"
                      value="F"
                      checked={selectedUser.gender === "F"}
                      onChange={() => setSelectedUser({...selectedUser, gender: "F"})}
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedUser}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:opacity-90 focus:outline-none"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl transform transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Add New User</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2.5 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newUser.contactNum}
                  onChange={(e) => setNewUser({...newUser, contactNum: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="gender"
                      value="M"
                      checked={newUser.gender === "M"}
                      onChange={() => setNewUser({...newUser, gender: "M"})}
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="gender"
                      value="F"
                      checked={newUser.gender === "F"}
                      onChange={() => setNewUser({...newUser, gender: "F"})}
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:opacity-90 focus:outline-none"
              >
                <UserPlus size={16} />
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete user <span className="font-semibold">{userToDelete.username}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteUser(userToDelete.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;