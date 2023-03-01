const altGeneratorUrl = 'https://random-word-api.herokuapp.com/word?number=1'

const scanImages = () => {

    const updateImageAlt = (img) =>{
        fetch(altGeneratorUrl)
            .then((response) => response.json())
            .then((data) => img.setAttribute('alt', data[0]))
    
            img.style.border = '2px solid #1F459E'
    
            img.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = img.alt;
                input.style.border = '2px solid #1F459E';
                input.addEventListener('blur', () => {
                    img.alt = input.value;
                    input.parentNode.removeChild(input);
                });
                img.parentNode.insertBefore(input, img.nextSibling)
                input.focus();
            })
    }

    let imgArr = [...document.querySelectorAll('img')]
    imgArr.forEach(img => {
        updateImageAlt(img)
    })

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            const addedNodes = mutation.addedNodes;
            const removedNodes = mutation.removedNodes;
            for (let i = 0; i < addedNodes.length; i++) {
              const node = addedNodes[i];
              if (node.tagName === 'IMG') {
                  updateImageAlt(node)
              }
            }
            for (let i = 0; i < removedNodes.length; i++) {
              const node = removedNodes[i];
              if (node.tagName === 'IMG') {
                node.removeEventListener('click', function() {});
              }
            }
          }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
