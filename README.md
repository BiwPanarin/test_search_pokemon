# แอปค้นหา Pokémon

แอปนี้เป็นแอปพลิเคชันสำหรับค้นหา Pokémon ที่พัฒนาด้วย **Next.js**, **Apollo Client** และ **GraphQL** โดยผู้ใช้สามารถกดที่ Pokémon ได้โดยตรงที่หน้า Home หรือ ค้นหา Pokémon ตามชื่อหรือ ID ดูข้อมูลรายละเอียด และกรอง Pokémon ตามประเภทหรือจำนวนที่ต้องการแสดง

---

## คุณสมบัติ

- **ค้นหา Pokémon** ตามชื่อหรือ ID
- **ดูรายละเอียด Pokémon** เช่น ประเภท การโจมตี การวิวัฒนาการ และค่าความสามารถ
- **กรอง Pokémon** ตามประเภท หรือกำหนดจำนวนที่จะแสดง
- **ดีไซน์ Web** รองรับการแสดงผลบนทุกอุปกรณ์ด้วย Bootstrap
- ดึงข้อมูลจาก [GraphQL Pokémon API](https://graphql-pokemon2.vercel.app)
- รองรับ **Static Optimization** และการปรับปรุงข้อมูลแบบ Incremental Static Regeneration เพื่อประสิทธิภาพสูงสุด
- สามารถ **Test Suite** ด้วย Jest ได้ ผ่านคำสั่ง npm run test

---

## เทคโนโลยีที่ใช้

- **Next.js**: ใช้สำหรับการเรนเดอร์แบบ Server-side และ Static Optimization
- **React**: ใช้สร้าง UI Component ที่นำกลับมาใช้ใหม่ได้
- **Apollo Client**: ใช้สำหรับจัดการคำร้อง GraphQL และการแคชข้อมูล
- **GraphQL**: ใช้สำหรับดึงและจัดการข้อมูล Pokémon
- **Bootstrap**: ใช้สำหรับการออกแบบ UI

---
