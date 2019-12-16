// import React from 'react';
// import axios from 'axios';
// import NoteEdit from '../components/NoteEdit/NoteEdit'
// import moment from "../components/NoteList/NoteList";
//
// const API = 'http://localhost:5000/api';
//
// const NoteContainer = props => {
//     const [notes, setNotes] = React.useState([]);
//     const [categories, setCategories] = React.useState([]);
//     const [pager, setPager] = React.useState({});
//     const [{ page, category, startDate, endDate }, dispatch] = useStateValue();
//
//     React.useEffect(() => {
//         loadPage();
//     }, [category, startDate, endDate, page]);
//
//     const loadPage = () => {
//         const params = new URLSearchParams(location.search);
//         axios
//             .get(
//                 `${API}/notes?page=${page}&category=${category ||
//                 'All'}&startDate=${startDate &&
//                 startDate.format(DATE_FORMAT)}&endDate=${endDate &&
//                 endDate.format(DATE_FORMAT)}`
//             )
//             .then(res => res.data)
//             .then(({ pager, pageOfNotes, categories }) => {
//                 setPager(pager);
//                 setNotes(pageOfNotes);
//                 setCategories(categories);
//             });
//     };
//
//     const deleteNote = title => {
//         axios
//             .delete(`${API}/notes/${title}`)
//             .then(res => {
//                 if (res.data === 'Success') {
//                     setNotes(notes.filter(note => note.title !== title));
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     };
//
//     const setPage = page => {
//         dispatch({
//             type: 'changePage',
//             newPage: page,
//         });
//     };
//
//     const setFilters = (newCategory, newStartDate, newEndDate) => {
//         dispatch({
//             type: 'changeCategoryFilter',
//             newCategory: newCategory,
//         });
//         dispatch({
//             type: 'changeStartDate',
//             newStartDate: newStartDate,
//         });
//         dispatch({
//             type: 'changeEndDate',
//             newEndDate: newEndDate,
//         });
//     };
//
//     return (
//         <div>
//             <NoteFilters
//                 style={{ marginTop: '20px' }}
//                 notes={notes}
//                 categories={categories}
//                 setFilters={setFilters}
//                 category={category}
//                 startDate={startDate}
//                 endDate={endDate}
//             />
//             {notes ? (
//                 <NotesList
//                     pager={pager}
//                     setPage={setPage}
//                     notes={notes}
//                     deleteNote={deleteNote}
//                 />
//             ) : (
//                 <Spinner animation="border" role="status">
//                     <span className="sr-only">Loading...</span>
//                 </Spinner>
//             )}
//         </div>
//     );
// };
//
// export default NotesContainer;
