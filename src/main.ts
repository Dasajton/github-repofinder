import "./style.scss";
import { GitHubRepo } from "./interfaces";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = /*html*/ `
  <div class="wrapper">
    <h1>GitHub Repository Finder</h1>
    <form id="username-form">
      <input id="username-input" type="text" placeholder="Enter GitHub Username" />
      <button type="submit">Find Respositories</button>
    </form>
    <ul class="repo-list"></ul>
  </div>
`;

const formElem = document.querySelector<HTMLFormElement>("#username-form");
if (formElem) {
  formElem.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usernameInputElem =
      document.querySelector<HTMLInputElement>("#username-input");
    const username = usernameInputElem?.value.trim();
    if (username) {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const data = await response.json();
        const repoList = document.querySelector<HTMLUListElement>(".repo-list");
        let repoListHTML = "";
        data.forEach((repo: GitHubRepo) => {
          repoListHTML += /*html*/ `
              <li>
                <a href="${repo.html_url}" target="_blank">${repo.full_name}</a>
              </li>
            `;
        });
        if (repoList) {
          repoList.innerHTML = repoListHTML;
        } else {
          console.error("Element with class 'repo-list' not found!");
        }
      } catch (error) {
        console.log(error);
        alert("Error fetching repositories. Please try again later.");
      }
    } else {
      alert("Please enter a GitHub username.");
    }
  });
}
