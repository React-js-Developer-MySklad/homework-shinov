import * as css from './table.module.css';
import React from "react";
import {Company} from "../../App";

interface Props {
    counterparties: Company [];
}

const tableHeaders = [
    {key: 'name', display: 'наименование'},
    {key: 'inn', display: 'ИНН'},
    {key: 'address', display: 'адрес'},
    {key: 'kpp', display: 'КПП'},
];


const Table: React.FC<Props> = (props) => {
    return <table className={css.table}>
        <thead className={css.thead}>
            <tr>
                {tableHeaders.map(hd => (
                        <th key={hd.key} className={css.th}>
                            {hd.display}
                        </th>
                    )
                )}
            </tr>
        </thead>

        <tbody>
        {props.counterparties.map(
            counterparty => (
                <tr key={counterparty.id} className={css.row}>
                    {tableHeaders.map(column =>(
                        <td className={css[column.key]} key={column.key}>
                            {counterparty[column.key as keyof Company]}
                        </td>
                    ))}
                </tr>
            )
        )}

        </tbody>

    </table>
}

export default Table;