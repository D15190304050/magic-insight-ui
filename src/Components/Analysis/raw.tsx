import React from 'react';
import {Avatar, Card, Col, Row} from 'antd';
import Meta from "antd/es/card/Meta";

const Analysis: React.FC = () => {
    return <div style={{ padding: '16px',}}>
        <Card title="《复数的模》" headStyle={{ borderBottom: 'none',fontSize: '30px', textAlign: 'left',marginTop:'20px'}}>
            <div style={{ textAlign: 'left', marginBottom:'30px' }}>
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Card title"
                />
            </div>
            <Row gutter={16}>
                <Col span={12}>
                    <Card style={{  borderRadius: '8px', height: '250px'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginTop: '50px' }}>
                            <div>
                                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>43</span> 分钟
                                <p style={{ marginTop: '8px' }}>课堂时长</p>
                            </div>
                            <div>
                                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>35%</span>
                                <p style={{ marginTop: '8px' }}>教师行为</p>
                            </div >
                            <div>
                                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>65%</span>
                                <p style={{ marginTop: '8px' }}>学生行为</p>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card style={{ borderRadius: '8px', height: '250px' }}>
                        <div style={{ textAlign: 'left' }}>
                            <span style={{ fontSize: '15px', fontWeight: 'bold'}}>对话型授课</span>
                            <p style={{ color: '#666', marginTop: '8px',fontSize: '13px',textAlign: 'left' }}>
                                从Rt值0.50和Ch值0.45来看，本节课属于对话型课堂类型。对话型课堂的特点是教师与学生之间的互动适中，能有效促进学生的思考和参与，同时也能让教师根据学生的反馈进行适度引导。然而，过高的行为转换率可能导致课堂节奏的快速变化，影响学生对知识的深入理解和吸收。建议在今后的教学中，教师可以适当减少引导的频率和时间，给学生更多的思考和表达机会，如通过小组讨论或角色扮演，增强课堂的连贯性和深度。
                            </p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Card>
        <Card title="AI课程总览" extra={<a href="#">More</a>} headStyle={{ fontSize: '25px',borderBottom: 'none',marginTop:'20px', textAlign: 'left',color: '#1890ff', fontWeight: 'bold' }}>
            <div style={{padding:"0 0"}}>
                <p style={{ color: '#666',fontSize: '15px',textAlign: 'left' }}>
                    本节课主要讲解了复数的几何意义，包括负数和向量的对应关系，以及复数在复平面中的表示。课程中还介绍了复数的模，包括复数的绝对值、复数与原点的距离，以及复数之间的距离。此外，课程还讲解了复数的加法和乘法，以及复数的最大值和最小值。通过实例，学生理解了如何通过画图来计算复数的最大值和最小值，以及如何用代数方法来解决类似的问题。
                </p>
                <button style={{ backgroundColor: '#37a000', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>查看更多</button>
            </div>
        </Card>

    </div>
};
export default Analysis;