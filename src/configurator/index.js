require('./index.less');
var locale = require('./i18n');
var template = require('./index.html');
var configurator = {
    constructor: function() {
        var tplHTML = template({
            locale: locale()
        });
        $('body').html(tplHTML);
    },
    setProfile: function(profile) {
        profile = $.extend({
            loadData: false,
            editExcel: true,
            outputExcel: true,
            raw: false
        }, profile);
        var title = locale('title');
        var dataSpecification = locale('dataSpecification');
        if (profile.srcId) {
            $('#dataWrap').attr('srcId', profile.srcId);
        }
        Enhancer.DatasourceManager.createConfigurator('dataWrap',{
            title: title,
            dataSpecification: dataSpecification,
            sourceId: profile.srcId,
            onSave : function(src){
                $('#dataWrap').attr('srcId', src.id);
            }
        });
        $('#loadData').prop('checked', profile.loadData);
        $('#editExcel').prop('checked', profile.editExcel);
        $('#outputExcel').prop('checked', profile.outputExcel);
        $('#raw').prop('checked', profile.raw);
    },
    getProfile: function() {
        return {
            srcId: $('#dataWrap').attr('srcId'),
            loadData: $('#loadData').prop('checked'),
            editExcel: $('#editExcel').prop('checked'),
            outputExcel: $('#outputExcel').prop('checked'),
            raw: $('#raw').prop('checked')
        }
    },
    getSupportedEventList: function(profile) {
        var data = [{
            'id': 'onExcelLoaded',
            'name': locale('onExcelLoaded'),
            'des': "Triggered when excel loaded"
        }, {
            'id': 'onSheetClick',
            'name': locale('onSheetClick'),
            'des': "Triggered when sheet click"
        }]
        if ($('#outputExcel').prop('checked')) {
            data = data.concat([{
                'id': 'onExcelOutputed',
                'name': locale('onExcelOutputed'),
                'des': "Triggered when excel outputed"
            }])
        }
        if ($('#editExcel').prop('checked')) {
            data = data.concat([{
                'id': 'onCellFocus',
                'name': locale('onCellFocus'),
                'des': "Triggered when cell focus"
            }, {
                'id': 'onCellBlur',
                'name': locale('onCellBlur'),
                'des': "Triggered when cell blur"
            }])
        }
        return data;
    },
    getSupportedVariableList: function(profile) {
        return [{
                name: 'EXCEL_DATA',
                type: 'object',
                des: locale('EXCEL_DATA')
            }, {
                name: 'SHEET_NAMES',
                type: 'array',
                des: locale('SHEET_NAMES')
            }, {
                name: 'SHEETS',
                type: 'object',
                des: locale('SHEETS')
            }, {
                name: 'SHEETS_TO_CSV',
                type: 'object',
                des: locale('SHEETS_TO_CSV')
            }, {
                name: 'SHEETS_TO_JSON',
                type: 'object',
                des: locale('SHEETS_TO_JSON')
            }, {
                name: 'SHEETS_TO_FORMULAE',
                type: 'object',
                des: locale('SHEETS_TO_FORMULAE')
            }, {
                name: 'CURR_SHEET_NAME',
                type: 'string',
                des: locale('CURR_SHEET_NAME')
            }, {
                name: 'CURR_SHEET',
                type: 'object',
                des: locale('CURR_SHEET_DATA')
            }, {
                name: 'CURR_SHEET_TO_JSON',
                type: 'array',
                des: locale('CURR_SHEET_TO_JSON')
            }, {
                name: 'CURR_SHEET_ROWS',
                type: 'number',
                des: locale('CURR_SHEET_ROWS')
            }, {
                name: 'CURR_SHEET_COLS',
                type: 'number',
                des: locale('CURR_SHEET_COLS')
            }, {
                name: 'CURR_CELL_POS',
                type: 'string',
                des: locale('CURR_CELL_POS')
            }, {
                name: 'CURR_CELL_CONTENT',
                type: 'string',
                des: locale('CURR_CELL_CONTENT')
            }]
    },
    getDependentVariableList: function(profile) {
        return [];
    }
};
Enhancer.registerWidgetConfigurator(configurator);