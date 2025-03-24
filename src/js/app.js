import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  // Cover logic
  let cover = variables.includeCover
    ? `<div class="cover"><img src="${variables.background}" /></div>`
    : "<div class='cover'></div>";

  // Name composition
  const fullName =
    variables.name || variables.lastName
      ? `${variables.name || ""} ${variables.lastName || ""}`.trim()
      : "Lucy Boilett";

  // Role with default
  const role = variables.role || "Web Developer";

  // Location composition
  const location =
    variables.city || variables.country
      ? `${variables.city || ""}${
          variables.city && variables.country ? ", " : ""
        }${variables.country || ""}`
      : "Miami, USA";

  // Social media links
  const socialLinks = [
    { name: "twitter", url: variables.twitter },
    { name: "github", url: variables.github },
    { name: "linkedin", url: variables.linkedin },
    { name: "instagram", url: variables.instagram }
  ]
    .filter(link => link.url)
    .map(
      link =>
        `<li><a href="https://${link.name}.com/${link.url}" target="_blank"><i class="fab fa-${link.name}"></i></a></li>`
    )
    .join("");

  // Render the widget
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${fullName}</h1>
      <h2>${role}</h2>
      <h3>${location}</h3>
      <ul class="${variables.socialMediaPosition || "position-right"}">
        ${
          socialLinks.length
            ? socialLinks
            : '<li class="no-social">No social media</li>'
        }
      </ul>
    </div>
  `;
}

// Initialize with default values
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };

  render(window.variables);

  // Enhanced event handler for all inputs
  document.querySelectorAll(".picker").forEach(elm => {
    elm.addEventListener("input", function(e) {
      // Changed to 'input' for real-time updates
      const attribute = e.target.getAttribute("for");
      let value = this.value;

      // Convert string 'true'/'false' to boolean
      if (value === "true" || value === "false") {
        value = value === "true";
      }

      // Update variables and render
      window.variables[attribute] = value === "" ? null : value;
      render(window.variables);
    });
  });
};
