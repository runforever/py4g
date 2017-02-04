# 列表、变量、流程控制

> 先解决问题，然后再写代码

### 稍微复杂的问题
**问题**: 打印"hello", "hi", "bye" "good"， 要求：每个字符串在前面加上字符串 "say"，并且需要换行，最后一个字符串不换行。

**结果**:
``` python
say hello
say hi
say bye
say good
```

`\n` 在字符串中表示换行

每个问题的解决方案都有很多种。

**解决方案一**
``` python
>>> print 'say hello\nsay hi\nsay bye\nsay good'
say hello
say hi
say bye
say good
```

用字符串来描述了我们的问题，看起来有点丑，但是可以工作，如果改一下问题的需求，用这样的方案解决问题会让人崩溃，例如多加几个要打印的字符串，在结尾加上句号然后换行。

> 写计算机能看懂的代码谁都会，写出人可以看懂的代码很难

**解决方案二**
``` python
# 定义一个数组
str_list = ["hello", "hi", "bye", "good"]

# 使用 for 循环来打印每个字符串
for each in str_list:
    print 'say %s' % each

# 结果
say hello
say hi
say bye
say good
```

解释 1：`["hello", "hi", "bye", "good"]` 是列表，表示问题中，字符串的集合，列表有新增元素，删除元素，改变元素等等功能。

解释 2：`str_list` 属于变量，用来表示列表 `["hello", "hi", "bye", "good"]` , 方便后续的编程中使用列表。

解释 3：`for ... in ...:` 属于编程中的循环控制流程，表示从列表中依次遍历每个列表中的元素，将元素的值用变量 `each` 表示，最后打印出符合要求的字符串。

解释 4：`'say %s' % each` 是前面学过字符串，这样的语法叫做字符串格式化，`%s` 表示用字符串的方式来打印变量 `each`

这样写代码的增加了代码的表现力，人更容易看懂，另外，如果需求出现变更，代码修改起来更为轻松。

**注意 1：Python 语言缩进层级很严格，for 循环后面的 print 语句前面空了 4 个空格表示 print 属于 for 层级**


**注意 2：`#` 号开头的描述是代码的注释，可以向看代码的人解释你的代码是干什么的**

### 深入的了解列表、变量、控制流程

#### Python 中的 list 数据类型
list 是有顺序的，可以对 list 进行更新

``` python
# 定义一个 list，里面包含 "hello", 1, 1.1
foo_list = ["hello", 1, 1.1]

# 添加一个元素 2 到上面的列表末尾
foo_list.append(2)
print foo_list
# 结果 ['hello', 1, 1.1, 2]

# 打印列表中第一个元素的值
print foo_list[0]
# 结果 hello

# 修改第一元素为hi
foo_list[0] = "hi"
print foo_list[0]
# 结果 hi

# 查看 list 的长度
print len(foo_list)
# 结果 4
```

值得注意的是 list 的第一个元素是从0开始的，不是从1开始的，所以上面的栗子中访问第一个元素用的下标0，如果要访问第二个元素使用下标1，其他元素以此类推。

`foo_list.append(2)` append 是 list 提供的一个方法，表示可以将元素添加到 list 的末尾，除了 append 方法，list 还提供了其他方法，例如在 list 中间添加元素，删除 list 的某个元素等等。

`len(foo_list)` len 是 Python 自带的查看 list 长度的方法，除此之外 len 还可以用来查看字符串的长度

---

**作业1: 查看字符串 "Hello" 的长度**

**作业2: 删除 list ['hello', 1, 1.1] 的第2个元素**

**作业提示**：使用搜索引擎查找方案，我们遇到的问题大多数都是别人已经解决过的，使用搜索引擎可以快速找到解决问题的方案，搜索引擎首选 Google，如果没有条件访问不了，使用 bing, 百度最好少用。

作业2中，我们搜索 `python 删除list指定元素` 搜索引擎就会给我们很多答案。

对于搜索中的结果，博客的文章质量一般会高些，这里面包含了博客作者的个人思考，当然，如果可以看英文，[stackoverflow](http://stackoverflow.com) 的答案质量更高。

---

#### 变量 variable
上面的题目已经可以看出来了，变量能够很好的帮助我们描述问题。

变量定义的规则: 变量名包括字母、数字、下划线，不能以数字开头。

变量取名应该与需要描述的问题相关，不要使用 a, b, c 这种没有意义的取名。

变量命名的两种方式:

1. 驼峰法
2. 下划线法

**问题**：用驼峰法和下划线法分别定义一个教室
``` python
>>> classRoom = 1 # 驼峰法命名方式
>>> class_room = 1 # 下划线法命名方式
```

Python 中对于命名有自己的一套规约，详情可以查阅 [中文链接](http://damnever.github.io/2015/04/24/PEP8-style-guide-for-python-code/#naming-conventions) [英文链接](https://www.python.org/dev/peps/pep-0008/#naming-conventions) 这套规约叫 PEP 8 读者应该经常查阅，尽量写符合规范的代码。

---

#### 流程控制
编程是一个注重逻辑的学科，任何编程语言的流程控制是下面的 3 大流程。

1. 顺序执行
2. 分支
3. 循环

##### 顺序执行
顾名思义，代码是按照顺序一行一行的执行下去，直到最后一行代码执行完毕。

**问题**: 用 list 定义一个家庭, 家庭成员里面包含 "dad", "mom", "you"，一天你带了一只小狗回家，于是家庭成员添加了 "Husky"，打印出家庭成员的第一位和和第三位。
``` python
family_list = ["dad", "mom", "you"]
family_list.append("Husky")
print family_list[0]
print family_list[2]
```

##### 分支
代码默认是按照顺序一行一行执行的，某些情况下我们需要判断是否继续让代码执行下去。

Python 中的分支结构有 3 种。
``` python
# 第一种
if case:
   # do something

# 第二种
if case:
   # do something
else:
   # do other thing

# 第三种
if case1:
   # do something
elif case2:
   # do something
elif case3:
   # do something
else:
   # do something
```
我思考了很久如何来解释分支结构，结合循环来说效果会好一些。

##### 循环
没有人想一直做重复的工作，计算机却很擅长做重复的事情，所以遇到重复乏味的事情交给计算机来做是个不做的主意。

Python 中的循环结构：
``` python
# 第一种
for ... in ...:
    # do something

# 第二种
while case:
    # do something
```

**问题**: 用 list 定义一个家庭，成员为 "dad", "mom", "you", "Husky"，list 中哈士奇说 "wooo"，其他家庭成员说 "hello"。

**结果**:
``` python
dad say hello
mom say hello
you say hello
Husky say wooo
```

代码实现:
``` python
family_list = ["dad", "mom", "you", "Husky"]

for member in family_list:
    if member == "Husky":
        print "Husky say wooo"
    else:
        print "%s say hello" % member
```

也许上面的问题你还看不到循环的好处，我们来一个极端的问题。

**问题**: 打印 100 次 "hello world"

**实现方案一**
``` python
count = 0
while count < 100:
    print "hello world"
    count += 1

# count += 1 与 count = count + 1 效果一样，写法要简单方便一些
```
这种循环方式属于经典的循环方式，count 表示计数器，每做完一次计数加 1 直到等于 100 结束循环。

**实现方案二**
``` python
for i in xrange(100):
    print "hello world"

# xrange 函数生成一个 [0, 1, 2, 3, ..., 99] 的 list, 用做计数器的作用
```
方案二要比方案一看起来优雅一些，代码也少两行，可读性也高一些，所以能用 for 循环去解决问题的都尽量使用 for 循环吧。

##### 死循环(endless loop)
看过《恐怖邮轮》这部电影的人都知道，主角由于欺骗死神被死神惩罚困在死循环的场景中永远无法逃脱出来，这是一件非常恐怖的事情，虽然计算机擅长做重复的事情，但是我们写的代码也不要出现死循环，否则程序就无法结束了，除非你确定你的代码就是需要死循环。

一直打印 "hello world" 的代码
``` python
while 1:
    print "hello world"
```
程序不会结束，除非你用进程管理器 kill 这个程序或者使用 Ctrl + c

##### 跳出整个循环 break
break 关键字可以让代码跳出整个循环

**问题**: 定义一个 list 为 [1, 2, 3, 8, 7, 'gold', 22, 45, 'ff'], 遍历其中的每个元素直到找到 gold 后打印 "find it" 然后跳出循环，否则直接打印找到的东西。

**代码实现**
``` python
gold_list = [1, 2, 3, 8, 7, 'gold', 22, 45, 'ff']
for i in gold_list:
    if i == 'gold':
        print 'find it'
        break
    print i
```
当代码执行到了 break 语句后就直接跳出循环，不会再继续打印后续的元素

##### 跳出当前循环 continue
continue 关键字可以让代码跳出当前循环

**问题**: 定义一个 list 为 [1, 2, 3, 8, 7, 'gold', 22, 45, 'ff'], 遍历其中的每个元素直到找到 gold 后打印 "It's mine" 然后跳出当前循环，否则直接打印找到的东西。

**代码实现**
``` python
gold_list = [1, 2, 3, 8, 7, 'gold', 22, 45, 'ff']
for i in gold_list:
    if i == 'gold':
        print 'find it'
        continue
    print i
```
---

#### 总结
目前为止我们学了基本的数据类型、变量和编程的流程控制，这些东西是编程最基础的概念，其他编程语言也类似。
