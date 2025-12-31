export const sliderWithLabelAndCheckbox = (p5, range, label, configKey, config, animKey, container = p5.select('#interactions')) => {
    const controlContainer = p5.createDiv().parent(container);
    controlContainer.addClass('flex flex-col gap-3 my-3 w-full p-2 rounded-lg bg-card/50 border border-border/50');

    // Header (Label + Loop Checkbox)
    const headerContainer = p5.createDiv().parent(controlContainer);
    headerContainer.addClass('flex items-center justify-between w-full');

    const labelElement = p5.createP(`${label}: ${range.value}`).parent(headerContainer);
    labelElement.addClass('text-sm font-medium leading-none text-foreground');

    const sliderElement = p5.createSlider(range.min, range.max, range.value, range.step).parent(controlContainer);
    sliderElement.addClass('w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary');

    if (animKey) {
        // Create a wrapper for checkbox to style it better
        // standard p5 createCheckbox structure is confusing, let's try to append manually for better control or just style the wrapper
        // The checkbox created by p5 is usually a wrapper label with input inside.
        // Let's create a wrapper div first

        // Actually p5.createCheckbox returns an object that wraps the element.
        // Let's stick to simple p5 creation and class addition.
        const checkboxElement = p5.createCheckbox('Loop', config[animKey]).parent(headerContainer);
        checkboxElement.addClass('flex items-center text-xs font-medium ml-2 gap-2 accent-primary');
        // p5 checkbox defaults to row-reverse or something depending on browser? 
        // We might need to inspect, but 'flex' usually fixes layout.

        // Styling inner input is hard via p5, but accent-color property helps.

        config[animKey] = checkboxElement.checked();

        checkboxElement.changed(() => {
            config[animKey] = checkboxElement.checked();
        });

        sliderElement.input(() => {
            config[configKey] = sliderElement.value();
            labelElement.html(`${label}: ${sliderElement.value()}`);

            config[animKey] = false;
            checkboxElement.checked(false);
            p5.redraw();
        });
    } else {
        sliderElement.input(() => {
            config[configKey] = sliderElement.value();
            labelElement.html(`${label}: ${sliderElement.value()}`);
        });
    }

    config[configKey] = sliderElement.value();
};
