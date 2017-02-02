# 准备开始

### 心态
学习无非是兴趣和坚持，我很高兴你对 Python 语言感兴趣，剩下的就是保持这份兴趣和热情坚持下去。

### 学习编程的方法
学习编程绝不要像在学校学数理化那样，先看基础，觉得基础差不多了再去做题，这种方法对于编程学习来说是很低效的，实践对于编程来说非常重要，推荐的方法是，一边看一边写代码实践，理论的东西不懂就去实践，实践的东西不懂再回头去看理论，只看不做最终只会导致你好像什么都知道，但是你没法写出任何代码，也创造不出任何东西。

### 英语
英语对于编程来说是**非常非常非常**重要的，很多新技术和思想都是国外传过来的，要想第一时间了解新东西必须要能看英文文档，不过，好在英文的技术文档都不难，大多是简单直接的陈述，看英文文档的时候不要一言不合就关掉。

### 关于编程一些有意思的观点
在我学习编程之前我多希望可以先读读下面的东西
* [如何成为一个黑客](http://translations.readthedocs.io/en/latest/hacker_howto.html)
* [提问的智慧](https://github.com/ruby-china/How-To-Ask-Questions-The-Smart-Way/blob/master/README-zh_CN.md)
* [一个平庸的程序员的自白](http://www.techug.com/mediocre)

《如何成为一个黑客》讲述了黑客的正确定义，真正的黑客不是搞计算机破坏的人，而是搞创造的人，如今的 Google，微博，微信解决了人们生活的问题，而编程的目的也是在互联网时代用技术去的解决人们生活的问题。

《提问的智慧》教新手学会如何正确的提问，学习编程的过程中会遇到许许多多的问题，不会提问而被其他程序员无情嘲讽也怪不了别人，提问和如何高效使用搜索引擎也是编程中很重要的技能，用好这两项技能有可能让你事半功倍的解决问题。

《一个平庸程序员的自白》我有许许多多崇拜的大牛，我也想过某一天自己可以成为大牛，现在倒是渐渐明白了，一个人只要实现了自己的价值就已经足够了，大牛在他们的领域能够发光发热，我们能在自己所处的领域发光发热就行，不需要给自己多大压力，享受当下，享受编程带给我们的乐趣。

### 阅读的过程中测试 Python 代码
相信读者已经看到右下角有个刺眼的黑框框，这个叫 shell（终端），程序员和计算机交互的入口，考虑到很多读者可能一开始没有 Python 的运行环境，所以编写了这个 gitbook 的插件，让读者一边阅读一边测试 Python 代码。

点击之后会出现这样的的界面，左边是 Python 的 REPL 解释器，一次只能运行一行 Python 代码，输入代码后，按 Enter 键运行，右边是代码编辑器，可以输入多行 Python 代码，写完后点击运行按钮，结果会显示在右下角的窗口中。

![Python Shell](http://cdn.defcoding.com/43693141-0323-47B1-85C0-F11A9B6AB2CE.png)

这个插件的源代码我放在 [GitHub](https://github.com) 上，地址 [前端](https://github.com/runforever/gitbook-plugin-pyshell)、[后端](https://github.com/runforever/pyshell-server)，对实现感兴趣的同学可以去 check 我的代码。

插件对于某些懂安全的同学来说有安全风险，不过无所谓了，代码大家都可以看到，部署在 Docker 上资源是隔离的，没有什么东西可以看，如果你想搞破坏那我也没有办法，因为我想在读者搭建好开发环境前提供一个可以运行 Python 代码的地方。

### 开发环境和工具
本书可以通过浏览器让大家运行 Python，但是大家还是要搭建本地的开发环境，一开始只需要 Python 的解释器和代码编辑器就足够了，参照 [高效使用开发工具](../chapter-2/dev_tool.md) 将开发环境搭建好，这样能大幅度提高学习的效率，古语有云：工欲善其事必先利其器。

必须准备
* Mac 或者笔记本电脑
* Python 开发环境
* 代码编辑器

#### 如何使用 Mac 作为开发环境
Mac自带 Python 开发环境，版本是 2.7。

[iTerm2](https://www.iterm2.com) 是 Mac 上的 shell 增强工具，推荐下载。

编辑器推荐使用 [Atom](https://atom.io)，这个编辑器对于新手来说很友好。

#### 如何使用笔记本电脑作为开发环境
这个世界上除了 Windows 系统，还有一个叫 [Linux](https://zh.wikipedia.org/wiki/Linux) 的系统，Linux 主要用在网站的服务器，而 Windows 是用在个人 PC，Linux 比 Windows 更适合用做编程的学习，Linux 有强大的命令行工具，安装第三方库非常方便，推荐用 Windows 虚拟机安装一个 Linux 发行版 [Ubuntu](http://cn.ubuntu.com)，Windows 系统搭建开发环境的过程会比较艰辛，现在已经可以使用 Google 去折腾了。

#### 第一行 Python 代码
1. 打开 Terminal，Mac 使用 iTerm2，Ubuntu 使用 Terminal
2. 输入 python
3. 输入代码

``` python
print 'Hello Python'
```
![Hello World](http://cdn.defcoding.com/DA2138CE-2AA9-41A5-9BCF-B08C4FEF1EE5.png)
