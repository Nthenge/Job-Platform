const checkBoxes = document.querySelectorAll('.checkbox input');
checkBoxes.forEach(c => {
    c.addEventListener("change", () => {
        const label = document.querySelector('label[for="${c.name}"]');
        if(c.checked){
            label.style.color = "#1A!E2B";
        }else{
            label.style.color = "#808487";
        }
    });
})

const sidebar = document.querySelector('.sidebar');
const menuBtn = document.getElementById('menuToggle');

menuBtn.addEventListener("click", ()=>{
    sidebar.style.left = "0px";
})

document.addEventListener('click', (event) => {
    const isClickInside = sidebar.contains(event.target) || menuBtn.contains(event.target);
    if(!isClickInside){
        sidebar.style.left = "-172px"
    }
})