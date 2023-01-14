import { useState } from 'react';
import { useDispatch } from 'react-redux';
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

const NoteForm = () => {
  const folders = ['Personal', 'Work', 'Fitness'];
  const priority = ['Low', 'Medium', 'High'];
  const progress = ['Todo', 'Doing', 'Done'];
  const [files, setFiles] = useState([]);

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
      dueDate: '',
      priority: '',
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
    // console.log(data.dueDate['$d']);
    // console.log(files);
    dispatch(createNote(data));
  };

  return (
    <div>
      <h2>Create a new note</h2>

      {/* 
      title: textfield
      content: textfield
      folder: select
      date: date picker
      priority: select
      progress: select
      files: upload
      
       */}
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form">
        <TextField label="Title" variant="standard" {...register('title')} />
        <TextareaAutosize
          maxRows={4}
          aria-label="maximum height"
          placeholder="Maximum 4 rows"
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua."
          style={{ width: 200 }}
          {...register('content')}
        />
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
                <Select {...field} label="priority">
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
          defaultValue=""
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
                      key={`progress-${p}-${i + 1}`}
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
          defaultValue=""
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
    </div>
  );
};

export default NoteForm;
