# 装饰器

> 不会装饰器就是不会 Python  -- 来源不详

### Mission
任务：编写一个计时器，功能是记录其他 function 运行所需要的时间。

#### 思考过程
我们很难在一开始就写出完美的程序，当想不到完美解决方案的时候，可以先想一个能用的方案，对于这个问题我们暂时不管计时器的最终形态，先思考如何记录一个 function 运行时间的方案，而这个解决方案可以这样去描述。

![description](http://cdn.defcoding.com/img_0043.jpg)

> 心得：我在思考问题解决方案的时候经常会用白纸记录解决的步骤，而不是直接就写代码，我在记录解决方案的同时也会思考问题中特殊情况，尽可能全面的去考虑问题，当我在本子上把问题解决方案描述清楚之后，用代码实现就只是小 case 了。

#### 不优雅解决方案系列
我们上 google 可以搜索到 Python 记录当前时刻的方案，Python 的标准库中的 time 模块，timeit 模块都可以记录时间，做了比较之后发现，`time.clock` 是最符合我们需求的，它记录的是 CPU 的运行时间，单位是秒。

![time.clock()](http://cdn.defcoding.com/5C64BCF3-6EA0-4339-8C35-578E829DB195.png)

**需要记录时间的函数**
``` python
# coding: utf-8


def run_function():
    for i in xrange(100000):
        print i


if __name__ == '__main__':
    run_function()
```

**不优雅方案一，在函数内部添加计时函数代码**
``` python
# coding: utf-8

import time


def run_function():
    start_time = time.clock()
    for i in xrange(100000):
        print i
    end_time = time.clock()
    run_time = end_time - start_time
    print run_time


if __name__ == '__main__':
    run_function()
```
这个方案适应性太差，每个需要计时的函数都要添计时相关的代码，**不符合一个函数只做一件事的规则**。

**不优雅方案二，调用函数时添加计时代码**
``` python
# coding: utf-8

import time


def run_function():
    for i in xrange(100000):
        print i


if __name__ == '__main__':
    start_time = time.clock()
    run_function()
    end_time = time.clock()
    run_time = end_time - start_time
    print run_time
```
这个解决方案没有破坏我们的函数，但是需要计时的时候就得写一堆计时代码，**不符合 DRY（Don't repeat yourself）原则**，写这样的代码我们就没法都偷懒了，而且当我们要去掉计时代码的时候简直就是 disaster。

再来看方案二，如果我们可以把计时代码写到一个 function 内是不是就可以让代码变得好维护了呢？如果你想到了这点，那你马上就知道 Python 装饰器适用于解决什么样的问题了。

### 装饰器（Decorator）
#### 基础知识
在 Python 中，对象是一等公民（first class），意味着对象可以被当成变量，函数参数，或者函数的返回结果，而 Python 中的一切都是对象，function 自然也是一个对象。

#### 一个不错的解决方案
``` python
# coding: utf-8

import time


def run_function():
    for i in xrange(100000):
        print i


def log_time(func):
    start_time = time.clock()
    ret = func()
    end_time = time.clock()
    run_time = end_time - start_time
    print run_time
    return ret


if __name__ == '__main__':
    log_time(run_function)
```
这个解决方案把定时器写成了 `log_time` 函数，可以通过调用 `log_time` 函数实现计时，但这个方案只能说是不错，考虑这种场景，如果你在代码的很多地方调用了 `run_function` 这个函数，此时你要把 `run_function` 的调用全变成 `log_time(run_function)`，是不是觉得还是有那么一点难。

#### 终极解决方案
到现在我们已经完全明白我们面对的问题了，我们需要保证函数调用不变的情况下给函数加上计时代码。

``` python
# coding: utf-8

import time


def run_function():
    for i in xrange(100000):
        print i


def log_time(func):
    def wrapper_func():
        start_time = time.clock()
        ret = func()
        end_time = time.clock()
        run_time = end_time - start_time
        print run_time
        return ret
    return wrapper_func


run_function = log_time(run_function)

if __name__ == '__main__':
    run_function()
```

我们来具体讲解一下 `log_time` 函数，它的返回结果是一个函数，`log_time(func_function)` 等同于返回了 `wrapper_func` 函数，`wrapper_func` 就是我们的计时函数代码。

这个解决方案解决了我们遇到的所有问题，在不影响其他代码的情况下添加了函数计时的功能，扩张性也可以满足，不过我们还有办法让代码**看起来**优雅些。

> 修改代码的同时要不要影响到其他的代码，不要修复一个 bug 的同时引入其他 bug。

#### 语法糖（Syntactic sugar）
> 语法糖法对语言的功能并没有影响，但是更方便程序员使用。语法糖让程序更加简洁，有更高的可读性。 -- 维基百科

语法糖不会影响程序功能，只是让代码更好看而已。
``` python
# coding: utf-8

import time


def log_time(func):
    def wrapper_func():
        start_time = time.clock()
        ret = func()
        end_time = time.clock()
        run_time = end_time - start_time
        print run_time
        return ret
    return wrapper_func


@log_time
def run_function():
    for i in xrange(100000):
        print i


if __name__ == '__main__':
    run_function()
```
上面代码的 `@log_time` 的作用是让 `run_function` 等价于 `run_function = log_time(run_function)`，这个方案就是优雅的解决方案了。

到现在你已经学到了装饰器的作用和使用方法，但是装饰器不止是这一种类型，下面我们学习一下其他类型的装饰器。

### 更多装饰器

#### 带参数函数的装饰器
``` python
# coding: utf-8

import time


def log_time(func):
    def wrapper_func(*args, **kwargs):
        start_time = time.clock()
        ret = func(*args, **kwargs)
        end_time = time.clock()
        run_time = end_time - start_time
        print run_time
        return ret
    return wrapper_func


@log_time
def run_function(count=100000):
    for i in xrange(count):
        print i

# run_function 等价于 run_function = log_time(run_function)
# log_time(run_function) 的返回结果是 wrapper_func，wrapper_func 调用时可以接收参数。

if __name__ == '__main__':
    run_function(10000)
    run_function()
```

#### 带参数的装饰器

``` python
# coding: utf-8

import time


def log_time(log_label):
    def wrapper_func(func):
        def wrapper_param(*args, **kwargs):
            start_time = time.clock()
            ret = func(*args, **kwargs)
            end_time = time.clock()
            run_time = end_time - start_time
            print '{log_label}-{run_time}'.format(log_label=log_label, run_time=run_time)
            return ret
        return wrapper_param
    return wrapper_func


@log_time('cost cpu time')
def run_function(count=100000):
    for i in xrange(count):
        print i

# run_function 等价于 run_function = log_time('cost cpu time')(run_function)
# log_time('cost cpu time') 的返回结果是 wrapper_func
# log_time('cost cpu time')(run_function) 的返回结果是 wrapper_param
# 调用 wrapper_param() 得到 run_function 的结果

if __name__ == '__main__':
    run_function()
```
很多人学装饰器的时候会觉得他的语法有点古怪难懂，但是如果你明白了 `@decorator_func` 的等价调用之后，你就明白装饰器为什么要写成内嵌函数的函数了。

> 理解事物的本质才能让我们真正学会使用事物。

### 总结
装饰器是 Python 非常关键的特性，是每个学习 Python 的同学必须要会的，除此之外大家一定要理解 Python 中一切皆对象，对象是一等公民（first-class）这句话的含义。
