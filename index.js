// Your code here
function createEmployeeRecord(employeeRecordArray){
    let firstName = employeeRecordArray[0]
    let lastName = employeeRecordArray[1]
    let jobTitle = employeeRecordArray[2]
    let payRate = employeeRecordArray[3]
    return {
        firstName: `${firstName}`,
        familyName: `${lastName}`,
        title: `${jobTitle}`,
        payPerHour: payRate,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArrayofArrays){
    return employeeArrayofArrays.map(employeeRecord => (createEmployeeRecord(employeeRecord)))
}

function createTimeInEvent(employeeRecord, dateStamp){
    let time = dateStamp.slice(-4)
    let dateValue = dateStamp.slice(0,10)
    employeeRecord.timeInEvents.push({
        type:"TimeIn",
        hour:(parseInt(time)),
        date:dateValue,
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let time = dateStamp.slice(-4)
    let dateValue = dateStamp.slice(0,10)
    employeeRecord.timeOutEvents.push({
        type:"TimeOut",
        hour:(parseInt(time)),
        date:dateValue,
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeObject, date){
    let employeeDate
    let timeIn
    let timeOut 
    //declare these before so they're not being redeclared every loop, and this loop is how we match the date with the wages
    for(let i = 0; i < employeeObject.timeInEvents.length; i++){
        if (date == employeeObject.timeInEvents[i].date && date == employeeObject.timeOutEvents[i].date){
        employeeDate = employeeObject.timeInEvents[i].date
        timeIn = employeeObject.timeInEvents[i].hour
        timeOut = employeeObject.timeOutEvents[i].hour
        }
    }
    let rawHoursWorked = (timeOut - timeIn)
    let rawHoursWorkedString = rawHoursWorked.toString()
    let hoursWorkedString = rawHoursWorkedString.slice(0, -2)
    let hoursWorked = (parseInt(hoursWorkedString))
    return hoursWorked
}

function wagesEarnedOnDate (employeeObject, date){
    let hoursWorked = hoursWorkedOnDate(employeeObject, date)
    let payRate = employeeObject.payPerHour
   return hoursWorked*payRate
}

function allWagesFor(employeeObject){
    let dateArray = []
    for(let i = 0; i < employeeObject.timeInEvents.length; i++){
        dateArray.push(employeeObject.timeInEvents[i].date)
    }
    let employeeWageTotal = 0
    for(let j = 0; j < dateArray.length; j++){
       employeeWageTotal += (wagesEarnedOnDate(employeeObject, dateArray[j]))
        
    }
    return employeeWageTotal
    // console.log(employeeObject)
}

function calculatePayroll(employeeArray){
    let allEmployeeWages = 0
    for (let i = 0; i< employeeArray.length; i++){
        allEmployeeWages += allWagesFor(employeeArray[i])
    }
    return allEmployeeWages
}