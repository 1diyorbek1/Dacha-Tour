# Dacha Tour - Deployment Guide (O'zbek tilida)

Ushbu loyihani internetga (serverga) chiqarish uchun quyidagi qadamlarni bajaring.

## 1. Backend (Server) Qismi

Backend qismini (NestJS) har qanday Node.js serveriga (masalan: Render, Railway, DigitalOcean, yoki o'zingizning VPS) yuklashingiz mumkin.

1.  **Serverda Node.js o'rnating.**
2.  `dacha-backend` papkasini serverga yuklang.
3.  Serverda quyidagi buyruqlarni bajaring:
    ```bash
    npm install
    npm run build
    npm run start:prod
    ```
4.  **Muhim:** Serveringizning IP manzili yoki domenini (masalan: `https://api.dachatour.uz`) saqlab qo'ying.

## 2. Frontend (Sayt) Qismi

1.  `src/api.js` faylini oching.
2.  `API_BASE_URL` o'zgaruvchisini serveringizning URL manziliga o'zgartiring:
    ```javascript
    const API_BASE_URL = 'https://sizning-serveringiz.com'; // <--- SHU YERNI O'ZGARTIRING
    ```
3.  Saytni build qiling:
    ```bash
    npm run build
    ```
4.  `dist` papkasini **Netlify**, **Vercel** yoki boshqa hostingga yuklang.

## 3. Telegram Bot Sozlamalari

1.  Saytning **Admin Paneliga** kiring.
2.  Bot Token va Chat ID larni to'g'ri kiriting.
3.  Botni o'chirmasligingizni tekshiring.

## 4. Foydalanuvchi Ma'lumotlari Xavfsizligi

Loyiha har bir telefon raqami uchun alohida profil yaratadi:
-   Faqat o'z raqami bilan kirgan odam o'zining dachasini ko'radi.
-   Login qilishda kod foydalanuvchining shaxsiy Telegram botiga boradi.
-   Admin panel orqali barcha dachalar va foydalanuvchilarni nazorat qilishingiz mumkin.

---
**Savollaringiz bo'lsa, so'rashingiz mumkin!**
