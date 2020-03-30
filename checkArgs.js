module.exports = (args) => {
    if (!(args.get('a') && args.get('s'))) {
        console.error('-action and -shift required')
        process.exit(1)
    }

    if (args.get('action') !== 'encode' && args.get('action') !== 'decode') {
        console.error(`-action must be 'encode' or 'decode'`)
        process.exit(1)
    }

    if (!Number(args.get('shift'))) {
        console.error('-shift must be a number')
        process.exit(1);
    }

    if (!args.has('input')) {
        args.set('input', '');
    }
    
    if (!args.has('output')) {
        args.set('output', '');
    }
};