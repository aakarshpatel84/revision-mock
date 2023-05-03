import { Form } from "../components/Form.js";
document.querySelector("form").innerHTML = Form();
let submitted_Data = JSON.parse(localStorage.getItem("leave_Saved_Data")) || [];
let status_data = JSON.parse(localStorage.getItem("status_data")) || [];

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let Form = document.querySelector("form");
    let formData = {};

    let otp = Math.floor(1000 + Math.random() * 9000);
    let status = "Pending";
    for (let i = 0; i < Form.elements.length; i++) {
        let key = Form.elements[i].name;
        if (key !== "") {
            formData[key] = Form.elements[i].value;
        }
        var date1 = document.getElementById("date1").value;
        var date2 = document.getElementById("date2").value;

        // Create Date objects from the input values
        var date1Obj = new Date(date1);
        var date2Obj = new Date(date2);

        // Calculate the difference in milliseconds
        var difference = Math.abs(date2Obj - date1Obj);

        // Convert the difference to days
        var differenceInDays = difference / (1000 * 60 * 60 * 24);


        formData["otp"] = otp;
        formData["status"] = status;
        formData["diff"] = differenceInDays;



        // console.log(formData);
    }

    let isChecked = submitted_Data.filter((el) => el.id === formData.id);
    if (isChecked.length === 0) {
        submitted_Data.push(formData);

        localStorage.setItem("leave_Saved_Data", JSON.stringify(submitted_Data));
        console.log(submitted_Data);
        Form.reset();
        status_data.push(formData);

        // Status Data
        localStorage.setItem("status_data", JSON.stringify(status_data));
        console.log(status_data);
        alert(`Dear ${formData.name} your request has been submitted`);

    } else {
        alert("this id  already taken");
    }
});

