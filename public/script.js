function loadNavbar()
{
    const nbar = document.getElementById("nbar")
    fetch('http://localhost:5000/navbar')
    .then(res => res.text())
}