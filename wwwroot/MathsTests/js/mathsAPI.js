async function web_API_getMaths(host, path, callback) {
    try {
        const response = await fetch(`${host}${path}`);
        const data = await response.json();
        callback(data);
        let verdict = document.getElementById("verdict");
        verdict.innerHTML = "Bravo! Aucun problème";
    } catch (error) {
       
        verdict.innerHTML = "Oups";
        console.error('Error fetching data:', error);
    }
}

async function showResult(data) {
    let divInfos = document.getElementById("maths");
    divInfos.innerHTML += "OK --->" +JSON.stringify(data) + "<br>";
    
   // console.log('Result:', data);
}


const start = async function name() {
    let host = document.getElementById('url_id').value;

    let divInfos = document.getElementById("maths");
    divInfos.innerHTML= "";

    await web_API_getMaths(host, '?op=+&x=-111&y=-224', showResult);
    await web_API_getMaths(host, '?op=-&x=1&y=abc', showResult);
    await web_API_getMaths(host, '?op=-&x=111&y=224', showResult);
    await web_API_getMaths(host, '?op=*&x=11.56&y=244.12345', showResult);
    await web_API_getMaths(host, '?op=/&x=99&y=11.06', showResult);
    await web_API_getMaths(host, '?op=/&x=99&y=0', showResult);
    await web_API_getMaths(host, '?op=/&x=0&y=0', showResult);
    await web_API_getMaths(host, '?op=%&x=5&y=5', showResult);
    await web_API_getMaths(host, '?op=%&x=100&y=13', showResult);
    await web_API_getMaths(host, '?op=%&x=100&y=0', showResult);
    await web_API_getMaths(host, '?op=%&x=0&y=0', showResult);
    await web_API_getMaths(host, '?op=!&n=0', showResult);
    await web_API_getMaths(host, '?op=p&n=0', showResult);
    await web_API_getMaths(host, '?op=p&n=1', showResult);
    await web_API_getMaths(host, '?op=p&n=2', showResult);
    await web_API_getMaths(host, '?op=p&n=5', showResult);
    await web_API_getMaths(host, '?op=p&n=6', showResult);
    await web_API_getMaths(host, '?op=p&n=6.5', showResult);
    await web_API_getMaths(host, '?op=p&n=113', showResult);
    await web_API_getMaths(host, '?op=p&n=114', showResult);
    await web_API_getMaths(host, '?op=np&n=1', showResult);
    await web_API_getMaths(host, '?op=np&n=30', showResult);
    await web_API_getMaths(host, '?op=+&X=111&y=244', showResult);
    await web_API_getMaths(host, '?op=+&x=111&Y=244', showResult);
    await web_API_getMaths(host, '?op=+&x=111&y=244&z=0', showResult);
    await web_API_getMaths(host, '?op=!&n=5&z=0', showResult);
    await web_API_getMaths(host, '?op=!&n=5.5', showResult);
    await web_API_getMaths(host, '?z=0', showResult);
    await web_API_getMaths(host, '?op=!&n=-5', showResult);
    await web_API_getMaths(host, '?x', showResult);
}

let starting = document.getElementById('démarrer');
starting.addEventListener("click", start);
