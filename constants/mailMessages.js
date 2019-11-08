module.exports.REFRESH_TOKEN_MESSAGE = function (name, token) {
    return `<p><b>Attention! your token has been changed to a new one.</b><br/></p>
        <p>Attention!</p><p>Company name: <b>${name}</b></p><p>Token: <b>${token}</b></p>
        <p>Your old token is no longer valid, use only the new one from this letter. 
        Next time, please be careful with your personal data.</p>`
}
module.exports.NEW_TOKEN_MESSAGE = function (name, token) {
    return `<p><b>Congratulations!</b><br/></p>
        <p>Congratulations, you are added to the Online Warehouse system.</p><p>Company name: <b>${name}</b></p>
        <p>Token: <b>${token}</b></p>
        <p>Do not show your token to anyone, if your token was compromised,
         let us know as soon as possible,we will take the necessary measures!</p>`
}
module.exports.NEW_USER_MESSAGE = function (name, password) {
    return `<p><b>Congratulations!</b><br/></p>
        <p>Congratulations, you are added to the Online Warehouse system.</p><p>Login: <b>${name}</b></p>
        <p>Temporary password: <b>${password}</b></p>
        <p>Do not show anyone your temporary password,
         and change it in your account at your earliest convenience!</p>`
}

