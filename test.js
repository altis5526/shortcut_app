fetch("http://localhost:4000/sheet-data")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error("Error:", error));