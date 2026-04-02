async function getImg(name) {
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    try {
        const title = encodeURIComponent(name.replace(/ /g, '_'));
        const res = await fetch(`https://naruto.fandom.com/pt-br/api.php?action=query&prop=images&titles=${title}&format=json`);
        const data = await res.json();
        const pages = data.query.pages;
        for (let page in pages) {
            console.log(pages[page].images);
        }
    } catch (e) { console.error(e); }
}
getImg("Zetsu");
getImg("Pain");
