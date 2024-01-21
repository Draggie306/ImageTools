// script.js
// on document DOM ready event is: 


var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    var loading = document.getElementById('loading');
    var status_text = document.getElementById('status');

    function handleImage(e) {
        loading.style.display = 'block';
        status_text.textContent = 'Loading image...';
    
        var reader = new FileReader();
        console.log(`[ImageTools/CircularCrop] File selected: ${e.target.files[0].name} (${e.target.files[0].size} bytes)`);
        reader.onload = function(event) {
            img.onload = function() {
                console.log(`[ImageTools/CircularCrop] Image loaded: ${img.width}x${img.height}`);
                
                // ensure smallest dimension is used to calculate the circle
                var minDimension = Math.min(img.width, img.height);
                canvas.width = minDimension;
                canvas.height = minDimension;
    
                // funky maths to crop the image to a circle
                var offsetX = (img.width - minDimension) / 2;
                var offsetY = (img.height - minDimension) / 2;
    
                // draw the image to the canvas
                ctx.drawImage(img, offsetX, offsetY, minDimension, minDimension, 0, 0, minDimension, minDimension);
                
                ctx.globalCompositeOperation = 'destination-in';
                ctx.beginPath();
                ctx.arc(minDimension / 2, minDimension / 2, minDimension / 2, 0, Math.PI * 2, false); // this basically creates a circle
                ctx.fill();
                console.log(`[ImageTools/CircularCrop] Image cropped: ${minDimension}x${minDimension}`);
                
                status_text.textContent = 'Image cropped. Click on the image to download.';
                loading.style.display = 'none';
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);     
    }

    var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);

    // Auto download image
    canvas.addEventListener('click', function() {
            var link = document.createElement('a');
            // datetime
            link.download = `circular-crop-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
            link.href = canvas.toDataURL();
            link.click();
    });