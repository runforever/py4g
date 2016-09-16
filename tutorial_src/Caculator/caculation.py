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
