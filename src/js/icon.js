
const urlIcon = "http://127.0.0.1:5500/src/json/icons.json";

export async function getIcons() {
    const iconsResponse = await fetch(urlIcon);
    const containerIcon = document.querySelector('.container-icon-card');
    try {
        const icons = await iconsResponse.json();
        icons.map((icon) => {
            containerIcon.innerHTML +=
                `
                <span class="span-icon">
                    <i class='${icon.icon}'></i> ${icon.description}
                </span>
            `
        })
    } catch (err) {
        console.error(`Erro ao recuperar os dados dos icons de Tecnologias favoritas! Error: ${err}`)
    }
}
getIcons();