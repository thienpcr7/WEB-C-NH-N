export interface AppItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
  video?: string;
  details?: string[];
}

export const APP_ECOSYSTEM: AppItem[] = [
  // Siêu App & Quản Trị
  { 
    id: 1, 
    name: "SIÊU APP ĐA VŨ TRỤ V1", 
    price: "11.900K", 
    category: "Siêu App & Quản Trị",
    description: "Nền tảng quản trị kinh doanh đa kênh tích hợp AI thế hệ mới.", 
    image: "https://lh3.googleusercontent.com/d/1eTzWhC2BC9XsFuB0ybk9yLcVnmB5t4gM",
    video: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-world-map-with-glowing-lines-32624-large.mp4",
    details: ["Quản lý đa kênh tập trung", "Tự động hóa quy trình CSKH", "Phân tích dữ liệu thông minh", "Tích hợp AI tạo nội dung"]
  },
  { 
    id: 2, 
    name: "SIÊU APP ĐA VŨ TRỤ V2", 
    price: "16.900K", 
    category: "Siêu App & Quản Trị",
    description: "Phiên bản nâng cấp với khả năng tự động hóa quy trình doanh nghiệp toàn diện.", 
    image: "https://lh3.googleusercontent.com/d/15_rVnZjcsfhGUVOCH-3BoivJ0pjIJw4P",
    video: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-with-blue-and-white-lines-32623-large.mp4",
    details: ["Tự động hóa 90% quy trình", "Hệ thống báo cáo Real-time", "AI dự báo xu hướng thị trường", "Kết nối API không giới hạn"]
  },
  { 
    id: 8, 
    name: "CHIẾN LƯỢC CHO CEO", 
    price: "1.990K", 
    category: "Siêu App & Quản Trị",
    description: "Cố vấn chiến lược kinh doanh thông minh dành riêng cho nhà lãnh đạo.", 
    image: "https://lh3.googleusercontent.com/d/1m0ULZbS84OmWtzoA7TZPp590UTp_8Ofe" 
  },

  // KOL AI & Bán Hàng
  { 
    id: 3, 
    name: "1000 KOL AI", 
    price: "990K", 
    category: "KOL AI & Bán Hàng",
    description: "Sở hữu đội ngũ 1000 KOL ảo sẵn sàng quảng bá thương hiệu 24/7.", 
    image: "https://lh3.googleusercontent.com/d/1WaeFYGl4_a1zIy9j03bOtg9odLA9pgTX",
    video: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-human-face-with-glowing-lines-32626-large.mp4",
    details: ["1000 Nhân vật AI độc bản", "Tự động đăng bài đa nền tảng", "Tương tác khách hàng tự động", "Không bao giờ scandal"]
  },
  { 
    id: 4, 
    name: "1000 KOL AI BÁN HÀNG", 
    price: "1.990K", 
    category: "KOL AI & Bán Hàng",
    description: "KOL AI chuyên sâu về chốt đơn và livestream bán hàng tự động.", 
    image: "https://lh3.googleusercontent.com/d/10CW0JLgmDobp_FZsGLdFQ_6tYBt1v5c7",
    video: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-shopping-cart-with-glowing-lines-32627-large.mp4",
    details: ["Livestream 24/7 không nghỉ", "Chốt đơn tự động qua Chatbot", "Giọng nói AI truyền cảm hứng", "Tối ưu hóa tỷ lệ chuyển đổi"]
  },

  // Sáng Tạo Nội Dung & Video
  { 
    id: 5, 
    name: "KỊCH BẢN VEO3/SORA 2", 
    price: "990K", 
    category: "Sáng Tạo Nội Dung & Video",
    description: "Tạo hàng nghìn kịch bản video ngắn triệu view chỉ với 1 chạm.", 
    image: "https://lh3.googleusercontent.com/d/1ugOyq59vNzmIVo0ALVSZPsYd_va3r0MK" 
  },
  { 
    id: 10, 
    name: "KỊCH BẢN TRIỆU VIEW", 
    price: "990K", 
    category: "Sáng Tạo Nội Dung & Video",
    description: "Viết bài bán hàng, quảng cáo đỉnh cao không cần copywriter.", 
    image: "https://lh3.googleusercontent.com/d/12G2x97x-OxJnJGmj2CQCRTyJGl1Vwyxi" 
  },
  { 
    id: 20, 
    name: "VIDEO VIRAL CHIBI 3D", 
    price: "990K", 
    category: "Sáng Tạo Nội Dung & Video",
    description: "Tạo video viral phong cách Chibi 3D cực kỳ đáng yêu và thu hút.", 
    image: "https://lh3.googleusercontent.com/d/1szgPD_NX8PbcjxB0fvRYCdS_19x5h85X" 
  },
  { 
    id: 9, 
    name: "THUMBNAIL YOUTUBE", 
    price: "990K", 
    category: "Sáng Tạo Nội Dung & Video",
    description: "Thiết kế ảnh bìa Youtube thu hút click cực cao.", 
    image: "https://lh3.googleusercontent.com/d/10303FwffV4Fb18-lAe5YS7i4hf1yjA7K" 
  },

  // Thiết Kế & Thương Hiệu
  { 
    id: 11, 
    name: "TẠO ẢNH POSTER", 
    price: "990K", 
    category: "Thiết Kế & Thương Hiệu",
    description: "Thiết kế poster quảng cáo chuyên nghiệp trong 30 giây.", 
    image: "https://lh3.googleusercontent.com/d/13jn-UHCAK1ds202KLZZxp6YJ6bDfrRZG" 
  },
  { 
    id: 15, 
    name: "ẢNH DOANH NHÂN NỮ", 
    price: "990K", 
    category: "Thiết Kế & Thương Hiệu",
    description: "Tạo ảnh chân dung doanh nhân nữ sang trọng và chuyên nghiệp.", 
    image: "https://lh3.googleusercontent.com/d/1pz6dL_sRwH61TI5WICWhyqUkSGJ08FJx" 
  },
  { 
    id: 16, 
    name: "ẢNH DOANH NHÂN NAM", 
    price: "990K", 
    category: "Thiết Kế & Thương Hiệu",
    description: "Tạo ảnh chân dung doanh nhân nam lịch lãm và quyền lực.", 
    image: "https://lh3.googleusercontent.com/d/1psHttWmJbpHgsq7ACpPDU1PmMEjVwGK2" 
  },
  { 
    id: 17, 
    name: "THỜI TRANG CAO CẤP", 
    price: "1.490K", 
    category: "Thiết Kế & Thương Hiệu",
    description: "Thiết kế bộ sưu tập thời trang cao cấp bằng công nghệ AI.", 
    image: "https://lh3.googleusercontent.com/d/1vsN_G3_dvdhlY8VfXMz3izHJWkN82__J" 
  },
  { 
    id: 18, 
    name: "QUÝ CÔ SANG CHẢNH KIÊU KỲ", 
    price: "990K", 
    category: "Thiết Kế & Thương Hiệu",
    description: "Tạo ảnh phong cách quý cô kiêu kỳ và sang trọng.", 
    image: "https://lh3.googleusercontent.com/d/1g6H9RTDLrjWctL_y0bXezIOD3lXdr6iN" 
  },
  { 
    id: 19, 
    name: "PHỤC CHẾ ẢNH CŨ", 
    price: "790K", 
    category: "Thiết Kế & Thương Hiệu",
    description: "Phục hồi và làm nét những bức ảnh cũ, hư hỏng bằng AI.", 
    image: "https://lh3.googleusercontent.com/d/1GyH8Q4xhETYQNUomvbvR_TiFHAYkzM47" 
  },
  { 
    id: 7, 
    name: "THƯƠNG HIỆU TOÀN CẦU", 
    price: "990K", 
    category: "Thiết Kế & Thương Hiệu",
    description: "Xây dựng bộ nhận diện thương hiệu đẳng cấp quốc tế bằng AI.", 
    image: "https://lh3.googleusercontent.com/d/1vr1WUiwLDNYmSVUI2c0P0hEbDw1BQvax" 
  },

  // Tư Duy & Phát Triển
  { 
    id: 14, 
    name: "BIẾT TRƯỚC THIÊN MỆNH", 
    price: "990K", 
    category: "Tư Duy & Phát Triển",
    description: "Ứng dụng AI phân tích xu hướng và dự báo tương lai kinh doanh.", 
    image: "https://lh3.googleusercontent.com/d/1NdCBQCoPyRl6ol_ume0wgVfBxubIbswY" 
  },
  { 
    id: 21, 
    name: "TRUYỀN NHÂN NGƯỜI KẾ VỊ TẠO RA 1000 APP MỘT CHẠM KIẾM TIỀN TỰ ĐỘNG", 
    price: "1.990K", 
    category: "Tư Duy & Phát Triển",
    description: "Ứng dụng AI giúp tối ưu hóa thu nhập và quản lý tài chính thông minh.", 
    image: "https://lh3.googleusercontent.com/d/1SZs6E4k2ojehy8TVo1eK-1ptzoqD3zIX" 
  },
  { 
    id: 22, 
    name: "VỊT HOÁ THIÊN NGA", 
    price: "990K", 
    category: "Tư Duy & Phát Triển",
    description: "Lộ trình thay đổi diện mạo và tư duy toàn diện.", 
    image: "https://lh3.googleusercontent.com/d/1zUAh7Ph5UWvzwUuhGAwxIDoB_5o4rC3a" 
  },
  { 
    id: 13, 
    name: "VIẾT SÁCH TRIỆU ĐÔ", 
    price: "1.990K", 
    category: "Tư Duy & Phát Triển",
    description: "Trở thành tác giả sách nổi tiếng with sự hỗ trợ của AI.", 
    image: "https://lh3.googleusercontent.com/d/1qvXMY0KtBlpxW3O3286Jfr4AoAgc9dPN" 
  },
];
