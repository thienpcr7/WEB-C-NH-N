import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Zap, 
  Target, 
  Users, 
  MessageSquare, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Facebook, 
  Youtube, 
  Mail,
  Phone,
  LayoutGrid,
  TrendingUp,
  Cpu,
  User as UserIcon,
  BarChart3
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from './lib/utils';
import { SectionHeader } from './components/SectionHeader';
import { AppCard } from './components/AppCard';
import { PaymentModal } from './components/PaymentModal';
import { AuthModal } from './components/Affiliate/AuthModal';
import { Dashboard as AffiliateDashboard } from './components/Affiliate/Dashboard';
import { AdminDashboard } from './components/Affiliate/AdminDashboard';
import { EditorToolbar, InspectorPanel, EditableText, EditableImage } from './components/VisualEditor';
import { useEditor } from './context/EditorContext';
import { APP_ECOSYSTEM, AppItem } from './constants';
import { affiliateService, User } from './services/affiliateService';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { siteData, setSiteData, isEditMode } = useEditor();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showAffiliateDashboard, setShowAffiliateDashboard] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    price: string;
    image?: string;
    video?: string;
    details?: string[];
  }>({ name: '', price: '' });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    // Check for logged in user
    const user = affiliateService.getUser();
    if (user) setCurrentUser(user);

    // Check for referral code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      console.log('Referral detected:', refCode);
    }
    // GSAP Animations
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      gsap.to('.hero-image', {
        y: -30,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBuy = (app: AppItem) => {
    setSelectedProduct({ 
      name: app.name, 
      price: app.price,
      image: app.image,
      video: app.video,
      details: app.details
    });
    setIsPaymentOpen(true);
  };

  const handleBuyCourse = () => {
    setSelectedProduct({ 
      name: 'TRUYỀN NHÂN NGƯỜI KẾ VỊ TẠO RA 1000 APP MỘT CHẠM KIẾM TIỀN TỰ ĐỘNG', 
      price: '3.990$',
      image: 'https://lh3.googleusercontent.com/d/1SZs6E4k2ojehy8TVo1eK-1ptzoqD3zIX',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-world-map-with-glowing-lines-32624-large.mp4',
      details: [
        'Hệ thống kiếm tiền tự động 100%',
        'Tặng kèm 10 App AI đã code sẵn',
        'Cố vấn trực tiếp từ Thiện Vua App',
        'Bảo hành thu nhập trọn đời'
      ]
    });
    setIsPaymentOpen(true);
  };

  const handleLogout = () => {
    affiliateService.logout();
    setCurrentUser(null);
    setShowAffiliateDashboard(false);
  };

  const handleAffiliateClick = () => {
    if (currentUser) {
      setShowAffiliateDashboard(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAuthOpen(true);
    }
  };

  if (showAffiliateDashboard && currentUser) {
    return (
      <div className="relative min-h-screen bg-black">
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-white/5 bg-black/50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setShowAffiliateDashboard(false)}
            >
              <div className="w-10 h-10 rounded-full border-2 border-gold p-1">
                <img 
                  src="https://i.postimg.cc/hh2HK1Gf/LOGO-VUA-APP.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-display font-black gold-text tracking-tighter">THIỆN VUA APP</span>
            </div>
            
            <button 
              onClick={() => setShowAffiliateDashboard(false)}
              className="px-6 py-2 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all text-sm"
            >
              QUAY LẠI TRANG CHỦ
            </button>
          </div>
        </nav>
        {currentUser.role === 'admin' ? (
          <AdminDashboard user={currentUser} onLogout={handleLogout} />
        ) : (
          <AffiliateDashboard user={currentUser} onLogout={handleLogout} />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-screen font-sans selection:bg-gold selection:text-black">
      
      {/* Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,#000_100%)]"
      />
      <div className="fixed inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-gold p-1 animate-spin-slow neon-glow">
              <EditableImage 
                id="site-logo"
                src={siteData.header.logoUrl}
                onChange={(src) => setSiteData({ ...siteData, header: { ...siteData.header, logoUrl: src } })}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <EditableText 
              id="site-name"
              as="span"
              value="THIỆN VUA APP"
              onChange={() => {}}
              className="text-2xl font-display font-black gold-text tracking-tighter"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Hệ sinh thái', 'Khóa học', 'Kết quả', 'Liên hệ'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gold transition-colors"
              >
                {item}
              </a>
            ))}
            <button 
              onClick={handleAffiliateClick}
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold hover:text-gold-light transition-colors"
            >
              <BarChart3 size={18} /> TIẾP THỊ LIÊN KẾT
            </button>
            <button 
              onClick={() => handleBuyCourse()}
              className="px-6 py-2 bg-gold text-black font-bold rounded-full hover:bg-gold-light transition-all neon-glow"
            >
              BẮT ĐẦU NGAY
            </button>
          </div>
        </div>
      </nav>

      {/* Top Banner Image */}
      <div className="w-full pt-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full aspect-[21/9] md:aspect-[25/7] rounded-[2.5rem] overflow-hidden border-2 border-gold/30 shadow-[0_0_50px_rgba(201,162,77,0.2)]"
        >
          <EditableImage 
            id="top-banner"
            src={siteData.hero.mediaUrl}
            onChange={(src) => setSiteData({ ...siteData, hero: { ...siteData.hero, mediaUrl: src } })}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-[10px] font-black uppercase tracking-widest">
              <Zap size={10} /> Premium Experience
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="hero-content z-10 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-10"
            >
              <Zap size={14} /> Kỷ Nguyên AI 2026
            </motion.div>
            <EditableText 
              id="hero-title"
              as="h1"
              value={siteData.hero.title}
              onChange={(val) => setSiteData({ ...siteData, hero: { ...siteData.hero, title: val } })}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1.1] mb-10 tracking-tighter"
            />
            <EditableText 
              id="hero-subtitle"
              as="p"
              value={siteData.hero.subtitle}
              onChange={(val) => setSiteData({ ...siteData, hero: { ...siteData.hero, subtitle: val } })}
              className="text-xl md:text-2xl text-gray-400 mb-14 font-montserrat leading-relaxed max-w-4xl mx-auto"
            />
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => handleBuyCourse()}
                className="px-12 py-6 bg-gold text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-gold-light transition-all shadow-2xl shadow-gold/30 group text-xl"
              >
                {siteData.hero.buttonText} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('he-sinh-thai')?.scrollIntoView()}
                className="px-12 py-6 bg-white/5 text-white font-black rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-xl"
              >
                SỞ HỮU HỆ SINH THÁI APP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Introduction Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-white/[0.02] perspective-1000">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center preserve-3d"
          >
            {/* Text Content - Now on the Left */}
            <div className="space-y-10 order-1">
              <div className="space-y-3">
                <EditableText 
                  id="expert-label"
                  as="h3"
                  value="CHUYÊN GIA ĐÀO TẠO"
                  onChange={() => {}}
                  className="text-gold font-black uppercase tracking-[0.4em] text-xs"
                />
                <EditableText 
                  id="expert-name"
                  as="h2"
                  value="THIỆN VUA APP"
                  onChange={() => {}}
                  className="text-6xl md:text-8xl font-display font-black gold-text leading-none tracking-tighter"
                />
              </div>
              
              <div className="p-8 border-l-4 border-gold bg-gold/5 rounded-r-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gold/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <p className="text-2xl md:text-3xl font-bold text-white italic leading-tight relative z-10">
                  "Huấn luyện AI thực chiến – Xây hệ thống bán hàng tự động – Nhân bản thu nhập bền vững"
                </p>
              </div>

              <div className="space-y-6 text-gray-300 font-montserrat text-lg leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-black first-letter:text-gold first-letter:mr-3 first-letter:float-left">
                  <span className="text-gold font-bold">THIỆN VUA APP</span> là thương hiệu đào tạo và triển khai AI dành cho người kinh doanh, chủ doanh nghiệp, đội ngũ bán hàng và cá nhân muốn tạo đột phá thu nhập trong thời đại trí tuệ nhân tạo.
                </p>
                <p>
                  Chúng tôi không dạy AI theo lý thuyết, mà tập trung ứng dụng AI để tạo nội dung – bán hàng – chăm sóc khách – xây hệ thống tự động – scale đội nhóm.
                </p>
                <p className="bg-white/5 p-8 rounded-[2rem] border border-white/10 neon-border-gold relative">
                  Mục tiêu của <span className="text-gold font-bold">THIỆN VUA APP</span> là giúp mỗi học viên làm chủ công nghệ AI, làm chủ dòng tiền và làm chủ cuộc chơi kinh doanh mới, <span className="text-white font-bold">cho đối thủ hít khói</span> khi không biết tận dụng sức mạnh AI để đi đầu.
                </p>
              </div>

              <div className="flex gap-12 pt-6">
                <div className="space-y-1">
                  <p className="text-5xl font-black gold-text">05+</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">Năm kinh nghiệm</p>
                </div>
                <div className="space-y-1">
                  <p className="text-5xl font-black gold-text">5000+</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">Giờ huấn luyện</p>
                </div>
                <div className="space-y-1">
                  <p className="text-5xl font-black gold-text">100%</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">Thực chiến</p>
                </div>
              </div>
            </div>

            {/* Image Content - Now on the Right */}
            <div className="relative order-2">
              <div className="hero-image relative z-10 rounded-[4rem] overflow-hidden border-2 border-gold/40 neon-glow-strong transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://lh3.googleusercontent.com/d/1yophQsMDAFo7yyDqSGFbPG5YLWG2cdSd" 
                  alt="Thiện Vua App Expert" 
                  className="w-full h-auto object-cover scale-105 hover:scale-100 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative elements - High-end Neon Glows */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/10 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-10 z-20 bg-black border-2 border-gold p-6 rounded-3xl neon-glow animate-float">
                <p className="text-gold font-black text-center leading-tight">
                  MASTER <br />
                  <span className="text-white text-2xl">AI 2026</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="he-sinh-thai" className="py-24 px-6 bg-black/50 perspective-1000">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeader 
              title={siteData.ecosystem.title} 
              subtitle={siteData.ecosystem.subtitle}
              onTitleChange={(val) => setSiteData({ ...siteData, ecosystem: { ...siteData.ecosystem, title: val } })}
              onSubtitleChange={(val) => setSiteData({ ...siteData, ecosystem: { ...siteData.ecosystem, subtitle: val } })}
            />
          </motion.div>
          
          <div className="space-y-20">
            {Object.entries(
              APP_ECOSYSTEM.reduce((acc, app) => {
                const category = app.category;
                if (!acc[category]) acc[category] = [];
                acc[category].push(app);
                return acc;
              }, {} as Record<string, typeof APP_ECOSYSTEM>)
            ).map(([category, apps], catIndex) => (
              <div key={category} className="space-y-10">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-2 h-8 bg-gold rounded-full shadow-[0_0_15px_rgba(201,162,77,0.5)]" />
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
                    {category}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...apps].sort((a, b) => a.name.localeCompare(b.name)).map((app, index) => (
                    <motion.div 
                      key={app.id}
                      initial={{ opacity: 0, y: 30, rotateY: index % 2 === 0 ? 10 : -10 }}
                      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      whileHover={{ y: -10, rotateY: 5, scale: 1.02 }}
                      className="preserve-3d"
                    >
                      <AppCard app={app} onBuy={handleBuy} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Product Section */}
      <section id="khóa-học" className="py-24 px-6 relative overflow-hidden perspective-1000">
        <div className="absolute top-0 left-0 w-full h-full bg-gold/5 -skew-y-3 origin-top-left -z-10" />
        
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-12 items-center text-center"
          >
            {/* Image on Top - Full Width */}
            <div className="w-full relative group">
              <div className="aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl shadow-gold/20 border-2 border-gold/30 relative">
                <EditableImage 
                  id="course-preview-image"
                  src={siteData.course.imageUrl}
                  onChange={(src) => setSiteData({ ...siteData, course: { ...siteData.course, imageUrl: src } })}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer">
                  <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(201,162,77,0.5)]">
                    <Play fill="black" size={40} className="ml-1" />
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-8 py-2 rounded-full bg-gold text-black text-sm font-black uppercase tracking-[0.2em] shadow-xl z-20">
                SẢN PHẨM CHỦ LỰC
              </div>
            </div>

            {/* Content Below */}
            <div className="space-y-8 max-w-4xl">
              <EditableText 
                id="course-title"
                as="h2"
                value={siteData.course.title}
                onChange={(val) => setSiteData({ ...siteData, course: { ...siteData.course, title: val } })}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-tight tracking-tighter"
              />
              <p className="text-xl md:text-2xl text-gray-400 font-montserrat leading-relaxed">
                Xây dựng hệ thống kiếm tiền tự động từ con số 0, kể cả khi bạn không giỏi kỹ thuật, không có đội ngũ và không có nhiều thời gian.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {[
                  'Tư duy kiếm tiền thời đại AI',
                  'Tạo content bán hàng đỉnh cao bằng AI',
                  'Tạo ra hàng nghìn app bằng 1 chạm',
                  'Xây phễu marketing & chatbot tự động',
                  'Automation chăm sóc khách hàng 24/7',
                  'Nhân bản đội nhóm bán hàng tự động'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors">
                    <CheckCircle2 className="text-gold shrink-0" size={28} /> 
                    <span className="text-lg font-bold text-white/90">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-10 glass-card rounded-[3rem] border-gold/40 relative overflow-hidden mt-10">
                <div className="absolute top-0 right-0 p-5 bg-red-600 text-white text-xs font-black uppercase tracking-widest -rotate-45 translate-x-10 -translate-y-2 shadow-lg">
                  GIỚI HẠN 3 SUẤT
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
                  <div className="text-center md:text-left">
                    <p className="text-gray-500 line-through text-xl mb-1">Giá gốc: 10.000$</p>
                    <div className="flex items-center gap-2">
                      <span className="text-5xl md:text-6xl font-black gold-text tracking-tighter">ƯU ĐÃI: </span>
                      <EditableText 
                        id="course-price"
                        value={siteData.course.price}
                        onChange={(val) => setSiteData({ ...siteData, course: { ...siteData.course, price: val } })}
                        className="text-5xl md:text-6xl font-black gold-text tracking-tighter"
                      />
                    </div>
                  </div>
                  <div className="text-center md:text-right space-y-2">
                    <div className="px-4 py-1 rounded-lg bg-gold/10 border border-gold/20 inline-block">
                      <p className="text-sm text-gold font-black uppercase tracking-widest">Tặng kèm bộ Prompt AI</p>
                    </div>
                    <div className="px-4 py-1 rounded-lg bg-gold/10 border border-gold/20 block">
                      <p className="text-sm text-gold font-black uppercase tracking-widest">+ 10 App đã code sẵn</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleBuyCourse}
                  className="w-full py-6 bg-gold text-black font-black text-2xl rounded-2xl hover:bg-gold-light transition-all neon-glow-strong flex items-center justify-center gap-4 group"
                >
                  ĐĂNG KÝ HỌC NGAY <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section id="kết-quả" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="KẾT QUẢ THẬT - KHÔNG NÓI SUÔNG" 
            subtitle="Hàng trăm học viên đã ứng dụng AI để tăng hiệu suất làm việc, tiết kiệm thời gian và tạo ra doanh thu ổn định."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-3xl overflow-hidden">
                <div className="aspect-video bg-white/5 relative">
                  <img 
                    src={`https://image.pollinations.ai/prompt/professional-testimonial-video-thumbnail-successful-ai-entrepreneur-gold-luxury-3d-render-${i}?width=600&height=400&nologo=true&seed=88${i}`} 
                    alt="Testimonial" 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="text-gold" size={48} />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2">Học viên #{i} - CEO Doanh nghiệp</h4>
                  <p className="text-gray-400 text-sm italic">"AI đã giúp tôi cắt giảm 70% chi phí nhân sự và tăng gấp 3 lần hiệu suất marketing chỉ sau 2 tháng."</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-gold/20">
                <img 
                  src={`https://image.pollinations.ai/prompt/revenue-dashboard-screenshot-high-numbers-gold-theme-${i}?width=400&height=400&nologo=true`} 
                  alt="Revenue" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">
            AI KHÔNG THAY THẾ BẠN. <br />
            <span className="gold-text">NGƯỜI BIẾT DÙNG AI SẼ THAY THẾ BẠN.</span>
          </h2>
          <p className="text-2xl text-gray-400 font-montserrat">
            Quyết định hôm nay – Kết quả trong 6 tháng tới. Đừng để mình bị bỏ lại phía sau.
          </p>
          <button 
            onClick={handleBuyCourse}
            className="px-12 py-6 bg-gold text-black font-black text-2xl rounded-2xl hover:bg-gold-light transition-all neon-glow-strong animate-bounce"
          >
            BẮT ĐẦU NGAY – KHÔNG TRÌ HOÃN
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="liên-hệ" className="py-20 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.postimg.cc/hh2HK1Gf/LOGO-VUA-APP.png" 
                alt="Logo" 
                className="w-10 h-10 rounded-full"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-display font-black gold-text">THIỆN VUA APP</span>
            </div>
            <div className="flex gap-4 items-start">
              <img 
                src="https://lh3.googleusercontent.com/d/1FwzHay7yjPSj-z28aQ1E-rFPAhHWCkeN" 
                alt="Thiện Vua App Small" 
                className="w-20 h-20 object-cover rounded-xl border border-gold/30 flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <p className="text-gray-500 text-sm leading-relaxed">
                Đơn vị tiên phong trong huấn luyện và triển khai AI thực chiến cho doanh nghiệp tại Việt Nam.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/nguyen.quocthien.58/" target="_blank" className="p-2 bg-white/5 rounded-full text-gold hover:bg-gold hover:text-black transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://www.youtube.com/@NGUY%E1%BB%84NQU%E1%BB%90CTHI%E1%BB%86NAI" target="_blank" className="p-2 bg-white/5 rounded-full text-gold hover:bg-gold hover:text-black transition-all">
                <Youtube size={20} />
              </a>
              <a href="https://www.tiktok.com/@thien.master.app" target="_blank" className="p-2 bg-white/5 rounded-full text-gold hover:bg-gold hover:text-black transition-all">
                <Globe size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors">
                <Phone size={18} className="text-gold" /> 
                <EditableText 
                  id="footer-phone"
                  value="0985774448"
                  onChange={() => {}}
                  className="inline-block"
                />
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors">
                <MessageSquare size={18} className="text-gold" /> 
                <EditableText 
                  id="footer-zalo"
                  value="Zalo: 0968065274"
                  onChange={() => {}}
                  className="inline-block"
                />
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-gold transition-colors">
                <Mail size={18} className="text-gold" /> 
                <EditableText 
                  id="footer-email"
                  value="thienmasterai@gmail.com"
                  onChange={() => {}}
                  className="inline-block"
                />
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Dịch vụ</h4>
            <ul className="space-y-4">
              <li className="text-gray-400 hover:text-gold cursor-pointer transition-colors">Đào tạo AI Doanh nghiệp</li>
              <li className="text-gray-400 hover:text-gold cursor-pointer transition-colors">Xây dựng Siêu App AI</li>
              <li 
                onClick={handleAffiliateClick}
                className="text-gold font-bold cursor-pointer transition-colors flex items-center gap-2"
              >
                <BarChart3 size={16} /> Tiếp thị liên kết (30%)
              </li>
              <li className="text-gray-400 hover:text-gold cursor-pointer transition-colors">Hệ thống Bán hàng Tự động</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Bản tin</h4>
            <p className="text-gray-500 text-sm mb-4">Nhận kiến thức AI mới nhất hàng tuần.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gold"
              />
              <button className="p-2 bg-gold text-black rounded-lg hover:bg-gold-light transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
          © 2026 THIỆN VUA APP. All rights reserved. Designed for Elite Entrepreneurs.
        </div>
      </footer>

      {/* Floating Gift Box */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-10 right-10 z-[90] flex flex-col items-center"
      >
        <a 
          href="https://zalo.me/g/auvzpn118" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative group block"
        >
          <div className="absolute -inset-4 bg-red-600/30 rounded-full blur-2xl group-hover:bg-red-600/50 transition-all animate-pulse" />
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-red-600 rounded-[2.5rem] border-4 border-white/20 shadow-[0_0_40px_rgba(220,38,38,0.6)] flex items-center justify-center animate-float animate-blink-red hover:scale-110 transition-transform cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-800 opacity-50" />
            <span className="text-6xl sm:text-7xl relative z-10">🎁</span>
            
            {/* Blinking text overlay */}
            <div className="absolute bottom-2 left-0 right-0 text-center z-20">
              <p className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-tighter animate-pulse">NHẬN QUÀ NGAY</p>
            </div>
          </div>
          
          {/* Tooltip-like label */}
          <div className="absolute bottom-full right-0 mb-4 w-48 bg-white p-3 rounded-2xl shadow-2xl border-2 border-red-600 transform origin-bottom-right group-hover:scale-110 transition-transform">
            <div className="text-red-600 font-black text-xs text-center leading-tight">
              <EditableText 
                id="gift-title"
                value="🎁 NHẬN QUÀ NGAY"
                onChange={() => {}}
                className="text-red-600"
              />
              <EditableText 
                id="gift-subtitle"
                value="10 APP SIÊU CẤP VIP PRO"
                onChange={() => {}}
                className="text-black"
              />
            </div>
            <div className="absolute top-full right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-red-600 rotate-45 -translate-y-2" />
          </div>
        </a>
      </motion.div>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        productName={selectedProduct.name} 
        price={selectedProduct.price}
        image={selectedProduct.image}
        video={selectedProduct.video}
        details={selectedProduct.details}
      />

      {/* Affiliate Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setShowAffiliateDashboard(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      {/* Modals */}
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        product={selectedProduct}
      />
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={(user) => {
          setCurrentUser(user);
          setShowAffiliateDashboard(true);
        }}
      />
    </div>
  );
}
