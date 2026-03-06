import { AppItem } from '../constants';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bankName: string;
  bankAccount: string;
  bankNumber: string;
  affiliateCode: string;
  createdAt: string;
  role?: 'admin' | 'user';
}

export interface AffiliateStats {
  clicks: number;
  conversions: number;
  totalRevenue: number;
  totalCommission: number;
  pendingCommission: number;
  paidCommission: number;
}

export interface CommissionRecord {
  id: string;
  productName: string;
  amount: number;
  commission: number;
  percentage: number;
  status: 'pending' | 'paid';
  createdAt: string;
}

export const AFFILIATE_POLICY = {
  APP_COMMISSION: 0.30, // 30%
  COACHING_COMMISSION: 0.10, // 10%
};

class AffiliateService {
  private STORAGE_KEY = 'thien_vua_app_user';
  private STATS_KEY = 'thien_vua_app_stats';
  private RECORDS_KEY = 'thien_vua_app_records';
  private ALL_USERS_KEY = 'thien_vua_app_all_users';
  private ALL_PURCHASES_KEY = 'thien_vua_app_all_purchases';

  getUser(): User | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  setUser(user: User) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getStats(): AffiliateStats {
    const data = localStorage.getItem(this.STATS_KEY);
    return data ? JSON.parse(data) : {
      clicks: 0,
      conversions: 0,
      totalRevenue: 0,
      totalCommission: 0,
      pendingCommission: 0,
      paidCommission: 0,
    };
  }

  getRecords(): CommissionRecord[] {
    const data = localStorage.getItem(this.RECORDS_KEY);
    if (data) return JSON.parse(data);
    return [];
  }

  async logToGoogleSheet(data: any) {
    console.log('Logging to Google Sheet:', data);
    // Note: To actually write to the Google Sheet, a Google Apps Script Web App URL is required.
    // The user should provide the Web App URL for the spreadsheet: 
    // https://docs.google.com/spreadsheets/d/1dUdo8Rzo6AJI5VO7np1AlNFNfgYB2Myp1OyE4meL4zw/edit
    
    try {
      // Placeholder for actual fetch call to a Google Apps Script Web App
      // await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
      //   method: 'POST',
      //   mode: 'no-cors',
      //   body: JSON.stringify(data)
      // });
    } catch (error) {
      console.error('Error logging to Google Sheet:', error);
    }
  }

  generateAffiliateLink(user: User): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}?ref=${user.affiliateCode}`;
  }

  getAllUsers(): User[] {
    const data = localStorage.getItem(this.ALL_USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveUserToAll(user: User) {
    const users = this.getAllUsers();
    if (!users.find(u => u.email === user.email)) {
      users.push(user);
      localStorage.setItem(this.ALL_USERS_KEY, JSON.stringify(users));
    }
  }

  getAllPurchases(): any[] {
    const data = localStorage.getItem(this.ALL_PURCHASES_KEY);
    return data ? JSON.parse(data) : [];
  }

  savePurchase(purchase: any) {
    const purchases = this.getAllPurchases();
    purchases.push(purchase);
    localStorage.setItem(this.ALL_PURCHASES_KEY, JSON.stringify(purchases));
  }
}

export const affiliateService = new AffiliateService();
