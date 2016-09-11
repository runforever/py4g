# coding: utf-8

def say_hello(dog, **kwargs):
    for name, greeting in kwargs.items():
        print '{name} say {greeting} to {dog}'.format(name=name, greeting=greeting, dog=dog)


say_hello('Dachshund', jack='你好', rose='hi', mike='こんにちは')
