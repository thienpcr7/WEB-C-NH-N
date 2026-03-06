import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Search, 
  Filter, 
  Download, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { affiliateService, User } from '../../services/affiliateService';
import { useEditor } from '../../context/EditorContext';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const { isEditMode, setIsEditMode } = useEditor();
  const [activeTab, setActiveTab] = useState<'users' | 'purchases'>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const allUsers = affiliateService.getAllUsers();
    const allPurchases = affiliateService.getAllPurchases();
    
    // Sort users by date descending (newest first)
    setUsers([...allUsers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    
    // Sort purchases by date descending (newest first)
    setPurchases([...allPurchases].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  }, []);

  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) : amount;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num || 0);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone.includes(searchTerm)
  );

  const filteredPurchases = purchases.filter(p => 
    p.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-gold" size={24} />
              <h1 className="text-4xl font-display font-black gold-text uppercase tracking-tighter">
                Hệ Thống Quản Trị
              </h1>
            </div>
            <p className="text-gray-400">Chào Admin <span className="text-white font-bold">{user.name}</span>. Kiểm soát toàn bộ hệ thống tại đây.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-all text-sm font-bold ${isEditMode ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(201,162,77,0.4)]' : 'bg-white/5 text-gold border-gold/20 hover:bg-gold/10'}`}
            >
              <Edit3 size={16} /> {isEditMode ? 'ĐANG CHỈNH SỬA' : 'CHỈNH SỬA WEBSITE'}
            </button>
            <a 
              href="https://docs.google.com/spreadsheets/d/1dUdo8Rzo6AJI5VO7np1AlNFNfgYB2Myp1OyE4meL4zw/edit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all text-sm font-bold"
            >
              <ExternalLink size={16} /> GOOGLE SHEETS
            </a>
            <button 
              onClick={onLogout}
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl border-white/5 p-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
                <Users size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Tổng thành viên</p>
                <p className="text-2xl font-black text-white">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-3xl border-white/5 p-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                <ShoppingBag size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Tổng đơn hàng</p>
                <p className="text-2xl font-black text-white">{purchases.length}</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-3xl border-white/5 p-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-gold/10 text-gold rounded-2xl">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Ước tính doanh thu</p>
                <p className="text-2xl font-black text-white">
                  {formatCurrency(purchases.reduce((acc, p) => {
                    const price = typeof p.price === 'string' ? parseFloat(p.price.replace(/[^0-9.-]+/g, "")) : 0;
                    return acc + price;
                  }, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden">
          {/* Tabs & Search */}
          <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
              <button 
                onClick={() => setActiveTab('users')}
                className={`px-8 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
              >
                Thành viên
              </button>
              <button 
                onClick={() => setActiveTab('purchases')}
                className={`px-8 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'purchases' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
              >
                Đơn hàng
              </button>
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text"
                placeholder={activeTab === 'users' ? "Tìm thành viên..." : "Tìm đơn hàng..."}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            {activeTab === 'users' ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/5">
                    <th className="px-8 py-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Thành viên</th>
                    <th className="px-8 py-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Liên hệ</th>
                    <th className="px-8 py-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Ngân hàng</th>
                    <th className="px-8 py-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Mã Ref</th>
                    <th className="px-8 py-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Ngày tham gia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6">
                        <p className="text-white font-bold">{u.name}</p>
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">ID: {u.id}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Mail size={12} className="text-gold/50" /> {u.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Phone size={12} className="text-gold/50" /> {u.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="text-xs text-white font-bold">{u.bankName}</p>
                          <p className="text-[10px] text-gray-500">{u.bankNumber} • {u.bankAccount}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-gold/10 text-gold rounded-lg text-[10px] font-black uppercase tracking-widest border border-gold/20">
                          {u.affiliateCode}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          <Calendar size={14} />
                          {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-gray-500 italic">Không tìm thấy thành viên nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/5">
                    <th className="px-8 py-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Khách hàng</th>
                    <th className="px-8 py-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Sản phẩm</th>
                    <th className="px-8 py-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Giá trị</th>
                    <th className="px-8 py-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Mã Ref</th>
                    <th className="px-8 py-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredPurchases.map((p, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6">
                        <p className="text-white font-bold">{p.customerName}</p>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                          <Mail size={10} /> {p.customerEmail}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-white font-bold text-sm">{p.productName}</p>
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{p.paymentMethod}</span>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-gold font-black">{p.price}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${p.referralCode === 'NONE' ? 'bg-white/5 text-gray-500 border-white/10' : 'bg-gold/10 text-gold border-gold/20'}`}>
                          {p.referralCode}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          <Calendar size={14} />
                          {new Date(p.timestamp).toLocaleString('vi-VN')}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPurchases.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-gray-500 italic">Không tìm thấy đơn hàng nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
