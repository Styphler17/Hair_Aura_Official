import React, { useState, useEffect } from 'react';
import { Lock, Camera, Plus, Trash2, User, Shield, Eye, EyeOff } from 'lucide-react';
import { AuthController } from '../backend/controllers/authController';
import { AdminUser, AdminRole } from '../backend/models';

const AdminProfile: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AdminUser>(AuthController.getCurrentUser());
  const [users, setUsers] = useState<AdminUser[]>([]);
  
  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [avatarPath, setAvatarPath] = useState('');
  
  // Password State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // New User State
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'Editor' as AdminRole });
  const [showNewUserPassword, setShowNewUserPassword] = useState(false);

  // Table State
  const [visiblePasswordId, setVisiblePasswordId] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    const fetchedUsers = await AuthController.getUsers();
    setUsers(fetchedUsers);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const updated = await AuthController.updateCurrentUser({ avatar: base64String });
        setCurrentUser(updated);
        await loadUsers();
        // Dispatch event to update avatar in AdminLayout topbar
        window.dispatchEvent(new Event('profile-updated'));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAvatarPathLoad = async () => {
    if (avatarPath) {
      const updated = await AuthController.updateCurrentUser({ avatar: avatarPath });
      setCurrentUser(updated);
      await loadUsers();
      setAvatarPath('');
      // Dispatch event to update avatar in AdminLayout topbar
      window.dispatchEvent(new Event('profile-updated'));
      alert("Avatar updated successfully from path.");
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
        alert("Passwords do not match");
        return;
    }
    try {
      await AuthController.updateCurrentUser({ password: newPass });
      alert("Password updated successfully.");
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } catch (error) {
      alert("Failed to update password: " + (error as Error).message);
    }
  };
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await AuthController.updateCurrentUser({
        name: editedName,
        email: editedEmail
      });
      setCurrentUser(updated);
      await loadUsers();
      setIsEditingProfile(false);
      // Dispatch event to update in AdminLayout topbar
      window.dispatchEvent(new Event('profile-updated'));
      alert("Profile updated successfully.");
    } catch (error) {
      alert("Failed to update profile: " + (error as Error).message);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthController.addUser(newUser);
      await loadUsers();
      setIsAddingUser(false);
      setNewUser({ name: '', email: '', password: '', role: 'Editor' });
      alert("User created successfully!");
    } catch (error) {
      alert("Failed to create user: " + (error as Error).message);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this admin user?')) {
      try {
        await AuthController.deleteUser(id);
        await loadUsers();
        alert("User deleted successfully!");
      } catch (error) {
        alert("Failed to delete user: " + (error as Error).message);
      }
    }
  };
  
  const startEditingProfile = () => {
    setEditedName(currentUser.name);
    setEditedEmail(currentUser.email);
    setIsEditingProfile(true);
  };

  const inputStyle = { backgroundColor: '#ffffff', color: '#0a0a0a' };

  return (
    <div className="w-full pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-aura-black">Admin Profile</h1>
        <p className="text-neutral-500 text-sm mt-1">Manage your credentials and team access.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile & Password */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Profile Card */}
          <div className="bg-white p-8 border border-neutral-200 rounded-sm shadow-sm">
            {!isEditingProfile ? (
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6 group cursor-pointer">
                  <div className="w-24 h-24 bg-aura-black rounded-full flex items-center justify-center text-white font-serif text-3xl overflow-hidden border-4 border-white shadow-lg">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      currentUser.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-aura-gold text-aura-black p-2 rounded-full cursor-pointer hover:bg-white hover:text-aura-black transition-colors shadow-sm">
                    <Camera size={14} />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
                
                <h3 className="font-bold text-xl text-aura-black">{currentUser.name}</h3>
                <p className="text-neutral-400 text-xs uppercase tracking-widest mb-4">{currentUser.role}</p>
                <p className="text-neutral-500 text-sm mb-4">{currentUser.email}</p>
                
                <button 
                  onClick={startEditingProfile}
                  className="text-xs font-bold uppercase tracking-widest text-aura-gold hover:text-aura-black transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4 mb-4">Edit Profile</h3>
                
                <div>
                  <label className="block text-[10px] font-bold text-aura-black mb-1 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                    style={inputStyle}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-aura-black mb-1 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="w-full border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                    style={inputStyle}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-aura-black mb-1 uppercase tracking-wider">Avatar Path (URL or Database Path)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={avatarPath}
                      onChange={(e) => setAvatarPath(e.target.value)}
                      placeholder="https://example.com/avatar.jpg or /uploads/avatar.jpg"
                      className="flex-1 border border-neutral-300 p-3 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      onClick={handleAvatarPathLoad}
                      className="bg-neutral-100 hover:bg-aura-gold hover:text-aura-black px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Load
                    </button>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">Or upload a file using the camera icon above</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    type="submit"
                    className="flex-1 bg-aura-black text-white px-4 py-3 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="flex-1 bg-neutral-100 text-neutral-600 px-4 py-3 uppercase text-xs font-bold tracking-widest hover:bg-neutral-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Change Password */}
          <div className="bg-white p-8 border border-neutral-200 rounded-sm shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4 mb-6">Security</h3>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-aura-black mb-1 uppercase tracking-wider">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full border border-neutral-300 p-3 pr-10 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                    style={inputStyle}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-aura-black"
                  >
                    {showNewPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-aura-black mb-1 uppercase tracking-wider">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full border border-neutral-300 p-3 pr-10 text-sm focus:outline-none focus:border-aura-black focus:ring-1 focus:ring-aura-gold"
                    style={inputStyle}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-aura-black"
                  >
                    {showConfirmPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full bg-aura-black text-white px-4 py-3 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 border border-aura-black hover:border-aura-gold hover:text-aura-gold mt-4">
                <Lock size={14} /> Update
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Team Management */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 border border-neutral-200 rounded-sm shadow-sm h-full">
            <div className="flex justify-between items-center mb-6 border-b border-neutral-100 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-aura-black">Team Management</h3>
                <p className="text-xs text-neutral-500 mt-1">Manage admin access and roles.</p>
              </div>
              <button 
                onClick={() => setIsAddingUser(!isAddingUser)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-neutral-100 hover:bg-aura-gold hover:text-aura-black px-4 py-2 rounded-sm transition-colors"
              >
                <Plus size={14} /> {isAddingUser ? 'Cancel' : 'Add User'}
              </button>
            </div>

            {isAddingUser && (
              <form onSubmit={handleAddUser} className="bg-neutral-50 p-6 mb-8 rounded-sm border border-neutral-100 animate-in fade-in slide-in-from-top-2">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-aura-black">New Admin User</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={newUser.name}
                      onChange={e => setNewUser({...newUser, name: e.target.value})}
                      className="w-full border border-neutral-300 p-2 text-sm"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={newUser.email}
                      onChange={e => setNewUser({...newUser, email: e.target.value})}
                      className="w-full border border-neutral-300 p-2 text-sm"
                      style={inputStyle}
                    />
                  </div>
                  
                  {/* Password Field for New User */}
                  <div className="relative">
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1">Set Password</label>
                    <input 
                      type={showNewUserPassword ? "text" : "password"}
                      required
                      value={newUser.password}
                      onChange={e => setNewUser({...newUser, password: e.target.value})}
                      className="w-full border border-neutral-300 p-2 text-sm pr-10"
                      style={inputStyle}
                    />
                    <button 
                       type="button"
                       onClick={() => setShowNewUserPassword(!showNewUserPassword)}
                       className="absolute right-3 top-7 text-neutral-400 hover:text-aura-black"
                    >
                        {showNewUserPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 mb-1">Role</label>
                    <select 
                      value={newUser.role}
                      onChange={e => setNewUser({...newUser, role: e.target.value as AdminRole})}
                      className="w-full border border-neutral-300 p-2 text-sm bg-white"
                      style={inputStyle}
                    >
                      <option value="Super Admin">Super Admin (Full Access)</option>
                      <option value="Editor">Editor (Manage Products)</option>
                      <option value="Viewer">Viewer (Read Only)</option>
                    </select>
                  </div>
                </div>
                <div className="text-right">
                  <button type="submit" className="bg-aura-black text-white px-6 py-2 uppercase text-xs font-bold tracking-widest hover:bg-neutral-800">
                    Create Account
                  </button>
                </div>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">User</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Role</th>
                    {currentUser.role === 'Super Admin' && (
                       <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Password</th>
                    )}
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Last Login</th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600 overflow-hidden">
                            {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <User size={14} />}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-aura-black">{user.name}</p>
                            <p className="text-xs text-neutral-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          user.role === 'Super Admin' ? 'bg-aura-black text-white' : 
                          user.role === 'Editor' ? 'bg-aura-gold/20 text-aura-black' : 'bg-neutral-100 text-neutral-500'
                        }`}>
                          <Shield size={10} /> {user.role}
                        </span>
                      </td>
                      
                      {/* Password Column (Super Admin Only) */}
                      {currentUser.role === 'Super Admin' && (
                        <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-neutral-500">
                                    {visiblePasswordId === user.id ? (user.password || '••••••') : '••••••'}
                                </span>
                                <button 
                                    onClick={() => setVisiblePasswordId(visiblePasswordId === user.id ? null : user.id)}
                                    className="text-neutral-400 hover:text-aura-black"
                                >
                                    {visiblePasswordId === user.id ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </td>
                      )}

                      <td className="py-4 px-4 text-xs text-neutral-500 font-mono">
                        {user.lastLogin === '-' ? 'Never' : new Date(user.lastLogin).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-2"
                          disabled={users.length <= 1} // Prevent deleting last user
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;