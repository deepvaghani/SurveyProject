import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [surveys, setSurveys] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/surveyWithQuestions');
                const data = await response.json();

                if (Array.isArray(data)) {
                    const sortedSurveys = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    setSurveys(sortedSurveys);
                } else if (typeof data === 'object') {
                    setSurveys([data]);
                } else {
                    console.error('Surveys data is not an array or object:', data);
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching surveys:', error);
                setIsLoading(false);
            }
        };

        fetchSurveys();
    }, []);

    const handleViewSurvey = (surveyId) => {
        navigate(`/FindSurvey/${surveyId}`);
    };

    const handleViewSurveyReport = (surveyId) => {
        navigate(`/SurveyReport/${surveyId}`);
    };

    return (
        <Container className="homepage-container" style={{ marginLeft: '111px' }}>
            <h1 className="title" style={{ marginBottom: '40px', marginLeft: '350px' }}>Available Surveys</h1>
            {isLoading ? (
                <div className="text-center" style={{ marginLeft: '-250px', marginTop: '100px' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p style={{ marginLeft: '0px' }}>Loading Surveys...</p>
                </div>
            ) : (
                <Row className="survey-list">
                    {surveys.map((survey) => (
                        <Col key={survey._id} xs={12} sm={6} md={4} lg={3}>
                            <Card className="survey-card">
                                <Card.Body>
                                    <Card.Title>{survey.title}</Card.Title>
                                    <Card.Text>{survey.description}</Card.Text>
                                    <div className="button-group">
                                        <Button variant="primary" onClick={() => handleViewSurvey(survey._id)}>
                                            View Survey
                                        </Button>
                                        <Button variant="primary" onClick={() => handleViewSurveyReport(survey._id)}>
                                            Survey Report
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default HomePage;
