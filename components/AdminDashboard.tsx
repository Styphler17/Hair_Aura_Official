
import React from 'react';
import AdminLayout from './AdminLayout';
import AdminProducts from './AdminProducts';
import AdminSettings from './AdminSettings';
import AdminProfile from './AdminProfile';
import AdminBlog from './AdminBlog';
import AdminOverview from './AdminOverview';

interface AdminDashboardProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentPage, onNavigate, onLogout }) => {
  const renderContent = () => {
    switch (currentPage) {
      case 'admin-overview':
        return <AdminOverview onNavigate={onNavigate} />;
      case 'admin-settings':
        return <AdminSettings />;
      case 'admin-profile':
        return <AdminProfile />;
      case 'admin-blog':
        return <AdminBlog />;
      case 'admin-products':
        return <AdminProducts />;
      default:
        return <AdminOverview onNavigate={onNavigate} />; // Default to overview
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;
