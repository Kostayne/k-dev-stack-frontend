import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: '.'
});

// eslint-disable-next-line import/no-anonymous-default-export
const customCfg = {
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest"
  },

  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
};

export default createJestConfig(customCfg);