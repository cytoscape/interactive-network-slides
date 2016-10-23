let cy6 = cytoscape({
  container: document.getElementById('graph6-cy'),
  elements: data.elements,
  layout: {
    name: 'cola',
    animate: true,
    nodeSpacing: function(node) {
      return 40;
    },
    randomize: false
  },
  style: [
    {
      selector: 'node',
      style: {
        'background-image': 'data(image)',
        'background-fit': 'cover',
        'width': 'mapData(degreeCentrality, 3, 12, 40, 100)',
        'height': 'mapData(degreeCentrality, 3, 12, 40, 100)'
      }
    }
  ]
});

function mapDegreeCentrality() {
  cy6.nodes().forEach(ele => {
    ele.data('degreeCentrality', cy6.$().dc({ root: '#' + ele.id() }).degree);
  });
}

function clearPreviousResultsCy6() {
  cy6.elements().stop(true, false); // stop all animations when leaving slide
  cy6.elements().style({
    'line-color': '',
    'target-arrow-color': '',
    'border-width': '',
    'border-style': '',
    'border-color': ''
  });
}

Reveal.addEventListener('slidechanged', function(event) {
  if (event.currentSlide.id === 'algorithm3') {
    cy6.resize();
    cy6.layout();
    setTimeout(mapDegreeCentrality, 1500);
  } else if (event.previousSlide && event.previousSlide.id === 'algorithm3') {
    clearPreviousResultsCy6();
  }
});