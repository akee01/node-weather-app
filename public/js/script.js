console.log("Client side script is loaded.")

form = document.getElementById("location-form");
search = document.getElementById("location-input");
results = document.querySelector(".results");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    results.innerText = "Loading...";
    fetch("/weather?address="+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                return results.innerText = data.error;
            }
            results.innerText = data.forecast;
            results.innerText += "\n"+data.location;
        });
    });
});