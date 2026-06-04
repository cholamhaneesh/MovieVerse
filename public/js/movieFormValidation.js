(function () {
    const forms = document.querySelectorAll(".movie-form");

    if (!forms.length) {
        return;
    }

    const currentYear = new Date().getFullYear();

    function setTrimmedRequiredValidity(field, requiredMessage, minLength, minMessage) {
        const value = field.value.trim();

        if (!value) {
            field.setCustomValidity(requiredMessage);
            return;
        }

        if (minLength && value.length < minLength) {
            field.setCustomValidity(minMessage);
            return;
        }

        field.setCustomValidity("");
    }

    function setReleaseYearValidity(field) {
        const year = Number(field.value);

        if (!field.value.trim()) {
            field.setCustomValidity("Release year is required.");
            return;
        }

        if (!Number.isInteger(year)) {
            field.setCustomValidity("Release year must be a whole number.");
            return;
        }

        if (year < 1888 || year > currentYear) {
            field.setCustomValidity(`Release year must be between 1888 and ${currentYear}.`);
            return;
        }

        field.setCustomValidity("");
    }

    function setGenresValidity(field) {
        const value = field.value.trim();

        if (!value) {
            field.setCustomValidity("");
            return;
        }

        const genres = value
            .split(",")
            .map(genre => genre.trim());

        if (genres.some(genre => !genre)) {
            field.setCustomValidity("Separate genres with commas and remove empty entries.");
            return;
        }

        if (genres.some(genre => genre.length > 30)) {
            field.setCustomValidity("Each genre must be 30 characters or fewer.");
            return;
        }

        field.setCustomValidity("");
    }

    forms.forEach(form => {
        const title = form.elements.title;
        const releaseYear = form.elements.releaseYear;
        const genres = form.elements.genres;
        const description = form.elements.description;

        releaseYear.max = currentYear;

        function validateForm() {
            setTrimmedRequiredValidity(
                title,
                "Title is required.",
                2,
                "Title must be at least 2 characters."
            );

            setReleaseYearValidity(releaseYear);
            setGenresValidity(genres);

            setTrimmedRequiredValidity(
                description,
                "Description is required.",
                10,
                "Description must be at least 10 characters."
            );
        }

        [title, releaseYear, genres, description].forEach(field => {
            field.addEventListener("input", validateForm);
        });

        form.addEventListener("submit", event => {
            validateForm();

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add("was-validated");
        });
    });
})();
