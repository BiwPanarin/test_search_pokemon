import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // ใช้ ts-jest แปลงไฟล์ TypeScript
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS Modules
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // โหลด jest-dom
};

export default config;