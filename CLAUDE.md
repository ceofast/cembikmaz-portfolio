# cembikmaz.com — Kişisel Portföy Sitesi

## Proje Özeti
Cem BIKMAZ'ın kişisel portföy ve blog sitesi. React + Vite ile geliştirilmiş, Vercel'de deploy edilmiş, 3 dilde (TR/EN/DE) çalışan modern bir SPA.

## Teknoloji Stack
- **Framework**: React 19 + Vite 6
- **Routing**: React Router DOM 7
- **Styling**: Vanilla CSS (index.css) — design system değişkenleri ile
- **i18n**: Context API tabanlı özel çözüm (tr.json, en.json, de.json)
- **Sanitization**: DOMPurify
- **API**: Vercel Serverless Functions (api/ klasörü)

## Proje Yapısı
```
cembikmaz-portfolio/
├── api/                    # Vercel Serverless Functions
│   ├── articles.js         # Medium RSS feed parser (@cembikmaz.ie)
│   └── track.js            # Anonim ziyaretçi takibi
├── src/
│   ├── components/         # 12 React bileşeni
│   │   ├── Hero.jsx        # Ana landing bölümü
│   │   ├── About.jsx       # Uzmanlık & sektörler
│   │   ├── Projects.jsx    # Proje portföyü
│   │   ├── Articles.jsx    # Blog önizleme
│   │   ├── Experience.jsx  # İş deneyimi
│   │   ├── Certifications.jsx
│   │   ├── Consulting.jsx  # Danışmanlık hizmetleri
│   │   ├── Contact.jsx     # İletişim formu (DOMPurify)
│   │   ├── CookieConsent.jsx # KVKK uyumu
│   │   ├── Navbar.jsx      # Navigasyon
│   │   ├── LanguageSwitcher.jsx
│   │   └── Footer.jsx
│   ├── pages/              # Route sayfaları (lazy loaded)
│   │   ├── Home.jsx        # Ana sayfa
│   │   ├── Blog.jsx        # Blog listesi
│   │   ├── ArticleView.jsx # Tekil makale
│   │   └── KVKK.jsx        # Gizlilik politikası
│   ├── i18n/               # Çeviri dosyaları
│   │   ├── LanguageContext.jsx
│   │   ├── tr.json, en.json, de.json
│   ├── App.jsx             # Router + layout
│   ├── main.jsx            # Entry point
│   └── index.css           # Design system + stiller
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── vercel.json             # Vercel config (headers, rewrites)
├── vite.config.js
└── package.json
```

## Routing
- `/` → Home (tüm bölümler tek sayfada)
- `/blog` → Blog listesi (lazy)
- `/blog/:slug` → Makale detay (lazy)
- `/kvkk` → Gizlilik politikası (lazy)

## Design System
- **Arka plan**: #08080a (koyu)
- **Accent**: #b8965a (altın)
- **Font**: Inter (sans-serif), JetBrains Mono (mono)
- **Responsive breakpoint**: 768px
- **Animasyonlar**: Smooth easing, ambient ışık efektleri

## API Endpoints
- `GET /api/articles` → Medium RSS feed (@cembikmaz.ie), 1 saat cache
- `POST /api/track` → Anonim ziyaretçi logu

## Deployment
- **Platform**: Vercel
- **Proje**: cembikmaz-portfolio
- **Scope**: cembikmazie-9039s-projects
- **Domain**: cembikmaz.com, www.cembikmaz.com
- **Build**: `npm run build` → dist/ klasörü
- **Deploy**: `vercel --prod` (CLI) veya git push (eğer bağlıysa)

## Kurallar
- Türkçe karakter kullanımına dikkat et (ı/i, ö/o, ü/u, ş/s, ç/c, ğ/g)
- 3 dildeki çeviri dosyalarını senkronize tut (tr.json, en.json, de.json)
- DOMPurify ile kullanıcı girdilerini sanitize et
- Yeni bileşen eklerken useTranslation hook'unu kullan
- CSS değişikliklerini index.css'teki design system değişkenlerine göre yap
- SEO meta tag'lerini (OG, Twitter Card, JSON-LD) güncel tut

## GitHub
- **Hesap**: ceofast
- **Repo**: henüz oluşturulmadı (oluşturulacak: ceofast/cembikmaz-portfolio)
