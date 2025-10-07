const { defineConfig } = require("cypress");
const xlsx = require("xlsx");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        readExcel({ filePath, sheetName }) {
          const workbook = xlsx.readFile(filePath);
          const worksheet = workbook.Sheets[sheetName];
          return xlsx.utils.sheet_to_json(worksheet);
        },
        writeReport({ message }) {
          fs.appendFileSync("cypress/reports/report.txt", message + "\n");
          return null;
        }
      });
    },
  },
});
