import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import dayjs from "dayjs";

class Survey extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            response: {},
            isLoading: true,
            questions: [],
            formStart: 0,
            submitted: false,
        };

        this.backendBaseUrl = "http://localhost:5000";
        this.onValueChange = this.onValueChange.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const questions = [];
        axios.get(this.backendBaseUrl + "/question", { params: { noOfQuestions: 10 } }).then((resp) => {
            const response = resp.data;
            for (let i = 0; i < response.length; i++) {
                const question = {
                    question_text: "",
                    question_code: "",
                };
                question.question_text = response[i].question_text;
                question.question_code = response[i].question_code;
                questions.push(question);
            }
            this.setState({ questions, isLoading: false, formStart: dayjs() });
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const minsDiff = dayjs().diff(this.state.formStart, "s");
        console.log(this.state.response);
        let responses = [];

        for (const question_code in this.state.response) {
            const question_response = this.state.response[question_code];
            responses.push({ question_code: question_code, question_response: question_response });
        }

        const data = { user_name: this.state.username, survey_time: minsDiff, responses: responses };

        axios.post(this.backendBaseUrl + "/survey/add", data).then((resp) => {
            console.log(resp);
            this.setState({ submitted: true });
        });
    }

    checkThis(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        return this.state.response[name] === value;
    }

    onValueChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        const response = this.state.response;
        response[name] = value;
        this.setState({ response });
    }

    render() {
        if (!this.state.isLoading && !this.state.submitted) {
            const questions = this.state.questions.map((question, index) => (
                <Col sm={12} md={6} key={question.question_code} className="my-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>Question No. {index + 1}</Card.Title>
                            <Card.Text>{question.question_text}</Card.Text>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Form.Check
                                        type="radio"
                                        name={question.question_code}
                                        id={`${question.question_code}_Strongly_Disagree`}
                                        label="Strongly Disagree"
                                        value="Strongly Disagree"
                                        checked={this.state.response[question.question_code] === "Strongly Disagree"}
                                        onChange={this.onValueChange}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check
                                        type="radio"
                                        name={question.question_code}
                                        id={`${question.question_code}_Disagree`}
                                        label="Disagree"
                                        value="Disagree"
                                        checked={this.state.response[question.question_code] === "Disagree"}
                                        onChange={this.onValueChange}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check
                                        type="radio"
                                        name={question.question_code}
                                        id={`${question.question_code}_Slightly_Disagree`}
                                        label="Slightly Disagree"
                                        value="Slightly Disagree"
                                        checked={this.state.response[question.question_code] === "Slightly Disagree"}
                                        onChange={this.onValueChange}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check
                                        type="radio"
                                        name={question.question_code}
                                        id={`${question.question_code}_Netural`}
                                        label="Netural"
                                        value="Netural"
                                        checked={this.state.response[question.question_code] === "Netural"}
                                        onChange={this.onValueChange}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check
                                        type="radio"
                                        name={question.question_code}
                                        id={`${question.question_code}_Slightly_Agree`}
                                        label="Slightly Agree"
                                        value="Slightly Agree"
                                        checked={this.state.response[question.question_code] === "Slightly Agree"}
                                        onChange={this.onValueChange}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check
                                        type="radio"
                                        name={question.question_code}
                                        id={`${question.question_code}_Agree`}
                                        label="Agree"
                                        value="Agree"
                                        checked={this.state.response[question.question_code] === "Agree"}
                                        onChange={this.onValueChange}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check
                                        type="radio"
                                        name={question.question_code}
                                        id={`${question.question_code}_Strongly_Agree`}
                                        label="Strongly Agree"
                                        value="Strongly Agree"
                                        checked={this.state.response[question.question_code] === "Strongly Agree"}
                                        onChange={this.onValueChange}
                                    />
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            ));
            return (
                <Container>
                    <Form onSubmit={this.onSubmit}>
                        <Row className="justify-content-center mt-5">
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter you name"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-center mt-3">{questions}</Row>
                        <div className="d-grid gap-2 mt-3 mb-5">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Container>
            );
        } else if (this.state.isLoading) {
            return (
                <Row className="justify-content-center mt-5">
                    <Col sm={12} md={6} className="d-flex justify-content-center">
                        <Spinner animation="border" role="status"></Spinner>
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row className="justify-content-center mt-5">
                    <Col sm={12} md={6} className="d-flex justify-content-center">
                        <Card>
                            <Card.Body>
                                <Card.Title>Thank you for submitting form!</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            );
        }
    }
}

export default Survey;
