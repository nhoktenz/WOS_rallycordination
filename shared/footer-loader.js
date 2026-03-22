async function loadSharedFooter() {
    const footer = document.getElementById('sharedFooter');
    if (!footer) {
        return;
    }

    try {
        const footerPaths = ['../shared/footer.html', 'shared/footer.html', '/shared/footer.html'];
        let loadedHtml = null;

        for (const footerPath of footerPaths) {
            const response = await fetch(footerPath, { cache: 'no-store' });
            if (response.ok) {
                loadedHtml = await response.text();
                break;
            }
        }

        if (!loadedHtml) {
            throw new Error('Failed to load footer');
        }

        footer.innerHTML = loadedHtml;
    } catch (error) {
        footer.innerHTML = '<p>Created by <strong>[ADT]『ᴺʰᵒˣᴛᴇɴᴢᴬᴰᵀ༒天ヅ』- 2608</strong></p><p>Made for the Whiteout Survival community ❄️⚔️</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadSharedFooter);
