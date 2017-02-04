# 配置开发环境

> 你手上拿着一把锤子，你就会把什么东西都看成钉子

### 开发工具
程序员个人的开发效率跟很多因素挂钩：编程语言的熟悉程度，解决问题的方法和思路，开发工具的使用等等，个人技术方面没有任何捷径，只能通过 1 万个小时的练习才能成为专家，然而对于新手来说用好开发工具可能会起到立竿见影的效果。

> 10 年成就专家

### 用好一种编辑器
编辑器是写代码的必要的工具，用好一种编辑器能让你高效的完成各种编辑任务，写代码，写文档，修改配置，阅读代码，查找关键信息，要达到熟练，你必须掌握这个编辑器的常用快捷键，学会用键盘在代码中移动光标，学会安装插件来扩展编辑器的功能。

### Atom 编辑器介绍
Atom 默认配置了代码高亮，代码自动缩进，显示代码行号，支持插件扩展等功能，一个合格的代码编辑器至少需要有这些特点，Atom 对于新手来说很友好，它没有复杂的快捷键而且免费，新手可以开箱即用。

### 使用 Atom
打开 [Atom 官网](https://atom.io)，下载编辑器
![atom](http://cdn.defcoding.com/EC83467D-E510-47A2-B102-80B22126D9A4.png)

下载本书的示例和练习代码：[下载源码](https://github.com/runforever/learnpython/archive/master.zip)

解压代码，使用 Atom 打开 `chapter-2/tools/code/atom_code.py` 文件，这是一段风格和语法有问题的代码，使用 Atom 编辑器打开后显示如下：
![atom code](http://cdn.defcoding.com/B0DC7360-2AC6-42BB-80C8-D7F0B7E6B47B.png)
可以看到 Atom 显示了很多有用的信息帮助我们写代码，例如：项目目录结构，代码关键字高亮，语法错误提示，风格错误提示，行号等。

要让 Atom 有这些功能，我们需要对他进行 Python 编程相关的配置。

### 配置 Atom
1. 配置代码缩进。
2. 安装插件。

#### 配置代码缩进
Python 语言使用 4 个空格缩进，无论你使用什么编辑器，首先都应该把缩进配置好。

打开 Atom 设置选项，选择 Editor（编辑器）配置，将 `Soft Tabs` 选项打钩
![4tab](http://cdn.defcoding.com/ACBDF3A9-4900-47AA-812B-4021AFDDA4F2.png)

#### 安装插件
Atom 默认是没有 Python 代码风格和语法检查功能的，需要我们自己安装相应的插件。

具体需要什么插件呢？这个时候该求助万能的 Google 了，输入关键字 `atom python 语法检查`，得到如下结果：
![google](http://cdn.defcoding.com/82D2659E-8B9E-4569-9F16-59BD82FF1C60.png)
根据网上的资料，需要安装的插件如下：

1. [linter](https://atom.io/packages/linter)（编辑器代码语法检查框架）
2. [linter-pyflakes](https://atom.io/packages/linter-pyflakes)（Python 代码语法检查）
3. [linter-pycodestyle](https://atom.io/packages/linter-pycodestyle)（Python 代码风格检查）

打开 [https://atom.io/packages](https://atom.io/packages) 搜索插件，找到插件后使用 Terminal 安装。

搜索插件：
![search](http://cdn.defcoding.com/A00AEBC9-776E-485F-BA7E-D0ED37117417.png)

插件详情：
![detail](http://cdn.defcoding.com/BC289D41-D06A-4FB9-B074-D67B7A065925.png)

使用 Terminal 安装，命令 `apm install linter`：
![install](http://cdn.defcoding.com/B12D6C12-E7C8-4BDF-B82B-C4A8E8238B7B.png)

Atom 编辑器内安装，打开 Atom 设置，选择 Install（安装）选项，搜索插件并安装：
![atom install](http://cdn.defcoding.com/4375A30F-CA44-4CD5-86FD-E1B02188307C.png)

使用 pip 安装 pyflasks 和 pycodestyle，命令 `sudo pip install pyflakes pycodestyle`：
![pycodestyle](http://cdn.defcoding.com/C787DAE4-BB63-4335-80F0-D051FA5B4C14.png)

Atom 的插件需要调用 pyflasks 和 pycodestyle 这两个程序来检查代码语法和风格。

安装完成后重启 Atom，插件功能便生效了。

### 学习 Atom
查找资料，深入学习 Atom，资料链接：[learn-atom](https://github.com/nieweidong/learn-atom)。

目标：

1. 学会常用快捷键，保存，撤销，重做，移动，达到少用鼠标的目的。
2. 查找常用插件，按需求安装。
3. 配置一个看起来舒服的主题和字体。
4. 学习编写插件，提高编辑效率。

### 编辑器战争
编辑器种类繁多，用什么编辑器常常成为程序员之间争吵的话题，这些争论是没有任何意义的，没有一种编辑器能完美的胜任各种编辑任务，每种编辑器都有自己的优缺点，用合适的编辑器去解决相应的编辑问题才是最重要的，用好一种编辑器的同时抱着开放的心态去学习其他编辑器，了解他们的优势和缺点。

> 我觉得 PHP 是世界上最好的语言，但是我主要用 Python

> 我觉得 IDE 是最好的代码编辑工具，但是我主要用 Vim 和 Emacs

### 我对编辑器的理解
学会 [Atom](https://atom.io), [Sublime text](https://www.sublimetext.com/3), [Vim](http://www.vim.org), [Emacs](https://www.gnu.org/s/emacs/) 里面的一种或着几种。

必须学习的编辑器 Vim，因为任何 *nix（Linux or Unix）系统中都有这个编辑器，当你登录到服务器上，如果不会这个编辑器，你到服务器上基本上做不了任何事，这个编辑器学习曲线很高，建议用熟了 Atom 或者 Sublime text 后再学习。

### 集成开发环境（IDE）
集成开发环境配置好了开发需要的一系列工具：编辑器，编译环境，调试器，版本控制等等，IDE 的好处是你不需要做什么配置，可以开箱即用，缺点是隐藏了很多工具的细节，而掌握这些细节对于新手来说又可以更好的使用 IDE，这是 IDE 的一个矛盾点，Python 的 IDE 推荐使用 [PyCharm](https://www.jetbrains.com/pycharm/) ，我经常使用自己喜欢的编辑器来编辑代码，使用 IDE 来做代码重构的任务，我不排斥 IDE，我还是这个观点，用合适的工具解决问题。

PyCharm 打开代码界面：
![pycharm](http://cdn.defcoding.com/B5BBCF95-71A7-4B17-91CF-DCCD93DB03ED.png)

### pip（Python 第三方库管理工具）
前面用 pip 安装过 pyflakes 和 pycodestyle 这两个第三方库，下面详细介绍这个工具。

Python 有许许多多第三方的开源库，你可以免费的使用这些库来解决问题，[pip](https://pip.pypa.io/en/stable/installing/) 是 Python 的第三方库管理工具，可以使用它来搜索、安装、卸载第三方的库。

常用命令
```
# 搜索包含 ipython 的第三方库
pip search ipython

# 安装 ipython
pip install ipython

# 卸载 ipython
pip uninstall ipython

# 升级 ipython
pip install -U ipython

# 查看已经安装的第三方包
pip freeze
```

### IPython（增强版的 Python 解释器）
使用 Python 自带的解释器的时候，我们不能使用 `Tab` 键来做自动补全，代码不能自动缩进，没有代码高亮，而 IPython 很好的弥补了 Python 自带解释器的不足。

使用 pip 安装:
```
sudo pip install ipython
```

使用效果
![ipython](http://cdn.defcoding.com/959B46AB-2473-45FD-9095-19126630C9FE.png.jpeg)

双击 `Tab` 键补全
![complete](http://cdn.defcoding.com/F893E6E8-1FB7-49AD-A86A-25DE0A73F761.png.jpeg)

代码高亮和自动缩进
![higlight](http://cdn.defcoding.com/A2FD9B7B-ADC7-4CF9-B9B1-052E2FDD35E7.png.jpeg)

IPython 还有很多神奇的功能，我这里只说了最基本的，感兴趣的读者可以去查看 [官方文档](https://ipython.org)。

### 保存代码
Python 的代码文件以 `.py` 结尾。

将下面的代码保存在一个叫 hello.py
``` python
# coding: utf-8

# 我是一个文件
print 'I am a file'
```

在 Terminal 中使用运行我们的代码，命令 `python hello.py`

运行效果:
![run file](http://cdn.defcoding.com/64F48BF1-C4ED-40F6-A233-BD8BC6E96794.png.jpeg)
使用 Iterm2 分屏，左边是 Vim 编辑器，右边是 shell 命令行来运行我们的代码

### 使用示例代码项目
前面我们下载了本书的 [示例代码项目](https://github.com/runforever/learnpython/archive/master.zip)。

此项目的目录结构：
![directory](http://cdn.defcoding.com/DF602ABC-C11D-4E3B-BA37-C0565800AA7B.png)

1. 每一个 chapter 目录包含一个 README.md 说明文件。
2. 每一个 chapter 下的每一小节有 code（示例代码）目录和 exercise（代码练习目录）。

大家可以使用这个项目来作为自己开发测试目录，code 目录查看书中的源代码，exercise 目录中放置书中小作业的代码，如果需要我帮忙审查代码可以在 [GitHub](https://github.com) 提交 Pull Request，具体步骤参考：[开始小项目](/chapter-5/before_the_project.html)

#### 如何测试书中的代码
先学习 Terminal 中的几个命令。

`ls`（list directory）显示目录文件，例如：
![ls](http://cdn.defcoding.com/F33DDB33-A55F-4CDC-9D24-EEC06A032694.png)

参数 `-l` 是列出详细信息的意思

`cd`（change directory）是在 Terminal 中切换目录的命令，例如示例代码在 `Downloads/learnpython-master` 目录中，使用 `cd` 切换到项目代码：
![cd](http://cdn.defcoding.com/F96AA859-B4E9-46B7-B9F9-692CE9602AA9.png)

小提示：输入命令的同时可以多按 `Tab` 键补全命令。

小提示：`cd ..` 是返回上一层目录的命令，例如：
![cd ..](http://cdn.defcoding.com/07ACC9D9-0862-448E-B5F7-8E30DB86875E.png)

运行代码：

使用 `cd` 命令切换到相应的目录，使用 `ls` 查看文件，最后使用 `python xxx.py` 运行代码，例如运行 `learnpython-master/chapter-2/tools/code/atom.py` 文件：
![cd&run](http://cdn.defcoding.com/2622F370-12A2-4DA7-ADFD-59DA7B7AC3B3.png)

或者，`python learnpython-master/chapter-2/tools/code/atom.py` 直接运行：
![python](http://cdn.defcoding.com/624D96DA-B62D-403B-ABC8-1317D714E7B3.png)

Linux 的命令有很多，推荐读者利用 Google 查找资料自学和查看 [《鸟哥的 Linux 私房菜》](https://book.douban.com/subject/4889838/)。

**作业**：使用 Google 学习 `ls`，`cd`，`pwd` 命令的用法。

### 总结：
本章说了代码编辑器、pip、 IPython 这几个工具，大家掌握了这几个工具就可以方便的测试书中的代码和完成书中布置的作业了。

目标：

1. 学会 Terminal 目录切换操作。
2. 学会使用 ipython。
3. 学会使用 atom 编辑器写代码。
4. 学会在 Terminal 使用 python 命令运行代码。

最后，学习 Atom 编辑器的方法可以用到学习别的编辑器上，举一反三。
