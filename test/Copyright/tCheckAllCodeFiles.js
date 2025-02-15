/* Copyright (c) 2022 Zenin Easa Panthakkalakath */

const path = require('path');
const glob = require('glob');
const requireText = require('require-text');

QUnit.test('Check code files for copyright message', async function(assert) {
    // All files to ignore in the following checks
    const options = {
        ignore: [
            'node_modules/**/*',
            'package.json',
            'package-lock.json',
        ],
    };

    // For HTML
    await new Promise(function(resolve, reject) {
        glob('**/*.html', options, function(err, files) {
            assert.notOk(err);
            for (let i = 0; i < files.length; i++) {
                const fileContent =
                    requireText(path.join('./../../../', files[i]), require);
                assert.ok(fileContent.includes(
                    '<!-- Copyright (c) 2022 Zenin Easa Panthakkalakath -->'),
                'Copyright message not found in: ' + files[i],
                );
            }
            resolve('All good');
        });
    });

    // For Javascript
    await new Promise(function(resolve, reject) {
        glob('**/*.js', options, function(err, files) {
            assert.notOk(err);
            for (let i = 0; i < files.length; i++) {
                const fileContent =
                    requireText(path.join('./../../../', files[i]), require);
                assert.ok(
                    fileContent.includes(
                        '/* Copyright (c) 2022 Zenin Easa Panthakkalakath */'),
                    'Copyright message not found in: ' + files[i],
                );
            }
            resolve('All good');
        });
    });

    // For JSON
    await new Promise(function(resolve, reject) {
        glob('**/*.json', options, function(err, files) {
            assert.notOk(err);
            for (let i = 0; i < files.length; i++) {
                const fileContent =
                    requireText(path.join('./../../../', files[i]), require);
                assert.ok(
                    fileContent.includes('"coprightMessage": ' +
                        '"Copyright © 2022 Zenin Easa Panthakkalakath"'),
                    'Copyright message not found in: ' + files[i],
                );
            }
            resolve('All good');
        });
    });
});
