// Form validation and submit
class FormValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    initialize() {
        this.validateOnEntry();
        this.validateOnSubmit();
    }

    validateOnSubmit() {
        let self = this;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            let message = '';

            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                isValid = isValid && self.validateField(input);
                message += `${input.name}: ${input.value}\n`;
            });

            if (isValid) {
                console.log(message);
                self.resetFields();
            }
        });
    }

    validateOnEntry() {
        let self = this;
        this.fields.forEach((field) => {
            const input = document.querySelector(`#${field}`);

            input.addEventListener('input', () => {
                self.validateField(input, false);
            });
        });
    }

    validateField(field, withReturn = true) {
        let hasError = null;
        const regEx = /\S+@\S+\.\S+/;

        if (field.type === 'email') {
            if (regEx.test(field.value)) {
                this.setStatus(field, null, 'success');
                hasError = false;
            } else {
                this.setStatus(field, 'Please enter valid email address.', 'error');
                hasError = true;
            }
        } else {
            if (field.value.trim() === '') {
                this.setStatus(
                    field,
                    `Please enter your ${field.previousElementSibling.innerText.toLowerCase()}.`,
                    'error'
                );
                hasError = true;
            } else {
                this.setStatus(field, null, 'success');
                hasError = false;
            }
        }

        if (withReturn) {
            return !hasError;
        }
    }

    setStatus(field, message, status) {
        const errorMessage = field.parentElement.querySelector('.error');

        if (status === 'success') {
            if (errorMessage) {
                errorMessage.innerText = '';
            }

            field.classList.remove('invalid');
        }

        if (status === 'error') {
            field.parentElement.querySelector('.error').innerText = message;
            field.classList.add('invalid');
        }
    }

    resetFields() {
        this.fields.forEach((field) => {
            const input = document.querySelector(`#${field}`);
            input.value = '';
        });
    }
}

const form = document.querySelector('form');
const fields = ['name', 'surname', 'email'];

const validator = new FormValidator(form, fields);
validator.initialize();


// Smooth scrolling to selected section
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
