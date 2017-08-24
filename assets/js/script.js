	var Gallery = {

	    getImageUrls: function(selector) {
	        imageUrlElements = document.getElementsByClassName("gallery-image")
	        return imageUrlElements;
	    },
	    addStyleUrls: function() {
	        styleSheet = document.createElement('link');
	        styleSheet.setAttribute('type', 'text/css');
	        styleSheet.setAttribute('rel', 'stylesheet');
	        styleSheet.setAttribute('href', 'assets/css/style.css');
	        document.getElementsByTagName('head')[0].appendChild(styleSheet)
	    },
	    getImageDimensions: function(imageArray) {
	        imageContainerDimensions = {
	            'width': 0,
	            'height': 0
	        };
	        for (let i = 0; i < imageArray.length; i++) {
	            if (imageArray[i].width > imageContainerDimensions.width) {
	                imageContainerDimensions.width = imageArray[i].width
	            }
	        }
	        imageContainerDimensions.width += 100;
	        imageContainerDimensions.height = imageContainerDimensions.width;
	        return imageContainerDimensions;
	    },
	    randomNumberBetweenRange: function(min,max) {
	    	if (max < min) {
	    		return 'Null';
	    	} else {
	    		return Math.floor(Math.random() * max) + 1
	    	}
	    },
	    initializeNavigation: function(currentImageIndex, leftNav, rightNav, imageUrls) {
	    	currentImageIndex = this.randomNumberBetweenRange(1,imageUrls.length-1)
	    	var imageCopy = document.getElementsByClassName('current-image')[0]
	    	imageCopy.src = imageUrls[currentImageIndex].src;
	    	var descriptionCopy = document.getElementsByClassName('description-container')[0]
	    	descriptionCopy.innerHTML = '<p>' + imageUrls[currentImageIndex].dataset.description + '</p>';
	    	currentDescription = imageUrls[currentImageIndex].dataset.description;    	
	        leftNav.onclick = function() {
	            console.log('Navigated from ' + currentImageIndex)
	            if (currentImageIndex == 0) {
	                currentImageIndex = imageUrls.length -1;
	                imageCopy.src = imageUrls[currentImageIndex].src;
	                descriptionCopy.innerHTML = '<p>' + imageUrls[currentImageIndex].dataset.description + '</p>';
	            } else {
	                currentImageIndex--;
	                imageCopy.src = imageUrls[currentImageIndex].src;
	                descriptionCopy.innerHTML = '<p>' + imageUrls[currentImageIndex].dataset.description + '</p>';
	            }
	        }
	        rightNav.onclick = function() {
	            console.log('Navigated from: ' + currentImageIndex)
	            if (currentImageIndex == imageUrls.length - 1) {
	                currentImageIndex = 0;
	                imageCopy.src = imageUrls[currentImageIndex].src;
	                descriptionCopy.innerHTML = '<p>' + imageUrls[currentImageIndex].dataset.description + '</p>';
	            } else {
	                currentImageIndex++;
	                imageCopy.src = imageUrls[currentImageIndex].src;
	                descriptionCopy.innerHTML = '<p>' + imageUrls[currentImageIndex].dataset.description + '</p>';
	            }
	        }
	    },
	    buildGalleryElements: function(selector, imageUrls) {
	        let galleryDimensions = this.getImageDimensions(imageUrls);
	        console.log(galleryDimensions);

	        // Build Gallery Container
	        let galleryContainer = document.createElement('div');
	        galleryContainer.setAttribute('class', 'gallery-container')
	        galleryContainer.setAttribute('style',
	            'width: ' + galleryDimensions.width + 'px; ')
	        selector.appendChild(galleryContainer)

	        // Build Controls

	        // Left nav
	        let leftNav = document.createElement('div')
	        leftNav.setAttribute('class', 'left-nav')
	        leftNav.innerHTML = '<span class="nav-carat fa fa-arrow-circle-o-left"></span>'
	        galleryContainer.appendChild(leftNav)

	        // Right nav
	        let rightNav = document.createElement('div')
	        rightNav.setAttribute('class', 'right-nav')
	        rightNav.innerHTML = '<span class="nav-carat fa fa-arrow-circle-o-right"></span>'
	        galleryContainer.appendChild(rightNav)

	        // Build nagigation skeleton
	        currentImage = document.createElement('div');
	        currentImage.setAttribute('class', 'current-image-container');
	        currentImageSource = document.createElement('img');
	        currentImageSource.setAttribute('class', 'current-image');
	        currentImage.appendChild(currentImageSource);
	        leftNav.after(currentImage);

	        // Add Description Container
	        descriptionContainer = document.createElement('div');
	        descriptionContainer.setAttribute('class','description-container')
	        currentImage.after(descriptionContainer)

	        // Initialize navigation
	        let currentImageIndex = 0;
	        this.initializeNavigation(currentImageIndex, leftNav, rightNav, imageUrls);

	        // Build gallery image container with images
	        let galleryImageContainer = document.createElement('div');
	        galleryImageContainer.setAttribute('class', 'gallery-image-container')
	        galleryContainer.appendChild(galleryImageContainer)
	        for (let img = 0; img < imageUrls.length; img++) {
	            let currentImage = document.createElement('img');
	            currentImage = new Image();
	            currentImage.src = imageUrls[img].src;
	            currentImage.setAttribute('class', 'gallery-i')
	            galleryImageContainer.appendChild(currentImage)
	            
	        }
	    },
	    setDefaultImage: function(selector, options) {
	        imageUrls = this.getImageUrls(selector);
	        defaultImage = new Image()
	        defaultImage.src = imageUrls[this.randomNumberBetweenRange(1,imageUrls.length)].src
	        imageContainer = document.getElementsByClassName('gallery-image-container')[0];
	        imageContainer.setAttribute(
	            'style', 'background-image: url("' + defaultImage.src + '"); ' +
	            'width: ' + defaultImage.width + 'px; ' +	            
	            'z-index: -1; background-size: contain;'
	        )
	    },
	    initialize: function(selector, options) {
	    	document.getElementsByTagName('title')[0].innerHTML = options.title;
	        selector = document.getElementById(selector);
	        this.addStyleUrls();
	        imageUrls = this.getImageUrls(selector);
	        this.buildGalleryElements(selector, imageUrls);      
	    }
	}