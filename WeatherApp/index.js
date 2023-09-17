let loc=document.querySelector("#location p");
let temp=document.querySelector(".temp p");
let icon=document.getElementsByClassName("weather-icon");
let mood=document.querySelector(".temp-type p");
let inputval=document.getElementById("place-val");
let btnSearch=document.getElementById("b");

const api="8f4e4109d2c5ca3755a723a4ab046cae";


btnSearch.addEventListener('click',()=>{

    try{

        fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputval.value+"&appid=8f4e4109d2c5ca3755a723a4ab046cae").then(res => res.json())

        .then(data=>{
            console.log(data);
            let city=data['name'];
            let degrees=data['main']['temp'];
            let b=data['weather']['0']['description'];
            let iconID=data['weather']['0']['icon'];

            // https://openweathermap.org/img/wn/10d@2x.png

            loc.innerHTML=`<span>${city}</span>`;
            temp.innerHTML=`<span>${Math.round(degrees-273)}&#8451</span>`;
            mood.innerHTML=`<span>${b}</span>`;
            icon[0].src=`https://openweathermap.org/img/wn/${iconID}@2x.png`;

            inputval.value="";

        });

    }

    catch(e){
        console.log("city not found");
    }

    

})




    