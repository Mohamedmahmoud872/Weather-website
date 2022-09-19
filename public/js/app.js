
const weather = document.querySelector('form');
const city = document.querySelector('input');
const message = document.querySelector('#message');

weather.addEventListener('submit', (e) => {
    e.preventDefault();
    const c = city.value;
    const url =  '/weather?address=' + c ; 
    message.textContent = 'Loading...';
    fetch(url).then((res) => {
        res.json().then((data) => {
            if(data.error){
                console.log(data.error);
                message.textContent = data.error;
            }else{
                message.textContent = data.temp;
                console.log(data.coord);
                console.log(data.temp);
            }
        });
    });
});