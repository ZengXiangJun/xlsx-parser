require('./index.less');
var locale = require('./i18n');
var template = require('./index.html');
var configurator = {
    constructor: function() {
        var that = this;
        var tplHTML = template({
            locale: locale()
        });
        $('body').html(tplHTML);
    },
    setProfile: function(profile) {
        profile = $.extend({
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
        var that = this;
    },
    getProfile: function() {
        return {
            srcId: $('#dataWrap').attr('srcId'),
        };
    },
    getSupportedEventList: function(profile) {
        return []
    },

    getSupportedVariableList: function(profile) {
        return []
    },

    getDependentVariableList: function(profile) {
        return [];
    }
};
Enhancer.registerWidgetConfigurator(configurator);