module.exports = new Array(
    {
        name: 'host',
        mappings: [
            ['static.test.com', {
                module: 'filehandler',
                path: 'xx'
            }]
        ]
    },

    {
        name: 'path',
        mappings: [
            ['/crossdomain.xml', {
                module: 'filehandler',
                path: '{root}/htdocs'
            }],
            ['*', 'servicehandler']
        ]
    },

    {
        name: 'path',
        regex: /(\.[a-z0-9])($|[^a-z0-9]{1})/i,
        mappings: [
            ['.html', 'filehandler'],
            ['.ico', 'filehandler'],
            ['.ejs', 'filehandler']
        ]
    }
);