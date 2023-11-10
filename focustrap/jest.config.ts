/* eslint-disable */
export default {
  displayName: 'focustrap',
  preset: '../jest.preset.js',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../coverage/focustrap',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
