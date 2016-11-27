# 函数式编程

> 不能影响你编程观点的语言，不值得你去学。——Alan Perlis

我们已经学过命令式编程范式，面向对象的编程范式，而现在我们要学习一种全新的编程范式，函数式编程（Function Programing）。

每当我想到 FP（Function Programing）的我总会联想到《黑客帝国》中 Neo 的觉醒，觉得 FP 就是某种黑科技，实际上 FP 没有那么神奇，只不过是另外一种编程范式而已。

![neo](http://cdn.defcoding.com/08812C60-2130-4B3C-9395-D86DEE9FFDF3.png)

### FP 带来了什么
很难通过一句话来让读者体会到 FP 对思考方式的影响，我只能先告诉读者我个人的感受，学习和使用 FP 一段时间后，我解决问题的时候会先抽象的去描述问题，将问题转化成抽象的描述后很自然的就能把实现代码写出来，而之前我解决问题的过程是思考如何把编程语言相应的技术套到问题的解决方案上。

### FP 的特点
1. 函数是一等公民。
2. 递归。
3. 状态不可变。
4. 闭包（closure）。
5. 匿名函数。
6. 高阶函数。

**对我而言，FP 的特点只是它的外在表现形式，而他的内涵是 FP 的思维方式。**

### 函数是一等公民
学习 [装饰器](chapter-3/decorater.md) 的时候已经学过一等公民（first class）的概念，Python 中对象是一等公民，函数是对象，自然是也是一等公民。

### 递归
在 FP 中递归是很重要的技术，使用递归来描述问题的解决方案很多时候要比循环的方式更自然。

直接讲递归的概念会很抽象，我打算通过一个使用递归解决问题的过程来让大家了解递归。

#### 排序问题之快速排序
排序算法是编程学习中比较基础的算法了，给你一堆无序的数字，经过算法排序后，得到有序的序列。

例如：

给定无序列表 `[4, 1, 5, 7, 9, 11, 6]`

算法的结果是 `[1, 4, 5, 6, 7, 9, 11]`

#### 快速排序算法的步骤：

1. 选择列表中第一个元素为基准元素。
2. 剩下列表中选出比基准元素小的放在基准元素的左边，大的放在右边。
3. 基准元素左右两边的无序列表重复 1，2 步骤，直到排序完成。

下图为排序过程：
![quick sort process](http://cdn.defcoding.com/679D8DF42A0A385B4ED39AE27F385AD1.png)

#### 步骤解读：

1. `4` 为基准元素，左边列表 `[3, 1, 2]`，右边列表 `[8, 6, 7, 9]`。
2. `3` 为基准元素，左边列表 `[1, 2]`，右边列表为 `[]`。
3. `1` 为基准元素，左边列表 `[]`，右边列表为 `[2]`。
4. `2` 为基准元素，只有一个元素，直接返回 2。
5. 重复以上类似步骤直到第 9 步排序完成。

#### 解决方案
我们可以把上面的过程用下面的伪代码描述。
```
# 快速排序过程
qsort(unorder_list):
    # 判断列表长度，如果长度小于 1 直接返回列表本身
    if len(unorder_list) <= 1:
        return unorder_list

    # 获取基准元素
    elem = unorder_list[0]

    # 用列表解析找出所有小于等于基准元素的值存到左边列表中
    left_list = [i for i in unorder_list[1:] if i <= elem]

    # 用列表解析找出所有大于基准元素的值存到右边列表中
    right_list = [i for i in unorder_list[1:] if i > elem]

    # 左边列表继续排序
    sort_left_list = qsort(left_list)

    # 右边列表继续排序
    sort_right_list = qsort(right_list)

    # 返回排好序的结果
    return sort_left_list + [elem] + sort_right_list
```
快速排序算法用到了算法中的 [分治思想](https://zh.wikipedia.org/wiki/分治法)，简单的说就是把大问题分成性质一样小问题，
分别对每个小问题求解，再把小问题的解合并得到大问题的解。

上述伪代码中 `qsort` 函数定义里面调用了 `qsort` 函数来解决排序子问题，这种函数内部调用自己的技术叫做递归（Recursion），快速排序也正是通过这种方式来应用分治的思想。

另外，我们甚至可以把快速排序归纳成类似数学公式的更简单抽象描述：
``` python
qsort(l) = l, if len(l) <= 1
qsort(l) = qsort(left_l) + l[0] + qsort(right_l)
```

**代码实现**
``` python
def qsort(unorder_list):
    return qsort([i for i in unorder_list[1:] if i <= unorder_list[0]]) + [unorder_list[0]] + qsort([i for i in unorder_list[1:] if i > unorder_list[0]]) if len(unorder_list) > 1 else unorder_list

print qsort([4, 1, 5, 7, 9, 11, 6])
# [1, 4, 5, 6, 7, 9, 11]
```
这两行代码已经达到描述问题的目的了，能写的如此简单是因为我们一开始把问题转化成了简单的抽象描述。

#### 再看递归
通过快速排序算法我们可以知道递归适用的场景，使用递归基本可以分成两个步骤：

1. 分析问题，确定问题是否可以分解为性质相同的小问题。
2. 确定递归的出口。

递归出口指的是跳出递归的条件，如果没有递归出口，递归程序就会一直运行直到占满内存的栈空间，快速排序算法的递归出口是 `list` 的长度小于等于 1。

> 递归计时可以帮助我们把问题转化为简单的抽象描述

### 状态不可变
函数式编程提倡编写纯函数（Pure Function），纯函数的特点是相同的输入永远返回相同的结果，这种函数不受外界影响也不会改变外界的状态，不存在副作用（side effect）。

#### 什么是副作用
``` python
foo = 'foo'

def equal_foo(string):
    return True if string == foo else False

# 调用
equal_foo('foo')
# True

# 副作用体现
foo = 'bar'
equal_foo('foo')
# False

# 无副作用版本
def good_equal_foo(string):
    foo = 'foo'
    return True if string == foo else False

# 相同的输入无论调用多少次，结果都一样
good_equal_foo('foo')
# True
```
`equal_foo` 函数给我们展示了副作用带来的危害，实际编程中，没有副作用的代码要比有副作用的代码好维护。

> 在设计函数的同时要考虑消除函数副作用

### 闭包
闭包的概念看起来很晦涩，我还是先举例让大家了解他的作用。

#### 再看装饰器
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
装饰器其实就是一个闭包，闭包的形式：

1. 函数内嵌套函数。
2. 嵌套的函数可以访问到外层函数的变量。
3. 返回的结果是一个函数。

`log_time` 是一个嵌套函数的函数，嵌套函数 `wrapper_func` 可以访问到外层函数 `log_time` 的变量 `func`，返回结果是 `wrapper_func`。

装饰器是闭包的使用场景之一，通过装饰器扩展函数功能，而不需要对代码做过多的改动，这种使用场景可以称为函数工厂，通过函数生成函数。

#### 函数工厂
**问题**：定义 `add1`，`add2`，`add3`...`add7` 函数，作用分别是使输入加 1，2，...，7。
``` python
# 常规方案，挨个定义
def add1(foo):
    return foo + 1


def add2(foo):
    return foo + 2

# ... 重复定义下去直到 add7

def add7(foo):
    return foo + 1


# 闭包方案，把重复定义的过程写成一个通用函数
def add_factory(add_base):
    def add_func(foo):
        return foo + add_base
    return add_func

add1 = add_factory(1)
add2 = add_factory(2)
# ...
add7 = add_factory(7)
```
我在写闭包的时候一直思考一个问题，这个东西意义是什么，现在我明白了，依然为了减少重复的代码（DRY 原则）。

闭包在其他语言中还有其他的使用场景，我这里限于篇幅不能一一列举，读者要明白闭包的作用，它的出现不是为了让代码晦涩难懂，而是为了让代码更简单更好维护。

### 匿名函数
顾名思义，没有名字的函数。Python 使用 `lambda` 关键字来定义匿名函数。
**例子**
``` python
# 常规方式
def add1(foo):
    return foo + 1


# 匿名函数方式
add1 = lambda foo: foo + 1
```
上面我们可以看到 `lambda` 函数的形式，无非也是参数和返回结果，但是可以看出来的是 Python 的匿名函数适合处理简单的逻辑，复杂的函数还是使用常规方法定义要更合理一些。

匿名函数有什么用，等我们把高阶函数学了之后就知道了。

### 高阶函数
高阶函数的定义是将函数作为参数的函数，装饰器就是一个高阶函数。

#### map，reduce，filter 函数

#### map 函数
`map` 函数的定义
![map 函数定义](http://cdn.defcoding.com/1EA456A9-536F-4445-B48C-41BD689430A6.png)
从官方 API 文档的定义，`map` 函数的第一个参数是 `function`，第二个参数是一个或者多个可以迭代的对象，如 `list` 或者 `tuple` 这类可迭代的数据结构，
返回结果是一个列表，列表中每个元素的是 `function` 处理后的结果。

前面我们学习列表解析的时候用列表解析解决过下面的数学问题，现在我们用 `map` 来解决。
$$
S=\{x^2 \mid x \in \mathbb{N}\}
$$
``` python
N = [1, 2, 3, 4, 5]

# 命令式方案
S = []
for x in N:
    result = x ** 2
    S.append(result)

# 列表解析方案
S = [x**2 for x in N]
# [1, 4, 9, 16, 25]

# map 函数方案
S = map(lambda x: x**2, N)
# [1, 4, 9, 16, 25]
```
`map` 函数和列表解析都可以简单直接的使用一行代码把问题解决，这种编程方式专注于描述问题是什么，而命令式编程方式则是强调于该怎么做。

数学公式公式是对问题的抽象概括，把问题用简单公式描述，使用函数式编程的思维解决问题时，同样是把问题抽象成纳成类似数学公式一样的解决方案，
然后用编程语言将解决方案描述出来，函数式的魅力也在于这个过程。

#### reduce 函数
我们在高中数学的时候学过阶乘，数学公式如下：
$$
n!=1\times2\times3\times\cdots \times n
$$
$$
0!=1
$$

`reduce` 函数就是为了描述这种类似阶乘的问题，`reduce` 函数的定义：
![reduce 函数定义](http://cdn.defcoding.com/9DEB32C7-27C1-4785-96B8-5E9B980789D9.png)
第一个参数为处理函数，第二个参数为可迭代对象，第三个为可选参数，如果不传，结果初始值为可迭代对象的第一个元素的值。

**代码**
``` python
n = 5

# 不传初始值
result = reduce(lambda x, y: x * y, xrange(1, n+1))
# result is 120

# 传入初始值
result = reduce(lambda x, y: x * y, xrange(1, n+1), 3)
# result is 360
```

#### filter 函数
`filter` 函数的作用类似于我们学过的带 `if` 的列表解析，`filter` 函数定义如下：
![filter 函数定义](http://cdn.defcoding.com/163E691C-BCF5-4B58-8A4B-15A0A19C20B7.png)

我们依然来解决返回一个列表中所有偶数元素的问题。

偶数的数学公式：
$$
S={\displaystyle \{2k\colon k\in \mathbb {N} \}}
$$
**代码**
``` python
N = [1, 2, 3, 4, 5, 6, 7, 8]

# 命令式方案
S = []
for k in S:
    if k % 2 == 0:
        S.append(k)

# 列表解析
S = [k for k in N if k % 2 == 0]

# filter 函数式方案
S = filter(lambda x: x % 2 == 0, N)
# S is [2, 4, 6, 8]
```
通过 `map`，`reduce`，`filter` 函数我们已经学到了高阶函数的用处和函数式编程的思考方式，最后老生常谈的是**软件工程不存在银弹**，我们应该了解每种编程范式的特点，然后在合适的场景用合适的技术去解决问题。

### 总结
函数式编程强调的是 `what` 是什么，而不是 `how` 怎么做，函数式编程很难用文字描述出他的定义，但是我们可以通过他的特点去领会他的内涵。

这里我只是讲了我个人对于函数式编程的理解，我推荐读者去学习更多关于函数式编程的东西，可以先从 [Scheme](https://zh.wikipedia.org/wiki/Scheme) 开始。
