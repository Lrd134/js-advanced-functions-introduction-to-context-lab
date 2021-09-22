// Your code here

function createEmployeeRecord(array) {
  const employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employee
}
// const createTimeEvent = (dateTime) => {

//   return time;
// };
const createEmployeeRecords = arrayOfArrays => { 
  return arrayOfArrays.map(createEmployeeRecord) };

function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}
const createTimeOutEvent = (employee, dateTime) => {
  const [date, hour] = dateTime.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10)
  });
  return employee;
};

const hoursWorkedOnDate = (employee, date) => {
  const timeInOnDate = employee.timeInEvents.filter(e => {
                          if (e.date === date) return e;
                        })[0].hour;
  const timeOutOnDate = employee.timeOutEvents.filter(e => {
                          if (e.date === date) return e;
                        })[0].hour;  
  return (timeOutOnDate - timeInOnDate) / 100;
}

const wagesEarnedOnDate = (employee, date) => {
  return employee.payPerHour * hoursWorkedOnDate(employee, date);
}

const allWagesFor = (employee) => {
  let dates = employee.timeInEvents.map(e => {
                return e.date;
              });

  let total = dates.reduce((sum, date) => {
    return sum + wagesEarnedOnDate(employee, date);
  }, 0);
  return total;
}

const calculatePayroll = (employees) => {
  let payroll = employees.reduce((sum, currentEmployee) =>{
    return sum + allWagesFor(currentEmployee);
  }, 0)
  return payroll;
}

const findEmployeeByFirstName = (array, name) => {
  return array.find(e => {
    return e.firstName === name;
  });
}