cafeaspview.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.url.includes("netsuite.com")) {
        const baseUrl = tab.url + '&xml=T';
        const spinner = document.getElementById("spinner");
        spinner.style.display = "block";

        await GetData(baseUrl);
    }
});

async function GetData(url) {
    const spinner = document.getElementById("spinner");
    const errorMessage = document.getElementById("errorMessage");

    try {
        const response = await fetch(url);
        const xml = await response.text();

        const resultJSON = new X2JS({ useDoubleQuotes: true }).xml_str2json(xml);

        if (resultJSON) {
            const record = resultJSON.nsResponse.record;
            const recordType = record._recordType;

            if (recordType === 'salesorder') {
                const data = GetRecordData(resultJSON);
                CreateCSVFile(data, record._id, 'salesorder');
            } else {
                errorMessage.innerHTML = `<b>Sorry</b><br/>This record type is not available for export at this time.`;
                spinner.style.display = "none";
            }
        } else {
            throw new Error("Invalid XML response");
        }
    } catch (err) {
        console.error(err);
        errorMessage.innerHTML = `<b>Error</b><br/>Failed to retrieve or process the record.`;
        spinner.style.display = "none";
    }
}

function GetRecordData(data) {
    const record = data.nsResponse.record;
    const recordItems = [];

    if (Array.isArray(record.machine)) {
        record.machine.forEach(row => {
            if (row._name === 'item') {
                const lines = Array.isArray(row.line) ? row.line : [row.line];
                lines.forEach(item => {
                    recordItems.push(ProcessSalesOrderData(item, record));
                });
            }
        });
    }

    return recordItems;
}

function ProcessSalesOrderData(item, record) {
    return {
        internalid: record.id,
        entityname: DoubleQuotes(record.entityname),
        tranid: record.tranid,
        otherrefnum: record.otherrefnum,
        department: record.department,
        class: record.class,
        iteminternalid: item.item,
        item_display: item.item_display,
        itemtype: item.itemtype,
        line: item.line,
        location: item.location || 0,
        location_display: item.location_display || '',
        isclosed: item.isclosed,
        quantity: item.quantity,
        quantityavailable: item.quantityavailable,
        quantitybackordered: item.quantitybackordered,
        quantitybilled: item.quantitybilled,
        quantitycommitted: item.quantitycommitted,
        quantityfulfilled: item.quantityfulfilled,
        quantitypacked: item.quantitypacked,
        quantitypicked: item.quantitypicked,
        quantitypickpackship: item.quantitypickpackship,
        rate: item.rate,
        amount: item.amount,
        workordurl: item.workordurl,
        statusRef: record.statusRef
    };
}

function arrayToCSV(data) {
    const csvRows = data.map(row => Object.values(row));
    csvRows.unshift(Object.keys(data[0]));
    return csvRows.join('\n');
}

function CreateCSVFile(data, orderId, recordType) {
    const csvContent = arrayToCSV(data);
    const a = document.createElement("a");

    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    a.download = `${recordType}_${orderId}_export.csv`;
    a.target = "_blank";

    document.body.appendChild(a);
    a.click();
    a.remove();

    document.getElementById("spinner").style.display = "none";
}

function DoubleQuotes(value) {
    return `"${value}"`;
}
