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
            if(categories.filter(c=>c.title===newCategory).length>0)
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

    const handleSubmit = async e => {
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
        onSubmit={handleSubmit}
    >
        {({ handleChange, validate, values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                  />
            </Form.Group>
            <Form.Group>
                <Form.Label>Text</Form.Label>
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
                <Form.Label>New category</Form.Label>
                <Form.Control
                        type="text"
                        name="newCategory"
                        onChange={handleChange}
                        value={values.text}
                    />
                <Button onPress={handleAddCategory} title="Add category" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Note's categories</Form.Label>
                <ListGroup>
                    {categories.map(({title}) => (
                        <ListGroup.Item type="button" onClick={() => chooseCategory(title)} action key={title}>{title}</ListGroup.Item>
                    ))}
                </ListGroup>
                <Button onPress={handleRemoveCategory} title="Remove category" />
            </Form.Group>
            <Button onPress={handleSubmit} title="Submit" />
        </Form>
        )}
    </Formik>
    );
};
export default withRouter(NoteEdit);
