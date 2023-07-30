document.addEventListener('DOMContentLoaded', () => {
    
  function calculateNextDivisible(ref, num) {

    /* Calculate the next number that is divisible by reference number */
    const nextDivisible = Math.ceil(num / ref) * ref;
    
    return nextDivisible;
  }



  
  const imagesObject = [
    { "image": "images/01.jpg" },
    { "image": "images/02.jpg" },
    { "image": "images/03.jpg" },
    { "image": "images/04.jpg" },
    { "image": "images/05.jpg" },
    { "image": "images/06.jpg" },
    { "image": "images/07.jpg" },
    { "image": "images/08.jpg" },
    { "image": "images/09.jpg" },
    { "image": "images/10.jpg" },
    { "image": "images/11.jpg" },
    { "image": "images/12.jpg" },
    { "image": "images/13.jpg" },
    { "image": "images/14.jpg" },
    { "image": "images/15.jpg" },
    { "image": "images/16.jpg" },
    { "image": "images/17.jpg" },
    { "image": "images/18.jpg" },
    { "image": "images/19.jpg" },
    { "image": "images/20.jpg" },
    { "image": "images/21.jpg" }
  ];


  const animationStyle = 'zoomRotate'; // 'zoom', 'rotate', 'zoomRotate'
  const shuffleGridItems = false;
  const scrollSpeed = 3;
  const pauseOnHover = true;
  const imageGridGap = 0;
  const imageGridItemHeight = 280;
  const imageGridContainerWidth = 1200;
  const imageGridContainerRows = 3;
  const imageGridContainerCols = 3;
  const imageChunkCount = imageGridContainerRows*imageGridContainerCols;
  // const imagesToFetch = 15;
  const imagesToFetch = imagesObject.length+3;
  const maxImagesToFetch = calculateNextDivisible(imageChunkCount, imagesToFetch);
  const gridRepeats = maxImagesToFetch/imageChunkCount;

  console.log('imagesToFetch', imagesToFetch);
  console.log('maxImagesToFetch', maxImagesToFetch);



  const shuffleArray = (array) => {
    
    /* Make a copy of the original array to prevent altering the original array */
    const shuffledArray = array.slice(); // 

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }

  const shuffled = shuffleGridItems ? shuffleArray(imagesObject) : imagesObject;
  
  const imagesData = repeatArray(shuffled, maxImagesToFetch);
  
  /* Create a single grid and append images to it */
  const createImageGrid = (imageGroup, num) => {

    const container = document.createElement("div");
    container.classList.add("image-grid-container");
    container.style.minWidth = `${imageGridContainerWidth}px`;
    
    const imageGrid = document.createElement("div");
    imageGrid.classList.add("image-grid");
    
    imageGrid.style.display = "grid";
    imageGrid.style.gridTemplateColumns = `repeat(${imageGridContainerCols}, 1fr)`;
    imageGrid.style.gap = `${imageGridGap}px`;
    
    imageGroup.forEach((imageInfo, index) => {
      
      const imageGridItem = document.createElement("div");
      imageGridItem.classList.add("image-grid-item");
      
      imageGridItem.style.minHeight = `${imageGridItemHeight}px`;
      imageGridItem.style.backgroundImage = `url(${imageInfo.image})`;
      imageGridItem.style.backgroundSize = "cover";
      imageGridItem.style.backgroundPosition = "center";
      // imageGridItem.style.borderRadius = `8px`;
      
      imageGrid.appendChild(imageGridItem);
      container.appendChild(imageGrid);
    });

    return container;
  };


  /* Get the contents of the JSON object in groups of three */
  const gridGroups = chunkArray(imagesData, imageChunkCount);
  const gridGroupsCount = gridGroups.length;
  const gridGroupsCols = gridGroupsCount * 2; // Double the grid for smooth infinite effect

  const mainWrapper = document.querySelector('.main-wrapper');

  mainWrapper.style.display = "grid";
  mainWrapper.style.gap = `${imageGridGap}px`;
  mainWrapper.style.gridTemplateColumns = `repeat(${gridGroupsCols}, 1fr)`;
  mainWrapper.style.gridAutoRows = `${imageGridItemHeight*imageGridContainerRows}px`;
  mainWrapper.style.height = `${((imageGridItemHeight+imageGridGap)*imageGridContainerRows)-imageGridGap}px`;
  // mainWrapper.appendChild(wrapper);

  /* Group array elements in sets of 'chunkSize' */
  function chunkArray(arr, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  gridGroups.forEach((group, index) => {
    // console.log('group', group);
    const gridContainer = createImageGrid(group, index);
    
    mainWrapper.appendChild(gridContainer);
    
  })

  cloneAndAppendChildren(mainWrapper);

  const imageGridContainer = document.querySelector(".image-grid-container");
  
  let isHovering = false;

  /* Handle scrolling */
  const scrollContent = () => {

    /* Check if the mainWrapper is being hovered */
    if (!isHovering) {
      
      const offset = (imageGridContainer.offsetWidth * gridRepeats) + (gridRepeats * imageGridGap);

      /* Reset the scroll position to the left when it reaches the end */
      if (mainWrapper.scrollLeft >= offset) {
        mainWrapper.scrollLeft -= offset;
      } else {
        mainWrapper.scrollLeft += scrollSpeed; // Adjust the scrolling speed here
      }
    }

    /* Request the next animation frame */
    requestAnimationFrame(scrollContent);
  };

  /* Start the scrolling animation */
  scrollContent();

  /* Event listeners to detect hover state */
  mainWrapper.addEventListener('mouseenter', () => isHovering = pauseOnHover ? true : false );
  mainWrapper.addEventListener('mouseleave', () => isHovering = false );
  
  function repeatArray(array, targetLength) {
    const repeatedArray = [];
    const originalLength = array.length;
    const repeatCount = Math.ceil(targetLength / originalLength);

    for (let i = 0; i < repeatCount; i++) {
      repeatedArray.push(...array);
    }

    return repeatedArray.slice(0, targetLength);
  }
  
  /* Clone and append child elements to the end of the container */
  function cloneAndAppendChildren(container) {
    const originalChildren = container.children;
    const cloneChildren = [];

    /* Clone each child element */
    for (let i = 0; i < originalChildren.length; i++) {
      const originalChild = originalChildren[i];
      const clonedChild = originalChild.cloneNode(true); // Set to true to deep clone with all descendants
      cloneChildren.push(clonedChild);
    }

    /* Append the cloned children to the end of the container */
    cloneChildren.forEach(clonedChild => {
      container.appendChild(clonedChild);
    });

    /* Handle animations */
    const gridItems = container.querySelectorAll('.image-grid-item')
    for (let j = 0; j < gridItems.length; j++) {
      const gridItem = gridItems[j];
      
      let transformStart = '';
      let transformEnd = '';
      
      switch (animationStyle) {
        case 'zoom':
          transformStart = 'scale(0)';
          transformEnd = 'scale(1)';
          break;
        case 'rotate':
          transformStart = 'rotate(-20deg)';
          transformEnd = 'rotate(0deg)';
          break;
        case 'zoomRotate':
          transformStart = 'rotate(-20deg) scale(0)';
          transformEnd = 'rotate(0deg) scale(1)';
          break;
        default:
          break;
      }
      
      gridItem.style.opacity = 0;
      gridItem.style.transform = transformStart;
      gridItem.style.transitionProperty = `opacity, transform`;
      gridItem.style.transitionDuration = `0.4s, 0.4s`;
      gridItem.style.transitionTimingFunction = `linear, linear`;
      gridItem.style.transitionDelay = `0s, 0s`;
          
      setTimeout(() => {
        // gridItem.style.transitionDelay = `0.${j*2}s, 0.${j*2}s`;
        gridItem.style.opacity = 1;
        gridItem.style.transform = transformEnd;
      }, j*200);
    }
  }
  
});