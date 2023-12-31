/**
 * Simba Grid
 * @name        simba-grid
 * @description Infinite grid scroll
 * @link        https://github.com/Rodgath/simba-grid
 * @author      Rodgath, https://Rodgath.com
 * @version     v1.0.2
 * @created     Jul 22, 2023
 * @updated     Aug 15, 2023
 * @copyright   Copyright (C) 2023-2023, Rodgath
 * @license     MIT
 * @licenseMIT  https://github.com/Rodgath/simba-grid/blob/main/LICENSE
 * @demoExample https://rodgath.github.io/simba-grid/demo/
 */
function simbaGrid(element, options) {

  var defaults = {
    width: 1200,
    cols: 3,
    rows: 3,
    rowHeight: 280,
    gap: 0,
    scrollSpeed: 1,
    scrollDirection: 'left',
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

  /* Variable to track scrolling direction */
  let isScrollingRight = options.scrollDirection === 'right' ? true : false;

  /* Set image box element */
  let simbaGridWrapper;
  
  /* Check if 'element' is a valid DOM element */
  if (element instanceof HTMLElement || element instanceof Node) {
    simbaGridWrapper = element;
  } else {
    simbaGridWrapper = document.querySelector(element);
  }
  
  const gridItemsObject = getGridItems();
  
  /* Get the images to spin */
  function getGridItems() {

    let clonedWrapper = document.createElement('div');

    let gridItems;
    
    /* Check if ihe 'images' property exists, is an array, and has items */
    if (options.hasOwnProperty('images') && Array.isArray(options.images) && options.images.length > 0) {
      
      options.images.forEach(imageObj => {
        const imgElement = document.createElement('img');
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
  
  const gridGap = parseInt(options.gap, 10);
  const gridItemHeight = parseInt(options.rowHeight, 10);
  const gridContainerWidth = parseInt(options.width, 10);
  const gridContainerRows = parseInt(options.rows, 10);
  const gridContainerCols = parseInt(options.cols, 10);
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
  
  /* Set Simba grid wrapper attributes and styles */
  (function(simbaGridWrapper) {
    simbaGridWrapper.classList.add('simba-grid-wrapper');
    simbaGridWrapper.style.width = '100%';
    simbaGridWrapper.style.whiteSpce = 'nowrap';
    simbaGridWrapper.style.overflow = 'hidden';
    simbaGridWrapper.style.display = 'grid';
    simbaGridWrapper.style.gap = `${gridGap}px`;
    simbaGridWrapper.style.gridTemplateColumns = `repeat(${gridGroupsCols}, 1fr)`;
    simbaGridWrapper.style.gridAutoRows = `${gridItemHeight*gridContainerRows}px`;
    simbaGridWrapper.style.height = `${((gridItemHeight+gridGap)*gridContainerRows)-gridGap}px`;
  })(simbaGridWrapper);
  
  /* Group array elements in sets of 'chunkSize' */
  function chunkArray(arr, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  gridGroups.forEach((group, index) => {

    let gridContainer = createItemGrid(group, index);

    if (isScrollingRight) {
      gridContainer = gridItemsReverseOrder(gridContainer);
    }
    
    simbaGridWrapper.appendChild(gridContainer);
  })

  cloneAndAppendChildren(simbaGridWrapper);

  /* Manage grid elements reverse ordering */
  function gridItemsReverseOrder(gridContainer) {
    const grid = gridContainer.querySelector('.simba-grid');
    const squares = grid.querySelectorAll('.simba-grid-item');
    
    // Convert the NodeList to an array for easier manipulation
    const squareArray = Array.from(squares);

    // Reorder the array of squares
    squareArray.sort((a, b) => {
      const aRow = Math.floor(squareArray.indexOf(a) / options.cols); // Divide by 2 since there are 2 columns
      const bRow = Math.floor(squareArray.indexOf(b) / options.cols);
      return bRow - aRow; // Compare row indices to reverse the order
    });

    // Remove existing squares from parent grid
    squares.forEach(square => square.remove());

    // Append the rearranged squares back to the parent grid
    squareArray.forEach(square => grid.appendChild(square));
    
    while (gridContainer.firstChild) {
      gridContainer.removeChild(gridContainer.firstChild);
    }
    
    gridContainer.appendChild(grid)
    const container = gridContainer;
    return container;
  }
  
  let isHovering = false;

  /* Handle scrolling */
  const scrollContent = () => {

    const gridContainer = document.querySelector('.simba-grid-container');

    /* Check if the simbaGridWrapper is being hovered */
    if (!isHovering) {
      
      const offset = (gridContainer.offsetWidth * gridRepeats) + (gridRepeats * gridGap);
      
      if (!isScrollingRight) {
      
        /* Reset the scroll position to the left when it reaches the end */
          if (simbaGridWrapper.scrollLeft >= offset) {
              simbaGridWrapper.scrollLeft -= offset;
          } else {
              simbaGridWrapper.scrollLeft += options.scrollSpeed;
          }
      } else {
          if (simbaGridWrapper.scrollLeft <= offset - gridContainer.parentNode.offsetWidth) { // Check if at the leftmost edge
              simbaGridWrapper.scrollLeft += offset * 2; // Multiply by 2 because the system appends similar number of nodes
          } else {
              simbaGridWrapper.scrollLeft -= options.scrollSpeed;
          }
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

  /* Alter grid items transform animations based on scroll direction */
  function manageGridItemsTransform(gridItems, index) {
    
    const gridItem = gridItems[index];
      
    let transformStart = '';
    let transformEnd = '';

    const rotationAngle = !isScrollingRight ? '-20deg' : '+20deg';
    
    switch (options.animationStyle) {
      case 'zoom':
        transformStart = 'scale(0)';
        transformEnd = 'scale(1)';
        break;
      case 'rotate':
        transformStart = `rotate(${rotationAngle})`;
        transformEnd = 'rotate(0deg)';
        break;
      case 'zoomRotate':
        transformStart = `rotate(${rotationAngle}) scale(0)`;
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
      gridItem.style['-webkit-transform'] = transformStart;
      gridItem.style.transform = transformStart;
      gridItem.style.transitionProperty = `opacity, transform`;
      gridItem.style.transitionDuration = `0.4s, 0.4s`;
      gridItem.style.transitionTimingFunction = `linear, linear`;
      gridItem.style.transitionDelay = `0s, 0s`;
          
      /* Adjust the timing based on reverse/forward direction order */
      const timing = !isScrollingRight ? index * 200 : (gridItems.length - index - 1) * 200;
      
      setTimeout(() => {
        // gridItem.style.transitionDelay = `0.${index*2}s, 0.${index*2}s`;
        gridItem.style.opacity = 1;
        gridItem.style['-webkit-transform'] = transformEnd;
        gridItem.style.transform = transformEnd;
      }, timing);
    }
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
    if (!isScrollingRight) {
      for (let j = 0; j < gridItems.length; j++) {
        manageGridItemsTransform(gridItems, j);
      }
    } else {
      for (let j = gridItems.length - 1; j >= 0; j--) { // Loop in reverse order
        manageGridItemsTransform(gridItems, j);
      }
    }
    
    if (isScrollingRight) {
      for (let i = 0; i < originalChildren.length; i++) {
        const originalChild = originalChildren[i];
        gridItemsReverseOrder(originalChild)
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
simbaGridScrollElements.forEach(element => simbaGrid(element));