import { Link } from "react-router-dom";
import { 
    Container, 
    ButtonGroup, 
    Button, 
    Row,
    Col,
} from "react-bootstrap";

function HomePage() {
    return (
        <Container fluid={true} style={{height: "100vh"}}>
            <Row className="h-100 d-flex align-items-center">
                <Row>
                    <Col />
                    <Col className="d-flex justify-content-center">
                        <ButtonGroup>
                            <Link to={"/drawinst"}>
                                <Button>Отрисовать институт</Button>
                            </Link>
                        </ButtonGroup> 
                    </Col>
                    <Col />
                </Row>
            </Row>
        </Container>
    );
}

export default HomePage;