import React from "react";
import ProblemList from "./ProblemList";
import Progress from "./Progress";
import { Row, Col, Container } from "react-bootstrap";

function Home() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <ProblemList />
        </Col>
        <Col md="3" lg="2">
          <Progress 
          solvedProblems={5}
          totalProblems={25}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
