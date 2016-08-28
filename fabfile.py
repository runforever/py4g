# coding: utf-8

from datetime import datetime

from fabric.api import (
    local,
    lcd,
)


def deploy():
    local('gitbook build')

    with lcd('./.deploy_book'):
        deploy_time = datetime.now().strftime('%Y-%m-%d %H:%M')
        local('cp -r ../_book/* .')
        local('git add .')
        local('git commit -m "deploy at %s"' % deploy_time)
        local('git push -f origin deploy_book:deploy_book')
