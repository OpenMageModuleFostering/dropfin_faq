/**
 * Dropfin
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE_AFL.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magento.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade 
 * this extension to newer versions in the future. 
 *
 * @category    Dropfin
 * @package     FAQ
 * @copyright   Copyright (c) Dropfin (http://www.dropfin.com)
 */

CategoryAutoUpdater = Class.create();
CategoryAutoUpdater.prototype = {
    initialize: function (firstSelect, secondSelect, selectFirstMessage, noValuesMessage, values, selected)
    {
        this.first = $(firstSelect);
        this.second = $(secondSelect);
        this.message = selectFirstMessage;
        this.values = values;
        this.noMessage = noValuesMessage;
        this.selected = selected;

        this.update();

        Event.observe(this.first, 'change', this.update.bind(this));
    },

    update: function()
    {
        this.second.length = 0;
        this.second.value = '';
        
        var select = this.first;
        var selected = [];
        for (var i = 0; i < select.length; i++) {
            if (select.options[i].selected) selected.push(select.options[i].value);
        }
        
        var noValue = true;
        if(selected.length > 0){
            var existOpion = [];
            for (var i = 0; i < selected.length; i++) {
                if (selected[i] && this.values[selected[i]] && Object.size(this.values[selected[i]]) > 0) {
                    noValue = false;
                    for (optionValue in this.values[selected[i]]) {
                        if(existOpion.indexOf(optionValue) == -1) {
                            existOpion.push(optionValue);
                            optionTitle = this.values[selected[i]][optionValue];
                            this.addOption(this.second, optionValue, optionTitle);
                        }
                    }
                    this.second.disabled = false;
                }
            }
        }
        if(noValue){
            this.addOption(this.second, '', this.message);
            this.second.disabled = true;
        }
    },

    addOption: function(select, value, text)
    {
        option = document.createElement('OPTION');
        option.value = value;
        option.text = text;

        if (this.selected && typeof optionValue !== 'undefined' && (this.selected).include(optionValue)) {
            option.selected = true;
        }

        if (select.options.add) {
            select.options.add(option);
        } else {
            select.appendChild(option);
        }
    }
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};