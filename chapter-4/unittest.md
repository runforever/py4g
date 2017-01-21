# 单元测试

> 老板为我的代码付报酬，而不是测试，所以，我对此的价值观是：测试越少越好，少到你对你的代码质量达到了某种自信 -- Kent Beck

### 测试的目的
测试的目的是为了验证程序的结果是否正确，每个程序员写完代码后都应该知道自己写的代码会输出什么样的结果，验证程序结果正确后才能交付给别人使用，合格的程序员不仅仅要知道怎么写代码，还要知道如何测试自己写的代码。

### 如何测试
基本的测试流程：

1. 修改程序的输入。
2. 手动运行程序。
3. 观察程序输出，验证结果正确性。

然而注重实效的程序员肯定不会做这些重复的事情，用测试代码来做这些重复的事情最好不过，而这些测试代码就是单元测试。

### 单元测试
Python 的单元测试方法有两种：

1. 使用 [doctest](https://docs.python.org/2/library/doctest.html)
2. 使用 [unittest](https://docs.python.org/2/library/unittest.html)

#### 使用 doctest
Python 函数可以使用 3 对引号来写注释 `""""""`，而 `doctest` 就是用注释当做测试代码。

**问题**：使用 `doctest` 来测试斐波那契函数。

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

如何测试：

1. 确定边界条件，`f(0)` 的结果是 `0` 和 `f(1)` 的结果是 `1`。
2. 当 `n >= 2` 时找几个确定的斐波那契数测试，例如 `fib(10)` 的结果为 `55`。

测试用例（test case）：

1. 输入 `0`，输出 `0`。
2. 输入 `1`，输出 `1`。
3. 输入 `10`，输出 `55`。

**代码实现**：将代码保存到 `fib.py` 文件中。
``` python
# coding: utf-8


def fib(n):
    """
    生成斐波那契数
    >>> fib(0)
    0
    >>> fib(1)
    1
    >>> fib(10)
    55
    """
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib(n-1) + fib(n-2)
```

注释中
``` python
>>> fib(0)
0
>>> fib(1)
1
>>> fib(10)
55
```
为测试 `fib` 函数的代码，分别对应上面相应的测试用例。

`doctest` 的写法其实和在 Python Shell 中调用函数是一致的，例如下图：

![py shell](http://cdn.defcoding.com/0C00245A-1C17-4FDF-9540-A0C85C239C80.png)

**运行测试**：

`python -m doctest -v fib.py`

**结果**：

![test fib](http://cdn.defcoding.com/BBDBA7A5-CBAD-414F-A45D-42B1D97C3722.png)

运行结果，程序运行了 3 个 test case，切都通过了。

`doctest` 好处就是当别人看到我们写的函数的时候就知道如何调用了，既是测试又是文档，很 cool 的写单元测试的方法。

**作业**：添加一个错误的测试用例，运行 `doctest` 查看结果。

**作业**：使用 `doctest` 来测试快速排序的函数。

#### 使用 unittest
`doctest` 适用于小型项目的单元测试，如果是模块多，依赖多的大型项目使用 `unittest` 更为合适些。

**问题**：使用 `unittest` 测试快速排序代码。

测试用例分析：

1. 边界条件，如果无序列表的元素个数小于等于 `1`，直接返回列表。
2. 给定随机列表，返回有序列表。

使用 `tree` 命令查看项目结构：
``` bash
qsort
├── __init__.py
├── qsort.py
└── tests.py

0 directories, 3 files
```

快速排序代码 `qsort.py`：
``` python
def qsort(lst):
    return lst if len(lst) <= 1 else qsort([i for i in lst[1:] if i <= lst[0]]) + [lst[0]] + qsort([i for i in lst[1:] if i > lst[0]])
```

测试代码 `test.py`：
``` python
import unittest

from qsort import qsort


class TestQuickSort(unittest.TestCase):

    def test_empty_list(self):
        self.assertEqual([], qsort([]))

    def test_one_element_list(self):
        self.assertEqual([3], qsort([3]))

    def test_normal_list(self):
        test_case = [
            [6, 5, 4, 3, 2, 1],
            [1, 6, 3, 2, 5, 4],
            [5, 3, 1, 2, 4, 6],
        ]
        sort_list = [1, 2, 3, 4, 5, 6]
        for case in test_case:
            self.assertEqual(sort_list, qsort(case))
```
1. 测试类 `TestQuickSort` 继承 `unittest.TestCase`。
2. 使用 `assertEqual` 方法来判断函数的结果是否是测试想要的结果。

使用 `python -m unittest -v tests` 运行测试，结果如下图：

![unittest](http://cdn.defcoding.com/7B20E24D-05A9-4867-B421-1BDDDDCD6AA7.png)

可以看到 3 个测试都通过了。

**作业**：给 `TestQuickSort` 添加一个错误的测试用例，看看会发生什么。

**作业**：使用 `unittest` 来测试斐波那契数函数。

### 测试思想
上面讲的两种测试方法只是告诉大家最基本的使用，关于单元测试的高级使用读者可以自己查找相关资料来学习。

单元测试只能是证明程序的运行结果是对的，并不是写了单元测试后代码的质量就更高，代码质量的提高靠的是不断的重构。

单元测试要用在有意义的地方，`1 + 1 = 2` 这样的代码显然是不用写单元测试的，有意义的测试指的是逻辑复杂、改动容易出错的代码。

### 总结
单元测试可以帮助我们判断代码改动是否影响到了现有的功能，因此，代码完成后加上相应的单元测试是很有必要的，大家写代码的同时也要有测试的意识，此外，大家也不要盲目的迷信单元测试的作用，TDD（测试驱动开发，先写测试，再写代码的流程）并不适用于所有项目。
