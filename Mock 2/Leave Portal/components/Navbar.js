export const Navbar = () => {
    return `
            <img
                src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f5c3-fe0f.svg"
                alt=""
            />
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard.html">Dashboard</a></li>
                <li><a href="/status.html">Status</a></li>
            </ul>
            
        `;

};

document.querySelector("nav").innerHTML = Navbar();