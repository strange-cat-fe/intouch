const config = require('config')
const from = config.get('sendgridEmail')

module.exports = function (email, verifyKey) {
  try {
    return {
      to: email,
      from: from,
      subject: 'Verify your email',
      html: `
      <h1>Welcome to intouch!</h1>
      <p>
          To Complete Registration(${email}) Click This button
      </p>
      <a href="${config.get(
        'baseUrl',
      )}/api/auth/verify/${email}/${verifyKey}">Verify Email</a>
      <hr />
      `,
    }
  } catch (e) {
    console.log(e.message)
  }
}
