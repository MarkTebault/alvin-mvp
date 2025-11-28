import React, { useState, useEffect } from "react";
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { RRule, RRuleSet, Weekday } from "rrule";

export default function RRuleBuilder({ onChange }: { onChange?: (rule: string) => void }) {
  const [mode, setMode] = useState("RECURRING");
  const [freq, setFreq] = useState("DAILY");
  const [interval, setInterval] = useState(1);
  const [byweekday, setByweekday] = useState<Weekday[]>([]);
  const [bymonthday, setBymonthday] = useState<number>(1);
  const [until, setUntil] = useState("");
  const [time, setTime] = useState("09:00");
  const [singleDate, setSingleDate] = useState("");

  const freqOptions = [
    { label: "Daily", value: "DAILY" },
    { label: "Weekly", value: "WEEKLY" },
    { label: "Monthly", value: "MONTHLY" },
  ];

  const weekdayOptions = [
    { label: "Mon", value: RRule.MO },
    { label: "Tue", value: RRule.TU },
    { label: "Wed", value: RRule.WE },
    { label: "Thu", value: RRule.TH },
    { label: "Fri", value: RRule.FR },
    { label: "Sat", value: RRule.SA },
    { label: "Sun", value: RRule.SU },
  ];

  const buildRRule = (): string => {
    if (mode === "SINGLE") {
      if (!singleDate || !time) return "";
      const dt = new Date(`${singleDate}T${time}:00`);
      const set = new RRuleSet();
      set.rdate(dt);
      return set.toString();
    }

    const freqMap: Record<string, number> = {
      DAILY: RRule.DAILY,
      WEEKLY: RRule.WEEKLY,
      MONTHLY: RRule.MONTHLY,      
    };

    const options: any = {
      freq: freqMap[freq] ?? RRule.DAILY,
      interval: Number(interval) || 1,
    };

    if (time) {
      const [hh, mm] = time.split(":").map(Number);
      if (!Number.isNaN(hh)) options.byhour = hh;
      if (!Number.isNaN(mm)) options.byminute = mm;
    }

    if (freq === "WEEKLY" && byweekday.length > 0) options.byweekday = byweekday;
    if (freq === "MONTHLY") options.bymonthday = Number(bymonthday) || 1;
    if (until) options.until = new Date(`${until}T23:59:59`);

    try {
      const rule = new RRule(options);
      return rule.toString();
    } catch (err) {
      console.error("Failed to build RRULE", err);
      return "";
    }
  };

  // Call onChange only when inputs change to prevent infinite loops
  useEffect(() => {
    if (onChange) onChange(buildRRule());
  }, [mode, freq, interval, byweekday, bymonthday, until, time, singleDate, onChange]);

  const handleWeekdayToggle = (day: Weekday) => {
    setByweekday((prev) => {
      const exists = prev.includes(day);
      if (exists) return prev.filter((d) => d !== day);
      return [...prev, day];
    });
  };

  return (
    <Box className="flex flex-col gap-4 p-4 rounded-2xl shadow bg-white max-w-xl">
      <Stack spacing={2} sx={{ mt: 1 }}>
      <Typography variant="h6" className="font-semibold">
        Reminder Type
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select value={mode} label="Type" onChange={(e) => setMode(e.target.value)}>
          <MenuItem value="RECURRING">Repeating</MenuItem>
          <MenuItem value="SINGLE">One-time</MenuItem>
        </Select>
      </FormControl>

      

     {mode === "RECURRING" && (
      <FormControl fullWidth>
        <InputLabel>Frequency</InputLabel>
        <Select value={freq} label="Frequency" onChange={(e) => setFreq(e.target.value)}>
          {freqOptions.map((f) => (
            <MenuItem key={f.value} value={f.value}>
              {f.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     )}
    

      {mode === "SINGLE" && (
        <TextField
          label="Date"
          type="date"
          value={singleDate}
          onChange={(e) => setSingleDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      )}

       {freq === "MONTHLY" && mode === "RECURRING" && (
        <TextField
          label="Day of month"
          type="number"
          value={bymonthday}
          onChange={(e) => setBymonthday(Number(e.target.value))}
          fullWidth
        />
      )}

    
      {freq === "WEEKLY" && mode === "RECURRING" && (
        <Box>
          <Typography className="mb-2">Days of the week</Typography>
          <Box className="grid grid-cols-7 gap-2">
            {weekdayOptions.map((w) => (
              <Box
                key={w.label}
                className={`p-2 text-center rounded-xl cursor-pointer border ${
                  byweekday.includes(w.value)
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-100 border-gray-300"
                }`}
                onClick={() => handleWeekdayToggle(w.value)}
              >
                {w.label}
              </Box>
            ))}
          </Box>
        </Box>
      )}

       <TextField
        label="Time"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />


      {mode === "RECURRING" && (
         <TextField
        label="Until (optional)"
        type="date"
        value={until}
        onChange={(e) => setUntil(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      )}     

     

      <Box className="text-sm text-gray-600 p-3 bg-gray-50 rounded-xl border border-gray-200">
        <Typography variant="body2" className="font-semibold mb-1">
          Resulting rule / date
        </Typography>
        <pre className="whitespace-pre-wrap break-all">{buildRRule()}</pre>
      </Box>
      </Stack>
    </Box>
  );
}