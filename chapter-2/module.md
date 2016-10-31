# 模块、包、设计

> 优秀的艺术家复制，伟大的艺术家剽窃 -- 毕加索

![project structure](http://odli54y3q.bkt.clouddn.com/C4D3C119-FAB1-4F2A-9D81-7C5EBFA6034D.png)

在实际项目中往往包含很多功能模块，如果我们把所有的功能都写到一个文件中显然不是一个很好的方案，你可以想想你要到一个 1000 行代码的文件去修改某个功能是什么样的场景，更不要提跟别人协作在一个文件写代码的问题了，所以如果我们的项目功能很多，我们要学会合理的组织我们的项目结构。

### 模块 module
前面我们学习了函数和脚本文件，而一个脚本文件其实就是一个模块，模块里面可以包含很多个函数，我们通常按功能来划分模块，模块里面放的都是与这个功能相关的函数，使用导入机制来调用模块中的功能。

**Caculator 项目**

我们将之前写过的后缀表达式的功能组织成一个项目，项目名叫 Calculator，里面包含两个模块，一个 main 模块，负责接收输入的后缀表达式并且输出结果，一个是 caculation 模块，负责后缀表达式的计算。

项目结构
``` bash
Caculator
├── caculation.py
└── main.py

0 directories, 2 files
```

caculation.py 模块实现
``` python
# coding: utf-8

'''
后缀表达式计算模块
'''

def caculation(expression):
    '''
    计算后缀表达式功能函数
    '''
    ret_stack = []
    expression = expression.strip().replace(' ', '')

    for element in expression:
        # 如果不是符号，将数字放入栈中
        if element not in '+-*/':
            ret_stack.append(element)

        # 如果是符号，弹出栈中的两个元素，得出计算结果后再放入栈中
        else:
            second_num = ret_stack.pop()
            first_num = ret_stack.pop()
            expression = '{first_num}{operator}{second_num}'.format(
                first_num=first_num,
                operator=element,
                second_num=second_num
            )
            ret = eval(expression)
            ret_stack.append(ret)

    return ret_stack[0]
```

main.py 模块实现
``` python
# coding: utf-8

from caculation import caculation


def main():
    while 1:
        print 'enter N/n to exit'
        expression = raw_input('please input the expression\n')

        if expression.lower() == 'n':
            print 'bye'
            break

        result = caculation(expression)
        print '\nthe result is %s\n' % result


if __name__ == '__main__':
    main()
```

我们将之前的后缀表达式计算方法写成了一个模块，方便调用。

在 main 模块中通过 `from ... import ...` 语法来引入模块，`from caculation import caculation` 的意思是从 caculation.py 模块里面导入 caculation 函数。

模块的注释跟函数的注释格式一样使用三对单引号 `''''''` 或者三对双引号 `""""""` 写在模块的一开始。

运行 `python main.py` 看看效果。
![result](http://odli54y3q.bkt.clouddn.com/C8FA1EDE-BABA-429D-AC12-53982DA5861A.png)

现在我们知道了如何去组织一个项目，去定义功能模块，另外，重要的事说 3 遍，只要与命名相关的东西都值得我们停下来思考一个名字，在设计项目结构的时候我们需要考虑一些扩展性，比如新模块如何放置，我们的项目比较简单，可以考虑将项目平铺放置。

这个项目的代码在这里 [Caculator](https://github.com/runforever/py4g/tree/master/tutorial_src/Caculator)

**作业**: 改造这个项目，添加中缀表达式模块，main 模块中接收中缀表达式，调用转化模块转化成后缀表达式，将后缀表达式交给计算模块计算得出结果。

#### 导入模块的其他方法
除了使用 `from ... import ...` 的格式，我们还可以使用如下格式导入模块。
``` python
# 导入 caculation.py 模块
import caculation

# 调用 caculation.py 模块中的 caculation 函数
caculation.caculation(expr)
```

如果我们导入的模块或者函数与别人开发的同名了怎么办，这个时候可以使用 `as` 关键字来去别名
``` python
# A 模块和 B 模块都有 caculation 函数
from A import caculation as a_cacu
from B import caculation as b_cacu

a_cacu()
b_cacu()

# 当然也可以使用这样的方案
import A
import B

A.cacu()
B.cacu()
```

### 包 package
模块里面包含了函数，而 package 是用来包含多个模块的，这里我想通过一个 Web 项目介绍 package 的相关知识，我们就设计一个 mini 的淘宝系统的项目结构。

我们定义的淘宝功能比较简单，会员功能，商品展示相关功能，订单和购物车相关功能。

项目结构
![MiniTaobao](http://odli54y3q.bkt.clouddn.com/900C58CD-F135-48F0-9123-295D42835EC5.png)

项目是使用 [Django](https://www.djangoproject.com) 这个 Web 框架生成的，Python 对于 package 的识别是通过目录中是否有 `__init__.py` 这个文件来识别的，上面的项目我们将功能定义在 app 这个 package 中，里面包含了 account, product, order 三个 package，这三个 pacakge 下面有几个模块，以后扩展新功能可以直接在 app 这个 package 下新增相应的包。

我们暂时不管功能实现，只管项目目录结构的设计。一个项目的结构决定了我们怎么去组织代码，软件工程的目的在于控制项目的复杂度，当然你不设计项目结构也可以将功能做出来，但是这样会增加后期的维护成本，编程不仅仅是让我们去实现某个功能，我们应该通过思考设计合理的项目目录结构，划分合理的功能模块，编写意图简单功能明确的函数，从而让我们的项目适应软件工程过程中的各种变化。

这个项目的代码地址 [MiniTaobao](https://github.com/runforever/py4g/tree/master/tutorial_src/MiniTaobao)

> 软件工程的目的在于控制项目的复杂度

#### 如何引入 package 中的模块呢?
这个跟我们直接引入模块是一样的，只不过前面多了一层 package 的名称。

Package 项目中有 Foo 这个包，Foo 中有 A, B 模块，A, B 模块中有 a1, b1 函数，我们来演示如何引入。

目录结构
``` bash
Package
├── Foo
│   ├── A.py
│   ├── B.py
│   └── __init__.py
└── main.py

1 directory, 4 files
```

mian.py 模块代码
``` python
# coding: utf-8

from Foo.A import a1
from Foo.B import b1

def main():
    a1()
    b1()


if __name__ == '__main__':
    main()
```

`__init__.py` 文件有一些神奇的功能，感兴趣的读者可以去 google 查找相关资料，这里只是告诉大家包的功能，一些黑科技大家自己去发现吧。

我们的引入方法都是绝对路径引入，Python 还有相对路径引入，所以就给大家布置一个作业了

**作业**：学会使用 Python 的相对路径引入。


### 总结
编程不是单单的实现功能，学会全局的思考然后做设计才是重要的，而这个过程最能考验一个程序员的功力，一开始我们可以培养自己自上而下的设计方式或者自下而上的设计方式，比较直观的理解就是下面这张图：
![Design](http://asset.whatslife.cn/img_0040.jpg)

> 学会全局去思考问题，而不是只关注单个功能点
