import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
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
import { removeNote } from '../reducers/noteReducers';

const UpdateForm = ({ note }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [folder, setFolder] = useState(note.folder);
  const [dueDate, setDueDate] = useState(note.dueDate);
  const [priority, setPriority] = useState(note.priority);
  const [progress, setProgress] = useState(note.progress);
  const [files, setFiles] = useState([]);
  const folders = data.folders;
  const priorityData = data.priority;
  const progressData = data.progress;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ title, content, folder, dueDate, priority, files });
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
        <FormControl>
          <InputLabel htmlFor="content">Content</InputLabel>
          <OutlinedInput
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            label="Content"
            multiline
            fullWidth
          />
        </FormControl>
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
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> */}
        <FormControl>
          <InputLabel>Priority</InputLabel>
          <Select label="Priority" value={priority}>
            {priorityData.map((p, i) => (
              <MenuItem key={`priority-${p}-${i + 1}`} value={p.toLowerCase()}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Progress</InputLabel>
          <Select label="progress" value={progress}>
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
