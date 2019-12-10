import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import moment, {Moment} from 'moment'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, withRouter } from 'react-router-dom';


const NoteEdit = props => {
    const title = props.title || 'Enter title';
    const text = props.content || 'Enter text';
    const markdown = props.markdown || false;
    const date = props.date || moment(new Date()).format("YYYY-MM-DD");
    const newCategory = '';
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const [removeEnabled, setRemoveEnabled] = React.useState(false);
    const [categories, setCategories] = React.useState(props.categories || [{id:0, title:'first category'},{id:1, title:'second category'}]);
    const [errorMessage, setErrorMessage] = React.useState('');


    const validate = values =>{
        const errors = {};
        if (!values.title) {
        errors.title = 'Title is Required';
        }
        return errors;
    }

    const handleAddCategory = newCategory =>{
        if(newCategory!=='')
        {
            if(categories.filter(c=>c.title===newCategory).length===0)
                setCategories(categories.concat({title: newCategory}))
        }
    }

    const selectCategory = c =>{
        setSelectedCategory(c)

    }

    const handleRemoveCategory = e =>{
        if(selectedCategory!=null || selectedCategory !== undefined)
        {
            setCategories(categories.filter(c=>c.title!==selectedCategory))
        }
    }

    const handleOnSubmit = async e => {
      };

    return(
    <Formik
        initialValues={{ title, text, date, markdown, categories, newCategory }}
        validate={validate}
        onSubmit={handleOnSubmit}
    >
        {({ handleChange, validate, values, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label><br/>
                <Form.Control
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                  />
            </Form.Group>
            <Form.Group>
                <Form.Label>Text</Form.Label><br/>
                <Form.Control
                    type="text"
                    name="text"
                    onChange={handleChange}
                    value={values.text}
                  />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label><br/>
                <Form.Control
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={values.date}
                />
            </Form.Group>
            <Form.Check controlId="formNoteMarkdown">
                <Form.Check.Input
                    type="checkbox"
                    name="markdown"
                    checked={values.markdown}
                    onChange={handleChange}
                    value={values.markdown}
                  />
                <Form.Label>Markdown</Form.Label>
            </Form.Check>
            <Form.Group>
                <Form.Label>New category</Form.Label><br/>
                <Form.Control
                        type="text"
                        name="newCategory"
                        onChange={handleChange}
                        value={values.newCategory}
                    />
                <Button variant="outline-primary" onClick={() => { handleAddCategory(values.newCategory); values.newCategory = ''; }}
                        title="Add category">Add category</Button>
            </Form.Group>
            <Form.Group>
                <Form.Label>Note's categories</Form.Label><br/>
                <ListGroup>
                    {categories.map(({title}) => (
                        <Row>
                            <ListGroup.Item type="button" onClick={() => selectCategory(title)} variant="outline-secondary"
                                            action key={title}>{title}</ListGroup.Item>
                        </Row>
                    ))}
                </ListGroup>
                <Button variant="outline-primary" onClick={handleRemoveCategory} title="Remove category">Remove category</Button>
            </Form.Group>
            <Button variant="primary" type="submit" title="Submit">Create note</Button>
        </Form>
        )}
    </Formik>
    );
};
export default withRouter(NoteEdit);
