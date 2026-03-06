import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Phone, CreditCard, Building2, LogIn, UserPlus } from 'lucide-react';
import { affiliateService, User as UserType } from '../../services/affiliateService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    bankName: '',
    bankAccount: '',
    bankNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin check
    if (isLogin && formData.email.toUpperCase() === 'THIEN') {
      const adminUser: UserType = {
        id: 'ADMIN-001',
        name: 'THIỆN QUẢN TRỊ',
        email: 'THIEN',
        phone: '0900000000',
        bankName: 'ADMIN',
        bankAccount: 'ADMIN',
        bankNumber: 'ADMIN',
        affiliateCode: 'ADMIN',
        createdAt: new Date().toISOString(),
        role: 'admin'
      };
      affiliateService.setUser(adminUser);
      onSuccess(adminUser);
      onClose();
      return;
    }

    // Simulate auth logic
    const mockUser: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'Thành viên VIP',
      email: formData.email,
      phone: formData.phone || '0900000000',
      bankName: formData.bankName || 'Vietcombank',
      bankAccount: formData.bankAccount || 'NGUYEN VAN A',
      bankNumber: formData.bankNumber || '1234567890',
      affiliateCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
      createdAt: new Date().toISOString(),
      role: 'user'
    };

    affiliateService.setUser(mockUser);
    
    // Save to global list for admin to see
    affiliateService.saveUserToAll(mockUser);
    
    // Log registration to Google Sheet
    affiliateService.logToGoogleSheet({
      type: 'AFFILIATE_REGISTRATION',
      name: mockUser.name,
      email: mockUser.email,
      phone: mockUser.phone,
      bankName: mockUser.bankName,
      bankAccount: mockUser.bankAccount,
      bankNumber: mockUser.bankNumber,
      affiliateCode: mockUser.affiliateCode,
      timestamp: new Date().toLocaleString('vi-VN')
    });

    onSuccess(mockUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-md glass-card rounded-[2.5rem] border-gold/30 p-8 overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gold/20">
            {isLogin ? <LogIn className="text-gold" size={32} /> : <UserPlus className="text-gold" size={32} />}
          </div>
          <h2 className="text-3xl font-display font-black gold-text uppercase tracking-tighter">
            {isLogin ? 'Đăng Nhập' : 'Đăng Ký Đối Tác'}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {isLogin ? 'Chào mừng bạn quay trở lại với hệ thống' : 'Bắt đầu kiếm tiền cùng Thiện Vua App'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
              <input 
                required
                type="text"
                placeholder="Họ và tên"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
            <input 
              required
              type="email"
              placeholder="Email"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
              <input 
                required
                type="tel"
                placeholder="Số điện thoại"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
            <input 
              required
              type="password"
              placeholder="Mật khẩu"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {!isLogin && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <p className="text-[10px] text-gold font-black uppercase tracking-widest">Thông tin thanh toán hoa hồng</p>
              
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                <input 
                  required
                  type="text"
                  placeholder="Tên ngân hàng (VD: Vietcombank)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                  value={formData.bankName}
                  onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                />
              </div>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                <input 
                  required
                  type="text"
                  placeholder="Tên chủ tài khoản"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                  value={formData.bankAccount}
                  onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                />
              </div>

              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                <input 
                  required
                  type="text"
                  placeholder="Số tài khoản"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-gold transition-colors"
                  value={formData.bankNumber}
                  onChange={(e) => setFormData({...formData, bankNumber: e.target.value})}
                />
              </div>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-gold text-black font-black rounded-xl hover:bg-gold-light transition-all neon-glow mt-6"
          >
            {isLogin ? 'ĐĂNG NHẬP NGAY' : 'ĐĂNG KÝ ĐỐI TÁC'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-400 hover:text-gold transition-colors"
          >
            {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
