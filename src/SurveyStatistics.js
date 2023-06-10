// SurveyStatistics.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SurveyStatistics = () => {
    const { surveyId } = useParams();
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/surveys/${surveyId}/statistics`, {
                    responseData: {
                        id: surveyId,
                    },
                });
                const data = await response.json();
                setStatistics(data);
            } catch (error) {
                console.error('Error fetching survey statistics:', error);
            }
        };

        fetchStatistics();
    }, [surveyId]);

    return (
        <Container className="mt-9" style={{ marginTop: '80px' }}>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center mb-4">Survey Statistics for Survey ID: {surveyId}</h2>
                    {statistics.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>Ratio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {statistics.map(({ questionText, ratios }) => (
                                    ratios.map(({ answer, ratio }) => (
                                        <tr key={`${questionText}-${answer}`}>
                                            <td>{questionText}</td>
                                            <td>{answer}</td>
                                            <td>{(ratio * 100).toFixed(2)}%</td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-center">No statistics available.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default SurveyStatistics;
