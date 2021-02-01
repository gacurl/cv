//EmailJS
const btn = document.getElementById('contact-submit-button');

document.getElementById('contact-form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'contact_service_template';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                console.log('Sent!');
            }, (err) => {
                btn.value = 'Send Email';
                console.log(JSON.stringify(err));
            })
            document.getElementById('contact-form').reset();
    });

// copyright date in footer
document.querySelector("#copyright")

if (new Date().getFullYear() === 2020) {
    copyright.appendChild(document.createTextNode(' 2020'));
} else {
    copyright.appendChild(document.createTextNode(' 2020 - ' + new Date().getFullYear()));
};