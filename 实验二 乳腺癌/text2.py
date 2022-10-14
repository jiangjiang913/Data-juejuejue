# -*- coding: utf-8 -*-
"""
Created on Sat Oct  9 14:06:16 2021

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

#k-means
from sklearn.cluster import KMeans
from sklearn import metrics
from mpl_toolkits.mplot3d import Axes3D
plt.rcParams['font.sans-serif']=['SimHei'] #用来正常显示中文标签
plt.rcParams['axes.unicode_minus']=False #用来正常显示负号

#k-medoid

from matplotlib import pyplot
from pyclust import KMedoids
from sklearn.manifold import TSNE

#层次聚类
from scipy.spatial.distance import pdist,squareform
from scipy.cluster.hierarchy import linkage
from scipy.cluster.hierarchy import dendrogram
from sklearn.cluster import AgglomerativeClustering

plt.rcParams['font.sans-serif']=['SimHei'] #用来正常显示中文标签
plt.rcParams['axes.unicode_minus']=False #用来正常显示负号

#SOM
from sklearn.model_selection import train_test_split
from minisom import MiniSom
import math
# 导入数据集
#查看数据
data = pd.read_csv('D:\数据挖掘\实验二\wdbc.csv')
data.info()
print(data.describe())

#%matplotlib inline
import matplotlib.pyplot as plt
plt.style.use('seaborn')

import seaborn as sns
sns.set_style("whitegrid")

#数据探索
l1 = [' radius','texture','perimeter','area','smoothness','compactness','concavity','concave points','symmetry','fractal dimension']
l2 = [' radius.1','texture.1','perimeter.1','area.1','smoothness.1','compactness.1','concavity.1','concave points.1','symmetry.1','fractal dimension.1']
l3 = [' radius.2','texture.2','perimeter.2','area.2','smoothness.2','compactness.2','concavity.2','concave points.2','symmetry.2','fractal dimension.2']
data1 = data[['ID','diagnosis',' radius','texture','perimeter','area','smoothness','compactness','concavity','concave points','symmetry','fractal dimension']]
data2 = data[['ID','diagnosis',' radius.1','texture.1','perimeter.1','area.1','smoothness.1','compactness.1','concavity.1','concave points.1','symmetry.1','fractal dimension.1']]
data3 = data[['ID','diagnosis',' radius.2','texture.2','perimeter.2','area.2','smoothness.2','compactness.2','concavity.2','concave points.2','symmetry.2','fractal dimension.2']] 
#各特征值与结果的关系
# 设置颜色主题
antV = ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436c7', '#F04864'] 
#生成各特征之间的关系矩阵图
g = sns.pairplot(data=data1, palette=antV)
f = sns.pairplot(data=data2, palette=antV)
k = sns.pairplot(data=data3, palette=antV)
# 查看特征间的相关性
#总特征相关系数图
pearson_mat = data.corr(method='spearman')
plt.figure(figsize=(15,15))
ax = sns.heatmap(pearson_mat,square=True,annot=True,cmap='YlGnBu')
bottom, top = ax.get_ylim()
ax.set_ylim(bottom + 0.5, top - 0.5)
plt.show()
#data1
pearson_mat = data1.corr(method='spearman')
plt.figure(figsize=(15,15))
ax = sns.heatmap(pearson_mat,square=True,annot=True,cmap='Purples')
bottom, top = ax.get_ylim()
ax.set_ylim(bottom + 0.5, top - 0.5)
plt.show()
#data2
pearson_mat = data2.corr(method='spearman')
plt.figure(figsize=(15,15))
ax = sns.heatmap(pearson_mat,square=True,annot=True,cmap='OrRd')
bottom, top = ax.get_ylim()
ax.set_ylim(bottom + 0.5, top - 0.5)
plt.show()
#data3
pearson_mat = data3.corr(method='spearman')
plt.figure(figsize=(15,15))
ax = sns.heatmap(pearson_mat,square=True,annot=True,cmap='Greens')
bottom, top = ax.get_ylim()
ax.set_ylim(bottom + 0.5, top - 0.5)
plt.show()
#数据预处理
#缺失值处理
# 按列统计零的值
num_missing = (data == 0).astype(int).sum(axis=0)
# 输出结果
print(num_missing)
#标记缺失值
data = data.replace(0, nan)
#处理缺失值少的特征值删除这两列中缺失值对应的行数
data_new = data.dropna(axis=0,subset = ["concavity", "concave points"])
num_missing_new = (data_new == 0).astype(int).sum(axis=0)
print(num_missing_new)
#查看异常值
#data1
numeric_columns = []
object_columns = []
for c in data1.columns[0:-1]:
    if data1[c].dtype == 'object':
        object_columns.append(c)
    else:
        numeric_columns.append(c)
fig = plt.figure(figsize=(20,20))
for i,col in enumerate(numeric_columns):
    ax = fig.add_subplot(5,3,i+1)
    sns.boxplot(data1[col],orient='v',ax=ax)
    plt.xlabel(col)
plt.show()
#data2 
numeric_columns = []
object_columns = []
for c in data2.columns[0:-1]:
    if data2[c].dtype == 'object':
        object_columns.append(c)
    else:
        numeric_columns.append(c)
fig = plt.figure(figsize=(20,20))
for i,col in enumerate(numeric_columns):
    ax = fig.add_subplot(5,3,i+1)
    sns.boxplot(data2[col],orient='v',ax=ax)
    plt.xlabel(col)
plt.show()
#data3
numeric_columns = []
object_columns = []
for c in data3.columns[0:-1]:
    if data3[c].dtype == 'object':
        object_columns.append(c)
    else:
        numeric_columns.append(c)
fig = plt.figure(figsize=(20,20))
for i,col in enumerate(numeric_columns):
    ax = fig.add_subplot(5,3,i+1)
    sns.boxplot(data3[col],orient='v',ax=ax)
    plt.xlabel(col)
plt.show()
#处理相关值
#删除特征值
data_new0 = data_new.drop([' radius','area','compactness','concave points',' radius.1','area.1','compactness.1','concave points.1',' radius.2','area.2','compactness.2','concave points.2'],axis=1,inplace=True)
data1 = data[['ID','diagnosis','texture','perimeter','smoothness','concavity','symmetry','fractal dimension']]
data2 = data[['ID','diagnosis','texture.1','perimeter.1','smoothness.1','concavity.1','symmetry.1','fractal dimension.1']]
data3 = data[['ID','diagnosis','texture.2','perimeter.2','smoothness.2','concavity.2','symmetry.2','fractal dimension.2']] 

#k-means
#将ID,diagnosis两列与数据类型不合的特征值删去
#可视化
data_new1 = data_new.drop(['ID','diagnosis'],axis=1)
#将处理好的数据写入data_new2，所有聚类都使用data_new2数据集
data_new2 = pd.read_csv('D:\数据挖掘\实验二\data_new2.csv')
#寻找合适的K值
sse = []
for i in range(1,11): # 循环使用不同k测试结果
    kmeans = KMeans(n_clusters = i, init = 'k-means++', random_state = 42)
    kmeans.fit(data_new2)
    sse.append(kmeans.inertia_)  # kmeans.inertia_是每类数据到其中心点的距离之和。值越小，聚类越好。类别越多，k越大，值越小。

plt.plot(range(1,11), sse)
plt.title('The Elbow Method')
plt.xlabel('Number of clusters')
plt.ylabel('SSE')
plt.show()

#k值设为2
estimator = KMeans(n_clusters=2)#构造聚类器
estimator.fit(data_new2)#聚类
y = estimator.fit_predict(data_new2)
label_pred = estimator.labels_ #获取聚类标签
centroids = estimator.cluster_centers_ #获取聚类中心
inertia = estimator.inertia_ # 获取聚类准则的总和
#查看聚类效果
metrics.calinski_harabasz_score(data_new2,y)

#k值设为3
estimator = KMeans(n_clusters=3)#构造聚类器
estimator.fit(data_new2)#聚类
y = estimator.fit_predict(data_new2)
label_pred = estimator.labels_ #获取聚类标签
centroids = estimator.cluster_centers_ #获取聚类中心
inertia = estimator.inertia_ # 获取聚类准则的总和
metrics.calinski_harabasz_score(data_new2,y)
#结果
#输出原数据及类别
e=pd.concat([data_new2,pd.Series(label_pred,index=data_new2.index)],axis=1)
e.columns=list(data_new2.columns)+['result']
#可视化
#雷达图
'''
未完成
labers = estimator.labels_.tolist()
newdata = pd.DataFrame(labers,index = [labers])
columns = ['rank', 'title', 'cluster', 'genre']
newdata [0].value_counts()
'''
#3D图
labels = estimator.labels_
fig = plt.figure(1, figsize=(10, 10))
ax = Axes3D(fig, rect=[0, 0, .95, 1], elev=48, azim=134)
ax.scatter(data_new2.values[:, 1], data_new2.values[:, 0],data_new2.values[:, 3], c= labels.astype(np.float))
ax.w_xaxis.set_ticklabels([])
ax.w_yaxis.set_ticklabels([])
ax.w_zaxis.set_ticklabels([])
ax.set_xlabel('凹度')
ax.set_ylabel('平滑度')
ax.set_zlabel('纹理')
ax.set_title("3类")
ax.dist = 12
plt.show()

#k- medoids聚类
#准备可视化需要的降维数据
data_TSNE = TSNE(learning_rate=10).fit_transform(data_new2)
data_TSNE
#对不同的k进行试探性K-medoids聚类并可视化
data_new2 = pd.read_csv('D:\数据挖掘\实验二\data_new2.csv')
plt.figure(figsize=(12,8))
for i in range(2,6):
    k = KMedoids(n_clusters=i,distance='euclidean',max_iter=1000).fit_predict(data_new2.values)
    colors = ([['red','blue','black','yellow','green'][i] for i in k])
    plt.subplot(219+i)
    plt.scatter(data_TSNE[:,0],data_TSNE[:,1],c=colors,s=10)
    plt.title('K-medoids Resul of '.format(str(i)))
#结果
#输出原数据及类别
k = KMedoids(n_clusters=3,distance='euclidean',max_iter=1000).fit_predict(data_new2.values)
i=pd.concat([data_new2,pd.Series(k,index=data_new2.index)],axis=1)
i.columns=list(data_new2.columns)+['result']
i
#层次聚类
#标准化
data_new2 = pd.read_csv('D:\数据挖掘\实验二\data_new2.csv')
a=round(
    (data_new2-data_new2.min())/(data_new2.min()),
    3)
k=3 
model=AgglomerativeClustering(n_clusters=k,linkage='ward')
model.fit(a)
#结果
#输出原数据及类别
r=pd.concat([data_new2,pd.Series(model.labels_,index=data_new2.index)],axis=1)
r.columns=list(data_new2.columns)+['result']
#聚类可视化
plt.figure(figsize=(20,6))
Z = linkage(a, method='ward', metric='euclidean')
p = dendrogram(Z)
plt.show()
 
'''
#未完成
style=['ro-','go-','bo-']
xlabels= ['texture','perimeter','smoothness','concavity','symmetry','fractal dimension']
for i in range(k): #注意作图、做出不同样式
    
    plt.figure()
    
    tmp=r[r[u'result']==i].iloc[:,:4] # 提取每一类
    
    for j in range(len(tmp)):
        
        plt.plot(range(1,5),tmp.iloc[j],style[i])
        
    plt.xticks(range(1,5),xlabels,rotation=20) #坐标标签
    plt.subplots_adjust(bottom=0.15) # 调整底部
'''
#SOM
data = data_new2 = pd.read_csv('D:\数据挖掘\实验二\data_new2.csv')
# 数据规范化
data = (data - np.mean(data, axis=0)) / np.std(data, axis=0)
data = data.values

# 初始化和训练
som_shape = (1, 3)
som = MiniSom(som_shape[0], som_shape[1], data.shape[1], sigma=.5, learning_rate=.5,
              neighborhood_function='gaussian', random_seed=10)

som.train_batch(data, 500, verbose=True)

# 每个神经元代表一个簇
winner_coordinates = np.array([som.winner(x) for x in data]).T
#利用np.ravel_多重指数，我们将二维
#一维索引的坐标
cluster_index = np.ravel_multi_index(winner_coordinates, som_shape)
#结果
#输出原数据及类别
o=pd.concat([data_new2,pd.Series(cluster_index,index=data_new2.index)],axis=1)
o.columns=list(data_new2.columns)+['result']
o
# #使用data的前2个维度对簇进行一维索引绘制的坐标
for c in np.unique(cluster_index):
    plt.scatter(data[cluster_index == c, 0],
                data[cluster_index == c, 1], label='cluster='+str(c), alpha=.7)

#绘制中心点
for centroid in som.get_weights():
    plt.scatter(centroid[:, 0], centroid[:, 1], marker='x', 
                s=30, linewidths=35, color='k', label='centroid')
plt.legend()
