export const sliderWithLabelAndCheckbox = (p5, range, label, configKey, config, animKey, container = p5.select('#interactions')) => {
    const controlContainer = p5.createDiv().parent(container);
    controlContainer.style('display', 'flex');
    controlContainer.style('flex-direction', 'column');
    controlContainer.style('margin', '1rem 0');

    const sliderElement = p5.createSlider(range.min, range.max, range.value, range.step).parent(controlContainer);
    sliderElement.style('width', '100%');

    const labelCheckboxContainer = p5.createDiv().parent(controlContainer);
    labelCheckboxContainer.style('display', 'flex');
    labelCheckboxContainer.style('align-items', 'center');
    labelCheckboxContainer.style('justify-content', 'space-between');

    const labelElement = p5.createP(`${label}: ${range.value}`).parent(labelCheckboxContainer);
    labelElement.style('margin', '0 10px 0 0');

    if (animKey) {
        const checkboxElement = p5.createCheckbox('Loop', config[animKey]).parent(labelCheckboxContainer);
        checkboxElement.style('margin-left', '10px');

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
