import React from 'react';
import { Card, Col, Row } from 'antd';

const DemoCard: React.FC = () => {
    return (
        <div id="mindMapContainer" style={{ width: '100%', padding: '16px' }}>
            <Row gutter={16}>
                <Col span={12}>
                    <Card title="讲授分析" style={{ backgroundColor: '#e6f7f3', borderRadius: '8px',height: '450px', }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div>
                                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>3.4</span> 字/秒
                                <p style={{ marginTop: '8px',color:'' }}>平均语速</p>
                            </div>
                            <div>
                                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>3370</span> 字
                                <p style={{ marginTop: '8px' }}>讲授字数</p>
                            </div>
                        </div>
                        <div style={{ color: '#52c41a', fontWeight: 'bold', marginBottom: '8px' }}>
                            AI分析
                        </div>
                        <p style={{textAlign: 'left'}}>
                            这是一个理想的授课语速。这个速度既不会让学生感觉压力过大，也不会让他们觉得无聊。适中的语速有助于学生更好地聆听和理解教师传达的信息。在这种节奏下，学生更容易跟上老师的思路，及时地做笔记，并在需要时提出问题。
                        </p>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="提问分析" style={{ backgroundColor: '#e6f7f3', borderRadius: '8px',height: '450px', }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div>
                                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>29</span> 次
                                <p style={{ marginTop: '8px' }}>核心提问</p>
                            </div>
                            <div>
                                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>5</span> 次
                                <p style={{ marginTop: '8px' }}>评价次数</p>
                            </div>
                        </div>
                        <div style={{ color: '#52c41a', fontWeight: 'bold', marginBottom: '8px', }}>
                            AI分析
                        </div>
                        <p style={{textAlign: 'left'}}>
                            一、教师需要进一步提高基于复数课的引导启发能力课堂中的引导启发应该注重逻辑性与启发性。在横向维度...                        </p>
                        <p style={{textAlign: 'left'}}>
                            二、关注不同层次学生的课堂参与和互动在引导类型上，建议增加“公式推导引导”拓展思考引导”和“创新探究引导”...                        </p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DemoCard;