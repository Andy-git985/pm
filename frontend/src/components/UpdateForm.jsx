import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { filterView } from '../reducers/filterReducer';
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import data from '../data';
import { removeNote, updateNote } from '../reducers/noteReducers';

const UpdateForm = () => {
  const dispatch = useDispatch();
  const view = useSelector(({ filter }) => filter.view);
  const notes = useSelector(({ notes }) => notes);
  const [note, setNote] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [folder, setFolder] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [progress, setProgress] = useState('');
  const [files, setFiles] = useState([]);
  const folders = data.folders;
  const priorityData = data.priority;
  const progressData = data.progress;

  useEffect(() => {
    if (view !== 'Note Form') {
      setNote(notes.find((note) => note.id === view));
    }
  }, [notes, view]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setFolder(note.folder);
      setDueDate(note.dueDate);
      setPriority(note.priority);
      setProgress(note.progress);
    }
    if (!note) {
      dispatch(filterView('Note Form'));
    }
  }, [note, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(typeof dueDate);
    // console.log({ title, content, folder, priority, progress });
    const updatedNote = { title, content, folder, priority, progress };
    dispatch(updateNote(note.id, updatedNote));
  };

  const handleDelete = (id) => {
    dispatch(removeNote(id));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="title">Title</InputLabel>
          <OutlinedInput
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
          />
        </FormControl>
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          label="Content"
          minRows={4}
          multiline
          fullWidth
        />
        <Autocomplete
          freeSolo
          options={folders}
          onChange={(event, values) => setFolder(values)}
          value={folder}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Folder"
              variant="outlined"
              onChange={(e) => setFolder(e.target.value)}
            />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Basic example"
            value={dueDate}
            onChange={(newValue) => {
              setDueDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <FormControl>
          <InputLabel>Priority</InputLabel>
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {priorityData.map((p, i) => (
              <MenuItem key={`priority-${p}-${i + 1}`} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Progress</InputLabel>
          <Select
            label="progress"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          >
            {progressData.map((p, i) => (
              <MenuItem key={`progress-${p.value}-${i + 1}`} value={p.value}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            hidden
            multiple
            onChange={(event) => {
              setFiles([]);
              let arr = [];
              for (const file of event.target.files) {
                arr.push({
                  preview: URL.createObjectURL(file),
                  data: file,
                });
              }
              setFiles(arr);
            }}
          />
        </Button>
        <Button type="submit" variant="contained">
          Update
        </Button>
      </form>

      <Button variant="contained" onClick={() => handleDelete(note.id)}>
        Delete
      </Button>
      <div>Title: {title}</div>
      <div>Content: {content}</div>
      <div>Folder: {folder}</div>
      <div>Due Date: {dueDate}</div>
      <div>Priority: {priority}</div>
      <div>Progress: {progress}</div>
    </>
  );
};

export default UpdateForm;
