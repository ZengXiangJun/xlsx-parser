require('./index.less');
var locale = require('./i18n');
var tpl = require('./index.html');
var XLSX = require('xlsx');
Enhancer.registerWidget({
    construct: function(profile, zContext) {
        profile = $.extend({
        }, profile);
        var $container = this.getContainer();
        $container.html(tpl({
            locale: locale()
        })).addClass('js-xlsx');
        $('#loadSheet').change(function(e) {
            var files = e.target.files, f = files[0];
            if (f.type === 'application/vnd.ms-excel' 
                || f.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = new Uint8Array(e.target.result);
                    var workbook = XLSX.read(data, {type: 'array'});
                    console.log(workbook);
                    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    //console.log(workbook)
                    //XLSX.writeFile(workbook, 'out.xlsx');
                    //console.log(XLSX.utils.sheet_to_formulae(worksheet))
                    $('.sheetWindow').html(XLSX.utils.sheet_to_html(worksheet));
                    $('.sheetWindow').find('td').attr('contenteditable', true).addClass('ui-widget-content');
                }
                reader.readAsArrayBuffer(f);
            } else {
                $(this).val('');
                alert('请上传 .xls .xlsx 后缀的文件')
            }
        })
        this.trig('complete');
        return $container;
    },
    onFrameReady: function(zContext) {},
    getData: function() {
        return [];
    },
    isValid: function() {
        var $container = this.$container;
        if (!$container.find('.list[class~=ui-state-highlight]').length) {
            return false
        } else {
            return true
        }
    },
    affected: function(zContext, page) {
    }
});