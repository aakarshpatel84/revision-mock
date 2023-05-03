import { Table } from "../components/Table.js";

document.querySelector("table").innerHTML = Table();

let saved_data_from_Ls = JSON.parse(localStorage.getItem("leave_Saved_Data")) || [];


let status_data = JSON.parse(localStorage.getItem("status_data")) || [];


let parent_div;
const Append_Data = (saved_data_from_Ls) => {

    let table_body = document.querySelector("tbody");
    table_body.innerHTML = null;

    saved_data_from_Ls.forEach((el) => {
        let TR = document.createElement("tr");

        let id = document.createElement("td");
        id.innerText = el.id;

        let name = document.createElement("td");
        name.innerText = el.name;

        let otp = document.createElement("td");
        otp.innerText = el.otp;

        let overseer = document.createElement("td");
        overseer.innerText = el.overseer;

        let reason = document.createElement("td");
        reason.innerText = el.leave;

        let designation = document.createElement("td");
        designation.innerText = el.designation;

        let startDate = document.createElement("td");
        startDate.innerText = el.Start_Date;

        let endDate = document.createElement("td");
        endDate.innerText = el.End_Date;

        let leave_req = document.createElement("button");
        leave_req.innerText = "Leave";
        leave_req.style.backgroundColor = "red";
        leave_req.style.color = "white";
        leave_req.style.padding = "5px";
        leave_req.style.cursor = "pointer";

        let grant_req = document.createElement("button");
        grant_req.innerText = "Grant";
        grant_req.style.backgroundColor = "green";
        grant_req.style.marginRight = "10px";
        grant_req.style.padding = "5px";
        grant_req.style.color = "white";
        grant_req.style.cursor = "pointer";

        leave_req.addEventListener("click", () => {
            remove(el.id);
        });

        grant_req.addEventListener(("click"), () => {
            Model(el);

            let Form = document.querySelector("form");

            Form.addEventListener("submit", (e) => {
                otpFun(e, el.id);


            });

        });

        let req_wrapper = document.createElement("td");
        req_wrapper.append(grant_req, leave_req);

        TR.append(id, name, otp, overseer, reason, designation, startDate, endDate, req_wrapper);
        table_body.append(TR);

    });

};


Append_Data(saved_data_from_Ls);


// Delete

function remove(ID) {
    saved_data_from_Ls = saved_data_from_Ls.filter((item) => item.id !== ID);
    localStorage.setItem("leave_Saved_Data", JSON.stringify(saved_data_from_Ls));
    Append_Data(saved_data_from_Ls);

    status_data = status_data.map((el) => {
        if (el.id === ID) {
            return { ...el, status: "Rejected" };

        } else {
            return el;
        }
    });

    localStorage.setItem("status_data", JSON.stringify(status_data));

}

//  OTP Function
function otpFun(e, id) {
    e.preventDefault();
    let OTP = "";
    let Form = document.querySelector("form");
    for (let i = 0; i < Form.elements.length; i++) {
        let val = Form.elements[i].value;

        if (val !== "") {
            OTP += val;
        }
    }
    let user = saved_data_from_Ls.filter((elem) => elem.id === id);
    if (user[0].otp == OTP) {
        remove(id);
        console.log(user, OTP);

        status_data = status_data.map((val) => {
            if (val.id === id) {
                return { ...val, status: "Granted" };

            } else {
                return val;
            }

        });

        localStorage.setItem("status_data", JSON.stringify(status_data));
        alert("Leave Granted Successfull");
        document.querySelector("section>div").style.display = "none";
        document.querySelector("table").style.display = "block";

    } else {
        alert(" Invalid OTP");
    }

}




// Filter
let select = document.querySelector("select");
select.addEventListener(("change"), () => {
    let selected = select.value;
    let filteredData = saved_data_from_Ls.filter((el) => el.designation === selected);
    !selected ? Append_Data(saved_data_from_Ls) : Append_Data(filteredData);

});



//  Model Open
function Model(item) {
    console.log("item: ", item.name, item.Start_Date);
    let Form = document.querySelector("form");
    Form.style.margin = "auto";
    Form.style.display = "block";
    Form.style.display = "flex";
    Form.style.marginTop = "10px";


    // CSS
    document.querySelector("table").style.display = "none";
    close_btn.style.display = "block";
    document.querySelector("section>div").style.display = "block";

    let model_Box = document.querySelector("section > div");

    parent_div = document.createElement("div");
    parent_div.className = "parent";

    parent_div.innerHTML = null;

    let wrapper_div_left = document.createElement("div");
    wrapper_div_left.className = "wrapper_div_left";

    let wrapper_div_right = document.createElement("div");
    wrapper_div_right.className = "wrapper_div_right";


    let appName = document.createElement("p");
    appName.innerText = "Applicant";

    let name = document.createElement("h3");
    name.innerText = item.name;

    let start_date_Name = document.createElement("p");
    start_date_Name.innerText = "From";

    let startDate = document.createElement("h3");
    startDate.innerText = item.Start_Date;



    let overseer = document.createElement("p");
    overseer.innerText = "Overseer";

    let overseer_name = document.createElement("h3");
    overseer_name.innerText = item.overseer;

    let end_date_Name = document.createElement("p");
    end_date_Name.innerText = "To";

    let endDate = document.createElement("h3");
    endDate.innerText = item.End_Date;

    let diffrance = document.createElement("h3");
    diffrance.innerText = `${item.diff} Days`;
    diffrance.style.textAlign = "center";
    diffrance.style.marginTop = "10px";




    wrapper_div_left.append(appName, name, start_date_Name, startDate);

    wrapper_div_right.append(overseer, overseer_name, end_date_Name, endDate);

    parent_div.append(wrapper_div_left, wrapper_div_right,);

    model_Box.append(parent_div, diffrance, Form);

}

//  Close Button
let close_btn = document.querySelector("section>div>div>button");
close_btn.style.display = "none";
close_btn.addEventListener(("click"), () => {
    parent_div.innerHTML = null;
    let diffrance = document.createElement("h3");
    diffrance.innerHTML = null;
    document.querySelector("section>div").style.display = "none";
    document.querySelector("table").style.display = "block";
    location.reload();

});


//  Search
document.getElementById('search').addEventListener('input', () => {
    let query = document.getElementById('search').value;
    let low = query.toLowerCase();
    console.log("low: ", low);
    let copyData = saved_data_from_Ls;
    copyData = copyData.filter((el) => {
        return el.name.toLowerCase().includes(low);
    });
    Append_Data(copyData);
});


//  OTP components
const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");


const handleOTP = () => {
    // iterate over all inputs
    inputs.forEach((input, index1) => {
        input.addEventListener("keyup", (e) => {
            // This code gets the current input element and stores it in the currentInput variable
            // This code gets the next sibling element of the current input element and stores it in the nextInput variable
            // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
            const currentInput = input;
            const nextInput = input.nextElementSibling;
            const prevInput = input.previousElementSibling;

            // if the value has more than one character then clear it
            if (currentInput.value.length > 1) {
                currentInput.value = "";
                return;
            }
            // if the next input is disabled and the current value is not empty
            //  enable the next input and focus on it
            if (
                nextInput &&
                nextInput.hasAttribute("disabled") &&
                currentInput.value !== ""
            ) {
                nextInput.removeAttribute("disabled");
                nextInput.focus();
            }

            // if the backspace key is pressed
            if (e.key === "Backspace") {
                // iterate over all inputs again
                inputs.forEach((input, index2) => {
                    // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
                    // and the previous element exists, set the disabled attribute on the input and focus on the previous element
                    if (index1 <= index2 && prevInput) {
                        input.setAttribute("disabled", true);
                        input.value = "";
                        prevInput.focus();
                    }
                });
            }
            //if the fourth input( which index number is 3) is not empty and has not disable attribute then
            //add active class if not then remove the active class.
            if (!inputs[3].disabled && inputs[3].value !== "") {
                button.classList.add("active");
                return;
            }
            button.classList.remove("active");
        });
    });
};

handleOTP();