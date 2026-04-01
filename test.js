async function test() {
    const { JSDOM } = require('jsdom');

    // Simulate what the browser does in fetchCharacterHistory
    const name = "Naruto Uzumaki";
    try {
        const title = encodeURIComponent(name.replace(/ /g, '_'));
        const res = await fetch(`https://naruto.fandom.com/pt-br/api.php?action=parse&page=${title}&format=json&prop=text&origin=*`);
        const data = await res.json();

        if (data && data.parse && data.parse.text) {
            const htmlContent = data.parse.text['*'];
            const dom = new JSDOM(htmlContent);
            const doc = dom.window.document;

            const selectorsToRemove = ['table', '.toc', '.infobox', '.navbox', 'script', 'style', '.mw-editsection', '.reference', '.thumb'];
            selectorsToRemove.forEach(sel => {
                doc.querySelectorAll(sel).forEach(el => el.remove());
            });

            const paragraphs = Array.from(doc.querySelectorAll('p'))
                .map(p => p.textContent.trim())
                .filter(p => p.length > 50);

            if (paragraphs.length > 0) {
                console.log("Success! Found " + paragraphs.length + " paragraphs.");
                console.log(paragraphs[0]);
                process.exit(0);
            }
        }
    } catch (e) {
        console.error("Erro", e);
    }
}
test();
