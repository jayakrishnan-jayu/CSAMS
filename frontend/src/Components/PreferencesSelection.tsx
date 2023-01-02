import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import "./Preferences.css";

const courses = [
    'Course1',
    'Course2',
    'Course3',
    'Course4'
]

const programs = [
    {
        value: 'BCA-DS',
        label: 'BCA-DS'
    },
    {
        value: 'BCA',
        label: 'BCA'
    },
    {
        value: 'MCA',
        label: 'MCA'
    }
]

const years = [
    {
        value: '2021',
        label: '2021'
    },
    {
        value: '2022',
        label: '2022'
    },
    {
        value: '2023',
        label: '2023'
    }
]

const semesters = [
    {
        value: '6',
        label: 'S6'
    },
    {
        value: '5',
        label: 'S5'
    },
    {
        value: '4',
        label: 'S4'
    }
]

const batches = [
    {
        value: '2022-BCA',
        label: '2022-BCA'
    },
    {
        value: '2021-BCA',
        label: '2021-BCA'
    },
    {
        value: '2020-BCA',
        label: '2020-BCA'
    }
]

const columns: GridColDef[] = [
    { 
        field: 'id',
        headerName: 'ID',
        width: 70
    },
    {
        field: 'courseName',
        headerName: 'Course Name',
        width: 130,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.courseCode || ''} ${params.row.courseName || ''}`
    },
    { 
        field: 'isSelected',
        headerName: 'Selection Status',
        width: 130,
        valueGetter: (params: GridValueGetterParams) =>
        `${params.row.isSelected ? 'Selected' : 'Not Selected'}`
    }
];

const rows = [
    { id: 1, courseName: 'Course1', courseCode: 'CS1', isSelected: true },
    { id: 2, courseName: 'Course2', courseCode: 'CS2', isSelected: false },
    { id: 3, courseName: 'Course3', courseCode: 'CS3', isSelected: false },
    { id: 4, courseName: 'Course4', courseCode: 'CS4', isSelected: true }
];

export function PreferencesSelection() {
    return (
        <div className="main-container">
            <div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="outlined-select-program"
                            select
                            label="Program"
                            defaultValue=""
                            helperText="Please select your program"
                            >
                            {programs.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-year"
                            select
                            label="Year"
                            defaultValue=""
                            helperText="Please select your year"
                            >
                            {years.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="outlined-select-semester"
                            select
                            label="Semester"
                            defaultValue=""
                            helperText="Please select your semester"
                            >
                            {semesters.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <Button variant="outlined">Get courses</Button>
                    </div>
                </Box>
            </div>

            <br></br>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
                <br></br>
                <div>
                    <Button variant="outlined">Select</Button>
                    <Button variant="outlined">Not Selected</Button>
                </div>
            </div>
        </div>
    )
};
