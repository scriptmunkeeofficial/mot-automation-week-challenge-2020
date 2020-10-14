module.exports = {
    'env': {
        'es6': true,
        'mocha': true,
        'node': true
    },
    'globals': {
        '$': true,
        '$$': true,
        'browser': true,
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2015,
        'sourceType': 'module'
    },
    'plugins': [
        'chai-friendly',
        'chai-expect',
        'import',
        'mocha',
        'wdio',
    ],
    'extends': [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:wdio/recommended',
        'plugin:mocha/recommended',
        'plugin:chai-friendly/recommended',
        'plugin:chai-expect/recommended',
    ],
    'rules': {
        'prefer-destructuring': 'warn',
        'class-methods-use-this': 'off',
        'global-require': 'off',
        'func-names': 'off',
        'import/prefer-default-export': 'off',
        'no-magic-numbers': [
            'warn',
            {
                'ignore': [0, 1080, 1920],
                'ignoreArrayIndexes': true,
                'enforceConst': true,
                'detectObjects': true
            },
        ],
        'mocha/no-mocha-arrows' : 'off',
    },
};
