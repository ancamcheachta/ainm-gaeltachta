'use strict';

const csvParse = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');
const namesPath = path.join(__dirname, 'names.csv');
const namesBuf = fs.readFileSync(namesPath, 'utf8');
const namesMap = function() {
    let map = {};
    let parsed = csvParse(namesBuf, {
        columns: true,
        skip_empty_lines: true
    });
    
    parsed.forEach(col => map[col['nominitive']] = col);
    
    return map;
}();

const LENITION_MAP = {
    b: null,
    c: null,
    d: null,
    f: null,
    g: null,
    m: null,
    p: null,
    s: null,
    t: null
};
const MUST_IMPLEMENT = 'Fatal: Must implement method.';

    
class Name {
    constructor(name) {
        this.nameRaw = name;
        this.isIrish = name in namesMap;
        this.data = namesMap[name] || name;
        this.previous = null;
        this.next = null;
    }
    
    getIsIrish() {
        return this.isIrish;
    }
    
    getNormalisedForm() {
        throw new Error(MUST_IMPLEMENT);
    }
    
    padWithWhitespace() {
        return this.next ? ' ' : '';
    }
    
    setNext(next) {
        this.next = next;
    }
    
    setPrevious(previous) {
        this.previous = previous;
    }
}

class FirstName extends Name {
    constructor(name) {
        super(name);
    }
    
    getNormalisedForm() {
        return this.data['nominitive'];
    }
}

class Patronym extends FirstName {
    constructor(name) {
        super(name);
    }
    
    getNormalisedForm() {
        console.log(this.getIsIrish());
        return getLenited(this.data['genitive'], this.getIsIrish());
    }
}

class AinmGaeltachta {
    constructor(nameArray) {
        this.nameArray = nameArray;
    }
    
    getNormalisedForm() {
        let normalisedForm = '';
        
        this.nameArray.forEach(name => normalisedForm += name.getNormalisedForm() + name.padWithWhitespace());
        
        return normalisedForm;
    }
}

function getLenited(word, isIrish) {
    if (isIrish && word[0].toLowerCase() in LENITION_MAP) {
        let lenition = word[0] + 'h';
        
        return lenition + word.substring(1, word.length);
    }
    
    return word;
}

function getName(nameRaw, index) {
    let name;
    
    switch (index) {
        case 0:
            name = new FirstName(nameRaw);
            break;
        default:
            name = new Patronym(nameRaw);
            break;
    }
    
    return name;
}

function getAinmGaeltachta() {
    let args = Array.from(arguments);
    let nameArray = [];
    
    if (args[0] instanceof Array) {
        for (var index = 0; index < args[0].length; index++) {
            let name = getName(args[0][index], index);
            
            if (index - 1 in args[0]) {
                name.setPrevious(getName(args[0][index - 1], index - 1));
            }
            
            if(index + 1 in args[0]) {
                name.setNext(getName(args[0][index + 1], index + 1));
            }
            
            nameArray.push(name);
        }
    }
    
    return new AinmGaeltachta(nameArray);
}

module.exports = getAinmGaeltachta;
