export const ColorPicker = (p5, label, config, configKey) => {
    // Create container
    const colorPickerContainer = p5.createDiv().parent(p5.select('#interactions'));
    colorPickerContainer.style('margin', '0.5rem 0');

    const defaultColor = config[configKey];

    // Label container
    const labelDiv = p5.createDiv().parent(colorPickerContainer);
    labelDiv.style('display', 'flex');
    labelDiv.style('align-items', 'center');

    // Label element
    const labelElement = p5.createP(`${label}:`).parent(labelDiv);
    labelElement.style('margin-right', '10px');

    // HTML color picker element
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = `#${defaultColor.map(c => c.toString(16).padStart(2, '0')).join('')}`;
    colorPicker.style.marginRight = '10px';
    labelDiv.elt.appendChild(colorPicker);  // Use `.elt` to append raw HTML to p5 elements

    // Button container
    const buttonContainer = p5.createDiv().parent(colorPickerContainer);
    buttonContainer.style('display', 'flex');
    buttonContainer.style('align-items', 'center');

    // Random Color button
    const randomColorButton = p5.createButton('Random').parent(buttonContainer);
    randomColorButton.style('margin-right', '10px');
    randomColorButton.style('border', '1px solid black');
    randomColorButton.style('border-radius', '20%');
    randomColorButton.style('padding', '0.05rem 0.2rem');

    // Reset button
    const resetColorButton = p5.createButton('Reset').parent(buttonContainer);
    resetColorButton.style('border', '1px solid black');
    resetColorButton.style('border-radius', '20%');
    resetColorButton.style('padding', '0.05rem 0.2rem');

    // Color picker input event
    colorPicker.addEventListener('input', () => {
        const hexColor = colorPicker.value;
        config[configKey] = [
            parseInt(hexColor.slice(1, 3), 16),
            parseInt(hexColor.slice(3, 5), 16),
            parseInt(hexColor.slice(5, 7), 16),
        ];
        p5.redraw();
    });

    // Random Color button event
    randomColorButton.mousePressed(() => {
        const randomColor = [
            Math.floor(p5.random(255)),
            Math.floor(p5.random(255)),
            Math.floor(p5.random(255)),
        ];
        config[configKey] = randomColor;
        colorPicker.value = `#${randomColor.map(c => c.toString(16).padStart(2, '0')).join('')}`;
        p5.redraw();
    });

    // Reset button event
    resetColorButton.mousePressed(() => {
        config[configKey] = defaultColor;
        colorPicker.value = `#${defaultColor.map(c => c.toString(16).padStart(2, '0')).join('')}`;
        p5.redraw();
    });

    colorPickerContainer.style('margin-bottom', '10px');
    colorPickerContainer.style('display', 'flex');
    colorPickerContainer.style('align-items', 'center');
    colorPickerContainer.style('justify-content', 'space-between');

    return colorPickerContainer;
};
