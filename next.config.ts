import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true, // เปิด React Strict Mode
  distDir: '.next', // ใช้ build output ค่าเริ่มต้น
  swcMinify: true, // ใช้ SWC สำหรับการ minify
};

export default nextConfig;