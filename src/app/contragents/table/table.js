import './table.css'

export default function (container, data) {

    const tableHeaders = [
        {key: 'name', display: 'наименование'},
        {key: 'inn', display: 'ИНН'},
        {key: 'address', display: 'адрес'},
        {key: 'kpp', display: 'КПП'},
    ];

    const table = document.createElement('table');
    table.className = 'my-table';

    const thead = document.createElement('thead');
    thead.className = 'my-thead';

    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');

    function createComponent() {
        tableHeaders.forEach(header => {
            const th = document.createElement('th');
            th.className = 'my-th'
            th.textContent = header.display;

            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        table.appendChild(tbody);
        return table;

    }

    function addData(data){
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = "my-row";
            tableHeaders.forEach(
                column => {
                    const td = document.createElement('td');
                    td.className = column.key;
                    td.textContent = item[column.key];
                    row.appendChild(td);
                }
            );
            tbody.appendChild(row);
        });
    }

    function init(container, data){
        const component = createComponent();
        container.appendChild(component);
        addData(data);

        function refresh(){
            tbody.innerHTML = '';
            addData(data);
        }

        return {component, refresh}
    }

    return init(container, data);
}