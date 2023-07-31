document.addEventListener('DOMContentLoaded', () => {
    
  function calculateNextDivisible(ref, num) {

    /* Calculate the next number that is divisible by reference number */
    const nextDivisible = Math.ceil(num / ref) * ref;
    
    return nextDivisible;
  }



  
  const gridItemsObject = [
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
  const shuffleGridItems = true;
  const scrollSpeed = 3;
  const pauseOnHover = true;
  const gridGap = 0;
  const gridItemHeight = 280;
  const gridContainerWidth = 1200;
  const gridContainerRows = 3;
  const gridContainerCols = 3;
  const gridChunkCount = gridContainerRows*gridContainerCols;
  // const gridItemsToFetch = 15;
  const gridItemsToFetch = gridItemsObject.length+3;
  const maxGridItemsToFetch = calculateNextDivisible(gridChunkCount, gridItemsToFetch);
  const gridRepeats = maxGridItemsToFetch/gridChunkCount;

  console.log('gridItemsToFetch', gridItemsToFetch);
  console.log('maxGridItemsToFetch', maxGridItemsToFetch);



  const shuffleArray = (array) => {
    
    /* Make a copy of the original array to prevent altering the original array */
    const shuffledArray = array.slice(); // 

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }

  const shuffled = shuffleGridItems ? shuffleArray(gridItemsObject) : gridItemsObject;
  
  const gridItemsData = repeatArray(shuffled, maxGridItemsToFetch);
  
  /* Create a single grid and append images to it */
  const createItemGrid = (itemGroup, num) => {

    const simbaGridContainer = document.createElement("div");
    simbaGridContainer.classList.add("simba-grid-container");
    simbaGridContainer.style.minWidth = `${gridContainerWidth}px`;
    
    const simbaGrid = document.createElement("div");
    simbaGrid.classList.add("simba-grid");
    
    simbaGrid.style.display = "grid";
    simbaGrid.style.gridTemplateColumns = `repeat(${gridContainerCols}, 1fr)`;
    simbaGrid.style.gap = `${gridGap}px`;
    
    itemGroup.forEach((imageInfo, index) => {
      
      const simbaGridItem = document.createElement("div");
      simbaGridItem.classList.add("simba-grid-item");
      
      simbaGridItem.style.minHeight = `${gridItemHeight}px`;
      simbaGridItem.style.backgroundImage = `url(${imageInfo.image})`;
      simbaGridItem.style.backgroundSize = "cover";
      simbaGridItem.style.backgroundPosition = "center";
      // simbaGridItem.style.borderRadius = `8px`;
      
      simbaGrid.appendChild(simbaGridItem);
      simbaGridContainer.appendChild(simbaGrid);
    });

    return simbaGridContainer;
  };


  /* Get the contents of the JSON object in groups of three */
  const gridGroups = chunkArray(gridItemsData, gridChunkCount);
  const gridGroupsCount = gridGroups.length;
  const gridGroupsCols = gridGroupsCount * 2; // Double the grid for smooth infinite effect

  const simbaGridWrapper = document.querySelector('.main-wrapper');

  simbaGridWrapper.style.display = "grid";
  simbaGridWrapper.style.gap = `${gridGap}px`;
  simbaGridWrapper.style.gridTemplateColumns = `repeat(${gridGroupsCols}, 1fr)`;
  simbaGridWrapper.style.gridAutoRows = `${gridItemHeight*gridContainerRows}px`;
  simbaGridWrapper.style.height = `${((gridItemHeight+gridGap)*gridContainerRows)-gridGap}px`;
  // simbaGridWrapper.appendChild(wrapper);

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
    const gridContainer = createItemGrid(group, index);
    
    simbaGridWrapper.appendChild(gridContainer);
    
  })

  cloneAndAppendChildren(simbaGridWrapper);

  const simbaGridContainer = document.querySelector(".simba-grid-container");
  
  let isHovering = false;

  /* Handle scrolling */
  const scrollContent = () => {

    /* Check if the simbaGridWrapper is being hovered */
    if (!isHovering) {
      
      const offset = (simbaGridContainer.offsetWidth * gridRepeats) + (gridRepeats * gridGap);

      /* Reset the scroll position to the left when it reaches the end */
      if (simbaGridWrapper.scrollLeft >= offset) {
        simbaGridWrapper.scrollLeft -= offset;
      } else {
        simbaGridWrapper.scrollLeft += scrollSpeed; // Adjust the scrolling speed here
      }
    }

    /* Request the next animation frame */
    requestAnimationFrame(scrollContent);
  };

  /* Start the scrolling animation */
  scrollContent();

  /* Event listeners to detect hover state */
  simbaGridWrapper.addEventListener('mouseenter', () => isHovering = pauseOnHover ? true : false );
  simbaGridWrapper.addEventListener('mouseleave', () => isHovering = false );
  
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
    const gridItems = container.querySelectorAll('.simba-grid-item')
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