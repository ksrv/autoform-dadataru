
import {_} from 'meteor/underscore';
import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import './dadata.html';

AutoForm.addInputType('dadataru', {
    template: 'afDadataSuggestions',
    
    valueOut: function(){
        return this.val();
    },

    contextAdjust: function(context){
        context.atts.value = context.value;
        context.dadataOptions = context.atts.dadataOptions || {};
        delete context.atts.dadataOptions;
        return context;
    }
});

Template.afDadataSuggestions_bootstrap3.onRendered(function(){
    if (!this.data.dadataOptions) {
        return console.warn('dadata.ru plugin options must be defined');
    }

    let options    = this.data.dadataOptions || {};
    
    options = _.extend({
        serviceUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs',
        type:       'ADDRESS',
        count:      3
    }, options);

    this.$('input[type=text]').suggestions(options);
});


AutoForm.addInputType('dadataru_object', {

    template: 'afDadataSuggestionsObject',

    valueOut: function(){
        let values = {};
        $('input[type=hidden]', this).each(function(){
            values[ $(this).prop('name') ] =  $(this).val();
        });
        return values;
    },

    contextAdjust: function(context){
        // Если текущее поле - Объект, то свойство _objectKeys 
        // не является пустым объектом и содержит названия полей, 
        // которые надо вернуть из подсказок dadata.ru
        let schema = AutoForm.getFormSchema();
        let schemaType = schema._schema[context.name].type.name;

        context.dadataOptions = context.atts.dadataOptions || {};
        delete context.atts.dadataOptions;

        var createAtts = function (name){
            return { name: name, value: context.value[name] };
        }

        context.dadataFields = schema._objectKeys[context.name+'.'].map(createAtts);
        context.atts.value = context.value['value'];

        return context;
    }
});

Template.afDadataSuggestionsObject_bootstrap3.onRendered(function(){
    if (!this.data.dadataOptions) {
        return console.warn('dadata.ru plugin options must be defined');
    }

    const template = this;
    let options    = this.data.dadataOptions || {};
    let fields     = this.data.dadataFields  || [];
    
    options = _.extend({
        serviceUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs',
        type:       'ADDRESS',
        count:      3
    }, options);

    options.onSelect = function(suggestions){
        if (suggestions && suggestions.data) {
            fields.forEach(function(field){
                if (field.name == 'value') {
                    template.$('input[name='+field.name+']').val(suggestions.value);
                } else {
                    template.$('input[name='+field.name+']').val(suggestions.data[field.name])
                }
            });
        }
    }

    this.$('input[type=text]').suggestions(options);
});

Template.afDadataSuggestionsObject_bootstrap3.helpers({
    dts: function(){
        return { 'data-schema-key': this.atts['data-schema-key'] };
    },

    atts: function(){
        let atts = _.clone(this.atts);

        atts.class = 'form-control';
        atts = _.omit(atts, 'data-schema-key');
        return atts;
    }
});