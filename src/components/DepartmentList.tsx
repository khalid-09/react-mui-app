import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import optionsList from '../constants/options-list';

export default function DepartmentList() {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>(
    optionsList.reduce((acc, dept) => {
      acc[dept.department] = false;
      dept.sub_departments.forEach(subDept => {
        acc[`${dept.department}_${subDept}`] = false;
      });
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>(
    optionsList.reduce((acc, dept) => {
      acc[dept.department] = true;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const handleParentChange =
    (department: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = { ...checked };

      newChecked[department] = event.target.checked;

      optionsList
        .find(dept => dept.department === department)
        ?.sub_departments.forEach(subDept => {
          newChecked[`${department}_${subDept}`] = event.target.checked;
        });

      setChecked(newChecked);
    };

  const handleChildChange =
    (department: string, subDepartment: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = { ...checked };

      newChecked[`${department}_${subDepartment}`] = event.target.checked;

      const allSubDepsChecked = optionsList
        .find(dept => dept.department === department)
        ?.sub_departments.every(
          subDept => newChecked[`${department}_${subDept}`]
        );

      newChecked[department] = !!allSubDepsChecked;

      setChecked(newChecked);
    };

  const isIndeterminate = (department: string): boolean => {
    const subDeps = optionsList.find(
      dept => dept.department === department
    )?.sub_departments;

    return subDeps
      ? subDeps.some(subDept => checked[`${department}_${subDept}`]) &&
          !checked[department]
      : false;
  };

  const handleExpand = (department: string) => () => {
    setExpanded(prev => ({ ...prev, [department]: !prev[department] }));
  };

  return (
    <div>
      {optionsList.map(dept => (
        <Box key={dept.department}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              label={
                dept.department.replace('_', ' ')[0].toUpperCase() +
                dept.department.slice(1).replace('_', ' ')
              }
              control={
                <Checkbox
                  checked={checked[dept.department]}
                  indeterminate={isIndeterminate(dept.department)}
                  onChange={handleParentChange(dept.department)}
                />
              }
            />
            <IconButton onClick={handleExpand(dept.department)} size="small">
              {expanded[dept.department] ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          </Box>
          <Collapse in={expanded[dept.department]} timeout="auto" unmountOnExit>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
              {dept.sub_departments.map(subDept => (
                <FormControlLabel
                  key={`${dept.department}_${subDept}`}
                  label={
                    subDept.replace('_', ' ')[0].toUpperCase() +
                    subDept.slice(1).replace('_', ' ')
                  }
                  control={
                    <Checkbox
                      checked={checked[`${dept.department}_${subDept}`]}
                      onChange={handleChildChange(dept.department, subDept)}
                    />
                  }
                />
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </div>
  );
}
