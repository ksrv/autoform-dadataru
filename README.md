# ksrv:autoform-dadataru

Meteor-пакет для [aldeed:autoform](https://github.com/aldeed/meteor-autoform). Представляет пользовательский инпут-тип "dadataru", для рендера поля с подсказками от dadata.ru. Использует плагин [dadata.ru suggestions plugin](https://dadata.ru/suggestions/usage).
Пока шаблон только для twitter bootstrap 3.

## Установка

```bash
$ meteor add ksrv:autoform-dadataru
```

## Использование

Возможны два варианта использования: для получения строки и объекта данных.
Пример схемы для получения строки.

```javascript
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

var Schema = new SimpleSchema({
    address: {
        type: String,
        autoform: {
            type: 'dadataru',
            dadataOptions: {
                token: '<your token>',
                type: 'ADDRESS'
            }
        }
    }
});
```

Пример схемы для получения объекта.

```javascript
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

/**
 * Схема адреса.
 * Используются названия полей подсказок объекта data. 
 * Возможно использование поля value. 
 * @see https://dadata.ru/suggestions/usage/
 */
var Address = new SimpleSchema({
    // Это поле указывать обязательно. 
    // Оно выводится в форме для редактирования.
    'value':            { type: String },
    'postal_code':      { type: String, optional: true },
    'region_fias_id':   { type: String, optional: true },
    'region_type':      { type: String, optional: true },
    'region':           { type: String, optional: true },
    'city_fias_id':     { type: String, optional: true },
    'city_type':        { type: String, optional: true },
    'city':             { type: String, optional: true },
    'street_type':      { type: String, optional: true },
    'street':           { type: String, optional: true },
    'house_type':       { type: String, optional: true },
    'house':            { type: String, optional: true },
    'flat_type':        { type: String, optional: true },
    'flat':             { type: String, optional: true },
    'geo_lat':          { type: String, optional: true },
    'geo_lon':          { type: String, optional: true },
});

/**
 * Схема полного имени
 */
var Fullname = new SimpleSchema({
    // Это поле указывать обязательно. 
    // Оно выводится в форме для редактирования.
    value:              { type: String, optional: true },
    surname:            { type: String, optional: true },
    name:               { type: String, optional: true },
    patronymic:         { type: String, optional: true },
    gender:             { type: String, optional: true },
});

/**
 * Схема объекта
 */
var Schema = new SimpleSchema({
    fullname: {
        type: Fullname,
        autoform: {
            type: 'dadataru_object',
            dadataOptions: {
                type: 'NAME',
                token: '<your token>',
            },
        }
    },

    address: {
        type: Address,
        autoform: {
            type: 'dadataru_object',
            dadataOptions: {
                type: 'ADDRESS',
                token: '<your token>',
            },
        }
    },

    organization: {
        type: String,
        autoform: {
            type: 'dadataru_object',
            dadataOptions: {
                type: 'PARTY',
                token: '<your token>',
            },
        }
    }
});
```
