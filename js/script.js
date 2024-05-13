// Fetches API and updates the HTML
function updateProductDetails() {
    fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
        .then(res => {
            return res.json();
        })
        .then(data => {
            document.getElementById('title').textContent = data.title;
            document.getElementById('price').textContent = '$' + data.price.toFixed(2);
            document.getElementById('description').textContent = data.description;
            
            const sizeOptionsContainer = document.getElementById('sizeOptions');
            data.sizeOptions.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option.label;
                button.classList.add('sizeButton');
                button.addEventListener('click', function() {
                    console.log('Size selected:', option.label);
                });
                sizeOptionsContainer.appendChild(button);
            });
        });
}

// Calls function when page loads
window.onload = function() {
    updateProductDetails();
};
