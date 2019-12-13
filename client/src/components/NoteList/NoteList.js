import React,{Component,useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import moment, {Moment} from 'moment'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
const API = 'http://localhost:5000/api';



const NoteList = props => {
    const [dateFrom,setDateFrom]= React.useState(props.dateFrom || moment(new Date().setMonth(2)).format("YYYY-MM-DD"));
    const [dateTo,setDateTo] = React.useState(props.dateTo || moment(new Date()).format("YYYY-MM-DD"));
    const [category,setCategory] = React.useState(props.category || '');
    const [page,setCurrentPage]= React.useState(props.page || 1);
    const [notes, setNotes] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [pager, setPager] = React.useState({});
    useEffect(() => {
        loadPage();
    },[dateFrom,dateTo,category,page]);

    const loadPage = () => {
        //const params = new URLSearchParams(location.search);
        axios
            .get(
                `${API}/notes?page=${page}&category=${category}&dateFrom=${dateFrom &&
                moment(dateFrom).format("YYYY-MM-DD")}&dateTo=${dateTo &&
                moment(dateTo).format("YYYY-MM-DD")}`
            )
            .then(res => res.data)
            .then(({ pager, pageOfNotes, categories }) => {
                setPager(pager);
                setNotes(pageOfNotes);
                setCategories(categories);
            });
    };

    const deleteNote = title => {
        axios
            .delete(`${API}/notes/${title}`)
            .then(res => {
                if (res.data === 'Success') {
                    setNotes(notes.filter(note => note.title !== title));
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

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

    const handleSubmit = async e => {
        loadPage()
    };



    return<div>
        <h1>Note's list</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Date</Form.Label><br/>
                <Form.Control
                    type="date"
                    name="dateFrom"
                    onChange={e => {
                        setDateFrom(e.target.value);
                    }}
                    value={dateFrom}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label><br/>
                <Form.Control
                    type="date"
                    name="dateTo"
                    onChange={e => {
                        setDateTo(e.target.value);
                    }}
                    value={dateTo}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Category</Form.Label><br/>
                <Form.Control as="select" name="categories"
                    onChange={e => {
                        setCategory(e.target.value);
                    }}
                    value={{category}}>
                    {categories.forEach(c => (
                            <option>c.title</option>
                        )
                    )}
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" title="Submit">Filter</Button>
        </Form>
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

export default withRouter(NoteList);
