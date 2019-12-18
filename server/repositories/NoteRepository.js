const path = require('path');
const directoryPath = path.join(__dirname, '../data');
const fs = require('fs');
const moment = require('moment');
const Enum = require('enum')


let Note = require('../models/Note');
fileExist = new Enum (['NO', 'MD', 'TXT'])

module.exports = class NoteRepository {


    constructor() {
        this.categories = []
    }

    findAll()
    {
        const files = fs.readdirSync(directoryPath);

        const notes = files.map(file => {
            return this.readFileToNote(file,false);
        });
        return {
            categories: this.categories.map(category => ({
                title: category,
            })),
            notes,
        };
    }

    findByTitle(title)
    {
        var markdown=true;
        switch (this.noteExists(title)) {
            case fileExist.MD:
                markdown = true;
                break;
            case fileExist.TXT:
                markdown = false;
                break;
            case fileExist.NO:
            default:
                throw Error(`Note '${title}' doesn\'t exists`)
        }
        let type = markdown ? '.md' : '.txt'
        return this.readFileToNote(title + type,true);

    }

    update(oldTitle, newNote)
    {
        if (oldTitle !== newNote.title && this.noteExists(newNote)!==fileExist.NO) {
            throw Error(`Note '${newNote.title}' already exists`);
        }
        this.delete(oldTitle);
        this.save(newNote);

    }

    save(note)
    {
        let lines = ''
        lines=lines.concat("category: ");
        for (var i = 0; i < note.noteCategories.length; ++i)
        {
            lines=lines.concat(note.noteCategories[i].title);
            if (i < note.noteCategories.length - 1)
            {
                lines=lines.concat(",");
            }
        }
        lines=lines.concat("\ndate: ");
        lines=lines.concat(note.date+ "\n");
        lines=lines.concat(note.text);
        let path = `${directoryPath}/${note.title}${note.markdown ? '.md':'.txt'}`;
        fs.writeFileSync(path,lines);

    }

    delete (title)
    {
        if (fs.existsSync(`${directoryPath}/${title}.txt`)) {
            fs.unlinkSync(`${directoryPath}/${title}.txt`);
        } else if (fs.existsSync(`${directoryPath}/${title}.md`)) {
            fs.unlinkSync(`${directoryPath}/${title}.md`);
        } else throw Error(`Error deleting note ${title}`);
    }

    noteExists(title)
    {
        if (fs.existsSync(path.join(directoryPath, (title + '.md'))))
            return fileExist.MD;
        else if (fs.existsSync(path.join(directoryPath, (title + '.txt'))))
            return fileExist.TXT;
        else return fileExist.NO;
    }

    readFileToNote(file,readText)
    {
        const note = new Note()
        const [title, extension] = file.split('.');
        note.title = title;
        note.markdown = extension === '.md'
        const fileContent = fs.readFileSync(directoryPath + '/' + file, 'utf-8');
        const lines = fileContent.split('\n');
        if(!readText){
            lines[0]
                .split(':')[1]
                .split(',')
                .forEach(category => {
                    category = category.trim();
                    if (category.length === 0) return;

                    if (!this.categories.includes(category)) {
                        this.categories.push(category);
                    }
                    note.noteCategories.push(category);
                });
        }
        else{
            lines[0]
                .split(':')[1]
                .split(',')
                .forEach(category => {
                    category = category.trim();
                    if (category.length === 0) return;
                    note.noteCategories.push({title:category});
                });

        }
        note.date = moment(lines[1].split(':')[1].trim()).format('YYYY-MM-DD');
        if(readText){
            for (var i = 2; i < lines.length; ++i)
                note.text += lines[i]
        }
        return note;
    }
};