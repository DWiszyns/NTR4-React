let Note = require('../models/Note');
let NoteRepository = require('../repositories/NoteRepository');
let paginate = require('jw-paginate');
let moment = require('moment');

exports.get_notes = function(req, res) {
    let repo = new NoteRepository()
    let noteResponse= repo.findAll()
    var notes = noteResponse.notes.slice()
    let pageNumber = parseInt(req.query.page)||1
    let pageSize = 4
    if(req.query.category!=null && req.query.category!==''){
        notes=notes.filter(n=>n.noteCategories.includes(req.query.category))
    }
    if(req.query.dateFrom!=null){
        notes=notes.filter(n=>n.date>=req.query.dateFrom)
    }
    if(req.query.dateTo!=null){
        notes=notes.filter(n=>n.date<=req.query.dateTo)
    }
    const pager = paginate(notes.length, pageNumber, pageSize);
    pager.endPage = Math.ceil(notes.length / pageSize);
    const pageOfNotes = notes.splice(pager.startIndex, pageSize);

    res.send({ pager, notes:pageOfNotes, categories: noteResponse.categories });
};
exports.get_note = function(req, res) {
    let title = req.params.title
    let repo = new NoteRepository()
    let note= repo.findByTitle(req.params.title)
    res.send({data:note})
};

// exports.post_note = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author create GET');
// };
//
// exports.update_note = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author create POST');
// };
//
// exports.delete_note = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author delete GET');
// };