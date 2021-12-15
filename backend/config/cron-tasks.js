module.exports = {
  '10 * * * * *': async ({ strapi }) => {
    console.log("Cron Job:" + new Date());
      const subscribers = await strapi.service('api::subscriber.subscriber').find();
      console.log('subscribers', subscribers.results.length)
    for(const subscriber of subscribers.results){
     /* await strapi.plugins['email'].services.email.send({
        to: subscriber.email,
        from: 'no-reply@strapi.io',
        cc: 'no-reply@strapi.io',
        bcc: 'no-reply@strapi.io',
        replyTo: 'no-reply@strapi.io',
        subject: 'Use strapi email provider successfully',
        text: 'Hello world!',
        html: 'Hello world!',
      });*/
    }
  }
}

