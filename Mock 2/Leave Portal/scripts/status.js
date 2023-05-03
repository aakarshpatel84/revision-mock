import { Status_Table } from "../components/Table.js";

document.querySelector("table").innerHTML = Status_Table();

let status_data = JSON.parse(localStorage.getItem("status_data")) || [];

console.log("saved_data_from_Ls: ", status_data);

const Append_Data = () => {
    let tbody = document.querySelector("tbody");
    status_data.forEach((el) => {
        let TR = document.createElement("tr");

        let id = document.createElement("td");
        id.innerText = el.id;

        let name = document.createElement("td");
        name.innerText = el.name;

        let overseer = document.createElement("td");
        overseer.innerText = el.overseer;

        let diffarence = document.createElement("td");
        diffarence.innerText = `${el.diff} days`;


        let status = document.createElement("td");
        status.innerText = el.status;
        if (status.innerHTML === "Rejected") {
            status.style.color = "red";
        } else if (status.innerHTML === "Granted") {
            status.style.color = "green";
        } else {
            status.style.color = "grey";

        }

        TR.append(id, name, overseer, diffarence, status,);
        tbody.append(TR);

    });
};
Append_Data();