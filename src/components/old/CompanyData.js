import React, {useEffect, useRef, useState} from "react";




const CompanyData = ({companiesList, company, agrTypes}) => {

    const classes = {}

    // Получаем все договоры компании




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
