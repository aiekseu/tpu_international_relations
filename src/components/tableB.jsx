import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {renderCellExpand} from "./old/renderCellExpand";
import rootStore from "../stores/rootStore";
import {useState} from "react";

const columns = [
    {
        id: 'num',
        label: '№',
        width: 50,
        disableReorder: true,
        sortable: false
    },
    {
        id: 'status',
        label: 'Состояние',
        width: 50,
        disableReorder: true,
        sortable: false
    },
    {
        id: 'agrType',
        label: 'Тип договора',
        width: 200,
        renderCell: renderCellExpand
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
        renderCell: renderCellExpand
    },
    {
        id: 'representativeEmail',
        label: 'E-mail',
        width: 150,
        disableReorder: true,
        sortable: false,
        renderCell: renderCellExpand
    },
    {
        id: 'representativePhone',
        label: 'Телефон',
        width: 140,
        disableReorder: true,
        sortable: false
    },
];

function createData(num, status, agrType, startDate, endDate, representativeName, representativeEmail, representativePhone) {
    return {num, status, agrType, startDate, endDate, representativeName, representativeEmail, representativePhone};
}

export default function TableB() {
    const companyAgreements = rootStore.aboutCompanyStore.companyAgreements;
    const [rows,setRows] = React.useState([]);
    React.useEffect(() => {
        let tempRows = []
        for (let i = 0; i < companyAgreements.length; i++) {
            let representativeId = companyAgreements[i].id_representative
            let statusId = companyAgreements[i].id_status
            let typeId = companyAgreements[i].id_agr_type
            let representatives = rootStore.globalDataStore.representativesList
            let statuses = rootStore.globalDataStore.agreementTypesList
            let types = rootStore.globalDataStore.agreementTypesList
            let representative = representatives.find((element) => {
                return element.id === representativeId
            })
            let status = statuses.find((e) =>{
                return e.id === statusId
            })
            let type = types.find((e)=>{
                return e.id === typeId
            })
            tempRows.push(createData(
                companyAgreements[i]?.id ?? "-",
                companyAgreements[i].id_status,
                type.name,
                companyAgreements[i]?.start_date ?? "-",
                companyAgreements[i]?.end_date ?? "-",
                representative.first_name + " " + representative.second_name,
                representative?.phone ?? "-",
                representative?.email ?? "-",
            ))
        }
        setRows(tempRows)
    },[setRows])
    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 360}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={Math.random()}>
                            {columns.map((column) => (
                                <TableCell
                                    key ={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth , padding: 8, backgroundColor:'#69BC00', color: '#FFFFFF'}}
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
                                                <TableCell sx={{padding:'8px'}} key={column.id} align={column.align}>
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