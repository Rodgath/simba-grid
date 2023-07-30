document.addEventListener('DOMContentLoaded', () => {
    
  function calculateNextDivisible(ref, num) {

    /* Calculate the next number that is divisible by reference number */
    const nextDivisible = Math.ceil(num / ref) * ref;
    
    return nextDivisible;
  }



  // Your JSON object
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


  const imageGridGap = 16;
  const imageGridItemHeight = 240;
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





  const imagesData = repeatArray(imagesObject, maxImagesToFetch);



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
      
      const imageGridItem = document.createElement("a");
      imageGridItem.classList.add("image-grid-item");
      
      imageGridItem.href = `https://www.example.com/${index}`;
      imageGridItem.textContent = "";
      imageGridItem.target = "_blank"; // Open link in a new tab
      imageGridItem.style.minHeight = `${imageGridItemHeight}px`;
      imageGridItem.style.backgroundImage = `url(${imageInfo.image})`;
      imageGridItem.style.backgroundSize = "cover";
      imageGridItem.style.backgroundPosition = "center";
      imageGridItem.style.borderRadius = `8px`;
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



  
  /* Handle scrolling */
  const scrollContent = () => {
    
    // console.log('0', imageGridContainer.offsetWidth);
    console.log('m', mainWrapper.scrollLeft);
    // console.log('g', mainWrapper.offsetWidth);
    const offset = (imageGridContainer.offsetWidth * gridRepeats) + (gridRepeats * imageGridGap);

    /* Reset the scroll position to the left when it reaches the end */
    if (mainWrapper.scrollLeft >= offset) {
      mainWrapper.scrollLeft -= offset;
    } else {
      mainWrapper.scrollLeft += 1; // Adjust the scrolling speed here
    }
    
    /* Request the next animation frame */
    requestAnimationFrame(scrollContent);
  };

  /* Start the scrolling animation */
  scrollContent();
  



  function repeatArray(array, targetLength) {
    const repeatedArray = [];
    const originalLength = array.length;
    const repeatCount = Math.ceil(targetLength / originalLength);

    for (let i = 0; i < repeatCount; i++) {
      repeatedArray.push(...array);
    }

    return repeatedArray.slice(0, targetLength);
  }

  // Example usage: Repeat the array until the length is 48 items
  // const repeatedImagesData = repeatArray(imagesData, 46);
  // console.log(repeatedImagesData);


  // Function to clone and append child elements to the end of the container
  function cloneAndAppendChildren(container) {
    const originalChildren = container.children;
    const cloneChildren = [];

    // Clone each child element
    for (let i = 0; i < originalChildren.length; i++) {
      const originalChild = originalChildren[i];
      const clonedChild = originalChild.cloneNode(true); // Set to true to deep clone with all descendants
      cloneChildren.push(clonedChild);
    }

    // Append the cloned children to the end of the container
    cloneChildren.forEach(clonedChild => {
      container.appendChild(clonedChild);
    });
  }
  
});