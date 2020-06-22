console.log("Client side javascript is loaded!");

const weatherForm = document.querySelector(".form");
const search = document.querySelector(".input");
const dataMessage = document.querySelector(".data");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  dataMessage.textContent = "Loading...";

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        dataMessage.textContent = data.error;
        console.log(data.error);
      } else {
        dataMessage.textContent = `Location: ${data.location}. ${data.forecast}`;

        console.log(data.location);
        console.log(data.forecast);
      }
    })
  );
});
