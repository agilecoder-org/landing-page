export const ColorPicker = (p5, label, config, configKey) => {
    // Create container
    const colorPickerContainer = p5.createDiv().parent(p5.select('#interactions'));
    colorPickerContainer.addClass('flex items-center justify-between my-3 w-full p-2 rounded-lg bg-card/50 border border-border/50');

    const defaultColor = config[configKey];

    // Left side (Label + Input)
    const leftContainer = p5.createDiv().parent(colorPickerContainer);
    leftContainer.addClass('flex items-center gap-3');

    // Label element
    const labelElement = p5.createP(`${label}:`).parent(leftContainer);
    labelElement.addClass('text-sm font-medium leading-none text-foreground');

    // HTML color picker element
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = `#${defaultColor.map(c => c.toString(16).padStart(2, '0')).join('')}`;
    colorPicker.className = 'h-8 w-8 rounded overflow-hidden border border-input bg-background p-0 cursor-pointer';
    leftContainer.elt.appendChild(colorPicker);  // Use `.elt` to append raw HTML to p5 elements

    // Right side (Buttons)
    const rightContainer = p5.createDiv().parent(colorPickerContainer);
    rightContainer.addClass('flex items-center gap-2');

    const buttonClass = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-7 px-2';

    // Random Color button
    const randomColorButton = p5.createButton('Random').parent(rightContainer);
    randomColorButton.addClass(buttonClass);

    // Reset button
    const resetColorButton = p5.createButton('Reset').parent(rightContainer);
    resetColorButton.addClass(buttonClass);

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

    return colorPickerContainer;
};
