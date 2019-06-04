'use strict';

//Daten aus API laden
const baseApiUrl = 'http://localhost:3000/api';
getLogin();
getActivitylog();

//LoginDaten aus API holen
function getLogin() {
    let getLoginUrl = baseApiUrl + '/login';
    fetch(getLoginUrl)
        .then(response => response.json())
        .then(data => {
            let loginData = data.records;
            console.log(loginData);

            //Formular-Feld Optionen E-mail
            let email_id = document.getElementById('email_id');
            for(let i = 0; i<loginData.length; i++) {
                email_id.add(
                    new Option(
                        loginData[i].login_email,
                        loginData[i].login_id
                    )
                )
            }
            //Formular-Feld Optionen Account ID
            let account_id = document.getElementById('account_id_id');
            for(let i = 0; i<loginData.length; i++) {
                account_id.add(
                    new Option(
                        loginData[i].account_id
                    )
                )
            }
            //Formular-Feld Optionen Account Type
            let account_type = document.getElementById('account_type_id');
            for(let i = 0; i<loginData.length; i++) {
                account_type.add(
                    new Option(
                        loginData[i].account_type
                    )
                )
            }
            //Formular-Feld Optionen Country
            let country = document.getElementById('country_id');
            for(let i = 0; i<loginData.length; i++) {
                country.add(
                    new Option(
                        loginData[i].country_code
                    )
                )
            }
            //Formular-Feld Optionen Country
            let roles = document.getElementById('roles_id');
            for(let i = 0; i<loginData.length; i++) {
                roles.add(
                    new Option(
                        loginData[i].roles
                    )
                )
            }
            //Formular-Feld Optionen License
            let license = document.getElementById('license_id');
            for(let i = 0; i<loginData.length; i++) {
                license.add(
                    new Option(
                        loginData[i].license_id
                    )
                )
            }
            //Formular-Feld Optionen Authentification
            let authentification = document.getElementById('authentification_methode_id');
            for(let i = 0; i<loginData.length; i++) {
                authentification.add(
                    new Option(
                        loginData[i].auth_methods
                    )
                )
            }

        });
    }

//ActivitylogDaten aus API holen
function getActivitylog() {
    let getActivitylogUrl = baseApiUrl + '/activitylog';
    fetch(getActivitylogUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data.records);

            let table = initTable();
            for (let i = 0; i < data.records.length; i++) {
                let activitylogData = data.records[i];
                let row = createRow(
                    activitylogData.datetime,
                    activitylogData.id,
                    activitylogData.login_email,
                    activitylogData.login_id,
                    activitylogData.context,
                    activitylogData.message,
                );
                $(table).find('tbody').append(row);
            }
            $('#datatable').append(table);

            //Formular-Feld Optionen Type of LogData
            let typeofLogdata = document.getElementById('context_id');
            let activitylog = data.records;
            for(let i = 0; i<activitylog.length; i++) {
                typeofLogdata.add(
                    new Option(
                        activitylog[i].context
                    )
                )
            }
        });

}

function initTable() {
    let table = document.createElement('table');
    let tableHeader = document.createElement('thead');
    let headerRow = document.createElement('tr');

    let headerColumn_datetime = document.createElement('th');
    let headerColumn_id = document.createElement('th');
    let headerColumn_login_email = document.createElement('th');
    let headerColumn_login_id = document.createElement('th');
    let headerColumn_context = document.createElement('th');
    let headerColumn_message = document.createElement('th');
    let tableBody = document.createElement('tbody');

    headerColumn_datetime.appendChild(document.createTextNode('Time'));
    headerColumn_id.appendChild(document.createTextNode('Log ID'));
    headerColumn_login_email.appendChild(document.createTextNode('Login email'));
    headerColumn_login_id.appendChild(document.createTextNode('Login ID'));
    headerColumn_context.appendChild(document.createTextNode('Type'));
    headerColumn_message.appendChild(document.createTextNode('Log information'));

    headerRow.appendChild(headerColumn_datetime);
    headerRow.appendChild(headerColumn_id);
    headerRow.appendChild(headerColumn_login_email);
    headerRow.appendChild(headerColumn_login_id);
    headerRow.appendChild(headerColumn_context);
    headerRow.appendChild(headerColumn_message);

    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    table.className = 'table table-striped';
    return table;
}

function createRow(datetime, id, login_email, login_id, context, message) {
    let row = document.createElement('tr');
    let column_datetime = document.createElement('td');
    let column_id = document.createElement('td');
    let column_login_email = document.createElement('td');
    let column_login_id = document.createElement('td');
    let column_context = document.createElement('td');
    let column_message = document.createElement('td');

    column_datetime.appendChild(document.createTextNode(datetime));
    column_id.appendChild(document.createTextNode(id));
    column_login_email.appendChild(document.createTextNode(login_email));
    column_login_id.appendChild(document.createTextNode(login_id));
    column_context.appendChild(document.createTextNode(context));
    column_message.appendChild(document.createTextNode(message));

    row.appendChild(column_datetime);
    row.appendChild(column_id);
    row.appendChild(column_login_email);
    row.appendChild(column_login_id);
    row.appendChild(column_context);
    row.appendChild(column_message);
    return row;
}