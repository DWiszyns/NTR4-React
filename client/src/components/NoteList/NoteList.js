import React,{Component,useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import moment, {Moment} from 'moment'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import { Formik } from 'formik'
const API = 'http://localhost:5000/api';




class NoteList extends  Component {
    constructor(props) {
        super(props)
        const [dateFrom, setDateFrom] = React.useState(props.dateFrom || moment(new Date().setMonth(2)).format("YYYY-MM-DD"));
        const [dateTo, setDateTo] = React.useState(props.dateTo || moment(new Date()).format("YYYY-MM-DD"));
        const [category, setCategory] = React.useState(props.category || '');
        const [page, setCurrentPage] = React.useState(props.page || 1);
        const [notes, setNotes] = React.useState([]);
        const [categories, setCategories] = React.useState([]);
        const [pager, setPager] = React.useState({});
    }

    loadPage(){
        const params = new URLSearchParams(window.location.search);
        console.log("I'm called")
        console.log(`${API}/notes?page=${page}&category=${category}&dateFrom=${dateFrom &&
                moment(dateFrom).format("YYYY-MM-DD")}&dateTo=${dateTo &&
                moment(dateTo).format("YYYY-MM-DD")}`)
        let respon
        axios
            .get(
                `${API}/notes?page=${page}&category=${category}&dateFrom=${dateFrom &&
                moment(dateFrom).format("YYYY-MM-DD")}&dateTo=${dateTo &&
                moment(dateTo).format("YYYY-MM-DD")}`
            )
            .then(res => respon=res.data)
            .then(({ pager, pageOfNotes, categories }) => {
                setPager(pager);
                setNotes(pageOfNotes);
                setCategories(categories);
            });
        console.log(pager)
        console.log(notes)
        console.log(categories)
        console.log(respon)
    };
    componentDidMount(){
        console.log("I'm called")
        this.loadPage();
    }

    // const deleteNote = title => {
    //     axios
    //         .delete(`${API}/notes/${title}`)
    //         .then(res => {
    //             if (res.data === 'Success') {
    //                 setNotes(notes.filter(note => note.title !== title));
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };

    const setPage = page => {
        // dispatch({
        //     type: 'changePage',
        //     newPage: page,
        // });
    };

    const setFilters = (newCategory, newStartDate, newEndDate) => {
        // dispatch({
        //     type: 'changeCategoryFilter',
        //     newCategory: newCategory,
        // });
        // dispatch({
        //     type: 'changeStartDate',
        //     newStartDate: newStartDate,
        // });
        // dispatch({
        //     type: 'changeEndDate',
        //     newEndDate: newEndDate,
        // });
    };

    handleOnSubmit (e ) {
        this.loadPage()
    };


    render(){
        return <div>
            {console.log('I render')}
            <h1>Note's list</h1>
            <Formik
                enableReinitialize
                initialValues={{this.dateFrom, this.dateTo, this.category, page, notes, categories}}
                onSubmit={this.handleOnSubmit}
            >
                {({
                      values,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Date</Form.Label><br/>
                            <Form.Control
                                type="date"
                                name="dateFrom"
                                onChange={e => {
                                    handleChange(e);
                                    setDateFrom(e.target.value);
                                }}
                                value={values.dateFrom}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label><br/>
                            <Form.Control
                                type="date"
                                name="dateTo"
                                onChange={e => {
                                    handleChange(e);
                                    setDateTo(e.target.value);
                                }}
                                value={values.dateTo}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label><br/>
                            <Form.Control as="select" name="categories"
                                          onChange={e => {
                                              handleChange(e);
                                              setCategory(e.target.value);
                                          }}
                                          value={values.category}>
                                {values.categories.forEach(c => (
                                        <option>c.title</option>
                                    )
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" title="Submit">Filter</Button>
                    </Form>)}
            </Formik>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {notes.forEach(n => (
                        <tr>
                            <td>{n.title}</td>
                            <td>{n.date}</td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>

            <Link to={'/notes/new'}>
                <Button type="button" variant="primary">New note</Button>
            </Link>
        </div>
    }
}

export default withRouter(NoteList);
