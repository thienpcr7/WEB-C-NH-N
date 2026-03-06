import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, QrCode, CreditCard, Wallet, Globe, User, Phone, Mail, ArrowRight, CheckCircle2, Sparkles, Zap, LayoutGrid, Play, Info } from 'lucide-react';
import { affiliateService } from '../services/affiliateService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: string;
  image?: string;
  video?: string;
  details?: string[];
}

type PaymentMethod = 'bank' | 'paypal' | 'online';
type ModalView = 'details' | 'payment';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, productName, price, image, video, details }) => {
  const [copied, setCopied] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [view, setView] = useState<ModalView>('details');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Reset state when modal opens with a new product
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setIsProcessing(false);
      setView('details');
    }
  }, [isOpen, productName]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    setIsProcessing(true);

    // Get referral code if any
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref') || 'NONE';

    // Log to Google Sheet
    const purchaseData = {
      type: 'PURCHASE',
      productName,
      price,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      paymentMethod: method,
      referralCode: refCode,
      timestamp: new Date().toISOString()
    };

    affiliateService.logToGoogleSheet(purchaseData);
    affiliateService.savePurchase(purchaseData);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleContinue = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/95 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 40, rotateX: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40, rotateX: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="relative w-full max-w-7xl glass-card rounded-[3rem] overflow-hidden border-gold/40 shadow-[0_0_120px_rgba(201,162,77,0.4)] my-8 perspective-1000"
        >
          {/* Neon Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/15 blur-[120px] rounded-full pointer-events-none animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

          {!isSuccess ? (
            <>
              {view === 'details' ? (
                <div className="flex flex-col relative z-10">
                  {/* Product Details View */}
                  <div className="p-8 border-b border-gold/20 bg-gradient-to-b from-gold/10 to-transparent flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1 space-y-2 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <Info className="text-gold animate-pulse" size={18} />
                        <h3 className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">Chi tiết sản phẩm</h3>
                      </div>
                      <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">{productName}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 bg-black border border-gold/30 hover:bg-gold hover:text-black rounded-full transition-all">
                      <X size={16} />
                    </button>
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Media Section */}
                      <div className="space-y-4">
                        {video ? (
                          <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-gold/30 shadow-2xl group">
                            <video 
                              src={video} 
                              autoPlay 
                              loop 
                              muted 
                              playsInline
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="text-gold" size={48} />
                            </div>
                          </div>
                        ) : image && (
                          <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-gold/30 shadow-2xl">
                            <img 
                              src={image} 
                              alt={productName} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}
                        <div className="bg-gold/5 border border-gold/20 p-4 rounded-2xl">
                          <p className="text-gold font-black text-center text-2xl">{price}</p>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                            <Sparkles size={14} className="text-gold" /> Tính năng nổi bật
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {(details || [
                              'Full quyền truy cập hệ thống',
                              'Cập nhật tính năng trọn đời',
                              'Hỗ trợ kỹ thuật 24/7',
                              'Bảo hành vĩnh viễn'
                            ]).map((detail, i) => (
                              <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                                <CheckCircle2 size={16} className="text-gold" />
                                <span className="text-sm text-gray-300 font-medium">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setView('payment')}
                      className="w-full py-5 bg-gold text-black font-black text-xl rounded-2xl hover:bg-gold-light transition-all neon-glow-strong flex items-center justify-center gap-3 shadow-2xl shadow-gold/20 group"
                    >
                      MUA NGAY <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header with Product Info */}
                  <div className="p-8 border-b border-gold/20 bg-gradient-to-b from-gold/10 to-transparent relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Sparkles className="text-gold animate-pulse" size={18} />
                    <h3 className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">Hệ thống thanh toán tự động</h3>
                  </div>
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">{productName}</h2>
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle2 size={10} /> Sẵn sàng kích hoạt
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                      <Zap size={10} /> VIP PRO 2026
                    </span>
                  </div>
                </div>
                
                <div className="bg-black/60 p-6 rounded-[2rem] border border-gold/30 shadow-2xl min-w-[240px] text-center relative group">
                  <div className="absolute -inset-1 bg-gold/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 relative z-10">Giá thanh toán</p>
                  <p className="text-4xl font-black gold-text relative z-10">{price}</p>
                  <button onClick={onClose} className="absolute -top-3 -right-3 p-2 bg-black border border-gold/30 hover:bg-gold hover:text-black rounded-full transition-all z-20">
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row relative z-10">
                {/* Left Side: Product Info & Form */}
                <div className="w-full lg:w-[420px] p-8 bg-black/20 space-y-8 shrink-0">
                  {/* Product Details Area */}
                  <div className="space-y-4">
                    <h4 className="text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 opacity-60">
                      <LayoutGrid size={12} className="text-gold" /> Chi tiết sản phẩm
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'Full quyền truy cập',
                        'Cập nhật trọn đời',
                        'Hỗ trợ 24/7',
                        'Bảo hành vĩnh viễn'
                      ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                          <Check size={12} className="text-gold" />
                          <span className="text-[11px] text-gray-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compact Form */}
                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 opacity-60">
                        <User size={12} className="text-gold" /> Thông tin khách hàng
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold transition-colors" size={14} />
                          <input 
                            required
                            type="text" 
                            placeholder="Họ tên" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-gold focus:bg-gold/5 transition-all text-xs"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold transition-colors" size={14} />
                          <input 
                            required
                            type="tel" 
                            placeholder="Số Zalo" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-gold focus:bg-gold/5 transition-all text-xs"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        <div className="relative group md:col-span-2">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold transition-colors" size={14} />
                          <input 
                            required
                            type="email" 
                            placeholder="Email nhận tài khoản" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-gold focus:bg-gold/5 transition-all text-xs"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 opacity-60">
                        <CreditCard size={12} className="text-gold" /> Phương thức
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'bank', icon: CreditCard, label: 'Bank' },
                          { id: 'paypal', icon: Wallet, label: 'PayPal' },
                          { id: 'online', icon: Globe, label: 'Online' }
                        ].map((item) => (
                          <button 
                            key={item.id}
                            type="button"
                            onClick={() => setMethod(item.id as PaymentMethod)}
                            className={`py-2 px-2 rounded-xl border transition-all flex flex-col items-center gap-1 ${method === item.id ? 'border-gold bg-gold/10 shadow-[0_0_15px_rgba(201,162,77,0.2)]' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                          >
                            <item.icon size={16} className={method === item.id ? 'text-gold' : 'text-gray-500'} />
                            <span className={`text-[8px] font-black uppercase ${method === item.id ? 'text-gold' : 'text-gray-500'}`}>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 bg-gold text-black font-black rounded-xl hover:bg-gold-light transition-all neon-glow-strong flex items-center justify-center gap-3 shadow-xl shadow-gold/20 disabled:opacity-50 group"
                    >
                      {isProcessing ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN THANH TOÁN'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>

                {/* Right Side: Large QR & Details */}
                <div className="w-full lg:flex-1 p-8 md:p-12 bg-black/40 flex flex-col justify-center border-l border-gold/10 relative">
                  {/* Background Neon Light Box Effect */}
                  <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />

                  {method === 'bank' && (
                    <div className="relative z-10 space-y-8">
                      <div className="text-center md:text-left space-y-1 mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                          <Sparkles size={14} /> VIP PAYMENT GATEWAY
                        </div>
                        <h4 className="text-2xl font-black text-white tracking-tighter uppercase">Quét mã để kích hoạt ngay</h4>
                        <p className="text-[10px] text-gold/60 font-bold uppercase tracking-widest">Hệ thống xử lý tự động trong 30 giây</p>
                      </div>

                      <div className="flex flex-col xl:flex-row items-center gap-10">
                        {/* QR Section - Centered and Large */}
                        <div className="relative group shrink-0">
                          {/* Multi-layered Neon Glow */}
                          <div className="absolute -inset-8 bg-gold/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                          <div className="absolute -inset-1 bg-gradient-to-r from-gold via-yellow-200 to-gold rounded-[2.5rem] opacity-40 blur-sm animate-spin-slow" />
                          
                          <div className="relative p-2 bg-white rounded-[2.2rem] border-4 border-gold shadow-[0_0_80px_rgba(201,162,77,0.5)] transform group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                            <img 
                              src={`https://img.vietqr.io/image/techcombank-19035907828017-compact2.jpg?amount=0&addInfo=${encodeURIComponent(formData.name || 'THANH TOAN')}&accountName=NGUYEN%20QUOC%20THIEN`} 
                              alt="QR Techcombank" 
                              className="w-64 h-64 md:w-72 md:h-72 object-cover"
                            />
                            {/* Inner Corner Accents */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-gold/40" />
                            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-gold/40" />
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-gold/40" />
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-gold/40" />
                          </div>
                        </div>

                        {/* Info Section - Beside QR */}
                        <div className="flex-1 w-full space-y-4">
                          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 group/item hover:border-gold/40 transition-all hover:bg-white/10">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Ngân hàng</p>
                                <p className="text-xl font-black text-white">TECHCOMBANK</p>
                              </div>
                              <div className="p-2 bg-gold/10 rounded-lg">
                                <Zap size={20} className="text-gold" />
                              </div>
                            </div>
                            <div className="h-px bg-white/10 my-4" />
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Số tài khoản</p>
                                <p className="text-2xl font-black text-gold tracking-tighter">19035907828017</p>
                              </div>
                              <button onClick={() => copyToClipboard('19035907828017')} className="p-3 bg-gold/10 hover:bg-gold/20 rounded-2xl transition-all active:scale-95 border border-gold/20">
                                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} className="text-gold" />}
                              </button>
                            </div>
                          </div>

                          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 group/item hover:border-gold/40 transition-all hover:bg-white/10">
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Chủ tài khoản</p>
                            <p className="text-lg font-black text-white uppercase tracking-tighter">NGUYỄN QUỐC THIỆN</p>
                          </div>

                          <div className="pt-4 flex items-center gap-3">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                            <p className="text-[9px] text-gold font-black uppercase tracking-[0.4em] animate-pulse">
                              Auto Confirm 24/7
                            </p>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {method === 'paypal' && (
                    <div className="text-center space-y-6">
                      <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/30">
                        <Wallet size={32} className="text-blue-400" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-400">Chuyển qua PayPal</p>
                        <p className="text-sm font-black text-white">quocthiencr7@gmail.com</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('quocthiencr7@gmail.com')}
                        className="w-full py-3 bg-blue-600/20 text-blue-400 rounded-xl text-xs font-black border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-all"
                      >
                        SAO CHÉP EMAIL PAYPAL
                      </button>
                    </div>
                  )}

                  {method === 'online' && (
                    <div className="text-center space-y-4 py-10">
                      <Globe size={48} className="text-gold mx-auto animate-spin-slow opacity-50" />
                      <p className="text-xs text-gray-500 font-medium">Cổng thanh toán đang bảo trì...</p>
                      <p className="text-[10px] text-gold uppercase font-black">Vui lòng dùng Bank</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
            <div className="p-16 text-center space-y-8 relative z-10 bg-gradient-to-b from-gold/10 to-transparent">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(201,162,77,0.6)] border-4 border-white/20"
              >
                <CheckCircle2 size={64} className="text-black" />
              </motion.div>
              <div className="space-y-4">
                <h3 className="text-5xl font-black gold-text tracking-tighter">THANH TOÁN THÀNH CÔNG!</h3>
                <p className="text-xl text-gray-300 font-medium">Cảm ơn <span className="text-gold">{formData.name}</span> đã tin tưởng THIỆN VUA APP</p>
                <div className="max-w-md mx-auto p-6 glass-card rounded-3xl border-gold/20 bg-black/40">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Hệ thống đang xử lý đơn hàng. Tài khoản và link truy cập sẽ được gửi đến <span className="text-gold font-bold">{formData.email}</span> trong vòng 15 phút tới.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <button 
                  onClick={handleContinue}
                  className="px-10 py-5 bg-gold text-black font-black rounded-2xl hover:bg-gold-light transition-all neon-glow flex items-center justify-center gap-3 text-lg group"
                >
                  TIẾP TỤC MUA SẮM <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
