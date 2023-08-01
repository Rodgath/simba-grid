function simbaGridScroll(element, options) {

  var defaults = {
    width: 1200,
    cols: 3,
    rows: 3,
    rowHeight: 280,
    gap: 0,
    scrollSpeed: 1,
    pauseOnHover: true,
    shuffle: false,
    animationStyle: 'zoom' // 'zoom', 'rotate', 'zoomRotate'
  };
  
  /* Check if options argument is provided directly or in the data attribute */
  if (!options) {
    var dataAttributeOptions = element.dataset.simbaGrid;
    if (dataAttributeOptions) {
      options = JSON.parse(dataAttributeOptions);
    }
  }

  /* Merge 'options' with 'defaults' */
  options = Object.assign({}, defaults, options);

  /* Set image box element */
  let simbaGridWrapper;
  
  /* Check if 'element' is a valid DOM element */
  if (element instanceof HTMLElement || element instanceof Node) {
    simbaGridWrapper = element;
  } else {
    simbaGridWrapper = document.querySelector(element);
  }
  
  gridItemsObject = getGridItems();
  
  /* Get the images to spin */
  function getGridItems() {

    let clonedWrapper = document.createElement('div');

    let gridItems;
    
    /* Check if ihe 'grid' property exists, is an array, and has items */
    if (options.hasOwnProperty('grid') && Array.isArray(options.images) && options.images.length > 0) {
      
      options.images.forEach(imageObj => {
        const imgElement = document.createElement('*');
        imgElement.src = imageObj.src;
        imgElement.alt = imageObj.title;
        
        simbaGridWrapper.appendChild(imgElement);
      });

      gridItems = simbaGridWrapper.querySelectorAll('*');
    } else {
      gridItems = simbaGridWrapper.querySelectorAll('*');
    }

    for (let i = 0; i < gridItems.length; i++) {
      clonedWrapper.appendChild(gridItems[i])      
    }
    clonedWrapper.style.display = 'none';
    document.body.appendChild(clonedWrapper);
    // simbaGridWrapper.querySelectorAll('*').remove();
    return Array.from(clonedWrapper.querySelectorAll('*'));
  }
/*   
  const gridItemsObject = [
    { 'image": "images/01.jpg" },
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
  ]; */



  const gridGap = options.gap;
  const gridItemHeight = options.rowHeight;
  const gridContainerWidth = options.width;
  const gridContainerRows = options.rows;
  const gridContainerCols = options.cols;
  const gridChunkCount = gridContainerRows*gridContainerCols;
  const gridItemsToFetch = gridItemsObject.length+getRandomBetween(1,2);
  const maxGridItemsToFetch = calculateNextDivisible(gridChunkCount, gridItemsToFetch);
  const gridRepeats = maxGridItemsToFetch/gridChunkCount;
  
  const shuffleArray = (array) => {
    
    /* Make a copy of the original array to prevent altering the original array */
    const shuffledArray = array.slice(); // 

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }

  const shuffled = options.shuffle ? shuffleArray(gridItemsObject) : gridItemsObject;
  
  const gridItemsData = repeatArray(shuffled, maxGridItemsToFetch);
  
  
  /* Create a single grid and append images to it */
  const createItemGrid = (itemGroup, num) => {
    
    const simbaGridContainer = document.createElement('div');
    simbaGridContainer.classList.add('simba-grid-container');
    simbaGridContainer.style.minWidth = `${gridContainerWidth}px`;
    
    const simbaGrid = document.createElement('div');
    simbaGrid.classList.add('simba-grid');
    
    simbaGrid.style.display = 'grid';
    simbaGrid.style.gridTemplateColumns = `repeat(${gridContainerCols}, 1fr)`;
    simbaGrid.style.gridAutoRows = `${gridItemHeight}px`;
    simbaGrid.style.gap = `${gridGap}px`;
    
    itemGroup.forEach((itemData, index) => {
      
      const simbaGridItem = document.createElement('div');

      simbaGridItem.classList.add('simba-grid-item');
      // simbaGridItem.style.minHeight = `${gridItemHeight}px`;
      simbaGridItem.style.overflow = 'hidden';
      // simbaGridItem.style.borderRadius = `8px`;

      if (itemData.tagName === 'IMG') {
        simbaGridItem.style.backgroundImage = `url(${itemData.currentSrc})`;
        simbaGridItem.style.backgroundSize = 'cover';
        simbaGridItem.style.backgroundPosition = 'center';
      } else {
        itemData.style.width = '100%';
        itemData.style.height = '100%';
        itemData.style.whiteSpace = 'normal';
        simbaGridItem.innerHTML = itemData.outerHTML;
      }
      
      simbaGrid.appendChild(simbaGridItem);
      simbaGridContainer.appendChild(simbaGrid);
    });

    return simbaGridContainer;
  };
  
  /* Get the contents of the JSON object in groups of three */
  const gridGroups = chunkArray(gridItemsData, gridChunkCount);
  const gridGroupsCount = gridGroups.length;
  const gridGroupsCols = gridGroupsCount * 2; // Double the grid for smooth infinite effect

  simbaGridWrapper.classList.add('simba-grid-wrapper');
  simbaGridWrapper.style.display = 'grid';
  simbaGridWrapper.style.gap = `${gridGap}px`;
  simbaGridWrapper.style.gridTemplateColumns = `repeat(${gridGroupsCols}, 1fr)`;
  simbaGridWrapper.style.gridAutoRows = `${gridItemHeight*gridContainerRows}px`;
  simbaGridWrapper.style.height = `${((gridItemHeight+gridGap)*gridContainerRows)-gridGap}px`;
  
  /* Group array elements in sets of 'chunkSize' */
  function chunkArray(arr, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  gridGroups.forEach((group, index) => {

    const gridContainer = createItemGrid(group, index);
    
    simbaGridWrapper.appendChild(gridContainer);
  })

  cloneAndAppendChildren(simbaGridWrapper);
  
  let isHovering = false;

  /* Handle scrolling */
  const scrollContent = () => {

    const gridContainer = document.querySelector('.simba-grid-container');

    /* Check if the simbaGridWrapper is being hovered */
    if (!isHovering) {
      
      const offset = (gridContainer.offsetWidth * gridRepeats) + (gridRepeats * gridGap);
      
      /* Reset the scroll position to the left when it reaches the end */
      if (simbaGridWrapper.scrollLeft >= offset) {
        simbaGridWrapper.scrollLeft -= offset;
      } else {
        simbaGridWrapper.scrollLeft += options.scrollSpeed;
      }
    }

    /* Request the next animation frame */
    requestAnimationFrame(scrollContent);
  };

  /* Start the scrolling animation */
  scrollContent();

  /* Event listeners to detect hover state */
  simbaGridWrapper.addEventListener('mouseenter', () => isHovering = options.pauseOnHover ? true : false );
  simbaGridWrapper.addEventListener('mouseleave', () => isHovering = false );
  
  function repeatArray(array, targetLength) {

    if (!array.length) return;

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
      
      switch (options.animationStyle) {
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
          transformStart = '';
          transformEnd = '';
          break;
      }
      
      if (options.animationStyle === 'zoom' || 
        options.animationStyle === 'rotate' || 
        options.animationStyle === 'zoomRotate') {
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
  }
  
  function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function calculateNextDivisible(ref, num) {
    
    /* Fix: Ensure grid wrapper has a min of 2 child grids incase Math.ceil(num / ref) is equal to 1 */
    
    /* Calculate the next number that is divisible by reference number */
    const nextDivisible = Math.max(Math.ceil(num / ref), 2) * ref;
    
    return nextDivisible;
  }
  
};

/* Call the function for elements with the 'data-simba-grid' attribute */
const simbaGridScrollElements = document.querySelectorAll('[data-simba-grid]');
simbaGridScrollElements.forEach(element => simbaGridScroll(element));