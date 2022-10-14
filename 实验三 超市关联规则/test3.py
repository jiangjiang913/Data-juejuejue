# -*- coding: utf-8 -*-
"""
Created on Thu Oct 21 21:41:20 2021

@author: jiangjiang
"""

# 导入相关包
import numpy as np
import pandas as pd
from numpy import nan

#%matplotlib inline
import matplotlib.pyplot as plt
plt.style.use('seaborn')

import seaborn as sns
sns.set_style("whitegrid")

#查看数据
data = pd.read_csv('D:\数据挖掘\实验三\M2_IFI_Data_Basket.csv')
data

# 判断数据行中是否存在缺失值	
data.isnull().any(axis = 1).any()

#提取需要的属性值
data1 = data.iloc[:,7:18]
data1.to_csv('D:\数据挖掘\实验三\data1.csv')

#数据预处理重编码
data2 = pd.read_csv('D:\数据挖掘\实验三\data1.csv',usecols=[1,2,3,4,5,6,7,8,9,10,11])
#数据处理，重编码，以列为单位对每一列进行重编码生成条目集

#Fruits & vegetables
data2['Fruits & vegetables'] = data2['Fruits & vegetables'].apply(lambda x:1 if x == "Yes" else 0)
#Meat
data2['Meat'] = data2['Meat'].apply(lambda x:2 if x == "Yes" else 0)
#Milk products
data2['Milk products'] = data2['Milk products'].apply(lambda x:3 if x == "Yes" else 0)
# Canned vegetables
data2['Canned vegetables'] = data2['Canned vegetables'].apply(lambda x:4 if x == "Yes" else 0)
# Canned meat
data2['Canned meat'] = data2['Canned meat'].apply(lambda x:5 if x == "Yes" else 0)
# Frozen goods
data2['Frozen goods'] = data2['Frozen goods'].apply(lambda x:6 if x == "Yes" else 0)
# Beer
data2['Beer'] = data2['Beer'].apply(lambda x:7 if x == "Yes" else 0)
# Wine
data2['Wine'] = data2['Wine'].apply(lambda x:8 if x == "Yes" else 0)
# Soda drinks
data2['Soda drinks'] = data2['Soda drinks'].apply(lambda x:9 if x == "Yes" else 0)
#Fish
data2['Fish'] = data2['Fish'].apply(lambda x:10 if x == "Yes" else 0)
# Textile
data2['Textile'] = data2['Textile'].apply(lambda x:11 if x == "Yes" else 0)

# 首先将pandas读取的数据转化为array
dataSet = np.array(data2)
# 然后转化为list形式
dataSet = dataSet.tolist()
dataSet[0] = [i for i in dataSet[0] if i != 0]
List = []
for n in range(0,len(dataSet)):
    dataSet[n] = [i for i in dataSet[n] if i != 0]
    List.append(dataSet[n])
data2_list = [i for i in List if i !=[]]


#加载数据集
def loadDataSet():
    return data2_list

#选取数据集的非重复元素组成候选集的集合C1
def createC1(dataSet):
    C1=[]
    for transaction in dataSet: #对数据集中的每条购买记录
        for item in transaction: #对购买记录中的每个元素
            if [item] not in C1: #注意，item外要加上[]，便于与C1中的[item]对比
                C1.append([item])
    C1.sort()
    return list(map(frozenset,C1)) #将C1各元素转换为frozenset格式，注意frozenset作用对象为可迭代对象
#由Ck产生Lk：扫描数据集D，计算候选集Ck各元素在D中的支持度，选取支持度大于设定值的元素进入Lk
def scanD(D,Ck,minSupport):
    ssCnt={}
    for tid in D: #对数据集中的每条购买记录
        for can in Ck: #遍历Ck所有候选集
            if can.issubset(tid): #如果候选集包含在购买记录中，计数+1
                ssCnt[can]=ssCnt.get(can,0)+1
    numItems=float(len(D)) #购买记录数
    retList=[] #用于存放支持度大于设定值的项集
    supportData={} #用于记录各项集对应的支持度
    for key in ssCnt.keys():
        support=ssCnt[key]/numItems
        if support>=minSupport:
            retList.insert(0,key)
        supportData[key]=support
    return retList,supportData
#由Lk产生Ck+1
def aprioriGen(Lk,k): #Lk的k和参数k不是同一个概念，Lk的k比参数k小1
    retList=[]
    lenLk=len(Lk)
    for i in range(lenLk):
        for j in range(i+1,lenLk): #比较Lk中的每一个元素与其他元素
            L1=list(Lk[i])[:k-2];L2=list(Lk[j])[:k-2]
            L1.sort();L2.sort()
            if L1==L2: #若前k-2项相同，则合并这两项
                retList.append(Lk[i]|Lk[j])
    return retList


# 主函数，由频繁项集以及对应的支持度，得到各条规则的置信度，选择置信度满足要求的规则为关联规则
def apriori(dataSet,minSupport=0.5):
    C1=createC1(dataSet)
    D=list(map(set,dataSet))
    L1,supportData=scanD(D,C1,minSupport)
    L=[L1]
    k=2
    while len(L[k-2])>0: #当L[k]为空时，停止迭代
        Ck=aprioriGen(L[k-2],k) #L[k-2]对应的值是Lk-1
        Lk,supK=scanD(D,Ck,minSupport)
        supportData.update(supK)
        L.append(Lk)
        k+=1
    return L,supportData

# 为了避免将所有数据都对比一遍，采用与上述相同的逻辑减少计算量——一层一层计算筛选
def generateRules(L,supportData,minConf=0.7):
    bigRuleList=[]
    for i in range(1,len(L)):
        for freqSet in L[i]:
            H1=[frozenset([item]) for item in freqSet] # H1是频繁项集单元素列表，是关联规则中a->b的b项
            if i>1:
                rulesFromConseq(freqSet,H1,supportData,bigRuleList,minConf)
            else:
                calConf(freqSet,H1,supportData,bigRuleList,minConf)
    return bigRuleList
# 置信度计算函数
def calConf(freqSet,H,supportData,brl,minConf=0.7):
    prunedH=[] # 用于存放置信度满足要求的关联规则的b项，即“提纯后的H”
    for conseq in H:
        conf=supportData[freqSet]/supportData[freqSet-conseq]
        if conf>=minConf:
            print (freqSet-conseq,'-->',conseq,'conf:',conf)
            brl.append([freqSet-conseq,conseq,conf])
            prunedH.append(conseq)
    return prunedH
# 关联规则合并函数
def rulesFromConseq(freqSet,H,supportData,brl,minConf=0.7):
    m=len(H[0])
    if len(freqSet)>(m+1): #查看频繁项集freqSet是否大到可以移除大小为m的子集
        Hmp1=aprioriGen(H,m+1) # 从Hm合并Hm+1
        Hmp1=calConf(freqSet,Hmp1,supportData,brl,minConf)
        if len(Hmp1)>1: #若合并后的Hm+1的元素大于1个，则继续合并
            rulesFromConseq(freqSet,Hmp1,supportData,brl,minConf)

#minSupport为支持度
#minConf为置信度
L,supportData=apriori(dataSet,minSupport=0.1)
rules=generateRules(L,supportData,minConf=0.1)

#导报实现关联规则

