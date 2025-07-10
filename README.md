# منصة الحراسة الأمنية | Guard Security Platform

<div align="center">

![Security Platform](./public/security-guards.png)

**منصة شاملة لإدارة خدمات الحراسة الأمنية**  
*Comprehensive platform for managing security guard services*

[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21.2-green)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-blue)](https://tailwindcss.com/)

</div>

---

## 📋 نظرة عامة | Overview

هذا المشروع عبارة عن منصة متكاملة لإدارة خدمات الحراسة الأمنية، تتضمن واجهات منفصلة للعملاء والحراس والإدارة. المشروع حالياً في مرحلة النموذج الأولي ويعمل ببيانات افتراضية.

This project is an integrated platform for managing security guard services, featuring separate interfaces for clients, guards, and administration. Currently in prototype phase with mock data.

---

## ✨ الميزات الرئيسية | Key Features

### 👔 للعملاء | For Clients
- 📱 طلب خدمات حراسة مخصصة
- 👮‍♂️ اختيار الحراس المناسبين
- 📊 متابعة حالة الطلبات
- 💰 إدارة الفواتير والمدفوعات
- ⭐ تقييم الخدمات

### 👮‍♂️ للحراس | For Guards
- 📅 إدارة الجدولة والمواعيد
- 📍 تحديد المواقع المتاحة
- 💼 عرض الملف الشخصي
- 📈 متابعة الإحصائيات
- 🔔 استلام الإشعارات

### 🔧 للإدارة | For Administration
- 👥 إدارة المستخدمين
- 📊 تقارير شاملة
- 💰 إدارة المالية
- 🎯 مراقبة الأداء
- ⚙️ إعدادات النظام

---

## 🛠️ التقنيات المستخدمة | Tech Stack

### Frontend
- **React 18** - مكتبة واجهة المستخدم
- **TypeScript** - للكتابة الآمنة
- **Vite** - أداة البناء السريعة
- **Tailwind CSS** - إطار عمل CSS
- **Radix UI** - مكونات UI متقدمة
- **Framer Motion** - الحركات والانتقالات
- **React Hook Form** - إدارة النماذج
- **Zustand** - إدارة الحالة

### Backend (Mock)
- **Express.js** - خادم ويب
- **TypeScript** - للكتابة الآمنة
- **Zod** - التحقق من البيانات
- **Mock Storage** - قاعدة بيانات وهمية

### UI/UX
- **Responsive Design** - تصميم متجاوب
- **Dark/Light Mode** - الوضع الليلي/النهاري
- **Modern Icons** - أيقونات Lucide
- **Beautiful Charts** - مخططات Recharts

---

## 🚀 التشغيل السريع | Quick Start

### المتطلبات | Prerequisites
- Node.js 18+ 
- npm or yarn
- PowerShell/Terminal

### التثبيت والتشغيل | Installation & Running

```bash
# استنساخ المشروع | Clone the project
cd "guard-AppF 10-7-2025"

# تثبيت التبعيات | Install dependencies
npm install

# تشغيل الخادم | Start development server
npm run dev

# فتح التطبيق | Open application
# http://localhost:5000
```

### 🤖 للذكاء الاصطناعي | For AI Assistants
راجع ملفات التعليمات المخصصة:
- `AI_SETUP_INSTRUCTIONS.md` - تعليمات شاملة
- `QUICK_AI_SETUP.md` - دليل سريع

Check dedicated instruction files:
- `AI_SETUP_INSTRUCTIONS.md` - Comprehensive guide
- `QUICK_AI_SETUP.md` - Quick reference

---

## 📁 هيكل المشروع | Project Structure

```
├── 📁 server/                  # خادم Express.js وهمي
│   ├── 📄 index.ts            # نقطة البداية
│   ├── 📄 routes.ts           # طرق API
│   ├── 📄 storage.ts          # قاعدة البيانات الوهمية
│   └── 📄 vite.ts             # إعدادات Vite
├── 📁 src/                    # كود الواجهة الأمامية
│   ├── 📁 components/         # مكونات React
│   │   ├── 📁 modals/         # النوافذ المنبثقة
│   │   └── 📁 ui/             # مكونات UI الأساسية
│   ├── 📁 pages/              # صفحات التطبيق
│   │   ├── 📁 admin/          # صفحات الإدارة
│   │   ├── 📁 client/         # صفحات العملاء
│   │   └── 📁 guard/          # صفحات الحراس
│   ├── 📁 hooks/              # React Hooks مخصصة
│   └── 📁 lib/                # مكتبات ومساعدات
├── 📁 shared/                 # كود مشترك
├── 📁 public/                 # ملفات عامة
└── 📄 package.json            # تبعيات المشروع
```

---

## 🔐 نظام المصادقة | Authentication System

### أنواع المستخدمين | User Types

| النوع | Type | الصلاحيات | Permissions |
|-------|------|------------|-------------|
| 👤 **مدير** | **Admin** | إدارة كاملة للنظام | Full system management |
| 👔 **عميل** | **Client** | طلب وإدارة الخدمات | Request and manage services |
| 👮‍♂️ **حارس** | **Guard** | تقديم الخدمات | Provide services |

### بيانات تجريبية | Test Credentials
> راجع ملف `server/storage.ts` للحصول على بيانات المستخدمين الافتراضية
> Check `server/storage.ts` for default user credentials

---

## 📱 الواجهات المتاحة | Available Interfaces

### 🏠 الصفحة الرئيسية | Landing Page
- `http://localhost:5000/`
- عرض تعريفي للمنصة
- روابط التسجيل والدخول

### 🔐 تسجيل الدخول | Authentication
- `http://localhost:5000/login`
- نظام دخول موحد لجميع الأدوار

### 👔 لوحة العميل | Client Dashboard
- `http://localhost:5000/client/dashboard`
- إدارة الطلبات والخدمات

### 👮‍♂️ لوحة الحارس | Guard Dashboard
- `http://localhost:5000/guard/dashboard`
- إدارة المهام والجدولة

### 🔧 لوحة الإدارة | Admin Dashboard
- `http://localhost:5000/admin/dashboard`
- إدارة شاملة للنظام

---

## 🎨 التصميم والـ UI | Design & UI

### نظام الألوان | Color System
- 🌅 **Primary**: ألوان أمنية احترافية
- 🌙 **Dark Mode**: وضع ليلي مريح للعين
- ☀️ **Light Mode**: وضع نهاري مشرق

### المكونات | Components
- ✅ أزرار تفاعلية
- 📊 مخططات بيانية
- 🔔 إشعارات ذكية
- 📱 تصميم متجاوب
- 🎭 أيقونات حديثة

---

## 🚀 الأوامر المتاحة | Available Scripts

| الأمر | Command | الوصف | Description |
|-------|---------|--------|-------------|
| `npm run dev` | تشغيل التطوير | Start development server |
| `npm run build` | بناء الإنتاج | Build for production |
| `npm run start` | تشغيل الإنتاج | Start production server |
| `npm run check` | فحص TypeScript | TypeScript check |
| `npm run db:push` | دفع قاعدة البيانات | Push database schema |

---

## 🔧 استكشاف الأخطاء | Troubleshooting

### مشاكل شائعة | Common Issues

#### ❌ خطأ: المنفذ مشغول
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Mac/Linux  
lsof -ti:5000 | xargs kill -9
```

#### ❌ خطأ: تبعيات مفقودة
```bash
rm -rf node_modules
npm install
```

#### ❌ خطأ: مسار خاطئ
- تأكد من المسار الصحيح
- استخدم علامات اقتباس للمسارات

---

## 🛣️ خارطة الطريق | Roadmap

### الإصدار الحالي | Current Version
- ✅ واجهات أساسية
- ✅ نظام مصادقة
- ✅ بيانات افتراضية
- ✅ تصميم متجاوب

### الإصدارات القادمة | Upcoming Versions
- 🔄 قاعدة بيانات حقيقية
- 🔄 API حقيقي
- 🔄 نظام دفع
- 🔄 إشعارات فورية
- 🔄 تطبيق موبايل

---

## 🤝 المساهمة | Contributing

1. Fork المشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

---

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 الدعم والتواصل | Support & Contact

- 📧 **البريد الإلكتروني** | **Email**: support@guard-platform.com
- 🌐 **الموقع** | **Website**: www.guard-platform.com
- 📱 **التليفون** | **Phone**: +966 XX XXX XXXX

---

<div align="center">

**صُنع بـ ❤️ للمجتمع الأمني السعودي**  
*Made with ❤️ for the Saudi Security Community*

[![GitHub stars](https://img.shields.io/github/stars/username/guard-platform?style=social)](https://github.com/username/guard-platform)
[![GitHub forks](https://img.shields.io/github/forks/username/guard-platform?style=social)](https://github.com/username/guard-platform)

</div>
