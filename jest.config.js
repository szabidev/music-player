const { defaults } = require("jest-config");

module.exports = {
  preset: "ts-jest",
  roots: ["/src"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testRegex: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", ...defaults.moduleFileExtensions],
};
