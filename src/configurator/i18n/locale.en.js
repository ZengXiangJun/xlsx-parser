module.exports = {
  __lang__: 'en',
  title: 'Set data of xlsx-parser',
  dataSpecification: `xlsx-parse Component data format description：
[{
    "A": 1,           【necessary】Key A B C represents the header, 1 2 3 represents the first row of data
    "B": 2,
    "C": 3,
    ...                【scalable】Other headers
}, {                  【scalable】Increment line data
    "A": 11,
    "B": 22,
    "C": 33
}]`,
  widgetConfig: 'Widget Config',
  loadData: 'Load Data',
  editExcel: 'Edit Excel',
  outputExcel: 'Output Excel',
  onExcelLoaded: 'On Excel Loaded',
  onExcelOutputed: 'On Excel Outputed',
  onSheetClick: 'On Sheet Click',
  onCellFocus: 'On Cell Focus',
  onCellBlur: 'On Cell Blur',
  EXCEL_DATA: 'Excel Data',
  SHEET_NAMES: 'Sheet Names',
  SHEETS: 'SHeet Datas',
  SHEETS_TO_CSV: 'Sheet to CSV',
  SHEETS_TO_TXT: 'Sheet to TXT',
  SHEETS_TO_JSON: 'Sheet to JSON',
  SHEETS_TO_FORMULAE: 'Sheet to FORMULAE',
  CURR_SHEET_NAME: 'Curr sheet name',
  CURR_SHEET: 'Curr sheet',
  CURR_SHEET_TO_JSON: 'Curr sheet to JSON',
  CURR_SHEET_ROWS: 'Curr sheet rows',
  CURR_SHEET_COLS: 'Curr sheet cols',
  CURR_CELL_POS: 'Curr cell pos',
  CURR_CELL_CONTENT: 'curr cell content'
};