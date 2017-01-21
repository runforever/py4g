def qsort(lst):
    return lst if len(lst) <= 1 else qsort([i for i in lst[1:] if i <= lst[0]]) + [lst[0]] + qsort([i for i in lst[1:] if i > lst[0]])
