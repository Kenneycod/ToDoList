module.exports = getDate;

function getDate() {
    const today = new Date();

    let option = {
        weekday:'long',
        day:'numeric',
        month:'long'
    };
    let currentday = today.toLocaleDateString('en-us',option);
    const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

    return currentday;

}