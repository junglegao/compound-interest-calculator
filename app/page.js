import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const CompoundInterestCalculator = () => {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [annualContribution, setAnnualContribution] = useState(5000);
  const [years, setYears] = useState(20);

  // 处理输入值，允许空字符串
  const handleNumberInput = (value, setter, defaultValue = 0) => {
    if (value === '') {
      setter('');
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setter(numValue);
      }
    }
  };

  // 获取有效的数值，空字符串时使用默认值
  const getValidNumber = (value, defaultValue = 0) => {
    return value === '' ? defaultValue : Number(value);
  };

  const data = useMemo(() => {
    const result = [];
    const validInitialAmount = getValidNumber(initialAmount, 10000);
    const validAnnualReturn = getValidNumber(annualReturn, 8);
    const validAnnualContribution = getValidNumber(annualContribution, 5000);
    const validYears = getValidNumber(years, 20);
    
    let totalAmount = validInitialAmount;
    let totalContributions = validInitialAmount;
    
    for (let year = 0; year <= validYears; year++) {
      if (year === 0) {
        result.push({
          year: year,
          totalAmount: totalAmount,
          totalContributions: totalContributions,
          totalEarnings: 0
        });
      } else {
        // 先计算收益
        totalAmount = totalAmount * (1 + validAnnualReturn / 100);
        // 年底追加投资
        totalAmount += validAnnualContribution;
        totalContributions += validAnnualContribution;
        
        result.push({
          year: year,
          totalAmount: Math.round(totalAmount),
          totalContributions: totalContributions,
          totalEarnings: Math.round(totalAmount - totalContributions)
        });
      }
    }
    
    return result;
  }, [initialAmount, annualReturn, annualContribution, years]);

  const finalData = data[data.length - 1];
  const returnMultiple = (finalData.totalEarnings / finalData.totalContributions).toFixed(2);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatTooltip = (value, name) => {
    if (name === '总资产') return [formatCurrency(value), '总资产'];
    if (name === '累计投入') return [formatCurrency(value), '累计投入'];
    if (name === '复利收益') return [formatCurrency(value), '复利收益'];
    return [value, name];
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <h1 className="text-3xl font-bold text-center mb-2">💰 复利魅力体验器</h1>
          <p className="text-center text-blue-100">体验时间与复利的神奇力量</p>
        </div>

        <div className="p-6">
          {/* 输入参数区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">启动资金 (元)</label>
              <input
                type="number"
                value={initialAmount}
                onChange={(e) => handleNumberInput(e.target.value, setInitialAmount, 10000)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                min="1000"
                step="1000"
                placeholder="请输入启动资金"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">年化收益率 (%)</label>
              <input
                type="number"
                value={annualReturn}
                onChange={(e) => handleNumberInput(e.target.value, setAnnualReturn, 8)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                min="0"
                max="50"
                step="0.5"
                placeholder="请输入年化收益率"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">年度追加投资 (元)</label>
              <input
                type="number"
                value={annualContribution}
                onChange={(e) => handleNumberInput(e.target.value, setAnnualContribution, 5000)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                min="0"
                step="1000"
                placeholder="请输入年度追加投资"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">投资年限</label>
              <input
                type="number"
                value={years}
                onChange={(e) => handleNumberInput(e.target.value, setYears, 20)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                min="1"
                max="50"
                placeholder="请输入投资年限"
              />
            </div>
          </div>

          {/* 关键指标卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
              <div className="text-sm opacity-90 mb-1">最终总资产</div>
              <div className="text-2xl font-bold">{formatCurrency(finalData.totalAmount)}</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
              <div className="text-sm opacity-90 mb-1">累计投入</div>
              <div className="text-2xl font-bold">{formatCurrency(finalData.totalContributions)}</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
              <div className="text-sm opacity-90 mb-1">复利收益</div>
              <div className="text-2xl font-bold">{formatCurrency(finalData.totalEarnings)}</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
              <div className="text-sm opacity-90 mb-1">收益倍数</div>
              <div className="text-2xl font-bold">{returnMultiple}x</div>
              <div className="text-xs opacity-75 mt-1">总收益/总投入</div>
            </div>
          </div>

          {/* 图表区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 资产增长趋势图 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">📈 资产增长趋势</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#666"
                    label={{ value: '年份', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    stroke="#666"
                    tickFormatter={(value) => `${(value/10000).toFixed(0)}万`}
                  />
                  <Tooltip 
                    formatter={formatTooltip}
                    labelFormatter={(label) => `第${label}年`}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="totalAmount" 
                    stroke="#10b981"
                    strokeWidth={3}
                    name="总资产"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalContributions" 
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="累计投入"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 资产构成分析 */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">📊 资产构成分析</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.filter(d => d.year % Math.max(1, Math.floor(years/10)) === 0)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#666"
                    label={{ value: '年份', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    stroke="#666"
                    tickFormatter={(value) => `${(value/10000).toFixed(0)}万`}
                  />
                  <Tooltip 
                    formatter={formatTooltip}
                    labelFormatter={(label) => `第${label}年`}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="totalContributions" 
                    stackId="a" 
                    fill="#3b82f6" 
                    name="累计投入"
                    radius={[0, 0, 4, 4]}
                  />
                  <Bar 
                    dataKey="totalEarnings" 
                    stackId="a" 
                    fill="#10b981" 
                    name="复利收益"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 复利效应说明 */}
          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
            <h3 className="text-lg font-semibold mb-3 text-indigo-800">✨ 复利效应分析</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <strong className="text-indigo-600">收益占比：</strong>
                {((finalData.totalEarnings / finalData.totalAmount) * 100).toFixed(1)}% 
                来自复利增长
              </div>
              <div>
                <strong className="text-indigo-600">年均增长：</strong>
                每年平均增长 {formatCurrency(finalData.totalAmount / years)}
              </div>
              <div>
                <strong className="text-indigo-600">投资回报：</strong>
                每投入1元，最终获得 {(finalData.totalAmount / finalData.totalContributions).toFixed(2)} 元
              </div>
              <div>
                <strong className="text-indigo-600">时间价值：</strong>
                {years} 年让您的初始资金增长了 {((finalData.totalAmount / initialAmount - 1) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;