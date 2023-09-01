import {Box, TextField, Typography} from "@mui/material";
import {io} from "socket.io-client";
import {useEffect, useState} from "react";

const TasksView = () => {

    const socket = io('ws://localhost:3001');

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        socket.on('inputChanged', (data: any) => {
            setInputValue(data);
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    const handleInputChange = (event: any) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        socket.emit('input', newValue);
    };

    return (
        <Box>
            <Typography variant="h1" component="h2" gutterBottom>
                Tasks
            </Typography>

            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={inputValue}
                       onChange={handleInputChange}/>
        </Box>
    )
};

export default TasksView;