import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Link as LinkIcon, 
  Copy, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  LogOut, 
  ChevronRight,
  BarChart3,
  Calendar,
  Wallet,
  ArrowUpRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { affiliateService, User, AffiliateStats, CommissionRecord } from '../../services/affiliateService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const mockChartData = [
  { name: 'T2', clicks: 400, sales: 24 },
  { name: 'T3', clicks: 300, sales: 13 },
  { name: 'T4', clicks: 200, sales: 98 },
  { name: 'T5', clicks: 278, sales: 39 },
  { name: 'T6', clicks: 189, sales: 48 },
  { name: 'T7', clicks: 239, sales: 38 },
  { name: 'CN', clicks: 349, sales: 43 },
];

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [records, setRecords] = useState<CommissionRecord[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setStats(affiliateService.getStats());
    setRecords(affiliateService.getRecords());
  }, []);

  const affiliateLink = affiliateService.generateAffiliateLink(user);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-display font-black gold-text uppercase tracking-tighter">
              Bảng Điều Khiển Đối Tác
            </h1>
            <p className="text-gray-400">Chào mừng quay trở lại, <span className="text-white font-bold">{user.name}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Mã đối tác</p>
              <p className="text-gold font-black">{user.affiliateCode}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Affiliate Link Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2.5rem] border-gold/30 p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 bg-gold/5 -rotate-12 translate-x-10 -translate-y-10">
            <LinkIcon size={120} className="text-gold/10" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gold/20 rounded-lg border border-gold/30">
                <LinkIcon className="text-gold" size={20} />
              </div>
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Link Tiếp Thị Của Bạn</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-gray-300 font-mono text-sm break-all flex items-center">
                {affiliateLink}
              </div>
              <button 
                onClick={copyToClipboard}
                className="px-8 py-4 bg-gold text-black font-black rounded-2xl hover:bg-gold-light transition-all flex items-center justify-center gap-2 min-w-[160px] shadow-lg shadow-gold/20"
              >
                {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                {copied ? 'ĐÃ SAO CHÉP' : 'SAO CHÉP LINK'}
              </button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <div className="w-2 h-2 bg-gold rounded-full" />
                HOA HỒNG APP: <span className="text-gold">30%</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <div className="w-2 h-2 bg-gold rounded-full" />
                HOA HỒNG COACHING: <span className="text-gold">10%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Lượt Nhấp Link', value: stats.clicks, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Đơn Thành Công', value: stats.conversions, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { label: 'Tổng Doanh Thu', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: 'text-gold', bg: 'bg-gold/10' },
            { label: 'Hoa Hồng Tích Lũy', value: formatCurrency(stats.totalCommission), icon: Wallet, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-3xl border-white/5 p-6 hover:border-gold/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon size={24} />
                </div>
                <ArrowUpRight className="text-gray-600 group-hover:text-gold transition-colors" size={20} />
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-2xl font-black text-white tracking-tighter">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts & History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 glass-card rounded-[2.5rem] border-white/5 p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-gold" size={24} />
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Hiệu Suất Tiếp Thị</h2>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1 rounded-lg bg-gold text-black text-[10px] font-black uppercase tracking-widest">7 Ngày</button>
                <button className="px-4 py-1 rounded-lg bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-white/10">30 Ngày</button>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a24d" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#c9a24d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#666" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#666" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #c9a24d30', borderRadius: '12px' }}
                    itemStyle={{ color: '#c9a24d' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#c9a24d" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorClicks)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Payment Status */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-[2.5rem] border-white/5 p-8 space-y-6"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="text-gold" size={24} />
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Thanh Toán</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-gold/5 border border-gold/20">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Hoa hồng chờ duyệt</p>
                <p className="text-3xl font-black text-white tracking-tighter">{formatCurrency(stats.pendingCommission)}</p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Đã thanh toán</p>
                <p className="text-3xl font-black text-gray-400 tracking-tighter">{formatCurrency(stats.paidCommission)}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Tài khoản nhận tiền</p>
                <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-[8px] text-emerald-500 font-bold uppercase">Thanh toán Thứ 2 hàng tuần</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <CreditCard className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{user.bankName}</p>
                  <p className="text-gray-500 text-xs">{user.bankNumber} • {user.bankAccount}</p>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-white/5 text-gold font-black rounded-xl border border-gold/20 hover:bg-gold hover:text-black transition-all text-sm">
              YÊU CẦU RÚT TIỀN
            </button>
          </motion.div>
        </div>

        {/* Commission History */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2.5rem] border-white/5 p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Clock className="text-gold" size={24} />
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">Lịch Sử Hoa Hồng</h2>
            </div>
            <button className="text-gold text-xs font-bold hover:underline flex items-center gap-1">
              Xem tất cả <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Sản phẩm</th>
                  <th className="pb-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Giá trị</th>
                  <th className="pb-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Hoa hồng</th>
                  <th className="pb-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Trạng thái</th>
                  <th className="pb-4 text-[10px] text-gray-500 font-black uppercase tracking-widest">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {records.map((record) => (
                  <tr key={record.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-6">
                      <p className="text-white font-bold text-sm">{record.productName}</p>
                      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">ID: {record.id}</p>
                    </td>
                    <td className="py-6">
                      <p className="text-white font-bold">{formatCurrency(record.amount)}</p>
                    </td>
                    <td className="py-6">
                      <p className="text-gold font-black">+{formatCurrency(record.commission)}</p>
                      <p className="text-gray-500 text-[10px] font-bold">({record.percentage}%)</p>
                    </td>
                    <td className="py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        record.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gold/10 text-gold'
                      }`}>
                        {record.status === 'paid' ? 'Đã thanh toán' : 'Chờ duyệt'}
                      </span>
                    </td>
                    <td className="py-6">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Calendar size={14} />
                        {record.createdAt}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
