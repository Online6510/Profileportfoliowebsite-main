# Temuulen — Web Developer Portfolio

Temuulen-ийн мэдээллээр зассан clean fullstack portfolio website. Энэ хувилбар нь local дээр **5000 порт** ашиглахаар тохируулагдсан.

## Орсон мэдээлэл

- Нэр: Temuulen
- Чиглэл: Web Developer
- Сургууль: Их Засаг ОУИС, КПХ-322, Програм хангамж
- Туршлага: 3 дахь жилдээ суралцаж байна
- Байршил: 3,4-р хороолол, Улаанбаатар
- Email: tk20060320@gmail.com
- Утас: +976 95124438
- GitHub: Online6510
- Facebook: Erdenesaruul Temuulen

## Local дээр 5000 порт дээр ажиллуулах

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run local
```

Дараа нь browser дээр нээнэ:

```text
http://localhost:5000
```

Admin хэсэг:

```text
http://localhost:5000/admin
```

Admin password:

```text
temuulen12345
```

## Dev mode

Хэрэв кодоо шууд засаж байхдаа hot reload хэрэгтэй бол:

```bash
npm run dev
```

Энэ үед:

- Frontend: http://localhost:5173
- Backend/API: http://localhost:5000

## 5000 портын тохиргоо орсон файлууд

- `.env`
- `.env.example`
- `vite.config.ts`
- `server/index.js`
- `package.json`

## Тайлбар

Нүүр, танилцуулга, ур чадвар, төсөл, холбоо барих хэсгийн текстийг илүү цэвэрхэн болгож, хэрэглэгчид харагдах илүүц тайлбаруудыг хассан.
