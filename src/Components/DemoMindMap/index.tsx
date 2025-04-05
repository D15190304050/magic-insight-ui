import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { G6, MindMap } from '@ant-design/graphs';

const DemoMindMap: React.FC = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
            .then((res) => res.json())
            .then((res) => {
                const graphData = G6.treeToGraphData(res);
                setData(graphData);
            })
            .catch((err) => {
                console.error('Failed to fetch data:', err);
            });
    }, []);

    return (
        <div id="mindMapContainer" style={{ width: '100%', padding: '16px' }}>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="思维导图分析" style={{ backgroundColor: '#f0f2f5', borderRadius: '8px', height: '450px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            {data ? (
                                <MindMap
                                    autoFit="view"
                                    data={data}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            ) : (
                                <p style={{ color: '#999' }}>加载中...</p>
                            )}
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="AI 分析" style={{ backgroundColor: '#e6f7f3', borderRadius: '8px', height: '450px' }}>
                        <div style={{ color: '#52c41a', fontWeight: 'bold', marginBottom: '8px' }}>
                            AI 分析结果
                        </div>
                        <p>
                            思维导图展示了算法分类的层级结构。从图中可以看出，算法被分为多个类别，例如排序算法、搜索算法、图算法等。每个类别下还有更细粒度的子分类。
                        </p>
                        <p>
                            建议在实际应用中结合具体场景选择合适的算法类型。例如，在处理大数据时，可以优先考虑分布式算法；在优化问题中，可以尝试启发式算法。
                        </p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DemoMindMap;