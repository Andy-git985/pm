import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createNote } from '../reducers/noteReducers';
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
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
  const [files, setFiles] = useState([]);
  const folders = data.folders;
  const priority = data.priority;
  const progress = data.progress;

  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
      folder: '',
      dueDate: null,
      priority: '',
      progress: 'todo',
      files: [],
    },
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNote(content));
  };

  const onSubmit = (data) => {
    dispatch(createNote(data));
  };

  const handleClick = (id) => {
    dispatch(removeNote(id));
  };

  return (
    <>
      <div>
        <h2>{note.title}</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form">
          <TextField
            label="Title"
            multiline
            defaultValue={note.title}
            {...register('title')}
          />
          <div>
            <TextField
              fullWidth
              multiline
              placeholder={note.content}
              defaultValue={note.content}
              style={{ width: '100%', outline: 'none', resize: 'none' }}
              {...register('content')}
            />
          </div>
          {/* <div>
            <TextareaAutosize
              aria-label="maximum height"
              placeholder={note.content}
              defaultValue={note.content}
              style={{ width: '100%', outline: 'none', resize: 'none' }}
              {...register('content')}
            />
          </div> */}
          <Controller
            control={control}
            name="folder"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                freeSolo
                options={folders}
                onChange={(event, values) => onChange(values)}
                value={value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Folders"
                    variant="outlined"
                    onChange={onChange}
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="dueDate"
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  value={value}
                  onChange={onChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="priority"
            render={({ field }) => (
              <>
                <FormControl>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    {...field}
                    label="priority"
                    defaultValue={note.priority}
                    sx={{ width: 150 }}
                  >
                    {priority.map((p, i) => (
                      <MenuItem
                        key={`priority-${p}-${i + 1}`}
                        value={p.toLowerCase()}
                      >
                        {p}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            control={control}
            defaultValue={note.priority}
          />
          <Controller
            name="progress"
            render={({ field }) => (
              <>
                <FormControl>
                  <InputLabel>Progress</InputLabel>
                  <Select {...field} label="progress">
                    {progress.map((p, i) => (
                      <MenuItem
                        key={`progress-${p.value}-${i + 1}`}
                        value={p.value}
                      >
                        {p.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            control={control}
            defaultValue={note.progress}
          />
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              multiple
              {...register('files')}
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
                register('files').onChange(event);
              }}
            />
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </form>
        <div>Title: {note.title}</div>
        <div>Content: {note.content}</div>
        <div>Folder: {note.folder}</div>
        <div>Due Date: {note.dueDate}</div>
        <div>Priority: {note.priority}</div>
      </div>
    </>
  );
};

export default UpdateForm;
