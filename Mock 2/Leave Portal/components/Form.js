export const Form = () => {
    return `

            <h1>Leave Form</h1>
            <hr/>
            
            <label>ID</label>
                <input type="text" name="id" required/>

                <label>Name</label>
                <input type="text" name="name" required/>

                <textarea required name="leave" id="" cols="30" rows="10" placeholder="Enter Valid Reason"></textarea>

            <div>
                <div>
                    <label>Designation</label>
                    <select name="designation" required>
                    <option value="">Select Designation</option>
                    <option value="Student">Student</option>
                    <option value="Employee">Employee</option>
                    </select>
                </div>

                <div>
                    <label>Overseer</label>
                    <select name="overseer" required>
                    <option value="">Select Overseer</option>
                    <option value="EC">EC</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    </select>    
                </div>
            </div>

                <div>
                    <div>
                        <label>Start Date</label>
                        <input type="date" name="Start_Date" id="date1"  required/>
                    </div>

                    <div>
                        <label>End Date</label>
                        <input type="date"  name="End_Date" id="date2" required/>
                    </div>
                </div>
            
            <input type="submit" value="Apply" />
    `;
};
