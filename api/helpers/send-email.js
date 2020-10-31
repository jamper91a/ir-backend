const nodemailer = require("nodemailer");
module.exports = {


  friendlyName: 'Send emails',


  description: 'Send emails using provider',


  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    },
    to: {
      type: 'string',
      description: 'Email address to send the email',
      required: true
    },
    subject: {
      type: 'string',
      description: 'Mail subject',
      required: true
    },
    text: {
      type: 'string',
      description: 'Mail text',
      required: true
    },
    html: {
      type: 'string',
      description: 'Mail html',
      required: true
    },
    attachments: {
      type: 'ref',
      description: 'Url of the attacment',
      required: false
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      let transporter = nodemailer.createTransport(sails.config.email);

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Inventario Real 👻" <noreply@inventarioreal.com>', // sender address
        to: inputs.to, // list of receivers
        subject: inputs.subject, // Subject line
        text: inputs.text, // plain text body
        html: inputs.html, // html body,
        attachments: inputs.attachments
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      exits.success(info);
    } catch (e) {
      console.error(e);
      exits.error(e);
    }
    // exits.error(err);

  }


};

