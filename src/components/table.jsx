import * as React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';

import {observer} from "mobx-react-lite";
import rootStore from "../stores/rootStore";

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
        width: 150,
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
        width: 160,
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
        width: 150,
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
        let tempRows = []
        for (let i = 0; i < companyAgreements.length; i++) {
            let representative = companyAgreements[i].representative
            let type = companyAgreements[i].agreement_type
            let partner = companyAgreements[i].partner
            tempRows.push(createData(
                i+1,
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
        <TableContainer style={{borderRadius: 5,}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead >
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={Math.random()}
                                style={{
                                    paddingLeft:10,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    backgroundColor: '#69BC00',
                                    color: '#FFFFFF',
                                }}
                                variant='head'
                            >
                                <Typography width={column.width}>
                                    {column.label}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) =>
                        <TableRow hover key={Math.random()}>
                            {columns.map((column) => {
                                return (
                                    <TableCell
                                        sx={{padding: '8px'}}
                                        key={Math.random()}
                                        variant='body'
                                    >
                                        {row[column.id]}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default observer(CompanyTable)