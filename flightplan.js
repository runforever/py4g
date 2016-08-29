var plan = require('flightplan');

plan.target('deploy', {
    host: 'localhost',
});

plan.local(function(transport) {
    transport.log('build new book');
    transport.exec('gitbook build');

    transport.with('cd .deploy_book', function() {
        transport.log('cp file from _book to .deploy_book');
        transport.exec('cp -r ../_book/* .');

        transport.log('git commit');
        transport.exec('git add .');
        transport.exec('git commit -m "deploy new version"');

        transport.log('push to github');
        transport.exec('git push -f origin deploy_book:deploy_book');
    });
});
