const XLSX = require("xlsx");

function getExcelData(filePath, sheetName) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet); // returns array of objects
}

module.exports = { getExcelData };
