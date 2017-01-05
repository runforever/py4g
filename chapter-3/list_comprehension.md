# 切片与列表解析

> 优美胜于丑陋，显明胜于隐含 -- import this

这一节主要是说说**列表切片**和**列表解析**，用好这两个特性会让你的代码变得更加的简单易读。

### range 和 xrange 函数

#### range
`range` 的官方 API 文档如下图：

![range](http://cdn.defcoding.com/7FCD904F-5CCE-4C26-BE78-F7891E4CFFD7.png)

我们要学会通过官方的 API 文档来看函数的定义和用法，在编程过程中经常会遇到没有见过的函数，通过官方 API 可以最快了解到函数的用法，博客和其他渠道的文档有可能滞后，官方文档是最准确的。

通过文档我们可以知道 `range` 函数的定义:
``` python
range(stop) # e.g. range(5) = [0, 1, 2, 3, 4]
range(start, stop[, step]) # step 为步长是可选参数，e.g. range(1, 6, 2) = [1, 3, 5]
```

#### xrange
`xrange` 的定义和使用和 `range` 一样，区别是 `xrange` 的返回结果是一个生成器，`range` 的返回结果是一个 `list`，生成器要比 `list` 省内存，一般情况下，我们都是使用 `xrange`，如果你确实需要一个 `list`，那就使用 `range`。

关于生成器后续会详细讲解，这里读者要知道他的作用是省内存。

这里说 `range` 和 `xrange` 的定义和使用，一方面是为了告诉读者查看 API 的作用，另一方面是为了更好的理解列表切片，因为他们都属于 `start, stop[, step]` 这种模式。

### 列表切片（Slice）

#### 基础
对于 `list`，我们除了可以有根据下标获取元素的需求外（如：`l[3]` 为获取 `l` 的第 4 个元素），还可能有一下的需求场景：

1. 获取某个下标之后的所有元素。
2. 获取某个下标之前的所有元素。
3. 获取开始下标到结束下标中间的所有元素。
4. 获取开始下标到结束下标中间指定步长的所有元素。

以上的需求场景就要用到列表切片来解决了，切片的语法为 `[::]`
``` python
# 定义一个 list
foo = [1, 2, 3, 4, 5, 6, 7, 8]

# 获取第 3 个元素后的所有元素，包含第 3 个元素，foo[3] = 4
foo[3:]
# [4, 5, 6, 7, 8]

# 获取第 5 个元素之前的所有元素，包含第 5 个元素，foo[4] = 5
foo[:5]
[1, 2, 3, 4, 5]

# 获取第 3 到第 5 个元素之间的所有元素
foo[3:5]
[4, 5]

# 获取第 2 到第 7 个指定步长为 2 的所有元素
foo[2:7:2]
[3, 5, 7]
```
切片操作返回一个新的 `list`，不会改变原来 `list` 的内容。

上述的例子我们已经可以看出切片操作的 `start, stop[, step]` 模式表现形式为 `[start:stop:step]`。

#### list 的反向下标
![reverse](http://cdn.defcoding.com/935D591E-8E27-4CB3-9C45-7C5849FD5BD3.png)

反向下标从 `-1` 开始，我们可以用 `l[-1]` 访问到列表的最后一个元素，反向下标同样可以做列表切片。

#### 列表切片小技巧

复制一个 `list`
```
foo = [1, 2, 3]
bar = foo[::]
print bar
# bar 的结果为 [1, 2, 3]
```

反转列表顺序
```
foo = [1, 2, 3]
bar = foo[::-1]
print bar
# bar 的结果为 [3, 2, 1]
```

### 列表解析（list comprehension）

#### 基础
列表解析是 Python 中很 cool 的一个特性，很多时候用它可以把多行代码变成一行代码，并且可读性更好。

**问题**：给定一个 `list`，要求返回一个新的 `list`，新 `list` 里的元素是原来的 2 次方。

例如：`[1, 2, 3, 4, 5]`

结果：`[1, 4, 9, 16, 25]`

**老办法，`for` 循环**
``` python
def square_list(old_list):
    new_list = []
    for elem in old_list:
        new_elem = elem ** 2
        new_list.append(new_elem)
    return new_list

old_list = [1, 2, 3, 4, 5]
print square_list(old_list)
```

**列表解析方案**
``` python
def square_list(old_list):
    new_elem = [elem ** 2 for elem in old_list]
    return new_elem

old_list = [1, 2, 3, 4, 5]
print square_list(old_list)
```
列表解析把 `for` 循环变成了一行代码 `[elem ** 2 for elem in old_list]`。

从语法上我们可以看到列表解析可以分为两个步骤：

![list comprehension](http://cdn.defcoding.com/88FFAF75-3C43-42C9-B4E9-2B38A81B8DA1.png)

从抽象层面来看，我们可以把列表解析看成是一个数学公式：
$$
S=\{x^2 \mid x \in \mathbb{N}\}
$$
**列表解析的起源也是抽象的数学公式，大家对比一下数学公式和列表解析的语法便可以看出来**

#### 带 if 判断的列表解析
**问题**：给定一个 `list`，获取 `list` 里所有的偶数元素。

例如：`[1, 2, 3, 4, 5, 6, 7, 8, 9]`

结果：`[2, 4, 6, 8]`

`for` 方案
``` python
foo = [1, 2, 3, 4, 5, 6, 7, 8, 9]
bar = []

for elem in foo:
    if elem % 2 == 0:
        bar.append(elem)
print bar
```

列表解析方案
``` python
foo = [1, 2, 3, 4, 5, 6, 7, 8, 9]
bar = [elem for elem in foo if elem % 2 == 0]
print bar
```

语法解析

![if list comprehension](http://cdn.defcoding.com/A7169D0E-775E-40A9-84C6-F070E599C5D8.png)

#### 双层 for 循环的列表解析
**问题**：给定两个 `list`，获取他们元素的所有组合。

例如：`[1, 3, 5]` 和 `[2, 4, 6]`

结果：`[(1, 2), (1, 4), (1, 6), (3, 2), (3, 4), (3, 6), (5, 2), (5, 4), (5, 6)]`

`for` 方案
``` python
foo = [1, 3, 5]
bar = [2, 4, 6]
new_list = []

for x in foo:
    for y in bar:
        new_list.append((x, y))
print new_list
```

列表解析方案
``` python
foo = [1, 3, 5]
bar = [2, 4, 6]
new_list = [(x, y) for x in foo for y in bar]
print new_list
```

**作业**：画出列表解析的语法步骤

#### 嵌套的列表解析
**问题**：打印 9 x 9 的乘法表。

`for` 方案
``` python
multiply_list = []

for i in xrange(1, 10):
    temp_list = []
    for j in xrange(1, i+1):
        multiply_string = '{0}x{1}={2}'.format(j, i, i*j)
        temp_list.append(multiply_string)
    temp_string = ','.join(temp_list)
    multiply_list.append(temp_string)

print '\n'.join(multiply_list)
```

列表解析方案
``` python
multiply_list = [','.join(['{0}x{1}={2}'.format(j, i, i*j) for j in xrange(1, i+1)]) for i in xrange(1, 10)]
print '\n'.join(multiply_list)
```

语法解析

**作业**：画出列表解析的语法步骤

### 总结
`Pythonic` 指的是用 Python 的方式去解决问题，就像是使用 `for` 和列表解析两种方案，后者显然是更符合 Python 的惯用法的，前者能解决问题但是会让代码看起来很冗长，通过代码是可以看出一个程序员的品味，而什么样的代码是好代码，这个问题留个读者去思考了。

`Pythonic` 属于 Python，每种编程语言和工具都有自己的思想和惯用法，我们学习新语言和新工具的时候要学会用新语言和新工具的方式去解决问题，一味的用我们的经验解决问题有时候会让解决方案变得蹩脚。
