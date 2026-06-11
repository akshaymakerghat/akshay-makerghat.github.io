document.addEventListener("DOMContentLoaded", () => {
    // Run the statistical counting effect
    initCounters();
    
    // Set up interactive allocation display
    initVisualizer();
});

/**
 * Automatically increments counts upon page load smoothly.
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 50; 

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const current = +counter.innerText.replace(/[^0-9]/g, '');
            const increment = Math.ceil(target / speed);

            if (current < target) {
                const nextValue = current + increment;
                if (nextValue >= target) {
                    formatFinalValue(counter, target);
                } else {
                    counter.innerText = (counter.id === "stat-youth") 
                        ? nextValue + " Lakh" 
                        : nextValue.toLocaleString('en-IN') + "+";
                    setTimeout(updateCount, 25);
                }
            } else {
                formatFinalValue(counter, target);
            }
        };
        updateCount();
    });
}

function formatFinalValue(element, target) {
    if (element.id === "stat-youth") {
        element.innerText = target + " Lakh";
    } else {
        element.innerText = target.toLocaleString('en-IN') + "+";
    }
}

/**
 * Handles toggling rendering seats vs global finalist layout allocation.
 */
function initVisualizer() {
    const btnSeats = document.getElementById('btn-seats');
    const btnFinalists = document.getElementById('btn-finalists');
    const visualizerBox = document.getElementById('visualizer-box');

    // Configuration array structures (Total capacity, locked spots reserved)
    const renderBlocks = (total, reserved) => {
        visualizerBox.innerHTML = ''; // Wipe existing structures safely
        
        for (let i = 0; i < total; i++) {
            const div = document.createElement('div');
            div.classList.add('block');
            // Distribute blocks uniformly or as reserved vs open pool
            if (i < reserved) {
                div.classList.add('reserved');
                div.setAttribute('title', 'Reserved Track (Girls)');
            } else {
                div.classList.add('open');
                div.setAttribute('title', 'General Pool Open Track');
            }
            // staggered entrance look animation delay logic
            div.style.animationDelay = `${i * 10}ms`;
            visualizerBox.appendChild(div);
        }
    };

    // Initialize Default State (50 total seats, 25 reserved)
    renderBlocks(50, 25);

    // Click handler interactions
    btnSeats.addEventListener('click', () => {
        btnFinalists.classList.remove('active');
        btnSeats.classList.add('active');
        renderBlocks(50, 25);
    });

    btnFinalists.addEventListener('click', () => {
        btnSeats.classList.remove('active');
        btnFinalists.classList.add('active');
        renderBlocks(10, 3);
    });
}
