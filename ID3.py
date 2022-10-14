# -*- coding: utf-8 -*-
"""
Created on Sun Sep 19 13:46:19 2021

@author: jiangjiang
"""
import pandas as pd
#参数初始化
filename = 'D:/数据挖掘/数据分类data/bankloan.xls'
data = pd.read_excel(filename)#导入数据

#数据作为标签类，要转换为数据
x = data.iloc[:,:8].values.astype(int)
y = data.iloc[:,8].values.astype(int)

#建立决策树模型，基于信息熵
from sklearn.tree import DecisionTreeClassifier as DTC
dtc = DTC(criterion='entropy')
dtc.fit(x,y) #训练模型

#导入相关函数，可视化决策树
from sklearn.tree import export_graphviz
x = pd.DataFrame(x)
with open('D:/数据挖掘/数据分类data/bankloan.dot','w',encoding='utf-8')as f:
    f = export_graphviz(dtc,feature_names=['年龄','教育','工龄','地址','收入','负债率','信用卡负债率',
                                              '其他负债率'],class_names=['0', '1'],out_file=f,rounded=True)