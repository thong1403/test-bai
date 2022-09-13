let input = document.getElementById("inputText");
let wrapper = document.getElementById("wrapper");
function getData(url, fn) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        fn(undefined, JSON.parse(xhr.responseText));
      } else {
        fn(new Error(xhr.statusText), undefined);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

input.addEventListener("keyup", () => {
  getData(
    `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${input.value}`,
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        wrapper.innerHTML = "";
        for (let i = 0; i < res[1].length; i++) {
          console.log(res[1][i]);
          getData(
            `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageprops|pageimages&format=json&titles=${res[1][i]}`,
            (err1, res1) => {
              if (err1) {
                console.log(err1);
              } else {
                console.log(res1);

                let jerry = res1.query.pages;
                console.log(jerry);
                //  console.log(Object.keys(jerry));
                let a = Object.keys(jerry);
                // console.log(a);
                let img = res1.query.pages[a].thumbnail.source;
                console.log(img);
                let linkMota =
                  res1.query.pages[a].pageprops["wikibase-shortdesc"];
                console.log(linkMota);
                
                wrapper.innerHTML += `<div id="wrapper" class="wrapper">
      <div class="child"> <img src="${img}" alt="photo" class="img-one">${res[1][i]}</div>
  </div>`;
              }
            }
          );
        }
      }
    }
  );
});
