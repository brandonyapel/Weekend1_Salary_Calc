console.log('js');


$(document).ready(readyNow);
$(document).ready(homeButton);

function readyNow () {
    console.log('JQuery has been loaded')
    //event listeners
    $("#submit-form").on('click',submitForm);
    $(".delete-employee").on('click',deleteEmployee);
    $("#home-menubutton").on('click',homeButton);
    $("#employee-entry-menubutton").on('click',employeeEntryFormButton);
    $("#labor-expense-menubutton").on('click',laborExpenseButton);
    $("#add-example-employees").on('click',addExampleEmployees );
    $("#generate-random-id").on('click',generateRandomID);
    $("#clear-form").on('click',clearForm);
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
var grossAnnualExpense=0;

//example employees
var Trump = new employee('Donald','Trump',1,"President",400000);
var Pence = new employee('Mike','Pence',2,"Vice President",230700);
var Ryan = new employee('Paul','Ryan',3,"Speaker of the House",223500);
var Hatch = new employee('Orrin','Hatch',4,"President Pro Tempore",193400);
var Tillerson = new employee ('Rex','Tillerson',5,"Secretary of State",199700);
var Mnuchin = new employee('Steven','Mnuchin',6,"Secretary of Treasury",199700);
var Mattis = new employee('James','Mattis',7,"Secretary of Defense",199700);
var Sessions = new employee('Jeff','Sessions',8,"Attorney General",199700);
var Zinke = new employee('Ryan','Zinke',9,"Secretary of Interior",199700);
var Perdue = new employee('Sonny','Perdue',10,"Secretary of Agriculture",199700);
var Wilbur = new employee('Wilbur', 'Ross',11,"Secretary of Commerce",199700);
var Acosta = new employee('Alexander','Acosta',12,"Secretary of Labor",199700);
var Price = new employee('Tom','Price',13,"Secretary of Health and Human Services",199700);
var Carson = new employee('Ben','Carson',14,"Secretary of Housing and Urban Development",199700);
var Chao = new employee('Elaine','Chao',15,"Secretary of Transportation", 199700);
var Perry = new employee('Rick','Perry',16,"Secretary of Energy", 199700);
var DeVos = new employee('Betsy','DeVos',17,"Secretary of Education",199700);
var Shulkin = new employee('David','Shulkin', 18,"Secretary of Veteran Affairs",199700);
var Kelly = new employee('John','Kelly',19,"Secretary of Homeland Security",199700);


var exampleEmployees = [Trump,Pence,Ryan,Hatch,Tillerson,Mnuchin,Mattis,Sessions,Zinke,Perdue,Wilbur,Acosta,Price,Carson,Chao,Perry,DeVos,Shulkin,Kelly];

//add exampleEmployees to employees array
function addExampleEmployees () {
    for (let exampleIndex = 0; exampleIndex < exampleEmployees.length; exampleIndex++) {
        firstName=$("#first-name").val();
        lastName=$("#last-name").val();
        idNumber=$("#id-number").val();
        jobTitle=$("#job-title").val();
        annualSalary=$("#annual-salary").val();
        //for statement to check for id repeats
        for (let h = 0; h < employees.length; h++) {
            //if statement for each employee in array
            if (employees.length > 0){
                if(exampleEmployees[exampleIndex].idNumber==employees[h].idNumber){
                    confirm('Error Employees on this list are already present in file cannot add.')
                    console.log('error for id:'+exampleEmployees[exampleIndex].idNumber,employees[h].idNumber);
                    return 'Error'
                }//end if  
            }//ened not 0 if
        }//end child for
        employees.push(exampleEmployees[exampleIndex]);
        //create table row for newEmployee
        $("#employee-information-table").append('<tr id="'+exampleEmployees[exampleIndex].idNumber+'"></tr>')
        $("#"+exampleEmployees[exampleIndex].idNumber).append('<td>'+exampleEmployees[exampleIndex].firstName+'</td>');
        $("#"+exampleEmployees[exampleIndex].idNumber).append('<td>'+exampleEmployees[exampleIndex].lastName+'</td>');
        $("#"+exampleEmployees[exampleIndex].idNumber).append('<td>'+exampleEmployees[exampleIndex].idNumber+'</td>');
        $("#"+exampleEmployees[exampleIndex].idNumber).append('<td>'+exampleEmployees[exampleIndex].jobTitle+'</td>');
        $("#"+exampleEmployees[exampleIndex].idNumber).append('<td>'+exampleEmployees[exampleIndex].annualSalary+'</td>');
        $("#"+exampleEmployees[exampleIndex].idNumber).append('<td><button class="delete-employee">Delete Employee</button></td>');
        //Add salary to grossMonthlyExpense and grossAnnualExpense
        grossMonthlyExpense += exampleEmployees[exampleIndex].monthlySalary;
        grossAnnualExpense += exampleEmployees[exampleIndex].annualSalary;
    }//end parent for
        //Change #monthly-expense value in html
    $("#annual-expense").text('$'+grossMonthlyExpense);
    $("#monthly-expense").text('$'+grossAnnualExpense);
    //call event listener otherwise delete buttons do not work. Tried readyNow but it created an infinite loop
    $(".delete-employee").on('click',deleteEmployee);
    return 'sucess';
};

//submit button for entry form
function submitForm () {
    console.log('submitForm()');
    //check that all fields were filled out
    if(!$("#first-name").val()){
        confirm('Error First Name Field is blank');
        return 'Error';
    };
    if(!$("#last-name").val()){
        confirm('Error Last Name Field is blank');
        return 'Error';
    };
    if(!$("#id-number").val()){
        confirm('Error ID Number Field is blank');
        return 'Error';
    };
    if(!$("#job-title").val()){
        confirm('Error Job Title Field is blank');
        return 'Error';
    };
    if(!$("#annual-salary").val()){
        confirm('Error Annual Salary Field is blank');
        return 'Error';
    };
    if($("#id-number").val()<10000){
        confirm('Error ID Number must be greater than 10000');
        return 'Error';
    };
    if($("#id-number").val()>1000000){
        confirm('Error ID Number must be less than 1000000');
        return 'Error';
    }
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
            confirm('Error Employee ID number is already inuse.');
            return Error;
        };//end if  
    };//end for
    
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
    //Add salary to grossMonthlyExpense and grossAnnualExpense
    grossMonthlyExpense += newEmployee.monthlySalary;
    grossAnnualExpense += newEmployee.annualSalary;
    //Change #monthly-expense value in html
    $("#annual-expense").text('$'+grossMonthlyExpense)
    $("#monthly-expense").text('$'+grossMonthlyExpense)
    //Switch to Labor Expense Page
    laborExpenseButton();
    //Call eventlistener Otherwise my delete buttons do not work
    $(".delete-employee").on('click',deleteEmployee);
    //clears values from entry form
    clearForm()
};//end submitForm Function

function deleteEmployee (){
    console.log('deleteEmployee()')
    //set id to equalquery the table row for the id number which is the employee id number
    var id=$(this).closest('tr').attr('id');
    //for loop to delete employee from array
    for (let index = 0; index < employees.length; index++) {
        if (employees[index].idNumber==id){
            //subtract salary from grossMonthlyExpense and grossAnnualExpense
            grossMonthlyExpense -= employees[index].monthlySalary;
            grossAnnualExpense -= employees[index].annualSalary;
            //Change #monthly-expense and #annual-expense value in html
            $("#annual-expense").text('$'+grossAnnualExpense);
            $("#monthly-expense").text('$'+grossMonthlyExpense);
            //splice employee from employees array
            employees.splice(index,1);
        };//end if
    };//endfor
    //remove table Row for Employee
    $('#'+id).remove();
};//end deleteEmployee Function

function homeButton (){
    $("#employee-form").hide();
    $("#labor-expense-information").hide();
    $("#home").show();
};

function employeeEntryFormButton (){
    $("#home").hide()
    $("#labor-expense-information").hide();
    $("#employee-form").show();
};

function laborExpenseButton () {
    $("#employee-form").hide();
    $("#home").hide()
    $("#labor-expense-information").show();
}

function generateRandomID () {
    //create a random number
    var testRandomNumber = Math.floor(Math.random()*80000)+20000
    console.log(testRandomNumber);
    //test randomNumber against existing ID's to make sure it doesn't match
    for (let randomIndex = 0; randomIndex < employees.length; randomIndex++) {
        if(employees[randomIndex].idNumber==testRandomNumber){
            return generateRandomID();
        };//end if   
    };//end for
    //place set randomnumber into Input field
    $('#id-number').val(testRandomNumber);
};//end generateRandomID function

function clearForm () {
    $("#first-name").val('');
    $("#last-name").val('');
    $("#id-number").val('');
    $("#job-title").val('');
    $("#annual-salary").val('');
}
