module.exports = {
  __lang__: 'zh-cn',
  title: '设置 xlsx-parser 数据',
  dataSpecification: `xlsx-parser 组件数据格式说明：
[{
    "A": 1,           【必须】键 A B C 表示表头，1 2 3 表示第一行数据
    "B": 2,
    "C": 3,
    ...                【可扩展】其它的表头
}, {                  【可扩展】递增行数据
    "A": 11,
    "B": 22,
    "C": 33
}]`,
  widgetConfig: '组件配置',
  loadData: '导入数据',
  editExcel: '编辑表格',
  outputExcel: '导出表格',
  onExcelLoaded: 'Excel加载完毕时',
  onExcelOutputed: 'Excel导出完毕时',
  onSheetClick: '单击表格时',
  onCellFocus: '单元格获得焦点时',
  onCellBlur: '单元格失去焦点时',
  EXCEL_DATA: 'Excel数据',
  SHEET_NAMES: '所有表名称',
  SHEETS: '所有表数据',
  SHEETS_TO_CSV: '所有表CSV格式数据',
  SHEETS_TO_JSON: '所有表JSON格式数据',
  SHEETS_TO_FORMULAE: '所有表FORMULAE格式数据',
  CURR_SHEET_NAME: '当前表名称',
  CURR_SHEET: '当前表数据',
  CURR_SHEET_TO_JSON: '当前表JSON格式数据',
  CURR_SHEET_ROWS: '当前表行数',
  CURR_SHEET_COLS: '当前表列数',
  CURR_CELL_POS: '当前单元格位置',
  CURR_CELL_CONTENT: '当前单元格内容'
};