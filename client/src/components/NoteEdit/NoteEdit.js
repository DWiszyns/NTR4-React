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
    const [chosenCategory, setChosenCategory] = React.useState('');
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
        if(newCategory!='')
        {
            if(categories.filter(c=>c.title===newCategory).length===0)
                setCategories(categories.concat({title: newCategory}))
        }
    }

    const chooseCategory = c =>{

    }

    const handleRemoveCategory = categoriesToRemove =>{
        if(categoriesToRemove==null || categoriesToRemove === undefined)
        {
            categoriesToRemove.forEach(element => {
                categories.remove(element)
            });
            if(categories.filter(c=>c.title===newCategory).length>0)
                setCategories(categories.concat({title: newCategory}))
        }
    }

    const handleOnSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/world', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();
        
        this.setState({ responseToPost: body });
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
                            <ListGroup.Item type="button" onClick={() => chooseCategory(title)} variant="outline-secondary"
                                            action key={title}>{title}</ListGroup.Item>
                        </Row>
                    ))}
                </ListGroup>
                <Button variant="outline-primary" onClick={handleRemoveCategory} title="Remove category">Remove category</Button>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting} title="Submit">Create note</Button>
        </Form>
        )}
    </Formik>
    );
};
export default withRouter(NoteEdit);
