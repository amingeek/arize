import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

interface Person {
  id: number;
  face: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  studentId: string;
}

const NewPersonTable: React.FC = () => {
  const [newPeople, setNewPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Person[]>('/api/getData');
        setNewPeople(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>نام</TableCell>
            <TableCell>نام خانوادگی</TableCell>
            <TableCell>کد ملی</TableCell>
            <TableCell>شماره دانش‌آموزی</TableCell>
            <TableCell>چهره</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newPeople.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.firstName}</TableCell>
              <TableCell>{person.lastName}</TableCell>
              <TableCell>{person.nationalCode}</TableCell>
              <TableCell>{person.studentId}</TableCell>
              <TableCell>
                <img src={person.face} alt={`عکس ${person.firstName} ${person.lastName}`} style={{ width: 100 }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NewPersonTable;
