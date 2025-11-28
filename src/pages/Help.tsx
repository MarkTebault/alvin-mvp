import { Box, Typography } from "@mui/material";
import React from "react";

const Help: React.FC = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Help
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
                This is the help page. Here you can find information and assistance regarding the application.
            </Typography>

            <Typography variant="h5">
                Elders
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
                Elders are those who have trouble remembering things. You will create reminders for important tasks and events to help them stay organized.
            </Typography>

            <Typography variant="h5">
                Tasks
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
                Tasks are reminders created for elders. You can set due dates and times for each task to ensure they receive timely notifications.
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
                The Task is what the Elder will see when being reminded. Make sure to keep it clear and concise.  If the Elder is unsure about what to do, they can tap on the Instructions to see more details.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
                For example, a Task could be "Take your medication" with Instructions saying "Take your blood pressure and diabeties pills.  These are in the kitchen next to the toaster.  The blood pressure is a small blue pill.  The diabeties pill is the white pill.  Take both with water."
            </Typography>

            <Typography variant="h5">
                Reminders
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
                Elders will recieve reminders on their devices for each task you create. The Elder can:
                <ul>
                    <li>Press Done to indicate they completed the task</li>
                    <li>Press Snooze to reminde them again in 10 minutes</li>
                    <li>Press Instructions to here detailed instructions for the task</li>
                    <li>Dismiss the task reminder</li>
                </ul>
                You will be notified if via text and email if:
                <ul>
                    <li>The Elder ignores the task after 30 minutes</li>
                    <li>The Elder snoozes the task more then 3 times</li>
                    <li>The Elder dismisses the task reminder</li>
                </ul>
            </Typography>

        </Box>
    );
};

export default Help;