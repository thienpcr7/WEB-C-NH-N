export interface SiteData {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    borderRadius: string;
  };
  header: {
    logoUrl: string;
    menuItems: { id: string; label: string; link: string }[];
  };
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
    mediaType: 'image' | 'video';
    mediaUrl: string;
    styles: any;
  };
  ecosystem: {
    title: string;
    subtitle: string;
    apps: any[];
  };
  course: {
    title: string;
    price: string;
    videoUrl: string;
    imageUrl: string;
    details: string[];
  };
  footer: {
    description: string;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
    socials: { platform: string; url: string }[];
  };
}

class EditorService {
  private DRAFT_KEY = 'thien_vua_app_site_draft';
  private PUBLISHED_KEY = 'thien_vua_app_site_published';

  getDefaultData(): SiteData {
    return {
      theme: {
        primaryColor: '#c9a24d',
        secondaryColor: '#ffffff',
        backgroundColor: '#000000',
        textColor: '#9ca3af',
        fontFamily: 'Inter',
        borderRadius: '1rem',
      },
      header: {
        logoUrl: 'https://i.postimg.cc/hh2HK1Gf/LOGO-VUA-APP.png',
        menuItems: [
          { id: '1', label: 'Hệ sinh thái', link: '#he-sinh-thai' },
          { id: '2', label: 'Khóa học', link: '#khoa-hoc' },
          { id: '3', label: 'Kết quả', link: '#ket-qua' },
          { id: '4', label: 'Liên hệ', link: '#lien-he' },
        ],
      },
      hero: {
        title: 'GIÚP CHỦ DOANH NGHIỆP X3 DOANH SỐ BẰNG CÔNG NGHỆ AI THỰC CHIẾN',
        subtitle: 'Huấn luyện AI thực chiến | Tự động hóa marketing & bán hàng | Xây dòng tiền bền vững 24/7. Không cần giỏi công nghệ, không cần biết code.',
        buttonText: 'NHẬN LỘ TRÌNH AI MIỄN PHÍ',
        mediaType: 'image',
        mediaUrl: 'https://lh3.googleusercontent.com/d/1BNKO6qd0Mmhwpm7n54mUucZjy4pS86AN',
        styles: {},
      },
      ecosystem: {
        title: 'SIÊU HỆ SINH THÁI APP AI',
        subtitle: 'Những ứng dụng AI đỉnh cao giúp bạn thống trị thị trường và tối ưu hóa lợi nhuận tuyệt đối.',
        apps: [],
      },
      course: {
        title: 'TRUYỀN NHÂN NGƯỜI KẾ VỊ TẠO RA 1000 APP MỘT CHẠM KIẾM TIỀN TỰ ĐỘNG',
        price: '3.990$',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-world-map-with-glowing-lines-32624-large.mp4',
        imageUrl: 'https://lh3.googleusercontent.com/d/1SZs6E4k2ojehy8TVo1eK-1ptzoqD3zIX',
        details: [
          'Hệ thống kiếm tiền tự động 100%',
          'Tặng kèm 10 App AI đã code sẵn',
          'Cố vấn trực tiếp từ Thiện Vua App',
          'Bảo hành thu nhập trọn đời'
        ],
      },
      footer: {
        description: 'Thiện Vua App - Đơn vị tiên phong trong việc thương mại hóa trí tuệ nhân tạo tại Việt Nam.',
        contact: {
          email: 'thienvuaapp@gmail.com',
          phone: '090.000.0000',
          address: 'Landmark 81, TP. Hồ Chí Minh',
        },
        socials: [
          { platform: 'facebook', url: '#' },
          { platform: 'youtube', url: '#' },
        ],
      },
    };
  }

  getDraft(): SiteData {
    const data = localStorage.getItem(this.DRAFT_KEY);
    return data ? JSON.parse(data) : this.getPublished();
  }

  getPublished(): SiteData {
    const data = localStorage.getItem(this.PUBLISHED_KEY);
    return data ? JSON.parse(data) : this.getDefaultData();
  }

  saveDraft(data: SiteData) {
    localStorage.setItem(this.DRAFT_KEY, JSON.stringify(data));
  }

  publish(data: SiteData) {
    localStorage.setItem(this.PUBLISHED_KEY, JSON.stringify(data));
    localStorage.setItem(this.DRAFT_KEY, JSON.stringify(data));
  }
}

export const editorService = new EditorService();
