# 异常处理

> 永远要这样写代码，好像最终维护你代码的人是个狂暴的、知道你住在哪里的精神病患者 -- Martin Golding

### 什么是异常
在编程的过程中我们多多少少会遇到 `SyntaxError: invalid syntax`（语法错误），这是因为我们把代码的表达式写错了，例如：

![syntax error](http://cdn.defcoding.com/32FE9F73-3742-4941-92E8-E8DA576D6F10.png)

而异常通常是代码的语法是正确的，在某些特定的输入下导致程序的崩溃，例如：

![exception](http://cdn.defcoding.com/F969CBB2-C742-45EE-BDBC-10D919FA868F.png)

`int` 函数可以将字符串转换成整型，例如：`int('1')`、`int('2')`、`int('1010')` 可以转换为 `1`、`2`、`1010`，而传的字符串不能转换成整数，`int` 函数就会抛出 `ValueError` 异常，如果你不处理这个异常的话，你的程序就会在异常抛出的地方中止。

当我们的程序中处理了这些异常，才能让程序遇到异常的时候也能继续执行下去而不是崩溃。

### 异常处理
Python 处理异常的语法有如下几种。

1. `try...except...` 格式。
2. `try...except...else...` 格式。
3. `try...except...finally...` 格式。

**问题**：定义一个函数，作用是将字符串转化成整型。

**需求分析**：

1. `int` 函数可以将数字转化成字符串。
2. 需要处理不能转化成整型的的字符串的异常 `ValueError`。
3. 需要处理参数不是字符串或者整型的异常 `TypeError`。
4. 遇到异常时函数的返回结果是 `0`。

如果输入不合法 `int` 函数抛出相应的异常，如图：

![int_exception](http://cdn.defcoding.com/DC387C04-4E46-4A91-9EAD-ACB6F7DC684C.png)

**实现**：
``` python
def get_int(string):
    try:
        result = int(string)
    except (ValueError, TypeError):
        result = 0
    return result


print get_int('101')
# result 101

print get_int('10')
# result 10

print get_int('hello')
# result 0

print get_int(None)
# result 0
```
代码中我们将可能发生异常的代码 `result = int(string)` 放到 `try...except` 中，使用 `except` 来捕获多个可能会出现的异常，出现异常后将 `result` 的值置为 `0`。

如果我们想知道具体发生了什么异常，我们可以用下面的代码将异常打印出来。
``` python
def get_int(string):
    try:
        result = int(string)
    except (ValueError, TypeError) as e:
        print e
        result = 0
    return result

print get_int('hello')
# invalid literal for int() with base 10: 'hello'
# result 0

print get_int(None)
# int() argument must be a string or a number, not 'NoneType'
# result 0
```
代码中是用 `as` 语句将捕获的异常赋值给变量 `e`，然后是用 `print e` 将具体异常打印出来。

除了同时处理多个异常，我们还可以使用如下方式单独处理每个可能出现的异常。
``` python
def get_int(string):
    try:
        result = int(string)
    except ValueError:
        result = 0
    except TypeError:
        result = 0
    return result
```

程序遇到异常后返回什么结果我们要根据具体具体的业务来定，当前处理异常的方式是返回 `0`，我们还可以使用下面的方式来处理异常。
``` python
def get_int(string):
    try:
        result = int(string)
        has_exception = False
    except (ValueError, TypeError):
        result = 0
        has_exception = True
    return has_exception, result


has_exception, result = get_int('exception')
if has_exception:
    print 'oops! exception'
else:
    print value
```
`get_int` 返回结果是异常状态 `has_exception` 和转换的值 `result`，如果发生异常就交给函数调用者去完成相应的处理逻辑。

一些初学者经常滥用异常处理，下面列出一些异常处理的原则。

**原则 1**：`except` 要指定具体的异常，而不是捕获所有的异常。

错误代码示范
``` python
def get_int(string):
    try:
        result = int(string)
    except:
        result = 0
   return result
```
`TypeError` 和 `ValueError` 是我们可以预知的异常，而上述代码会捕获所有异常，这样的代码会隐藏潜在的 `bug`，当出现问题的时候会让我们就很难以找到问题的症结。

**原则 2**：只在可能会出现异常的代码上使用 `try...except...`。

`get_int` 函数中的 `try...except` 只包含了一行可能出现异常的代码 `result = int(string)`，这样有助于我们明确定位出现异常的代码，如果你的 `try...except` 中包含了其他代码，当出现异常的时候你就得考虑到底是哪行代码出异常了。

**原则 3**：明确知道出现异常的时候应该返回什么样处理的结果。

**原则 4**：如果使用 `if` 条件判断可以替代异常处理的话就不要使用异常处理。

Python 异常处理还有方式 `try...except...else` 和 `try...except...finally`，下面主要讲他们的使用方法，而是否使用需要视具体问题而定，关于异常处理读者要掌握的是异常处理的思想，而不是异常处理的用法。

#### try...except...else...
`else` 分支在没有触发异常的时候会执行，例如下面的代码：
``` python
def get_int(string):
    try:
        result = int(string)
    except (ValueError, TypeError):
        result = 0
        print 'oops! exception'
    else:
        print 'no exception'
    return result

# 无异常，执行 else 分支
print get_int('23')
# no exception
# 23

# 出现异常，不执行 else 分支
print get_int('exception')
# oops! exception
# 0
```

#### try...except...finally...
`finally` 分支是无论是否发现异常都会执行里面的代码，适合用在需要释放资源的场景（打开关闭文件，打开关闭数据库连接），例如下面的问题：

`number.txt` 文件中有如下内容
```
1
2
3
s
88
```
请将每行的字符串转换为数字，不能转化为数字的字符串返回 `0`，将转换的结果放到 `list` 中返回。

**需求分析**：

1. 使用 `open` 方法打开文件，使用 `close` 方法关闭文件。
2. 需要处理文件不存在时 `open` 函数抛出 `IOError` 异常。
3. 使用上面的 `get_int` 函数处理字符串转换数字。

**代码实现**：
``` python
# coding: utf-8

import os


def get_int(string):
    try:
        result = int(string)
    except (ValueError, TypeError):
        result = 0
    return result


def main():
    filename = 'number.txt'

    # os.path.exists 函数的作用是判断文件是否存在
    # 此处使用条件判断替代文件不存在的 IOError 异常处理
    if os.path.exists(filename):
        file = open(filename)
        try:
            numbers = [get_int(line) for line in file.readlines()]
        finally:
            file.close()
    else:
        print '%s does not exist' % filename
        numbers = []
    return numbers


if __name__ == '__main__':
    print main()
```
1. `os.path.exists` 使用条件判断来替代异常处理。
2. `finally` 分支无论是否发生异常都会关闭打开的文件。
3. `try` 代码块中没有使用 `except` 是因为我没有明确知道会发生什么异常。

关于释放资源的场景，有个 `Pythonic` 的做法是使用 `with` 关键字，上述代码可以转换为：
``` python
# coding: utf-8

import os


def get_int(string):
    try:
        result = int(string)
    except (ValueError, TypeError):
        result = 0
    return result


def main():
    filename = 'number.txt'

    # os.path.exists 函数的作用是判断文件是否存在
    # 此处使用条件判断替代文件不存在的 IOError 异常处理
    if os.path.exists(filename):
        with open(filename) as file:
            numbers = [get_int(line) for line in file.readlines()]
    else:
        print '%s does not exist' % filename
        numbers = []
    return numbers


if __name__ == '__main__':
    print main()
```
`with` 代码块结束后会自动调用 `file.close()` 方法关闭文件，关于 `with` 关键字的使用，感兴趣的读者可以自行查阅相关资料，在一些需要释放资源的场景都可以尝试使用 `with` 模式来解决。

### 作业
Python 中的 `datetime` 模块可以处理时间相关的问题，实现一个时间转换函数，可以将字符串 `2017-01-01`、`2017-01-01 08:08`、`2017/01/01` 转换为 `datetime` 对象。

提示：搜索 `datetime` 将字符串转换成时间的方法。

### raise 关键字
在我们的程序中可以使用 `raise` 关键字触发异常让程序提早结束，让调用者去解决异常。

例如：`int` 函数中接收到不合法的参数就会 `raise` 出相应的异常。

使用：

![raise](http://cdn.defcoding.com/917934D6-C228-4C9A-B9E1-F441545BE422.png)



### 总结
编程过程中我们要具有异常处理的意识，写的代码的同时考虑代码中可能会出现哪些异常，只有全局的去思考才能让我们写的代码更健壮。
