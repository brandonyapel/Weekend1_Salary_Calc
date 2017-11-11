console.log('js');

$(document).ready(readyNow);

function readyNow () {
    console.log('JQuery has been loaded')
    //event listeners
    $("#submit-form").on('click',submitForm);//end submit-form event listener
    $(".delete-employee").on('click',deleteEmployee)
}//end readyNow
 

class employee {
    constructor(firstName,lastName,idNumber,jobTitle,annualSalary){
        //constructor properties for employee class objects
        this._firstName = firstName;
        this._lastName = lastName;
        this._idNumber = idNumber;
        this._jobTitle = jobTitle;
        this._annualSalary = annualSalary;
        this._monthlySalary = Math.round(annualSalary/12);
    }
    //getter methods for employee class objects
    get firstName () {
        return this._firstName;
    }
    get lastName () {
        return this._lastName;
    }
    get idNumber () {
        return this._idNumber;
    }
    get jobTitle () {
        return this._jobTitle;
    }
    get annualSalary () {
        return this._annualSalary;
    }
    get monthlySalary () {
        return this._monthlySalary
    }
}

//empty array for employees
var employees = [];
var newEmployee;
var firstName;
var lastName;
var idNumber;
var jobTitle;
var annualSalary;
var grossMonthlyExpense=0;

function submitForm () {
    console.log('submitForm()');
    //pull in employee-form inputs to variables
    firstName=$("#first-name").val();
    lastName=$("#last-name").val();
    idNumber=$("#id-number").val();
    jobTitle=$("#job-title").val();
    annualSalary=$("#annual-salary").val();
    //for statement to check for id repeats
    for (let i = 0; i < employees.length; i++) {
        //if statement for each employee in array
        if(idNumber==employees[i].idNumber){
            return 'Error'
        }//end if
        
    }//end for
    //create new employee class object using the above variables
    newEmployee= new employee(firstName,lastName,idNumber,jobTitle,annualSalary);
    //add newEmployee object to end of employees array
    employees.push(newEmployee)
    //create table row for newEmployee
    $("#employee-information-table").append('<tr id="'+idNumber+'"></tr>')
    //create table cells for newEmployee
    $("#"+idNumber).append('<td>'+firstName+'</td>');
    $("#"+idNumber).append('<td>'+lastName+'</td>');
    $("#"+idNumber).append('<td>'+idNumber+'</td>');
    $("#"+idNumber).append('<td>'+jobTitle+'</td>');
    $("#"+idNumber).append('<td>'+annualSalary+'</td>');
    $("#"+idNumber).append('<td><button class="delete-employee">Delete Employee</button></td>');
    //Add salary to grossMonthlyExpense
    grossMonthlyExpense += newEmployee.monthlySalary;
    //Change #monthly-expense value in html
    $("#monthly-expense").text('$'+grossMonthlyExpense)
    readyNow()
};//end submitForm Function

function deleteEmployee (){
    console.log('deleteEmployee()')
    //set id to equalquery the table row for the id number which is the employee id number
    var id=$(this).closest('tr').attr('id');
    //for loop to delete employee from array
    for (let index = 0; index < employees.length; index++) {
        if (employees[index].idNumber==id){
            //subtract salary from grossMonthlyExpense
            grossMonthlyExpense -= employees[index].monthlySalary;
            //Change #monthly-expense value in html
            $("#monthly-expense").text('$'+grossMonthlyExpense)
            //splice employee from employees array
            employees.splice(index,1);
        };//end if
    };//endfor
    //remove table Row for Employee
    $('#'+id).remove();
};//end deleteEmployee Function


