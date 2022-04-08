import React, { Component } from "react";
import { Container, Table, Spinner, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { CSVLink } from "react-csv";


class Admin extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.backendBaseUrl = "http://localhost:5000";
        this.state = {
            isLoading: true,
            surveys: [],
            csvData: [],
        };
    }

    componentDidMount() {
        axios.get(this.backendBaseUrl + "/survey").then((resp) => {
            const surveys = resp.data;
            let tableData = [];

            for (let i = 0; i < surveys.length; i++) {
                const survey = surveys[i];
                let row = Array(37).fill("NA");
                for (let j = 0; j < survey.responses.length; j++) {
                    const response = survey.responses[j];
                    const code = response.question_code;
                    row[code.split("_")[1] - 1] = response.question_response;
                }
                tableData.push([survey.user_name, survey.survey_time, ...row]);
            }

            let head = [];
            for (let i = 1; i < 38; i++) {
                head.push(`mfq_${i}`);
            }
            const header = ["Username", "Time Taken", ...head];

            this.setState({ surveys: tableData, csvData: [header, ...tableData], isLoading: false });
        });
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <Container className="mt-5">
                    <h1>Survey Responses</h1>
                    <div className="d-flex mb-3">
                        <CSVLink
                            data={this.state.csvData}
                            filename={"survey_data.csv"}
                            target="_blank"
                            className="btn btn-primary ms-auto">
                            Download CSV
                        </CSVLink>
                    </div>
                    <Table responsive bordered hover striped>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Time Taken</th>
                                {Array.from({ length: 36 }).map((_, index) => (
                                    <th key={uuidv4()}>{`mfq_${index}`}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.surveys.map((row) => {
                                return (
                                    <tr>
                                        {row.map((element) => {
                                            return (
                                                <td style={{ minWidth: "150px" }} key={uuidv4()}>
                                                    {element}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Container>
            );
        } else {
            return (
                <Row className="justify-content-center mt-5">
                    <Col sm={12} md={6} className="d-flex justify-content-center">
                        <Spinner animation="border" role="status"></Spinner>
                    </Col>
                </Row>
            );
        }
    }
}

export default Admin;
