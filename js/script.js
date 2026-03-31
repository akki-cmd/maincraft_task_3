const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let error = document.getElementById("error");

    if (name === "" || email === "" || message === "") {
      error.textContent = "All fields are required!";
      return;
    }

    error.textContent = "";

    let formData = { name, email, message };

    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions.push(formData);

    localStorage.setItem("submissions", JSON.stringify(submissions));

    alert("Form submitted successfully!");
    form.reset();
  });
}

const container = document.getElementById("dataContainer");

if (container) {
  let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

  if (submissions.length === 0) {
    container.innerHTML = "<p>No submissions yet.</p>";
  } else {
    submissions.forEach((item, index) => {
      let div = document.createElement("div");
      div.style.border = "1px solid #ccc";
      div.style.margin = "10px";
      div.style.padding = "10px";

      div.innerHTML = `
        <h4>Submission ${index + 1}</h4>
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Email:</strong> ${item.email}</p>
        <p><strong>Message:</strong> ${item.message}</p>
      `;

      container.appendChild(div);
    });
  }
}
