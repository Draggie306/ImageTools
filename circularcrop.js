// script.js
// on document DOM ready event is: 


var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    var loading = document.getElementById('loading');
    var status = document.getElementById('status');

    function handleImage(e) {
            loading.style.display = 'block';
            status.textContent = 'Loading image...';

            var reader = new FileReader();
            console.log(`[ImageTools/CircularCrop] File selected: ${e.target.files[0].name} (${e.target.files[0].size} bytes)`);
            reader.onload = function(event) {
                    img.onload = function() {
                            console.log(`[ImageTools/CircularCrop] Image loaded: ${img.width}x${img.height}`);
                            canvas.width = img.width;
                            canvas.height = img.height;
                            ctx.drawImage(img, 0, 0, img.width, img.height);
                            ctx.globalCompositeOperation = 'destination-in';
                            ctx.beginPath();
                            ctx.arc(img.width / 2, img.height / 2, Math.min(img.width, img.height) / 2, 0, Math.PI * 2, false); // this basically creates a circle
                            ctx.fill();
                            console.log(`[ImageTools/CircularCrop] Image cropped: ${img.width}x${img.height}`);
                            
                            status.textContent = 'Image cropped. Click on the image to download.';
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