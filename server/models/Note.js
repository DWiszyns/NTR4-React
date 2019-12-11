module.exports = class NoteRepository {
    constructor(notecategories,markdown,text,title,date) {
        this.noteCategories = notecategories||[];
        this.markdown = markdown||false;
        this.text = text||''
        this.title = title||''
        this.date = date||'';
    }
}