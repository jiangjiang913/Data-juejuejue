# -*- coding: utf-8 -*-
"""
Created on Sat Sep 25 16:12:41 2021

@author: jiangjiang
"""
# 极大似然估计  朴素贝叶斯算法
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
#from sklearn.cross_validation import train_test_split
from sklearn.naive_bayes import  GaussianNB
#train_X,test_X, train_y, test_y = train_test_split(b,y,test_size=0.1) # test_size:测试集比例20%

dataSet = pd.read_csv('D:\\数据挖掘\\Playtennis.csv')

class_le = LabelEncoder()
#给标签值进行编码
y=class_le.fit_transform(dataSet['Playtennis'].values)
# 特征编码时直接用了 DataFrame 替换
dataSet['Outlook'].replace(['Sunny','Overcast','Rain'],[-1,0,1],inplace=True)
dataSet['Temperature'].replace(['Hot','Mild','Cool'],[-1,0,1],inplace=True)
dataSet['Humidity'].replace(['High','Normal'],[0,1],inplace=True)
dataSet['Wind'].replace(['Weak','Strong'],[0,1],inplace=True)
b=dataSet.values[:,:-2]
print ('\n','特征值','\n', b)
print ('标签值','\n',y)

#贝叶斯方法进行拟合

clf = GaussianNB()
#clf.fit(train_X, train_y)
clf.fit(b,y)
prediction6=clf.predict(b)
print ('两个类别的先验概率:',clf.class_prior_)   #获取两个类别的先验概率
#print(clf.feature_prob_)
#print('The accuracy of the NaiveBayes is',metrics.accuracy_score(prediction6,y))
print (clf.predict([[-1,1,0,1]]))
print (clf.predict_proba([[-1,1,0,1]]))
