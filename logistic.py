# -*- coding: utf-8 -*-
"""
Created on Sat Sep 18 22:05:25 2021

@author: jiangjiang
"""

import pandas as pd
from sklearn.linear_model import LogisticRegression as LR
#参数初始化
filename = 'D://数据挖掘//数据分类data//bankloan.xls'
data = pd.read_excel(filename)
x = data.iloc[:,2:7].values
y = data.iloc[:,8].values
lr = LR(solver='liblinear')    #建立逻辑斯蒂回归模型
lr.fit(x, y) #用筛选后的特征数据来训练模型
print('模型的平均准确度为： %s' % lr.score(x, y))