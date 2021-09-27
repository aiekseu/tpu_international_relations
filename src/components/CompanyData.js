import React, {useEffect, useRef, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, LinearProgress, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {DataGrid, GridColDef, GridOverlay} from '@material-ui/data-grid';

import API from "../utils/API";
import {renderCellExpand} from "./renderCellExpand";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


const CompanyData = ({companiesList, company, agrTypes}) => {

    const classes = useStyles()
    const api = API

    const [rows, setRows] = useState([])
    const dataRef = useRef(null)

    const columns: GridColDef[] = [
        {
            field: 'num',
            headerName: '№',
            width: 55,
            disableReorder: true,
            sortable: false
        },
        {
            field: 'agrType',
            headerName: 'Тип договора',
            width: 200,
            renderCell: renderCellExpand
        },
        {
            field: 'comments',
            headerName: 'Комментарий',
            width: 200,
            disableReorder: true,
            sortable: false,
            renderCell: renderCellExpand
        },
        {
            field: 'startDate',
            headerName: 'Дата регистрации',
            width: 140,
            type: "date",
            disableReorder: true
        },
        {
            field: 'endDate',
            headerName: 'Дата окончания',
            width: 140,
            type: "date",
            disableReorder: true,
            sortable: false
        },
        {
            field: 'representativeName',
            headerName: 'Ответственный в ТПУ',
            width: 210,
            renderCell: renderCellExpand
        },
        {
            field: 'representativeEmail',
            headerName: 'Email',
            width: 150,
            disableReorder: true,
            sortable: false,
            renderCell: renderCellExpand
        },
        {
            field: 'representativePhone',
            headerName: 'Телефон',
            width: 140,
            disableReorder: true,
            sortable: false
        },
        {
            field: 'partnerName',
            headerName: 'Ответственный в организации',
            width: 240,
            disableReorder: true,
            sortable: false,
            renderCell: renderCellExpand
        },
        {
            field: 'partnerEmail',
            headerName: 'Email',
            width: 150,
            disableReorder: true,
            sortable: false,
            renderCell: renderCellExpand
        },
        {
            field: 'partnerPhone',
            headerName: 'Телефон',
            width: 140,
            disableReorder: true,
            sortable: false
        },
        {
            field: 'newsLink',
            headerName: 'Ссылка на новости',
            width: 200,
            disableReorder: true,
            sortable: false,
            renderCell: renderCellExpand,
        },
    ];

    // Получаем все договоры компании
    useEffect(() => {
        console.log(company)
        const companyID = companiesList.find(item => item.name === company)?.id
        setRows([])
        if (companyID)
            api.get(`/agreements/?id_company=${companyID}`)
                .then(response => {
                    let tempRows = []
                    for (let agreement of response.data) {
                        let agrType = agrTypes.find(type => type.id === agreement.id_agr_type).name
                        tempRows.push({
                            id: agreement.id,
                            num: agreement.id,
                            agrType: agrType,
                            comments: agreement.comments.join('; '),
                            startDate: agreement.start_date,
                            endDate: agreement.end_date,
                            representativeName: agreement.representative.second_name + ' ' + agreement.representative.first_name,
                            representativeEmail: agreement.representative.email,
                            representativePhone: agreement.representative.phone,
                            partnerName: agreement.partner.first_name + ' ' + agreement.partner.second_name,
                            partnerEmail: agreement.partner.email,
                            partnerPhone: agreement.partner.phone,
                            newsLink: agreement.news_url.join(' \n')
                        })
                    }
                    setRows(tempRows)

                })
        // eslint-disable-next-line
    }, [company])

    //Листаем страницу вниз при выборе компании
    useEffect(() => {
        dataRef.current?.scrollIntoView({alignToTop: false, behavior: 'smooth'})
    }, [company])


    function CustomLoadingOverlay() {
        return (
            <GridOverlay>
                <div style={{position: 'absolute', top: 0, width: '100%'}}>
                    <LinearProgress/>
                </div>
            </GridOverlay>
        );
    }


    return (
        <Accordion expanded={company} style={{marginTop: 16}}>
            <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>
                    {company
                        ? `Договоры с организацией '${company.name ? company.name : company}'`
                        : 'Договоры'
                    }
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div style={{height: 300, width: '100%', marginTop: -12}}>
                    <DataGrid
                        ref={dataRef}
                        rows={rows}
                        columns={columns}
                        disableColumnMenu
                        components={{
                            LoadingOverlay: CustomLoadingOverlay,
                        }}
                        loading={rows.length === 0}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default CompanyData