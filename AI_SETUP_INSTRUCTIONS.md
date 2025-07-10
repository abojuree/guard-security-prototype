# تعليمات تشغيل المشروع للذكاء الاصطناعي
# AI Project Execution Instructions

## نظرة عامة | Project Overview

هذا مشروع تطبيق حراسة أمنية يعمل في البيئة المحلية مع:
- خادم وهمي (Mock Server) للتطوير  
- بيانات افتراضية محفوظة في ملفات المشروع
- React + TypeScript + Vite + Tailwind CSS

This is a security guard application project running locally with:
- Mock server for development
- Dummy data stored in project files  
- React + TypeScript + Vite + Tailwind CSS

---

## متطلبات النظام | System Requirements

```bash
# التحقق من Node.js | Check Node.js
node --version    # يجب 18+ | Must be 18+
npm --version     # أي إصدار حديث | Any recent version
```

---

## خطوات التشغيل | Execution Steps

### 1. التنقل لمجلد المشروع | Navigate to Project Folder

```powershell
# Windows PowerShell
cd "C:\Users\i9Nasseralhumaid\Desktop\-sucsess 80percnt-guard-App 1111\guard-AppF 10-7-2025"

# Mac/Linux Terminal  
cd "/path/to/guard-AppF 10-7-2025"
```

### 2. تثبيت الحزم | Install Packages

```bash
npm install
```

**ملاحظات للـ AI | AI Notes:**
- قد تظهر تحذيرات أمنية - تجاهلها | Security warnings may appear - ignore them
- العملية تستغرق 1-3 دقائق | Process takes 1-3 minutes
- إذا ظهر "up to date" فالحزم مثبتة بالفعل | If "up to date" appears, packages already installed

### 3. تشغيل المشروع | Start Project

```bash
npm run dev
```

**معايير النجاح | Success Indicators:**
- ✅ ظهور: `serving on port 5000` أو `Local: http://localhost:5000`
- ✅ عدم ظهور أخطاء حمراء | No red errors appear
- ✅ الخادم يعمل بدون توقف | Server runs without stopping

### 4. فتح التطبيق | Open Application

```
URL: http://localhost:5000
Port: 5000
```

**للذكاء الاصطناعي | For AI:**
استخدم أداة فتح المتصفح مع الرابط أعلاه
Use browser opening tool with the URL above

---

## معلومات تقنية | Technical Information

### الخادم | Server:
- **نوع**: خادم وهمي (Mock Server) | **Type**: Mock Server  
- **منفذ**: 5000 | **Port**: 5000
- **البيانات**: افتراضية محفوظة في الملفات | **Data**: Dummy data stored in files
- **قاعدة البيانات**: لا توجد - بيانات وهمية فقط | **Database**: None - dummy data only

### الملفات المهمة | Important Files:
```
├── server/              # خادم وهمي | Mock server
│   ├── index.ts        # نقطة البداية | Entry point  
│   ├── routes.ts       # طرق وهمية | Mock routes
│   └── storage.ts      # بيانات وهمية | Mock data storage
├── src/                # واجهة React | React frontend
├── package.json        # تبعيات المشروع | Project dependencies
└── vite.config.ts      # إعدادات Vite | Vite configuration
```

### هيكل التشغيل | Runtime Structure:
1. **Express.js** يشغل خادم وهمي على المنفذ 5000
2. **Vite** يقدم ملفات React من نفس المنفذ  
3. **البيانات** محفوظة في ملفات TypeScript (ليست قاعدة بيانات حقيقية)

---

## استكشاف الأخطاء | Troubleshooting

### مشكلة: المنفذ مشغول | Issue: Port Busy
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [رقم العملية] /F

# Mac/Linux  
lsof -ti:5000 | xargs kill -9
```

### مشكلة: أخطاء في التبعيات | Issue: Dependency Errors
```bash
# حذف وإعادة تثبيت | Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### مشكلة: مسار خاطئ | Issue: Wrong Path
```bash
# التأكد من وجود package.json | Verify package.json exists
ls package.json
# أو | Or
dir package.json
```

### مشكلة: Node.js قديم | Issue: Old Node.js
```bash
# تحديث Node.js للإصدار 18+ | Update Node.js to version 18+
node --version
```

---

## أوامر مساعدة | Helper Commands

### فحص حالة الخادم | Check Server Status:
```bash
# فحص المنفذ 5000 | Check port 5000
netstat -an | findstr :5000
# أو | Or
lsof -i :5000
```

### إيقاف الخادم | Stop Server:
```bash
# في نفس Terminal | In same Terminal
Ctrl + C

# إيقاف قسري | Force stop
taskkill /F /IM node.exe     # Windows
killall node                # Mac/Linux
```

### تنظيف المشروع | Clean Project:
```bash
npm run clean              # إذا وجد | If available
rm -rf node_modules        # حذف التبعيات | Delete dependencies  
rm package-lock.json       # حذف lock file
npm install               # إعادة التثبيت | Reinstall
```

---

## نصائح مهمة للـ AI | Important AI Tips

### قبل التشغيل | Before Execution:
1. ✅ تأكد من Node.js الإصدار 18+ | Verify Node.js version 18+
2. ✅ تأكد من وجود package.json في المجلد | Verify package.json exists in folder
3. ✅ استخدم مسار كامل مع علامات اقتباس | Use full path with quotes

### أثناء التشغيل | During Execution:  
1. ✅ راقب رسائل Terminal للأخطاء | Monitor Terminal for errors
2. ✅ انتظر حتى ظهور "serving on port 5000" | Wait for "serving on port 5000" message
3. ✅ لا تغلق Terminal أثناء العمل | Don't close Terminal while running

### بعد التشغيل | After Execution:
1. ✅ افتح http://localhost:5000 في المتصفح | Open http://localhost:5000 in browser
2. ✅ تأكد من تحميل الصفحة بالكامل | Verify page loads completely
3. ✅ تجاهل تحذيرات المتصفح للتطوير | Ignore browser warnings for development

---

## التحقق من النجاح | Success Verification

### علامات النجاح | Success Signs:
- ✅ Terminal يظهر: `serving on port 5000`
- ✅ المتصفح يفتح التطبيق على localhost:5000  
- ✅ واجهة التطبيق تظهر باللغة العربية
- ✅ لا توجد أخطاء JavaScript في console المتصفح

### علامات الفشل | Failure Signs:
- ❌ أخطاء حمراء في Terminal
- ❌ رسالة "port already in use"  
- ❌ صفحة فارغة أو خطأ 404
- ❌ رسالة "Cannot GET /"

---

## معلومات إضافية | Additional Information

### طبيعة المشروع | Project Nature:
- **تطوير محلي فقط | Local development only**
- **بيانات وهمية | Dummy data**  
- **خادم محاكي | Mock server**
- **لا يتطلب إنترنت | No internet required**

### الملفات الحساسة | Critical Files:
- **لا تعدّل**: `package.json`, `vite.config.ts`, `tailwind.config.cjs`
- **لا تحذف**: مجلد `src/`, مجلد `server/`

---

**تاريخ التحديث | Last Updated**: 10 يوليو 2025 | July 10, 2025  
**نوع التطبيق | Application Type**: تطوير محلي مع خادم وهمي | Local development with mock server