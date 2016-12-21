# 生成器、迭代器

> 过早优化是罪恶之源 --Donald Knuth

前面一节讲 `range` 和 `xrange` 函数的时候我们提到了生成器，也提到了他的作用是省内存，我们可以在 Python Shell 里试试，如果一个 `list` 包含很多元素会发生什么？

**range(100000000000000)**

![memory error](http://cdn.defcoding.com/2BBD2362-800F-47C1-B630-69E9615CED4C.png)

可以看到 Python 给我们抛出了 `MemoryError` 异常，由于 `list` 结果太大，超过了电脑可以分配的内存，导致无法分配出来。

> 程序中的变量是存在电脑的内存中，电脑的内存可以很大（32G、64G、128G......），但是有限，滥用的话始终会有不够用的情况。

我们来看看使用 `xrange` 会发生什么。

**xrange(100000000000000)**
![xrange](http://cdn.defcoding.com/F6E85E8B-568A-4278-A391-FB218EEBB93A.png)

Python 没有给我们抛出 `MemoryError` 异常，在内存中也并没有生成 `100000000000000` 个数的 `list`，生成器记录了我们需要的东西，当我们遍历取里面的元素的时候它才会计算出具体的值返回给我们。

生成器这种延后计算的方式叫做 **惰性计算**。

### 生成器（generator）
通过上面的例子我们对生成器应该有个大致的理解，知道它适合用在什么地方，下面我们来看看如何创建生成器。

#### 使用 `()` 创建生成器
创建列表解析使用 `[]`，创建生成器使用 `()`。

**问题**：使用列表解析和生成器两种方式对 `xrange(10)` 中的每个元素求平方。

**代码实现**
``` python
# 列表解析
foo = [i**2 for i in xrange(10)]

# 遍历
for i in foo:
    print i

# 生成器
bar = (i**2 for i in xrange(10))
print bar
# <generator object <genexpr> at 0x7fc923c99820> 是一个生成器对象

# 遍历
for i in bar:
    print i
```

**问题**：使用 `sum` 函数计算上面列表解析和生成器的结果。

**代码实现**
``` python
# 列表解析
foo = sum([i**2 for i in xrange(10)])
print foo

# 生成器
bar = sum(i**2 for i in xrange(10))
print bar
```
上面两个问题可以看出使用 `()` 创建的生成器和列表解析的使用是一样的，有些时候生成器甚至更简洁，例如：`sum(i**2 for i in xrange(10))`，连括号都省了。

#### 使用 yield 创建生成器
有些时候我们的生成器并不能像列表解析那样使用一行代码可以描述出来，这时候我们需要将复杂的业务封装成函数，而 `yield` 关键字可以让我们的函数变成生成器。

**经典问题**：生成斐波那契数列。

斐波那契数列的数学公式：
$$
F_{0}=0
$$
$$
F_{1}=1
$$
$$
F_{n}=F_{n-1}+F_{n-2} \space\space (n\ge2)
$$

**函数式编程实现**
``` python
def fib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib(n-1) + fib(n-2)

fib_list = [fib(i) for i in xrange(10)]
for i in fib_list:
    print i
```
函数式编程很适合描述这类数学问题，代码基本上就是上面数学公式的描述，但是由于返回结果是 `list`，返回数列的大小有限制，数量过大的话会导致内存不够。

函数式编程后面章节会讲到，我们暂时不求甚解，读者只需要知道它是一种编程范式。

**生成器实现**
``` python
def fib(n):
    index = 0
    f0, f1 = 0, 1
    while index < n:
        yield f0
        f0, f1 = f1, f0 + f1
        index += 1

fib_list = fib(10)
for i in fib_list:
    print i
```
`yield` 实现的生成器代码看起来会很奇怪，有点难以理解，我们不管生成器的形式，从结果去理解，把函数内的逻辑当成生成器里元素的推导，其实就和列表解析是一回事，根据指定的规则生成元素。

例如，上面生成器的结果是 `(0, 1, 1, 2, 3, 5, 8, 13, 21, 34)`，里面每个元素的生成的规则是根据函数的逻辑计算得出，`yield` 负责将计算的结果放到生成器中，这样在脑海里抽象的建立一种模型会比逐行看代码好理解的多。

#### `next()` 函数
除了使用 `for...in` 遍历生成器，我们还可以使用 `next()` 函数来获取生成器的值。

例如
``` python
def fib(n):
    index = 0
    f0, f1 = 0, 1
    while index < n:
        yield f0
        f0, f1 = f1, f0 + f1
        index += 1

fib_list = fib(5)
# 生成器的结果是 (0, 1, 1, 2, 3)

print fib_list.next()
# 0
print fib_list.next()
# 1
print fib_list.next()
# 1
print fib_list.next()
# 2
print fib_list.next()
# 3
print fib_list.next()
# 抛出 StopIteration
```
`next()` 函数的作用是去取生成器生成的值，如果超过生成器的范围则会抛出 `StopIteration` 异常。

生成器的这种可以迭代，并且可以使用 `next` 函数访问元素的特点是迭代器的特点，生成器同时是一种迭代器。

### 迭代器（iterator）
迭代器的作用仍然是节省内存，要实现自定义的迭代器，必须实现 `__iter__` 和 `next` 方法。

**问题**：使用迭代器实现斐波那契数列。
``` python
class Fib(object):

    def __init__(self, n):
        self.f0, self.f1 = 0, 1
        self.index = 0
        self.n = n

    def __iter__(self):
        return self

    def next(self):
        self.index += 1
        if self.index > self.n:
            raise StopIteration

        value = self.f0
        self.f0, self.f1 = self.f1, self.f0 + self.f1
        return value


# 迭代器
fib_list = Fib(10)

# 遍历
for i in fib_list:
    print i
```
我们同样从结果去理解迭代器，`Fib(10)` 的结果是 `(0, 1, 1, 2, 3, 5, 8, 13, 21, 34)`，结果包含的每一个元素是 `next` 方法计算得出，重写 `__iter__` 和 `next` 方法是实现迭代器的协议，只是形式。

关于协议有一点想多说的，我曾经很难理解协议的作用，直到一次我使用 FTP 协议实现了一个 FTP 服务器后我才明白，只要实现协议中的约定就可以使用 FTP 客户端软件进行通信，就像类中实现了 `__iter__` 和 `next` 方法就是迭代器一样，协议并不是什么高深莫测的东西。

**注意**：迭代器只能遍历一次，由于生成器也是迭代器，所以生成器也有这个特性，读者可以自己在代码中尝试使用 `for` 循环遍历两次迭代器和生成器看看会发生什么。

### 总结
在开发过程中不提倡过早的去优化代码，因为我们很难知道最终影响性能的代码在哪，然而我们写代码的时候要具备一些优化的意识，当知道生成器和迭代器的作用是省内存，一些可以用到他们的场景我们就去使用他们，这个和之前我们学过 `list` 和 `tuple`一个道理，`tuple` 比 `list` 省内存，所以能用 `tuple` 替代 `list` 的场景我们就使用 `tuple`。
