module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testTimeout: 6 * 1000,
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
