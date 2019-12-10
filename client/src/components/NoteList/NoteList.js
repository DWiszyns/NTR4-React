import React,{Component} from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import moment, {Moment} from 'moment'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table'


const NoteList = props => {
    const dateFrom = props.dateFrom || moment(new Date()).format("YYYY-MM-DD");
    const dateTo = props.dateTo || moment(new Date()).format("YYYY-MM-DD");
    const category = props.category || 'first category';
    const handleSubmit = async e => {

    };
    const handleChange = async e => {

    };



    return(
        <div>
            <h1>Note's list</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Date</Form.Label><br/>
                    <Form.Control
                        type="date"
                        name="dateFrom"
                        onChange={handleChange}
                        value={dateFrom}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label><br/>
                    <Form.Control
                        type="date"
                        name="dateTo"
                        onChange={handleChange}
                        value={dateTo}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label><br/>
                    <Form.Control as="select" name="categories" value={{category}}>
                        <option>first category</option>
                        <option>second category</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" title="Submit">Filter</Button>
            </Form>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th></th>
                    </tr>
                </tbody>
            </Table>
             <Link to={'/notes/new'}>
                 <Button type="button" variant="primary" >New note</Button>
              </Link>
        </div>
)
}

export default withRouter(NoteList);
