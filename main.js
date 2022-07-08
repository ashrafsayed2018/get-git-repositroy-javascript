// main variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let showData = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos();
}

// getrepos function 
function getRepos() {

    if(theInput.value === "") {
        showData.innerHTML = "Please enter a github username";
    } else {
        // fetch data from github api
        try {
            fetch(`https://api.github.com/users/${theInput.value}/repos`)
            .then(response => response.json())
    
            .then(data => {
                showData.innerHTML = "";
                data.forEach(repo => {
                //   create maindiv 
                let mainDiv = document.createElement("div");
                // create repo name text 
                let repoName = document.createTextNode(repo.name);
                // append the text to the main div
                mainDiv.appendChild(repoName);
                // create repo url anchor 

                let repoUrl = document.createElement("a");
                repoUrl.href = repo.html_url;
                // set attribtue target to _blank
                repoUrl.target = "_blank";
                // add class to the anchor
                repoUrl.classList.add("repo-url");

                // create repo url text
                let repoUrlText = document.createTextNode("Visit Repo");
                
                // append the text to the main div
                repoUrl.appendChild(repoUrlText);

                // append the anchor to the main div
                mainDiv.appendChild(repoUrl);
                // create stars count span 

                let starsCount = document.createElement("span");
                // create stars count text
                let starsCountText = document.createTextNode(`Stars: ${repo.stargazers_count}`);

                // append the text to the main div
                starsCount.appendChild(starsCountText);

                // append the span to the main div
                mainDiv.appendChild(starsCount);
                // append the main div to the show data div
                showData.appendChild(mainDiv);
                // add class on maindiv
                mainDiv.classList.add("repo-box");
                });
            })
        } catch(err) {

            showData.innerHTML = "Please enter a valid github username";
        }
  
    }

}

