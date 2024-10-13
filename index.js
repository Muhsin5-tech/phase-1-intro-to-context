// Your code here
function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(' ');

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(' ');

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, workDate) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === workDate);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === workDate);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, workDate) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, workDate);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
        return totalWages + wagesEarnedOnDate(employeeRecord, timeInEvent.date);
    }, 0);
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce((totalPayroll, employeeRecord) => {
        return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
}
