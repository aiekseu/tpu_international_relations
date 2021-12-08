import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import rootStore from "../stores/rootStore";
import {useState} from "react";
import {observer} from "mobx-react-lite";

const columns = [
    {
        id: 'num',
        label: '№',
        width: 50,
        disableReorder: true,
        sortable: false
    },
    {
        id: 'agrType',
        label: 'Тип договора',
        width: 200,
    },
    {
        id: 'comment',
        label: "Комментарий",
        width: 200,
    },
    {
        id: 'startDate',
        label: 'Регистрация',
        width: 140,
        type: "date",
        disableReorder: true
    },
    {
        id: 'endDate',
        label: 'Окончание',
        width: 140,
        type: "date",
        disableReorder: true,
        sortable: false
    },
    {
        id: 'representativeName',
        label: 'Ответственный',
        width: 210,
    },
    {
        id: 'representativeEmail',
        label: 'Email',
        width: 150,
        disableReorder: true,
        sortable: false,
    },
    {
        id: 'representativePhone',
        label: 'Телефон',
        width: 140,
        disableReorder: true,
        sortable: false
    },
    {
        id: 'partnerName',
        label: 'Ответственный в организации',
        width: 240,
        disableReorder: true,
        sortable: false,
    },
    {
        id: 'partnerEmail',
        label: 'Email',
        width: 150,
        disableReorder: true,
        sortable: false,
    },
    {
        id: 'partnerPhone',
        label: 'Телефон',
        width: 140,
        disableReorder: true,
        sortable: false
    },
    {
        id: 'newsLink',
        label: 'Ссылка на новости',
        width: 400,
        disableReorder: true,
        sortable: false,
    },
];

function createData(num, agrType, comment, startDate, endDate, representativeName, representativeEmail, representativePhone, partnerName, partnerEmail, partnerPhone, newsLink) {
    return {
        num,
        agrType,
        comment,
        startDate,
        endDate,
        representativeName,
        representativeEmail,
        representativePhone,
        partnerName,
        partnerEmail,
        partnerPhone,
        newsLink
    };
}

 const CompanyTable = () => {
    const companyAgreements = rootStore.aboutCompanyStore.companyAgreements;
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        console.log(companyAgreements)
        let tempRows = []
        for (let i = 0; i < companyAgreements.length; i++) {
            let representative = companyAgreements[i].representative
            let type = companyAgreements[i].agreement_type
            let partner = companyAgreements[i].partner
            tempRows.push(createData(
                companyAgreements[i]?.id ?? "-",
                type.name,
                companyAgreements[i].comments,
                companyAgreements[i]?.start_date ?? "-",
                companyAgreements[i]?.end_date ?? "-",
                representative.first_name + " " + representative.second_name,
                representative?.phone ?? "-",
                representative?.email ?? "-",
                partner.first_name + " " + partner.second_name,
                partner.email,
                partner.phone,
                partner.news_url
            ))
        }
        setRows(tempRows)
    }, [companyAgreements])
    return (
        <Paper>
            <TableContainer sx={{maxHeight: 360}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        padding: 8,
                                        backgroundColor: '#69BC00',
                                        color: '#FFFFFF'
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell sx={{padding: '8px'}} key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
}

export default observer(CompanyTable)