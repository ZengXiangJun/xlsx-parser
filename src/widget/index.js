require('./index.less');
var locale = require('./i18n');
var tpl = require('./index.html');
var XLSX = require('xlsx');
Enhancer.registerWidget({
    construct: function(profile, zContext) {
        profile = $.extend({
            loadData: false,
            editExcel: true,
            outputExcel: true
        }, profile);
        var $container = this.getContainer();
        this.$container = $container;
        var that = this;
        this.workbook = {};
        this.excelName = 'download.xlsx';
        $container.html(tpl({
            locale: locale(),
            outputExcel: profile.outputExcel
        })).addClass('xlsx-parser');

        //更新数据
        function updateWb() {
            var $table = $container.find('.sheetWindow table');
            var name = $table.attr('id');
            var data = XLSX.utils.table_to_sheet($table[0]);
            $container.find('.sheets a[name="' + name + '"]').data('sheet', data);
            $container.find('.sheets a').map(function() {
                var name = $(this).attr('name');
                var data = $(this).data('sheet');
                that.workbook.Sheets[name] = data;
            })
        }

        //表数据转化为table
        $container.on('click', '.sheets a', function() {
            if ($container.find('.sheetWindow').html()) {
                updateWb();
            };
            $(this).addClass('ui-state-highlight').siblings('a').removeClass('ui-state-highlight');
            var name = $(this).attr('name');
            var sheet = $(this).data('sheet');
            var table = XLSX.utils.sheet_to_html(sheet, {
                id: name,
                editable: true
            });
            $container.find('.sheetWindow').html('');
            $container.find('.sheetWindow').html(table);
            $container.find('.sheetWindow td').addClass('ui-widget-content');
            if (!profile.editExcel) {
                $container.find('td span').removeAttr('contenteditable');
            }
            that.trig('onExcelLoaded');
        })

        //导出数据
        $container.find('#outputExcel').click(function() {
            if (that.workbook.Sheets) {
                updateWb();
                XLSX.writeFile(that.workbook, that.excelName);
                that.trig('onExcelOutputed');
            }
        })
        //单击sheet 
        $container.on('click', '.sheetWindow table', function() {
            that.trig('onSheetClick');
        })
        //单元格focus
        $container.on('focus', '.sheetWindow table td span', function() {
            that.trig('onCellFocus');
        })
        //单元格blur
        $container.on('blur', '.sheetWindow table td span', function() {
            updateWb();
            that.trig('onCellBlur');
        })
        //单元格click
        $container.on('click', '.sheetWindow table td', function() {
            if (profile.editExcel) {
                $(this).find('span').focus();
            }
            $container.find('.sheetWindow table td').removeAttr('isCurr');
            $(this).attr('isCurr', 'true');
        })
        //初始化加载数据
        if (profile.loadData) {
            this.getSourceData(profile.srcId, {}, function(data){
                if (data.rows) {
                    data = data.rows;
                }
                that.workbook = XLSX.utils.book_new();
                var sheet = XLSX.utils.json_to_sheet(data);
                XLSX.utils.book_append_sheet(that.workbook, sheet, 'Sheet1');
                that.affected();
            })
        } else {
            this.affected();
        }
        //上传Excel
        $container.on('click', '#loadExcel', function() {
            $('#fileLoader').click();
        })
        $container.on('change', '#fileLoader', function(e) {
            var f = e.target.files[0];
            if (!f) {
                return
            }
            if (/.xls$/.test(f.name) || /.xlsx$/.test(f.name)) {
                that.excelName = f.name;
                var reader = new FileReader();
                reader.onload = function (e) {
                    that.workbook = XLSX.read(new Uint8Array(e.target.result), {
                        type: 'array',
                        cellFormula: false,
                        cellHTML: true,
                        cellText: false,
                        cellStyles: true,
                        cellDates: true,
                        dateNF: 'h:mm AM/PM',
                        sheetStubs: true
                    });
                    that.affected();
                }
                reader.readAsArrayBuffer(f);
            } else {
                $(this).val('');
                alert('请上传 xls 或 xlsx 格式的文件！');
            }
        })
        return $container;
    },
    onFrameReady: function(zContext) {},
    getData: function() {
        var $container = this.$container;
        var $currSheet = $container.find('.sheetWindow table');
        var EXCEL_DATA = this.workbook || {};
        var SHEET_NAMES = this.workbook.SheetNames || [];
        var SHEETS = this.workbook.Sheets || {};
        var SHEETS_TO_CSV = {};
        var SHEETS_TO_JSON = {};
        var SHEETS_TO_FORMULAE = {};
        var CURR_SHEET_NAME = $currSheet.attr('id') || '';
        var CURR_SHEET = {};
        if (CURR_SHEET_NAME) {
            CURR_SHEET = this.workbook.Sheets[CURR_SHEET_NAME]
        }
        var CURR_SHEET_TO_JSON = XLSX.utils.sheet_to_json(CURR_SHEET);
        var CURR_SHEET_ROWS = CURR_SHEET_TO_JSON.length;
        var CURR_SHEET_COLS = 0;
        CURR_SHEET_TO_JSON.forEach(function(val) {
            if (Object.getOwnPropertyNames(val).length - 1 > CURR_SHEET_COLS) {
                CURR_SHEET_COLS = Object.getOwnPropertyNames(val).length - 1;
            }
        })
        var $cell = $currSheet.find('td[isCurr="true"]');
        var CURR_CELL_POS = null;
        var CURR_CELL_CONTENT = null;
        if ($cell.length && $cell.attr('id')) {
            CURR_CELL_POS = $cell.attr('id').split('-')[1];
            CURR_CELL_CONTENT = CURR_SHEET[CURR_CELL_POS].v;
        }
        for (var key in this.workbook.Sheets) {
            SHEETS_TO_CSV[key] = XLSX.utils.sheet_to_csv(this.workbook.Sheets[key]);
            SHEETS_TO_JSON[key] = XLSX.utils.sheet_to_json(this.workbook.Sheets[key]);
            SHEETS_TO_FORMULAE[key] = XLSX.utils.sheet_to_formulae(this.workbook.Sheets[key]);
        }
        var data = {
            'EXCEL_DATA': EXCEL_DATA,
            'SHEET_NAMES': SHEET_NAMES,
            'SHEETS': SHEETS,
            'SHEETS_TO_CSV': SHEETS_TO_CSV,
            'SHEETS_TO_JSON': SHEETS_TO_JSON,
            'SHEETS_TO_FORMULAE': SHEETS_TO_FORMULAE,
            'CURR_SHEET_NAME': CURR_SHEET_NAME,
            'CURR_SHEET': CURR_SHEET,
            'CURR_SHEET_TO_JSON': CURR_SHEET_TO_JSON,
            'CURR_SHEET_ROWS': CURR_SHEET_ROWS,
            'CURR_SHEET_COLS': CURR_SHEET_COLS,
            'CURR_CELL_POS': CURR_CELL_POS,
            'CURR_CELL_CONTENT': CURR_CELL_CONTENT
        }
        return data;
    },
    isValid: function() {
        var $container = this.$container;
        return true
    },
    affected: function(zContext, page) {
        var $container = this.getContainer();
        var profile = this.profile;
        $container.find('.sheetWindow').html('');
        $container.find('.sheets').html('');
        //渲染表按钮并储存表数据
        if (this.workbook.Sheets) {
            for (var key in this.workbook.Sheets) {
                var data = this.workbook.Sheets[key];
                if (data['!ref']) {
                    var sheetStr = `<a name="${key}">${key}</a>`;
                    $container.find('.sheets').append(sheetStr);
                    $container.find('.sheets a:last-child').data('sheet', data);
                }
            }
        }
        $container.find('.operate a').button();
        $container.find('.sheets a:first-child').click();
        this.trig('complete');
    }
});