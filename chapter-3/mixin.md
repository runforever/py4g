# Mixin

> keep It Simple Stupid -- K.I.S.S 原则

### 为何那么多设计思想
软件工程的目的在于控制项目的复杂度，项目复杂度取决于很多方面，例如需求，UI 设计，沟通，代码质量等等，各种设计思想的出现都是为了提高代码的质量，降低代码的复杂度，从而降低整个项目的复杂度，使项目更好控制，其他方面的复杂度控制不在本书的探讨范围中，感兴趣的读者可以阅读其他书籍了解，例如《人月神话》、《人件》。

### Mixin 设计模式
我们回顾一下 OOP 的设计原则：

1. 高内聚，低耦合。
2. 组合优于继承。

Mixin 这种设计模式是利用继承来达到组合的目的，Mixin 的设计思想和软件插件的设计思想类似，可以把 Mixin 看成是 Chrome 浏览器的插件，当你需要插件的功能时就安装上，不需要的时候就卸载掉。

下面我们通过实际问题来理解 Mixin。

### 问题
分别使用继承模式、组合模式和 Mixin 模式来设计程序员、产品经理、UI 设计师、市场运营人员。

#### 需求分析
1. 他们都是公司的职员，具备一些相同的属性，例如性别，工作经验等。
2. 他们具备不一样的技能，例如程序员会写代码，产品经理会设计产品原型。
3. 他们一个人可能有多种技能，例如会产品设计的程序员、会写代码的产品经理。

#### 使用继承模式
使用 [process on](http://www.processon.com) 工具画的类图。
![Inheritance](http://cdn.defcoding.com/Class Diagram-3.png)
说明：

1. `Staff` 类包含员工基本属性 `gender` 和 `work_years`。
2. `DeveloperStaff` 类是开发者类，包含开发者的属性和技能。
3. `ProductManagerStaff` 类是产品经理类，包含产品经理的属性和技能。
4. `UIDesignerStaff` 类是 UI 设计师类，包含设计师的属性和技能。
5. `MarketingStaff` 类是市场运营人员类，包含市场运营的属性和技能。
6. `SeniorDeveloperStaff` 类是高级开发者类，包含 `DeveloperStaff` 和 `ProductManagerStaff` 的属性和技能。
7. `SeniorProductManager` 类是高级产品经理，包含 `ProductManagerStaff`、`UIDesignerStaff` 和 `MarketingStaff` 的属性和技能。

**代码实现**
```python
class Staff(object):
    '''
    员工类
    '''
    def __init__(self, gender, work_years):
        self.gender = gender
        self.work_years = work_years


class DeveloperStaff(Staff):
    '''
    开发者
    '''
    def __init__(self, gender, work_years, programing_language):
        super(DeveloperStaff, self).__init__(gender, work_years)
        self.programing_language = programing_language

    def programing(self):
        print 'working with %s' % self.programing_language

    def working(self):
        self.programing()


class ProductManagerStaff(Staff):
    '''
    产品经理
    '''
    def __init__(self, gender, work_years, communication_level):
        super(ProductManagerStaff, self).__init__(gender, work_years)
        self.conmunication_level = communication_level

    def product_design(self):
        print 'design product'

    def working(self):
        self.product_design()


class UIDesignerStaff(Staff):
    '''
    UI 设计师
    '''
    def __init__(self, gender, work_years, design_style):
        super(UIDesignerStaff, self).__init__(gender, work_years)
        self.design_style = design_style

    def ui_design(self):
        print 'design ui'

    def working(self):
        self.ui_design()


class MarketingStaff(Staff):
    '''
    市场推广
    '''
    def __init__(self, gender, work_years, marketing_level):
        super(MarketingStaff, self).__init__(gender, work_years)
        self.marketing_level = marketing_level

    def market_promotion(self):
        print 'promotion'

    def working(self):
        self.market_promotion()


class SeniorDeveloperStaff(DeveloperStaff, ProductManagerStaff):
    '''
    高级开发工程师，会写代码，会产品设计
    '''
    def __init__(self, gender, work_years):
        self.gender = gender
        self.work_years = work_years
        self.programing_language = 'Python'

    def working(self):
        self.programing()
        self.product_design()


class SeniorProductManager(ProductManagerStaff, UIDesignerStaff, MarketingStaff):
    '''
    高级产品经理，会产品设计，会 UI 设计，会市场推广
    '''
    def __init__(self, gender, work_years):
        self.gender = gender
        self.work_years = work_years

    def working(self):
        self.product_design()
        self.ui_design()
        self.market_promotion()


developer = DeveloperStaff('female', 1, 'Python')
developer.working()

product_manager = ProductManagerStaff('male', 2, 'good')
product_manager.working()

ui_designer = UIDesignerStaff('female', 3, 'abstract')
ui_designer.working()

marketing = MarketingStaff('male', 4, 'high')
marketing.working()

senior_developer = SeniorDeveloperStaff('female', 5)
senior_developer.working()

senior_product_manager = SeniorProductManager('male', 3)
senior_product_manager.working()
```

继承的缺点是是这种模式使得类之间的耦合度很高，当出现需求变更的时候，由于子类继承父类的所有属性和方法，父类的改动毫无例外的会影响到其所有子类，维护这样的代码必须异常小心，因为我们很难从复杂的继承关系中确定我们的改动会对子类造成怎样的影响。

例如：现在有一个需求变更，`ProductStaff` 产品经理需要 UI 设计技能，于是我们往其中添加了 `ui_design()` 方法满足了需求。

**代码实现**
``` python
class ProductManagerStaff(Staff):
    '''
    产品经理，会产品设计也要会 UI 设计
    '''
    def __init__(self, gender, work_years, communication_level):
        super(DeveloperStaff, self).__init__(gender, work_years)
        self.conmunication_level = communication_level

    def product_design(self):
        print 'design product'

    def ui_design(self):
        print 'producter design ui'

    def working(self):
        self.product_design()
        self.ui_design()
```
添加完后直接影响到子类 `SeniorProductManager` 高级产品经理类的使用，因为当我们使用 `SeniorProductManager` 的 `working` 方法会调用到父类 `ProductStaff` 的 `ui_design` 方法而不是 `UIDesignerStaff` 的 `ui_design` 方法，这样是不符合我们预期的，因为我们仍然想让 `SeniorProductManager` 保持原来的行为特征。

我们可以通过调整继承关系来解决这个问题，例如下面的代码：
``` python
# 更换继承顺序
class SeniorProductManager(UIDesignerStaff, ProductManagerStaff, MarketingStaff):
    '''
    高级产品经理，会写代码，会产品设计，会市场推广
    '''
    def working(self):
        self.product_design()
        self.ui_design()
        self.market_promotion()
```
但是如果需求在变更 `UIDesignerStaff` 需要添加 `product_design` 方法，噩梦依然会再次降临。

下面我们看看组合模式是如何解决这个问题的。

#### 组合
类图设计
![Combination](http://cdn.defcoding.com/Class Diagram-4.png)

说明：各个类的功能保持不变，将技能做成类供每种角色自由组合调用，让继承关系变得简单了。

**代码实现**
``` python
class Staff(object):
    '''
    员工类
    '''
    def __init__(self, gender, work_years):
        self.gender = gender
        self.work_years = work_years


class DevelopSkill(object):
    '''
    开发技能类
    '''
    def __init__(self, programing_language):
        self.programing_language = programing_language

    def programing(self):
        print 'working with %s' % self.programing_language


class ProductSkill(object):
    '''
    产品经理技能类
    '''
    def product_design(self):
        print 'design product'


class UIDesignSkill(object):
    '''
    设计师技能类
    '''
    def ui_design(self):
        print 'design ui'


class MarketingSkill(object):
    '''
    市场运营人员技能类
    '''
    def market_promotion(self):
        print 'promotion'


class DeveloperStaff(Staff):
    '''
    开发者
    '''
    def __init__(self, gender, work_years, programing_language):
        super(DeveloperStaff, self).__init__(gender, work_years)
        self.programing_language = programing_language
        self.develop_skill = DevelopSkill(programing_language)

    def working(self):
        self.develop_skill.programing()


class ProductManagerStaff(Staff):
    '''
    产品经理
    '''
    def __init__(self, gender, work_years, communication_level):
        super(ProductManagerStaff, self).__init__(gender, work_years)
        self.conmunication_level = communication_level
        self.product_skill = ProductSkill()

    def working(self):
        self.product_skill.product_design()


class UIDesignerStaff(Staff):
    '''
    UI 设计师
    '''
    def __init__(self, gender, work_years, design_style):
        super(UIDesignerStaff, self).__init__(gender, work_years)
        self.design_style = design_style
        self.design_skill = UIDesignSkill()

    def working(self):
        self.design_skill.ui_design()


class MarketingStaff(Staff):
    '''
    市场推广
    '''
    def __init__(self, gender, work_years, marketing_level):
        super(MarketingStaff, self).__init__(gender, work_years)
        self.marketing_level = marketing_level
        self.marketing_skill = MarketingSkill()

    def working(self):
        self.marketing_skill.market_promotion()


class SeniorDeveloperStaff(Staff):
    '''
    高级开发工程师，会写代码，会产品设计
    '''
    def __init__(self, gender, work_years):
        super(SeniorDeveloperStaff, self).__init__(gender, work_years)
        self.develop_skill = DevelopSkill('Python')
        self.product_skill = ProductSkill()

    def working(self):
        self.develop_skill.programing()
        self.product_skill.product_design()


class SeniorProductManager(Staff):
    '''
    高级产品经理，会产品设计，会 UI 设计，会市场推广
    '''
    def __init__(self, gender, work_years):
        super(SeniorProductManager, self).__init__(gender, work_years)
        self.product_skill = ProductSkill()
        self.design_skill = UIDesignSkill()
        self.marketing_skill = MarketingSkill()

    def working(self):
        self.product_skill.product_design()
        self.design_skill.ui_design()
        self.marketing_skill.market_promotion()


developer = DeveloperStaff('female', 1, 'Python')
developer.working()

product_manager = ProductManagerStaff('male', 2, 'good')
product_manager.working()

ui_designer = UIDesignerStaff('female', 3, 'abstract')
ui_designer.working()

marketing = MarketingStaff('male', 4, 'high')
marketing.working()

senior_developer = SeniorDeveloperStaff('female', 5)
senior_developer.working()

senior_product_manager = SeniorProductManager('male', 3)
senior_product_manager.working()
```
组合的好处是降低了类与类之间的耦合程度，对需求变更的适应性更好，现在我们往产品经理技能中添加 `ui_design()` 方法，添加完了之后不会对其他的类造成影响，这个就是组合设计思想相对于继承设计思想的优势所在。

**变更代码**
``` python
class ProductSkill(object):
    '''
    产品经理技能类
    '''
    def product_design(self):
        print 'design product'

    # 添加新方法
    def ui_design(self):
        print 'product ui design'


class ProductManagerStaff(Staff):
    '''
    产品经理
    '''
    def __init__(self, gender, work_years, communication_level):
        super(ProductManagerStaff, self).__init__(gender, work_years)
        self.conmunication_level = communication_level
        self.product_skill = ProductSkill()

    def working(self):
        self.product_skill.product_design()
        # 使用新方法
        self.product_skill.ui_design()
```

组合帮助我们更好的适应了需求的变更，下面我们来看看 Mixin 带来了什么。
#### Mixin 模式
类图设计
![mixin](http://cdn.defcoding.com/Class Diagram-5.png)

说明：将各个技能做成 Mixin 类，不同于组合方式，Mixin 使用多继承来达到组合的目的。

**代码实现**
``` python
class Staff(object):
    '''
    员工类
    '''
    def __init__(self, gender, work_years):
        self.gender = gender
        self.work_years = work_years


class DevelopSkillMixin(object):
    '''
    开发技能 Mixin 类
    '''
    def programing(self):
        print 'working with %s' % self.programing_language


class ProductSkillMixin(object):
    '''
    产品经理技能 Mixin 类
    '''
    def product_design(self):
        print 'design product'


class UIDesignSkillMixin(object):
    '''
    设计师技能 Mixin 类
    '''
    def ui_design(self):
        print 'design ui'


class MarketingSkillMixin(object):
    '''
    市场运营人员技能 Mixin 类
    '''
    def market_promotion(self):
        print 'promotion'


class DeveloperStaff(Staff, DevelopSkillMixin):
    '''
    开发者
    '''
    def __init__(self, gender, work_years, programing_language):
        super(DeveloperStaff, self).__init__(gender, work_years)
        self.programing_language = programing_language

    def working(self):
        self.programing()


class ProductManagerStaff(Staff, ProductSkillMixin):
    '''
    产品经理
    '''
    def __init__(self, gender, work_years, communication_level):
        super(ProductManagerStaff, self).__init__(gender, work_years)
        self.conmunication_level = communication_level

    def working(self):
        self.product_design()


class UIDesignerStaff(Staff, UIDesignSkillMixin):
    '''
    UI 设计师
    '''
    def __init__(self, gender, work_years, design_style):
        super(UIDesignerStaff, self).__init__(gender, work_years)
        self.design_style = design_style

    def working(self):
        self.ui_design()


class MarketingStaff(Staff, MarketingSkillMixin):
    '''
    市场推广
    '''
    def __init__(self, gender, work_years, marketing_level):
        super(MarketingStaff, self).__init__(gender, work_years)
        self.marketing_level = marketing_level

    def working(self):
        self.market_promotion()


class SeniorDeveloperStaff(Staff, DevelopSkillMixin, ProductSkillMixin):
    '''
    高级开发工程师，会写代码，会产品设计
    '''
    def __init__(self, gender, work_years):
        super(SeniorDeveloperStaff, self).__init__(gender, work_years)
        self.programing_language = 'Python'

    def working(self):
        self.programing()
        self.product_design()


class SeniorProductManager(
        Staff,
        ProductSkillMixin,
        UIDesignSkillMixin,
        MarketingSkillMixin):
    '''
    高级产品经理，会产品设计，会 UI 设计，会市场推广
    '''
    def __init__(self, gender, work_years):
        super(SeniorProductManager, self).__init__(gender, work_years)

    def working(self):
        self.product_design()
        self.ui_design()
        self.market_promotion()


developer = DeveloperStaff('female', 1, 'Python')
developer.working()

product_manager = ProductManagerStaff('male', 2, 'good')
product_manager.working()

ui_designer = UIDesignerStaff('female', 3, 'abstract')
ui_designer.working()

marketing = MarketingStaff('male', 4, 'high')
marketing.working()

senior_developer = SeniorDeveloperStaff('female', 5)
senior_developer.working()

senior_product_manager = SeniorProductManager('male', 3)
senior_product_manager.working()
```
Mixin 说明：

1. Mixin 模式中的每个 Mixin 类都只做一件事，并且做好一件事。
2. 由于动态语言的特性，Mixin 中的方法可以直接访问到子类的属性，例如 `DevelopSkillMixin` 可以直接拿到子类的 `programing_language` 属性。

下面我们看看 Mixin 如何应对需求变更，`ProductManagerStaff` 需要添加 `ui_design()` 方法。

**代码实现**
``` python
# 添加新的 Mixin
class ProductManagerUIDesignSkillMixin(object):
    '''
    产品经理需要具备的 UI 设计技能
    '''
    def ui_design(self):
        print 'product ui design'


# 添加新的 Mixin
class ProductManagerStaff(Staff, ProductSkillMixin, ProductManagerUIDesignSkillMixin):
    '''
    产品经理
    '''
    def __init__(self, gender, work_years, communication_level):
        super(ProductManagerStaff, self).__init__(gender, work_years)
        self.conmunication_level = communication_level

    def working(self):
        self.product_design()
        # 添加新方法
        self.ui_design()
```
可以看出来，添加新的方法并没有对其他类造成影响，并且功能也很清晰，如果其他类想要加入同样的新功能可以直接继承。

Mixin 与组合比较起来更 Pythonic 一些，但是他们的本质思想是一致的。

### 总结
这一节我们了解到了设计思想的用途，学习了 Mixin 思想的本质，同时，我希望读者也去学习更多关于设计模式的东西，了解更多的设计思想，可以从《Head First 设计模式》开始。
