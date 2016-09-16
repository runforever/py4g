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
