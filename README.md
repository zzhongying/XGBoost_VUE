# Investigating the evolution of XGBoost in the Decision-Making Process of Android Malware Classification
## 1. Abstracy
With the increasing number of Android devices, labeling malicious apps which are variants of an existing family is important for identifying new threats and determining the severity of the threat. As an integrated algorithm in machine learning, XGBoost is an important means to extract behavior features of malware and predict attack types. Understanding the decision basis and analyzing the evolution process of decision tree are the key factors to improve security expert's recognition in the XGBoost model. In this paper, FP-Growth algorithm is used to extract the association rules among security features and the results of FP-Growth are used to explore the malware behavior. We use “central class” to analyze the trend of error samples, the matrix decomposition algorithm is used to assist the optimization of feature engineering. Inspired by interpretative visualization,integrating the feature matrix, decision bubble view and other visual components, we propose a visual analysis system, VISXGB, aiming at interpreting prediction process of XGBoost model.To demonstrate the effectiveness of our system, two usage scenarios and a qualitative user study are conducted. 

## 2.Inferface
![Inferface](https://github.com/zzhongying/XGBoost_VUE/blob/b79f123099451f2d637fb5335a4b0610f2b8acf1/img/system.png)
Fig. 1. The interface of VISXGB: A). Parameter console panel; B). Decision comparison view; C). Bubble view based on decision tree; D). Feature matrix
view; E). Sankey view based on positive and negative data; F). Bundle view based on matrix decomposition algorithm; G). Confusion matrix view; H). History
View;

### 3.Pipeline
VISXGB consists of eight components (Fig.1). There are six core parameters in the parameter console panel (Fig.1(A)), including learning rate, max depth, min child weight, gamma and subsample. The growth state of decision tree, output and computational cost are controlled by these core parameters. In default rendering, the parameter console presents the optimal solution of parameters and supports users to adjust values in a small range. Feature matrix view (Fig.1(D)) presents
the important features of all malware families. Bundle view (Fig.1(F)) compares the feature distribution between test set and train set. Historical record view (Fig.1(H)) reflect the relationship between parameters and performance indicators, the rectangle color in the view reflects the numerical changes of performance. The output results of the model are recorded in the confusion matrix view (Fig.1(G)) and the size of the values are mapped by color. By clicking the confusion matrix, the analysis target of the decision bubble view (Fig.1(C)) is changed to the selected malware. Data flow in the specified decision tree is presented in the sankey view (Fig.1(E)).
![pipeline](https://github.com/zzhongying/XGBoost_VUE/blob/b79f123099451f2d637fb5335a4b0610f2b8acf1/img/pipeline.png)

### 4.使用方式
运行后端的app文件后，在VUE项目的myapp文件夹下使用 npm run serve命令即可
