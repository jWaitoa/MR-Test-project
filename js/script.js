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
                    // Removes the 'selected' class from all size options
                    sizeOptionsContainer.querySelectorAll('.sizeButton').forEach(option => {
                        option.classList.remove('selected');
                    });
                    // Add the 'selected' class to the clicked size option
                    button.classList.add('selected');
                    const sizeLabel = document.getElementById('sizeLabel');
                    sizeLabel.textContent = option.label; // Updates size text content
                });
                sizeOptionsContainer.appendChild(button);
        });
    });
}

// Calls function when page loads
window.onload = function() {
    updateProductDetails();
};
