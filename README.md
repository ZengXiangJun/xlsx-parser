## Enhancer三方组件 xlsx-parser 使用说明
### 查看Demo 【账号】test 【密码】123456
### 简介 [Demo](http://47.96.99.14:5301/#115)
- xlsx-parser是基于[Enhancer](https://enhancer.io)平台开发的组件, 能在此平台上良好运行。
- xlsx-parser可将 数据 , Html 和 Excel 任意转换。

### 生成界面
![](https://github.com/ZengXiangJun/xlsx-parser/blob/master/images/2.png)
### 配置界面
![](https://github.com/ZengXiangJun/xlsx-parser/blob/master/images/1.png)

### 使用说明
- 在[Enhancer](https://enhancer.io)上注册，新建项目使用此组件。
- 在图二界面设置组件的数据源，及相关配置。

### 数据源设置
- 数据源格式说明：必须是对象数组，如 2 所示。
```
[{
    "A": 1,           【必须】键 A B C 表示表头，1 2 3 表示第一行数据
    "B": 2,
    "C": 3,
    ...               【可扩展】其它的表头
}, {                  【可扩展】递增行数据
    "A": 11,
    "B": 22,
    "C": 33
}]
```

### 组件功能
- 将数据导出为Excel
- 将Excel导入并解析为多种格式数据
- 可通过页面简单修改Excel文件


### 可用事件说明
#### 加载Excel（On Excel Loaded）
- 【事件 ID】onExcelLoaded
- 【触发时机】Excel加载到页面上时。

#### 导出Excel（onExcelOutputed）
- 【事件 ID】onExcelOutputed
- 【触发时机】导出Excel时。

#### 单击表格（On Sheet Click）
- 【事件 ID】onSheetClick
- 【触发时机】单击页面上表格时。


#### 单元格获得焦点（onCellFocus）
- 【事件 ID】onCellFocus
- 【触发时机】页面表格单元获得焦点时（编辑）。

#### 单元格失去焦点 （onCellBlur）
- 【事件 ID】onCellBlur
- 【触发时机】页面表格失去焦点时。

### 可用变量说明 [Demo](http://47.96.99.14:5301/#114)
#### EXCEL_DATA
- 【类型】object
- 【说明】Excel数据
- 【示例】{'SheetNames': [], 'Sheets': {}}

#### SHEET_NAMES
- 【类型】array
- 【说明】Excel中所有表名称
- 【示例】['sheet1', 'sheet2']

#### SHEETS
- 【类型】object
- 【说明】所有表数据
- 【示例】{'sheet1': {}, 'sheet2': {}}

#### SHEETS_TO_CSV
- 【类型】object
- 【说明】所有表CSV格式数据
- 【示例】{'sheet1': ''}

#### SHEETS_TO_JSON
- 【类型】object
- 【说明】所有表JSON格式数据
- 【示例】{'sheet1': []}

#### SHEETS_TO_FORMULAE
- 【类型】object
- 【说明】所有表FORMULAE格式数据
- 【示例】{'sheet1': []}

#### CURR_SHEET_NAME
- 【类型】string
- 【说明】当前表名称
- 【示例】"表-1"

#### CURR_SHEET
- 【类型】object
- 【说明】当前表数据
- 【示例】{!ref: ''}

#### CURR_SHEET_TO_JSON
- 【类型】array
- 【说明】当前表JSON格式数据
- 【示例】[{}, {}]

#### CURR_SHEET_ROWS
- 【类型】number
- 【说明】当前表行数（不包括表头）
- 【示例】10

#### CURR_SHEET_COLS
- 【类型】number
- 【说明】当前表列数
- 【示例】10

#### CURR_CELL_POS
- 【类型】string
- 【说明】当前单元格位置（包括表头， 同Excel中单元格位置）
- 【示例】"A1"

#### CURR_CELL_CONTENT
- 【类型】string
- 【说明】当前单元格内容
- 【示例】"统计"


### 其它
- [Enhancer 教程](https://enhancer.io/tutorials)
- [Enhancer 社区](https://forum.enhancer.io/#p=1&t=5)