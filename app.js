const fs = require('fs');
const read = require('read');
const Seq = require('seq');


const args = require('minimist')(process.argv.slice(2), {
    alias: {
      s: 'shift',
      i: 'input',
      o: 'output',
      a: 'action'
    },
    string: ['shift', 'input', 'output', 'action']
  });

const argsMap = new Map(Object.entries(args));
if (!argsMap.has('a') || !argsMap.has('s')) {
    console.log('No arguments')
    process.exit(1)
}
if (!argsMap.has('input')) {
    argsMap.set('input', '');
}

if (!argsMap.has('output')) {
    argsMap.set('output', '');
}

let isExist = true
fs.readFile(argsMap.get('output'),'utf-8', (err, outText) => {
    if (err) {
        isExist = false
    }
})


fs.readFile(argsMap.get('input'), 'utf-8', (err, inputText) => {
        try {
            if (!isExist) {
                console.log(csesar_crypt(inputText, +argsMap.get('shift'), argsMap.get('action')))
            } else {
            fs.writeFile(argsMap.get('output'), csesar_crypt(inputText, +argsMap.get('shift'), argsMap.get('action')), err => {})
            }
       
        } catch (err) {
            if (!isExist) {
                Seq()
                .seq(function () {
                    read({ prompt : 'Введите текст: ' }, this.into('consoleText'));
                })
                .seq(function (pass) {
                    console.log(csesar_crypt(this.vars.consoleText, +argsMap.get('shift'), argsMap.get('action')))
            });
            } else {
                Seq()
                    .seq(function () {
                        read({ prompt : 'Введите текст: ' }, this.into('consoleText'));
                    })
                    .seq(function (pass) {
                        fs.writeFile((argsMap.get('output'), csesar_crypt(this.vars.consoleText, +argsMap.get('shift'), argsMap.get('action')), err => {}))
                });
            }
        }
})


function csesar_crypt(inputText, shift, action) {
const a_CODE = 97;
const z_CODE = 122;
const A_CODE = 65;
const Z_CODE = 90;

return inputText
    .split('')
    .map(value => {
    let nextCharCode = value.charCodeAt(0);
    if (value.charCodeAt(0) >= a_CODE && value.charCodeAt(0) <= z_CODE) {
        if (action === 'encode') {
        nextCharCode =
            value.charCodeAt(0) + shift > z_CODE
            ? a_CODE + shift - (z_CODE - value.charCodeAt(0) + 1)
            : value.charCodeAt(0) + shift;
        }
        if (action === 'decode') {
        nextCharCode =
            value.charCodeAt(0) - shift < a_CODE
            ? z_CODE - (shift - (value.charCodeAt(0) - a_CODE + 1))
            : value.charCodeAt(0) - shift;
        }
    }
    if (value.charCodeAt(0) >= A_CODE && value.charCodeAt(0) <= Z_CODE) {
        if (action === 'encode') {
        nextCharCode =
            value.charCodeAt(0) + shift > Z_CODE
            ? A_CODE + shift - (Z_CODE - value.charCodeAt(0) + 1)
            : value.charCodeAt(0) + shift;
        }
        if (action === 'decode') {
        nextCharCode =
            value.charCodeAt(0) - shift < A_CODE
            ? Z_CODE - (shift - (value.charCodeAt(0) - A_CODE + 1))
            : value.charCodeAt(0) - shift;
        }
    }
    return String.fromCharCode(nextCharCode);
    })
    .join('');
};



