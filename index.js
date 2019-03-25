'use strict';
// const csvParse = require('csv-parse/lib/sync');
// const fs = require('fs');
// const path = require('path');
// const namesPath = path.join(__dirname, 'names.csv');
// const namesBuf = fs.readFileSync(namesPath, 'utf8');
const namesMap = function() {
    let map = {};
    // let parsed = csvParse(namesBuf, {
    //     columns: true,
    //     skip_empty_lines: true
    // });
    
    // parsed.forEach(col => map[col['nominitive']] = col);
    
    return map;
}();

class Name {
    constructor(name) {
        
    }
}

class FirstName extends Name {
    constructor(name) {
        
    }
}

class Patronym extends FirstName {
    constructor(name) {
        
    }
}

class AinmGaeltachta {
    constructor(nameArray) {
        
    }
}

function getAinmGaeltachta() {
    let args = Array.from(arguments);
    let nameArray = [];
    
    if (args[0] instanceof Array) {
        for (var index = 0; index < args[0].length; index++) {
            switch (index) {
                case index == 0:
                    nameArray.push(new FirstName(args[0][index]));
                    break;
                default:
                    nameArray.push(new Patronym(args[0][index]));
            }
        }
    }
    
    return new AinmGaeltachta(nameArray);
}
